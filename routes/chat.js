module.exports = function(io, db) {
    var express = require('express');
    var router = express.Router();
    var db = db;
    var messages = db.get('messages');

    io.on('connection', function(socket) {
        console.log("CONNECTED: %s");
        socket.on('send message', function(data) {
            messages.insert(data);
            console.log(data);
            io.sockets.emit('new message', { msg: data });
        });
        socket.on('disconnect', function(data) {
            console.log("One DISCONNECTED");
        });
    });
    return router;
};