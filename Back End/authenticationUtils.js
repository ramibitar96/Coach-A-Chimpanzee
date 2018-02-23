// See AUTHENTICATION_PROTOCOLS.txt for complete documentation
// Imports
const bcrypt = require('bcryptjs');
const dbUtils = require('./dbUtils.js');
const ErrorCodeEnum = require('./errorCodes.js');

// Attempts to create a new user with the given credentials.
// Returns 0 if successful, or an error code if not.
async function registerUser(username, password, email, summoner_id)
{
	// TODO: Error if email is invalid

	// Error if username already exists
    console.log("dbUtils.db = " + dbUtils.db);
	let user = await dbUtils.db.get("SELECT user_name FROM user WHERE user_name = ?;", username);
	if (user !== undefined)
	{
		return ErrorCodeEnum.USERNAME_EXISTS;
	}

	// TODO: Use the async version
	let salt = bcrypt.genSaltSync(10);     // 10 is the number of "rounds" used for generating the salt.
	let hashedPassword = bcrypt.hashSync(password, salt);

    console.log("salt: " + salt);
    console.log("hashedPassword: " + hashedPassword);

	// Create the user
	await dbUtils.db.run
	(`
		INSERT INTO user
		(
			user_name,
			hashed_salted_password,
			password_salt,
			email,
			summoner_id
		)
		VALUES
		(
			?,
			?,
			?,
			?,
			?
		);
	`, username, hashedPassword, salt, email, summoner_id);

	// Return success
	return 0;
}

// Generates and returns a session token, if the username and password are good.
// Returns null if the username/password is bad
async function login(username, password)
{
    // Look up the password from the database
    let query = `SELECT hashed_salted_password FROM user WHERE user_name = ?;`;
    let queryResult = await dbUtils.db.get(query, username);

    // If no such username exists, return null
    if (queryResult === undefined)
        return null;

    // Compare the stored password to the given password
    let storedHash = queryResult.hashed_salted_password;
    let matches = bcrypt.compareSync(password, storedHash);

    // Return null if they don't match
    if (!matches)
        return null;

    // Generate and return the token
    // TODO: Use a REAL token.
    return "I'm " + username + ", trust me.";
}

// Exports
module.exports =
{
	registerUser,
    login
}
