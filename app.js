var express = require("express");
var index = require("./router/index");
var dashboard = require("./router/dashboard");
const bodyParser = require("body-parser");
var cors = require("cors");
var app = express();
app.use(bodyParser.json({ limit: '5000mb' }));
app.use(bodyParser.urlencoded({ limit: '5000mb', extended: true }));




//----允許此網域可跨域存取 
const allowedOrigins = ['http://localhost:3000'];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.includes(origin) || !origin) {

      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
//--------------



app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(cors());





app.use("/", dashboard);

app.use("/", index);

app.listen(4107, function () {
  console.log("測試伺服器中:" + new Date().toLocaleTimeString());
});
