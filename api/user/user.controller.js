'use strict';
var responseUtils = require('./../helpers/responseUtils');
var log = require('./../helpers/log');
var database = require('./../helpers/database')
var queryUtils = require('./../helpers/queryUtils')
var async = require('async');
var _ = require("lodash")
var ip = require('ip');

exports.getProfile = function (req, res) {

  var service = {
    requestData: req.query
  };
  handleGetProfile(service, function (err, data) {
    if (err) {
      return responseUtils.sendResponse(err, res);
    }
    log.debug(data);
    responseUtils.sendResponse(data, res);
  });
};

async function handleGetProfile(service, callback) {
  try {
    const getProfileQuery = {
      sql: 'SELECT * FROM em_profile WHERE profileId=?;',
      data: [service.requestData.profileId]
    };
    const getProfileQueryResult = await database.executeSelect(getProfileQuery);
    return callback(null, responseUtils.getResponse(getProfileQueryResult[0][0], 'PROFILE_FETCH_SUCCESSFUL', 'Profile fetched for user'));
  } catch (e) {
    log.error(e);
    return callback(responseUtils.getErrorResponse(e.message, e));
  }
};

exports.registerUser = function (req, res) {
  var service = {
    requestData: req.body
  };
  handleRegisterUser(service, function (err, data) {
    if (err) {
      return responseUtils.sendResponse(err, res);
    }
    responseUtils.sendResponse(data, res);
  });
};

async function handleRegisterUser(service, callback) {
  try {
    const isFirstTimeQuery = {
      sql: 'SELECT isActive,isFirstTime FROM ' + queryUtils.TABLES.login.name + ' WHERE phoneNumber=?;',
      data: [service.requestData.phoneNumber]
    };
    const isFirstTimeQueryResult = await database.executeSelect(isFirstTimeQuery);
    console.log("isFirstTimeQueryResult")
    console.log(isFirstTimeQueryResult)
    if (_.isEmpty(isFirstTimeQueryResult[0])) {
      return callback(responseUtils.getErrorResponse('USER_PROFILE_NOT_ENABLED', 'User profile has not been enabled. Please check with the store.'));
    }
    else if (isFirstTimeQueryResult[0][0].isActive === "Yes") {
      return callback(responseUtils.getErrorResponse('USER_IS_ACTIVE', 'User profile is already enabled in our system. Please proceed with login.'));
    }
    else if (isFirstTimeQueryResult[0][0].isFirstTime === "No") {
      return callback(responseUtils.getErrorResponse('USER_ALREADY_REGISTERED', 'User can be registerd only once. Please check with the store.'));
    } else {
      const updateLoginQuery = {
        tableName: queryUtils.TABLES.login.name,
        condition: {
          phoneNumber: service.requestData.phoneNumber
        },
        data: {
          pincode: service.requestData.pin,
        }
      };
      const updateLoginResult = await database.updateTable(updateLoginQuery);
      log.info(updateLoginResult);
      const updateLoginQuery2 = {
        tableName: queryUtils.TABLES.login.name,
        condition: {
          phoneNumber: service.requestData.phoneNumber
        },
        data: {
          isFirstTime: "No",
          isActive: "Yes"
        }
      };
      const updateLoginResult2 = await database.updateTable(updateLoginQuery2);
      const updateLoginQuery1 = {
        sql: 'UPDATE em_login_code SET  isVerified="Yes" ,updatedBy="On Registration" ,updatedDateTime=? WHERE phoneNumber=? ORDER BY expiryDateTime DESC LIMIT 1;',
        data: [new Date(),service.requestData.phoneNumber]
      };
      const updateLoginResult1 = await database.executeSelect(updateLoginQuery1);
      return callback(null, responseUtils.getSuccessResponse('USER_REGISTRATION_SUCCESSFUL', 'User registered successfully.'));
    }
  } catch (e) {
    log.error(e);
    return callback(e);
  }
};

