const pg = require('pg');

let connectionString = process.env.DATABASE_URL || 'localhost';

// check pooling resource for PostgreSQL connections we have open
let client = new pg.Pool({
  user: 'postgres',
  database: 'offscript',
  host: connectionString,
  port: 5432,
  max: 10,
  idleTimeoutMillis: 1000,
  connectionTimeoutMillis: 1000
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