const express = require('express');
var cors = require('cors');
var database = require('./api/helpers/database');
console.log('Server initialization starts');
var port = process.env.PORT || 8090;
console.log('Server initialization starts on port '+port);
const app = express();
app.use(require('express-domain-middleware'));
console.log('Server middleware starts');
app.use(cors());
app.use(express.json());
console.log('Server routing starts');
require('./routes')(app);
database.initialize();
app.listen(port, () => {
    console.log('The application is running on port  ' + port);
});
console.log('Server listening on port '+port);
module.exports = app;

