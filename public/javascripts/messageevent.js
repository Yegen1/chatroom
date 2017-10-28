$("#sendMsg").on("click",function(){
	var msg = $("#msg").val();
	if (msg == "") {
		$("#msg").placeholder = "请输入信息";
		return;
	}
	var timestamp =(new Date()).valueOf();
	timestamp = timestamp + "";
	socket.emit("toAll",msg+"="+timestamp);
	$.post("http://localhost:3000/users/toall",{msg:msg,nowtime:timestamp},function(json){
		console.log(1);
	});
	$("#msg").val("");
});

function sendMessage(msg1,isSelf){
	var msg = msg1.split("=")[0];
	var timestamp = msg1.split("=")[1];
	console.log(timestamp);
	var msgType = isSelf ? "message-reply" : "message-receive";
	var msgHtml = $('<div><div class="message-info"><div class="user-info"><img src="/images/1.jpg" class="user-avatar img-thumbnail"></div><div class="message-content-box" data-time=""><div class="arrow"></div><div class="message-content"></div></div></div></div>');
	msgHtml.addClass(msgType);
//	msgHtml.children('.message-info').children('.user-info').children('.user-avatar');
//	msgHtml.children('.message-info').children('.user-info').children('.user-avatar');
	msgHtml.children('.message-info').children('.message-content-box').children('.message-content').text(msg);
	msgHtml.children('.message-info').children('.message-content-box').data("time",timestamp);
	$('.msg-content').append(msgHtml);
}
$(".user-content").on("click",function(event){
	var target = event.target || event.srcElement;
	if (target.nodeName == "A") {
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
$("#loadmore").on("click",function(){
	$.get("http://localhost:3000/users/historymessage",{},function(json){
		console.log(json);
		var message = json.result.message;
		var yourself = json.result.username;
		console.log(yourself);
		for (var i = 0 ; i < message.length ; i++) {
			var chatmessage = message[i].message;
			var messagename = message[i].username;
			var nowtime = message[i].nowtime;
			console.log(messagename);
			if (yourself == messagename) {
				showMessage(chatmessage+"="+nowtime,true);
			}else{
				showMessage(chatmessage+"="+nowtime,false);
			}
		}
		$("#loadmore").css({"display":"none"});
	});
})
function showMessage(msg1,isSelf){
	var msg = msg1.split("=")[0];
	var timestamp = msg1.split("=")[1];
	console.log(timestamp);
	var msgType = isSelf ? "message-reply" : "message-receive";
	var msgHtml = $('<div><div class="message-info"><div class="user-info"><img src="/images/1.jpg" class="user-avatar img-thumbnail"></div><div class="message-content-box" data-time=""><div class="arrow"></div><div class="message-content"></div></div></div></div>');
	msgHtml.addClass(msgType);
//	msgHtml.children('.message-info').children('.user-info').children('.user-avatar');
//	msgHtml.children('.message-info').children('.user-info').children('.user-avatar');
	msgHtml.children('.message-info').children('.message-content-box').children('.message-content').text(msg);
	msgHtml.children('.message-info').children('.message-content-box').data("time",timestamp);
	$('.msg-content').append(msgHtml);
}
$(".msg-content").on("click",function(event){
	event = event || window.event;
	var target = event.target;
	console.dir(target);
	var nowtime;
	if (target.className == "message-content-box") {
		nowtime = $(target).data("time");
		$(target).parent().parent().remove();
		
	}else if (target.className == "message-content") {
		nowtime = $(target).parent().data("time");
		$(target).parent().parent().parent().remove();
	}else{
		return;
	}
	$.post("http://localhost:3000/users/removemessage",{nowtime:nowtime},function(json){
		console.log(json);
	})
	
})

function addUser(userList){
	var parentUl = $('.user-content').children('ul');
	var cloneLi = parentUl.children('li:first').clone();
	parentUl.html('');
	parentUl.append(cloneLi);
	for(var i in userList){
		var cloneLi = parentUl.children('li:first').clone();
		cloneLi.children('a').attr('href',"javascript:showSetMsgToOne('"+userList[i].name+"','"+userList[i].id+"');");
		cloneLi.children('a').children('img').attr('src',userList[i].img);
		cloneLi.children('a').children('span').text(userList[i].name);
		cloneLi.show();
		parentUl.append(cloneLi);
	}
}