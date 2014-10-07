/**
 * Created by mbury on 10/6/2014.
 */

var clients = [];

var WebSocketServer = require('ws').Server,
    wss = new WebSocketServer({port: 8124});

process.stdout.write("\u001b[2J\u001b[0;0H"); // clear console

function sendAll(data) {
    for (var i = 0; i < clients.length; i += 1) {
        try {
            clients[i].send(JSON.stringify(data));
        } catch (expection) {
            if (expection == 'Error: not opened') {
                var user = clients[i].user;
                clients.splice(i, 1);
                sendAll(JSON.stringify({user: user, option: 'disconnect'}));
            }
        }
    }
}


wss.on('connection', function(ws) {
    console.log('server started');
    clients.push(ws);
    ws.on('message', function(data) {
        try {
            console.log('received: %s', data);
            var data = JSON.parse(data);
            sendAll(data);
            if (data.option == 'connect') {
                this.user = data.user;
                console.log(this.user, data.message);
            }
        } catch (exception) {
            console.log(exception);
        }
    });
});