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
	/*alert(Number.isInteger(chatroomNumber));
	// TODO: Perform sanity checks
	if (chatroomNumber == null || chatroomNumber == NaN || chatroomNumber == "") {
		alert("Error: not a valid input");
		return;
	}*/

	// Join chatroom
	localStorage.setItem("queueType","2");
	localStorage.setItem("chatroomNumber", chatroomNumber);
	window.location.assign("chatroom.html");
}

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
