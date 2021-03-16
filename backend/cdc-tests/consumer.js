const path = require("path");
const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const axios = require("axios");
const { Pact } = require("@pact-foundation/pact");
const chaiAsPromised = require("chai-as-promised");
const expect = chai.expect;

describe("Pact", () => {
  const provider = new Pact({
    consumer: "frontend",
    provider: "backend",
    port: 1234,
    log: path.resolve(process.cwd(), "logs", "pact.log"),
    dir: path.resolve(process.cwd(), "pacts"),
    logLevel: "INFO",
  });

  before(() => provider.setup());

  after(async function () {
    await provider.finalize();
  });

  describe("get request with correct parameters", () => {
    before(() =>
      provider.addInteraction({
        uponReceiving: "a request for all the todo items",
        withRequest: {
          method: "GET",
          path: "/todos-list",
        },
        willRespondWith: {
          status: 200,
          body: [
            {
              text: "Buy some milk",
              done: false,
            },
          ],
        },
      })
    );

    it("generates a list of TODO items", async () => {
      const todoItems = await axios.get("http://localhost:1234/todos-list");
      expect(todoItems.data).to.deep.equal([
        {
          text: "Buy some milk",
          done: false,
        },
      ]);
    });
  });

  describe("post request to add a new todo item", () => {
    before(() =>
      provider.addInteraction({
        uponReceiving: "a request to add a new todo item",
        withRequest: {
          method: "POST",
          path: "/todo-items",
          headers: { "Content-Type": "application/json" },
          body: { text: "Buy some milk", done: false },
        },
        willRespondWith: {
          status: 200,
          headers: { "Content-Type": "application/json; charset=utf-8" },
          body: { text: "Buy some milk", done: false },
        },
      })
    );

    it("properly gets the request for creating a new todo item", async () => {
      chai
        .request("http://localhost:1234")
        .post("/todo-items")
        .set("Content-Type", "application/json")
        .send({ text: "Buy some milk", done: false })
        .end(function (err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.deep.equal({
            text: "Buy some milk",
            done: false,
          });
        });
    });
  });

  describe("put request to update todo status", () => {
    before(() =>
      provider.addInteraction({
        uponReceiving: "a request to update status of a todo item",
        withRequest: {
          method: "PUT",
          path: "/todo-items",
          headers: { "Content-Type": "application/json" },
          body: { text: "Buy some milk", done: false },
        },
        willRespondWith: {
          status: 200,
          headers: { "Content-Type": "application/json; charset=utf-8" },
          body: { text: "Buy some milk", done: true },
        },
      })
    );

    it("correctly updates the status of todo item", async () => {
      chai
        .request("http://localhost:1234")
        .put("/todo-items")
        .set("Content-Type", "application/json")
        .send({ text: "Buy some milk", done: false })
        .end(function (err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.deep.equal({
            text: "Buy some milk",
            done: true,
          });
        });
    });
  });

  describe("delete request to remove a todo", () => {
    before(() =>
      provider.addInteraction({
        uponReceiving: "a request to delete a todo item",
        withRequest: {
          method: "DELETE",
          path: "/todo-items",
          headers: { "Content-Type": "application/json" },
        },
        willRespondWith: {
          status: 200,
          headers: { "Content-Type": "application/json; charset=utf-8" },
          body: { msg: "Todo Deleted" },
        },
      })
    );

    it("correctly deletes a todo item", async () => {
      chai
        .request("http://localhost:1234")
        .delete("/todo-items")
        .set("Content-Type", "application/json")
        .end(function (err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.deep.equal({ msg: "Todo Deleted" });
        });
    });
  });
});
