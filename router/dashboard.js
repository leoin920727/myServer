const express = require("express");
const db = require("../db");
const dashboard = express.Router();
const upload = require("../middleware/multer");
const Encrypted = require("../middleware/Encrypted");

// 員工驗證
dashboard.get("/staffAdmin", function (req, res) {
  if (req.session.user[0].admin === 1) return res.send({ isAuthorised: true });
  res.send({ isAuthorised: false });
});
// 會員驗證
dashboard.get("/memberAdmin", function (req, res) {
  if (req.session.user[0]?.admin === 0) return res.send({ isAuthorised: true });
  res.send({ isAuthorised: false });
});

// 後台訂單資料
dashboard.get("/orderlist", function (req, res) {
  const sql = `SELECT UO.ornumber,UO.employeeid,UO.weeks,UO.donetime,OL.money,OL.state,OL.ordertime 
  FROM userorder AS UO 
  INNER JOIN orderlist AS OL ON OL.ornumber=UO.ornumber;`;
  const data = [];
  db.exec(sql, data, function (result, fields) {
    res.send(result);
  });
});

// 後台訂單資料(詳細)
dashboard.get("/AdminOrder/:ornumber", function (req, res) {
  const ornumber = req.params.ornumber;
  const data = [ornumber];
  const sql = `SELECT *
  FROM orderlist AS OL
  INNER JOIN userorder AS UO ON OL.ornumber=UO.ornumber
  INNER JOIN employeeinfo AS EI ON UO.employeeid=EI.employeeid
  WHERE OL.ornumber=?`;
  db.exec(sql, data, function (result, fields) {
    res.send(result);
  });
});
// 後台訂單資料(更新)
dashboard.put("/AdminOrder/updata/:ornumber", function (req, res) {
  const ornumber = req.params.ornumber;
  const { donetime, state } = req.body.data;
  const data1 = [donetime, ornumber];
  const data2 = [state, ornumber];
  const sql1 = `UPDATE userorder SET donetime=? WHERE ornumber=?`;
  const sql2 = `UPDATE orderlist SET orderdone=NOW() , state=? WHERE ornumber=?`;
  db.exec(sql1, data1, function (result, fields) {
    db.exec(sql2, data2, function (result, fields) {
      res.send({ data: result, message: "success" });
    });
  });
});

// 會員資料表
dashboard.get("/dashboard/memberInfo", function (req, res) {
  const sql = `SELECT * FROM userinfo`;
  const data = [];
  db.exec(sql, data, function (results, fields) {
    res.send(results);
  });
});

// 會員資料內容
dashboard.get("/dashboard/PersonalInfo/:userid", function (req, res) {
  const userid = req.params.userid;
  const sql1 = `SELECT userid FROM userinfo`;
  const sql2 = `SELECT * FROM userinfo WHERE userid =?`;
  const sql3 = `SELECT(whyblacklist) AS why FROM userinfo, blacklist WHERE userinfo.userid = blacklist.userid AND userinfo.userid =? `;
  const sql4 = `SELECT * FROM adreessdist`;
  const data = [userid];
  db.exec(sql1, [], function (number, fields) {
    db.exec(sql2, data, function (results, fields) {
      db.exec(sql3, data, function (why, fields) {
        db.exec(sql4, data, function (address, fields) {
          const ban = why.length === 0 ? " " : why;
          const len = number;
          // const newPW=Decrypt(results[0].password)//正式上線再開
          // console.log(len)
          res.send({ data: results, len: len, why: ban, address: address });
        });
      });
    });
  });
});

// 新增黑名單
dashboard.put("/dashboard/PersonalInfo/blacklist/:userid", function (req, res) {
  const userid = req.params.userid;
  const why = req.body.why;
  const sql1 = `UPDATE userinfo SET blacklist = 1 WHERE userinfo.userid = ? `;
  const sql2 = `INSERT INTO blacklist(userid, whyblacklist) VALUES(?,?)`;
  const data1 = [userid];
  const data2 = [userid, why];
  db.exec(sql1, data1, function (results2, fields) {
    db.exec(sql2, data2, function (results, fields) {
      res.send({ message: "success" });
    });
  });
});

// 更新黑名單
dashboard.put(
  "/dashboard/PersonalInfo/removeblacklist/:userid",
  function (req, res) {
    const userid = req.params.userid;
    const sql = `UPDATE userinfo SET blacklist = 0 WHERE userinfo.userid =? `;
    const data = [userid];
    db.exec(sql, data, function (results, fields) {
      res.send({ message: "success" });
    });
  }
);

