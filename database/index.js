const pg = require('pg');
const bcrypt = require('bcrypt');
const saltRounds = 5;
const session = require('express-session');
var dbconfig;
if (process.env.NODE_ENV !== 'production') {
  dbconfig = require('../config/dbconfig.js');
}
let connectionString = process.env.DATABASE_URL || dbconfig.DATABASE_URL;

// create new PostgreSQL database client
let client = new pg.Client({
  connectionString: connectionString,
  ssl: true
});

// create new Redis client
let redisClient = require('redis').createClient(process.env.REDIS_URL);

client.connect((err, db, done) => {
  if (err) { console.log('error connecting to database', err); }
  else {
    console.log('connected to PostgreSQL database');
  }
});

module.exports = {
  saveAnalysis: (data, callback) => {
    let scriptData = data.scriptData;
    let transcriptData = data.transcriptData;
    let transcriptId;
    let scriptId;
    client.query('INSERT INTO scripts (script_text, script_data, script_emotion, script_lang, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING id', [scriptData.script_text, scriptData.script_data, scriptData.script_emotion, scriptData.script_lang, data.userId], (err, result) => {
      if (err) {
        console.log('error saving script to database');
        callback(err, null);
      } else {
        console.log('script saved to database');
        scriptId = result.rows[0].id;
        client.query('INSERT INTO transcripts (transcript_text, transcript_data, transcript_emotion, transcript_lang, score_data, comparison, script_id, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id', [transcriptData.transcript_text, transcriptData.transcript_data, transcriptData.transcript_emotion, transcriptData.transcript_lang, data.scoreData, data.comparison, scriptId, data.userId], (err, result) => {
          if (err) {
            console.log('error saving transcript to database');
            callback(err, null);
          } else {
            console.log('transcript saved to database');
            transcriptId = result.rows[0].id;
            let sharedData = { scriptId, transcriptId };
            client.query(`UPDATE scripts SET transcript_id = array_append(transcript_id, ${transcriptId}) WHERE id = ${scriptId}`, (err, result) => {
              if (err) {
                console.log('error updating script with transcript_id in database');
                callback(err, null);
              } else {
                console.log('script_id linked with transcript_id');
                callback(null, sharedData);
              }
            });
          }
        });
      }
    });
  },
  getAnalysis: (data, callback) => {
    let responseData = {};
    let userId = data.userId;
    let scriptId = data.scriptId;
    let transcriptId = data.transcriptId;
    let joinedAnalysis = [];

    client.query(`SELECT * FROM scripts WHERE user_id = ${userId}`, (err, result) => {
      if (err) {
        console.log('error saving script to database');
        callback(err, null);
      } else {
        console.log('script saved to database');
        for (let key in result.rows) {
          let id = result.rows[key][id];
          responseData.scriptData[id] = result.rows[key];
        }
      }
    });
    client.query(`SELECT * FROM transcripts WHERE user_id = ${userId}`, (err, result) => {
      if (err) {
        console.log('error saving script to database');
        callback(err, null);
      } else {
        console.log('script saved to database');
        for (let key in result.rows) {
          let id = result.rows[key][id];
          responseData.transcriptData[id] = result.rows[key];
        }
      }
    });

    for (let key in responseData.transcriptData) {
      let id = transcripts[key][id];
      joinedAnalysis.push([responseData.scriptData[id], transcripts[key]]);
    }
    callback(null, joinedAnalysis);
  },
  saveScript: (data, callback) => {
    client.query('INSERT INTO scripts (script_text, script_data, script_emotion, script_lang) VALUES ($1, $2, $3, $4) RETURNING *', [data.script_text, data.script_data, data.script_emotion, data.script_lang], (err, result) => {
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
    client.query('INSERT INTO transcripts (transcript_text, transcript_data, transcript_emotion, transcript_lang, score_data, comparison) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [data.transcript_text, data.transcript_data, data.transcript_emotion, data.transcript_lang, data.score_data, data.comparison], (err, result) => {
      if (err) {
        console.log('error saving transcript to database');
        callback(err, null);
      } else {
        console.log('transcript saved to database');
        callback(null, result.rows);
      }
    });
  },
  getScripts: (data, callback) => {
    client.query(`SELECT * FROM public_library`, (err, result) => {
      if (err) {
        console.log('error retrieving scripts from database public library');
        callback(err, null);
      } else {
        console.log('scripts retrieved from database public library');
        callback(null, result.rows);
      }
    });

  },
  findScripts: (data, callback) => {
    let jsonData = JSON.stringify(data);
    client.query(`SELECT * FROM scripts WHERE user_id = ${data.userId}`, (err, result) => {
      if (err) {
        console.log('error retrieving user scripts from database');
        callback(err, null);
      } else {
        console.log('user scripts retrieved from database');
        callback(null, result.rows);
      }
    });
  },
  findTranscripts: (data, callback) => {
    let jsonData = JSON.stringify(data);
    client.query(`SELECT * FROM transcripts WHERE user_id = ${data.userId}`, (err, result) => {
      if (err) {
        console.log('error retrieving user transcripts from database');
        callback(err, null);
      } else {
        console.log('user transcripts retrieved from database');
        callback(null, result.rows);
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
  linkUserScripts: (data, callback) => {
    let scriptId = data.scriptId;
    let transcriptId = data.transcriptId;
    let userId = data.currentUserId;
    console.log('linkUserScript data', data);
    let queryScript = `UPDATE scripts SET transcript_id = transcript_id || ${transcriptId} WHERE id IN(SELECT max(id) FROM scripts) RETURNING id`;
    console.log('queryScript', queryScript);
    client.query(queryScript), (err, result) => {
      console.log('inside the first query');
      if (err) {
        console.log('error saving foreign keys to database');
        callback(err, null);
      } else {
        console.log('insert transcript_id executed', result);
        let queryTranscript = `UPDATE transcripts SET script_id = script_id || ${scriptId} WHERE id IN(SELECT max(id) FROM transcripts)`;
        client.query(queryTranscript), scriptId, (err, result) => {
          if (err) {
            console.log('error saving transcript id to scripts table');
            callback(err, null);
          } else {
            console.log('inserted transcriptId to scripts table', result);
            // callback(null, result);
            let queryUserScript = `UPDATE users SET script_ids = script_ids || ${scriptId} WHERE id = ${userId}`;
            let queryUserTranscript = `UPDATE users SET transcript_ids = transcript_ids || ${transcriptId} WHERE id = ${userId}`;
            console.log(queryUserScript);
            console.log(queryUserTranscript);
            client.query(queryUserScript, [scriptId, userId], (err, result) => {
              if (err) {
                console.log('error saving transcript id to scripts table');
                callback(err, null);
              } else {
                console.log('linked user script to user', result);
              }
            });
            // client.query(queryUserTranscript, [transcriptId, userId], (err, result) => {
            //   if (err) {
            //     console.log('error saving transcript id to scripts table');
            //     callback(err, null);
            //   } else {
            //     console.log('linked user transcript to user', result);
            //     callback(null, result);
            //   }
            // });
          }
        }
      }
    }
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
        console.log('user retrieved by id from database');
        callback(null, result);
      }
    });
  }
}
