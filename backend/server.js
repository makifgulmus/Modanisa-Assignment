const express = require("express");
const app = express();
require("dotenv").config({ path: "../.env" });

const PORT = process.env.PORT || 5000;

var routing = require("./routes/routes");
app.use(routing);

if (!module.parent) {
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}
module.exports = app;
