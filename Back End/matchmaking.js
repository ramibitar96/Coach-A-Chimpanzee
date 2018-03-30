// Imports
const io = require('socket.io-client');
const dbUtils = require('./dbUtils.js');

var Rank = {
	Any: 0,
	Bronze: 1,
	Silver: 2,
	Gold: 3,
	Platinum: 4,
	Diamond: 5,
	Master: 6,
	Challenger: 7,
};

var Skill = {
	lasthitting: 0,
	macroplay: 1,
	mapawareness: 2,
	skillshots: 3,
	freezing: 4,
	matchups: 5,
	setup: 6,
	H: 7,
	I: 8,
	J: 9,
	K: 10,
	L: 11,
	M: 12,
	N: 13,
	O: 14,
	P: 15,
};

class MatchedPair {
	constructor(student, coach) {
		this.student = student;
		this.coach = coach;
	}
}

class User {
	constructor(name, rank, minCoachRank, maxStudentRank, rating, strengths, weaknesses) {
		this.name = name
		this.rank = rank
		this.minCoachRank = minCoachRank
		this.maxStudentRank = maxStudentRank
		this.rating = rating
		this.strengths = strengths
		this.weaknesses = weaknesses
	}
}

var matchedUsers = [];
var students = [];
var coaches = [];

// Calculates "matchmaking quotient" between a student and coach, based on 
// how many skills they have in common (strengths and weaknesses)
function calculateQuotient(student, coach) {
	if (coach.maxStudentRank < student.rank || student.minCoachRank > coach.rank) {
		return 0;
	}

	var numWeaknesses = 0;
	for (var i = 0; i < student.weaknesses.length; i++) {
		if (student.weaknesses[i] == true) {
			numWeaknesses++;
		}
	}

	var skillWeight = 10 / numWeaknesses;
	var quotient = 0;
	for (var i = 0; i < coach.strengths.length; i++) {
		if (student.weaknesses[i] == true && coach.strengths[i] == true) {
			quotient += skillWeight;
		}
	}

	return quotient;
}

// Iterates though lists of students and coaches and finds the best matches
// prioritizing position in the list
function matchUsers() {
	var studentIndex = 0;
	while (studentIndex < students.length) {
		var i = 0;
		var highestIndex = 0;
		var highestQuotient = 0;

		// Iterate through list of coaches
		while (i < coaches.length) {
			quotient = calculateQuotient(students[studentIndex], coaches[i]);
			if (quotient > highestQuotient) {
				highestQuotient = quotient;
				highestIndex = i;
			}
			i += 1;
		}

		if (highestQuotient > 0) {
			// Put them in the list of matched users
			var mp = new MatchedPair(students.splice(studentIndex, 1)[0], coaches.splice(highestIndex, 1)[0]);
			matchedUsers.push(mp);

			// Update the previous partners in the database
			dbUtils.set_previous_partners(mp.coach.name, mp.student.name);

			// Tell the user they've found a match
			var socket = io.connect('http://localhost:3000');
			socket.emit('matchFound', mp.student.name);
		} else {
			// If no match found, proceed to the next student in the list
			studentIndex += 1;
		}
	}
}

// Adds student to student array
function addStudent(student) {
	students.push(student);
	matchUsers();
}

// Adds coach to coach array
function addCoach(coach) {
	coaches.push(coach);
	matchUsers();
}

// Finds the specified user's pair by username
function findPartner(username) {
	for (var i = 0; i < matchedUsers.length; i++) {
		var student = matchedUsers[i].student;
		var coach = matchedUsers[i].coach;
		if (student.name == username) {
			return coach.name;
		} else if (coach.name == username) {
			return student.name;
		}
	}

	return null;
}

function removeMatchedPair(username) {
	for (var i = 0; i < matchedUsers.length; i++) {
		var student = matchedUsers[i].student;
		var coach = matchedUsers[i].coach;
		if (student.name == username || coach.name == username) {
			matchedUsers.splice(i, 1);
		}
	}
}

function isInQueue(username) {
	for (var i = 0; i < students.length; i++) {
		if (students[i].name == username) {
			return true;
		}
	}

	for (var i = 0; i < coaches.length; i++) {
		if (coaches[i].name == username) {
			return true;
		}
	}

	return false;
}

module.exports = {
	addStudent,
	addCoach,
	findPartner,
	removeMatchedPair,
	isInQueue,
	User
}
