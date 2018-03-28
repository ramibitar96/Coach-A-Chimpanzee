
var socket = io.connect('http://localhost:3000');

socket.on('message_received', function(msg)
{
	// Put it in the chatbox
	let chatArea = document.getElementById("chatArea");
	chatArea.textContent += msg.sender + ": " + msg.contents + "\n";
});

function keypressHandle(e)
{
	// keycode 13 is 'enter'
	if (e.keyCode == 13)
		sendMessage();
}

function sendMessage()
{
	let inputText = document.getElementById("inputText");
	let chatArea = document.getElementById("chatArea");

	// Send the message
	let msg = inputText.value;

	socket.send(msg);
	inputText.value = "";

	// Make it appear in the chat area
	chatArea.textContent += "Me: " + msg + "\n";
}

