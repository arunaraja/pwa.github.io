'use strict';

var express = require('express');
var controller = require('./test.controller');

var router = express.Router();

router.post('/', controller.testHit);
router.post('/URL', controller.URLTSETS);

module.exports = router;
