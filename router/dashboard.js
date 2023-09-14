const express = require("express");
var db = require("../db");
const dashboard = express.Router();
const upload = require("../middleware/multer")
const Encrypted = require("../middleware/Encrypted")
const Decrypt = require("../middleware/Decrypt")


// 後台訂單資料
dashboard.get("/orderlist", function (req, res) {
  var sql = `SELECT UO.ornumber,UO.employeeid,UO.weeks,UO.donetime,OL.money,OL.state,OL.ordertime 
  FROM userorder AS UO 
  INNER JOIN orderlist AS OL ON OL.ornumber=UO.ornumber;`;
  var data = [];
  db.exec(sql, data, function (result, fields) {
    res.send(result)
  })
});

// 後台訂單資料(詳細)
dashboard.get("/AdminOrder/:ornumber", function (req, res) {
  const ornumber = req.params.ornumber;
  var data = [ornumber];
  var sql = `SELECT *
  FROM orderlist AS OL
  INNER JOIN userorder AS UO ON OL.ornumber=UO.ornumber
  INNER JOIN employeeinfo AS EI ON UO.employeeid=EI.employeeid
  WHERE OL.ornumber=?`
  db.exec(sql, data, function (result, fields) {
    res.send(result)
  })

});

// 會員資料表
dashboard.get("/dashboard/memberInfo", function (req, res) {
  var sql = `SELECT * FROM userinfo`;
  var data = [];
  db.exec(sql, data, function (results, fields) {
    res.send(results);
  });
});

// 會員資料內容
dashboard.get("/dashboard/PersonalInfo/:userid", function (req, res) {
  const userid = req.params.userid;
  var sql1 = `SELECT userid FROM userinfo`;
  var sql2 = `SELECT * FROM userinfo WHERE userid =?`;
  var sql3 = `SELECT(whyblacklist) AS why FROM userinfo, blacklist WHERE userinfo.userid = blacklist.userid AND userinfo.userid =? `;
  var sql4 = `SELECT * FROM adreessdist`
  var data = [userid];
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
  var sql1 = `UPDATE userinfo SET blacklist = 1 WHERE userinfo.userid = ? `;
  var sql2 = `INSERT INTO blacklist(userid, whyblacklist) VALUES(?,?)`;
  var data1 = [userid];
  var data2 = [userid, why];
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
    var sql = `UPDATE userinfo SET blacklist = 0 WHERE userinfo.userid =? `;
    var data = [userid];
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
    var sql = `DELETE FROM blacklist WHERE blacklist.userid =? `;
    var data = [userid];
    db.exec(sql, data, function (results, fields) {
      res.send({ message: "success" });
    });
  }
);

// 員工資料表
dashboard.get("/dashboard/StaffList", function (req, res) {
  var sql = `SELECT * FROM employeeinfo`;
  var data = [];
  db.exec(sql, data, function (results, fields) {
    res.send(results);
  });
});

// 員工資料內容
dashboard.get("/dashboard/StaffList/:employeeid", function (req, res) {
  const employeeid = req.params.employeeid;
  var sql1 = `SELECT * FROM employeeinfo WHERE employeeid = ? `;
  var sql2 = `SELECT employeeid FROM employeeinfo ORDER BY employeeinfo.employeeid ASC`;
  var sql3 = `SELECT * FROM employeeinfo 
    INNER JOIN evaluate ON employeeinfo.employeeid = evaluate.employeeid 
    INNER JOIN orderlist ON evaluate.ornumber = orderlist.ornumber 
    WHERE employeeinfo.employeeid = ?; `;
  var sql4 = `SELECT * FROM adreessdist`
  var data = [employeeid];
  db.exec(sql1, data, function (results, fields) {
    db.exec(sql2, data, function (useridarr, fields) {
      db.exec(sql3, data, function (list, fields) {
        db.exec(sql4, data, function (address, fields) {
          res.send({ data: results, useridarr: useridarr, list: list, address: address });
        });
      });
    });
  });
});

// 黑名單
dashboard.get("/dashboard/blacklist", function (req, res) {
  var sql = `SELECT * FROM userinfo, blacklist WHERE userinfo.uid = blacklist.uid; `;
  var data = [];
  db.exec(sql, data, function (results, fields) {
    res.send(results);
  });
});

// 更新會員資料
dashboard.put("/dashboard/PersonalInfo/update/:userid", function (req, res) {
  const userid = req.params.userid;
  const { upName, upId, upPhone, upRural, upAddress, upEmail, upPassWord, upAdmin, upBirthDay } = req.body
  var sql = `UPDATE userinfo
 SET name =?, birthday =?, phone =?, email =?, id =?,
    password =?, rural =?, address =?, admin =?
      WHERE userid =? `

  // const encrypted =Encrypted(upPassWord)//正式上線再開
  const encrypted = upPassWord

  var data = [upName, upBirthDay, upPhone, upEmail, upId, encrypted, upRural, upAddress, upAdmin, userid]
  db.exec(sql, data, function (results, fields) {
    res.send({ message: "success", data: results });
  });
})

