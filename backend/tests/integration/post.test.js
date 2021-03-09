const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const server = require("../server.js");
const should = chai.should();
const expect = chai.expect;

describe("Testing POST /todo-items", () => {
  it("captures the post request and adds a new todo item", async () => {
    chai
      .request(server)
      .post("/todo-item")
      .send({ text: "Buy some milk", done: false })
      .end((err, res) => {
        res.should.have.status(200);
        expect(res.body).to.deep.equal({ text: "Buy some milk", done: false });
        done();
      });
  });
});
