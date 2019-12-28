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

    if(action === "L"){
        transactionQuery.sql =  'SELECT * FROM em_transaction WHERE profileId=? AND receiverName=?  ORDER  BY createdDateTime DESC LIMIT  1;',
        transactionQuery.data = [service.requestData.profileId,service.requestData.receiverName]
   }
    const transactionResult = await database.executeSelect(transactionQuery);
    var data;
    var arr = [];
    if (action === 'L') { //For LATEST screen
      if (transactionResult[0] && transactionResult[0].length > 0) {
        data = transactionResult[0][0];
        console.log("data")
        console.log(data)
      }
      else {
        data = [];
      }
    } 
    else if (action === 'H') { //For home screen
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
          sql: 'UPDATE em_transaction SET transactionStatus="Success" ,transactionReferenceCode = "TRAN001", updatedBy="FROM VENDOR API"WHERE transactionId=?;',
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
    return callback(null, { status: 200 });
    // request.post({
    //   "headers": { "content-type": "application/json" },
    //   // "url": "http://localhost:8080/api/transaction/sendTransactionToVendor",
    //   // "url": "http://13.126.254.48:8080/api/common/mobAppLog",
    //   "body": JSON.stringify(service.requestData)
    // }, (error, response, body) => {
    //   if (error) {
    //     return callback(null, { status: 500 });
    //   }
    //   if (body) {
    //     console.log({ status: 200 })
       
    //   } else {
    //     return callback(null, { status: 500 });
    //   }
    // });
  } catch (e) {
    callback(null, { status: 500 });
  }

}

