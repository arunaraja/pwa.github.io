'use strict';
var responseUtils = require('../helpers/responseUtils');
var log = require('../helpers/log');
var database = require('../helpers/database')
var queryUtils = require('../helpers/queryUtils')
var async = require('async');
var _ = require("lodash")
var ip = require('ip');

exports.getWallet = function (req, res) {
	console.log("req.body")
	console.log(req.query)
  var service = {
    requestData: req.query
  };
 handleWallet(service, function(err, data) {
		if (err) {
		  return responseUtils.sendResponse(err, res);
		}
		log.debug(data);
		responseUtils.sendResponse(data, res);
	  });
};

async function handleWallet(service, callback) {
  try {
    const getWalletQuery = {
      sql: 'SELECT * FROM em_wallet WHERE profileId=?;',
      data: [service.requestData.id]
    };
    const getWalletQueryResult = await database.executeSelect(getWalletQuery);
	console.log("getWalletQueryResult")
	console.log(getWalletQueryResult[0])
    return callback(null, responseUtils.getResponse(getWalletQuery[0], 'WALLET_FETCH_SUCCESSFUL', 'Wallet fetched for user'));
  } catch (e) {
    log.error(e);
    return callback(responseUtils.getErrorResponse(e.message, e));
  }
};

exports.manageWallet = function (req, res) {
	console.log("req.body")
	console.log(req.query)
  var service = {
    requestData: req.query
  };
 handleManageWallet(service, function(err, data) {
		if (err) {
		  return responseUtils.sendResponse(err, res);
		}
		log.debug(data);
		responseUtils.sendResponse(data, res);
	  });
};


async function handleManageWallet(service,callback){
  try {
    var action = service.requestData.action;
    if (service.requestData.action  === 'Add') {
      var obj = service.requestData;
      obj.createdDateTime = new Date();
      obj.createdBy = "EM API"
      try {
        const createTransactionQuery = {
          tableName: "em_wallet",
          data: service.requestData
        };
        const transactionId = await database.insertToTable(createTransactionQuery);
        return callback(null, responseUtils.getResponse({ transactionId}, 'Transaction Created', 'Transaction Record Created For the User'));
      }catch(e){
        return callback(e);
      }
    }
    if (service.requestData.action  === 'Delete' ||  service.requestData.action  === 'Update') {
      if(service.requestData.action  === 'Delete'){
        const transactionQuery1 = {
          sql: 'DELETE from em_transaction WHERE walletId=?;',
          data : service.requestData.walletId
        };
        try{
          const transactionResult =  database.executeSelect(transactionQuery1);
          log.info(transactionResult);
          return callback(null, responseUtils.getResponse({ transactionId}, 'Transaction Created', 'Transaction Record Created For the User'));
        }catch(e){
          return callback(e);
        }
      }
      if(service.requestData.action  === 'Update'){
        const transactionQuery2 = {
          sql: 'UPDATE em_transaction SET isPrimary="Success" WHERE walletId=?;',
          data : [service.requestData.walletId,service.requestData.profileId]
        };
        try{
          const transactionResult =  database.executeSelect(transactionQuery2);
          log.info(transactionResult);
          return callback(null, responseUtils.getResponse({ transactionId}, 'Transaction Created', 'Transaction Record Created For the User'));
        }catch(e){
          return callback(e);
        }
      }
    }
  } catch (e) {
    log.error(e);
    return callback(responseUtils.getErrorResponse(e.message, e));
  }

}