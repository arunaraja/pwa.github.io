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
  handleWallet(service, function (err, data) {
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
      data: [service.requestData.profileId]
    };
    const getWalletQueryResult = await database.executeSelect(getWalletQuery);
    return callback(null, responseUtils.getResponse(getWalletQueryResult[0], 'WALLET_FETCH_SUCCESSFUL', 'Wallet fetched for user'));
  } catch (e) {
    log.error(e);
    return callback(responseUtils.getErrorResponse(e.message, e));
  }
};

exports.manageWallet = function (req, res) {
  console.log("req.body")
  console.log(req.body)
  var service = {
    requestData: req.body
  };
  handleManageWallet(service, function (err, data) {
    if (err) {
      return responseUtils.sendResponse(err, res);
    }
    log.debug(data);
    responseUtils.sendResponse(data, res);
  });
};


async function handleManageWallet(service, callback) {
  try {
    var action = service.requestData.action;
    if (service.requestData.action === 'Add') {
      try {
        delete service.requestData['action'];
        service.requestData['createdDateTime'] = new Date();
        service.requestData['createdBy'] = "EM APP Wallet Add";
        const createTransactionQuery = {
          tableName: "em_wallet",
          data: service.requestData
        };
        const transactionId = await database.insertToTable(createTransactionQuery);
        return callback(null, responseUtils.getResponse({ transactionId }, ' Created', ' Record Created For the User'));
      } catch (e) {
        return callback(e);
      }
    }
    if (service.requestData.action === 'Delete' || service.requestData.action === 'Update') {
      if (service.requestData.action === 'Delete') {
        const transactionQuery1 = {
          sql: 'DELETE from em_wallet WHERE walletId=? AND profileId=? ;',
          data: [service.requestData.walletId, service.requestData.profileId]
        };
        try {
          const transactionResult = database.executeSelect(transactionQuery1);
          log.info(transactionResult);
          return callback(null, responseUtils.getResponse({ transactionResult }, ' Deleted', ' Record Deleted For the User'));
        } catch (e) {
          return callback(e);
        }
      }
      if (service.requestData.action === 'Update') {
        const transactionQuery2 = {
          sql: 'UPDATE em_wallet SET isPrimary="Yes"  WHERE walletId=? AND profileId=?;',
          data: [service.requestData.walletId, service.requestData.profileId]
        };
        const transactionQuery3 = {
          sql: 'UPDATE em_wallet SET isPrimary="No" WHERE walletId<>? AND profileId=?;',
          data: [service.requestData.walletId, service.requestData.profileId]
        };
        try {
          const transactionResult = database.executeSelect(transactionQuery2);
          const transactionResult3 = database.executeSelect(transactionQuery3);
          log.info(transactionResult);
          return callback(null, responseUtils.getResponse({ transactionResult }, ' Updated', ' Record Updated For the User'));
        } catch (e) {
          return callback(e);
        }
      }
    }
  } catch (e) {
    log.error(e);
    return callback(responseUtils.getErrorResponse(e.message, e));
  }

}