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
    const queryNew = {
      sql: 'SELECT * from em_login_code WHERE phoneNumber=? AND isVerified="Yes";',
      data: [service.requestData.phoneNumber]
    };
    const queryResultNew = await database.executeSelect(queryNew);
    console.log("queryResultNew")
    console.log(queryResultNew)
    if(queryResultNew && queryResultNew[0].length > 0){
      return callback(null, responseUtils.getResponse({code:"Already Verified"}, 'Verification done Already', 'Verfication already done for the user'));
    }
    else{
      const query1 = {
        sql: 'SELECT * from em_login_code WHERE phoneNumber=? ',
        data: [service.requestData.phoneNumber]
      };
      const queryResult1 = await database.executeSelect(query1);
      if(queryResult1 && queryResult1[0].length > 0){
        const query2= {
          sql: 'UPDATE em_login_code SET isExpired="Yes" WHERE phoneNumber=? ',
          data: [service.requestData.phoneNumber]
        };
        const queryResult2 = await database.executeSelect(query2);
      }
      var phoneNumber = service.requestData.phoneNumber;
      var currentDate = new Date();
      var expiry = currentDate.setMinutes(currentDate.getMinutes() + 30);
      var obj = {
        phoneNumber: phoneNumber,
        referenceCode: Math.floor(100000 + Math.random() * 900000),
        expiryDateTime: new Date(expiry),
        isVerified: "No",
        isExpired: "No",
        createdDateTime: new Date(),
        createdBy: "EM APP VERFICATION CODE CREATION"
      }
      const createTransactionQuery = {
        tableName: "em_login_code",
        data: obj
      };
      const respQueryResult = await database.insertToTable(createTransactionQuery);
      return callback(null, responseUtils.getResponse(respQueryResult[0][0], 'VerificationCode Create Success', 'VerificationCode is successfully created for the user'));
    }
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
  const transactionQuery1 = {
    sql: 'SELECT * from em_login_code WHERE phoneNumber=? AND referenceCode=? AND isExpired="No";',
    data: [service.requestData.phoneNumber, service.requestData.referenceCode]
  };
  const transactionResult = await database.executeSelect(transactionQuery1);
  if (transactionResult[0][0]) {   
    
    return callback(null, responseUtils.getResponse({ result: "Code Matched" }, 'Code Matched', 'Code Matched'));
  }
  else {
    return callback(null, responseUtils.getResponse({ result: "Code Not Matched" }, 'Code Not Matched', 'Code Not Matched'));
  }

};


// exports.createInviteUrl = async function (req,res) {
//   console.log("HIT")
//   var appUrl = 'http://localhost:4200/welcome';
//  return responseUtils.getResponse({ url: appUrl }, res);
//   // return appUrl;
// };

exports.createInviteUrl = function (req, res) {
  var service = {
  };
  handleInviteUrlRefCode(service, function (err, data) {
    if (err) {
      return responseUtils.sendResponse(err, res);
    }
    responseUtils.sendResponse(data, res);
  });
};

async function handleInviteUrlRefCode(service, callback) {
  var appUrl = 'http://localhost:4200/welcome';
    return callback(null, responseUtils.getResponse({ result:appUrl }, 'Welcome URL Created', 'Welcome URL Created'));
};
exports.createSMS = function (req, res) {
  var service = {
  };
  handleSMSCode(service, function (err, data) {
    if (err) {
      return responseUtils.sendResponse(err, res);
    }
    responseUtils.sendResponse(data, res);
  });
};

async function handleSMSCode(service, callback) {
    return callback(null, responseUtils.getResponse({ result:"Message Created" }, 'Welcome URL Created', 'Welcome URL Created'));
};

// exports.createSMS = async function (req,res) {
//   // var appUrl = 'http://localhost:4200/welcome';
//   responseUtils.getResponse({ result: "Message Created" }, res);
//   // return appUrl;
// };