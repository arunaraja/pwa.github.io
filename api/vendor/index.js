'use strict';

var express = require('express');
var controller = require('./vendor.controller');

var router = express.Router();

router.get('/getVendorMaster', controller.getVendorMaster);
router.get('/getVendorTransactionMethod', controller.getVendorTransactionMethod);
router.get('/getVendorTransactionLocation', controller.getVendorTransactionLocation);

module.exports = router;
