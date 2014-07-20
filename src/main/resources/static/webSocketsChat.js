
var stompClient = null;

function setConnected(connected) {
	var x = $('#connect'); 
    $('#connect').prop('disabled', connected);
    $('#disconnect').prop('disabled', !connected);
    $('#response').empty();
}

function connect() {
    var socket = new SockJS('/hello');
    stompClient = Stomp.over(socket);            
    stompClient.connect({}, function(frame) {
        setConnected(true);
        console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/greetings', function(greeting){
            appendMessage(JSON.parse(greeting.body));
        });
    });
}

function disconnect() {
    stompClient.disconnect();
    setConnected(false);
    console.log("Disconnected");
}

function sendMessage() {
    stompClient.send("/app/hello", {}, JSON.stringify({ 'nick': $('#nick').val(), 'message' : $('#message').val() }));
    $('#message').val('');
}

function appendMessage(message) {
	$('#response').append('<div><strong>' + message.nick + ":</strong> " + message.message + '</div>');
}
