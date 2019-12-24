'use strict';

var express = require('express');
var controller = require('./utility.controller');

var router = express.Router();

router.post('/createRefCode', controller.createRefCode);
router.post('/validateRefCode', controller.validateRefCode);
router.get('/createInviteUrl', controller.createInviteUrl);
router.get('/createSMS', controller.createSMS);

module.exports = router;
