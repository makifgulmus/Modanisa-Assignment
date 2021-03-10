var express = require("express");
var app = express();
var router = express.Router();
const bodyParser = require("body-parser");
var services = require("../services");

router.use(bodyParser.json());

router.get("/todos-list", (req, res) => {
  res.status(200).json(services.getTodos());
});

router.post("/todo-items", (req, res) => {
  res.set("Content-Type", "application/json; charset=utf-8");
  res.status(200).json(services.createTodo(`${req.body.text}`, req.body.done));
});

module.exports = router;
