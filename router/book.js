let express = require("express");
const bookRouter = express.Router();
const utils = require("../utils/book");

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
bookRouter.get("/employee-info", async (req, res) => {
  let data1;
  myDBconn.query(
    `
    SELECT
        info.name,
        info.photo,
        ROUND((score.e1 + score.e2 + score.e3 + score.e4) / 4, 1) AS total_efficiency
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
        score.employeeid = info.employeeid;`,
    (err, rows) => {
      if (err) {
        console.log("sql有錯");
        console.log(err);
      }
      data1 = rows.map((result) => {
        result.total_efficiency = result.total_efficiency.toFixed(1);
        return result;
      });
      // console.log(data1);
      return res.json(data1);
    }
  );
});

bookRouter.get("/free-day", (req, res) => {
  let data2;

  myDBconn.query(
    `SET @EmployeeLimit = (SELECT COUNT(*) FROM employeeinfo);
    SELECT A.week, A.time, A.date FROM
    (SELECT \`week\`, \`time\`, \`date\`, COUNT(*) AS record_count
    FROM attendance
    WHERE \`date\` >= DATE_ADD(CURDATE(), INTERVAL 1 day) AND \`date\` < DATE_ADD(CURDATE(), INTERVAL 2 MONTH)
    GROUP BY \`week\`, \`time\`, \`date\`
    ORDER BY \`date\`) AS A
    WHERE A.record_count = @EmployeeLimit;
    `,
    (err, rows) => {
      if (err) {
        console.log("sql有錯");
        console.log(err);
      }

      let notWorkDays = rows[1];
      notWorkDays.forEach((element) => {
        element.date.setHours(element.date.getHours() + 8);
      });

      notWorkDays[0].date.toISOString().split("T")[0];

      const freeDays = utils.updateFreeDays(notWorkDays);
      const availbaleDay = utils.getFreeDays(freeDays);
      return res.json(availbaleDay);
    }
  );
});

module.exports = bookRouter;
