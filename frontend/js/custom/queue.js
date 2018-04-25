// Testing
var socket = io.connect('http://localhost:3000');

function queueStudent() {
	localStorage.setItem("queueType","0");
	window.location.assign("chatroom.html");
}

function queueCoach() {
	localStorage.setItem("queueType","1");
	window.location.assign("chatroom.html");
}

function enterChatroom() {
	var chatroomNumber = prompt("Enter a chatroom number");

	// Join chatroom
	localStorage.setItem("queueType","2");
	localStorage.setItem("chatroomNumber", chatroomNumber);
	window.location.assign("chatroom.html");
}

function createAMA() {
	localStorage.setItem("queueType","3");
	window.location.assign("chatroom.html");
}

function amaList() {
	socket.emit('request_amas');
}

socket.on('ama_list', function(msg)
{
	alert(msg);
});

function getCookie(cname) {
	var name = cname + "=";
	var ca = document.cookie.split(';');
	for(var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}
$(".user").text(getCookie("session_token"));
