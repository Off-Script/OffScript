let toneAnalysis = require("./helpers.js").toneAnalysis;
let languageAnalysis = require('./helpers.js').languageAnalysis;

// console.log('face analysis of a sad man:')
// faceAnalyzer('https://pbs.twimg.com/profile_images/950848403100942337/WfCsrOjz_400x400.jpg');

console.log('natural language analysis of macbeth: ')
languageAnalysis({'textToAnalyze': "Is this a dagger which I see before me, The handle toward my hand? Come, let me clutch thee. I have thee not, and yet I see thee still.",  'features': {keywords: {sentiment: true, limit: 10}}})
  .then((results) => console.log('success!' + JSON.stringify(results, null, 2)))
  .catch((error) => console.log('failure. ' + error.message))

// console.log('tone analysis of a guy in a good mood:')
// toneAnalysis({'textToAnalyze': "I'm in a really good mood!"})
//   .then((results) => console.log('success!' + JSON.stringify(results, null, 2)))
//   .catch((error) => console.log('failure. ' + error.message))