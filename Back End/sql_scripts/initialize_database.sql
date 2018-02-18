CREATE TABLE IF NOT EXISTS user
(
	user_id int PRIMARY KEY,
	summoner_id int,
	user_name varchar,
	email varchar,
	hashed_salted_password varbinary,
	password_salt varbinary
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
	FOREIGN KEY(student_user_id) REFERENCES user(user_id),
	FOREIGN KEY(coach_user_id) REFERENCES user(user_id)
);

