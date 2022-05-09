const express = require('express');
const router = express.Router();
const ctrl = require('../../ctrl');

router.post('/postMember',ctrl.auth.signup);
// router.post('/getMember',ctrl.auth.login);

module.exports=router;