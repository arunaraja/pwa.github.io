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
    if (action === 'H') { //For home screen
      var groupDt = _.groupBy(transactionResult[0], 'receiverName');
      arr = _.map(groupDt, function (trans) {
        return { name: trans[0].receiverName };
      });
      data = arr;
    } else {
      data = _.groupBy(transactionResult[0], function (el) {
        var dt = new Date(el.createdDateTime);
        return  (dt.getDate() + '-') +  (dt.getMonth() + '-')+ (dt.getFullYear());
      });
      var newArr= [] ;
      _.filter(data,function(each){
        var obj = {date : each[0].createdDateTime}
        obj.resultArr = [] ;
        _.filter(each,function(data){obj.resultArr.push(data);})
        newArr.push(obj);
      });
      data = newArr;
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
  service.requestData['createdDateTime'] = new Date();
  service.requestData['createdBy'] = "EM APP SEND MONEY API";
  // service.requestData['transactionFee'] = "20";
  // service.requestData['ourFee'] = "10";
  // service.requestData['totalFee'] = "30";
  // service.requestData['exchangeRate'] = "19.3726";
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
    // log.info(transactionId);
    await exports.vendorTransactionAPI(service, function (err, data) {
      console.log(data)
      if (data.status == 200) {
        const transactionQuery = {
          sql: 'UPDATE em_transaction SET transactionStatus="Success" ,transactionReferenceCode = "TRAN001", updatedBy="FROM VENDOR API",updatedDateTime=? WHERE transactionId=?;',
          data: [new Date(),transactionId[0]]
        };
        const transactionResult = database.executeSelect(transactionQuery);
        // log.info(transactionId);
        return callback(null, responseUtils.getResponse({ transactionId }, 'Transaction Created', 'Transaction Record Created For the User'));
      }
      else {
        const transactionQuery = {
          sql: 'UPDATE em_transaction SET transactionStatus="Failed" WHERE transactionId=?;',
          data: transactionId[0]
        };
        const transactionResult = database.executeSelect(transactionQuery);
        // log.info(transactionId);
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
      // "url": "http://localhost:8080/api/transaction/sendTransactionToVendor",
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
    for (var i = 0; i < service.requestData.length; i++) {
      // const obj = new Map();
      const obj = service.requestData[i];
      obj.createdBy = "From Vendor Transaction Creation";
      obj.createdDateTime = new Date();
      obj.transactionStatus = "Success";
      obj.transactionReferenceCode = "TRAN001";
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
    // log.debug(data);
    responseUtils.sendResponse(data, res);
  });
}


async function getTransactionStatus(service, callback) {
 var resp = "Success";
  try {
    const transactionQuery = {
      sql: 'UPDATE em_transaction SET transactionStatus="Success" , updatedBy="FROM VENDOR API",updatedDateTime=? WHERE transactionId=?;',
      data: [new Date(),service.requestData.transactionId]
    };

    const transactionResult =await database.executeSelect(transactionQuery);
    return callback(null, responseUtils.getResponse({ status:"Success",transactionId:service.requestData.transactionId }, 'Transaction Fetch Success', 'Transactions Feched'));
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

async function getTransactionStatusFromAPI(service, callback){
  
         const transactionQuery = {
           tableName: "em_transaction",
           condition: {
             transactionId: service.requestData.transactionId
         },
           data: {
             transactionStatus: "Success"
           }
         };
         const transactionResult = database.executeSelect(transactionQuery);
      //  log.info(transactionResult);
         return callback(null, { status: 200 ,message:"Success"});
      }

exports.sendTransactionToVendor = async function(req,res){
  var service = {
    requestData: req.body
  };
  await exports.vendorTransactionAPI(service, function (err, data) {
  if (data.status == 200) {
    return responseUtils.getResponse({ status:"Success",transactionId:service.transactionId }, 'Transaction Success', 'Transaction Record Success For the User');
  }
  else {
    return responseUtils.getResponse({ status:"Failed",transactionId:service.transactionId }, 'Transaction Failed', 'Transaction Record Failed For the User');
  }
  });
}




  // try {
    // const transactionQuery = {
    //   tableName: "em_transaction",
    //   condition: {
    //     transactionId: service.requestData.transactionId
    // },
    //   data: {
    //     transactionStatus: "Success"
    //   }
    // };
    // const transactionResult =await database.executeSelect(transactionQuery);
    // console.log("transactionResult")
    // console.log(transactionResult)
    // getTransactionStatusFromAPI(service, function (err, data) {
      // if (err) {
      //   return callback(null, responseUtils.getResponse( {status:"Success",transactionId:service.requestData.transactionId}, 'Transaction Data Update Succcess', 'Transaction Updated'));
      //   // return callback(null, {status:"Success",transactionId:service.requestData.transactionId});
      // }
      // log.debug(data);
      // return callback(null, responseUtils.getResponse( {status:"Success",transactionId:service.requestData.transactionId}, 'Transaction Data Update Succcess', 'Transaction Updated'));
    // });

    // request.post({
    //   "headers": { "content-type": "application/json" },
    //   // "url": "http://localhost:8080/api/transaction/createTransaction",
    //   "url": "http://13.126.254.48:8080/api/common/mobAppLog",
    //   "body": JSON.stringify(service.requestData)
    // }, (error, response, body) => {
    //   if (error) {
    //     return callback(null, { status: 500 });
    //   }
    //   if (body) {
    //     const transactionQuery = {
    //       tableName: "em_transaction",
    //       condition: {
    //         transactionId: service.requestData.transactionId
    //       },
    //       data: {
    //         transactionStatus:body.data.status
    //       }
    //     };
    //     const transactionResult = database.executeSelect(transactionQuery);
    //     log.info(transactionResult);
    //     return callback(null, { status: 200 });
    //   } else {
    //     return callback(null, { status: 500 });
    //   }
    // });
  // } catch (e) {
  //   callback(null, { status: 500 });
  // }