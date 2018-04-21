//user type
var type = localStorage.getItem("queueType");

var socket = io.connect('http://localhost:3000');

var writeReview = false;
var log = "";

//send queue type
socket.emit("queueType", type);

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

socket.on('end_chat', function(msg)
{
	let chatArea = document.getElementById("chatArea");
	chatArea.textContent += "CHAT ENDED\n";
	//simulate end chat click
	$('#endChat').foundation('reveal', 'open');
});

//whiteboard stuff
var canvas = document.getElementsByClassName('whiteboard')[0];
var colors = document.getElementsByClassName('color');
var context = canvas.getContext('2d');

var current = {
	color: 'black'
};
var drawing = false;

canvas.addEventListener('mousedown', onMouseDown, false);
canvas.addEventListener('mouseup', onMouseUp, false);
canvas.addEventListener('mouseout', onMouseUp, false);
canvas.addEventListener('mousemove', throttle(onMouseMove, 10), false);

for (var i = 0; i < colors.length; i++){
	colors[i].addEventListener('click', onColorUpdate, false);
}

socket.on('drawing', onDrawingEvent);

window.addEventListener('resize', onResize, false);
onResize();


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
	if (writeReview) {
		socket.emit("end_chat", "end_chat");
		$('#endChat').foundation('reveal', 'open');
	} 
	else { window.location.assign("queue.html"); }
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

	/* taken from socket.io whiteboard example website */
/* https://socket.io/demos/whiteboard/ */

function drawLine(x0, y0, x1, y1, color, emit){

	context.beginPath();
	context.moveTo(x0, y0);
	context.lineTo(x1, y1);
	context.strokeStyle = color;
	context.lineWidth = 2;
	context.stroke();
	context.closePath();
	
	if(!emit) { return; }

	//whiteboard is a square, ignore topbar
	var h = canvas.height - 75;
	var w = h;

	//adjust for topbar positioning
	y0 = y0 - 75;
	y1 = y1 - 75;

	//if map is not on edge of screen
	var filler = $(".cr-filler").width();
	if (filler != 0) {
		x0 = x0 - filler;
		x1 = x1 - filler;
	}

	socket.emit('drawing', {
			x0: x0 / w,
			y0: y0 / h,
			x1: x1 / w,
			y1: y1 / h,
			color: color });
}

function onMouseDown(e){
	drawing = true;
	current.x = e.clientX;
	current.y = e.clientY;
}

function onMouseUp(e){
	if (!drawing) { return; }
	drawing = false;
	drawLine(current.x, current.y, e.clientX, e.clientY, current.color, true);
}

function onMouseMove(e){
	if (!drawing) { return; }
	drawLine(current.x, current.y, e.clientX, e.clientY, current.color, true);
	current.x = e.clientX;
	current.y = e.clientY;
}

function onColorUpdate(e){
	current.color = e.target.className.split(' ')[1];
}

// limit the number of events per second
function throttle(callback, delay) {
	var previousCall = new Date().getTime();
	return function() {
		var time = new Date().getTime();

		if ((time - previousCall) >= delay) {
			previousCall = time;
			callback.apply(null, arguments);
		}
	};
	}

	function onDrawingEvent(data){
		//whiteboard is a square, ignore topbar
		var h = canvas.height - 75;
		var w = h;

		//multiply by canvas height and then adjust for the topbar
		var y0 = (data.y0 * h) + 75;
		var y1 = (data.y1 * h) + 75;

		//multiply by canvas width
		var x0 = (data.x0 * w);
		var x1 = (data.x1 * w);

		//if map is not on edge of screen
		var filler = $(".cr-filler").width();
		if (filler != 0) {
			x0 = x0 + filler;
			x1 = x1 + filler;
		}

		drawLine(x0, y0, x1, y1, data.color, false);
	}

	// make the canvas fill its parent
	function onResize() {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
	}
