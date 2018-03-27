const express = require('express');
const path = require('path');
const cors = require('cors');
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

// Express session
app.use(session({
  secret: 'moxie cat',
  resave: false,
  saveUninitialized: false
}));

// Parses JSON, urls and cookies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true }));
app.use(cookieParser());
app.use(cors());

// Serves static files to client
app.use(express.static(path.join(__dirname, '../dist')));

// Passport init
app.use(passport.initialize());
app.use(passport.session());

// Creates new user session using Passport Local Strategy
passport.use(new LocalStrategy((username, password, done) => {
  let userCredentials = {
    username,
    password
  };
  console.log('local strategy invoked', userCredentials);
  db.getUser(userCredentials, (err, user) => {
    if (err) {
      console.log('error in passport local strategy get user', err);
    } else if (!user) {
      return done(null, false, { message: 'Unknown user' });
    }
    console.log('retrieved user from database for passport.use', user);
    return done(null, user);
  });
}));

app.use((req, res, next) => {
  next();
});

// Validates new user signup and saves user to database
app.post('/signup', (req, res) => {
  auth.validateSignupForm(req.body, (result) => {
    if (result.success) {
      console.log(result);
      db.saveUser(req.body, (err, result) => {
        if (err) {
          console.log('error saving user data to db:', err);
          res.status(500).send({ error: 'User already exists' });
        }
        else {
          console.log('saved user data to the db:', result);
          db.getUser(req.body, (err, result) => {
            if (err) { res.send(err); }
            else {
              console.log('result db.getUser', result);

              // creates persisting session with Passport
              const user_id = result.id;
              req.login(user_id, (err) => {
                req.session.user = result;
                res.send(result);
              });
            }
          });
        }
      });
    } else if (result) {
      console.log(result);
      res.status(500).send(result);
    }
  });
});

// Validates user and logs user into session
app.post('/login', (req, res) => {
  console.log('inside server login');
  auth.validateLoginForm(req.body, (result) => {
    if (result.success) {
      const credentials = req.body;
      console.log('credentials validated, retrieving profile', credentials);
      db.getUser(credentials, (err, user) => {
        if (err) {
          console.log('error in passport local strategy get user', err);
          res.status(400).send(err);
        } else if (!user) {
          return done(null, false, { message: 'Unknown user' });
        } else if (user) {
          console.log('logged in user:', user);

          // creates persisting session with Passport
          const user_id = user.id;
          req.login(user_id, (err) => {
            req.session.user = user;
            res.send(user);
          });
        }
      });
    } else {
      res.status(400).send(result);
    }
  });
});

// Destroys session and logs user out
app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('connect.sid', {path:'/'}).send('cleared');
    req.logOut();
    res.redirect('/');
  });
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
    console.log('Watson results', results);
    res.status(200).end(JSON.stringify(results));
  })
  .catch((error) => {
    console.log(error, 'error');
    res.end(error.error)
  })
});

app.post('/profile', (req, res) => {

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
});

// Creates Passport session for user by serialized ID
passport.serializeUser((user, done) => {
  done(null, user);
});

// Deserializes the user ID for passport to deliver to the session
passport.deserializeUser((user, done) => {
  console.log('deserialize user', user);
  db.getUser(user, (err, user) => {
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