const express = require("express");
const router = express.Router();

router.use("/user", require("./user.routes.js"));

module.exports = router;