const express = require('express');
var db = require("../db");
var signup = express.Router();
// 加密解密
const Encrypted = require("../middleware/Encrypted")
const Decrypt = require("../middleware/Decrypt");
// 


var cors = require("cors");
signup.use(cors({ credentials: true, origin: 'http://localhost:3000' }));


signup.get('/signup/userinfo', function (req, res) {
    var data = []
    var sql = `SELECT * FROM userinfo `
    db.exec(sql, data, function (result, failed) {
        res.send(result);
    })
})

// 註冊
// 
signup.post('/signup', function (req, res) {

    console.log('Received data:', req.body.data);
    const { username, birthday, phone, email, id, password, rural, address } = JSON.parse(req.body.data)

    const userid = `RA${String(sqllength + 1).padStart(8, "0")}`;
    var sqllength = `SELECT COUNT(*) FROM userinfo`
    var sql = `INSERT INTO userinfo(username,birthday,phone,email,id,password,rural,address,userid) 
    VALUES(?,?,?,?,?,?,?,?,?)`
    // 加密
    const encrypted = Encrypted(password);
    var data = [username, birthday, phone, email, id, encrypted, rural, address, userid]

    db.exec(sql, data, function (results, fields) {
        if (!results) {
            res.send({ message: 'failed', data: results });
        } else {
            res.send({ message: 'success', data: results });
        }
    });
});

module.exports = signup;