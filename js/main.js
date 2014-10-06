/**
 * Created by mbury on 10/6/2014.
 */

function addMessage(message) {
    var $chat = $('#chat'),
        $li = $('<li>');
    $li.text(message);
    $chat.prepend($li);
}



$(function () {
    $('#chat').html('');

    var connection = new WebSocket('ws://127.0.01:8124');

    connection.onopen = function () {
        connection.send('Ping'); // Send the message 'Ping' to the server
    };

    connection.onmessage = function (data, flags) {
        var parsedData = JSON.parse(data.data)
        console.log('received', parsedData.message, flags);
        addMessage(parsedData.message);
    };


    $('#send-message').on('click', function() {
        connection.send($('#message').val());
    });
});