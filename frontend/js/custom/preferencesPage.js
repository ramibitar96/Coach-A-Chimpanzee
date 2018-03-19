//$('.pref-load').on('load', function() {

var hardcode = ' { "error_code": 200, "user": {"summoner_name": "ImDaBest","current_rank": 4, "twitch.tv": "https://www.twitch.tv/riotgames"},"student":{"last_hitting": true,"macro": false,"map_awareness": false,"skillshots": true,"freezing_waves": false,"matchups": false,"setup": true,"min_coach_rank": 5},"coach":{"replay": true, "last_hitting": true,"macro": false, "map_awareness": false, "skillshots": true, "freezing_waves": true,"matchups": true, "setup": false, "max_student_rank": 3 }}';

var json = JSON.parse(hardcode);
var json_user = json["user"];
var json_student = json["student"];
var json_coach = json["coach"];

var error = json["error_code"]

//set name
$("#SummonerName").val(json_user["summoner_name"]);

//set rank
$("#rank").val(json_user["current_rank"]);

//twitch link 
$("#twitch").val(json_user["twitch.tv"]);

//set student preferences
if (json_student["last_hitting"] && json_student["macro"] && json_student["map_awareness"] &&
	json_student["skillshots"] && json_student["freezing_waves"] && json_student["matchups"] &&
	json_student["setup"]) {
	//all true, set value to everything
	$("#Everything").prop("checked", true);	
	} else {
		$("#LastHitting").prop("checked", json_student["last_hitting"]);
		$("#Macro").prop("checked", json_student["macro"]);
		$("#MapAwareness").prop("checked", json_student["map_awareness"]);
		$("#Skillshots").prop("checked", json_student["skillshots"]);
		$("#Freezing").prop("checked", json_student["freezing_waves"]);
		$("#Matchups").prop("checked", json_student["matchups"]);
		$("#SetUp").prop("checked", json_student["setup"]);
}	
$("#min_rank").val(json_student["min_coach_rank"]);

//set coach preferences
if (json_coach["replay"]) {
	$("#yes_no_yes").prop("checked", true);
}
else { 
	$("#yes_no_no").prop("checked", true);
}

if (json_coach["last_hitting"] && json_coach["macro"] && json_coach["map_awareness"] &&
	json_coach["skillshots"] && json_coach["freezing_waves"] && json_coach["matchups"] &&
	json_coach["setup"]) {
	//all true, set value to everything
	$("#EverythingC").prop("checked", true);	
	} else {
		$("#LastHittingC").prop("checked", json_coach["last_hitting"]);
		$("#MacroC").prop("checked", json_coach["macro"]);
		$("#MapAwarenessC").prop("checked", json_coach["map_awareness"]);
		$("#SkillshotsC").prop("checked", json_coach["skillshots"]);
		$("#FreezingC").prop("checked", json_coach["freezing_waves"]);
		$("#MatchupsC").prop("checked", json_coach["matchups"]);
		$("#SetUpC").prop("checked", json_coach["setup"]);
}	
$("#maxStudentRank").val(json_coach["max_student_rank"]);




//});
