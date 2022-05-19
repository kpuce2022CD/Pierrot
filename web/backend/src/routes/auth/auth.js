const express = require('express');
const router = express.Router();
const ctrl = require('./auth_ctrl');

router.post('/postMember',ctrl.auth.signup);
router.get('/getMember',ctrl.auth.login);

module.exports=router;