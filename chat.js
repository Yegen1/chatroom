var io = require("socket.io")();
var _ = require("underscore");
let cookieParser = require("cookie-parser");
let app = require("./app");

var userList = [];
var username;
var tmp;
var userObj;
io.on("connection", function(socket) {

  //io.use(function(socket,next){
  //	var socket1 = socket.request.headers.cookie.split(";");
  //	var socket2 = socket1[0].split("=");
  //	username = socket2[1];
  //	userList.push(username);

  //	tmp = new Array;
  //	for (var i in userList) {
  //		if (tmp.indexOf(userList[i]) == -1) {
  //			tmp.push(userList[i]);
  //		}
  //	}
  //	var msg = username+"上线了";
  //	userObj = {
  //		userList:tmp,
  //		username:msg,
  //	}
  //	next();
  //})
  socket.on("strike", function(msg) {
    io.emit("strike", msg);
    userList = _.without(userList, msg);
    var msg = msg + "下线了";
    var userObj = {
      userList: userList,
      username: msg,
    }
    socket.broadcast.emit("login", userObj);
  })
  socket.on("login", function(msg) {
    userList.push(msg);
    msg = msg + "上线了";
    username = msg;
    userObj = {
      userList: userList,
      username: msg
    }
    socket.broadcast.emit("login", userObj);
  });

  socket.on("toAll", function(msg) {
    io.emit("toAll", msg);
  })
  socket.on('sendImageToALL', function(msg) {
    socket.broadcast.emit('sendImageToALL', msg);
  })
  socket.on("removemessage", function(msg) {
    io.emit("removemessage", msg);
  })
  socket.on("disconnect", function() {
    userList = _.without(userList, username);
    var msg = username + "下线了";
    var userObj = {
      userList: userList,
      username: msg,
    }
    socket.broadcast.emit("login", userObj);
  })
  socket.on("loginIn", function(msg) {
    io.emit("loginIn", msg);
  })
})
exports.listen = function(_server) {
  io.listen(_server);
}