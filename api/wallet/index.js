'use strict';

var express = require('express');
var controller = require('./wallet.controller');

var router = express.Router();

router.get('/getWallet', controller.getWallet);
router.post('/manageWallet', controller.manageWallet);

module.exports = router;
