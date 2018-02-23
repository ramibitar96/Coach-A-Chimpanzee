//signup pass to ajax
$('.signup-form').on('submit', function() {
	var data = $('.signup-form').serializeArray().reduce(function(obj, item) {
		obj[item.name] = item.value;
		return obj;
	}, {});

	var body = 
		'{' +
		'"username":' + '"' + data['username'] + '",' +
		'"password":' + '"' + data['password'] + '",' +
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
			success: function (data){
				alert(data["error_code"]); 
			}
	});
});
