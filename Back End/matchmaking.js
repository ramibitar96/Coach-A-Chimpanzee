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

// Placeholder for testing purposes
var Skills = {
	A: 0,
	B: 1,
	C: 2,
	D: 3,
	E: 4,
	F: 5,
	G: 6,
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
	constructor(name, rank, coachRanks, studentRanks, rating, strengths, weaknesses) {
		this.name = name
		this.rank = rank
		this.coachRanks = coachRanks
		this.studentRanks = studentRanks
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
	if (coach.studentRanks.indexOf(student.rank) == -1 || student.coachRanks.indexOf(coach.rank) == -1) {
		return 0;
	}

	var skillWeight = 10 / student.weaknesses.length;
	var quotient = 0;
	for (var i = 0; i < coach.strengths.length; i++) {
		if (student.weaknesses.indexOf(coach.strengths[i]) != -1) {
			quotient += skillWeight;
		}
	}

	return quotient;
}

// Iterates though lists of students and coaches and finds the best matches
// prioritizing position in the list
function matchUsers(students, coaches) {
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
			var mp = new MatchedPair(students.splice(studentIndex, 1)[0], coaches.splice(highestIndex, 1)[0]);
			matchedUsers.push(mp);
			//console.log("Student: " + students.splice(studentIndex, 1)[0].name);
			//console.log("Coach: " + coaches.splice(highestIndex, 1)[0].name);
			//console.log("Quotient: " + highestQuotient);
			//console.log('\n');
		} else {
			// If no match found, proceed to the next student in the list
			studentIndex += 1;
		}
	}
}

// Adds student to student array
function addStudent(student) {
	students.push(student);
}

// Adds coach to coach array
function addCoach(coach) {
	coaches.push(coach);
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

module.exports = {
	addStudent,
	addCoach,
	findPartner
}

test1();

// Test cases
function test1() {
	let s1 = new User("Draven", Rank.Gold, [Rank.Platinum, Rank.Diamond, Rank.Master, Rank.Challenger], [], 0.9, [],
		[Skills.F, Skills.G, Skills.E, Skills.H, Skills.I]);
	let s2 = new User("Jinx", Rank.Bronze, [Rank.Diamond, Rank.Master, Rank.Challenger], [], 0.9, [],
		[Skills.F, Skills.G, Skills.E, Skills.H, Skills.I]);
	let s3 = new User("Lucian", Rank.Silver, [Rank.Gold, Rank.Diamond, Rank.Master, Rank.Challenger], [], 0.9, [],
		[Skills.F, Skills.G, Skills.E, Skills.H, Skills.I]);
	let s4 = new User("Vayne", Rank.Bronze, [Rank.Diamond, Rank.Master, Rank.Challenger], [], 0.9, [],
		[Skills.F, Skills.G, Skills.E, Skills.H, Skills.I]);
	let s5 = new User("Varus", Rank.Platinum, [Rank.Platinum, Rank.Diamond, Rank.Master, Rank.Challenger], [], 0.9, [],
		[Skills.F, Skills.G, Skills.E, Skills.H, Skills.I]);

	let c1 = new User("Thresh", Rank.Diamond, [], [Rank.Gold], 0.9, [Skills.A, Skills.F], []);
	let c2 = new User("Blitzcrank", Rank.Platinum, [], [Rank.Bronze, Rank.Silver, Rank.Gold], 0.9, [Skills.A, Skills.F], []);
	let c3 = new User("Leona", Rank.Challenger, [], [Rank.Bronze, Rank.Silver, Rank.Gold], 0.9, [Skills.A, Skills.B, Skills.C, Skills.D, Skills.E, Skills.F], []);
	let c4 = new User("Braum", Rank.Master, [], [Rank.Gold], 0.9, [Skills.A, Skills.F], []);
	let c5 = new User("Janna", Rank.Diamond, [], [Rank.Bronze, Rank.Gold], 0.9, [Skills.A, Skills.F], []);

	students.push(s1);
	students.push(s2);
	students.push(s3);
	students.push(s4);
	students.push(s5);

	coaches.push(c1);
	coaches.push(c2);
	coaches.push(c3);
	coaches.push(c4);
	coaches.push(c5);

	console.log("Test Case 1:");
	matchUsers(students, coaches);

	console.log(findPartner("Draven"));
	console.log(findPartner("Leona"));
	console.log(findPartner("Jinx"));
	console.log(findPartner("Janna"));
}