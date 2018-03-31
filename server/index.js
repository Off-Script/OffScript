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

// Serves static files to client
app.use(express.static(path.join(__dirname, '../dist')));

// Authentication packages
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// Express session
app.use(session({
  key: 'user_sid',
  secret: 'moxie cat',
  resave: false,
  saveUninitialized: false
}));

// Parses JSON, urls and cookies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true }));
app.use(cookieParser());
app.use(cors());


// Passport init
app.use(passport.initialize());
app.use(passport.session());

// Creates new user session using Passport Local Strategy
passport.use(new LocalStrategy((username, password, done) => {
  let userCredentials = {
    username,
    password
  };
  console.log('local strategy invoked');
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


// Check if user's cookie is still saved in browser and user is not set, then automatically logs the user out.
app.use((req, res, next) => {
  if (req.cookies.user_sid && !req.session.user) {
    res.clearCookie('user_sid');
  }
  console.log('handling request for: ' + req.url);
  next();
});

// Checks for logged-in users
let sessionChecker = (req, res, next) => {
  if (req.session.user && req.cookies.user_sid) {
    res.redirect('/profile');
  } else {
    next();
  }
};

// Validates new user signup and saves user to database
app.post('/signup', sessionChecker, (req, res) => {
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
            if (err) { res.send(err.errors); }
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
app.post('/login', sessionChecker, (req, res, next) => {
  console.log('inside server login');
  auth.validateLoginForm(req.body, (result) => {
    if (result.success) {
      passport.authenticate('local', (err, user, info) => {
        if (err) { return res.status(401).json({errors: err}); }
        if (!user) { return res.status(401).json({err: info}); }
        const credentials = req.body;
        console.log('credentials validated, retrieving profile');
        db.getUser(credentials, (err, user) => {
          if (err) {
            console.log('error in passport local strategy get user', err);
            res.send(401, err);
          } else if (!user) {
            return done(null, false, { message: 'Unknown user' });
          } else if (user) {
            console.log('logged in user:', user);

            // creates persisting session with Passport
            const user_id = user.id;
            // req.session.regenerate(() => {
            //   req.session.user = user;
            //   res.cookie('loggedIn', 'true', { maxAge: 60 * 60 * 1000 });
            // });
            req.logIn(user_id, (err) => {
              if (err) { return res.status(500).json({ err: 'Could not login user'}); }
              req.session.user = user;
              res.cookie('loggedIn', 'true', { maxAge: 60 * 60 * 1000 });
              console.log('req.session', req.session);
              res.status(200).json({status: 'Login successful!', user: user});
            });
          }
        });
      })(req, res, next);
    } else {
      res.status(500).json({err: result});
    }
  });
});

app.get('/checkauth', auth.isAuthenticated, function(req, res){
  res.status(200).json({
      status: 'Login successful!'
  });
});

app.get('/user', (req, res) => {
  res.send(req.user);
});

// Retrieves session credentials
app.get('/session', (req, res) => {
  let credentials = req.session.user.id;
  console.log('/session credentials are', credentials);
  if (credentials) {
    db.getUserById(credentials, (err, user) => {
      if (err) {
        console.log('error retrieving user in session', err);
        res.status(401).send({ message: err });
      } else if (!user) {
        res.status(401).send({ message: 'Unknown user' });
      } else if (user) {
        console.log('user is in session:', user.rows[0]);
        res.send({isLoggedIn: true, user: user});
      }
    });
  }
});

// Destroys session and logs user out
app.post('/logout', (req, res) => {
  req.session.destroy(() => {
    req.logOut();
    res.clearCookie('connect.sid', {path:'/'});
    res.clearCookie('user_sid', {path:'/'});
    res.clearCookie('loggedIn', {path: '/'}).redirect('/');
  });
});

// Authenticates user upon redirect
app.post('/profile', sessionChecker, (req, res) => {
  console.log('/profile page req.user:', req.user);
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
      console.log("Watson results received");
      var parsedResults = {};
      var scriptData = [];
      var transData = [];
      var scriptEmotion = [];
      var transEmotion = [];
      var scriptLang = [];
      var transLang = [];
      for (let i = 0; i < 5; i++) {
        scriptData.push(results[0].document_tone.tone_categories[2].tones[i].score);
        transData.push(results[1].document_tone.tone_categories[2].tones[i].score);
        scriptEmotion.push(results[0].document_tone.tone_categories[0].tones[i].score);
        transEmotion.push(results[1].document_tone.tone_categories[0].tones[i].score);
        if (i < 3) {
          scriptLang.push(results[0].document_tone.tone_categories[1].tones[i].score);
          transLang.push(results[1].document_tone.tone_categories[1].tones[i].score);
        }
      }
      parsedResults = {
        scriptData: scriptData,
        transData: transData,
        scriptEmotion: scriptEmotion,
        transEmotion: transEmotion,
        scriptLang: scriptLang,
        transLang: transLang
      };
      res.status(200).end(JSON.stringify(parsedResults));
    })
    .catch((error) => {
      console.log(error, "error");
      res.end(error.error);
    })
});

// Saves script, transcript and links to user id in the database
app.post('/postanalysis', (req, res) => {
  console.log('/postanalysis function invoked', req.body);
  let data = {
    script: req.body.script,
    transcript: req.body.transcript,
    data: req.body.data,
    comparison: req.body.comparison,
    currentUserId: req.body.currentUserId
  };
  console.log('req.body', req.body);
  console.log('data', data);
  // console.log('userId is:', data.currentUserId);
  dbHelpers.parseData(data, (err, result) => {
    if (err) { console.log('error parsing data with dbHelpers', err); }
    else {
      result.userId = req.body.currentUserId;
      db.saveAnalysis(result, (err, result) => {
        if (err) { console.log('error saving analysis to db', err); }
        else {
          result.userId = req.body.currentUserId;
          console.log('new result', result);
          res.status(200).send(result);
        }
      });
    }
  });
});

app.post('/api/personalscripts', (req, res) => {
  console.log('req.body', req.body);
  let data = {
    userId: req.body.userId,
    username: req.body.username
  };
  let returnData = {};
  console.log('api/personalscripts', data);
  db.findScripts(data, (err, result1) => {
    if (err) { console.log('error finding user scripts in db', err); }
    else {
      returnData.userId = req.body.userId;
      returnData.scripts = result1;
      db.findTranscripts(data, (err, result2) => {
        if (err) { console.log('error finding user transcripts in db', err); }
        else {
          returnData.transcripts = result2;
          console.log('returnData for api/personalscripts', returnData);
          res.status(200).send(returnData);
        }
      });
    }
  });

});

// Creates Passport session for user by serialized ID
passport.serializeUser((user, done) => {
  console.log('serializing user:', user);
  done(null, user);
});

// Deserializes the user ID for passport to deliver to the session
passport.deserializeUser((user, done) => {
  console.log('deserializing user:', user);
  db.getUserById(user, (err, user) => {
    done(err, user);
  })
});

// wild card routing all pages to the React Router
app.get('/*', sessionChecker, (req, res) => {
  res.status(302).sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(PORT, function() {
  console.log(`listening on port ${PORT}`);
});