module.exports = function(io, db) {
    var express = require('express');
    var router = express.Router();
    var db = db;
    var messages = db.get('messages');

    io.on('connection', function(socket) {
        socket.on('send message', function(data) {
            data.date=new Date();
            messages.insert(data);
            io.sockets.emit('new message', { msg: data });
        });
        socket.on('disconnect', function(data) {
            
        });
    });
    return router;
};