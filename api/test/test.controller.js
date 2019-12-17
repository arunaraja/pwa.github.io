'use strict';

exports.testHit = function (req, res) {
  console.log("HITTED IN BACKEND")
  console.log("req.body")
  console.log(req.body)
  return res.json(200, {"message":"Success"});
};
exports.URLTSETS = function (req, res) {
	console.log("HITTED IN URLTSETS")
  return res.json(200, {"message":"URLTSETS"});
};


