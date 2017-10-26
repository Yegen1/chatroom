$("#sendMsg").on("click",function(){
	var msg = $("#msg").val();
	if (msg == "") {
		alert("请输入信息");
		return;
	}
	socket.emit("toAll",msg);
	$("#msg").val("");
});

function sendMessage(msg,isSelf){
	var msgType = isSelf ? "message-reply" : "message-receive";
	var msgHtml = $('<div><div class="message-info"><div class="user-info"><img src="/images/1.jpg" class="user-avatar img-thumbnail"></div><div class="message-content-box"><div class="arrow"></div><div class="message-content"></div></div></div></div>');
	msgHtml.addClass(msgType);
//	msgHtml.children('.message-info').children('.user-info').children('.user-avatar');
//	msgHtml.children('.message-info').children('.user-info').children('.user-avatar');
	msgHtml.children('.message-info').children('.message-content-box').children('.message-content').text(msg);
	$('.msg-content').append(msgHtml);
}
//$("").on("click",function(){
//	var name = $("").val();
//	if($("").val() == ""){
//		return;
//	}
//	var imgList = ["/images/1.jpg","/images/2.jpg","/images/3.jpg","/images/4.jpg"];
//	var headPortraitNum = parseInt(Math.random()*5);
//	var headPortrait = imgList[headPortraitNum];
//	var usermessage = {
//		name:name,
//		headPortrait:headPortrait
//	}
//	socket.emit("login",usermessage);
//})
$(".user-content").on("click",function(event){
	var target = event.target || event.srcElement;
	if (target.nodeName == "A") {
		console.dir(target);
		var username = target.childNodes[1].innerText;
		console.log(username);
		var message = $("#msg").val();
		if (!message) return;
		var msgObj = {
			to:toOneId,
			msg:message
		}
		socket.emit("toOne",msgObj);
		
	}
	
})
