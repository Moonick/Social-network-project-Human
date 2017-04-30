$(function() {
    function chat() {
        var socket = io.connect();
        var btnSend = $('#btn-chat');

        $.get("/user", function(data) {
            var senderFullName = data[0].fullName;

            var senderProfilePicture = data[0].profileImageUrl;
            var userId = data[0]._id;

            btnSend.on('click', function(event) {
                event.preventDefault();
                var text = $("#btn-input-chat").val();
                var friendId = btnSend.attr('data-friendId');
                var friendName = btnSend.attr('data-friendName');
                if (friendId) {
                    var message = {
                        name: senderFullName,
                        picture: senderProfilePicture,
                        text: text,
                        senderId: userId,
                        receiverId: friendId,
                        date: new Date().toLocaleString()
                    }
                    socket.emit('send message', message);
                }

                $("#btn-input-chat").val("");
            });
            socket.on("new message", function(data) {
                var receiver = data.msg.receiverId;
                var sender = data.msg.senderId;
                if (receiver == userId || sender == userId) {
                    var chat = $("ul.chat").append(" <li class='left clearfix'><strong>" + data.msg.name + "</strong>: " + data.msg.text + "</li>");
                }
            });
        });
    }

    chat();
});