// Imports
const sqlite = require('sqlite');
const fs = require('fs');
const strip = require('sql-strip-comments');

var db;

// Initializes the database, creating all the tables.
// If the database has already been initialized, does nothing.
async function initialize_database()
{
	// Connect to the database
	db = await sqlite.open('./database_contents/database.sqlite', {Promise});

	// Create the tables
	await execute_sql_script("./sql_scripts/initialize_database.sql", db);
}

// Attempts to create a new user with the given credentials.
// Returns 0 if successful, or an error code if not.
// See "REGISTER_USER_PROTOCOL.txt" for more info.
async function register_user(username, password, email, summoner_id)
{
	// See REGISTER_USER_PROTOCOL.txt for a list of error codes.
	const ErrorCodeEnum = 
	{
		SUCCESS: 0,
		USERNAME_EXISTS: 1,
		EMAIL_INVALID: 2,
		BAD_JSON_OBJECT: 3
	};

	// TODO: Error if email is invalid

	// Error if username already exists
	let user = await db.get("SELECT user_name FROM user WHERE user_name = ?;", username);
	if (user !== undefined)
	{
		return ErrorCodeEnum.USERNAME_EXISTS;
	}

	// TODO: Use a proper hashing algorithm
	let salt = "salt";
	let hashedPassword = password + salt;

	// Create the user
	await db.run
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

// Executes the SQL script specified by filePath.
// Returns a Promise<sqlite.Statement> when it's done.
// filePath's type is string.  db's type is sqlite.Database
function execute_sql_script(filePath, db)		
{
	let sqlText = fs.readFileSync(filePath, 'utf8');	// Read the SQL file into a string
	let noComments = strip(sqlText);					// Remove all comments so sqlite can execute it.

	// Execute it.
	return db.exec(noComments);
}

// Exports
module.exports = 
{
	initialize_database,
	register_user
}