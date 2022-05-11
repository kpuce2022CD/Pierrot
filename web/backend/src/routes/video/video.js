const express = require("express");
const router = express.Router();
const multer = require('multer');
const upload = multer({dest:'videos/'})
const ctrl = require("./video_ctrl");

router.post("/uploadVideo",upload.single('video'),ctrl.video.upload_video);
router.get("/downloadVideo",ctrl.video.download_video);

module.exports=router;