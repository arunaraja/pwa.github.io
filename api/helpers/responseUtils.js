'use strict';

exports.getDbErrorResponse = function (error) {
  return {
    status: 500,
    response: {
      userMessage: error,
      internalMessage: 'DATABASE_ERROR'
    }
  };
};

exports.getErrorResponse = function (internalMessage, userMessage) {
  return {
    status: 500,
    response: {
      userMessage: userMessage,
      internalMessage: internalMessage
    }
  };
};

exports.getResponse = function (data, internalMessage, userMessage) {
  return {
    status: 200,
    response: {
      data: data,
      userMessage: userMessage,
      internalMessage: internalMessage
    }
  };
};

exports.getSuccessResponse = function (internalMessage, userMessage) {
  return {
    status: 200,
    response: {
      userMessage: userMessage,
      internalMessage: internalMessage
    }
  };
};

exports.getOtherResponse = function (internalMessage, userMessage) {
  return {
    status: 200,
    response: {
      userMessage: userMessage,
      internalMessage: internalMessage
    }
  };
};

exports.sendResponse = function (data, res) {
  res.status = data.status;
  res.json(data.response);
};
