//user type
var type = localStorage.getItem("queueType");
var chatroomNumber = localStorage.getItem("chatroomNumber");

var socket = io.connect('http://localhost:3000');

var writeReview = false;
var log = "";

//send queue type
if (type == 2) {
	let msgObj =
    {
        type: type,
        chatroomNumber: chatroomNumber
    };

    socket.emit("queueType", msgObj);
} else {
	socket.emit("queueType", type);
}

socket.on('message_received', function(msg)
{
	document.getElementById('alert').play();
	var msg = msg.sender + ": " + msg.contents + "\n";
	// Put it in the chatbox
	let chatArea = document.getElementById("chatArea");
	chatArea.textContent += msg;
	log += msg;
});

socket.on('match_found', function(msg)
{
	// Put it in the chatbox
	let chatArea = document.getElementById("chatArea");
	chatArea.textContent = "MATCH FOUND\n";
	writeReview = true;
});

socket.on('rejoin_chat', function(msg)
{
	// Fill chat box with previously sent messages
	let chatArea = document.getElementById("chatArea");
	chatArea.textContent = msg;
	writeReview = true;
});

socket.on('end_chat', function(msg)
{
	let chatArea = document.getElementById("chatArea");
	chatArea.textContent += "CHAT ENDED\n";
	//simulate end chat click
	$('#endChat').foundation('reveal', 'open');
});

socket.on('invalid_chatroom', function(msg)
{
	// Alert user, then return them to the queue page
	alert("Error: invalid chatroom specified");
	window.location.assign("queue.html");
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

	if (writeReview) {
		socket.send(msg);
	}
	inputText.value = "";

	// Make it appear in the chat area
	chatArea.textContent += "Me: " + msg + "\n";
	log += "Me: " + msg + "\n";
}

function openModal() {
	if (writeReview && type != 2) {
		socket.emit("end_chat", "end_chat");
		$('#endChat').foundation('reveal', 'open');
	} 
	else {
		window.location.assign("queue.html");
	}
	}

	function submitReview() {
		//clear localstorage
		localStorage.removeItem("queueType");

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

		let body = {
			rating: rating,
			text: review
		};

		//alert(JSON.stringify(body));
		$.ajax({
				type: "POST",
				url: "http://localhost:3000/add_review",
				contentType: 'application/json',
				processData: false,
				async: false,
				data: JSON.stringify(body),
				success: function (data)
				{
					var response = data;
					if (response["error_code"] == 0)
					{
						window.location.assign("queue.html");
					}
				}
		});
		}
