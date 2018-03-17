const pg = require('pg');

let connectionString = process.env.DATABASE_URL || 'postgres://localhost';

// check pooling resource for PostgreSQL connections we have open
let pool = new pg.Pool({
  user: 'postgres',
  database: 'scripts',
  host: 'localhost',
  port: 5432,
  max: 10,
  idleTimeoutMillis: 1000,
  connectionTimeoutMillis: 1000
});

pool.connect((err, db, done) => {
  if (err) { console.log('error connecting to database', err); }
  else {
    console.log('connected to PostgreSQL database');
  }
});

module.exports = {
  saveScript: (data, callback) => {
    console.log('typeof data is:', typeof data, 'data is:', data);
    let jsonData = JSON.stringify(data);

    pool.query('INSERT INTO script (script_text) VALUES ($1)', [jsonData], (err, result) => {
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