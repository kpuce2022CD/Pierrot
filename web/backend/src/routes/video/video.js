const express = require("express");
const router = express.Router();
const ctrl = require("../ctrl");

router.post("/upload_video",ctrl.vidoe.upload);

module.exports=router;