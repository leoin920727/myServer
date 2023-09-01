var express = require("express");
var index = require("./router/index");
const bodyParser = require("body-parser");
var cors = require("cors");
var app = express();

app.use(bodyParser.json());
app.use(cors());
app.use("/", index);

app.listen(4107, function () {
  console.log("測試伺服器中:" + new Date().toLocaleTimeString());
});
