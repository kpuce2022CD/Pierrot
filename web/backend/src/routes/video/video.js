const express = require("express");
const router = express.Router();
const ctrl = require("../ctrl");

router.post("/uploadVideo",ctrl.video.upload);

module.exports=router;

