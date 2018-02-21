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
	// TODO: Return 2 if email is invalid
	// TODO: Return 1 if username already exists

	// TODO: Use a proper hashing algorithm
	let salt = "salt";
	let hashedPassword = password + salt;

	// Create the user
	await db.run
	(`
		INSERT INTO user
		(
			user_name,
			password_hash,
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