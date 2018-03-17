const pg = require('pg');

let connectionString = process.env.DATABASE_URL || 'postgres://localhost';

// check pooling resource for PostgreSQL connections we have open
let pool = new pg.Pool({
  user: 'postgres',
  database: 'scripts',
  host: 'localhost',
  port: 5432,
  max: 10
});

pool.connect((err, db, done) => {
  if (err) { console.log('error connecting to database', err); }
  else {
    console.log('connected to PostgreSQL database');
  }
});

module.exports = {
  saveScript: (data, callback) => {
    console.log('data', data);
    // client.query('INSERT INTO script (script_name, script_author, id) VALUES ($1, $2)', [data.script_name, data.author_name], (err, table) => {
    //   if (err) {
    //     console.log('error saving script to database', err);
    //     callback(err, null);
    //   } else {
    //     callback(null, table);
    //   }
    // });
  }
}