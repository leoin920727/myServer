var express = require("express");
var db = require("../db");
var cors = require("cors");
var index = express.Router();
const bookRouter = require("./book");

index.use("/book", bookRouter);

index.get("/", function (req, res) {
  res.send("可以用了");
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



index.post('/login', function (req, res) {
  var sql = `SELECT email,password FROM userinfo`
  var data = [];
  db.exec(sql, data, function (results, fields) {
    res.send(results);
  })
})

// index.post("/login", function (req, res) {
//   var sql = `UPDATE userinfo SET updated_at=NOW() WHERE emails=? and password=?;
//   SELECT * FROM userinfo WHERE email=? and password=?;`
//   var data = [req.body.email, req.body.password]
//   db.exec(sql, data, function (results, fields) {
//     if (results[1].length == 1) {
//       req.session.user = {
//         id: results[1].id,
//         account: results[1].email,
//         rights: results[1].rights,
//         updated_at: results[1].updated_at
//       }
//       res.end(
//         JSON.stringify(new Success('login success'))
//       )
//     } else {
//       res.end(
//         JSON.stringify(new Error('login failed'))
//       )
//     }
//   })

// })

module.exports = index;
