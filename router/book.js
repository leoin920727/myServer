let express = require("express");
const bookRouter = express.Router();
// DB -----------------------------------
let mysql = require("mysql");
let myDBconn = mysql.createConnection({
  host: "localhost",
  port: "8889",
  user: "root",
  password: "root",
  database: "cleaning_services",
  multipleStatements: true,
});
myDBconn.connect(function (err) {
  if (err) {
    console.log("DB有錯");
    console.log(err);
  } else {
    console.log("DB OK");
  }
});
// DB -----------------------------------
bookRouter.get("/", (req, res) => {
  res.send("Welcome!");
  myDBconn.query(`SELECT * FROM employeeinfo`, (err, rows) => {
    if (err) {
      console.log("sql有錯");
      console.log(err);
    } else {
      console.log("sql沒錯");
      console.log(rows);
      console.log(rows[0]);
      console.log(rows[0].dog);
    }
  });
});

module.exports = bookRouter;
