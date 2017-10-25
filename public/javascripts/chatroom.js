var socket = io();
socket.on("toAll",function(msg){
	sendMessage(msg,false);
})
	