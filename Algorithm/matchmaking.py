import queue
from enum import Enum

class Rank(Enum):
	Any = 0
	Bronze = 1
	Silver = 2
	Gold = 3
	Platinum = 4
	Diamond = 5
	Master = 6
	Challenger = 7

# Placeholder for testing purposes
class Skills(Enum):
	A = 0
	B = 1
	C = 2
	D = 3
	E = 4
	F = 5
	G = 6
	H = 7
	I = 8
	J = 9
	K = 10
	L = 11
	M = 12
	N = 13
	O = 14
	P = 15

class Skill(Enum):
	lasthitting = 0
	macroplay = 1
	mapawareness = 2
	skillshots = 3
	freezing = 4
	matchups = 5
	setup = 6
	H = 7
	I = 8
	J = 9
	K = 10
	L = 11
	M = 12
	N = 13
	O = 14
	P = 15

class User:
	def __init__(self, name, rank, coachRanks, studentRanks, rating, strengths, weaknesses):
		self.name = name
		self.rank = rank
		self.coachRanks = coachRanks
		self.studentRanks = studentRanks
		self.rating = rating
		self.strengths = strengths
		self.weaknesses = weaknesses

# Calculates "matchmaking quotient" between a student and coach, based on 
# how many skills they have in common (strengths and weaknesses)
def calculateQuotient(student, coach):
	if (student.rank not in coach.studentRanks or coach.rank not in student.coachRanks):
		return 0
	skillWeight = 10 / len(student.weaknesses)
	quotient = 0
	for skill in coach.strengths:
		if (skill in student.weaknesses):
			quotient += skillWeight

	return quotient

# Iterates though lists of students and coaches and finds the best matches
# prioritizing position in the list
def matchUsers(studentList, coachList):
	studentIndex = 0
	while (studentIndex < len(studentList)):
		i = 0
		highestIndex = 0
		highestQuotient = 0

		# Iterate through list of coaches
		while (i < len(coachList)):
			quotient = calculateQuotient(studentList[studentIndex], coachList[i])
			if (quotient > highestQuotient):
				highestQuotient = quotient
				highestIndex = i
			i += 1

		if (highestQuotient > 0):
			print("Student: " + studentList.pop(studentIndex).name)
			print("Coach: " + coachList.pop(highestIndex).name)
			print("Quotient: " + str(highestQuotient))
			print('\n')
		else:
			# If no match found, proceed to the next student in the list
			studentIndex += 1

def main():
	test1()
	test2()
	test3()
	test4()
	test5()

# Test cases
def test1():
	s1 = User("Draven", Rank.Gold, [Rank.Platinum, Rank.Diamond, Rank.Master, Rank.Challenger], [], 0.9, [],
		[Skills.F, Skills.G, Skills.E, Skills.H, Skills.I])
	s2 = User("Jinx", Rank.Bronze, [Rank.Diamond, Rank.Master, Rank.Challenger], [], 0.9, [],
		[Skills.F, Skills.G, Skills.E, Skills.H, Skills.I])
	s3 = User("Lucian", Rank.Silver, [Rank.Gold, Rank.Diamond, Rank.Master, Rank.Challenger], [], 0.9, [],
		[Skills.F, Skills.G, Skills.E, Skills.H, Skills.I])
	s4 = User("Vayne", Rank.Bronze, [Rank.Diamond, Rank.Master, Rank.Challenger], [], 0.9, [],
		[Skills.F, Skills.G, Skills.E, Skills.H, Skills.I])
	s5 = User("Varus", Rank.Platinum, [Rank.Platinum, Rank.Diamond, Rank.Master, Rank.Challenger], [], 0.9, [],
		[Skills.F, Skills.G, Skills.E, Skills.H, Skills.I])

	c1 = User("Thresh", Rank.Diamond, [], [Rank.Gold], 0.9, [Skills.A, Skills.F], [])
	c2 = User("Blitzcrank", Rank.Platinum, [], [Rank.Bronze, Rank.Silver, Rank.Gold], 0.9, [Skills.A, Skills.F], [])
	c3 = User("Leona", Rank.Challenger, [], [Rank.Bronze, Rank.Silver, Rank.Gold], 0.9, [Skills.A, Skills.B, Skills.C, Skills.D, Skills.E, Skills.F], [])
	c4 = User("Braum", Rank.Master, [], [Rank.Gold], 0.9, [Skills.A, Skills.F], [])
	c5 = User("Janna", Rank.Diamond, [], [Rank.Bronze, Rank.Gold], 0.9, [Skills.A, Skills.F], [])

	studentList = []
	studentList.append(s1)
	studentList.append(s2)
	studentList.append(s3)
	studentList.append(s4)
	studentList.append(s5)

	coachList = []
	coachList.append(c1)
	coachList.append(c2)
	coachList.append(c3)
	coachList.append(c4)
	coachList.append(c5)

	print("Test Case 1:")
	matchUsers(studentList, coachList)

