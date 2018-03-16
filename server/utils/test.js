let toneAnalyzer = require("./helpers.js").toneAnalyzer;
let natLang = require('./helpers.js').natLang
let faceAnalyzer = require('./helpers.js').faceAnalyzer

console.log('face analysis of a sad man:')
faceAnalyzer('https://pbs.twimg.com/profile_images/950848403100942337/WfCsrOjz_400x400.jpg');

console.log('natural language analysis of macbeth: ')
natLang.analyze(
  {
    html: "Is this a dagger which I see before me, The handle toward my hand? Come, let me clutch thee. I have thee not, and yet I see thee still. Art thou not, fatal vision, sensible To feeling as to sight? or art thou but A dagger of the mind, a false creation, Proceeding from the heat-oppressed brain? I see thee yet, in form as palpable As this which now I draw. Thou marshall'st me the way that I was going; And such an instrument I was to use. Mine eyes are made the fools o' the other senses, Or else worth all the rest; I see thee still, And on thy blade and dudgeon gouts of blood, Which was not so before. There's no such thing: It is the bloody business which informs Thus to mine eyes. Now o'er the one halfworld Nature seems dead, and wicked dreams abuse The curtain'd sleep; witchcraft celebrates Pale Hecate's offerings, and wither'd murder, Alarum'd by his sentinel, the wolf, Whose howl's his watch, thus with his stealthy pace. With Tarquin's ravishing strides, towards his design Moves like a ghost. Thou sure and firm-set earth, Hear not my steps, which way they walk, for fear Thy very stones prate of my whereabout, And take the present horror from the time, Which now suits with it. Whiles I threat, he lives: Words to the heat of deeds too cold breath gives. I go, and it is done; the bell invites me. Hear it not, Duncan; for it is a knell That summons thee to heaven or to hell. ",
    features: {
      keywords: {sentiment: true, limit: 10}
    }
  },
  function(err, response) {
    if (err) {
      console.log('error:', err);
    } else {
      console.log(JSON.stringify(response, null, 2));
    }
  }
);

console.log('tone analysis of a guy in a good mood:')
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