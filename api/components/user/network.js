const express = require("express");

const router = express.Router();

const response = require("../../../network/response");

router.get("/", (req, res) => {
  response.success(
    req,
    res,
    "Acceso a usuarios correcto",
    200
  );
});

module.exports = router;
