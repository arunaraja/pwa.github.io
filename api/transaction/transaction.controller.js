'use strict';
var responseUtils = require('../helpers/responseUtils');
var log = require('../helpers/log');
var database = require('../helpers/database')
var request = require('request');
var queryUtils = require('../helpers/queryUtils')
var async = require('async');
var _ = require("lodash")
var ip = require('ip');

exports.getTransaction = function (req, res) {
  console.log("req.body")
  console.log(req.query)
  var service = {
    requestData: req.query
  };
  getTransactionData(service, function (err, data) {
    if (err) {
      return responseUtils.sendResponse(err, res);
    }
    log.debug(data);
    responseUtils.sendResponse(data, res);
  });
};

async function getTransactionData(service, callback) {
  try {
    var action = service.requestData.action;
    var st;
    if (service.requestData.days !== "All" && service.requestData.days === "7") {
      if (service.requestData.receiverName && service.requestData.receiverName.length > 0) {
        st = 'WHERE profileId=? AND receiverName=? AND createdDateTime >= DATE(NOW()) - INTERVAL 7 DAY;'
      }
      else {
        st = 'WHERE profileId=?  AND createdDateTime >= DATE(NOW()) - INTERVAL 7 DAY;'
      }
    }
    else if (service.requestData.days !== "All" && service.requestData.days === "30") {
      if (service.requestData.receiverName && service.requestData.receiverName.length > 0) {
        st = 'WHERE profileId=? AND receiverName=? AND createdDateTime >= DATE(NOW()) - INTERVAL 30 DAY;'
      }
      else {
        st = 'WHERE profileId=?  AND createdDateTime >= DATE(NOW()) - INTERVAL 30 DAY;'
      }
    }
    else if (service.requestData.receiverName && service.requestData.receiverName.length > 0 && service.requestData.days === "All") {
      st = 'WHERE profileId=? AND receiverName=?;'
    }
    else {
      st = 'WHERE profileId=?;'
    }
    const transactionQuery = {
      sql: 'SELECT * FROM em_transaction ' + st,

    };
    if (service.requestData.receiverName && service.requestData.receiverName.length > 0) {
      transactionQuery.data = [service.requestData.profileId, service.requestData.receiverName]
    }
    else {
      transactionQuery.data = [service.requestData.profileId]
    }
    const transactionResult = await database.executeSelect(transactionQuery);
    var data;
    var arr = [];
    if (action === "H") { //For home screen
      var groupDt = _.groupBy(transactionResult[0], 'receiverName');
      arr = _.map(groupDt, function (trans) {
        return { name: trans[0].receiverName };
      });
      data = arr;
    } else {
      data = _.groupBy(transactionResult[0], function (el) {
        var dt = new Date(el.createdDateTime);
        return (dt.getFullYear() + '-') + (dt.getMonth() + '-') + (dt.getDate() + '-');
      });
    }
    return callback(null, responseUtils.getResponse(data, 'Transaction Data Fetch Succcess', 'Transaction fetched'));
  } catch (e) {
    log.error(e);
    return callback(responseUtils.getErrorResponse(e.message, e));
  }
};

exports.createTransaction = function (req, res) {
  var service = {
    requestData: req.body
  };
  handleCreateTransaction(service, function (err, data) {
    if (err) {
      return responseUtils.sendResponse(err, res);
    }
    responseUtils.sendResponse(data, res);
    res.json();
  });
}

