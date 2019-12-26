'use strict';

var express = require('express');
var controller = require('./utility.controller');

var router = express.Router();

router.post('/createRefCode', controller.createRefCode);
router.post('/validateRefCode', controller.validateRefCode);
router.post('/createInviteUrl', controller.createInviteUrl);
router.post('/createSMS', controller.createSMS);

module.exports = router;
