var express = require('express');
var router = express.Router();
let User = require("./../models/user");
let chatMessage = require("./../models/allchatmessage");
var formidable = require("formidable");
var md5 = require("./../models/md5.js");
var path = require("path");
var fs = require("fs");
var gm = require("gm");
let cookieParser = require("cookie-parser");

var chatusername;
router.use(cookieParser());
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get("/register", function(req, res, next) {
  res.render("regist", {});
})
router.post("/register", function(req, res, next) {
  //得到用户填写的东西
  let {
    username,
    password
  } = req.body;

  //		console.log(username,password);
  //查询数据库中是不是有这个人
  User.findOne({
    "userName": username
  }, function(err, result) {
    //      	console.log(result);
    if (err) {
      res.send("服务器错误"); //服务器错误
      return;
    }
    if (result) {
      res.send("用户名被使用"); //被占用
      //              console.log("-1");
      return;
    }
    //没有相同的人，就可以执行接下来的代码了：
    //设置md5加密
    password = md5(md5(password) + "11");

    //现在可以证明，用户名没有被占用
    User.create({
      userName: username,
      userPwd: password
    }, (err, doc) => {
      if (err) {
        return res.render("user/register");
      }
      if (doc) {
        res.locals.message = "注册成功";
      }
      return res.redirect("./login");
    })
  });
});
router.get("/login", function(req, res, next) {
  res.render("login", {});
})
router.post("/login", function(req, res, next) {
  //得到用户表单
  let {
    username,
    password
  } = req.body;
  chatusername = username;

  //		console.log(username,password);
  //得到表单之后做的事情
  password = md5(md5(password) + "11");
  //查询数据库，看看有没有个这个人
  User.findOne({
    "userName": username
  }, function(err, result) {
    if (err) {
      console.log("服务器错误");
      return;
    }
    //没有这个人
    if (result == null) {
      console.log("-1"); //用户名不存在
      return;
    }
    //有的话，进一步看看这个人的密码是否匹配
    if (password == result.userPwd) {
      //              req.session.login = "1";
      res.cookie("username", username, {
        maxAge: 1000 * 60 * 30
      });
      console.log(req.cookies.username);
      return res.redirect("../"); //登陆成功
    } else {
      console.log("密码错误") //密码错误
      return;
    }
  });
});
router.post("/toall", function(req, res, next) {
  let msg = req.body.msg;
  console.log(msg);
  let nowtime = req.body.nowtime;
  var chatusername = req.cookies.username;
  let messageclass = req.body.messageclass;
  chatMessage.create({
    message: msg,
    username: chatusername,
    nowtime: nowtime,
    messageclass: messageclass
  }, (err, doc) => {
    if (err) {
      console.log("上传到服务器失败");
      return;
    }
    if (doc) {
      console.log("上传到服务器成功");
    }
  })

})
router.get("/historymessage", function(req, res, next) {
  chatusername = req.cookies.username;
  console.log(chatusername);
  chatMessage.find(function(err, docs) {
    if (err) {
      console.log("查找错误");
    }
    if (docs) {
      return res.json({
        status: "success",
        code: "1001",
        result: {
          message: docs,
          username: chatusername
        }
      })
    }
  })
})
router.post("/removemessage", function(req, res, next) {
  let nowtime = req.body.nowtime;
  console.log(nowtime);
  chatMessage.remove({
    nowtime: nowtime
  }, function(err) {
    if (err) {
      console.log("删除错误");
      return;
    }
    return res.json({
      status: "删除成功"
    })
  })
})
router.get("/newregister", function(req, res, next) {
  res.render("register");
})
module.exports = router;