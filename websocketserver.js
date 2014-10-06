/**
 * Created by mbury on 10/6/2014.
 */

var clients = [];

var WebSocketServer = require('ws').Server,
    wss = new WebSocketServer({port: 8124});

function sendAll(message) {
    for (var i = 0; i < clients.length; i += 1) {
        clients[i].send(JSON.stringify({message: message}));
        console.log('send to ',clients[i]._sender._socket. _monotonicStartTime);
    }
}


wss.on('connection', function(ws) {
    console.log('server started');

    clients.push(ws);
    console.log(ws._sender._socket. _monotonicStartTime);

    ws.on('message', function(message) {
        console.log('received: %s', message);
        sendAll(message);
    });

    ws.send('something');
});