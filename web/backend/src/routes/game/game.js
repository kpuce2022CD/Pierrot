const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({dest:'games/'});
const ctrl = require('./game_ctrl');

router.post('/postGameInfo',upload.array('game'),ctrl.game.upload_game);
router.get('/getAllGameInfoByEmail',ctrl.game.download_all_game_by_email);
router.get('/getGameInfoById',ctrl.game.download_game_by_id);
router.get('/getAllGame',ctrl.game.download_all);

module.exports=router;