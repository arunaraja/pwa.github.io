'use strict';
var responseUtils = require('./../helpers/responseUtils');
var log = require('./../helpers/log');
var database = require('./../helpers/database')
var queryUtils = require('./../helpers/queryUtils')
var async = require('async');
var _ = require("lodash")
var ip = require('ip');

exports.createRefCode = function (req, res) {
  var service = {
    requestData: req.body
  };
  handleRefCode(service, function (err, data) {
    if (err) {
      return responseUtils.sendResponse(err, res);
    }
    responseUtils.sendResponse(data, res);
  });
};

async function handleRefCode(service, callback) {
  try {
    var phoneNumber = service.requestData.phoneNumber;
    var currentDate = new Date();
    var expiry = currentDate.setMinutes(currentDate.getMinutes() + 30);
    var obj = {
      phoneNumber: phoneNumber,
      referenceCode: Math.floor(100000 + Math.random() * 900000),
      expiryDateTime: new Date(expiry),
      isVerified: "No",
      createdDateTime: new Date(),
      createdBy: "EM APP VERFICATION CODE CREATION"
    }
    const createTransactionQuery = {
      tableName: "em_login_code",
      data: obj
    };
    const respQueryResult = await database.insertToTable(createTransactionQuery);
    return callback(null, responseUtils.getResponse(respQueryResult[0][0], 'VerificationCode Create Success', 'VerificationCode is successfully created for the user'));
  } catch (e) {
    log.error(e);
    return callback(responseUtils.getErrorResponse(require('util').inspect(e)));
  }
};
exports.validateRefCode = function (req, res) {
  var service = {
    requestData: req.body
  };
  handleValidateRefCode(service, function (err, data) {
    if (err) {
      return responseUtils.sendResponse(err, res);
    }
    responseUtils.sendResponse(data, res);
  });
};

async function handleValidateRefCode(service, callback) {
  console.log("service.requestData")
  console.log(service.requestData)
  const transactionQuery1 = {
    sql: 'SELECT * from em_login_code WHERE phoneNumber=? AND referenceCode=?;',
    data: [service.requestData.phoneNumber, service.requestData.referenceCode]
  };
  const transactionResult = await database.executeSelect(transactionQuery1);
  if (transactionResult[0][0]) {
    const updateLoginQuery = {
      tableName: queryUtils.TABLES.login.name,
      condition: {
        phoneNumber: service.requestData.phoneNumber
      },
      data: {
        isFirstTime: "No",
        isActive: "Yes"
      }
    };
    const updateLoginResult = await database.updateTable(updateLoginQuery);
    const updateLoginQuery1 = {
      tableName: "em_login_code",
      condition: {
        phoneNumber: service.requestData.phoneNumber
      },
      data: {
        isVerified: "Yes",
        updatedBy: "On Registration",
        updatedOn: new Date()
      }
    };
    const updateLoginResult1 = await database.updateTable(updateLoginQuery1);
    return callback(null, responseUtils.getResponse({ result: "Code Matched" }, 'Code Matched', 'Code Matched'));
  }
  else {
    return callback(null, responseUtils.getResponse({ result: "Code Not Matched" }, 'Code Not Matched', 'Code Not Matched'));
  }

};
