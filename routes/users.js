var express = require('express');
var router = express.Router();
var session = require("express-session");
var io = require("socket.io")();
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get("/check",function(req,res,next){
	var userName = req.query.userName;
	if (!userName) {
		res.send("请登录");
		return;
	}
	if (alluser.indexOf(userName) !=-1) {
		res.send("用户名已被占用")
		return;
	}
	alluser.push(userName);
	req.session.userName = userName;
})
module.exports = router;
