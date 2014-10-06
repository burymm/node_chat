/**
 * Created by mbury on 10/6/2014.
 */

var net = require('net');
var clients = {};

function sendToAll(data) {
    var i, sock;
    for (i in clients) {
        sock = clients[i];
        if (sock.writable) { // In case it closed while we are iterating.
            sock.write(JSON.stringify({client: i, message: data.message, user: data.user}));
        }
    }
}

var server = net.createServer(function(stream) { //'connection' listener
    console.log('Client connected');
    stream.on('end', function() {
        console.log('server disconnected');
    });
    stream.write('hello\r\n');
    stream.pipe(stream);

    stream.on('data', function(data) {
        var message = data.toString().substring(0, data.length-1)
        console.log(message);

        try {
            data = JSON.parse(data);
            if (data.option && (data.option = 'connection')) {
                clients[stream._peername.port].user = data.user;
            } else {
                sendToAll(data);
            }
        } catch (exception) {
            console.log('Error ', exception);
        }
    })
});
server.listen(8124, function() { //'listening' listener
    console.log('server bound');
});

server.on('data', function(data) {
});

server.on('connection', function(sock) {

    console.log('CONNECTED: ' + sock.remoteAddress +':'+ sock.remotePort);
    // other stuff is the same from here
    clients[sock.remotePort] = sock;
    /*console.log(clients);*/
});
