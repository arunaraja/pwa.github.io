'use strict';
var responseUtils = require('../helpers/responseUtils');
var log = require('../helpers/log');
var database = require('../helpers/database')
var queryUtils = require('../helpers/queryUtils')
var async = require('async');
var _ = require("lodash")
var ip = require('ip');

exports.getVendorMaster = function (req, res) {
  handleVendors(function (err, data) {
    if (err) {
      return responseUtils.sendResponse(err, res);
    }
    log.debug(data);
    responseUtils.sendResponse(data, res);
  });
};

async function handleVendors(callback) {
  try {
    const getQuery = {
      sql: 'SELECT * FROM vendor_master;',
      data: []
    };
    const getQueryResult = await database.executeSelect(getQuery);
    return callback(null, responseUtils.getResponse(getQueryResult[0], 'VEDOR_MASTER_FETCH_SUCCESSFUL', 'Vendor Master data fetched for user'));
  } catch (e) {
    log.error(e);
    return callback(responseUtils.getErrorResponse(e.message, e));
  }
};

exports.getVendorTransactionMethod = function (req, res) {
  var service = {
    requestData: req.query
  };
  handleVendorsTransactionMethods(service,function (err, data) {
    if (err) {
      return responseUtils.sendResponse(err, res);
    }
    log.debug(data);
    responseUtils.sendResponse(data, res);
  });
};

async function handleVendorsTransactionMethods(service,callback) {
  try {
    const getQuery = {
      sql: 'SELECT * FROM vendor_transaction_master WHERE vendorId=?;',
      data: [service.requestData.vendorId]
    };
    const getQueryResult = await database.executeSelect(getQuery);
    return callback(null, responseUtils.getResponse(getQueryResult[0], 'VEDOR_MASTER_TRANSACTION_FETCH_SUCCESSFUL', 'Vendor Master Transaction data fetched for user'));
  } catch (e) {
    log.error(e);
    return callback(responseUtils.getErrorResponse(e.message, e));
  }
};

exports.getVendorTransactionLocation = function (req, res) {
  var service = {
    requestData: req.query
  };
  handleVendorsTransactionLocs(service,function (err, data) {
    if (err) {
      return responseUtils.sendResponse(err, res);
    }
    log.debug(data);
    responseUtils.sendResponse(data, res);
  });
};

async function handleVendorsTransactionLocs(service,callback) {
  try {
    const getQuery = {
      sql: 'SELECT * FROM vendor_agent_master WHERE vendorId=?;',
      data: [service.requestData.vendorId]
    };
    const getQueryResult = await database.executeSelect(getQuery);
    return callback(null, responseUtils.getResponse(getQueryResult[0], 'VEDOR_AGENT_MASTER_FETCH_SUCCESSFUL', 'Vendor Agent Master data fetched for user'));
  } catch (e) {
    log.error(e);
    return callback(responseUtils.getErrorResponse(e.message, e));
  }
};

