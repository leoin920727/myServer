var express = require("express");
var cors = require('cors');
var index = express.Router();

index.get("/", function (req, res) {
    res.send("可以用了");
})

index.get("/orderlist", cors(), function (req, res) {
    const data = [
        {
            "orderNumber": "C0021",
            "memberId": "M01242351",
            "orderDate": "13/08/23",
            "weekOfTimes": "2",
            "weekOfAmount": "62",
            "price": "1200",
            "orderStatus": "0"
        },
        {
            "orderNumber": "C0020",
            "memberId": "M01242351",
            "orderDate": "13/08/23",
            "weekOfTimes": "2",
            "weekOfAmount": "62",
            "price": "1200",
            "orderStatus": "99"
        }
    ]
    res.send(data)
})

module.exports = index;