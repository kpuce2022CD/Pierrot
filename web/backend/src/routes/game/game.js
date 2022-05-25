const express = require('express');
const router = express.Router();
const ctrl = require('../../ctrl');

router.post('/getGameInfo',ctrl.game.get_information);

module.exports=router;