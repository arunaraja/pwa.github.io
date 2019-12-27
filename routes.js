const express = require('express');

module.exports = function(app) {
app.use( '/api/user', require( './api/user') );
app.use( '/api/transaction', require( './api/transaction') );
app.use( '/api/wallet', require( './api/wallet') );
app.use( '/api/utility', require( './api/utility') );
app.use( '/api/vendor', require( './api/vendor') );
}

