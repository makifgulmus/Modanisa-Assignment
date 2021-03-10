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

describe("Unit testing POST /todo-items", () => {
  it(
    "captures the post request and adds a new todo item",
    test(function () {
      this.stub(services, "createTodo").returns({
        text: "Buy some milk",
        done: false,
      });
      chai
        .request(server)
        .post("/todo-items")
        .send({ text: "Buy some milk", done: false })
        .end((err, res) => {
          res.should.have.status(200);
          expect(res.body).to.deep.equal({
            text: "Buy some milk",
            done: false,
          });
        });
    })
  );
});
