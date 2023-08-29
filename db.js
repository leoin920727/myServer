var express = require('express');
var app = express();
var mysql = require("mysql");

var myDBconn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: ""
})
myDBconn.connect();