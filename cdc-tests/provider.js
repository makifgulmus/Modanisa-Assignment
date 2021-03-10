const { Verifier } = require("@pact-foundation/pact");
const path = require("path");
const axios = require("axios");
require("dotenv").config({ path: __dirname + `/../.env` });

const app = require("express")();
var apiserver = require("../backend/server");
app.use(apiserver);
app.use(axios);
const server = app.listen("5000");

describe("Pact Verification", () => {
  it("validates the expectations of frontend", () => {
    axios.post("http://localhost:5000/todo-items", {
      text: "Buy some milk",
      done: false,
    });
    const opts = {
      logLevel: "INFO",
      providerBaseUrl: "http://localhost:5000",
      provider: "backend",
      providerVersion: "1.0.0",
      pactBrokerUrl: process.env.PACT_BROKER_BASE_URL,
      pactBrokerToken: process.env.PACT_BROKER_TOKEN,
      publishVerificationResult: true,
    };
    return new Verifier(opts)
      .verifyProvider()
      .then((output) => {
        console.log(output);
      })
      .finally(() => {
        server.close();
      });
  });
});
