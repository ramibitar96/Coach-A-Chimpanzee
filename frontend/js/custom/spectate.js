var key;
var platformId;
var summonerId;
var link;

function serveFile(k, p, s) {
	key = k;
	platformId = p;
	summonerId = s;
	
	if (platformId == "NA1") {
		link = "spectator.na2.lol.riotgames.com:80";	
	}

	var file = "/spectate?key=" + key +
		"?platformId=" + platformId +
		"?summonerId=" + summonerId;

	$("#download").attr("href",file)
	serveMac();
}

function serveMac() {
	var text = 'cd /Applications/League\\ of\\ Legends.app/Contents/LoL/RADS/solutions/lol_game_client_sln/releases/ && cd $(ls -1vr -d */ | head -1) && cd deploy && chmod +x ./LeagueofLegends.app/Contents/MacOS/LeagueofLegends && riot_launched=true ./LeagueofLegends.app/Contents/MacOS/LeagueofLegends 8394 LoLLauncher "" "spectator ' + link + ' ' + key + ' ' + summonerId + ' ' + platformId + '"';

	$("#serveMac").text(text);
}

function serveWindows() {	
	var d = document.getElementById("download");
	//set file location
	d.href = "../img/minimap.jpg";
	d.click();
}
