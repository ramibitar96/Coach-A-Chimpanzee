// Imports
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const dbUtils = require('./dbUtils.js');
const auth = require('./authenticationUtils.js');
const ErrorCodeEnum = require('./errorCodes.js');

var app = express();

// Tell expressjs that we want to allow cookies from mutliple origins
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use(bodyParser.json());					// Tell expressjs that we want it to parse the request bodies as json.
app.use(cookieParser());                    // Tell expressjs that we want it to parse cookies it receives.
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
    // Error if bad JSON.
    if (!req.body.hasOwnProperty("username") || !req.body.hasOwnProperty("password"))
    {
        res.send({error_code: ErrorCodeEnum.BAD_JSON_OBJECT});
        return;
    }

    // Generate a session token
    let token = await auth.login(req.body.username, req.body.password);

    // Error if the username and password were invalid
    if (token === null)
    {
        res.send({error_code: ErrorCodeEnum.WRONG_PASSWORD});
        return;
    }

    // Set the cookie to the token and send success.
    let cookieOptions =
    {
        secure: false,      // TODO: Set this to true once we get HTTPS working
        maxAge: auth.TOKEN_EXPIRATION_MS
    };

    res.cookie("session_token", token, cookieOptions);
    res.send({error_code: ErrorCodeEnum.SUCCESS});
});

// Retrieves the user preferences of the currently logged-in user.
app.get('/get_prefs', async function(req, res)
{
    // TODO: Error if bad json object for cookie
    let token = req.cookies.session_token;
    let authResults = await auth.checkToken(token);

    // Send the error code if the token is bad
    if (authResults.error_code != 0)
    {
        res.send({error_code: authResults.error_code});
        return;
    }

    // Retrieve the user prefs and send them.
    let results = await dbUtils.getUserPrefs(authResults.username);
    res.send(results);
});

// Returns a webpage displaying the username of the currently-logged-in user.
app.get('/whats_my_username', async function(req, res)
{
    // TODO: Error if bad json object for cookie.

    console.log("received cookies: " + JSON.stringify(req.cookies));

    // Decode the username
    let token = req.cookies.session_token;
    let authResults = await auth.checkToken(token);

    // Display error messages
    let error_code = authResults.error_code;
    if (error_code == ErrorCodeEnum.TOKEN_EXPIRED)
    {
        res.send("ERROR: Token Expired.  Please log in again.");
        return;
    }

    if (error_code == ErrorCodeEnum.TOKEN_INVALID)
    {
        res.send("ERROR: Invalid token.  Are you a hacker?");
        return;
    }

    // Send the username
    res.send("Hello, " + authResults.username);
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
