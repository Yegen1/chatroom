var messname = $("#spanuser").text().substring(4);
$("#sendMsg").on("touchstart", function() {
  var msg = $("#msg").val();
  if (msg == "") {
    $("#msg").placeholder = "请输入信息";
    return;
  }
  var timestamp = (new Date()).valueOf();
  timestamp = timestamp + "";
  socket.emit("toAll", msg + "=" + timestamp);
  $.post("http://localhost:3000/users/toall", {
    msg: msg,
    nowtime: timestamp
  }, function(json) {
    showMessage(msg, true);
  });
  $("#msg").val("");
});

function sendMessage(msg1, isSelf) {
  console.log(msg1);
  var msg = msg1.split("=")[0];
  var timestamp = msg1.split("=")[1];
  console.log(timestamp);
  var msgType = isSelf ? "message-reply" : "message-receive";
  var msgHtml = $('<div><div class="message-info"><span class="user-name">username</span><div class="user-info"><img src="/images/1.jpg" class="user-avatar img-thumbnail"></div><div class="message-content-box" data-time=""><div class="arrow"></div><div class="message-content"></div></div></div></div>');
  msgHtml.addClass(msgType);
  //	msgHtml.children('.message-info').children('.user-info').children('.user-avatar');
  msgHtml.children('.message-info').children('.user-name').text(messname);
  msgHtml.children('.message-info').children('.message-content-box').children('.message-content').text(msg);
  msgHtml.children('.message-info').children('.message-content-box').data("time", timestamp);
  $('.msg-content').append(msgHtml);
}
$(".user-content").on("touchstart", function(event) {
  var target = event.target || event.srcElement;
  if (target.nodeName == "A") {
    var username = target.childNodes[1].innerText;
    console.log(username);
    var message = $("#msg").val();
    if (!message) return;
    var msgObj = {
      to: toOneId,
      msg: message
    }
    socket.emit("toOne", msgObj);
  }
})
$("#loadmore").on("touchstart", function() {
  $.get("http://localhost:3000/users/historymessage", {}, function(json) {
    console.log(json);
    var message = json.result.message;
    var yourself = json.result.username;
    for (var i = 0; i < message.length; i++) {
      var chatmessage = message[i].message;
      var messagename = message[i].username;
      var nowtime = message[i].nowtime;
      console.log(messagename);
      if (yourself == messagename) {
        showMessage(chatmessage + "=" + nowtime + "=" + messagename, true);
      } else {
        showMessage(chatmessage + "=" + nowtime + "=" + messagename, false);
      }
    }
  });
})

function showMessage(msg1, isSelf) {
  console.log(msg1);
  var msg = msg1.split("=")[0];
  var timestamp = msg1.split("=")[1];
  var messname = msg1.split('=')[2];
  console.log(timestamp);
  var msgType = isSelf ? "message-reply" : "message-receive";
  var msgHtml = $('<div><div class="message-info"><span class="user-name">username</span><div class="user-info"><img src="/images/1.jpg" class="user-avatar img-thumbnail"></div><div class="message-content-box" data-time=""><div class="arrow"></div><div class="message-content"></div></div></div></div>');
  msgHtml.addClass(msgType);
  //	msgHtml.children('.message-info').children('.user-info').children('.user-avatar');
  msgHtml.children('.message-info').children('.user-name').text(messname);
  msgHtml.children('.message-info').children('.message-content-box').children('.message-content').text(msg);
  msgHtml.children('.message-info').children('.message-content-box').data("time", timestamp);
  $('.msg-content').append(msgHtml);
}
$(".msg-content").on("touchstart", function(event) {
  event = event || window.event;
  var target = event.target;
  var nowtime;
  if (target.className == "message-content-box") {
    nowtime = $(target).data("time");
    socket.emit("removemessage", nowtime);
    $(target).parent().parent().remove();

  } else if (target.className == "message-content") {
    nowtime = $(target).parent().data("time");
    $(target).parent().parent().parent().remove();
    socket.emit("removemessage", nowtime);
  } else if (target.nodeName == "IMG") {
    var time = $(target).parent().parent().data("time");
    socket.emit("removemessage", time);
    return;
  } else {
    return;
  }
  var t = setTimeout(function() {
    $.post("http://localhost:3000/users/removemessage", {
      nowtime: nowtime
    }, function(json) {
      console.log(json);
    })
  }, 10);

})

function addUser(userList) {
  var parentUl = $('.user-content').children('ul');
  var cloneLi = parentUl.children('li:first').clone();
  parentUl.html('');
  parentUl.append(cloneLi);
  for (var i in userList) {
    var cloneLi = parentUl.children('li:first').clone();
    //		cloneLi.children('a').attr('href',"javascript:showSetMsgToOne('"+userList[i].name+"','"+userList[i].id+"');");
    //		cloneLi.children('a').children('img').attr('src',userList[i].img);
    cloneLi.children('a').children('span').text(userList[i]);
    cloneLi.show();
    parentUl.append(cloneLi);
  }
}
$(".chatpartner").on("touchstart", function(event) {
  var event = event || window.event;
  var target = event.target;
  //	var box = document.querySelector(".chatpartner");
  //	let style = window.getComputedStyle(box,null);
  if (target.className == "removeuser") {
    var msg = $(target).parent().children("span").text();
    socket.emit("strike", msg);
  }
})
$('#sendImage').change(function() {
  if (this.files.length != 0) {
    var file = this.files[0];
    reader = new FileReader();
    if (!reader) {
      return;
    }
    reader.onload = function(e) {
      var msgObj = {
        from: false,
        img: e.target.result,
        username: messname
      };
      socket.emit('sendImageToALL', msgObj);
      addImgFromUser(msgObj, true);
    };
    reader.readAsDataURL(file);
  }
});
$("#member").on("touchstart", function() {
  console.log(1)
  $(".chatpartner").css({
    "transform": "translateX(0)"
  });
})
$(".glyphicon-user").on("touchstart", function() {
  $(".chatpartner").css({
    "transform": "translateX(-110%)"
  })
})
$(".msg-content").on("touchstart", function(e) {
  var target = e.target;
  if (target.className == "msg-list-body msg-content") {
    $(".chatpartner").css({
      "transform": "translateX(-110%)"
    })
  }
})
window.onload = function() {
  var msg = $("#spanuser").text().substring(4);
  socket.emit("login", msg);
}