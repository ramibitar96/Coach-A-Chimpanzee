//signup pass to ajax
$('.signup-form').on('submit', function(e) {
	e.preventDefault();
	var data = $('.signup-form').serializeArray().reduce(function(obj, item) {
		obj[item.name] = item.value;
		return obj;
	}, {});

	var user = data['username'];
	var pass = data['password'];
	var pass2 = data['password2'];
	var email = data['email'];

	if (validate(user, pass, pass2, email)) {
		var body = 
			'{' +
			'"username":' + '"' + user + '",' +
			'"password":' + '"' + pass + '",' +
			'"email":' + '"' + email + '",' +
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
	}
});

function validate(user, pass, pass2, email) {
	//if any fields are empty
	if (user == "" || user == null ||
		pass == "" || pass == null ||
		pass2 == "" || pass2 == null ||
		email == "" || email == null) {
		//alert("Please fill all fields");
		return false;
	}

	//passwords do not match
	if (pass !== pass2) {
		//alert("Passwords do not match");
		return false;
	}

	//passwords too short
	if (pass.length < 4) {
		//alert("Password must be at least 4 characters");
		return false;
	}

	//validated
	return true;
}

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
					window.location.assign("PLpreferences.html");
				}
			}
	});
	}
