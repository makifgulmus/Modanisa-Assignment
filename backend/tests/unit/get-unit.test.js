const sinon = require("sinon");
var sinonTest = require("sinon-test");
var test = sinonTest(sinon);
const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const should = chai.should();
const expect = chai.expect;
var services = require("../../services");
const server = require("../../server");

describe("Unit testing GET /todos-list", () => {
  it("captures the get request and returns the todo items", async function () {
    sinon.stub(services, "getTodos").returns([
      {
        text: "Buy some milk",
        done: false,
      },
    ]);
    chai
      .request(server)
      .get("/todos-list")
      .end((err, res) => {
        res.should.have.status(200);
        expect(res.body).to.deep.equal([
          {
            text: "Buy some milk",
            done: false,
          },
        ]);
      });
  });
});
