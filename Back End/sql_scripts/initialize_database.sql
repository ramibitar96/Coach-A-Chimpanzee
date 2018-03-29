--primary key is rowid
CREATE TABLE IF NOT EXISTS user
(
	summoner_id int PRIMARY KEY,
	user_name varchar,
	profile_img varchar,
	email varchar,
	hashed_salted_password varbinary,
	password_salt varbinary
);

CREATE TABLE IF NOT EXISTS replays 
(
 replay_id int PRIMARY KEY,
 replay_owner_id int,
 replay_url varchar,
 FOREIGN KEY(replay_owner_id) REFERENCES user(summoner_id)
);

CREATE TABLE IF NOT EXISTS coach_ratings
(
	student_user_id int,
	coach_user_id int,
	upvote_or_downvote boolean,		-- If it's true, it's an upvote.  Else, it's a downvote.
	FOREIGN KEY(student_user_id) REFERENCES user(user_id),
	FOREIGN KEY(coach_user_id) REFERENCES user(user_id)
);

-- Every so often, this table will need to be updated using the above table.
CREATE TABLE IF NOT EXISTS cached_rating_total
(
	coach_user_id int PRIMARY KEY,
	total_rating int,
	FOREIGN KEY(coach_user_id) REFERENCES user(user_id)
);

CREATE TABLE IF NOT EXISTS coaching_session
(
	session_id int PRIMARY KEY,
	student_user_id int,
	coach_user_id int,
	time_stamp int,
	FOREIGN KEY(student_user_id) REFERENCES user(rowid),
	FOREIGN KEY(coach_user_id) REFERENCES user(rowid)
);

CREATE TABLE IF NOT EXISTS coachee_skills
(
	user_id int,
	skill_id int,
	FOREIGN KEY(user_id) REFERENCES user(rowid)
);

CREATE TABLE IF NOT EXISTS coach_skills
(
	user_id int,
	skill_id int,
	FOREIGN KEY(user_id) REFERENCES user(rowid)
);

-- This data is not part of the "user" table because not all users will have this filled
-- out right away.
CREATE TABLE IF NOT EXISTS user_misc_preferences
(
	user_id int,
	view_replay boolean,	-- If this is true, the user wants to view a replay instead of a live game when coaching
	twitch_name varchar,
	summoner_name varchar,
	current_rank int,
	min_coach_rank int,
	max_coachee_rank int,

	FOREIGN KEY(user_id) REFERENCES user(rowid)
);