def test2():
	s1 = User("Draven", Rank.Gold, [Rank.Platinum, Rank.Diamond, Rank.Master, Rank.Challenger], [], 0.9, [],
		[Skills.F, Skills.A, Skills.D, Skills.B, Skills.I])
	s2 = User("Jinx", Rank.Bronze, [Rank.Diamond, Rank.Master, Rank.Challenger], [], 0.9, [],
		[Skills.F, Skills.G, Skills.E, Skills.C, Skills.A])
	s3 = User("Lucian", Rank.Silver, [Rank.Gold, Rank.Diamond, Rank.Master, Rank.Challenger], [], 0.9, [],
		[Skills.F, Skills.B, Skills.E, Skills.H, Skills.I])
	s4 = User("Vayne", Rank.Bronze, [Rank.Master, Rank.Challenger], [], 0.9, [],
		[Skills.B, Skills.G, Skills.E, Skills.H, Skills.I])
	s5 = User("Varus", Rank.Platinum, [Rank.Platinum, Rank.Diamond, Rank.Master, Rank.Challenger], [], 0.9, [],
		[Skills.F, Skills.G, Skills.E, Skills.H, Skills.C])

	c1 = User("Thresh", Rank.Challenger, [], [Rank.Gold], 0.9, [Skills.A, Skills.B, Skills.C, Skills.D, Skills.E, Skills.F], [])
	c2 = User("Blitzcrank", Rank.Challenger, [], [Rank.Bronze, Rank.Silver, Rank.Gold], 0.9, [Skills.A, Skills.B, Skills.C, Skills.D, Skills.E, Skills.F], [])
	c3 = User("Leona", Rank.Challenger, [], [Rank.Bronze, Rank.Silver, Rank.Gold], 0.9, [Skills.A, Skills.B, Skills.C, Skills.D, Skills.E, Skills.F], [])
	c4 = User("Braum", Rank.Challenger, [], [Rank.Bronze, Rank.Silver, Rank.Gold, Rank.Platinum], 0.9, [Skills.A, Skills.B, Skills.C, Skills.D, Skills.E, Skills.F], [])
	c5 = User("Janna", Rank.Challenger, [], [Rank.Bronze, Rank.Silver, Rank.Gold], 0.9, [Skills.A, Skills.B, Skills.C, Skills.D, Skills.E, Skills.F], [])

	studentList = []
	studentList.append(s1)
	studentList.append(s2)
	studentList.append(s3)
	studentList.append(s4)
	studentList.append(s5)

	coachList = []
	coachList.append(c1)
	coachList.append(c2)
	coachList.append(c3)
	coachList.append(c4)
	coachList.append(c5)

	print("Test Case 2:")
	matchUsers(studentList, coachList)

def test3():
	s1 = User("Draven", Rank.Gold, [Rank.Platinum, Rank.Diamond, Rank.Master, Rank.Challenger], [], 0.9, [],
		[Skills.F, Skills.G, Skills.E, Skills.H, Skills.I])
	s2 = User("Jinx", Rank.Bronze, [Rank.Diamond, Rank.Master, Rank.Challenger], [], 0.9, [],
		[Skills.F, Skills.G, Skills.E, Skills.H, Skills.I])
	s3 = User("Lucian", Rank.Silver, [Rank.Gold, Rank.Diamond, Rank.Master, Rank.Challenger], [], 0.9, [],
		[Skills.F, Skills.G, Skills.E, Skills.H, Skills.I])
	s4 = User("Vayne", Rank.Bronze, [Rank.Master, Rank.Challenger], [], 0.9, [],
		[Skills.F, Skills.G, Skills.E, Skills.H, Skills.I])
	s5 = User("Varus", Rank.Platinum, [Rank.Platinum, Rank.Diamond, Rank.Master, Rank.Challenger], [], 0.9, [],
		[Skills.F, Skills.G, Skills.E, Skills.H, Skills.I])

	c1 = User("Thresh", Rank.Diamond, [], [Rank.Gold], 0.9, [Skills.A, Skills.F], [])
	c2 = User("Blitzcrank", Rank.Platinum, [], [Rank.Bronze, Rank.Silver, Rank.Gold], 0.9, [Skills.A, Skills.F], [])
	c3 = User("Leona", Rank.Challenger, [], [Rank.Bronze, Rank.Silver, Rank.Gold], 0.9, [Skills.A, Skills.F], [])
	c4 = User("Braum", Rank.Master, [], [Rank.Gold], 0.9, [Skills.A, Skills.F], [])
	c5 = User("Janna", Rank.Diamond, [], [Rank.Gold], 0.9, [Skills.A, Skills.F], [])

	studentList = []
	studentList.append(s1)
	studentList.append(s2)
	studentList.append(s3)
	studentList.append(s4)
	studentList.append(s5)

	coachList = []
	coachList.append(c1)
	coachList.append(c2)
	coachList.append(c3)
	coachList.append(c4)
	coachList.append(c5)

	print("Test Case 3:")
	matchUsers(studentList, coachList)

