let express = require("express");
const total = express.Router();


// -------- DB --------
let mysql = require("mysql");
let myDBconn = mysql.createConnection({
  host: "localhost",
  port: "3306",
  user: "root",
  password: "",
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

total.get("/as", (req, res) => {
  myDBconn.query(
    `SELECT 'employeeid' AS source, COUNT(*) AS count FROM employeeinfo UNION ALL SELECT 'reply' AS source, COUNT(*) AS count FROM evaluate UNION ALL SELECT 'ornumber' AS source, COUNT(*) AS count FROM evaluate;
  `,
    (err, data) => {
      if (err) {
        console.log("sql有錯");
        console.log(err);
      }
      return res.json(data);
    }
  );
});



total.get("/sta", (req, res) => {
  myDBconn.query(
    `SELECT
    info.employeename,
    info.photo,
    info.vaccine,
    info.goodid,
    info.racheck,
    info.cases,
    info.employeeid,
    ROUND((score.e1 + score.e2 + score.e3 + score.e4) / 4, 1) AS total_efficiency,
    SUM(ev.efficiency + ev.clean + ev.careful + ev.manner) AS total_ratings
FROM
    employeeinfo AS info
LEFT JOIN
    (
        SELECT
            p.employeeid,
            AVG(v.efficiency) AS e1,
            AVG(v.clean) AS e2,
            AVG(v.careful) AS e3,
            AVG(v.manner) AS e4
        FROM
            employeeinfo AS p
        LEFT JOIN
            evaluate AS v ON p.employeeid = v.employeeid
        GROUP BY
            p.employeeid
    ) AS score
ON
    score.employeeid = info.employeeid
LEFT JOIN
    (
        SELECT
            employeeid,
            efficiency,
            clean,
            careful,
            manner
        FROM
            evaluate
    ) AS ev
ON
    ev.employeeid = info.employeeid
GROUP BY
    info.employeename,
    info.photo,
    info.vaccine,
    info.goodid,
    info.racheck,
    info.cases,
    info.employeeid,
    total_efficiency;`,
    (err, data) => {
      if (err) {
        console.log("sql有錯");
        console.log(err);
      }
      return res.json(data);
    }
  );
});

total.get("/mar", (req, res) => {
  myDBconn.query(
    `SELECT total.employeename, total.photo, total.total_efficiency,reply.reply
    FROM (
        SELECT new.employeeid,
               new.employeename,
          new.photo,
               ROUND((e1 + e2 + e3 + e4) / 4, 1) AS total_efficiency
        FROM (
            SELECT p.employeeid,
                   p.employeename,
                p.photo,
                   AVG(v.efficiency) AS e1,
                   AVG(v.clean) AS e2,
                   AVG(v.careful) AS e3,
                   AVG(v.manner) AS e4
            FROM employeeinfo AS p
            LEFT JOIN evaluate AS v ON p.employeeid = v.employeeid
            GROUP BY p.employeeid, p.employeename
        ) AS new
    ) AS total
    LEFT JOIN (
        SELECT e.employeeid, e.reply
        FROM evaluate AS e
        WHERE reply <> "" AND reply IS NOT NULL
    ) AS reply
    ON total.employeeid = reply.employeeid;
  `,
    (err, data) => {
      if (err) {
        console.log("sql有錯");
        console.log(err);
      }
      return res.json(data);
    }
  );
});
module.exports = total;