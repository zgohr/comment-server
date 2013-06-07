var http = require('http');
var sock = require('sockjs').createServer();


var clients = {};

sock.on('connection', function(conn) {
  clients[conn.id] = conn;

  conn.on('data', function(message) {
    for (var key in clients) {
      if (clients.hasOwnProperty(key) && key !== conn.id) {
        clients[key].write(message);
      }
    }
  });
  conn.on('close', function() {
    delete clients[conn.id];
  });
});


var server = http.createServer();

//sock.installHandlers(server, {prefix: '/sock'});
sock.installHandlers(server);
server.listen(9999, '0.0.0.0');
