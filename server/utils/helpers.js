let ToneAnalyzer = require("watson-developer-cloud/tone-analyzer/v3")
let toneAPI = require ("../../config/toneAPI.js")
let NatLang = require('watson-developer-cloud/natural-language-understanding/v1.js');
let natlangAPI = require('../../config/natlangAPI.js')

 let toneAnalyzer = new ToneAnalyzer({
  username: toneAPI.credentials.username,
  password: toneAPI.credentials.password,
  version: '2016-05-19',
  url: 'https://gateway.watsonplatform.net/tone-analyzer/api/'
});

 let natLang = new NatLang({
  username: natlangAPI.credentials.username,
  password: natlangAPI.credentials.password,
  version: '2016-05-19',
  url:  "https://gateway.watsonplatform.net/natural-language-understanding/api"
});

module.exports.toneAnalyzer = toneAnalyzer;
module.exports.natLang = natLang;