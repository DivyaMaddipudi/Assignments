var assert = require("chai").assert;
var app = require("../index");
var chai = require("chai");
var expect = require("chai").expect;
//var agent = chai.request.agent(app);
ROOT_URL = "http://localhost:4000";
chai.use(require("chai-http"));

var assert = require("assert");
describe("Array", function () {
  describe("#indexOf()", function () {
    it("should return -1 when the value is not present", function () {
      assert.equal(-1, [1, 2, 3].indexOf(4));
    });
  });
});

describe("Post Signin", () => {
  it("/signin", (done) => {
    chai.request
      .agent(app)
      .post("/signin")
      .send({ email: "divya@gmail.com", password: "divya" })
      .then(function (res) {
        console.log(res.status);
        expect(res).to.have.status(200);
        done();
      })
      .catch((e) => {
        done(e);
      });
  });
});
