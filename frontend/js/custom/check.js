if (window.location.pathname == "/index.html" || 
	window.location.pathname == "/" || 
	window.location.pathname == "/signup.html") {
	if (loggedIn()) {
		window.location.assign("queue.html");
	}
} else {
	if (!loggedIn()) {
		//redirect to login page
		window.location.assign("index.html");	
	}
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

function loggedIn() {
	var user = getCookie("session_token");

	if (user != "") {
		return true;
	} else {
		return false;
	}
}

function logout() {
	document.cookie = "session_token=";
	window.location.assign("index.html");
}
