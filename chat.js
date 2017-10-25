var io = require("socket.io")();
var _ = require("underscore");
var useuList = [];
io.on("connection",function(socket){
	console.log("一个用户连接了");
	socket.on("toAll",function(msg){
		io.emit("toAll",msg);
	})
})
exports.listen = function(_server){
	io.listen(_server);
}
