let ToneAnalyzer = require("watson-developer-cloud/tone-analyzer/v3")
let toneAPI = require ("../../config/toneAPI.js")
let NatLang = require('watson-developer-cloud/natural-language-understanding/v1.js');
let natlangAPI = require('../../config/natlangAPI.js')
let azureAPI = require('../../config/azureAPI.js')
let axios = require('axios');

function faceAnalyzer(image, cb) {
  axios({
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Ocp-Apim-Subscription-Key' : azureAPI.credentials.key2
    },
    url: "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceAttributes=emotion",
    data: {
      "url": image
    }
  })
  .then(function(response) {
    cb(response.data[0].faceAttributes)
  })
  .catch(function(response) {
    console.log(response.response)
  })
}
function languageAnalysis(params) {
  return new Promise(function(resolve, reject) {
    let res = {};

    let url = params.url || 'https://gateway.watsonplatform.net/natural-language-understanding/api';
    let use_unauthenticated = params.use_unauthenticated || false;

    const language_analyzer = new NatLang({
      'username': natlangAPI.credentials.username,
      'password': natlangAPI.credentials.password,
      'version_date': '2016-05-19',
      'url': url,
      'use_unauthenticated': use_unauthenticated
    });

    language_analyzer.analyze({'text': params.textToAnalyze, 'features': params.features}, function(err, res) {
      if(err)
        reject(err);
      else
        resolve(res);
    });
  });
}

function toneAnalysis(params) {
  return new Promise(function (resolve, reject) {
    let res = {};

    let url = params.url || 'https://gateway.watsonplatform.net/tone-analyzer/api' ;
    let use_unauthenticated =  params.use_unauthenticated || false ;

    const tone_analyzer = new ToneAnalyzer({
      'username': toneAPI.credentials.username,
      'password':  toneAPI.credentials.password,
      'version_date': '2016-05-20',
      'url' : url,
      'use_unauthenticated': use_unauthenticated
    });

    tone_analyzer.tone({'text': params.textToAnalyze}, function(err, res) {
      if (err)
        reject(err);
      else
        resolve(res);
    });
  });
}


let natLang = new NatLang({
  username: natlangAPI.credentials.username,
  password: natlangAPI.credentials.password,
  version: '2016-05-19',
  url:  "https://gateway.watsonplatform.net/natural-language-understanding/api"
});


module.exports.faceAnalyzer = faceAnalyzer;
module.exports.toneAnalysis = toneAnalysis;
module.exports.languageAnalysis = languageAnalysis;