var express = require("express");
var db = require("../db");
var cors = require("cors");
var index = express.Router();
const bookRouter = require("./book");
index.use("/book", bookRouter);

const total = require("./ass");
index.use("/total", total);

index.get("/", function (req, res) {
  res.send("可以用了");
});

index.post('/login', function (req, res) {
  var sql1 = `SELECT * FROM userinfo`;
  var sql2 = `SELECT * FROM userinfo where email=? and password=?`;
  var data = [req.body.email, req.body.password];

  db.exec(sql1, [], function (results, fields) {

    if (results.length === 0) {

      res.status(401).json({ message: '用戶不存在' });
    } else {
      db.exec(sql2, data, function (results, fields) {
        if (results.length === 0) {
          // 密碼不匹配，拒絕登入請求
          res.status(401).json({ message: '密碼不正確' });
        } else {
          // 密碼匹配，允許登入
          res.status(200).json({ message: '登入成功' });


        }
      });
    }
  });
})


// db.exec(sql2, data, function (results, fields) {

//   res.send(results[0]);
// if (count(results[0]).length == 1) {
//   req.session.user = {
//     uid: results[0].uid,
//     name: results[0].name,
//     birthday: results[0].birthday,
//     phone: results[0].phone,
//     email: results[0].email,
//     id: results[0].id,
//     password: results[0].password,
//     city: results[0].city,
//     rural: results[0].rural,
//     address: results[0].address,
//     admin: results[0].admin,
//     userid: results[0].userid
//   }
//   res.end(
//     JSON.stringify(new Success('login success'))
//   )
// } else {
//   res.end(
//     JSON.stringify(new Error('login failed'))
//   )
// }

module.exports = index;
