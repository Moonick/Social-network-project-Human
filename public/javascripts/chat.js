$(function () {
    function chat() {
        var socket = io.connect();
        var btnSend = $('#btn-chat');

        $.get("/user", function (data) {
            var senderFullName = data[0].fullName;
            var senderProfilePicture = data[0].profileImageUrl;
            var userId=data[0]._id;
            console.log(userId);
            btnSend.on('click', function (event) {
                event.preventDefault();
                var text = $("#btn-input-chat").val();
                var message = {
                    name: senderFullName,
                    picture: senderProfilePicture,
                    text: text,
                    senderId:userId,
                    receiverId:"some ID"
                }
                socket.emit('send message', message);
                $("#btn-input-chat").val("");
            });
            socket.on("new message", function (data) {
                var receiver = data.msg.receiverId;
                if (receiverId == userId) {
                    var chat = $("ul.chat").append("<p>" +data.msg.name+": "+data.msg.text + "</p>");
                }
            });
        });
    }

    chat();
});
