'use strict';
var responseUtils = require('./../helpers/responseUtils');
var log = require('./../helpers/log');
var database = require('./../helpers/database')

exports.getProfile = function (req, res) {
  var service = {
    requestData: req.query
  };
 handleGetProfile(service, function(err, data) {
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
      sql: 'SELECT * FROM ' + queryUtils.TABLES.profile.name + ' WHERE phoneNumber=?;',
      data: [service.requestData.phoneNumber]
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
  handleRegisterUser(service, function(err, data) {
    if (err) {
      return responseUtils.sendResponse(err, res);
    }
    responseUtils.sendResponse(data, res);
  });
};

async function handleRegisterUser (service, callback) {
  try {
    const isFirstTimeQuery = {
      sql: 'SELECT isActive,isFirstTime FROM ' + queryUtils.TABLES.login.name + ' WHERE phoneNumber=?;',
      data: [service.requestData.phoneNumber]
    };
    const isFirstTimeQueryResult = await database.executeSelect(isFirstTimeQuery);
    if (_.isEmpty(isFirstTimeQueryResult[0])) {
      return callback(responseUtils.getErrorResponse('USER_PROFILE_NOT_ENABLED', 'User profile has not been enabled. Please check with the store.'));
    } else if (isFirstTimeQueryResult[0][0].isActive === "Yea") {
      return callback(responseUtils.getErrorResponse('USER_IS_NOT_ACTIVE', 'User profile is not enabled in our system. Please check with the store.'));
    } else if (isFirstTimeQueryResult[0][0].isFirstTime === "Yes") {
      return callback(responseUtils.getErrorResponse('USER_ALREADY_REGISTERED', 'User can be registerd only once. Please check with the store.'));
    } else {
      const updateLoginQuery = {
        tableName: queryUtils.TABLES.login.name,
        condition: {
          phoneNumber: service.requestData.phoneNumber
        },
        data: {
          pin: service.requestData.pin,
          isFirstTime: "Yes"
        }
      };
      const updateLoginResult = await database.updateTable(updateLoginQuery);
      log.info(updateLoginResult);
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
  handleLoginUser(service, function(err, data) {
    if (err) {
      return responseUtils.sendResponse(err, res);
    }
    responseUtils.sendResponse(responseUtils.getResponse(data, 'LOGIN_SUCCESSFULL', 'User log in successfull'), res);
  });
};

exports._handleLoginUser = async function(service, callback) {
  try {
    const isValidLoginQuery = {
      sql: 'SELECT profileId FROM ' + queryUtils.TABLES.login.name + ' WHERE phoneNumber=? AND pin=?;',
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

