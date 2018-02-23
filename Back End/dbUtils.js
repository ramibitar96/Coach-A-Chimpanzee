// Imports
const sqlite = require('sqlite');
const fs = require('fs');
const strip = require('sql-strip-comments');
const ErrorCodeEnum = require('./errorCodes.js');

var db;     // The connection to the SQLite database.

// Initializes the database, creating all the tables.
// If the database has already been initialized, does nothing.
async function initializeDatabase()
{
	// Connect to the database
	db = await sqlite.open('./database_contents/database.sqlite', {Promise});
    module.exports.db = db;     // Ensures other files will be able to reference db

    console.log("db = " + db);

	// Create the tables
	await executeSQLScript("./sql_scripts/initialize_database.sql", db);

	// Add all the skills if they aren't added already.
	let skills = await db.get("SELECT * FROM skill;");
	if (skills === undefined)
		await executeSQLScript("./sql_scripts/populate_skills.sql", db);
}

// Queries the database for the given user's preferences.
// See PREFERENCES_API for the structure of the object it returns.
async function getUserPrefs(username)
{
	// Query for the rank preferences
	let rankQuery =
	`
		SELECT
			user.user_name,
			user.user_id,
			user_rank_preferences.min_coach_rank,
			user_rank_preferences.max_coachee_rank
		FROM
			user,
			user_rank_preferences
		WHERE
			user.user_name = ? AND
			user.user_id = user_rank_preferences.user_id;
	`;

	let rankPromise = db.all(rankQuery, username);

	// TODO: Query Riot's servers for summoner name and rank
	// TODO: Query for coach skills
	// TODO: Query for coachee skills

	// Await all the results
	let rankResults = await rankPromise;

	// Construct the object
	let output =
	{
		error_code: ErrorCodeEnum.SUCCESS,

		user:
		{
			// TODO: Summoner name
			// TODO: Current rank
		},

		student:
		{
			// TODO: All the skills
			min_coach_rank: rankResults.max_coach_rank
		},

		coach:
		{
			// TODO: All the skills
			max_coachee_rank: rankResults.max_coach_rank
		},
	};

	return output;
}

// Updates the database with the new preferences
async function setUserPrefs(username, prefsData)
{
	// Get the user id
	let uidQuery = "SELECT user_id FROM user WHERE username = ?;";
	let uid = (await db.get(uidQuery, username)).user_id;

	console.log("Setting preferences for user " + uid);

	// TODO: Update rank settings

	return {error_code: ErrorCodeEnum.SUCCESS};
}

// Executes the SQL script specified by filePath.
// Returns a Promise<sqlite.Statement> when it's done.
// filePath's type is string.  db's type is sqlite.Database
function executeSQLScript(filePath, db)
{
	let sqlText = fs.readFileSync(filePath, 'utf8');	// Read the SQL file into a string
	let noComments = strip(sqlText);					// Remove all comments so sqlite can execute it.

	// Execute it.
	return db.exec(noComments);
}

// Exports
module.exports =
{
	initializeDatabase,
	getUserPrefs,
	setUserPrefs,
    db
}
