//removes punctuation and compares script and transcript with margin of error for missing or added words.
function scriptComparison(script1, script2) {
  if (!script1.length || !script2.length) {
    return 'Script or Transcript is blank';
  }
  let arr1 = script1.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").replace(/\s{2,}/g," ").toUpperCase().split(' ');
  let transcript = script2.split(' ')
  let arr2 = script2.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").replace(/\s{2,}/g," ").toUpperCase().split(' ');
  let j = 0;
  for(var i = 0; i < arr2.length; i++) {
    if(arr1[j] !== arr2[i]) {
      transcript[i] = "<span className='wrong'>" + transcript[i] + "</span>"
      if(arr1[j+2] === arr2[i]) { j = j + 2};
      if(arr1[j+1] === arr2[i]) { j++ }
      if(arr1[j] === arr2[i+1]) { j-- }
    }
    j++;
  }

  return transcript.join(' ');
}


export default scriptComparison;