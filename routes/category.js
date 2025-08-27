var express = require("express");
var router = express.Router();
var upload = require("./multer");
var pool = require("./pool");

/* GET users listing. */
router.post("/submit_category", upload.single("categoryicon"), function (req, res, next) {
  try {
    pool.query(
      "insert into foodcategory(branchid,categoryname,categoryicon,createddate,createdtime,userid) values(?,?,?,?,?,?)",
      [
        req.body.branchid,
        req.body.categoryname,
        req.body.categoryicon,
        req.body.createddate,
        req.body.createdtime,
        req.body.userid,
      ],
      function (error, result) {
        if (error) {
          res
            .status(500)
            .json({
              status: false,
              message: "Database Error Please Contact Backend Team....",
            });
        } else {
          res
            .status(200)
            .json({
              status: true,
              message: "Category Submitted Successfully....",
            });
        }
      }
    );
  } catch (e) {
    res
      .status(500)
      .json({
        status: false,
        message:
          "Critical Error Database Error Please Contact Backend Team....",
      });
  }
});

module.exports = router;
