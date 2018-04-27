// Imports
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const dbUtils = require('./dbUtils.js');
const auth = require('./authenticationUtils.js');
const matchmaking = require('./matchmaking.js');
const riotUtils = require('./riotUtils.js');
const ErrorCodeEnum = require('./errorCodes.js');
const fs = require('fs');
const path = require('path');
const formidable = require('formidable'),
	http = require('http'),
	util = require('util');
module.exports = function(app)
{
	// Tell expressjs that we want to allow cookies from mutliple origins
    app.use(function(req, res, next)
    {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
	});

	app.use(bodyParser.json());					// Tell expressjs that we want it to parse the request bodies as json.
	app.use(bodyParser({uploadDir:'/images/tmp'}));
	app.use(cookieParser());                    // Tell expressjs that we want it to parse cookies it receives.

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
        // If a query string was provided, look up that specific user's preferences instead.
        if (Object.keys(req.query).length !== 0)
        {
            // TODO: Error if bad query string
            let results = await dbUtils.getUserPrefs(req.query.user);
            res.send(results);
        }

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

	app.get('/get_pfp', async function(req,res)
	{
		let token = req.cookies.session_token;
		let authResults = await auth.checkToken(token);
		if(authResults.error_code != 0)
		{
			res.send({error_code: authResults.error_code});
		}
		//get the pfp and send it back
		let results = await dbUtils.getPfp(authResults.username);
		res.send(results);
	});
  app.get('/get_replays',async function(req,res) 
	{
		let token = req.cookies.session_token;
		let authResults = await auth.checkToken(token);
		if(authResults.error_code != 0)
		{
			res.send({error_code: authResults.error_code});
		}
		//get all replays
		let results = await dbUtils.getReplays(authResults.username);
		res.send(results);
	});
	app.post('/set_pfp', async function(req, res)
    {
        let token = req.cookies.session_token;
        let authResults = await auth.checkToken(token);

        //send error code	
        if (authResults.error_code != 0)
        {
            res.send({error_code: authResults.error_code});
            return;
        }
				//create formidable parser
			  var form = new formidable.IncomingForm();
			  //parse the incoming form with the profile picture
				form.parse(req, function(err, fields, files) {
					var op = files.profile_pic.path;
					var name = files.profile_pic.name;
					var np = './imgs/'+authResults.username + 
						name.substring(name.lastIndexOf("."));
					//write the pfp to the server
					fs.rename(op,np, function(err) {
						if(err) throw err;
					});
					console.log(np);
					let results = dbUtils.setProfileImg(authResults.username,np);
					res.send(results);
				});

        //uploadImagetoServer
    });

	app.post('/add_replay', async function(req, res)
    {
        let token = req.cookies.session_token;
        let authResults = await auth.checkToken(token);

        //send error code for authError
        if(authResults.error_code != 0)
        {
            res.send({error_code: authResults.error_code});
            return;
        }
        //upload to server
			  var form = new formidable.IncomingForm();
			  //parse the incoming form with the profile picture
				form.parse(req, function(err, fields, files) {
					var op = files.replay_file.path;
					var name = files.replay_file.name;
					var np = './replays/'+authResults.username + 
						name.substring(name.lastIndexOf(".")-2);
					//write the pfp to the server
					fs.rename(op,np, function(err) {
						if(err) throw err;
					});
					let results = dbUtils.uploadReplayFile(authResults.username,np);
					res.send(results);
				});
    });

	// Sets the user preferences of the currently logged-in user.
	app.post('/set_prefs', async function(req, res)
    {
        // TODO: Error if bad json object for cookie
        let token = req.cookies.session_token;
        let authResults = await auth.checkToken(token);

        // Send the error code if the token is bad
        // TODO: Refactor this copypasta code
        if (authResults.error_code != 0)
        {
            res.send({error_code: authResults.error_code});
            return;
        }

        // TODO: Error if the body does not have the required data

        // Set the preferences
        let results = await dbUtils.setUserPrefs(authResults.username, req.body);
        res.send(results);
    });

    app.post('/add_review', async function(req, res)
    {
        // TODO: Error if bad json object for cookie
        let token = req.cookies.session_token;
        let authResults = await auth.checkToken(token);

        // Send the error code if the token is bad
        // TODO: Refactor this copypasta code
        if (authResults.error_code != 0)
        {
            res.send({error_code: authResults.error_code});
            return;
        }

        // TODO: Error if bad json object for body

        console.log("user " + authResults.username + " sent review " + req.body);

        // Get the UIDs
        let student_uid = await dbUtils.getUID(authResults.username);
        let coach_username = await dbUtils.get_previous_partner(authResults.username);
        let coach_uid = await dbUtils.getUID(coach_username);

        // Get the stuff from the body
        let rating = req.body.rating;
        let text = req.body.text;

        dbUtils.add_review(student_uid, coach_uid, rating, text);
        res.send({error_code: ErrorCodeEnum.SUCCESS});
    });

    app.get('/get_reviews', async function(req, res)
    {
        // Error if bad query string
        if (req.query.user === undefined)
        {
            res.send({error_code: ErrorCodeEnum.BAD_QUERY_STRING});
            return;
        }

        // TODO: Error checking for non-existent user
        // Get the reviews and send them
        let reviews = await dbUtils.get_reviews(req.query.coach);
        res.send({reviews: reviews});
    });

    app.get('/get_profile', async function(req, res)
    {
        // Error if bad query string
        if (req.query.user === undefined)
        {
            res.send({error_code: ErrorCodeEnum.BAD_QUERY_STRING});
            return;
        }

        // Simultaneously get the reviews and user prefs
        let reviewPromise = dbUtils.get_reviews(req.query.user);
        let prefsPromise = dbUtils.getUserPrefs(req.query.user);

        let prefs = await prefsPromise;
        let reviews = await reviewPromise;

        // Error if no such user
        if (reviews === undefined)
        {
            res.send({error_code: ErrorCodeEnum.USERNAME_DOESNT_EXIST});
            return;
        }

        // Combine them into a single json object and send the reply
        let results = 
        {
            error_code: ErrorCodeEnum.SUCCESS,
            user: prefs.user,
            reviews: reviews
        };

        res.send(results);
    });

    /**
     * Replies with { "inGame":true  } if the current user is in game (or has a replay uploaded)
     * Replies with { "inGame":false } if the current user is invalid or not in game. 
     */
    app.get('/isInGame', async function(req, res)
    {
        // Return false if not a valid user
        let token = req.cookies.session_token;
        let authResults = await auth.checkToken(token);

        if (authResults.error_code != ErrorCodeEnum.SUCCESS)
        {
            res.send({inGame: false});
            return;
        }
        let username = authResults.username;

        // Return true if they have a replay file uploaded
        let replays = await dbUtils.getReplays(username);
        if (replays !== null)
        {
            res.send({inGame: true});
            return;
        }

        // Ask Riot if they're in a game
        let match_data = await riotUtils.get_spectate_data(username);

        let inGame = match_data !== null;
        res.send({inGame: inGame});
    });

    /**
     * See SPECTATE_PROTOCOLS.txt
     */
    app.get('/get_student_match', async function(req, res)
    {
        // Error if not logged in
        let token = req.cookies.session_token;
        let authResults = await auth.checkToken(token);

        if (authResults.error_code != 0)
        {
            res.send({error_code: authResults.error_code});
            return;
        }

        let username = authResults.username;

        // Error if user is not a coach
        if (!matchmaking.isUserCoach(username))
        {
            res.send({error_code: ErrorCodeEnum.USER_NOT_A_COACH});
            return;
        }

        // Look up the student's username
        let student = matchmaking.findPartner(username);

        // Error if no partner
        if (student === null)
        {
            res.send({error_code: ErrorCodeEnum.USER_HAS_NO_PARTNER});
            return;
        }

        // Ask Riot for the spectate data
        let match_data = await riotUtils.get_match_data(student);

        // Error if not in a game
        if (match_data === null)
        {
            res.send({error_code: ErrorCodeEnum.STUDENT_NOT_IN_GAME});
            return;
        }

        // Send the spectate data.
        res.send(match_data);
    });

    app.get('/get_match', async function(req, res)
    {
        // Just punt it off to Riot's API
        let results = await riotUtils.get_match(req.query.gameid);
        res.send(results);
    });

    app.get('/get_history', async function(req, res)
    {
        try
        {
            res.send(await dbUtils.get_chat_sessions());
        }
        catch (e)
        {
            console.log(e);
            res.send(null);
        }
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
}
