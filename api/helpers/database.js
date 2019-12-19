'use strict';

var _ = require('lodash');
var client;
var log = require('./log');

exports.initialize = async function () {
  log.info('Initializing database');
  client = require('knex')({
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      user: 'root',
      password: 'Admin@123',
      database: 'enviamejor_db'
    }
  });
  return client.raw('SELECT 1 as dbIsUp;');
};

exports.executeSelect = async function (query) {
  return client.raw(query.sql, query.data);
};

exports.insertToTable = async function (query) {
    return client(query.tableName).insert(query.data).returning('*')
    .catch((err) => { console.log(err); return {err:err.sqlMessage,code:500} })
};

exports.updateTable = async function (query) {
  return client(query.tableName).update(query.data);
};