def test4():
	s1 = User("Draven", Rank.Gold, [Rank.Platinum, Rank.Diamond, Rank.Master, Rank.Challenger], [], 0.9, [],
		[Skills.F, Skills.G, Skills.E, Skills.H, Skills.I])
	s2 = User("Jinx", Rank.Bronze, [Rank.Diamond, Rank.Master, Rank.Challenger], [], 0.9, [],
		[Skills.F, Skills.G, Skills.E, Skills.H, Skills.I])
	s3 = User("Lucian", Rank.Silver, [Rank.Gold, Rank.Diamond, Rank.Master, Rank.Challenger], [], 0.9, [],
		[Skills.F, Skills.G, Skills.E, Skills.H, Skills.I])
	s4 = User("Vayne", Rank.Bronze, [Rank.Master, Rank.Challenger], [], 0.9, [],
		[Skills.F, Skills.G, Skills.E, Skills.H, Skills.I])
	s5 = User("Varus", Rank.Platinum, [Rank.Platinum, Rank.Diamond, Rank.Master, Rank.Challenger], [], 0.9, [],
		[Skills.F, Skills.G, Skills.E, Skills.H, Skills.I])

	c1 = User("Thresh", Rank.Diamond, [], [Rank.Gold], 0.9, [Skills.A, Skills.F], [])
	c2 = User("Blitzcrank", Rank.Platinum, [], [Rank.Bronze, Rank.Silver, Rank.Gold], 0.9, [Skills.A, Skills.F], [])
	c3 = User("Leona", Rank.Challenger, [], [Rank.Bronze, Rank.Silver, Rank.Gold], 0.9, [Skills.A, Skills.F], [])
	c4 = User("Braum", Rank.Master, [], [Rank.Gold], 0.9, [Skills.A, Skills.F], [])
	c5 = User("Janna", Rank.Diamond, [], [Rank.Gold], 0.9, [Skills.A, Skills.F], [])

	studentList = []
	studentList.append(s1)
	studentList.append(s2)
	studentList.append(s3)
	studentList.append(s4)
	studentList.append(s5)

	coachList = []
	coachList.append(c1)
	coachList.append(c2)
	coachList.append(c3)
	coachList.append(c4)
	coachList.append(c5)

	print("Test Case 4:")
	matchUsers(studentList, coachList)

def test5():
	s1 = User("Draven", Rank.Gold, [Rank.Platinum, Rank.Diamond, Rank.Master, Rank.Challenger], [], 0.9, [],
		[Skills.F, Skills.G, Skills.E, Skills.H, Skills.I])
	s2 = User("Jinx", Rank.Bronze, [Rank.Diamond, Rank.Master, Rank.Challenger], [], 0.9, [],
		[Skills.F, Skills.G, Skills.E, Skills.H, Skills.I])
	s3 = User("Lucian", Rank.Silver, [Rank.Gold, Rank.Diamond, Rank.Master, Rank.Challenger], [], 0.9, [],
		[Skills.F, Skills.G, Skills.E, Skills.H, Skills.I])
	s4 = User("Vayne", Rank.Bronze, [Rank.Master, Rank.Challenger], [], 0.9, [],
		[Skills.F, Skills.G, Skills.E, Skills.H, Skills.I])
	s5 = User("Varus", Rank.Platinum, [Rank.Platinum, Rank.Diamond, Rank.Master, Rank.Challenger], [], 0.9, [],
		[Skills.F, Skills.G, Skills.E, Skills.H, Skills.I])

	c1 = User("Thresh", Rank.Diamond, [], [Rank.Gold], 0.9, [Skills.A, Skills.F], [])
	c2 = User("Blitzcrank", Rank.Platinum, [], [Rank.Bronze, Rank.Silver, Rank.Gold], 0.9, [Skills.A, Skills.F], [])
	c3 = User("Leona", Rank.Challenger, [], [Rank.Bronze, Rank.Silver, Rank.Gold], 0.9, [Skills.A, Skills.F], [])
	c4 = User("Braum", Rank.Master, [], [Rank.Gold], 0.9, [Skills.A, Skills.F], [])
	c5 = User("Janna", Rank.Diamond, [], [Rank.Gold], 0.9, [Skills.A, Skills.F], [])

	studentList = []
	studentList.append(s1)
	studentList.append(s2)
	studentList.append(s3)
	studentList.append(s4)
	studentList.append(s5)

	coachList = []
	coachList.append(c1)
	coachList.append(c2)
	coachList.append(c3)
	coachList.append(c4)
	coachList.append(c5)

	print("Test Case 5:")
	matchUsers(studentList, coachList)

if (__name__ == "__main__"):
	main()