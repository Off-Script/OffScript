var stringSimilarity = require('string-similarity');
var diff = require('diff');

//removes punctuation and compares script and transcript with margin of error for missing or added words.
function scriptComparison(script1, script2) {
  if (!script1.length || !script2.length) {
    return 'Script or Transcript is blank';
  }
  let target = script1.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").replace(/\s{2,}/g," ")
  let recording = script2.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").replace(/\s{2,}/g," ")
  let differences = diff.diffWords(target, recording, {ignoreCase: true});
  let markedScript = ''
  let markedTranscript = ''
  differences.forEach((difference) => {
    if(!difference.added && !difference.removed) {
      markedScript = markedScript.concat(difference.value);
      markedTranscript = markedTranscript.concat(difference.value);
    }
    if(difference.added) {
      markedTranscript = markedTranscript.concat('<span class="wrong">'+ difference.value +'</span>')
    }
    if(difference.removed) {
      markedScript = markedScript.concat('<span class="missing">' + difference.value + '</span>')
    };
  })

  return {
    similarity: Math.floor(stringSimilarity.compareTwoStrings(target, recording) * 100),
    differences,
    markedScript,
    markedTranscript
  }
}

export default scriptComparison;