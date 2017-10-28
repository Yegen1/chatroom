var io = require("socket.io")();
var _ = require("underscore");
let cookieParser = require("cookie-parser");
let app = require("./app");

var userList = [];
var username;
io.on("connection",function(socket){
io.use(function(socket,next){
	console.dir(socket.request.headers.cookie.split(";"));
	var socket1 = socket.request.headers.cookie.split(";");
	var socket2 = socket1[0].split("=");
	username = socket2;
	
})
	socket.emit("login",username);
	socket.broadcast.emit("login",username);
	socket.on("login",function(user){
		console.log(user);
		console.log("1111111111");
		user.id = socket.id;
		userList.push(user);
		io.emit("userList",userList);
		socket.emit("userIn",user);
		socket.broadcast.emit("loginIn",user.name+"上线了");
	})
	socket.on("toAll",function(msg){
		io.emit("toAll",msg);
	})
//	socket.on("disconnect",function(){
//		//findWhere 找到userlist中所有匹配id:socked.id的选项；
//		var user = _.findWhere(userList,{id:socked.id});
//		if (user) {
//			//widthout 返回删除user之后的userlist;
//			userList = _.without(userList,user);
//			io.emit("userListUpdate",userList);
//			socket.broadcast.emit("loginIn",user.name + "下线了")
//		}
//	})
//	socket.on("toOne",function(msgObj){
//		var toOne = _.findWhere(io.sockets.sockets,{id:msgObj.to});
//		console.log(toOne);
//		toOne.emit("toOne",msgObj);
//	})
})
exports.listen = function(_server){
	io.listen(_server);
}
