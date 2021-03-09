const pact = require("@pact-foundation/pact-node");
const path = require("path");
require("dotenv").config({ path: __dirname + `/../.env` });

//Will be removed before going live, just commented out to work manually for now
/* if (!process.env.CI && !process.env.PUBLISH_PACT) {
  console.log("skipping Pact publish...");
  return;
} */
let pactBrokerUrl = process.env.PACT_BROKER_BASE_URL;
let pactBrokerToken = process.env.PACT_BROKER_TOKEN;

const gitHash = require("child_process")
  .execSync("git rev-parse --short HEAD")
  .toString()
  .trim();

const opts = {
  pactFilesOrDirs: [path.resolve(__dirname, "./pacts/")],
  pactBroker: pactBrokerUrl,
  pactBrokerToken: pactBrokerToken,
  consumerVersion: gitHash,
};

pact
  .publishPacts(opts)
  .then(() => {
    console.log("Pact contract publishing complete!");
  })
  .catch((e) => {
    console.log("Pact contract publishing failed: ", e);
  });