exports.transactionHistoryFromVendor = async function (req, res) {
  var service = {
    requestData: req.body.transactions
  };
  handleTransactionHistoryCreation(service, function (err, data) {
    if (err) {
      return responseUtils.sendResponse(err, res);
    }
    responseUtils.sendResponse(data, res);
  });
}
async function handleTransactionHistoryCreation(service, callback) {
  var responseArray = [];
  try {
    for (var i = 0; i < service.requestData.length; i++) {
      const obj = {};
      var vendorId,profileId,vendorName;
      var vendorCode = service.requestData[i].vendorCode ? service.requestData[i].vendorCode : null;
      // To Check Vendor Code Exist Or Not
      const getQuery = {
        sql: 'SELECT * FROM vendor_master WHERE vendorCode=?;',
        data: [vendorCode]
      };
      const getQueryResult = await database.executeSelect(getQuery);
      if (getQueryResult[0] && getQueryResult[0].length <= 0) {
        responseArray.push({ vendorCustomerId: service.requestData[i].vendorCustomerId,  vendorCode: service.requestData[i].vendorCode, status: 500, message: "Vendor Code Not Available" });
      }
      else{
        vendorId = getQueryResult[0][0].vendorId;
        vendorName = getQueryResult[0][0].vendorName;
         // To Check Vendor Customer ID Exist Or Not
        var vendorCustomerId = service.requestData[i].vendorCustomerId ? service.requestData[i].vendorCustomerId : null;
        const getQueryCust = {
          sql: 'SELECT * FROM em_profile WHERE vendorCustomerId=?;',
          data: [vendorCustomerId]
        };
        const getQueryCustResult = await database.executeSelect(getQueryCust);
        if (getQueryCustResult[0] && getQueryCustResult[0].length <= 0) {
          responseArray.push({ vendorCustomerId: service.requestData[i].vendorCustomerId,  vendorCode: service.requestData[i].vendorCode, status: 500, message: "Vendor Customer ID Not Available" });
        }
        else{
          profileId = getQueryCustResult[0][0].profileId;
          obj.vendorId = vendorId;
          obj.vendorCode = vendorCode;
          obj.vendorCustomerId = vendorCustomerId;
          obj.profileId = profileId;
          obj.receiverName = service.requestData[i].receiverName ? service.requestData[i].receiverName : null;
          obj.receiverCountry = service.requestData[i].receiverCountry ? service.requestData[i].receiverCountry : null;
          obj.receiverPhoneNumber = service.requestData[i].receiverPhoneNumber ? service.requestData[i].receiverPhoneNumber : null;
          obj.transactionAmount = service.requestData[i].transactionAmount ? service.requestData[i].transactionAmount : null;
          obj.phoneNumber = service.requestData[i].phoneNumber ? service.requestData[i].phoneNumber : null;
          obj.paymentMethod = service.requestData[i].paymentMethod ? service.requestData[i].paymentMethod : null;
          obj.deliveryMethod = service.requestData[i].deliveryMethod ? service.requestData[i].deliveryMethod : null;
          obj.deliveryBankName = service.requestData[i].deliveryBankName ? service.requestData[i].deliveryBankName : null;
          obj.deliveryBankRoutingNumber = service.requestData[i].deliveryBankRoutingNumber ? service.requestData[i].deliveryBankRoutingNumber : null;
          obj.deliveryBankAccountNumber = service.requestData[i].deliveryBankAccountNumber ? service.requestData[i].deliveryBankAccountNumber : null;
          obj.deliveryBankAccountName = service.requestData[i].deliveryBankAccountName ? service.requestData[i].deliveryBankAccountName : null;
          obj.cashPickUpAddress1 = service.requestData[i].cashPickUpAddress1 ? service.requestData[i].cashPickUpAddress1 : null;
          obj.cashPickUpAddress2 = service.requestData[i].cashPickUpAddress2 ? service.requestData[i].cashPickUpAddress2 : null;
          obj.cashPickUpCity = service.requestData[i].cashPickUpCity ? service.requestData[i].cashPickUpCity : null;
          obj.cashPickUpState = service.requestData[i].cashPickUpState ? service.requestData[i].cashPickUpState : null;
          obj.cashPickUpZipcode = service.requestData[i].cashPickUpZipcode ? service.requestData[i].cashPickUpZipcode : null;
          obj.transactionFee = service.requestData[i].transactionFee ? service.requestData[i].transactionFee : null;
          obj.ourFee = service.requestData[i].ourFee ? service.requestData[i].ourFee : null;
          obj.totalFee = service.requestData[i].totalFee ? service.requestData[i].totalFee : null;
          obj.exchangeRate = service.requestData[i].exchangeRate ? service.requestData[i].exchangeRate : null;
          obj.transactionTotalAmount = service.requestData[i].transactionTotalAmount ? service.requestData[i].transactionTotalAmount : null;
          obj.transactionStatus = service.requestData[i].transactionStatus ? service.requestData[i].transactionStatus : null;
          obj.transactionReferenceCode = service.requestData[i].transactionReferenceCode ? service.requestData[i].transactionReferenceCode   : null;
          obj.totalAmountSentToReceiver = service.requestData[i].totalAmountSentToReceiver ? service.requestData[i].totalAmountSentToReceiver : null;
          obj.vendorName = vendorName;
          obj.receiverCity = service.requestData[i].receiverCity ? service.requestData[i].receiverCity : null;
          obj.receiverState = service.requestData[i].receiverState ? service.requestData[i].receiverState : null;
          obj.phoneNumber = service.requestData[i].transactionReferenceCode ?service.requestData[i].transactionReferenceCode : null;
          obj.createdBy = "/api/transaction/transactionHistoryFromVendor";
          obj.createdDateTime = new Date();
          const transactionQueryData = {
            tableName: "em_transaction",
            data: obj
          };
          var transactionArr = await database.insertToTable(transactionQueryData);
          responseArray.push({ vendorCustomerId: service.requestData[i].vendorCustomerId, vendorCode: service.requestData[i].vendorCode,transactionId:transactionArr[0], status: 200, message: "Transaction History Created" });
        }
      }
    }
    return callback(null, responseUtils.getResponse({ responseArray }, 'Bulk Transaction History Creation API Job Done', 'Bulk Transaction History Creation API Job Done'));
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
    return callback(null, responseUtils.getResponse({ status:"Success",transactionId:service.requestData.transactionId,vendorCode:service.requestData.vendorCode? service.requestData.vendorCode:"",vendorCustomerId:service.requestData.vendorCustomerId?service.requestData.vendorCustomerId:""  }, 'Transaction Fetch Success', 'Transactions Feched'));
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
async function getTransactionStatus1(service, callback) {
  var data = {status : 200};
  if (data.status == 200) {
    return callback(responseUtils.getResponse({ status:"Success",transactionId:service.transactionId }, 'Transaction Success', 'Transaction Record Success For the User'));
  }
  else {
    return callback(responseUtils.getResponse({ status:"Failed",transactionId:service.transactionId }, 'Transaction Failed', 'Transaction Record Success For the User'));
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
  getTransactionStatus1(service, function (err, data) {
    if (err) {
      return responseUtils.sendResponse(err, res);
    }
    // log.debug(data);
    responseUtils.sendResponse(data, res);
  });
  
  // });
}

 function vendorTransactionAPI (service, callback) {
  var resp = "Success";
   try {
     const transactionQuery = {
       sql: 'UPDATE em_transaction SET transactionStatus="Success" , updatedBy="FROM VENDOR API",updatedDateTime=? WHERE transactionId=?;',
       data: [new Date(),service.requestData.transactionId]
     };
 
     const transactionResult = database.executeSelect(transactionQuery);
     return callback(null, responseUtils.getResponse({ status:"Success",transactionId:service.requestData.transactionId }, 'Transaction Record Fetch Success', 'Transactions Record Fetched'));
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