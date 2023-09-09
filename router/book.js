let express = require("express");
const bookRouter = express.Router();
const utils = require("../utils/book");

// -------- DB --------
let mysql = require("mysql");
let myDBconn = mysql.createConnection({
  host: "localhost",
  // port: "8889",
  port: "3306",
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

// -------- API --------
bookRouter.get("/price", (req, res) => {
  const week = req.query.week;
  myDBconn.query(
    `SELECT \`price\` FROM \`priceList\` WHERE weekNumber = ?;`,
    [week],
    (err, data) => {
      if (err) {
        console.log("sql有錯");
        console.log(err);
      }
      return res.json(data);
    }
  );
});
bookRouter.get("/dist", (req, res) => {
  const distId = req.query.dist;
  myDBconn.query(`SELECT dist FROM WHERE uid = ?;`, [distId], (err, data) => {
    if (err) {
      console.log("sql有錯");
      console.log(err);
    }
    return res.json(data);
  });
});
// 服務人員
bookRouter.get("/employee-info", (req, res) => {
  let data1;
  myDBconn.query(
    `
    SELECT
        info.employeename,
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
      return res.json(data1);
    }
  );
});

// 預約時間相關
bookRouter.get("/free-time", (req, res) => {
  let sqlStr;
  const { employeeid, weekDay, timespan } = req.query;

  if (!employeeid || employeeid == "null") {
    sqlStr = `
      SELECT A.time, A.date FROM 
        (SELECT \`time\`, \`date\`, COUNT(*) AS record_count
        FROM attendance
        WHERE \`date\` >= DATE_ADD(CURDATE(), INTERVAL 1 day) AND \`date\` < DATE_ADD(CURDATE(), INTERVAL 2 MONTH) 
        GROUP BY \`time\`, \`date\`
        ORDER BY \`date\`) AS A
      WHERE A.record_count = (SELECT COUNT(*) FROM employeeinfo);
    `;
  } else {
    sqlStr = `
      SELECT A.time, A.date FROM 
      (SELECT \`time\`, \`date\`
      FROM attendance
      WHERE \`date\` >= DATE_ADD(CURDATE(), INTERVAL 1 day) AND \`date\` < DATE_ADD(CURDATE(), INTERVAL 2 MONTH) 
      AND employeeid = ?
      ORDER BY \`date\`) AS A
    `;
  }

  myDBconn.query(sqlStr, [employeeid], (err, rows) => {
    if (err) {
      console.log("sql有錯");
      console.log(err);
      return res.json([]);
    }

    let notWorkDays = rows;
    console.log(notWorkDays);
    notWorkDays.forEach((element) => {
      element.date.setHours(element.date.getHours() + 8);
    });

    const freeDays = utils.updateFreeDays(notWorkDays);

    if (weekDay == "null" || !weekDay) {
      console.log(utils.getFreeDays(freeDays));
      return res.json(utils.getFreeDays(freeDays));
    } else {
      if (timespan == "null" || !timespan) {
        return res.json(utils.getFreeTime(freeDays, weekDay));
      } else {
        return res.json(utils.getFreeDate(freeDays, weekDay, timespan));
      }
    }
  });
});

// uid取得會員資料
bookRouter.get("/member-info/:uid", (req, res) => {
  const { uid } = req.params;
  let sqlStr = `
    SELECT * FROM userinfo WHERE uid = ?;
  `;
  myDBconn.query(sqlStr, [uid], (err, rows) => {
    return res.json(rows);
  });
});

bookRouter.post("/order", (req, res) => {
  console.log(req.body);
  const {
    uid,
    employeeid,
    date,
    time,
    weeks,
    phone,
    email,
    city,
    rural,
    address,
    name,
    note,
  } = req.body;
  const orderId = utils.getRandomOrderId();
  let price;
  let sqlStr;

  sqlStr = `
    INSERT INTO userorder (ornumber, employeeid, date, time, weeks, donetime)
    VALUES (?, ?, ?, ?, ?, ?);
  `;
  myDBconn.query(
    sqlStr,
    [orderId, employeeid, date, time, weeks, 0],
    (err, rows) => {
      if (err) {
        console.log(err);
        return res.json(err);
      }
    }
  );
  sqlStr = `
    SELECT price FROM priceList WHERE weekNumber = ?;
  `;
  myDBconn.query(sqlStr, [weeks], (err, rows) => {
    if (err) {
      return res.json(err);
    }
    console.log(rows);
    price = rows;
  });

  sqlStr = `
    INSERT INTO orderlist (ornumber, orphone, oremail, orcity, orrural, oraddress, userid, orname, money, pay, state, note)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
  `;
  myDBconn.query(
    sqlStr,
    [
      orderId,
      phone,
      email,
      city,
      rural,
      address,
      uid,
      name,
      price,
      "1",
      "0",
      note,
    ],
    (err, rows) => {
      if (err) {
        console.log(err);
        return res.json(err);
      }
    }
  );
  return res.json(orderId);
});
module.exports = bookRouter;
