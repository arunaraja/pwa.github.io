'use strict';

var express = require('express');
var controller = require('./transaction.controller');

var router = express.Router();

router.get('/getTransaction', controller.getTransaction);
router.post('/createTransaction', controller.createTransaction);
router.post('/transactionHistoryFromVendor', controller.transactionHistoryFromVendor);
// router.post('/loginUser', controller.loginUser);
// router.post('/profileFromVendor', controller.createProfileFromVendorUser);

module.exports = router;
