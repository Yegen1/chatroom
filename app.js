var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
let fs = require("fs");

require("./db");
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")();
var session = require("express-session")
var index = require('./routes/index');
var users = require('./routes/users');
var _ = require("underscore");
var RedisStore = require("connect-redis")(session);

app.use(cookieParser());
app.use(function(req, res, next) {
  if (req.url === '/users/login' || req.url === '/users/register') {
    next();
  } else {
    if (!req.cookies.username) {
      //:TODO 无效
//    res.locals.message = common.errorMessage('当前操作需要需要');
      return res.redirect('/users/login');
      console.log("跳转到登录");
    } else {
      next();
    }
  }
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, '/public')));

app.use('/', index);
app.use('/users', users);

//判断是否登录

//app.use(session({
//		store:new RedisStore(options),
//  secret: 'keyboard cat',
//  resave: true,
//  saveUninitialized: true,
//  
//}));
app.get("/",function(res,req,next){
	console.log(cookies);
})
//app.use((req, res, next) => {
//if (req.url === '/users/login' || req.url === '/users/register' || req.url === '/questions') {
//  next();
//} else {
//  if (!req.session.username) {
//    //:TODO 无效
//    res.locals.message = common.errorMessage('当前操作需要需要');
//    console.log(res);
//    return res.redirect('/users/login');
//  } else {
//    next();
//  }
//}
//});
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

//使用session


// error handler

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//var currentUserCount = 0;
//var socketList = [];

module.exports = app;
