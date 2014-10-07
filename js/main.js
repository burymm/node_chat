/**
 * Created by mbury on 10/6/2014.
 */

var connection = new WebSocket('ws://127.0.01:8124');


function addMessage(data) {
    var $chat = $('#chat'),
        $li = $('<li>');
    $li.text(data.user + ' ' + data.message);
    if (data.user == user) {
        $li.addClass('own');
    } else {
        $li.addClass('enemy');
    }
    $chat.prepend($li);
}

function sendMessage() {
    var $message = $('#message');
    connection.send(JSON.stringify({user: user, message: $message.val()}));
    $message.val('');
}


var user = 'user.' + Math.floor(Math.random() * 1000);


$(function () {
    $('#chat').html('');
    $('#user-name').html(user);




    connection.onopen = function () {
        connection.send(JSON.stringify({'user': user, option: 'connect'})); // Send the message 'Ping' to the server
    };

    connection.onmessage = function (data, flags) {


        try {
            var parsedData = JSON.parse(data.data);
            if (typeof parsedData == 'string') {
                parsedData = JSON.parse(parsedData);
            }
/*            console.log('received', parsedData);*/
            if (parsedData.option) {
                switch (parsedData.option) {
                    case 'connect':
                        parsedData.message = ' connected';
                    break;
                    case 'disconnect':
                        parsedData.message = ' disconnected.';
                    break;
                }
            }
            addMessage(parsedData);
        } catch (exception) {

        }


    };


    $('#send-message').on('click', sendMessage);

    $('#message').on('keypress', function(event) {
        if (event.which == 13) {
            sendMessage();
        }
    });
});