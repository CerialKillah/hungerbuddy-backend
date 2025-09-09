var express = require("express");
var router = express.Router();
var upload = require("./multer");
var pool = require("./pool");
/* GET users listing. */
router.post(
  "/submit_category",
  upload.single("categoryicon"),
  function (req, res, next) {
    try {
      pool.query(
        "insert into foodcategory(branchid,categoryname,categoryicon,createddate,createdtime,userid) values(?,?,?,?,?,?)",
        [
          req.body.branchid,
          req.body.categoryname,
          req.file.filename,
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
              message: "Category Submitted Successfully....",
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
  }
);

router.get("/fetch_all_category", function (req, res, next) {
  try {
    pool.query("select * from foodcategory", function (error, result) {
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
});

router.post("/edit_category", function (req, res, next) {
  try {
    pool.query(
      "update foodcategory set categoryname=?,createddate=?,createdtime=?,userid=? where categoryid=?",
      [
        req.body.categoryname,
        req.body.createddate,
        req.body.createdtime,
        req.body.userid,
        req.body.categoryid,
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
            message: "Category Updated Successfully....",
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

router.post("/delete_category", function (req, res, next) {
  try {
    pool.query(
      "delete from foodcategory where categoryid=?",
      [
        req.body.categoryid,
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
            message: "Category Deleted Successfully....",
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
