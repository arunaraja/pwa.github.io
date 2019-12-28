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
    if(getProfileQueryResult[0] && getProfileQueryResult[0].length > 0){

    }

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
    if (_.isEmpty(isFirstTimeQueryResult[0])) {
      return callback(responseUtils.getErrorResponse('USER_PROFILE_NOT_ENABLED', 'User profile has not been enabled. Please check with the store.'));
    }
    else
     if (isFirstTimeQueryResult[0][0].isActive === "Yes") {
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
      const isValidProfile = {
        sql: 'SELECT firstName,lastName,vendorCustomerId,phoneNumber FROM ' + 'em_profile' + ' WHERE phoneNumber=? AND profileId=?;',
        data: [service.requestData.phoneNumber,isValidLoginQueryResult[0][0].profileId]
      };
      const isValidProfileResult = await database.executeSelect(isValidProfile);
      return callback(null, {
        profileId: isValidLoginQueryResult[0][0].profileId,
        vendorCustomerId: isValidProfileResult[0][0].vendorCustomerId,
        phoneNumber: isValidProfileResult[0][0].phoneNumber,
        firstName: isValidProfileResult[0][0].firstName,
        lastName: isValidProfileResult[0][0].lastName
      });
    }
  } catch (e) {
    log.error(e);
    return callback(responseUtils.getErrorResponse(require('util').inspect(e)));
  }
};

exports.createProfileFromVendorUser = async function (req, res) {
  var service = { requestData: [] };
  service = {
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
  var responseArray = [];
  try {
    for (var i = 0; i < service.requestData.length; i++) {
      var obj = {};
      obj["vendorCustomerId"] = service.requestData[i].vendorCustomerId ? service.requestData[i].vendorCustomerId : null;
      obj["firstName"] = service.requestData[i].firstName ? service.requestData[i].firstName : null;
      obj["lastName"] = service.requestData[i].lastName ? service.requestData[i].lastName : null;
      obj["middleName"] = service.requestData[i].middleName ? service.requestData[i].middleName : null;
      obj["phoneNumber"] = service.requestData[i].phoneNumber ? service.requestData[i].phoneNumber : null;
      obj["address1"] = service.requestData[i].address1 ? service.requestData[i].address1 : null;
      obj["address2"] = service.requestData[i].address2 ? service.requestData[i].address2 : null;
      obj["city"] = service.requestData[i].city ? service.requestData[i].city : null;
      obj["state"] = service.requestData[i].state ? service.requestData[i].state : null;
      obj["country"] = service.requestData[i].country ? service.requestData[i].country : null;
      obj["zip"] = service.requestData[i].zip ? service.requestData[i].zip : null;
      obj["createdBy"] = "/api/user/createProfileFromVendor";
      obj["createdDateTime"] = new Date();
      //For Vendor Code
      if (service.requestData[i].vendorCode) {
        // Get Vendor Code From Vendor Master 
        const getQuery = {
          sql: 'SELECT * FROM vendor_master WHERE vendorCode=?;',
          data: [service.requestData[i].vendorCode]
        };
        const getQueryResult = await database.executeSelect(getQuery);
        if (getQueryResult[0] && getQueryResult[0].length > 0) {
          const getPhoneQuery = {
            sql: 'SELECT * FROM em_profile WHERE phoneNumber=?;',
            data: [service.requestData[i].phoneNumber]
          };
          const getPhoneQueryResult = await database.executeSelect(getPhoneQuery);
          // Get Phone Number Used Or Not 
          if (getPhoneQueryResult[0] && getPhoneQueryResult[0].length > 0) {
            responseArray.push({ vendorCustomerId: service.requestData[i].vendorCustomerId, profileId: '', status: 500, message: "Phone Number Already Available" });
          } else {
            obj['vendorId'] = getQueryResult[0][0].vendorId;
            const profileQueryData = {
              tableName: "em_profile",
              data: obj
            };
            // Profile Creation
            console.log("getQueryResult[0][0]")
            console.log(getQueryResult[0][0])
            var profileIdArr = await database.insertToTable(profileQueryData);
            var profileId = profileIdArr[0];
            var phoneNumber = obj['phoneNumber'];
            // Invite URL Creation
            const inviteUrl = await exports.createInviteUrl();
            var loginObj = {
              phoneNumber: phoneNumber,
              profileId: profileId,
              vendorId: getQueryResult[0][0].vendorId,
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
            // Login Creation
            var loginIdArr = await database.insertToTable(loginQueryData);
            responseArray.push({ vendorCustomerId: service.requestData[i].vendorCustomerId, profileId: profileId, status: 200, message: "Profile Created and Invite URL Sent" });
          }
        }
        else {
          responseArray.push({ vendorCustomerId: service.requestData[i].vendorCustomerId, profileId: '', status: 500, message: "Vendor Data Not Available" });
        }
      } else {
        responseArray.push({ vendorCustomerId: service.requestData[i].vendorCustomerId, profileId: '', status: 500, message: "Vendor Code Not Available" });
      }
    }
    return callback(null, responseUtils.getResponse({ responseArray }, 'Bulk Profile Creation API Job Done', 'Bulk Profile Creation API Job Done'));
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
