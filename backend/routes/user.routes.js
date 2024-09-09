const express = require("express");
const { userLogin, userLogout } = require("../controllers/user.controller.js");
const { addUser } = require("../controllers/adduser.controller.js");
const router = express.Router();
const {verifyUser} = require("../middlewares/auth.middleware.js");
const { credentials } = require("../controllers/usercredentials.controller.js");
router.post("/login", userLogin);
router.post("/adduser", addUser); 
router.post("/logout", userLogout);
router.post("/credentials", credentials);

module.exports = router;