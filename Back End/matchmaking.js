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
function matchUsers(studentList, coachList) {
	var studentIndex = 0;
	while (studentIndex < studentList.length) {
		var i = 0;
		var highestIndex = 0;
		var highestQuotient = 0;

		// Iterate through list of coaches
		while (i < coachList.length) {
			quotient = calculateQuotient(studentList[studentIndex], coachList[i]);
			if (quotient > highestQuotient) {
				highestQuotient = quotient;
				highestIndex = i;
			}
			i += 1;
		}

		if (highestQuotient > 0) {
			var mp = new MatchedPair(studentList.splice(studentIndex, 1)[0], coachList.splice(highestIndex, 1)[0]);
			matchedUsers.push(mp);
			//console.log("Student: " + studentList.splice(studentIndex, 1)[0].name);
			//console.log("Coach: " + coachList.splice(highestIndex, 1)[0].name);
			//console.log("Quotient: " + highestQuotient);
			//console.log('\n');
		} else {
			// If no match found, proceed to the next student in the list
			studentIndex += 1;
		}
	}
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

	var studentList = [];
	studentList.push(s1);
	studentList.push(s2);
	studentList.push(s3);
	studentList.push(s4);
	studentList.push(s5);

	var coachList = [];
	coachList.push(c1);
	coachList.push(c2);
	coachList.push(c3);
	coachList.push(c4);
	coachList.push(c5);

	console.log("Test Case 1:");
	matchUsers(studentList, coachList);

	console.log(findPartner("Draven"));
	console.log(findPartner("Leona"));
	console.log(findPartner("Jinx"));
	console.log(findPartner("Janna"));
}