const express = require('express');
const path = require('path');
const bodyParser = require('body-parser'); 
const cookieParser = require('cookie-parser');
const auth = require('./utils/auth');
let pg = require('pg'); 
let db = require('../database/index.js');
let dbHelpers = require('./utils/dbHelpers.js');
let helpers = require('./utils/helpers.js');

const app = express();

let PORT = process.env.PORT || 3000;

// Authentication packages
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// Parses JSON, urls and cookies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true }));
app.use(cookieParser());

// Serves static files to client
app.use(express.static(path.join(__dirname, '../dist')));

// cors
app.use((req, res, next) =>{
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Passport init
app.use(passport.initialize());
app.use(passport.session());

// Creates new user session using Passport Local Strategy
passport.use(new LocalStrategy((username, password, done) => {
  if (err) { console.log('error in passport local strategy get user', err); }
  else if (!user) {
    return done(null, false, { message: 'Unknown user' });
  } else {
    return done(null, user);
  }
}));

// Validates user and logs user into session
app.post('/login', (req, res) => {
  auth.validateLoginForm(req.body, (result) => {
    if (result.success) {
      console.log('user validated, okay to get profile');
    } else {
      res.send(result);
    }
  });
});

// Destroys session and logs user out
app.get('/logout', (req, res) => {
  req.logOut();
  res.clearCookie('connect.sid', {path:'/'}).send('cleared');
});

// Sends script and transcript to Watson, then to db + client
app.post('/api/script', (req, res) => {
  Promise.all([
    helpers.toneAnalysis({textToAnalyze: req.body.script}),
    helpers.toneAnalysis({textToAnalyze: req.body.transcript}),
    helpers.languageAnalysis({
      textToAnalyze: req.body.script,
      features: {keywords: {sentiment: true, limit: 10}}
    }),
    helpers.languageAnalysis({
      textToAnalyze: req.body.transcript,
      features: {keywords: {sentiment: true, limit: 10}}
    })
  ])
  .then((results) => {
    console.log('results', results);
    let data = {
      text: req.body,
      results
    };
    dbHelpers.parseData(data, (err, result) => {
      if (err) { console.log('error parsing data with dbHelpers', err); }
      else {
        db.saveScript(result.scriptData, (err, result) => {
          if (err) { console.log('error saving script to db', err); }
          else {
            console.log('script saved to database', result);
          }
        });
        db.saveTranscript(result.transcriptData, (err, result) => {
          if (err) { console.log('error saving transcript to db', err); }
          else {
            console.log('transcript saved to database', result);
          }
        });
      }
    });
    res.status(200).end(JSON.stringify(results));
  })
  .catch((error) => {
    console.log(error, 'error');
    res.end(error.error)
  })
});

app.post('/postlogin', (req, res) => {
  const credentials = req.body;
  const handleVerify = (verifyResult) => {

  }
});

// Creates Passport session for user by serialized ID
passport.serializeUser((user_id, done) => {
  done(null, user_id);
});

// Deserializes the user ID for passport to deliver to the session
passport.deserializeUser((user_id, done) => {
  User.getUserById(user_id, (err, user) => {
    done(err, user);
  })
});

// wild card routing all pages to the React Router
app.get('/*', (req, res) => {
  res.status(302).sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(PORT, function() {
  console.log(`listening on port ${PORT}`);
});