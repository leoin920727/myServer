var express = require("express");
var db = require("../db");
var cors = require("cors");
var index = express.Router();

index.get("/", function (req, res) {
  res.send("可以用了");
});

// 後台訂單資料
index.get("/orderlist", function (req, res) {
  const data = [
    {
      orderNumber: "C0021",
      memberId: "M351",
      orderDate: "13/08/23",
      weekOfTimes: "2",
      weekOfAmount: "62",
      price: "1200",
      orderStatus: "0",
    },
    {
      orderNumber: "C0020",
      memberId: "M0121",
      orderDate: "13/08/23",
      weekOfTimes: "2",
      weekOfAmount: "62",
      price: "1200",
      orderStatus: "1",
    },
    {
      orderNumber: "C0020",
      memberId: "M0124",
      orderDate: "13/08/23",
      weekOfTimes: "2",
      weekOfAmount: "62",
      price: "1200",
      orderStatus: "2",
    },
  ];
  res.send(data);
});
// 後台訂單資料(詳細)
index.get("/AdminOrder/:order", function (req, res) {
  const orderNumber = req.params.orderNumber;
  const data = {
    IDnum: "TXXXXXXXXX",
    staffName: "王阿花", //指定人員
    staffId: "M0020", //員工編號
    time_W: "星期三", //服務星期
    time_T: "1300", //服務時段
    memberName: "鍾秋節", //姓名
    memberId: "M351", //會員編號
    phone: "0912345667", //手機
    email: "123@gmail", //電子信箱
    city: "台中市",
    adreess: "黎明路二段658號", //清掃地址 區域
    common: "客廳的花瓶不要移動，那花瓶要十二萬，清理時要小心點。", //訂單備註
    pay: "VISA", //付款方式
    weekOfTimes: 2, //選擇服務週數
    orderDate: "13/08/23", //服務開始日期
    orderNumber: "C0021", //訂單編號
    orderStatus: 0, //訂單狀態
    weekOfAmount: 6, //服務次數
    finish: 2, //完成次數
    price: 1200, //訂單金額
    imgUrl: "/images/vase.png",
    staffPhone: "0912345678",
    staffEmail: "123@gmail.com",
  };
  res.send(data);
});
// 後台訂單更新
index.put("/AdminOrder/updata", function (req, res) {
  const requestData = req.body;
  res.json({ message: "Data received successfully", data: requestData });
});
// 會員評分更新
index.put("/member/updata/:orderID", function (req, res) {
  const requestData = req.body;
  res.json({ message: "Data received successfully", data: requestData });
});
// 會員資料表
index.get("/dashboard/memberInfo", function (req, res) {
  var sql = `SELECT * FROM userinfo`;
  var data = [];
  db.exec(sql, data, function (results, fields) {
    res.send(results);
  });
});
// 會員資料內容 //缺黑名單資料欄位
index.get("/dashboard/PersonalInfo/:uid", function (req, res) {
  const uid = req.params.uid;
  var sql1 = `SELECT * FROM userinfo`;
  var sql2 = `SELECT * FROM userinfo WHERE uid=?`;
  var data = [uid];
  db.exec(sql1, [], function (number, fields) {
    db.exec(sql2, data, function (results, fields) {
      const len = number.length;
      res.send({ data: results, length: len });
    });
  });
});

module.exports = index;
