$.ajax({
		type: "GET",
		url: "http://localhost:3000/get_prefs",
		success: function(data) {
			parseData(data);
		}
});

function parseData(json) {
	var json_user = json["user"];
	var json_student = json["student"];
	var json_coach = json["coach"];

	var error = json["error_code"]

	//set name //$("#SummonerName").val(json_user["summoner_name"]);

	//set rank
	//$("#rank").val(json_user["current_rank"]);

	//twitch link 
	$("#twitch").val(json_user["twitch_name"]);

	//set student preferences
	if (json_student["skills"][0]) {
		$("#Everything").prop("checked", true);	
	} else {
		$("#LastHitting").prop("checked", json_student["skills"][1]);
		$("#Macro").prop("checked", json_student["skills"][2]);
		$("#MapAwareness").prop("checked", json_student["skills"][3]);
		$("#Skillshots").prop("checked", json_student["skills"][4]);
		$("#Freezing").prop("checked", json_student["skills"][5]);
		$("#Matchups").prop("checked", json_student["skills"][6]);
		$("#SetUp").prop("checked", json_student["skills"][7]);
	}	
	$("#min_rank").val(json_student["min_coach_rank"]);
	//set coach preferences
	if (json_coach["view_replay"]) {
		$("#yes_no_yes").prop("checked", true);
	}
	else { 
		$("#yes_no_no").prop("checked", true);
	}

	if (json_coach["skills"][0]) {
		$("#EverythingC").prop("checked", true);
	} else {
		$("#LastHittingC").prop("checked", json_coach["skills"][1]);
		$("#MacroC").prop("checked", json_coach["skills"][2]);
		$("#MapAwarenessC").prop("checked", json_coach["skills"][3]);
		$("#SkillshotsC").prop("checked", json_coach["skills"][4]);
		$("#FreezingC").prop("checked", json_coach["skills"][5]);
		$("#MatchupsC").prop("checked", json_coach["skills"][6]);
		$("#SetUpC").prop("checked", json_coach["skills"][7]);
	}	
	$("#maxStudentRank").val(json_coach["max_coachee_rank"]);
}

$('#savePreferences').on('submit', function() {

	//var name = document.getElementById("SummonerName").value;
	//var rank = document.getElementById("rank").value;
	var twitch = document.getElementById("twitch").value;

	var user =
		'"user": {' +
		'"twitch_name":"' + twitch + '"' +
		//'"summoner_name":"' + name + '",' +
		//'"current_rank":' + rank +
		'},';


	var s0 = document.getElementById("Everything").checked;
	var s1 = document.getElementById("LastHitting").checked;
	var s2 = document.getElementById("Macro").checked;
	var s3 = document.getElementById("MapAwareness").checked;
	var s4 = document.getElementById("Skillshots").checked;
	var s5 = document.getElementById("Freezing").checked;
	var s6 = document.getElementById("Matchups").checked;
	var s7 = document.getElementById("SetUp").checked;
	var rank_S = document.getElementById("min_rank").value;
	if (rank_S == "") rank_S = 3;

	var student = 
		'"student": {' +
		'"skills":[' + s0 + ',' + s1 + ',' + s2 + ',' + s3 + ',' + s4 + ',' + s5 + ',' + s6 + ',' + s7 + '],' +
		'"min_coach_rank":' + rank_S +
		'},';

	if (document.getElementById("yes_no_yes").checked) {
		var replay = true;
	} else {
		var replay = false;
	}
	var c0 = document.getElementById("EverythingC").checked;
	var c1 = document.getElementById("LastHittingC").checked;
	var c2 = document.getElementById("MacroC").checked;
	var c3 = document.getElementById("MapAwarenessC").checked;
	var c4 = document.getElementById("SkillshotsC").checked;
	var c5 = document.getElementById("FreezingC").checked;
	var c6 = document.getElementById("MatchupsC").checked;
	var c7 = document.getElementById("SetUpC").checked;
	var rank_C = document.getElementById("maxStudentRank").value;
	if (rank_C == "") rank_C = 3;

	var coach = 
		'"coach": {' +
		'"view_replay":' + replay + ',' +
		'"skills":[' + c0 + ',' + c1 + ',' + c2 + ',' + c3 + ',' + c4 + ',' + c5 + ',' + c6 + ',' + c7 + '],' +
		'"max_coachee_rank":' + rank_C +
		'}';

	var body = '{' + user + student + coach + '}';
	//alert(body);

	$.ajax({
			type: "POST",
			url: "http://localhost:3000/set_prefs",
			contentType: 'application/json',
			processData: false,
			async: false,
			data: body,
			success: function (data){
				//alert(data["error_code"]);
			}
	});
});
