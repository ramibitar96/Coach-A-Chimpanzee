// Imports
const express = require('express');
const bodyParser = require('body-parser');
const dbUtils = require('./dbUtils.js');
const auth = require('./authenticationUtils.js');
const ErrorCodeEnum = require('./errorCodes.js');

var app = express();

app.use(bodyParser.json());					// Tell expressjs that we want it to parse the request bodies as json.
app.use(express.static("../frontend"));		// Tell expressjs that we want to serve all static files(.html, images, etc) from this folder.

// Handles registration requests
// TODO: Have the user give their summoner name and then look up the summoner id over Riot's api
app.post('/register', async function(req, res)
{
	console.log(req.body);

	// Error if the body's json object is missing a property.
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

	// Try to register the user
	let errorCode = await auth.registerUser(req.body.username, req.body.password, req.body.email, req.body.summoner_id);
	res.send({error_code: errorCode});
});


// Handles log in requests
app.post('/login', async function(req, res)
{
    // TODO: Error if bad JSON.
});


// Entry point for the program
main();
async function main()
{
	// Initialize the database, if it hasn't been already.
	await dbUtils.initializeDatabase();

	// Start handling requests
	app.listen(3000, function()
	{
		console.log('Listening on port 3000!');
	});
}
