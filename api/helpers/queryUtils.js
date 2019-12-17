'use strict';
exports.TABLES = {
  profile: {
    name: 'em_profile',
    columns: ['customerId', 'phoneNumber', 'firstName', 'lastName', 'address', 'city', 'country', 'state', 'zip', 'homeStoreNumber', 'createTs', 'modifyTs']
  },
  vendorProfileMapping: {
    name: 'em_vendor_link',
    columns: ['customerId', 'vendorCustomerId', 'vendorId']
  },
  login: {
    name: 'em_login',
    columns: ['customerId', 'phoneNumber', 'pin', 'inviteUrl', 'isActive', 'isFirstTime']
  },
  transaction: {
    name: 'em_transaction',
    columns: ['senderId', 'receiverId', 'amount', 'sendDateTime', 'paymentTypeId']
  }
};
exports.getRegistrationQuery = function() {
  return 'SELECT * FROM ' + exports.TABLES.REGISTRATION_TABLE + ' WHERE deviceId=?';
};

exports.getCheckUserQuery = function() {
  return 'SELECT * FROM ' + exports.TABLES.USER_DETAILS + ' WHERE referenceNumber=?';
};
