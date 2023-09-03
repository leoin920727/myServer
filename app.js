var express = require("express");
var index = require("./router/index");
var cors = require("cors");
var app = express();

app.use(
  cors({
    origin: ["http://localhost:3000"],
  })
);
app.use("/", index);

app.listen(4107, function () {
  console.log("測試伺服器中:" + new Date().toLocaleTimeString());
});
