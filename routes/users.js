var express = require('express');
var router = express.Router();
let User = require("./../models/user");
var session = require("express-session");
var formidable = require("formidable");
var md5 = require("./../models/md5.js");
var path = require("path");
var fs = require("fs");
var gm = require("gm");
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post=("/register",function (req, res, next) {
//  //得到用户填写的东西
    var form = new formidable.IncomingForm();
//  form.parse(req, function (err, fields, files) {
//      //得到表单之后做的事情
//      var username = fields.username;
//      var password = fields.password;
//
//      //console.log(username,password);
//      //查询数据库中是不是有这个人
//      db.find("user", {"userName": username}, function (err, result) {
//          if (err) {
//              res.send("-3"); //服务器错误
//              return;
//          }
//          if (result.length != 0) {
//              res.send("-1"); //被占用
//              return;
//          }
//          //没有相同的人，就可以执行接下来的代码了：
//          //设置md5加密
//          password = md5(md5(password) + "考拉");
//
//          //现在可以证明，用户名没有被占用
//          db.insertOne("user", {
//              "userName": username,
//              "passPwd": password,
////              "avatar": "moren.jpg"
//          }, function (err, result) {
//              if (err) {
//                  res.send("-3"); //服务器错误
//                  return;
//              }
//              req.session.login = "1";
//              req.session.username = username;
//
//              res.send("1"); //注册成功，写入session
//          })
//      });
//  });
});
router.post("/login",function (req, res, next) {
    //得到用户表单
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        //得到表单之后做的事情
        var username = fields.username;
        var password = fields.password;
        var jiamihou = md5(md5(password) + "考拉");
        //查询数据库，看看有没有个这个人
        db.find("user", {"userName": username}, function (err, result) {
            if (err) {
                res.send("-5");
                return;
            }
            //没有这个人
            if (result.length == 0) {
                res.send("-1"); //用户名不存在
                return;
            }
            //有的话，进一步看看这个人的密码是否匹配
            if (jiamihou == result[0].password) {
                req.session.login = "1";
                req.session.username = username;
                res.send("1");  //登陆成功
                return;
            } else {
                res.send("-2");  //密码错误
                return;
            }
        });
    });
});
module.exports = router;
