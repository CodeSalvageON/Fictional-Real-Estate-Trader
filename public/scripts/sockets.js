$(function () {
  var socket = io();

  $("#chat-form").submit(function(event) {
    event.preventDefault();

    socket.emit("chat-message", $("#message-box").val());
    $("#message-box").val("");
    
    return false;
  });
});