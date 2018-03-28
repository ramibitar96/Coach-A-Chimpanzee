//signup pass to ajax
$('.signup-form').on('submit', function(e) {
	e.preventDefault();
	var data = $('.signup-form').serializeArray().reduce(function(obj, item) {
		obj[item.name] = item.value;
		return obj;
	}, {});

	var user = data['username'];
	var pass = data['password'];

	var body = 
		'{' +
		'"username":' + '"' + user + '",' +
		'"password":' + '"' + pass + '",' +
		'"email":' + '"' + data['email'] + '",' +
		'"summoner_id": 1' +
		'}';

	$.ajax({
			type: "POST",
			url: "http://localhost:3000/register",
			contentType: 'application/json',
			processData: false,
			async: false,
			data: body,
			success: function(data) {
				var error = data["error_code"];
				if (error == 0) {
					var body = 
						'{' +
						'"username":' + '"' + user + '",' +
						'"password":' + '"' + pass + '"' +
						'}';
					login(body);
				}
				else if (error == 1) {
					alert("User already exists");
				}
				else if (error == 2) {
					alert("Email invalid");
				}
				else if (error == 3) {
					alert("Incomplete fields");
				}
			}
	});
});

function login(body) {
	$.ajax({
			type: "POST",
			url: "http://localhost:3000/login",
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
}
