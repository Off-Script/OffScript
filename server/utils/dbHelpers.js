const pg = require('pg');
const db = require('../../database/index.js');
const session = require('express-session');
let axios = require('axios');

module.exports = {
  parseData: (data, callback) => {
    console.log('parsing data');
    let scriptData = {
      script_text: data.script,
      script_data: data.data.scriptData,
      script_emotion: data.data.scriptEmotion,
      script_lang: data.data.scriptLang
    };

    let transcriptData = {
      transcript_text: data.transcript,
      transcript_data: data.data.transData,
      transcript_emotion: data.data.transEmotion,
      transcript_lang: data.data.transLang,
      score_data: data.data.scoreData,
      comparison: data.comparison
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
