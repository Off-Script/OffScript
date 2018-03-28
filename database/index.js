const pg = require('pg');
const bcrypt = require('bcrypt');
const saltRounds = 5;
const session = require('express-session');
var dbconfig;
if (process.env.NODE_ENV !== 'production') {
  dbconfig = require('../config/dbconfig.js');
}
let connectionString = process.env.DATABASE_URL || dbconfig.DATABASE_URL;

// create new database client
let client = new pg.Client({
  connectionString: connectionString,
  ssl: true
});

client.connect((err, db, done) => {
  if (err) { console.log('error connecting to database', err); }
  else {
    console.log('connected to PostgreSQL database');
  }
});

module.exports = {
  saveScript: (data, callback) => {
    client.query('INSERT INTO scripts (script_text, script_tones, script_usage) VALUES ($1, $2, $3) RETURNING *', [data.script_text, data.script_tones, data.script_usage], (err, result) => {
      if (err) {
        console.log('error saving script to database');
        callback(err, null);
      } else {
        console.log('script saved to database');
        callback(null, result.rows);
      }
    });
  },
  saveTranscript: (data, callback) => {
    client.query('INSERT INTO transcripts (transcript_text, transcript_tones, transcript_usage) VALUES ($1, $2, $3) RETURNING *', [data.transcript_text, data.transcript_tones, data.transcript_usage], (err, result) => {
      if (err) {
        console.log('error saving transcript to database');
        callback(err, null);
      } else {
        console.log('transcript saved to database');
        callback(null, result.rows);
      }
    });
  },
  findScript: (data, callback) => {
    let jsonData = JSON.stringify(data);
    client.query(`SELECT * FROM script WHERE script_text LIKE "%${jsonData}%"`, (err, result) => {
      if (err) {
        console.log('error saving script to database');
        callback(err, null);
      } else {
        console.log('script saved to database');
        callback(null, result);
      }
    });
  },
  findTranscript: (data, callback) => {
    let jsonData = JSON.stringify(data);
    client.query(`SELECT * FROM script WHERE transcript_text LIKE "%${jsonData}%"`, (err, result) => {
      if (err) {
        console.log('error saving script to database');
        callback(err, null);
      } else {
        console.log('script saved to database');
        callback(null, result);
      }
    });
  },
  saveUser: (data, callback) => {
    let plainTextPassword = data.password;

    //bcrypt password before saving to database
    bcrypt.hash(plainTextPassword, saltRounds, (err, hash) => {
      client.query('INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *', [data.username, hash], (err, result) => {
        if (err) {
          console.log('error saving user to database');
          callback(err, null);
        } else {
          console.log('user saved to database');
          callback(null, result.rows);
        }
      });
    });
  },
  getUser: (data, callback) => {
    let attemptedPassword = data.password;
    let username = data.username;
    client.query(`SELECT * FROM users WHERE username = '${username}'`, (err, result) => {
      if (err) {
        console.log('error getting user from database');
        callback(err, null);
      } else if (result.rowCount === 0) {
        let message = { errors: { username: 'username not found, try again' } };
        callback(message, null);
      } else {
        let message = { errors: { password: 'Incorrect password submission, try again'} };
        let password = result.rows[0].password;
        bcrypt.compare(attemptedPassword, password, (err, isMatch) => {
          if (err) { callback(err, null); }
          if (isMatch) {
            callback(null, result.rows[0]);
          } else if (!isMatch) {
            callback(message, null);
          }
        })
      }
    });

  },
  // Get user by id to feed Passport deserialize user in server
  getUserById: (id, callback) => {
    client.query(`SELECT * FROM users WHERE id = ${id}`, (err, result) => {
      if (err) {
        console.log('error getting user by id from database');
        callback(err, null);
      } else {
        console.log('user retrieve by id from database');
        callback(null, result);
      }
    });
  }
}
