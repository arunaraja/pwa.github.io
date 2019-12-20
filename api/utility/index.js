'use strict';

var express = require('express');
var controller = require('./utility.controller');

var router = express.Router();

router.post('/createRefCode', controller.createRefCode);
router.post('/validateRefCode', controller.validateRefCode);

module.exports = router;
