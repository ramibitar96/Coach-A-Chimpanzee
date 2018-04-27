--primary key is rowid
CREATE TABLE IF NOT EXISTS user
(
	summoner_id int,
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

CREATE TABLE IF NOT EXISTS coach_reviews
(
	student_user_id int,
	coach_user_id int,
	review_date datetime,

	rating int,
	review_text varchar,

	FOREIGN KEY(student_user_id) REFERENCES user(user_id),
	FOREIGN KEY(coach_user_id) REFERENCES user(user_id)
);

CREATE TABLE IF NOT EXISTS chat_session
(
	user1_id int,
	user2_id int,
	creation_time datetime,
	log varchar,
	draw_log varchar,	-- A JSON array converted to a string
	game_data varchar,	-- A JSON object converted to a string

	FOREIGN KEY(user1_id) REFERENCES user(user_id)
	FOREIGN KEY(user2_id) REFERENCES user(user_id)
);

-- Every so often, this table will need to be updated using the above table.
CREATE TABLE IF NOT EXISTS cached_rating_total
(
	coach_user_id int PRIMARY KEY,
	total_rating int,
	FOREIGN KEY(coach_user_id) REFERENCES user(user_id)
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
	min_coach_rank int,
	max_coachee_rank int,

	previous_partner_id int, -- The last student/coach this user was matched with.

	FOREIGN KEY(user_id) REFERENCES user(rowid),
	FOREIGN KEY(previous_partner_id) REFERENCES user(rowid)
);

