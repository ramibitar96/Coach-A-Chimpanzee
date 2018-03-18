$(".open-log").click(function() {
	var id = $(this).attr('id');
	var file = "http://127.0.0.1:3000/logs/TestUser/" + id + ".txt";
	var rawFile = new XMLHttpRequest();
	rawFile.open("GET", file, false);
	rawFile.onreadystatechange = function ()
	{
		if(rawFile.readyState === 4)
		{
			if(rawFile.status === 200 || rawFile.status == 0)
			{
				$(".log-chat").children().remove();

				var allText = rawFile.responseText;
				var lines = allText.split("\n");
				for (var i = 0; i < lines.length; i++) {
					if (lines[i] != "") {
						if (i % 2)	var text = "<p>" + lines[i] + "</p>";
						else			var text = "<p class='dark'>" + lines[i] + "</p>";
						$(".log-chat").append(text);
					}
				}
				$(".log-main").removeClass("hide");
			}
		}
	}
	rawFile.send(null);
});
