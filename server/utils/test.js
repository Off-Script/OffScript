let toneAnalyzer = require("./helpers.js");


toneAnalyzer.tone(
  {
    tone_input: 'i am very happy because the world is a pleasant and exciting experience every day of my life.',
    content_type: 'text/plain'
  },
  function(err, tone) {
    if (err) {
      console.log(err);
    } else {
      console.log(JSON.stringify(tone, null, 2));
    }
  });