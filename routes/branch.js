var express = require("express");
var router = express.Router();
var pool = require("./pool");
/* GET users listing. */
router.post("/submit_branch", function (req, res, next) {
  try {
    pool.query(
      "insert into branch(branchname, address, latlong, city, state, emailid, contactnumber, contactperson, createddate, createdtime, userid) values(?,?,?,?,?,?,?,?,?,?,?)",
      [
        req.body.branchname,
        req.body.address,
        req.body.latlong,
        req.body.city,
        req.body.state,
        req.body.emailid,
        req.body.contactnumber,
        req.body.contactperson,
        req.body.createddate,
        req.body.createdtime,
        req.body.userid,
      ],
      function (error, result) {
        if (error) {
          console.log(error);
          res.status(500).json({
            status: false,
            message: "Database Error Please Contact Bankend Team....",
          });
        } else {
          res.status(200).json({
            status: true,
            message: "Branch Submitted Successfully....",
          });
        }
      }
    );
  } catch (e) {
    res.status(500).json({
      status: false,
      message: "Critical Error Please Contact Bankend Team....",
    });
  }
});

router.get(
  "/fetch_all_branch",
  function (req, res, next) {
    try {
      pool.query("select * from branch", function (error, result) {
        if (error) {
          console.log(error);
          res.status(500).json({
            status: false,
            message: "Database Error Please Contact Bankend Team....",
          });
        } else {
          res.status(200).json({
            status: true,
            data: result,
            message: "success",
          });
        }
      });
    } catch (e) {
      res.status(500).json({
        status: false,
        message: "Critical Error Please Contact Bankend Team....",
      });
    }
  }
);

router.post("/edit_branch", function (req, res, next) {
  try {
    pool.query(
      "update branch set branchname=?, address=?, latlong=?, city=?, state=?, emailid=?, contactnumber=?, contactperson=?, createddate=?, createdtime=?, userid=? where branchid=?",
      [
        
        req.body.branchname,
        req.body.address,
        req.body.latlong,
        req.body.city,
        req.body.state,
        req.body.emailid,
        req.body.contactnumber,
        req.body.contactperson,
        req.body.createddate,
        req.body.createdtime,
        req.body.userid,
        req.body.branchid,
      ],
      function (error, result) {
        if (error) {
          console.log(error);
          res.status(500).json({
            status: false,
            message: "Database Error Please Contact Bankend Team....",
          });
        } else {
          res.status(200).json({
            status: true,
            message: "Branch Updated Successfully....",
          });
        }
      }
    );
  } catch (e) {
    res.status(500).json({
      status: false,
      message: "Critical Error Please Contact Bankend Team....",
    });
  }
});

router.post("/delete_branch", function (req, res, next) {
  try {
    pool.query(
      "delete from branch where branchid=?",
      [
        req.body.branchid,
      ],
      function (error, result) {
        if (error) {
          console.log(error);
          res.status(500).json({
            status: false,
            message: "Database Error Please Contact Bankend Team....",
          });
        } else {
          res.status(200).json({
            status: true,
            message: "Branch Deleted Successfully....",
          });
        }
      }
    );
  } catch (e) {
    res.status(500).json({
      status: false,
      message: "Critical Error Please Contact Bankend Team....",
    });
  }
});

module.exports = router;
