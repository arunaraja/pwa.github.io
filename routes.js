const express = require('express');

module.exports = function(app) {

app.use( '/api/user', require( './api/user') );

}

