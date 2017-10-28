var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	var username = req.cookies.username;

res.render('index', { title: 'Express' ,username:"欢迎您!"+username});

});

module.exports = router;
