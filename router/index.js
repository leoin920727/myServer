var express = require("express");
var index = express.Router();

index.get("/", function (req, res) {
    res.send("可以用了");
})

module.exports = index;