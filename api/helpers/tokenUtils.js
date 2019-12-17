var jwt = require('jsonwebtoken');

exports.getToken = function (data) {
  return new Promise(function (resolve, reject) {
    jwt.sign(data, 'secret', function (err, token) {
      if (err) {
        throw err;
      } else {
        resolve(token);
      }
    });
  });
};

exports.decodeToken = function (token) {
  return new Promise(function (resolve, reject) {
    jwt.verify(token, 'secret', function (err, decoded) {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });
};
