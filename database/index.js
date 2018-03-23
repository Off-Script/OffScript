const pg = require('pg');
let connectionString = process.env.OFFSCRIPT_URL || 'localhost';

if (process.env.NODE_ENV !== 'production') {
  const dbconfig = require('../config/dbconfig.js');
}
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
  }
}
