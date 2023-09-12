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
login.use(session({
    secret: 'raccoonncleaning',
    resave: false, // 固定寫法
    saveUninitialized: true,// 固定寫法

    cookie: {
        // 目前設定五分鐘
        maxAge: 60 * 1000 * 5
    }

}));


// 登入後使用此API獲得資料
// 透過判斷 req.session.isLogin 是否為 true 來確認是否有權限呼叫此 API
login.get("/user", (req, res) => {
    if (!req.session.isLogin) {
        return res.status(403).send({ status: 1, msg: "無權進行此操作" })
    }
    res.send({ status: 0, msg: "獲取成功", username: req.session.user.email, data: req.session });
});




login.post('/login', function (req, res) {
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

                    req.session.user = results; // 將使用者資料存到 session 中
                    req.session.isLogin = true; // 將使用者的登入狀態存到 session 中
                    res.send({ status: 0, msg: '登入成功', data: req.session.user });

                    // 密碼匹配，允許登入
                    // res.status(200).json({ message: '登入成功' });
                }
            });
        }
    });
});

// 登出用
login.post("/logout", (req, res) => {
    req.session.destroy(); // 清空 session 訊息
    res.send({
        status: 0,
        msg: "登出成功"
    });
});

module.exports = login;
