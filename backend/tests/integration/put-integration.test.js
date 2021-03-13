const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const server = require("../../server");
const should = chai.should();
const expect = chai.expect;

describe("Testing PUT /todo-items", () => {
  it("captures the put request and adds a new todo item", function (done) {
    chai
      .request(server)
      .put("/todo-items")
      .send({ text: "Buy some milk", done: false })
      .end((err, res) => {
        res.should.have.status(200);
        expect(res.body).to.deep.equal({ text: "Buy some milk", done: true });
        done();
      });
  });
});
