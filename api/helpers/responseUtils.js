'use strict';

exports.getDbErrorResponse = function (error) {
  return {
   
    response: {
      status: 500,
      userMessage: error,
      internalMessage: 'DATABASE_ERROR'
    }
  };
};

exports.getErrorResponse = function (internalMessage, userMessage) {
  return {
    
    response: {
      status: 500,
      userMessage: userMessage,
      internalMessage: internalMessage
    }
  };
};

exports.getResponse = function (data, internalMessage, userMessage) {
  return {
    response: {
      status: 200,
      data: data,
      userMessage: userMessage,
      internalMessage: internalMessage
    }
  };
};

exports.getSuccessResponse = function (internalMessage, userMessage) {
  return {
    
    response: {
      status: 200,
      userMessage: userMessage,
      internalMessage: internalMessage
    }
  };
};

exports.getOtherResponse = function (internalMessage, userMessage) {
  return {
    
    response: {
      status: 200,
      userMessage: userMessage,
      internalMessage: internalMessage
    }
  };
};

exports.sendResponse = function (data, res) {
  res.status = data.status;
  res.json(data.response);
};
