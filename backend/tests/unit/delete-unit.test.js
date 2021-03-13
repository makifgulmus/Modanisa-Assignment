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

describe("Unit testing DELETE /todo-items", () => {
  it(
    "captures the delete request and deletes the todo item",
    test(function () {
      this.stub(services, "deleteTodo").returns({
        msg: "Todo Deleted",
      });
      chai
        .request(server)
        .delete("/todo-items")
        .send({ text: "Buy some milk", done: false })
        .end((err, res) => {
          res.should.have.status(200);
          expect(res.body).to.deep.equal({
            msg: "Todo Deleted",
          });
        });
    })
  );
});
