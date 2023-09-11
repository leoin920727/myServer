var express = require("express");
var index = require("./router/index");
var dashboard = require("./router/dashboard");
var login = require("./router/login")
const bodyParser = require("body-parser");
var cors = require("cors");
var app = express();
const session = require("express-session");
const cookieParser = require('cookie-parser');





//----允許此網域可跨域存取 
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
//--------------



app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());







app.use("/", dashboard);
app.use("/", index);
app.use("/", login)

app.listen(4107, function () {
  console.log("測試伺服器中:" + new Date().toLocaleTimeString());
});
