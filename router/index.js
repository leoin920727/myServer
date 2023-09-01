var express = require("express");
var db = require("../db");
var cors = require("cors");
var index = express.Router();
const bookRouter = require("./book");

index.use("/book", bookRouter);

index.get("/", function (req, res) {
  res.send("可以用了");
});

// 後臺訂單API
index.get("/orderlist", function (req, res) {
  const data = [
    {
      orderNumber: "C0021",
      memberId: "M0121",
      orderDate: "13/08/23",
      weekOfTimes: "2",
      weekOfAmount: "62",
      price: "1200",
      orderStatus: "0",
    },
    {
      orderNumber: "C0020",
      memberId: "M2351",
      orderDate: "13/08/23",
      weekOfTimes: "2",
      weekOfAmount: "61",
      price: "1200",
      orderStatus: "1",
    },
    {
      orderNumber: "C0021",
      memberId: "M0121",
      orderDate: "13/08/23",
      weekOfTimes: "2",
      weekOfAmount: "62",
      price: "200",
      orderStatus: "2",
    },
  ];
  res.send(data);
});

module.exports = index;
