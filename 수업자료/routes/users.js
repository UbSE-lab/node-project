var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

// /users/123
router.get("/123", function (req, res, next) {
  let data = { name: "김강민" };
  return res.json(data);
});

module.exports = router;
