var io = require("socket.io")();
var _ = require("underscore");
var useuList = [];
io.on("connection",function(socket){
	socket.io("login",function(user){
		user.id = socket.id;
		userList = push(user);
		io.emit("userList",userList);
		socket.emit("userInfo",user);
		socket.broadcast.emit("loginInfo",user.name+"上线了");
	})
})
exports.listen = function(_server){
	io.listen(_server);
}
