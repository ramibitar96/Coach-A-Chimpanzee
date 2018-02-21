// Imports
const express = require('express');
const bodyParser = require('body-parser');
const dbUtils = require('./dbUtils.js');

var app = express();

// Tell expressjs that we want it to parse the request bodies as json.
app.use(bodyParser.json());


// Whenever someone requests any file, we respond with "Hello World"
app.get('/', function (req, res)
{
	res.send('Hello World!');
});

app.post('/register', async function(req, res)
{
	// See REGISTER_USER_PROTOCOL.txt for a list of error codes.
	const ErrorCodeEnum = 
	{
		SUCCESS: 0,
		USERNAME_EXISTS: 1,
		EMAIL_INVALID: 2,
		BAD_JSON_OBJECT: 3
	};

	console.log(req.body);

	// Error if it's a bad json object
	let requiredProperties = 
	[
		"username",
		"password",
		"email",
		"summoner_id"
	];
	for (let i = 0; i < requiredProperties.length; i++)
	{
		if (!req.body.hasOwnProperty(requiredProperties[i]))
		{
			res.send({error_code: ErrorCodeEnum.BAD_JSON_OBJECT});
			return;
		}
	}

	//res.send({error_code: ErrorCodeEnum.BAD_JSON_OBJECT});
	
	res.send("valid json object");
});

main();
async function main()
{
	// Initialize the database, if it hasn't been already.
	dbUtils.initialize_database();

	// Start handling requests
	app.listen(3000, function()
	{
		console.log('Listening on port 3000!');
	});
}