var io = require("socket.io")();
var _ = require("underscore");
var userList = [];
let cookieParser = require("cookie-parser");
let app = require("./app");

io.on("connection",function(socket){
//app.use(function(req,res,next){
//})
io.use(function(socket,next){
	console.log(socket.request.headers.cookie);
})
//console.log(req.cookies.username);
//	$.post(http:localhost:3000/users/login,{},function(){
//		
//	}
//	console.log(sessionStorage.username);
//	socket.on("login",function(user){
//		console.log(user);
//		user.id = socket.id;
//		userList.push(user);
//		io.emit("userInfo",user);
//		socket.broadcast.emit("loginIn",user.name+"上线了");
//	})
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
