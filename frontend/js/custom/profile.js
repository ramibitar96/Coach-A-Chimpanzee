$.ajax({
		type: "GET",
		url: "http://localhost:3000/get_prefs",
		success: function(data) {
			parseData(data);
		}
});

function parseData(json) {
	var json_user = json["user"];

	//set name
	$(".summoner_name").text(json_user["summoner_name"]);

	var rank = json_user["current_rank"];
	var rank_text = "Unranked";
	if (rank == 0)			rank_text = "Bronze";
	else if (rank == 1)	rank_text = "Silver";
	else if (rank == 2)	rank_text = "Gold";
	else if (rank == 3)	rank_text = "Platinum";
	else if (rank == 4)	rank_text = "Diamond";
	else if (rank == 5)	rank_text = "Master";
	else if (rank == 6)	rank_text = "Challenger";

	$(".summoner_rank").text(rank_text);

	//twitch link 
	var twitch = json_user["twitch_name"];
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

$('#picUpdate').on('submit', function() {
	var pic = document.getElementById("profile_pic").value;
	alert(pic);
}