var io  = require('socket.io').listen(8080);


io.sockets.on('connection', function(socket) {
  socket.on('comment', function(data) {
    console.log('New comment: ' + data.serialized);
    socket.broadcast.emit('add-comment', data);
  });
});
