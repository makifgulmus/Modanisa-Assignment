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

describe("Unit testing PUT /todo-items", () => {
  it(
    "captures the put request and updates todo status",
    test(function () {
      this.stub(services, "updateTodo").returns({
        text: "Buy some milk",
        done: true,
      });
      chai
        .request(server)
        .put("/todo-items")
        .send({ text: "Buy some milk", done: false })
        .end((err, res) => {
          res.should.have.status(200);
          expect(res.body).to.deep.equal({
            text: "Buy some milk",
            done: true,
          });
        });
    })
  );
});
