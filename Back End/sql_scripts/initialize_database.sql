CREATE TABLE if not exists user
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
	FOREIGN KEY(student_user_id) REFERENCES user(user_id),
	FOREIGN KEY(coach_user_id) REFERENCES user(user_id)
);