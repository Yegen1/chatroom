var io = require("socket.io")();
var _ = require("underscore");
var userList = [];
io.on("connection",function(socket){
	console.log("一个用户连接了");
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
