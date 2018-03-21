const express = require('express');
const path = require('path')
const bodyParser = require('body-parser'); 
let pg = require('pg'); 
let db = require('../database/index.js');
let dbHelpers = require('./utils/dbHelpers.js');
let helpers = require('./utils/helpers.js')

const app = express();

let PORT = process.env.PORT || 3000;

// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true }));

// Serves static files to client
app.use(express.static(path.join(__dirname, '../dist')));

// cors
app.use((req, res, next) =>{
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Sends script and transcript to Watson, then to db + client
app.post('/api/script', (req, res) => {
  Promise.all([
    helpers.toneAnalysis({textToAnalyze: req.body.script}),
    helpers.toneAnalysis({textToAnalyze: req.body.transcript}),
    helpers.languageAnalysis({
      textToAnalyze: req.body.script,
      features: {keywords: {sentiment: true, limit: 10}}
    }),
    helpers.languageAnalysis({
      textToAnalyze: req.body.transcript,
      features: {keywords: {sentiment: true, limit: 10}}
    })
  ])
  .then((results) => {
    let data = {
      text: req.body,
      results
    };
    dbHelpers.parseData(data, (err, result) => {
      if (err) { console.log('error parsing data with dbHelpers', err); }
      else {
        db.saveScript(result.scriptData, (err, result) => {
          if (err) { console.log('error saving script to db', err); }
          else {
            console.log('script saved to database', result);
          }
        });
        db.saveTranscript(result.transcriptData, (err, result) => {
          if (err) { console.log('error saving transcript to db', err); }
          else {
            console.log('transcript saved to database', result);
          }
        });
      }
    });
    res.status(200).end(JSON.stringify(results));
  })
  .catch((error) => {
    res.end(error.error)
  })
});

// wild card routing all pages to the React Router
app.get('/*', (req, res) => {
  res.status(302).sendFile(path.join(__dirname, '../dist/index.html'));
});

module.exports = app.listen(PORT, function() {
  console.log(`listening on port ${PORT}`);
});