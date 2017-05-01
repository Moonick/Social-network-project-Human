$(function() {
    function chat() {
        var socket = io.connect();

        var btnSend = $('.btn-chat');
        var escapeHTML = function(unsafe) {
            return unsafe.replace(/[&<"']/g, function(m) {
                switch (m) {
                    case '&':
                        return '&amp;';
                    case '<':
                        return '&lt;';
                    case '"':
                        return '&quot;';
                    default:
                        return '&#039;';
                }
            });
        };

        $.get("/user", function(data) {
            var senderFullName = data[0].fullName;
            var senderProfilePicture = data[0].profileImageUrl;
            var userId = data[0]._id;

            btnSend.on('click', function(event) {
                console.log("here");
                event.preventDefault();
                var text = $("#btn-input-chat").val();
                var text = escapeHTML(text);
                var friendId = btnSend.attr('data-friendId');
                var friendName = btnSend.attr('data-friendName');
                if (friendId && text) {
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
            var chat;
            socket.on("new message", function(data) {
                var receiver = data.msg.receiverId;
                var sender = data.msg.senderId;
                if (receiver == userId) {
                    chat = $("ul.chat").append("<div class='listWithMessages'><li class='left clearfix'><strong>" +
                        data.msg.name + "</strong>: " + data.msg.text + "</li></div>");
                    $("#chatDivScroll").scrollTop($("#chatDivScroll")[0].scrollHeight);

                } else if (sender == userId) {
                    chat = $("ul.chat").append("<div class='listWithMessages'><li class='left clearfix'><strong class='redText'>" +
                        data.msg.name + "</strong>: " + data.msg.text + "</li></div>");
                    $("#chatDivScroll").scrollTop($("#chatDivScroll")[0].scrollHeight);
                }
            });
        });
    }
    chat();
});