const pg = require('pg');
const db = require('../../database/index.js');
let axios = require('axios');

module.exports = {
  parseData: (data, callback) => {
    console.log('Got the data from server promise calls');
    if (err) {
      console.log('error parsing data inside dbHelpers file', err);
      callback(err, null);
    } else {
      let parsedData = {
        script_text: data.text.script,
        script_tones: data.results[0],
        script_usage: data.results[2],
        transcript_text: data.text.transcript,
        transcript_tones: data.results[1],
        transcript_usage: data.results[3]
      }
      callback(null, parsedData);
    }
  }
};