exports.loginUser = function (req, res) {
  var service = {
    requestData: req.body
  };
  log.debug(service);
  handleLoginUser(service, function (err, data) {
    if (err) {
      return responseUtils.sendResponse(err, res);
    }
    responseUtils.sendResponse(responseUtils.getResponse(data, 'LOGIN_SUCCESSFULL', 'User log in successfull'), res);
  });
};

async function handleLoginUser(service, callback) {
  try {
    const isValidLoginQuery = {
      sql: 'SELECT profileId FROM ' + queryUtils.TABLES.login.name + ' WHERE phoneNumber=? AND pincode=?;',
      data: [service.requestData.phoneNumber, service.requestData.pin]
    };
    const isValidLoginQueryResult = await database.executeSelect(isValidLoginQuery);
    if (_.isEmpty(isValidLoginQueryResult[0])) {
      return callback(responseUtils.getErrorResponse('USERNAME_OR_PASSWORD_INCORRECT', 'Username or password is incorrect'));
    } else {
      log.info('test=' + isValidLoginQueryResult[0][0].profileId);
      return callback(null, {
        profileId: isValidLoginQueryResult[0][0].profileId,
      });
    }
  } catch (e) {
    log.error(e);
    return callback(responseUtils.getErrorResponse(require('util').inspect(e)));
  }
};

exports.createProfileFromVendorUser = async function (req, res) {
  var service = {
    requestData: req.body.profile
  };
  handleCreationOfProfile(service, function (err, data) {
    if (err) {
      return responseUtils.sendResponse(err, res);
    }
    log.debug(data);
    responseUtils.sendResponse(data, res);
  });
}

async function handleCreationOfProfile(service, callback) {
  var arrCreation = [];
  try {
    for (var i = 0; i <= service.requestData.length; i++) {
      var obj = service.requestData[i];
      obj.createdBy = "From Vendor Profile Creation";
      obj.createdDateTime = new Date();
      const profileQueryData = {
        tableName: "em_profile",
        data: obj
      };
      var profileIdArr = await database.insertToTable(profileQueryData);
      var profileId = profileIdArr[0];
      var phoneNumber = obj['phoneNumber'];
      const inviteUrl = await exports.createInviteUrl();
      var loginObj = {
        phoneNumber: phoneNumber,
        profileId: profileId,
        vendorId: "1",
        pincode: null,
        inviteUrl: inviteUrl,
        isActive: "No",
        isFirstTime: "Yes",
        createdBy: "From Vendor Profile Creation",
        createdDateTime: new Date()
      }
      const loginQueryData = {
        tableName: "em_login",
        data: loginObj
      };
      var loginIdArr = await database.insertToTable(loginQueryData);
      // arrCreation.push()
    }
    return callback(null, responseUtils.getResponse({ inviteUrl }, 'Profile Create Suucess', 'Profile is successfully created for the user'));
  } catch (e) {
    log.error(e);
    let userError;
    if (e.code === 'ER_DUP_ENTRY') {
      userError = responseUtils.getErrorResponse('ALREADY_ENABLED_PROFILE', 'Profile already enabled for this user');
    } else {
      userError = responseUtils.getErrorResponse(e.message, e);
    }
    return callback(userError);
  }
}

exports.createInviteUrl = async function (service) {
  var appUrl = 'http://localhost:4200/welcome';
  return appUrl;
};

exports.validateMobileNo = function (req, res) {

  var service = {
    requestData: req.body
  };
  validateMobile(service, function (err, data) {
    if (err) {
      return responseUtils.sendResponse(err, res);
    }
    log.debug(data);
    responseUtils.sendResponse(data, res);
  });
};

async function validateMobile(service, callback) {
  try {
    const getMobileQuery = {
      sql: 'SELECT * FROM em_login WHERE phoneNumber=?;',
      data: [service.requestData.mobileNo]
    };
    const getQueryResult = await database.executeSelect(getMobileQuery);
    return callback(null, responseUtils.getResponse(getQueryResult[0][0], 'PROFILE_FETCH_SUCCESSFUL', 'Profile fetched for user'));
  } catch (e) {
    log.error(e);
    return callback(responseUtils.getErrorResponse(e.message, e));
  }
};