// 刪除會員資料
dashboard.delete('/dashboard/PersonalInfo/delete/:userid', function (req, res) {
  const userid = req.params.userid;

  const sql = `
  DELETE userinfo, blacklist
  FROM userinfo
  LEFT JOIN blacklist ON userinfo.userid = blacklist.userid
  WHERE userinfo.userid = ?;
`;

  db.exec(sql, [uid], (error, results) => {
    if (error) {
      console.error('Error deleting data:', error);
      res.status(500).json({ error: 'Error deleting data' });
      return;
    }

    res.status(200).json({ message: 'Data deleted successfully' });
  });
});

// 地區資料
dashboard.get("/dashboard/addstaff", function (req, res) {
  var sql = `SELECT * FROM adreessdist`
  var data = []
  db.exec(sql, data, function (results, fields) {
    res.send(results);
  });
})

// 員工註冊資料+圖片
dashboard.post("/dashboard/addstaff/upload", upload.single("photo"), function (req, res) {

  const { empLength, employeeName, employeePhone, employeeeMail, employeePW,
    employeeIdNumber, employeeBirthDay, empRural, empAddress, vaccine, goodId, racheck } = JSON.parse(req.body.data)

  const filePath = req.file.destination.slice(27) + req.file.filename
  // const encrypted =Encrypted(employeePW)//正式上線再開
  const encrypted = employeePW
  const employeeId = `RA${String(empLength + 1).padStart(3, "0")}`

  const sql = `INSERT INTO employeeinfo
   (employeeid,employeename,employeephone,employeeemail,employeepw,employeeidnumber,employeebirthday,
    emprural,empaddress,photo,vaccine,goodid,racheck)  
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`;

  var data = [employeeId, employeeName, employeePhone, employeeeMail,
    encrypted, employeeIdNumber, employeeBirthDay, empRural,
    empAddress, filePath, vaccine, goodId, racheck]

  db.exec(sql, data, function (results, fields) {
    if (!results) {
      res.send({ message: "failed", data: results });
      console.log(results)
    } else {
      res.send({ message: "success", data: results });
      console.log(results)
    }
  });
});

// 更新員工資料
dashboard.put("/dashboard/StaffList/update/:employeeid", function (req, res) {
  const employeeid = req.params.employeeid;
  const { upName, upPhone, upEmail, upVaccine, upGoodid, upRacheck, upIdnumber, upBirthday, upRural, upAddress, upPassWord } = req.body;

  var sql = `UPDATE employeeinfo
  SET employeename=?, employeephone=?, employeeemail=?, vaccine=?, goodid=?,
  racheck=?, employeeidnumber=?, employeebirthday=?, emprural=?, empaddress=?, employeepw=?
  WHERE employeeid=?`;


  // const encrypted =Encrypted(upPassWord)//正式上線再開
  const encrypted = upPassWord

  var data = [upName, upPhone, upEmail, upVaccine, upGoodid, upRacheck, upIdnumber, upBirthday, upRural, upAddress, encrypted, employeeid];
  db.exec(sql, data, function (results, fields) {
    res.send({ message: "success", data: results });
  });

});

// 刪除員工資料
dashboard.delete('/dashboard/StaffList/delete/:employeeid', function (req, res) {
  const employeeid = req.params.employeeid;

  const sql = 'DELETE FROM employeeinfo WHERE employeeid = ?';

  db.exec(sql, [employeeid], (error, results) => {
    if (error) {
      console.error('Error deleting data:', error);
      res.status(500).json({ error: 'Error deleting data' });
      return;
    }

    res.status(200).json({ message: 'Data deleted successfully' });
  });
});

// 會員專區資料
dashboard.get("/member/memberinfo/", function (req, res) {
  const userid = req.session.user[0].userid;
  console.log(userid);
  var sql1 = `SELECT * FROM userinfo`;
  var sql2 = `SELECT * FROM userinfo WHERE userid =? `;
  var sql3 = `SELECT * FROM adreessdist`
  var data = [userid];
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
dashboard.put("/member/memberinfo/update/", function (req, res) {
  const userid = req.session.user[0].userid;
  const { upPhone, upRural, upAddress } = req.body
  var sql = `UPDATE userinfo
 SET phone =?, rural =?, address =? WHERE userid =? `

  var data = [upPhone, upRural, upAddress, userid]
  db.exec(sql, data, function (results, fields) {
    res.send({ message: "success", data: results });
  });
})

// 會員專區密碼
dashboard.get("/member/changepwd/", function (req, res) {
  const userid = req.session.user[0].userid;
  var sql = `SELECT password FROM userinfo WHERE userid = ?`;
  var data = [userid];

  db.exec(sql, data, function (results, fields) {
    res.send(results);
  });
})


// 會員專區修改密碼
dashboard.put("/member/changepwd/update/", function (req, res) {
  const userid = req.session.user[0].userid;
  const { uppassword } = req.body
  var sql = `UPDATE userinfo
 SET 	password =? WHERE userid =? `

  //  const encrypted = Encrypted(uppassword)
  const encrypted = uppassword

  var data = [encrypted, userid]
  db.exec(sql, data, function (results, fields) {
    res.send({ message: "success", data: results });
  });
})

module.exports = dashboard;
