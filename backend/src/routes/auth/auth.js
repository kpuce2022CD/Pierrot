const express = require('express');
const router = express();
const ctrl = require('../ctrl');

router.post('/postMember',ctrl.signup);
router.post('/getMember',ctrl.login);

module.exports=router;