const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const server = require("../../server");
const should = chai.should();
const expect = chai.expect;

describe("Testing DELETE /todo-items", () => {
  it("captures the delete request and deletes the todo item", function (done) {
    chai
      .request(server)
      .delete("/todo-items")
      .send({ text: "Buy some milk", done: false })
      .end((err, res) => {
        res.should.have.status(200);
        expect(res.body).to.deep.equal({
          msg: "Todo Deleted",
        });
        done();
      });
  });
});
