var expect = require("chai").expect;
var request = require("supertest");

// var helpers = require("../server/utils/helpers.js");
var db = require("../database/index.js");

// describe("server API call helpers", function() {
//   describe("Watson Tone Analysis API", function() {
//     it("Should should make an authenticated request to the service", function() {
//       var response = false;
//       helpers.toneAnalyzer.tone(
//         {
//           tone_input: "i am very happy because the world is a pleasant and exciting experience every day of my life.",
//           content_type: "text/plain"
//         },
//         function(err, tone) {
//           if (err) {
//             console.log(err);
//           } else {
//             response = true;
//             expect(response).to.equal(true);
//           }
//         }
//       );
//     });
//     it("Should return an analysis with appropriate data", function() {
//       var response = false;
//       helpers.toneAnalyzer.tone(
//         {
//           tone_input: "i am very happy because the world is a pleasant and exciting experience every day of my life.",
//           content_type: "text/plain"
//         },
//         function(err, tone) {
//           if (err) {
//             console.log(err);
//           } else {
//             response = tone;
//             expect(response.document_tone.tone_categories[0].tones[3].score).above(.5);
//           }
//         }
//       );
//     });
//   });

//   describe("Watson Natural Language API", function() {
//     it("Should should make an authenticated request to the service", function() {
//       var response = false;
//       helpers.natLang.analyze(
//         {
//           html: "i am very happy because the world is a pleasant and exciting experience every day of my life.",
//           features: {
//             keywords: {sentiment: true, limit: 10}
//           }
//         },
//         function(err, data) {
//           if (err) {
//             console.log(err);
//           } else {
//             response = true;
//             expect(response).to.equal(true);
//           }
//         }
//       );
//     });
//     it("Should return an analysis with keyword data", function() {
//       helpers.toneAnalyzer.tone(
//         {
//           tone_input: "i am very happy because the world is a pleasant and exciting experience every day of my life.",
//           content_type: "text/plain"
//         },
//         function(err, data) {
//           if (err) {
//             console.log(err);
//           } else {
//             expect(data.keywords).to.exist;
//           }
//         }
//       );
//     });
//   });

//   describe("Azure Facial Analysis API", function() {
//     it("Should should make an authenticated request to the service", function() {
//       var response = false;
//       helpers.faceAnalyzer("https://pbs.twimg.com/profile_images/950848403100942337/WfCsrOjz_400x400.jpg", function(data) {
//         expect(data).to.exist;
//       });
//     });
//     it("Should return an analysis with accurate emotion data", function() {
//       helpers.faceAnalyzer("https://pbs.twimg.com/profile_images/950848403100942337/WfCsrOjz_400x400.jpg", function(data) {
//         expect(data.emotion.sadness).isAbove(.5);
//       });
//     });
//   });
// });
describe("server requests", function() {
  describe("get request", function() {
    var server;
    beforeEach(function() {
      server = require("../server/index.js");
    });
    afterEach(function() {
      server.close();
    });
    it("Should return a response to /", function(done) {
      request(server)
        .get("/")
        .expect(200, done);
    });
    it("Should return a 302 to nonexistent endpoint", function(done) {
      request(server)
        .get("/moxie")
        .expect(302, done);
    });
  });

  describe("post request", function() {
    var server;
    beforeEach(function() {
      server = require("../server/index.js");
    });
    afterEach(function() {
      server.close();
    });
    it("Should return a 201 to /api/script", function(done) {
      request(server)
        .post("/api/script")
        .send({script: "This is a test script"})
        .expect(201, done);
    });
    it("Should return a 404 to nonexistent endpoint", function(done) {
      request(server)
        .post("/moxie")
        .expect(404, done);
    });
  });
});

describe("database requests", () => {
  describe("POST", () => {
    it("should post scripts to the database", () => {
      let scriptData = { script: "This is Moxie's favorite script",
        tone: "{\"document_tone\":{\"tone_categories\":[{\"tones\":[{\"score\":0.328683,\"tone_id\":\"anger\",\"tone_name\":\"Anger\"},{\"score\":0.160157,\"tone_id\":\"disgust\",\"tone_name\":\"Disgust\"},{\"score\":0.285003,\"tone_id\":\"fear\",\"tone_name\":\"Fear\"},{\"score\":0.062344,\"tone_id\":\"joy\",\"tone_name\":\"Joy\"},{\"score\":0.047407,\"tone_id\":\"sadness\",\"tone_name\":\"Sadness\"}],\"category_id\":\"emotion_tone\",\"category_name\":\"Emotion Tone\"},{\"tones\":[{\"score\":0,\"tone_id\":\"analytical\",\"tone_name\":\"Analytical\"},{\"score\":0,\"tone_id\":\"confident\",\"tone_name\":\"Confident\"},{\"score\":0,\"tone_id\":\"tentative\",\"tone_name\":\"Tentative\"}],\"category_id\":\"language_tone\",\"category_name\":\"Language Tone\"},{\"tones\":[{\"score\":0.56772,\"tone_id\":\"openness_big5\",\"tone_name\":\"Openness\"},{\"score\":0.316341,\"tone_id\":\"conscientiousness_big5\",\"tone_name\":\"Conscientiousness\"},{\"score\":0.425373,\"tone_id\":\"extraversion_big5\",\"tone_name\":\"Extraversion\"},{\"score\":0.467235,\"tone_id\":\"agreeableness_big5\",\"tone_name\":\"Agreeableness\"},{\"score\":0.311545,\"tone_id\":\"emotional_range_big5\",\"tone_name\":\"Emotional Range\"}],\"category_id\":\"social_tone\",\"category_name\":\"Social Tone\"}]}}" };
      db.saveScript(scriptData, (err, res) => {
        if (err) { console.log("error querying database from pool.connect in spec file", err); }
        else {
          console.log("Saved script text to PostgreSQL from spec file", JSON.stringify(res));
          expect(res.script_text).to.equal(scriptData.script);
        }
      });
    });
  });

  describe("GET", () => {
    it ("responded with correct database query result", () => {
      let scriptQuery = "favorite script";
      db.findScript(scriptQuery, (err, res) => {
        if (err) { console.log("error querying database from pool.connect in spec file", err); }
        else {
          console.log("Retrieved script from PostgreSQL from spec file", JSON.stringify(res));
          expect(res.body.script_text).to.be.a("string").that.includes(scriptQuery);
        }
      });
    });
  });
});