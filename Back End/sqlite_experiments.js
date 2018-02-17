import sqlite from 'sqlite';

initialize_database();

async function initialize_database()
{
	let dbPromise = sqlite.open('./database_contents/experiment_database.sqlite', {Promise});
	const db = await dbPromise;

	// Create the table
	await db.run("CREATE TABLE player_scores (playerid int, score int);");
	await db.run("INSERT INTO player_scores (playerid, score) VALUES (0, 100);");

	// Read data from the table
	let result = await db.get("SELECT * FROM player_scores;");

	// Print the read data
	console.log(result);
}