const express = require('express');
const path = require('path')
const bodyParser = require('body-parser'); 
let pg = require('pg'); 
// let db = require('../database/index.js');

const app = express();

let PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Serves static files to client
app.use(express.static(path.join(__dirname, '../dist')));

// wild card routing all pages to the React Router
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(PORT, function() {
  console.log(`listening on port ${PORT}`);
});