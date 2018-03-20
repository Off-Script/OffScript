function scriptComparison(script1, script2) {
  let arr1 = script1.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").replace(/\s{2,}/g," ").toUpperCase().split(' ');
  let transcript = script2.split(' ')
  let arr2 = script2.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").replace(/\s{2,}/g," ").toUpperCase().split(' ');
  for(var i = 0; i < arr2.length; i++) {
    if(arr1[i] !== arr2[i]) {
      transcript[i] = "{<p className='wrong'>}" + transcript[i] + "{</p>}"
      if(arr1[i] === arr2[i+1]) { i++ }
      if(arr1[i+1] === arr2[i]) { i-- }
    }
  }

  return transcript.join(' ');
}

export default scriptComparison;