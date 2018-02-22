// See AUTHENTICATION_PROTOCOLS.txt for complete documentation
// Imports
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

	// TODO: Use a proper hashing algorithm
	let salt = "salt";
	let hashedPassword = password + salt;

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

// Exports
module.exports =
{
	registerUser
}
