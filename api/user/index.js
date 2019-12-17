'use strict';

var express = require('express');
var controller = require('./user.controller');

var router = express.Router();

router.get('/getProfile', controller.getProfile);
router.post('/registerUser', controller.registerUser);
router.post('/loginUser', controller.loginUser);

module.exports = router;
