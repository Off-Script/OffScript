const pg = require('pg');
const db = require('../../database/index.js');
const session = require('express-session');
let axios = require('axios');

module.exports = {
  parseData: (data, callback) => {
    console.log('parsing data');

    let parsedData = {
      scriptData: data.script,
      transcriptData: data.transcript,
      scoreData: data.scoreData,
      comparison: data.comparison,
      currentUserId: data.currentUserId
    };
    callback(null, parsedData);
  },
  createSession: (req, res, newUser) => {
    return req.session.regenerate(() => {
      req.session.user = newUser.username;
      res.cookie('loggedIn', 'true', { maxAge: 60 * 60 * 1000 });
      res.status(200).send('Successfully logged in');
    });
  }
};
