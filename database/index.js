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
    console.log('data', typeof data, data);
    let text = data.script_text.toString();
    // pool.query(`INSERT INTO script (script_name, author_name) VALUES (${data.script_text}, 'another author')`, (err, table) => {
    //   if (err) {
    //     console.log('error saving script to database', err);
    //     callback(err, null);
    //   } else {
    //     callback(null, table);
    //   }
    // });

    pool.query('INSERT INTO script (script_name, author_name) VALUES ($1, $2)', [text, 'other author'])
      .then((res) => {
        callback(null, res);
      })
      .catch(err => {
        console.error('Error executing query', err.stack);
      });
  }
}