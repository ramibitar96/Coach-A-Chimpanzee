$.ajax({
		type: "GET",
		url: "http://localhost:3000/get_pfp",
		success: function(data) {
			parseIdata(data);
		}
});

function parseIdata(json) {
	var json_image = json["img"];
	document["profileImage"].src = json_image;
} 

var u;
var name = "session_token=";
var ca = document.cookie.split(';');
for(var i = 0; i < ca.length; i++) {
	var c = ca[i];
	while (c.charAt(0) == ' ') {
		c = c.substring(1);
	}
	if (c.indexOf(name) == 0) {
		u = c.substring(name.length, c.length);
	}
}
search_profile(u);

function search_profile(user) {
	if (user == null || user == "") {
		return;
	}
	$.ajax({
			type: "GET",
			url: "http://localhost:3000/get_profile?user=" + user,
			success: function(data) {
				parseData(data, user);
			}
	});
}

function parseData(json, user) {
	var json_user = json["user"];

	//set name
	$(".summoner_name").text(user);

	var rank = json_user["current_rank"];
	/*
	var rank_text = "Unranked";
	if (rank == 0)			rank_text = "Bronze";
	else if (rank == 1)	rank_text = "Silver";
	else if (rank == 2)	rank_text = "Gold";
	else if (rank == 3)	rank_text = "Platinum";
	else if (rank == 4)	rank_text = "Diamond";
	else if (rank == 5)	rank_text = "Master";
	else if (rank == 6)	rank_text = "Challenger";
	*/

	$(".summoner_rank").text(rank);

	//twitch link 
	var twitch = json_user["twitch_name"];

	if (twitch != "" && twitch != null) {

		twitch = twitch.replace("http://","");
		twitch = twitch.replace("www.","");
		twitch = twitch.replace("twitch.tv/","");
		twitch = twitch.replace("/", "");

		var embed = new Twitch.Embed("twitch-embed", {
				width: "100%",
				height: 480,
				channel: twitch,
				layout: "video",
				autoplay: false
		});

		embed.addEventListener(Twitch.Embed.VIDEO_READY, () => {
			var player = embed.getPlayer();
			player.play();
		});
	}

	//clear old reviews
	$(".review-card").remove();

	var json_review = json["reviews"];
	var ratings = 0;
	var total = 0;
	for (var k in json_review) {	
		var r = json_review[k];
		ratings += r["rating"];
		total++;

		var div = "<div class='review-card row'><p class=\"review-text\">\"" + r["text"] + "\" - " + r["author"] + "</p></div>";
		$(".reviews").append(div);	
	}
	$(".summoner_rating").text("Rating: " + (ratings/total).toFixed(1));
}
