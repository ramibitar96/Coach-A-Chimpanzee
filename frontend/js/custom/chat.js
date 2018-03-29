//user type
var type = localStorage.getItem("queueType");

var socket = io.connect('http://localhost:3000');

//send queue type
socket.emit("queueType", type);

socket.on('message_received', function(msg)
{
	// Put it in the chatbox
	let chatArea = document.getElementById("chatArea");
	chatArea.textContent += msg.sender + ": " + msg.contents + "\n";
});

socket.on('match_found', function(msg)
{
	// Put it in the chatbox
	let chatArea = document.getElementById("chatArea");
	chatArea.textContent = "MATCH FOUND\n";
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

function submitReview() {
	//clear localstorage
	localStorage.removeItem("queueType");
	socket.emit("end_chat", "end_chat");
	
	//submit review
	var rating = $('input[name="rating"]:checked').val();	
	if (rating == null) {
		rating = 3;
	}

	var review = $("#review_txt").val();

	//clean input if all spaces
	if (review.trim() == '') {
		review = "";
	}
	review = review.replace(/"/g, "'");

	var body =
		"{" +
		'"rating":' + rating + ',' +
		'"text":"' + review + '"' +
		"}";

	alert(body);
	/*
	$.ajax({
			type: "POST",
			url: "http://localhost:3000/add_review",
			contentType: 'application/json',
			processData: false,
			async: false,
			data: body,
			success: function (data){
				var response = data;
				if (response["error_code"] == 0) {
					window.location.assign("queue.html");
				}
			}
	});
	*/
	window.location.assign("queue.html");
}
