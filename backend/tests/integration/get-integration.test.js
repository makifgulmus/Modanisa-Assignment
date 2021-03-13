const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const server = require("../../server");
const should = chai.should();
const expect = chai.expect;
const axios = require("axios");

describe("Testing GET /todos-list", () => {
  it("captures the get request and returns todo items", function (done) {
    chai
      .request(server)
      .get("/todos-list")
      .end((err, res) => {
        res.should.have.status(200);
        expect(res.body).to.deep.equal([]);
        done();
      });
  });
});
