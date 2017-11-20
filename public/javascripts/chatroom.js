var socket = io();
socket.on("toAll", function(msg) {
  sendMessage(msg, true);
})
socket.on("strike", function(msg) {
  var cookie = document.cookie;
  var username = cookie.split("=")[1];
  if (username != msg) return;
  DelCookie(username);
  location.reload();
})
socket.on('sendImageToALL', function(msg) {
  addImgFromUser(msgObj, false);
})
socket.on("loginIn", function(msg) {
  $(".systemhint").fadeIn();
  var li = $(`<li class="hintLi">${msg}</li>`);
  li.addClass("hintLi");
  $(".systemhint").append(li);
  var t = setTimeout(function() {
    li.css({
      "opacity": "0"
    }).remove();
  }, 1500);
  window.clearTimeout(t2);
  var t2 = setTimeout(function() {
    $(".systemhint").fadeOut(300);
  }, 2000)
})
socket.on("userList", function(userList) {
  console.log(userList);
  addUser(userList);
})
socket.on("removeImg", function(msg) {
  var t = $(".message-content-box");
  console.log(msg);
  t.each(function(i) {
    if (($(this).data("time")) == msg) {
      console.log(1);
    }
  })
})
socket.on("toOne", function(msgObj) {
  sendMessage(msgobj, true);
})
socket.on("login", function(user) {
  msg = user.username;
  user = user.userList;
  addUser(removerepeat(user));
  socket.emit("loginIn", msg);
})
socket.on("removemessage", function(msg) {
  $(".message-content-box").each(function() {
    var time = $(this).data("time");
    console.log(time);
    console.log(msg);
    if (time == msg) {
      $(this).parent().parent().remove();
    }
  })

})

function removerepeat(arr) {
  var tmp = new Array;
  for (var i in arr) {
    if (tmp.indexOf(arr[i]) == -1) {
      tmp.push(arr[i]);
    }
  }
  return tmp;
}

function DelCookie(name) {
  var exp = new Date();
  exp.setTime(exp.getTime() - 1);
  var cval = name;
  document.cookie = "username" + "=" + cval + "; expires=" + exp.toGMTString();
}

function addImgFromUser(msgObj, isSelf) {
  var msgType = isSelf ? "message-reply" : "message-receive";
  var msgHtml = $('<div><div class="message-info"><span class="user-name">username</span><div class="user-info"><img src="/images/1.jpg" class="user-avatar img-thumbnail"></div><div class="message-content-box" date-time=""><div class="arrow"></div><div class="message-content">test</div></div></div></div>');
  msgHtml.addClass(msgType);
  var timestamp = (new Date()).valueOf();
  timestamp = timestamp + "";
  //	msgHtml.children('.message-info').children('.user-info').children('.user-avatar').attr('src',msgObj.from.img);
  //	msgHtml.children('.message-info').children('.user-info').children('.user-avatar').attr('title',msgObj.from.name);
  msgHtml.children('.message-info').children('.message-content-box').children('.message-content').html("<img src='" + msgObj.img + "'>");
  msgHtml.children('.message-info').children('.message-content-box').data("time", timestamp);
  msgHtml.children(".message-info").children(".user-name").text(msgObj.username);
  $('.msg-content').append(msgHtml);
  //滚动条一直在最底
  $(".msg-content").scrollTop($(".msg-content")[0].scrollHeight);
}