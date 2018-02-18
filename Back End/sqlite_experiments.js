import sqlite from 'sqlite';
import fs from 'fs';
import strip from 'sql-strip-comments';

initialize_database();

async function initialize_database()
{
	let dbPromise = sqlite.open('./database_contents/experiment_database.sqlite', {Promise});
	const db = await dbPromise;

	// Create the table
	await execute_sql_script("./sql_scripts/initialize_database.sql", db);

	// Read data from the table
	let result = await db.get("SELECT * FROM player_scores;");

	// Print the read data
	console.log(result);
}

// Executes the SQL script specified by filePath.
// Returns a Promise<sqlite.Statement> when it's done.
// filePath's type is string.  db's type is sqlite.Database
async function execute_sql_script(filePath, db)		
{
	let sqlText = fs.readFileSync(filePath, 'utf8');	// Read the SQL file into a string
	let noComments = strip(sqlText);					// Remove all comments so sqlite can execute it.

	// Execute it.
	return db.exec(noComments);
}