async function handleCreateTransaction(service, callback) {
  try {
    const createTransactionQuery = {
      tableName: "em_transaction",
      data: service.requestData
    };
    const transactionId = await database.insertToTable(createTransactionQuery);
    log.info(transactionId);
    await exports.vendorTransactionAPI(service, function (err, data) {
      console.log("data")
      console.log(data)
      if (data.status == 200) {
        const transactionQuery = {
          sql: 'UPDATE em_transaction SET transactionStatus="Success" WHERE transactionId=?;',
          data: transactionId[0]
        };
        const transactionResult = database.executeSelect(transactionQuery);
        log.info(transactionResult);
        return callback(null, responseUtils.getResponse({ transactionId }, 'Transaction Created', 'Transaction Record Created For the User'));
      }
      else {
        const transactionQuery = {
          sql: 'UPDATE em_transaction SET transactionStatus="Failed" WHERE transactionId=?;',
          data: transactionId[0]
        };
        const transactionResult = database.executeSelect(transactionQuery);
        log.info(transactionResult);
        return callback(null, responseUtils.getResponse({ transactionId }, 'Transaction Created', 'Transaction Record Created For the User'));
      }
    });
  } catch (e) {
    log.error(e);
    let userError;
    if (e.code === 'ER_DUP_ENTRY') {
      userError = responseUtils.getErrorResponse('ALREADY_CREATED', 'Record Already Available');
    } else {
      userError = responseUtils.getErrorResponse(e.message, e);
    }
    return callback(userError);
  }
};

exports.vendorTransactionAPI = async function (service, callback) {
  try {
    request.post({
      "headers": { "content-type": "application/json" },
      // "url": "http://localhost:8080/api/transaction/createTransaction",
      "url": "http://13.126.254.48:8080/api/common/mobAppLog",
      "body": JSON.stringify(service.requestData)
    }, (error, response, body) => {
      if (error) {
        return callback(null, { status: 500 });
      }
      if (body) {
        console.log({ status: 200 })
        return callback(null, { status: 200 });
      } else {
        return callback(null, { status: 500 });
      }
    });
  } catch (e) {
    callback(null, { status: 500 });
  }

}

exports.transactionHistoryFromVendor = async function (req, res) {

  var service = {
    requestData: req.body.transactions
  };
  handleTransactionCreation(service, function (err, data) {
    if (err) {
      return responseUtils.sendResponse(err, res);
    }
    log.debug(data);
    responseUtils.sendResponse(data, res);
  });
}
async function handleTransactionCreation(service, callback) {

  try {
    for (var i = 0; i <= service.requestData.length; i++) {
      // const obj = new Map();
      const obj = service.requestData[i];
      obj.createdBy = "From Vendor Profile Creation";
      obj.createdDateTime = new Date();
      obj.transactionStatus = "Success";
      const transactionQueryData = {
        tableName: "em_transaction",
        data: obj
      };
      var transactionArr = await database.insertToTable(transactionQueryData);
    }
    return callback(null, responseUtils.getResponse({ service }, 'Transaction Records Created', 'Transaction Records Created for the user'));
  } catch (e) {
    log.error(e);
    let userError;
    if (e.code === 'ER_DUP_ENTRY') {
      userError = responseUtils.getErrorResponse('Transaction Records Already Created', 'Record Available');
    } else {
      userError = responseUtils.getErrorResponse(e.message, e);
    }
    return callback(userError);
  }
}
exports.getTransactionStatusFromVendor = async function (req, res) {

  var service = {
    requestData: req.body
  };
  getTransactionStatus(service, function (err, data) {
    if (err) {
      return responseUtils.sendResponse(err, res);
    }
    log.debug(data);
    responseUtils.sendResponse(data, res);
  });
}


async function getTransactionStatus(service, callback) {
  try {
    request.post({
      "headers": { "content-type": "application/json" },
      // "url": "http://localhost:8080/api/transaction/createTransaction",
      "url": "http://13.126.254.48:8080/api/common/mobAppLog",
      "body": JSON.stringify(service.requestData)
    }, (error, response, body) => {
      if (error) {
        return callback(null, { status: 500 });
      }
      if (body) {
        const transactionQuery = {
          tableName: "em_transaction",
          condition: {
            transactionId: service.requestData.transactionId
          },
          data: {
            transactionStatus:body.data.status
          }
        };
        const transactionResult = database.executeSelect(transactionQuery);
        log.info(transactionResult);
        return callback(null, { status: 200 });
      } else {
        return callback(null, { status: 500 });
      }
    });
  } catch (e) {
    callback(null, { status: 500 });
  }
}