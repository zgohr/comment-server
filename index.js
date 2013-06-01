var http = require('http');
var sock = require('sockjs').createServer();


var clients = {};

sock.on('connection', function(conn) {
  clients[conn.id] = conn;

  conn.on('data', function(message) {
    console.log(message);
    for (key in clients) {
      if (clients.hasOwnProperty(key)) {
        clients[key].write(message);
      }
    };
  });
  conn.on('close', function() {
    delete clients[conn.id];
  });
});


var server = http.createServer();

sock.installHandlers(server, {prefix: '/sock'});
server.listen(9999, '0.0.0.0');
