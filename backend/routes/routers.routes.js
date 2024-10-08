const express = require("express");
const router = express.Router();

router.use("/user", require("./user.routes.js"));
router.use("/role", require("./role.routes.js"));
router.use("/department", require("./department.routes.js"));
router.use("/task", require("./task.routes.js"));

module.exports = router;