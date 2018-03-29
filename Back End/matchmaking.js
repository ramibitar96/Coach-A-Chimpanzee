// Imports
const io = require('socket.io-client');

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
	return 3;
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
			var mp = new MatchedPair(students.splice(studentIndex, 1)[0], coaches.splice(highestIndex, 1)[0]);
			matchedUsers.push(mp);
			console.log("Student: " + mp.student.name);
			console.log("Coach: " + mp.coach.name);


			var socket = io.connect('http://localhost:3000');
			socket.emit('matchFound', 'asdf');
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

module.exports = {
	addStudent,
	addCoach,
	findPartner,
	User
}

let userSockets = {};   // A dictionary mapping usernames to their sockets
let socketUsers = {};   // A dictionary mapping sockets to their usernames


/*module.exports = function(io)
{
    // Called whenever a client connects to socket.io
    // Associates the socket with the user
    io.on('connection', async function(socket)
    {
    	console.log('TEST');
        // Check the session token to find out what user this is
        let cookie = cookieParser.parse(socket.handshake.headers.cookie);
        let session_token = cookie.session_token;

        let authResult = await authUtils.checkToken(session_token);

        // Don't do anything if the cookie failed
        // TODO: Send some kind of error message 
        if (authResult.error_code != ErrorCodeEnum.SUCCESS)
        {
            console.log("chatroom: error trying to authenticate token " + session_token + "\n error code " + authResult.error_code);
            return;
        }

        let username = authResult.username;

        // Associate the socket with the username
        userSockets[username] = socket;
        socketUsers[socket.id] = authResult.username;
        console.log("associated socket " + socket.id + " with username " + authResult.username);

        // When a user disconnects, remove them from both dictionaries and student/coach arrays
        socket.on('disconnect', function()
        {
            let username = socketUsers[socket.id];
            delete userSockets[username];
            delete socketUsers[socket.id];

            for (var i = 0; i < students.length; i++) {
            	if (students[i].name == username) {
            		students.splice(i, 1);
            		console.log("Student " + username + " removed from queue.");
            		break;
            	}
            }

            for (var i = 0; i < coaches.length; i++) {
            	if (coaches[i].name == username) {
            		coaches.splice(i, 1);
            		console.log("Coach " + username + " removed from queue.");
            		break;
            	}
            }
        });

        // When a user sends a message, forward it to their partner.
        socket.on('queueType', function(msg)
        {
            console.log(authResult.username + ": " + msg);

            // 0 = student, 1 = coach
            console.log("QUEUE TYPE: " + msg);

            let partnerName = findPartner(username);
            let userSocket = userSockets[username];
            let partnerSocket = userSockets[partnerName];

            let userObj =
            {
                partner: partnerName,
            };

            let partnerObj =
            {
                partner: username
            };

            userSocket.emit('partner_found', partnerObj);
            partnerSocket.emit('partner_found', userObj);
        });
    });
}*/

//test1();

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