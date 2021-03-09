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
          body: {
            todos: [{ text: "Buy some milk", done: true }],
          },
        },
      })
    );

    it("generates a list of TODO items", async () => {
      const todoItems = await axios.get("http://localhost:1234/todos-list");
      expect(todoItems.data).to.deep.equal({
        todos: [{ text: "Buy some milk", done: true }],
      });
    });
  });

  describe("post request to add a new todo item", () => {
    before(() =>
      provider.addInteraction({
        uponReceiving: "a request to add a new todo item",
        withRequest: {
          method: "POST",
          path: "/todo-items",
          body: { text: "Buy some milk", done: true },
        },
        willRespondWith: {
          status: 200,
        },
      })
    );

    it("properly gets the request for creating a new todo item", async () => {
      chai
        .request("http://localhost:1234")
        .post("/todo-items")
        .send({ text: "Buy some milk", done: true })
        .end(function (err, res) {
          console.log(res.status);
          expect(err).to.be.null;
          expect(res).to.have.status(200);
        });
    });
  });
});
