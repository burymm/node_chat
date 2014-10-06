/**
 * Created by mbury on 10/6/2014.
 */

var sys = require("sys");

var stdin = process.openStdin();

var user = 'user' + Math.floor(Math.random() * 1000);

stdin.addListener("data", function(data) {
    // note:  d is an object, and when converted to a string it will
    // end with a linefeed.  so we (rather crudely) account for that
    // with toString() and then substring()
        client.write(JSON.stringify({message: data.toString().substring(0, data.length-1), user: user}));
});



var net = require('net');
var client = net.connect({port: 8124},
    function() { //'connect' listener
        console.log('Client ' + user  + ' connected'/*, client*/);
        client.write(JSON.stringify({'user': user, option: 'connection'}));
    });
client.on('data', function(data) {

    if (data) {
        try {
            data = JSON.parse(data);
            /*console.log(data.user, user, !data.user == user, data.message);*/
            if (!(data.user == user)) {
                console.log(data.user + ' said ' + data.message);
            }
        } catch (exception) {

        }

    }
/*    client.end();*/
});
client.on('end', function() {
    console.log('client disconnected');
});
