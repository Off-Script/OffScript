let ToneAnalyzer = require("watson-developer-cloud/tone-analyzer/v3")
let toneAPI = require ("../../config/toneAPI.js")

 let toneAnalyzer = new ToneAnalyzer({
  username: toneAPI.credentials.username,
  password: toneAPI.credentials.password,
  version: '2016-05-19',
  url: 'https://gateway.watsonplatform.net/tone-analyzer/api/'
});

module.exports = toneAnalyzer;