// 刪除黑名單
dashboard.delete(
  "/dashboard/PersonalInfo/removeblacklist/:userid",
  function (req, res) {
    const userid = req.params.userid;
    const sql = `DELETE FROM blacklist WHERE blacklist.userid =? `;
    const data = [userid];
    db.exec(sql, data, function (results, fields) {
      res.send({ message: "success" });
    });
  }
);

// 員工資料表
dashboard.get("/dashboard/StaffList", function (req, res) {
  const sql = `SELECT * FROM employeeinfo`;
  const data = [];
  db.exec(sql, data, function (results, fields) {
    res.send(results);
  });
});

// 員工資料內容
dashboard.get("/dashboard/StaffList/:employeeid", function (req, res) {
  const employeeid = req.params.employeeid;
  const sql1 = `SELECT * FROM employeeinfo WHERE employeeid = ? `;
  const sql2 = `SELECT employeeid FROM employeeinfo ORDER BY employeeinfo.employeeid ASC`;
  const sql3 = `SELECT * FROM employeeinfo 
    INNER JOIN evaluate ON employeeinfo.employeeid = evaluate.employeeid 
    INNER JOIN orderlist ON evaluate.ornumber = orderlist.ornumber 
    WHERE employeeinfo.employeeid = ?; `;
  const sql4 = `SELECT * FROM adreessdist`;
  const data = [employeeid];
  db.exec(sql1, data, function (results, fields) {
    db.exec(sql2, data, function (useridarr, fields) {
      db.exec(sql3, data, function (list, fields) {
        db.exec(sql4, data, function (address, fields) {
          res.send({
            data: results,
            useridarr: useridarr,
            list: list,
            address: address,
          });
        });
      });
    });
  });
});

// 黑名單
dashboard.get("/dashboard/blacklist", function (req, res) {
  const sql = `SELECT * FROM userinfo, blacklist WHERE userinfo.userid = blacklist.userid; `;
  const data = [];
  db.exec(sql, data, function (results, fields) {
    res.send(results);
  });
});

// 更新會員資料
dashboard.put("/dashboard/PersonalInfo/update/:userid", function (req, res) {
  const userid = req.params.userid;
  const {
    upName,
    upId,
    upPhone,
    upRural,
    upAddress,
    upEmail,
    upAdmin,
    upBirthDay,
  } = req.body;
  const newPW = req.body.upPassWord;
  const sql = `UPDATE userinfo 
  SET name =?, birthday =?, phone =?, email =?, id =?, rural =?, address =?, admin =?
  WHERE userid =? `;
  const sql2 = `UPDATE userinfo SET password =? WHERE userid =? `;

  const data = [
    upName,
    upBirthDay,
    upPhone,
    upEmail,
    upId,
    upRural,
    upAddress,
    upAdmin,
    userid,
  ];

  db.exec(sql, data, function (results, fields) {
    if (newPW) {
      db.exec(sql2, [Encrypted(newPW), userid], function (results, fields) { });
    }
    res.send({ message: "success", data: results });
  });
});

// 刪除會員資料
dashboard.delete("/dashboard/PersonalInfo/delete/:userid", function (req, res) {
  const userid = req.params.userid;

  const sql = `
  DELETE userinfo, blacklist
  FROM userinfo
  LEFT JOIN blacklist ON userinfo.userid = blacklist.userid
  WHERE userinfo.userid = ?;
`;

  db.exec(sql, [uid], (error, results) => {
    if (error) {
      console.error("Error deleting data:", error);
      res.status(500).json({ error: "Error deleting data" });
      return;
    }

    res.status(200).json({ message: "Data deleted successfully" });
  });
});

// 地區資料
dashboard.get("/dashboard/addstaff", function (req, res) {
  const sql = `SELECT * FROM adreessdist`;
  const data = [];
  db.exec(sql, data, function (results, fields) {
    res.send(results);
  });
});

// 員工註冊資料+圖片
dashboard.post(
  "/dashboard/addstaff/upload",
  upload.single("photo"),
  function (req, res) {
    const {
      empLength,
      employeeName,
      employeePhone,
      employeeMail,
      employeePW,
      employeeIdNumber,
      employeeBirthDay,
      empRural,
      empAddress,
      vaccine,
      goodId,
      racheck,
    } = JSON.parse(req.body.data);

    const filePath = req.file.destination.slice(27) + req.file.filename;
    const encrypted = Encrypted(employeePW); //正式上線再開
    // const encrypted = employeePW;
    const employeeId = `RA${String(empLength + 1).padStart(3, "0")}`;

    const sql = `INSERT INTO employeeinfo
   (employeeid,employeename,employeephone,employeeemail,employeepw,employeeidnumber,employeebirthday,
    emprural,empaddress,photo,vaccine,goodid,racheck)  
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`;

    const data = [
      employeeId,
      employeeName,
      employeePhone,
      employeeMail,
      encrypted,
      employeeIdNumber,
      employeeBirthDay,
      empRural,
      empAddress,
      filePath,
      vaccine,
      goodId,
      racheck,
    ];

    db.exec(sql, data, function (results, fields) {
      if (!results) {
        res.send({ message: "failed", data: results });
      } else {
        res.send({ message: "success", data: results });
      }
    });
  }
);

