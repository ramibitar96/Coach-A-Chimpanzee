CREATE TABLE if not exists user
(
	user_id int PRIMARY KEY,
	summoner_id int,
	user_name varchar,
	email varchar,
	hashed_salted_password varbinary,
	password_salt varbinary
);

