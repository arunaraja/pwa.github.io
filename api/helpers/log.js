'use strict';
var util = require('util');
var log4js = require('log4js');
var logger = log4js.getLogger();
logger.level = 'debug';
module.exports = {
  info: function (msg) {
    if (typeof msg === 'string') {
      logger.info(msg);
    } else {
      logger.info(JSON.stringify(msg, null, 4));
    }
  },
  error: function (msg) {
    msg = util.inspect(msg);
    if (typeof msg === 'string') {
      logger.error(msg);
    } else {
      logger.error(JSON.stringify(msg, null, 4));
    }
  },
  debug: function (msg) {
    if (typeof msg === 'string') {
      logger.debug(msg);
    } else {
      logger.debug(JSON.stringify(msg, null, 4));
    }
  }
};
