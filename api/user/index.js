'use strict';

var express = require('express');
var controller = require('./user.controller');

var router = express.Router();

router.get('/profile', controller.getProfile);
router.post('/registerUser', controller.registerUser);
router.post('/loginUser', controller.loginUser);
router.post('/profileFromVendor', controller.createProfileFromVendorUser);

// router.post('/validateMobileNo', controller.validateMobileNo);


module.exports = router;
