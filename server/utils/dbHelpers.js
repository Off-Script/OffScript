const pg = require('pg');
const db = require('../../database/index.js');
const session = require('express-session');
let axios = require('axios');

module.exports = {
  parseData: (data, callback) => {
    let scriptData = {
      script_text: data.text.script,
      script_tones: data.results[0],
      script_usage: data.results[2]
    };

    let transcriptData = {
      transcript_text: data.text.transcript,
      transcript_tones: data.results[1],
      transcript_usage: data.results[3]
    };

    let parsedData = {
      scriptData,
      transcriptData
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