// 更新員工資料
dashboard.put("/dashboard/StaffList/update/:employeeid", function (req, res) {
  const employeeid = req.params.employeeid;

  const {
    upName,
    upPhone,
    upEmail,
    upVaccine,
    upGoodid,
    upRacheck,
    upIdnumber,
    upBirthday,
    upRural,
    upAddress,
  } = req.body;
  const newPassWord = req.body.upPassWord;
  const sql1 = `UPDATE employeeinfo
  SET employeename=?, employeephone=?, employeeemail=?, vaccine=?, goodid=?,
  racheck=?, employeeidnumber=?, employeebirthday=?, emprural=?, empaddress=?
  WHERE employeeid=?`;
  const sql2 = `UPDATE employeeinfo SET employeepw=? WHERE employeeid=?`;



  const data1 = [
    upName,
    upPhone,
    upEmail,
    upVaccine,
    upGoodid,
    upRacheck,
    upIdnumber,
    upBirthday,
    upRural,
    upAddress,
    employeeid,
  ];

  db.exec(sql1, data1, function (results, fields) {
    if (newPassWord) {
      const data2 = [Encrypted(newPassWord), employeeid];
      db.exec(sql2, data2, function (results, fields) { });
    }
    res.send({ message: "success", data: results });
  });
});

// 刪除員工資料
dashboard.delete(
  "/dashboard/StaffList/delete/:employeeid",
  function (req, res) {
    const employeeid = req.params.employeeid;

    const sql = "DELETE FROM employeeinfo WHERE employeeid = ?";

    db.exec(sql, [employeeid], (error, results) => {
      if (error) {
        console.error("Error deleting data:", error);
        res.status(500).json({ error: "Error deleting data" });
        return;
      }

      res.status(200).json({ message: "Data deleted successfully" });
    });
  }
);

// 會員專區資料
dashboard.get("/member/memberinfo/", function (req, res) {
  const userid = req.session.user[0].userid;
  const sql1 = `SELECT * FROM userinfo`;
  const sql2 = `SELECT * FROM userinfo WHERE userid =?`;
  const sql3 = `SELECT * FROM adreessdist`;
  const data = [userid];
  db.exec(sql1, [], function (number, fields) {
    db.exec(sql2, data, function (results, fields) {
      db.exec(sql3, data, function (address, fields) {
        const len = number.length;
        res.send({ data: results, length: len, address: address });
      });
    });
  });
});

// 會員專區修改個人資料
dashboard.post("/member/memberinfo/update/", function (req, res) {
  const userid = req.session.user[0].userid;
  const { phone, rural, address } = req.body;
  const sql = `UPDATE userinfo
 SET phone =?, rural =?, address =? WHERE userid =? `;

  const data = [phone, rural, address, userid];
  db.exec(sql, data, function (results, fields) {
    res.send({ message: "success", data: results });
  });
});

// 會員專區密碼
dashboard.get("/member/changepwd/", function (req, res) {
  const userid = req.session.user[0].userid;
  const sql = `SELECT password FROM userinfo WHERE userid = ?`;
  const data = [userid];


  db.exec(sql, data, function (results, fields) {
    res.send(results);
  });
});

// 會員專區修改密碼
dashboard.post("/member/changepwd/update/", function (req, res) {
  const userid = req.session.user[0].userid;
  const { uppassword } = req.body;
  const sql = `UPDATE userinfo
   SET password =? WHERE userid =? `;

  const data = [Encrypted(uppassword), userid];
  
  db.exec(sql, data, function (error, results, fields) {
    if (error) {
      console.error("Error updating password:", error);
      res.status(500).send({ message: "Internal Server Error" });
    } else {
      res.send({ message: "success", data: results });
    }
  });
});


// 會員訂單資料表
dashboard.get("/member", function (req, res) {
  const userid = req.session.user[0].userid;
  const sql = `SELECT UO.ornumber, UO.employeeid, UO.weeks, UO.donetime, OL.money, OL.state, OL.ordertime
  FROM userorder AS UO
  INNER JOIN orderlist AS OL ON OL.ornumber = UO.ornumber
  WHERE OL.userid = ?; `;
  const data = [userid];
  db.exec(sql, data, function (results, fields) {
    res.send(results);
  });
});

module.exports = dashboard;
