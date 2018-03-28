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

	// Create the tables
	await executeSQLScript("./sql_scripts/initialize_database.sql", db);
}

// Returns the given user's uid.
async function getUID(username)
{
	let query = "SELECT rowid FROM user WHERE user_name = ?;"
	let queryResult = await db.get(query, username);

	return queryResult.rowid;
}

// Queries the database for the given user's preferences.
// See PREFERENCES_API for the structure of the object it returns.
async function getUserPrefs(username)
{
	// Get the user id
	// TODO: Refactor this so user id is passed as a parameter isntead.
	let uidQuery = "SELECT rowid FROM user WHERE user_name = ?;";
	let uidResults = await db.get(uidQuery, username);
	let uid = uidResults.rowid;

	// Query for the summoner name and rank
	// TODO: Replace summoner_name and current_rank with a query to Riot's servers
	let miscPrefsQuery = 
	`
		SELECT
			user_id,
			view_replay,
			twitch_name,
			summoner_name,
			current_rank,
			min_coach_rank,
			max_coachee_rank
		FROM 
			user_misc_preferences
		WHERE
			user_id = ?;
	`;

	let miscPrefs = await db.get(miscPrefsQuery, uid);

	// TODO: What was I thinking?  Refactor this bullshit.
	let view_replay = null;
	let twitch_name = null;
	let summoner_name = null;
	let current_rank = -1;
	let min_coach_rank = -1;
	let max_coachee_rank = -1;

	if (miscPrefs != undefined)
	{
		view_replay = Boolean(miscPrefs.view_replay);	// SQLite returns integers 0 and 1, so we need to cast to a bool
		twitch_name = miscPrefs.twitch_name;
		summoner_name = miscPrefs.summoner_name;
		current_rank = miscPrefs.current_rank;
		min_coach_rank = miscPrefs.min_coach_rank;
		max_coachee_rank = miscPrefs.max_coachee_rank;
	}

	// Query for the skills
	let coachSkills = await getSkillPrefs(uid, false);
	let coacheeSkills = await getSkillPrefs(uid, true);

	// Construct the object
	let output =
	{
		error_code: ErrorCodeEnum.SUCCESS,

		user:
		{
			twitch_name: twitch_name,
			summoner_name: summoner_name,
			current_rank: current_rank
		},

		student:
		{
			skills: coacheeSkills,
			min_coach_rank: min_coach_rank
		},

		coach:
		{
			view_replay: view_replay,
			skills: coachSkills,
			max_coachee_rank: max_coachee_rank
		},
	};

	return output;
}

// Updates the database with the new preferences
async function setUserPrefs(username, prefsData)
{
	// Get the user id
	let uidQuery = "SELECT rowid FROM user WHERE user_name = ?;";
	let uidResults = await db.get(uidQuery, username);
	let uid = uidResults.rowid;

	// Delete the preferences row if it already exists
	let deleteQuery = `DELETE FROM user_misc_preferences WHERE user_id = ?;`;
	await db.run(deleteQuery, uid);

	// Set misc user preferences
	let miscPrefsQuery = 
	`
		INSERT INTO user_misc_preferences
		(
			user_id,
			view_replay,
			twitch_name,
			summoner_name,
			current_rank,
			min_coach_rank,
			max_coachee_rank
		)
		VALUES (?, ?, ?, ?, ?, ?, ?);
	`;

	let miscPrefsPromise = db.run
	(
		miscPrefsQuery,
		uid,
		prefsData.coach.view_replay,
		prefsData.user.twitch_name,
		prefsData.user.summoner_name,
		prefsData.user.current_rank,
		prefsData.student.min_coach_rank,
		prefsData.coach.max_coachee_rank
	);

	// Set the skill settings
	let coachSkillsPromise = setSkillPrefs(uid, prefsData.coach.skills, false);
	let coacheeSkillsPromise = setSkillPrefs(uid, prefsData.student.skills, true);

	// Wait for all the promises to finish.
	await miscPrefsPromise;
	await coachSkillsPromise;
	await coacheeSkillsPromise;

	return {error_code: ErrorCodeEnum.SUCCESS};
}

// Queries the database for a given user's coach skill preferences.
// Returns a boolean array specifying if each skill present.
// If coachee is true, it will search for coachee skills instead of coach skills.
async function getSkillPrefs(userid, coachee)
{
	// Decide which table to query
	let tableName = "coach_skills";
	if (coachee)
		tableName = "coachee_skills";

	// Query for the skills
	let skillRows = await db.all
	(
		"SELECT skill_id FROM " + tableName + " WHERE user_id = ?;",
		userid
	);

	// Start each skill as false
	let output = [];
	for (let i = 0; i < 8; i++)
		output.push(false);

	// Mark each skill true if it was returned in the query
	for (let i = 0; i < skillRows.length; i++)
	{
		let skill_id = skillRows[i].skill_id;
		output[skill_id] = true;
	}

	return output;
}

// Sets a given user's coach skill preferences.
// skills is a boolean array specifying if each skill present.
// If coachee is true, it will search for coachee skills instead of coach skills.
async function setSkillPrefs(userid, skills, coachee)
{
	// Decide which table to query
	let tableName = "coach_skills";
	if (coachee)
		tableName = "coachee_skills";

	// We're going to be building a big query, so buckle up!
	let query = ""

	query += "BEGIN TRANSACTION;\n"	// We want our entire query to be atomic; if one
									// statement fails, then all the previous statements
									// will be cancelled.  That way the database doesn't
									// get corrupted.

	// Clear any existing skills in the database
	query += "DELETE FROM " + tableName + " WHERE user_id = " + userid + ";\n";

	// Add back the skills that were set to true
	for (let i = 0; i < skills.length; i++)
	{
		if (!skills[i])
			continue;

		query += "INSERT INTO " + tableName + "(user_id, skill_id) VALUES(" + userid + ", " + i + ");\n";
	}

	query += "END TRANSACTION;";

	// Execute the query and return success
	await db.exec(query);
}

// Adds a review from the given student for the given coach
// upvoteOrDownvote is a bool.  If true, it's an upvote, else downvote
// text is the text of the review
async function add_review(student_uid, coach_uid, upvoteOrDownvote, text)
{
	// TODO: Error checking

	let query = 
	`
		INSERT INTO coach_reviews
		(
			student_user_id,
			coach_user_id,
			review_date,
			upvote_or_downvote,
			review_text,
		)
		VALUES
		(?, ?, ?, ?, ?);
	`;

	let date = new Date();
	db.run
	(
		query,
		student_uid,
		coach_uid,
		date,
		text
	);
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
	add_review,
    db
}
