var expect = require('chai').expect;
var request = require('supertest');

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
            expect(response.document_tone.tone_categories[0].tones[3].score).above(.5)
          }
        }
      );
    })
  })
});

describe('server requests', function() {
  describe('get request', function() {
    var server;
    beforeEach(function() {
      server = require('../server/index.js');
    })
    afterEach(function() {
      server.close();
    })
    it('Should return a response to /', function(done) {
      request(server)
        .get('/')
        .expect(200, done);
    })
    it('Should return a 302 to nonexistent endpoint', function(done) {
      request(server)
        .get('/moxie')
        .expect(302, done);
    })
  })

  describe('post request', function() {
    var server;
    beforeEach(function() {
      server = require('../server/index.js');
    })
    afterEach(function() {
      server.close();
    })
    it('Should return a 201 to /api/script', function(done) {
      request(server)
        .post('/api/script')
        .send({script: 'This is a test script'})
        .expect(201, done);
    })
    it('Should return a 404 to nonexistent endpoint', function(done) {
      request(server)
        .post('/moxie')
        .expect(404, done);
    })
  })
});