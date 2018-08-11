var socket  = require( 'socket.io' );
var express = require('express');
var app     = express();
var server  = require('http').createServer(app);
var io      = socket.listen( server );
var port    = process.env.PORT || 3000;

// var app = require('express')();
// var http = require('http').Server(app);
// var io = require('socket.io')(http);
// var port = process.env.PORT || 3000;

io.on('connection', function(socket){
  console.log('connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  socket.on('chat message', function(msg){
    console.log(msg);
    io.emit('chat message', {
      from : msg.from,
      message : msg.message,
      time : msg.time,
      ip : msg.ip
    });
  });
});

server.listen(port, function(){
  console.log('listening on *:' + port);
});
