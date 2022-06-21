const express = require("express");
const router = express.Router();
const ctrl = require("./auth_ctrl");

router.post("/signup", ctrl.auth.signup);
router.post("/login", ctrl.auth.login);
router.get("/logout", ctrl.auth.logout);
// router.get("/auth", ctrl.auth.auth);
router.get("/getInfo",ctrl.auth.get_info);

module.exports = router;
