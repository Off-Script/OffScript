var expect = require('chai').expect;
var request = require('request');

var app = require('../server/index.js')
var helpers = require('../server/utils/helpers.js')
var db = require('../database/index.js')

describe('server API call helpers', function() {
  describe('Watson Tone Analysis API', function() {
    it('Should should make an authenticated request to the service', function() {
      var response = false;
      helpers.toneAnalyzer.tone(
        {
          tone_input: 'i am very happy because the world is a pleasant and exciting experience every day of my life.',
          content_type: 'text/plain'
        },
        function(err, tone) {
          if (err) {
            console.log(err);
          } else {
            response = true;
            expect(response).to.equal(true)
          }
        }
      );
    })
    it('Should return an analysis with appropriate data', function() {
      var response = false;
      helpers.toneAnalyzer.tone(
        {
          tone_input: 'i am very happy because the world is a pleasant and exciting experience every day of my life.',
          content_type: 'text/plain'
        },
        function(err, tone) {
          if (err) {
            console.log(err);
          } else {
            response = tone
            expect(response.document_tone.tone_categories[0].tones[3].score).isAbove(.5)
          }
        }
      );
    })
  })
});