var express = require("express");
var db = require("../db");
var cors = require("cors");
var index = express.Router();
const bookRouter = require("./book");

index.use("/book", bookRouter);

index.get("/", function (req, res) {
  res.send("可以用了");
});

module.exports = index;
