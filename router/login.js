var express = require("express");
var db = require("../db");
var cors = require("cors");
const session = require("express-session");
const cookieParser = require('cookie-parser');
var login = express.Router();



// 設定 CORS 中間件
//----允許此網域可跨域存取 
login.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
login.use(cookieParser());


// 登入後使用此API獲得資料
// 透過判斷 req.session.isLogin 是否為 true 來確認是否有權限呼叫此 API
login.get("/user", (req, res) => {
    if (!req.session.isLogin) {
        return res.status(403).send({ status: 1, msg: "無權進行此操作" })
    }
    // 資料存在 req.session.user裏面
    res.send({
        status: 0,
        msg: "獲取成功",
        user: req.session.user[0]
    });
});




// 登入API
login.post('/login', function (req, res) {
    var email = req.body.email;
    var password = req.body.password;

    // userinfo資料表
    var sql1 = 'SELECT * FROM userinfo WHERE email=? AND password=?';
    var data1 = [email, password];

    // employeeinfo資料表
    var sql2 = 'SELECT * FROM employeeinfo WHERE employeeemail=? AND employeepw=?';
    var data2 = [email, password];

    db.exec(sql1, data1, function (results1, fields1) {
        db.exec(sql2, data2, function (results2, fields2) {
            // 檢查兩個查詢結果
            if (results1.length === 0 && results2.length === 0) {
                // 使用者不存在或密碼不符，拒絕登入請求
                res.status(401).json({ message: '密碼不正確' });
            } else {
                // 使用者或員工存在於其中一個資料表中，進行相應的處理
                if (results1.length > 0) {
                    // 將使用者資料存到 session 中
                    req.session.user = results1;
                } else {
                    // 將員工資料存到 session 中
                    req.session.user = results2;
                }
                // 將登入狀態存到 session 中
                req.session.isLogin = true;


                // data: req.session.user 這是使用者或員工的資料
                res.send({ status: 0, msg: '登入成功', data: req.session.user });
            }
        });
    });
});





// 登出清空 session cookie用
login.get("/logout", (req, res) => {
    req.session.destroy(); // 清空 session 訊息
    res.clearCookie('connect.sid', { path: '/' });
    res.send({
        status: 0,
        msg: "登出成功"
    });
});

module.exports = login;
