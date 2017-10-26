var socket = io();
socket.on("toAll",function(msg){
	sendMessage(msg,false);
})
//socket.on("loginIn",function(msg){
//	$(".systemhint").css({"display":"block"});
//	var Li = `<li>${msg}</li>`
//	$(".systemhint")[0].innerHTML +=Li;
//	setTimeout(function(){
//		$(".systemhint").css({"display":"none"});
//	},2000)
//})
socket.on("toOne",function(msgObj){
	sendMessage(msgobj,true);
})
