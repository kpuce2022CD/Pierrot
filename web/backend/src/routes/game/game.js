const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({dest:'games/'})
const ctrl = require('./game_ctrl');

router.post('/postGameInfo',upload.single('game'),ctrl.game.upload_game);
router.get('/getGameInfo',ctrl.game.download_all_game);

module.exports=router;