//signup pass to ajax
$('.login-form').on('submit', function(e) {
	e.preventDefault();
	var data = $('.login-form').serializeArray().reduce(function(obj, item) {
		obj[item.name] = item.value;
		return obj;
	}, {});

	var body = 
		'{' +
		'"username":' + '"' + data['username'] + '",' +
		'"password":' + '"' + data['password'] + '"' +
		'}';

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
				} else if (response["error_code"] == 4 ) {
					alert("User and/or Password incorrect");
				}
			}
	});
});
