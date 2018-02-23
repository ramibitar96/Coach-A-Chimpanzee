//signup pass to ajax
$('.login-form').on('submit', function() {
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
				alert(response["error_code"]);
			}
	});
});

/*
var name = "temp";
var date = new Date();
date.setTime(date.getTime() + 24*60*60*1000); //expire in 1 day
document.cookie = "username=" + name + "; expires=" + date.toUTCString() + ";path=/";
*/
