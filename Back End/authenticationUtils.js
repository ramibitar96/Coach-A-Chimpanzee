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

// Exports
module.exports =
{
	registerUser
}
