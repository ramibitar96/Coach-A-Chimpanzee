function parseGame(data) {
	var json = JSON.parse(data);
	alert(json["gameId"]);
	//alert("data received");
}

function testParse() {
	var example = '{"seasonId":11,"queueId":420,"gameId":2770683953,"participantIdentities":[{"player":{"currentPlatformId":"NA1","summonerName":"LMQtcMor","matchHistoryUri":"/v1/stats/player_history/NA/39227327","platformId":"NA","currentAccountId":39227327,"profileIcon":667,"summonerId":24777351,"accountId":39227327},"participantId":1},{"player":{"currentPlatformId":"NA1","summonerName":"etrianodysey","matchHistoryUri":"/v1/stats/player_history/NA1/243809763","platformId":"NA1","currentAccountId":243809763,"profileIcon":28,"summonerId":91451619,"accountId":243809763},"participantId":2},{"player":{"currentPlatformId":"NA1","summonerName":"Morïarty","matchHistoryUri":"/v1/stats/player_history/NA/33689527","platformId":"NA","currentAccountId":33689527,"profileIcon":7,"summonerId":20636732,"accountId":33689527},"participantId":3},{"player":{"currentPlatformId":"NA1","summonerName":"Sothis","matchHistoryUri":"/v1/stats/player_history/NA/31918674","platformId":"NA","currentAccountId":31918674,"profileIcon":527,"summonerId":19224197,"accountId":31918674},"participantId":4},{"player":{"currentPlatformId":"NA1","summonerName":"PatriarchMeng","matchHistoryUri":"/v1/stats/player_history/NA/37136701","platformId":"NA","currentAccountId":37136701,"profileIcon":1645,"summonerId":23133794,"accountId":37136701},"participantId":5},{"player":{"currentPlatformId":"NA1","summonerName":"huhi","matchHistoryUri":"/v1/stats/player_history/NA1/223306587","platformId":"NA1","currentAccountId":223306587,"profileIcon":744,"summonerId":61542283,"accountId":223306587},"participantId":6},{"player":{"currentPlatformId":"NA1","summonerName":"CLGReignover","matchHistoryUri":"/v1/stats/player_history/NA1/243451127","platformId":"NA1","currentAccountId":243451127,"profileIcon":3231,"summonerId":91429107,"accountId":243451127},"participantId":7},{"player":{"currentPlatformId":"NA1","summonerName":"C9Sneaky","matchHistoryUri":"/v1/stats/player_history/NA/78247","platformId":"NA","currentAccountId":78247,"profileIcon":3376,"summonerId":51405,"accountId":78247},"participantId":8},{"player":{"currentPlatformId":"NA1","summonerName":"IsidorekNgK","matchHistoryUri":"/v1/stats/player_history/NA1/242334496","platformId":"NA1","currentAccountId":242334496,"profileIcon":22,"summonerId":90342731,"accountId":242334496},"participantId":9},{"player":{"currentPlatformId":"NA1","summonerName":"Belikeł3imbi","matchHistoryUri":"/v1/stats/player_history/NA1/50394859","platformId":"NA1","currentAccountId":50394859,"profileIcon":21,"summonerId":35794758,"accountId":50394859},"participantId":10}],"gameVersion":"8.8.226.7254","platformId":"NA1","gameMode":"CLASSIC","mapId":11,"gameType":"MATCHED_GAME","teams":[{"firstDragon":true,"bans":[{"pickTurn":1,"championId":245},{"pickTurn":2,"championId":105},{"pickTurn":3,"championId":51},{"pickTurn":4,"championId":121},{"pickTurn":5,"championId":136}],"firstInhibitor":false,"win":"Fail","firstRiftHerald":false,"firstBaron":true,"baronKills":2,"riftHeraldKills":0,"firstBlood":true,"teamId":100,"firstTower":false,"vilemawKills":0,"inhibitorKills":1,"towerKills":10,"dominionVictoryScore":0,"dragonKills":2},{"firstDragon":false,"bans":[{"pickTurn":6,"championId":142},{"pickTurn":7,"championId":164},{"pickTurn":8,"championId":27},{"pickTurn":9,"championId":48},{"pickTurn":10,"championId":69}],"firstInhibitor":true,"win":"Win","firstRiftHerald":true,"firstBaron":false,"baronKills":1,"riftHeraldKills":1,"firstBlood":false,"teamId":200,"firstTower":true,"vilemawKills":0,"inhibitorKills":3,"towerKills":9,"dominionVictoryScore":0,"dragonKills":3}],"participants":[{"stats":{"neutralMinionsKilledTeamJungle":0,"visionScore":102,"magicDamageDealtToChampions":7693,"largestMultiKill":1,"totalTimeCrowdControlDealt":2010,"longestTimeSpentLiving":655,"perk1Var1":1451,"perk1Var3":0,"perk1Var2":0,"tripleKills":0,"perk5":8316,"perk4":8304,"playerScore9":0,"playerScore8":0,"kills":3,"playerScore1":0,"playerScore0":0,"playerScore3":0,"playerScore2":0,"playerScore5":0,"playerScore4":0,"playerScore7":0,"playerScore6":0,"perk5Var1":1435,"perk5Var3":0,"perk5Var2":0,"totalScoreRank":0,"neutralMinionsKilled":0,"damageDealtToTurrets":812,"physicalDamageDealtToChampions":1646,"damageDealtToObjectives":1983,"perk2Var2":0,"perk2Var3":0,"totalUnitsHealed":7,"perk2Var1":1468,"perk4Var1":9,"totalDamageTaken":43849,"perk4Var3":0,"wardsKilled":11,"largestCriticalStrike":0,"largestKillingSpree":2,"quadraKills":0,"magicDamageDealt":21177,"firstBloodAssist":false,"item2":3401,"item3":3060,"item0":3107,"item1":3190,"item6":3364,"item4":3194,"item5":3047,"perk1":8473,"perk0":8465,"perk3":8453,"perk2":8444,"perk3Var3":0,"perk3Var2":1038,"perk3Var1":870,"damageSelfMitigated":53953,"magicalDamageTaken":24008,"perk0Var2":0,"firstInhibitorKill":false,"trueDamageTaken":3999,"assists":20,"perk4Var2":0,"goldSpent":14350,"trueDamageDealt":171082,"participantId":1,"physicalDamageDealt":11658,"sightWardsBoughtInGame":0,"totalDamageDealtToChampions":11276,"physicalDamageTaken":15841,"totalPlayerScore":0,"win":false,"objectivePlayerScore":0,"totalDamageDealt":203917,"neutralMinionsKilledEnemyJungle":0,"deaths":11,"wardsPlaced":66,"perkPrimaryStyle":8400,"perkSubStyle":8300,"turretKills":3,"firstBloodKill":true,"trueDamageDealtToChampions":1936,"goldEarned":15488,"killingSprees":1,"unrealKills":0,"firstTowerAssist":false,"firstTowerKill":false,"champLevel":17,"doubleKills":0,"inhibitorKills":0,"firstInhibitorAssist":false,"perk0Var1":5832,"combatPlayerScore":0,"perk0Var3":0,"visionWardsBoughtInGame":14,"pentaKills":0,"totalHeal":6371,"totalMinionsKilled":102,"timeCCingOthers":46},"spell1Id":4,"participantId":1,"highestAchievedSeasonTier":"DIAMOND","spell2Id":14,"teamId":100,"timeline":{"lane":"BOTTOM","participantId":1,"goldPerMinDeltas":{"30-end":262.73333333333335,"20-30":386.4,"0-10":240.2,"10-20":326.6},"creepsPerMinDeltas":{"30-end":1.6666666666666667,"20-30":3.2,"0-10":1.4,"10-20":1.8},"xpPerMinDeltas":{"30-end":328.73333333333335,"20-30":509.90000000000003,"0-10":304.9,"10-20":341.4},"role":"SOLO","damageTakenPerMinDeltas":{"30-end":1021.4,"20-30":861.9000000000001,"0-10":293.7,"10-20":918.2}},"championId":201},{"stats":{"neutralMinionsKilledTeamJungle":34,"visionScore":35,"magicDamageDealtToChampions":10297,"largestMultiKill":2,"totalTimeCrowdControlDealt":360,"longestTimeSpentLiving":653,"perk1Var1":5198,"perk1Var3":0,"perk1Var2":10754,"tripleKills":0,"perk5":8236,"perk4":8233,"playerScore9":0,"playerScore8":0,"kills":8,"playerScore1":0,"playerScore0":0,"playerScore3":0,"playerScore2":0,"playerScore5":0,"playerScore4":0,"playerScore7":0,"playerScore6":0,"perk5Var1":48,"perk5Var3":0,"perk5Var2":0,"totalScoreRank":0,"neutralMinionsKilled":50,"damageDealtToTurrets":3626,"physicalDamageDealtToChampions":20282,"damageDealtToObjectives":24431,"perk2Var2":40,"perk2Var3":0,"totalUnitsHealed":3,"perk2Var1":13,"perk4Var1":34,"totalDamageTaken":31299,"perk4Var3":0,"wardsKilled":7,"largestCriticalStrike":959,"largestKillingSpree":3,"quadraKills":0,"magicDamageDealt":68953,"firstBloodAssist":false,"item2":3006,"item3":3124,"item0":3115,"item1":3139,"item6":3363,"item4":3812,"item5":3156,"perk1":9101,"perk0":8008,"perk3":8014,"perk2":9103,"perk3Var3":0,"perk3Var2":0,"perk3Var1":756,"damageSelfMitigated":40152,"magicalDamageTaken":14226,"perk0Var2":30,"firstInhibitorKill":false,"trueDamageTaken":7124,"assists":6,"perk4Var2":0,"goldSpent":23005,"trueDamageDealt":3802,"participantId":2,"physicalDamageDealt":286547,"sightWardsBoughtInGame":0,"totalDamageDealtToChampions":31270,"physicalDamageTaken":9948,"totalPlayerScore":0,"win":false,"objectivePlayerScore":0,"totalDamageDealt":359303,"neutralMinionsKilledEnemyJungle":6,"deaths":8,"wardsPlaced":18,"perkPrimaryStyle":8000,"perkSubStyle":8200,"turretKills":2,"firstBloodKill":false,"trueDamageDealtToChampions":690,"goldEarned":21980,"killingSprees":2,"unrealKills":0,"firstTowerAssist":false,"firstTowerKill":false,"champLevel":18,"doubleKills":1,"inhibitorKills":0,"firstInhibitorAssist":false,"perk0Var1":2,"combatPlayerScore":0,"perk0Var3":0,"visionWardsBoughtInGame":1,"pentaKills":0,"totalHeal":9718,"totalMinionsKilled":363,"timeCCingOthers":3},"spell1Id":7,"participantId":2,"highestAchievedSeasonTier":"UNRANKED","spell2Id":4,"teamId":100,"timeline":{"lane":"MIDDLE","participantId":2,"goldPerMinDeltas":{"30-end":512.4666666666667,"20-30":509.3,"0-10":313.8,"10-20":421.9},"creepsPerMinDeltas":{"30-end":8.333333333333334,"20-30":6.800000000000001,"0-10":7.4,"10-20":9},"xpPerMinDeltas":{"30-end":542.1333333333333,"20-30":620.2,"0-10":343.2,"10-20":428.5},"role":"DUO","damageTakenPerMinDeltas":{"30-end":561.6666666666666,"20-30":745.6,"0-10":353.29999999999995,"10-20":404.6}},"championId":145},{"stats":{"neutralMinionsKilledTeamJungle":74,"visionScore":43,"magicDamageDealtToChampions":43547,"largestMultiKill":1,"totalTimeCrowdControlDealt":502,"longestTimeSpentLiving":466,"perk1Var1":2194,"perk1Var3":0,"perk1Var2":0,"tripleKills":0,"perk5":8234,"perk4":8243,"playerScore9":0,"playerScore8":0,"kills":19,"playerScore1":0,"playerScore0":0,"playerScore3":0,"playerScore2":0,"playerScore5":0,"playerScore4":0,"playerScore7":0,"playerScore6":0,"perk5Var1":17,"perk5Var3":0,"perk5Var2":0,"totalScoreRank":0,"neutralMinionsKilled":121,"damageDealtToTurrets":0,"physicalDamageDealtToChampions":1225,"damageDealtToObjectives":14752,"perk2Var2":0,"perk2Var3":0,"totalUnitsHealed":1,"perk2Var1":30,"perk4Var1":15,"totalDamageTaken":46754,"perk4Var3":0,"wardsKilled":2,"largestCriticalStrike":1349,"largestKillingSpree":5,"quadraKills":0,"magicDamageDealt":148129,"firstBloodAssist":false,"item2":3089,"item3":3020,"item0":1402,"item1":3165,"item6":3340,"item4":3100,"item5":3135,"perk1":8143,"perk0":8112,"perk3":8105,"perk2":8138,"perk3Var3":0,"perk3Var2":0,"perk3Var1":5,"damageSelfMitigated":25147,"magicalDamageTaken":17650,"perk0Var2":0,"firstInhibitorKill":false,"trueDamageTaken":1094,"assists":9,"perk4Var2":0,"goldSpent":17900,"trueDamageDealt":8691,"participantId":3,"physicalDamageDealt":14869,"sightWardsBoughtInGame":0,"totalDamageDealtToChampions":48823,"physicalDamageTaken":28009,"totalPlayerScore":0,"win":false,"objectivePlayerScore":0,"totalDamageDealt":171690,"neutralMinionsKilledEnemyJungle":13,"deaths":12,"wardsPlaced":26,"perkPrimaryStyle":8100,"perkSubStyle":8200,"turretKills":0,"firstBloodKill":false,"trueDamageDealtToChampions":4051,"goldEarned":18722,"killingSprees":5,"unrealKills":0,"firstTowerAssist":false,"firstTowerKill":false,"champLevel":18,"doubleKills":0,"inhibitorKills":0,"firstInhibitorAssist":false,"perk0Var1":5345,"combatPlayerScore":0,"perk0Var3":0,"visionWardsBoughtInGame":3,"pentaKills":0,"totalHeal":10447,"totalMinionsKilled":20,"timeCCingOthers":27},"spell1Id":11,"participantId":3,"highestAchievedSeasonTier":"CHALLENGER","spell2Id":4,"teamId":100,"timeline":{"lane":"JUNGLE","participantId":3,"csDiffPerMinDeltas":{"30-end":-1.1333333333333333,"20-30":-1.7,"0-10":-0.9000000000000001,"10-20":-2.4000000000000004},"goldPerMinDeltas":{"30-end":333.3333333333333,"20-30":498.6,"0-10":253.2,"10-20":472.90000000000003},"xpDiffPerMinDeltas":{"30-end":-224.26666666666668,"20-30":236.8,"0-10":-93.20000000000003,"10-20":-53.99999999999994},"creepsPerMinDeltas":{"30-end":0.6666666666666666,"20-30":0.6,"0-10":0.2,"10-20":0.2},"xpPerMinDeltas":{"30-end":350.0666666666666,"20-30":666.5,"0-10":300.5,"10-20":512.8},"role":"NONE","damageTakenDiffPerMinDeltas":{"30-end":398.13333333333327,"20-30":-97.30000000000001,"0-10":110.79999999999998,"10-20":322.1},"damageTakenPerMinDeltas":{"30-end":1239.5333333333333,"20-30":788.7,"0-10":595.3,"10-20":825.6}},"championId":28},{"stats":{"neutralMinionsKilledTeamJungle":12,"visionScore":32,"magicDamageDealtToChampions":34627,"largestMultiKill":1,"totalTimeCrowdControlDealt":378,"longestTimeSpentLiving":389,"perk1Var1":250,"perk1Var3":0,"perk1Var2":611,"tripleKills":0,"perk5":8316,"perk4":8304,"playerScore9":0,"playerScore8":0,"kills":7,"playerScore1":0,"playerScore0":0,"playerScore3":0,"playerScore2":0,"playerScore5":0,"playerScore4":0,"playerScore7":0,"playerScore6":0,"perk5Var1":9747,"perk5Var3":0,"perk5Var2":0,"totalScoreRank":0,"neutralMinionsKilled":24,"damageDealtToTurrets":4153,"physicalDamageDealtToChampions":1112,"damageDealtToObjectives":9016,"perk2Var2":0,"perk2Var3":0,"totalUnitsHealed":1,"perk2Var1":22,"perk4Var1":9,"totalDamageTaken":53342,"perk4Var3":0,"wardsKilled":5,"largestCriticalStrike":1324,"largestKillingSpree":3,"quadraKills":0,"magicDamageDealt":269131,"firstBloodAssist":false,"item2":3020,"item3":3027,"item0":3157,"item1":3102,"item6":3363,"item4":3089,"item5":3165,"perk1":8226,"perk0":8230,"perk3":8237,"perk2":8234,"perk3Var3":0,"perk3Var2":0,"perk3Var1":1010,"damageSelfMitigated":26300,"magicalDamageTaken":30911,"perk0Var2":0,"firstInhibitorKill":false,"trueDamageTaken":1769,"assists":10,"perk4Var2":3,"goldSpent":20600,"trueDamageDealt":125899,"participantId":4,"physicalDamageDealt":24874,"sightWardsBoughtInGame":0,"totalDamageDealtToChampions":36521,"physicalDamageTaken":20662,"totalPlayerScore":0,"win":false,"objectivePlayerScore":0,"totalDamageDealt":419906,"neutralMinionsKilledEnemyJungle":0,"deaths":11,"wardsPlaced":18,"perkPrimaryStyle":8200,"perkSubStyle":8300,"turretKills":1,"firstBloodKill":false,"trueDamageDealtToChampions":781,"goldEarned":19762,"killingSprees":2,"unrealKills":0,"firstTowerAssist":false,"firstTowerKill":false,"champLevel":18,"doubleKills":0,"inhibitorKills":0,"firstInhibitorAssist":false,"perk0Var1":22,"combatPlayerScore":0,"perk0Var3":0,"visionWardsBoughtInGame":4,"pentaKills":0,"totalHeal":15581,"totalMinionsKilled":338,"timeCCingOthers":53},"spell1Id":4,"participantId":4,"highestAchievedSeasonTier":"PLATINUM","spell2Id":12,"teamId":100,"timeline":{"lane":"MIDDLE","participantId":4,"goldPerMinDeltas":{"30-end":322.06666666666666,"20-30":598.9,"0-10":271.20000000000005,"10-20":468.4},"creepsPerMinDeltas":{"30-end":4,"20-30":8.7,"0-10":7.9,"10-20":9.3},"xpPerMinDeltas":{"30-end":363.6666666666667,"20-30":748,"0-10":427.3,"10-20":580.4},"role":"DUO","damageTakenPerMinDeltas":{"30-end":1038.6000000000001,"20-30":1472.4,"0-10":380.5,"10-20":963.9000000000001}},"championId":50},{"stats":{"neutralMinionsKilledTeamJungle":8,"visionScore":64,"magicDamageDealtToChampions":10956,"largestMultiKill":1,"totalTimeCrowdControlDealt":3375,"longestTimeSpentLiving":850,"perk1Var1":4049,"perk1Var3":0,"perk1Var2":0,"tripleKills":0,"perk5":8210,"perk4":8243,"playerScore9":0,"playerScore8":0,"kills":3,"playerScore1":0,"playerScore0":0,"playerScore3":0,"playerScore2":0,"playerScore5":0,"playerScore4":0,"playerScore7":0,"playerScore6":0,"perk5Var1":36,"perk5Var3":0,"perk5Var2":0,"totalScoreRank":0,"neutralMinionsKilled":12,"damageDealtToTurrets":14433,"physicalDamageDealtToChampions":13181,"damageDealtToObjectives":20881,"perk2Var2":0,"perk2Var3":0,"totalUnitsHealed":1,"perk2Var1":2356,"perk4Var1":15,"totalDamageTaken":88578,"perk4Var3":0,"wardsKilled":5,"largestCriticalStrike":0,"largestKillingSpree":0,"quadraKills":0,"magicDamageDealt":129255,"firstBloodAssist":false,"item2":3078,"item3":3143,"item0":3110,"item1":3065,"item6":3363,"item4":3083,"item5":3111,"perk1":8446,"perk0":8437,"perk3":8451,"perk2":8444,"perk3Var3":0,"perk3Var2":0,"perk3Var1":551,"damageSelfMitigated":133400,"magicalDamageTaken":40691,"perk0Var2":1901,"firstInhibitorKill":false,"trueDamageTaken":4951,"assists":7,"perk4Var2":0,"goldSpent":20068,"trueDamageDealt":20596,"participantId":5,"physicalDamageDealt":184290,"sightWardsBoughtInGame":0,"totalDamageDealtToChampions":24734,"physicalDamageTaken":42935,"totalPlayerScore":0,"win":false,"objectivePlayerScore":0,"totalDamageDealt":334142,"neutralMinionsKilledEnemyJungle":4,"deaths":10,"wardsPlaced":20,"perkPrimaryStyle":8400,"perkSubStyle":8200,"turretKills":3,"firstBloodKill":false,"trueDamageDealtToChampions":596,"goldEarned":20088,"killingSprees":0,"unrealKills":0,"firstTowerAssist":false,"firstTowerKill":false,"champLevel":18,"doubleKills":0,"inhibitorKills":1,"firstInhibitorAssist":false,"perk0Var1":1493,"combatPlayerScore":0,"perk0Var3":0,"visionWardsBoughtInGame":1,"pentaKills":0,"totalHeal":2160,"totalMinionsKilled":394,"timeCCingOthers":23},"spell1Id":4,"participantId":5,"highestAchievedSeasonTier":"MASTER","spell2Id":12,"teamId":100,"timeline":{"lane":"TOP","participantId":5,"csDiffPerMinDeltas":{"30-end":2.6,"20-30":2.4000000000000004,"0-10":0.6999999999999997,"10-20":4.5},"goldPerMinDeltas":{"30-end":410.5333333333333,"20-30":493.70000000000005,"0-10":256.1,"10-20":438.5},"xpDiffPerMinDeltas":{"30-end":-171.46666666666667,"20-30":201.50000000000003,"0-10":-42,"10-20":114.19999999999999},"creepsPerMinDeltas":{"30-end":7.533333333333334,"20-30":8.2,"0-10":7.6,"10-20":11.5},"xpPerMinDeltas":{"30-end":496.8666666666666,"20-30":702.1,"0-10":416.5,"10-20":582.8},"role":"SOLO","damageTakenDiffPerMinDeltas":{"30-end":1194.2,"20-30":1849.6999999999998,"0-10":143.79999999999998,"10-20":865.9},"damageTakenPerMinDeltas":{"30-end":2088.2000000000003,"20-30":2539.8,"0-10":517.7,"10-20":1083.4}},"championId":75},{"stats":{"neutralMinionsKilledTeamJungle":4,"visionScore":148,"magicDamageDealtToChampions":26493,"largestMultiKill":2,"totalTimeCrowdControlDealt":652,"longestTimeSpentLiving":423,"perk1Var1":910,"perk1Var3":0,"perk1Var2":0,"tripleKills":0,"perk5":8237,"perk4":8234,"playerScore9":0,"playerScore8":0,"kills":10,"playerScore1":0,"playerScore0":0,"playerScore3":0,"playerScore2":0,"playerScore5":0,"playerScore4":0,"playerScore7":0,"playerScore6":0,"perk5Var1":876,"perk5Var3":0,"perk5Var2":0,"totalScoreRank":0,"neutralMinionsKilled":12,"damageDealtToTurrets":325,"physicalDamageDealtToChampions":3133,"damageDealtToObjectives":325,"perk2Var2":0,"perk2Var3":0,"totalUnitsHealed":4,"perk2Var1":30,"perk4Var1":28,"totalDamageTaken":42615,"perk4Var3":0,"wardsKilled":22,"largestCriticalStrike":0,"largestKillingSpree":3,"quadraKills":0,"magicDamageDealt":115228,"firstBloodAssist":false,"item2":3151,"item3":3102,"item0":3905,"item1":3092,"item6":3364,"item4":3165,"item5":3020,"perk1":8126,"perk0":8112,"perk3":8105,"perk2":8138,"perk3Var3":0,"perk3Var2":0,"perk3Var1":5,"damageSelfMitigated":14574,"magicalDamageTaken":27902,"perk0Var2":0,"firstInhibitorKill":false,"trueDamageTaken":1471,"assists":22,"perk4Var2":0,"goldSpent":15875,"trueDamageDealt":8036,"participantId":6,"physicalDamageDealt":11421,"sightWardsBoughtInGame":0,"totalDamageDealtToChampions":34779,"physicalDamageTaken":13242,"totalPlayerScore":0,"win":true,"objectivePlayerScore":0,"totalDamageDealt":134685,"neutralMinionsKilledEnemyJungle":4,"deaths":14,"wardsPlaced":53,"perkPrimaryStyle":8100,"perkSubStyle":8200,"turretKills":0,"firstBloodKill":false,"trueDamageDealtToChampions":5152,"goldEarned":18971,"killingSprees":3,"unrealKills":0,"firstTowerAssist":false,"firstTowerKill":false,"champLevel":18,"doubleKills":1,"inhibitorKills":0,"firstInhibitorAssist":false,"perk0Var1":2642,"combatPlayerScore":0,"perk0Var3":0,"visionWardsBoughtInGame":9,"pentaKills":0,"totalHeal":7904,"totalMinionsKilled":112,"timeCCingOthers":56},"spell1Id":4,"participantId":6,"highestAchievedSeasonTier":"MASTER","spell2Id":14,"teamId":200,"timeline":{"lane":"BOTTOM","participantId":6,"goldPerMinDeltas":{"30-end":485.8,"20-30":387.7,"0-10":165.8,"10-20":307.6},"creepsPerMinDeltas":{"30-end":4.2,"20-30":1.7,"0-10":0.5,"10-20":1.1},"xpPerMinDeltas":{"30-end":794.7333333333332,"20-30":513.5,"0-10":267,"10-20":279.70000000000005},"role":"DUO_SUPPORT","damageTakenPerMinDeltas":{"30-end":933.9333333333334,"20-30":893.7,"0-10":268.8,"10-20":1011.0999999999999}},"championId":432},{"stats":{"neutralMinionsKilledTeamJungle":100,"visionScore":59,"magicDamageDealtToChampions":2232,"largestMultiKill":1,"totalTimeCrowdControlDealt":1320,"longestTimeSpentLiving":618,"perk1Var1":1102,"perk1Var3":0,"perk1Var2":0,"tripleKills":0,"perk5":8232,"perk4":8234,"playerScore9":0,"playerScore8":0,"kills":7,"playerScore1":0,"playerScore0":0,"playerScore3":0,"playerScore2":0,"playerScore5":0,"playerScore4":0,"playerScore7":0,"playerScore6":0,"perk5Var1":7,"perk5Var3":0,"perk5Var2":40,"totalScoreRank":0,"neutralMinionsKilled":177,"damageDealtToTurrets":1004,"physicalDamageDealtToChampions":35460,"damageDealtToObjectives":29631,"perk2Var2":0,"perk2Var3":0,"totalUnitsHealed":1,"perk2Var1":18,"perk4Var1":27,"totalDamageTaken":38999,"perk4Var3":0,"wardsKilled":20,"largestCriticalStrike":1680,"largestKillingSpree":3,"quadraKills":0,"magicDamageDealt":11511,"firstBloodAssist":false,"item2":3006,"item3":3071,"item0":1412,"item1":3046,"item6":3364,"item4":3156,"item5":3812,"perk1":8143,"perk0":8112,"perk3":8105,"perk2":8138,"perk3Var3":0,"perk3Var2":0,"perk3Var1":5,"damageSelfMitigated":30524,"magicalDamageTaken":20057,"perk0Var2":0,"firstInhibitorKill":false,"trueDamageTaken":3354,"assists":26,"perk4Var2":0,"goldSpent":17375,"trueDamageDealt":21553,"participantId":7,"physicalDamageDealt":249917,"sightWardsBoughtInGame":0,"totalDamageDealtToChampions":43793,"physicalDamageTaken":15587,"totalPlayerScore":0,"win":true,"objectivePlayerScore":0,"totalDamageDealt":282983,"neutralMinionsKilledEnemyJungle":33,"deaths":8,"wardsPlaced":5,"perkPrimaryStyle":8100,"perkSubStyle":8200,"turretKills":1,"firstBloodKill":false,"trueDamageDealtToChampions":6099,"goldEarned":19744,"killingSprees":2,"unrealKills":0,"firstTowerAssist":false,"firstTowerKill":true,"champLevel":18,"doubleKills":0,"inhibitorKills":0,"firstInhibitorAssist":true,"perk0Var1":2703,"combatPlayerScore":0,"perk0Var3":0,"visionWardsBoughtInGame":2,"pentaKills":0,"totalHeal":10789,"totalMinionsKilled":95,"timeCCingOthers":43},"spell1Id":11,"participantId":7,"highestAchievedSeasonTier":"UNRANKED","spell2Id":4,"teamId":200,"timeline":{"lane":"JUNGLE","participantId":7,"csDiffPerMinDeltas":{"30-end":1.1333333333333333,"20-30":1.7,"0-10":0.9000000000000001,"10-20":2.4000000000000004},"goldPerMinDeltas":{"30-end":387.1333333333334,"20-30":331.2,"0-10":331,"10-20":440.8},"xpDiffPerMinDeltas":{"30-end":224.26666666666668,"20-30":-236.8,"0-10":93.20000000000003,"10-20":53.99999999999994},"creepsPerMinDeltas":{"30-end":1.8,"20-30":2.3,"0-10":1.1,"10-20":2.6},"xpPerMinDeltas":{"30-end":574.3333333333334,"20-30":429.7,"0-10":393.70000000000005,"10-20":566.8},"role":"NONE","damageTakenDiffPerMinDeltas":{"30-end":-398.13333333333327,"20-30":97.30000000000001,"0-10":-110.79999999999998,"10-20":-322.1},"damageTakenPerMinDeltas":{"30-end":841.4000000000001,"20-30":886,"0-10":484.5,"10-20":503.5}},"championId":104},{"stats":{"neutralMinionsKilledTeamJungle":26,"visionScore":54,"magicDamageDealtToChampions":3406,"largestMultiKill":1,"totalTimeCrowdControlDealt":405,"longestTimeSpentLiving":638,"perk1Var1":2312,"perk1Var3":0,"perk1Var2":4923,"tripleKills":0,"perk5":8236,"perk4":8234,"playerScore9":0,"playerScore8":0,"kills":8,"playerScore1":0,"playerScore0":0,"playerScore3":0,"playerScore2":0,"playerScore5":0,"playerScore4":0,"playerScore7":0,"playerScore6":0,"perk5Var1":48,"perk5Var3":0,"perk5Var2":0,"totalScoreRank":0,"neutralMinionsKilled":65,"damageDealtToTurrets":11052,"physicalDamageDealtToChampions":32287,"damageDealtToObjectives":44345,"perk2Var2":20,"perk2Var3":0,"totalUnitsHealed":4,"perk2Var1":17,"perk4Var1":23,"totalDamageTaken":30207,"perk4Var3":0,"wardsKilled":12,"largestCriticalStrike":1325,"largestKillingSpree":3,"quadraKills":0,"magicDamageDealt":22271,"firstBloodAssist":false,"item2":3156,"item3":3094,"item0":3508,"item1":3072,"item6":3363,"item4":3031,"item5":3036,"perk1":9101,"perk0":8021,"perk3":8017,"perk2":9104,"perk3Var3":0,"perk3Var2":0,"perk3Var1":2238,"damageSelfMitigated":17246,"magicalDamageTaken":21230,"perk0Var2":0,"firstInhibitorKill":false,"trueDamageTaken":1511,"assists":16,"perk4Var2":0,"goldSpent":22175,"trueDamageDealt":7570,"participantId":8,"physicalDamageDealt":396730,"sightWardsBoughtInGame":0,"totalDamageDealtToChampions":37716,"physicalDamageTaken":7466,"totalPlayerScore":0,"win":true,"objectivePlayerScore":0,"totalDamageDealt":426572,"neutralMinionsKilledEnemyJungle":4,"deaths":7,"wardsPlaced":17,"perkPrimaryStyle":8000,"perkSubStyle":8200,"turretKills":2,"firstBloodKill":false,"trueDamageDealtToChampions":2021,"goldEarned":23364,"killingSprees":3,"unrealKills":0,"firstTowerAssist":false,"firstTowerKill":false,"champLevel":18,"doubleKills":0,"inhibitorKills":2,"firstInhibitorAssist":true,"perk0Var1":5263,"combatPlayerScore":0,"perk0Var3":0,"visionWardsBoughtInGame":7,"pentaKills":0,"totalHeal":9290,"totalMinionsKilled":380,"timeCCingOthers":6},"spell1Id":4,"participantId":8,"highestAchievedSeasonTier":"MASTER","spell2Id":7,"teamId":200,"timeline":{"lane":"BOTTOM","participantId":8,"goldPerMinDeltas":{"30-end":623.6,"20-30":533.5999999999999,"0-10":255.6,"10-20":347.79999999999995},"creepsPerMinDeltas":{"30-end":9.133333333333333,"20-30":8.1,"0-10":7.9,"10-20":7},"xpPerMinDeltas":{"30-end":845.4,"20-30":645.6,"0-10":316.8,"10-20":423.29999999999995},"role":"DUO_CARRY","damageTakenPerMinDeltas":{"30-end":639.6,"20-30":784.7,"0-10":307.5,"10-20":505.2}},"championId":236},{"stats":{"neutralMinionsKilledTeamJungle":42,"visionScore":52,"magicDamageDealtToChampions":71759,"largestMultiKill":2,"totalTimeCrowdControlDealt":251,"longestTimeSpentLiving":858,"perk1Var1":7,"perk1Var3":0,"perk1Var2":0,"tripleKills":0,"perk5":8234,"perk4":8226,"playerScore9":0,"playerScore8":0,"kills":23,"playerScore1":0,"playerScore0":0,"playerScore3":0,"playerScore2":0,"playerScore5":0,"playerScore4":0,"playerScore7":0,"playerScore6":0,"perk5Var1":22,"perk5Var3":0,"perk5Var2":0,"totalScoreRank":0,"neutralMinionsKilled":46,"damageDealtToTurrets":10268,"physicalDamageDealtToChampions":1409,"damageDealtToObjectives":27405,"perk2Var2":0,"perk2Var3":0,"totalUnitsHealed":1,"perk2Var1":14710,"perk4Var1":250,"totalDamageTaken":30360,"perk4Var3":0,"wardsKilled":12,"largestCriticalStrike":0,"largestKillingSpree":6,"quadraKills":0,"magicDamageDealt":503542,"firstBloodAssist":false,"item2":3135,"item3":3165,"item0":3102,"item1":3089,"item6":3364,"item4":3285,"item5":3158,"perk1":8304,"perk0":8326,"perk3":8347,"perk2":8316,"perk3Var3":0,"perk3Var2":0,"perk3Var1":0,"damageSelfMitigated":12334,"magicalDamageTaken":21076,"perk0Var2":0,"firstInhibitorKill":true,"trueDamageTaken":959,"assists":9,"perk4Var2":1979,"goldSpent":19525,"trueDamageDealt":153986,"participantId":9,"physicalDamageDealt":10963,"sightWardsBoughtInGame":0,"totalDamageDealtToChampions":76063,"physicalDamageTaken":8325,"totalPlayerScore":0,"win":true,"objectivePlayerScore":0,"totalDamageDealt":668492,"neutralMinionsKilledEnemyJungle":4,"deaths":8,"wardsPlaced":12,"perkPrimaryStyle":8300,"perkSubStyle":8200,"turretKills":2,"firstBloodKill":false,"trueDamageDealtToChampions":2894,"goldEarned":26573,"killingSprees":6,"unrealKills":0,"firstTowerAssist":true,"firstTowerKill":false,"champLevel":18,"doubleKills":3,"inhibitorKills":1,"firstInhibitorAssist":false,"perk0Var1":5,"combatPlayerScore":0,"perk0Var3":0,"visionWardsBoughtInGame":3,"pentaKills":0,"totalHeal":1559,"totalMinionsKilled":377,"timeCCingOthers":61},"spell1Id":7,"participantId":9,"highestAchievedSeasonTier":"UNRANKED","spell2Id":4,"teamId":200,"timeline":{"lane":"MIDDLE","participantId":9,"goldPerMinDeltas":{"30-end":624.1333333333333,"20-30":479.1,"0-10":321,"10-20":615.8},"creepsPerMinDeltas":{"30-end":9.200000000000001,"20-30":5,"0-10":8.4,"10-20":9.4},"xpPerMinDeltas":{"30-end":748.1999999999999,"20-30":456.5,"0-10":511.9,"10-20":597.1},"role":"SOLO","damageTakenPerMinDeltas":{"30-end":375.59999999999997,"20-30":1158.9,"0-10":239.5,"10-20":507.4}},"championId":45},{"stats":{"neutralMinionsKilledTeamJungle":2,"visionScore":90,"magicDamageDealtToChampions":20246,"largestMultiKill":1,"totalTimeCrowdControlDealt":1633,"longestTimeSpentLiving":1500,"perk1Var1":1262,"perk1Var3":0,"perk1Var2":0,"tripleKills":0,"perk5":8210,"perk4":8243,"playerScore9":0,"playerScore8":0,"kills":4,"playerScore1":0,"playerScore0":0,"playerScore3":0,"playerScore2":0,"playerScore5":0,"playerScore4":0,"playerScore7":0,"playerScore6":0,"perk5Var1":19,"perk5Var3":0,"perk5Var2":0,"totalScoreRank":0,"neutralMinionsKilled":6,"damageDealtToTurrets":696,"physicalDamageDealtToChampions":9047,"damageDealtToObjectives":2612,"perk2Var2":38,"perk2Var3":19,"totalUnitsHealed":1,"perk2Var1":79,"perk4Var1":15,"totalDamageTaken":34273,"perk4Var3":0,"wardsKilled":6,"largestCriticalStrike":0,"largestKillingSpree":2,"quadraKills":0,"magicDamageDealt":126798,"firstBloodAssist":false,"item2":3025,"item3":3001,"item0":3190,"item1":3194,"item6":3363,"item4":3068,"item5":3047,"perk1":8473,"perk0":8437,"perk3":8451,"perk2":8429,"perk3Var3":0,"perk3Var2":0,"perk3Var1":449,"damageSelfMitigated":97966,"magicalDamageTaken":18413,"perk0Var2":1931,"firstInhibitorKill":false,"trueDamageTaken":1068,"assists":18,"perk4Var2":0,"goldSpent":16125,"trueDamageDealt":10705,"participantId":10,"physicalDamageDealt":82005,"sightWardsBoughtInGame":0,"totalDamageDealtToChampions":31718,"physicalDamageTaken":14791,"totalPlayerScore":0,"win":true,"objectivePlayerScore":0,"totalDamageDealt":219509,"neutralMinionsKilledEnemyJungle":0,"deaths":3,"wardsPlaced":25,"perkPrimaryStyle":8400,"perkSubStyle":8200,"turretKills":2,"firstBloodKill":false,"trueDamageDealtToChampions":2425,"goldEarned":17868,"killingSprees":1,"unrealKills":0,"firstTowerAssist":false,"firstTowerKill":false,"champLevel":18,"doubleKills":0,"inhibitorKills":0,"firstInhibitorAssist":false,"perk0Var1":1740,"combatPlayerScore":0,"perk0Var3":0,"visionWardsBoughtInGame":7,"pentaKills":0,"totalHeal":7352,"totalMinionsKilled":287,"timeCCingOthers":56},"spell1Id":4,"participantId":10,"highestAchievedSeasonTier":"GOLD","spell2Id":12,"teamId":200,"timeline":{"lane":"TOP","participantId":10,"csDiffPerMinDeltas":{"30-end":-2.6,"20-30":-2.4000000000000004,"0-10":-0.6999999999999997,"10-20":-4.5},"goldPerMinDeltas":{"30-end":377.59999999999997,"20-30":335.7,"0-10":250.5,"10-20":372.1},"xpDiffPerMinDeltas":{"30-end":171.46666666666667,"20-30":-201.50000000000003,"0-10":42,"10-20":-114.19999999999999},"creepsPerMinDeltas":{"30-end":4.933333333333334,"20-30":5.8,"0-10":6.9,"10-20":7},"xpPerMinDeltas":{"30-end":668.3333333333334,"20-30":500.6,"0-10":458.5,"10-20":468.6},"role":"SOLO","damageTakenDiffPerMinDeltas":{"30-end":-1194.2,"20-30":-1849.6999999999998,"0-10":-143.79999999999998,"10-20":-865.9},"damageTakenPerMinDeltas":{"30-end":894,"20-30":690.1,"0-10":373.9,"10-20":217.5}},"championId":54}],"gameDuration":2884,"gameCreation":1524701832974}';


	var json = JSON.parse(example);

	//participant data
	var pArray = getParticipants(json["participantIdentities"]);

	//team data, [1] is 100, [2] is 200
	var tArray = getTeams(json["teams"]);
	
	//bans
	var banArray = getBans(json["teams"]);

	//fill player stats
	pArray = getStats(pArray, json["participants"]);

	display(pArray);
	displayGeneral(banArray, tArray);
}

function getParticipants(json) {
	var pArray = [];

	jQuery.each(json, function() {
		var pid = this["participantId"];
		var name = this["player"]["summonerName"];

		var player = {
			participantId: pid,
			summonerName: name,
			teamId: -1, //set later
			championId: -1,
			lane: "",
			kills: -1,
			deaths: -1,
			assists: -1,
			cs: -1,
			gold: -1,
			items: {
				item0: -1,
				item1: -1,
				item2: -1,
				item3: -1,
				item4: -1,
				item5: -1,
				item6: -1
			},
			damageDealt: {
				magicDamageDealt: -1,
				physicalDamageDealt: -1,
				trueDamageDealt: -1
			},
			damageTaken: {
				magicDamageTaken: -1,
				physicalDamageTaken: -1,
				trueDamageTaken: -1,
			},
			wards: {
				wardsPlaced: -1,
				wardsBought: -1,
				visionScore: -1
			},
			timeline: {
				goldDifference: {
					first: -1,
					second: -1	
				},
				csDifference: {
					first: -1,
					second: -1
				}
			}
		};

		pArray[pid] = player;
	});

	return pArray;
}

function getTeams(json) {
	var array = [];

	jQuery.each(json, function() {
		var tid = this["teamId"];
		var w = true;
		if (this["win"] === "Fail") {
			w = false;	
		}
		var baron = this["baronKills"];
		var dragon = this["dragonKills"];
		var riftHerald = this["riftHeraldKills"];

		var team = {
			teamId: tid,
			win: w,
			baronKills: baron,
			dragonKills: dragon,
			riftHeraldKills: riftHerald
		};

		array[tid/100] = team;
	});

	return array;
}

function getBans(json) {
	var array = [];

	jQuery.each(json, function() {
		var bans = this["bans"];
		jQuery.each(bans, function() {
			array.push(this["championId"]);
		});
	});

	return array;
}

function getStats(array, json) {
	//iterate through players
	jQuery.each(json, function() {
		var pid = this["participantId"];
		var player = array[pid];

		//set basic information
		player.teamId = this["teamId"];
		player.championId = this["championId"];
		player.lane = this["timeline"]["lane"];

		var stats = this["stats"];
		player.kills = stats["kills"];
		player.deaths = stats["deaths"];
		player.assists = stats["assists"];
		player.cs = stats["totalMinionsKilled"];
		player.gold = stats["goldEarned"];

		var items = player.items;
		items.item0 = stats["item0"];
		items.item1 = stats["item1"];
		items.item2 = stats["item2"];
		items.item3 = stats["item3"];
		items.item4 = stats["item4"];
		items.item5 = stats["item5"];
		items.item6 = stats["item6"];
		player.items = items;

		var dmgDealt = player.damageDealt;
		dmgDealt.magicDamageDealt = stats["magicDamageDealtToChampions"];
		dmgDealt.physicalDamageDealt = stats["physicalDamageDealtToChampions"];
		dmgDealt.trueDamageDealt = stats["trueDamageDealtToChampions"];
		player.damageDealt = dmgDealt;

		var dmgTaken = player.damageTaken;
		dmgTaken.magicDamageTaken = stats["magicalDamageTaken"];
		dmgTaken.physicalDamageTaken = stats["physicalDamageTaken"];
		dmgTaken.trueDamageTaken = stats["trueDamageTaken"];
		player.damageTaken = dmgTaken;
		
		var wards = player.wards;
		wards.wardsPlaced = stats["wardsPlaced"];
		wards.wardsBought = stats["visionWardsBoughtInGame"];
		wards.visionScore = stats["visionScore"];
		player.wards = wards;

		var timeline = this["timeline"];
		var tl = player.timeline;
		tl.goldDifference.first = timeline["goldPerMinDeltas"]["0-10"];
		tl.goldDifference.second = timeline["goldPerMinDeltas"]["10-20"];
		tl.csDifference.first = timeline["creepsPerMinDeltas"]["0-10"];
		tl.csDifference.second = timeline["creepsPerMinDeltas"]["10-20"];
		player.timeline = tl;

		array[pid] = player;	
	});

	return array;
}

function displayGeneral(banArray, tArray) {
	//ban info
	var ban_info = document.getElementById("ban-info");

	var ban_img = node("div", "ban-img");
	for (var i = 0; i < banArray.length; i++) {
		var img = node("img", "");
		img.src = "../img/minimap-icon.png";	

		ban_img.appendChild(img);
	}
	ban_info.appendChild(ban_img);

	//team info
	var blueTable = document.getElementById("blueTeam");
	var blueArray = tArray[1];

	blueTable.appendChild(createEntry(blueArray.win, "11%"));
	blueTable.appendChild(createEntry(blueArray.baronKills, "23%"));
	blueTable.appendChild(createEntry(blueArray.dragonKills, "23%"));
	blueTable.appendChild(createEntry(blueArray.riftHeraldKills, "23%"));
	
	var redTable = document.getElementById("redTeam");
	var redArray = tArray[2];

	redTable.appendChild(createEntry(redArray.win, "11%"));
	redTable.appendChild(createEntry(redArray.baronKills, "23%"));
	redTable.appendChild(createEntry(redArray.dragonKills, "23%"));
	redTable.appendChild(createEntry(redArray.riftHeraldKills, "23%"));
}

function createEntry(text, w) {
	var t = document.createTextNode(text);
	var td = document.createElement("td");
	td.width = w;
	td.appendChild(t);
	return td;
}

function display(array) {
	for (var i = 1; i <= 10; i++) {
		var player = array[i];
		var pid = "champion" + player.participantId;
		var d = document.getElementById(pid);

		//get basic info
		var basic = createBasicInfo(player);
		d.appendChild(basic);

		var items = createItemInfo(player.items);
		d.appendChild(items);

		var charts = createCharts(i);
		d.appendChild(charts);
		createDamageTakenChart(player.damageTaken, i);
		createDamageDealtChart(player.damageDealt, i);

		var wards = createWardInfo(player.wards);
		var timeline = createTimelineInfo(player.timeline);
		var other = node("div", "other-info");
		other.appendChild(wards);
		other.appendChild(timeline);
		d.appendChild(other);
		
	}
}

function createTimelineInfo(timeline) {
	//main div
	var div = node("div", "timeline-info right");

	var title = node("div", "timeline-title");
	title = appendText(title, "Laning Stats (Average)");
	div.appendChild(title);

	//gold delta
	var gold = node("div", "gold-delta");
	
	var gold0 = node("div", "0-10");
	gold0 = appendText(gold0, "0-10 min: " + timeline.goldDifference.first);
	gold.appendChild(gold0);
	
	var gold1 = node("div", "10-20");
	gold1 = appendText(gold1, "10-20 min: " + timeline.goldDifference.second);
	gold.appendChild(gold1);

	div.appendChild(gold);
	
	//cs delta
	var cs = node("div", "cs-delta");
	
	var cs0 = node("div", "0-10");
	cs0 = appendText(cs0, "0-10 min: " + timeline.csDifference.first);
	cs.appendChild(cs0);
	
	var cs1 = node("div", "10-20");
	cs1 = appendText(cs1, "10-20 min: " + timeline.csDifference.second);
	cs.appendChild(cs1);

	div.appendChild(cs);

	return div;
}

function createWardInfo(wards) {
	//main div
	var div = node("div", "ward-info left");

	var title = node("div", "ward-title");
	title = appendText(title, "Warding");
	div.appendChild(title);
	
	var placed = node("div", "wards-placed");
	placed = appendText(placed, "Wards Placed: " + wards.wardsPlaced);
	div.appendChild(placed);

	var bought = node("div", "wards-bought");
	bought = appendText(bought, "Wards Bought: " + wards.wardsBought);
	div.appendChild(bought);

	var score = node("div", "vision-score");
	score = appendText(score, "Vision Score: " + wards.visionScore);
	div.appendChild(score);

	return div;
}

function createCharts(i) {
	//main div
	var chart_div = node("div", "dmg-info");
	var dmg_taken = node("canvas", "");
	var dmg_given = node("canvas", "");
	dmg_taken.id = "dmgTaken" + i;
	dmg_given.id = "dmgDealt" + i;

	var chart_cont = node("div", "chart-container left");
	var chart_cont2 = node("div", "chart-container right");
	chart_cont.appendChild(dmg_taken);
	chart_cont2.appendChild(dmg_given);
	chart_div.appendChild(chart_cont);
	chart_div.appendChild(chart_cont2);

	return chart_div;
}

function createBasicInfo(player) {
	var kda = player.kills + "/" + player.deaths + "/" + player.assists;

	//main div
	var basic_div = node("div", "basic-info");	

	//children div
	var kda_div = node("div", "kda");	
	var cs_div = node("div", "cs");	
	var gold_div = node("div", "gold");	
	var lane_div = node("div", "lane");

	//add text nodes to divs	
	kda_div = appendText(kda_div, kda);
	cs_div = appendText(cs_div, player.cs);
	gold_div = appendText(gold_div, player.gold);	
	lane_div = appendText(lane_div, player.lane);

	basic_div.appendChild(kda_div);
	basic_div.appendChild(cs_div);
	basic_div.appendChild(gold_div);
	basic_div.appendChild(lane_div);

	return basic_div;
}

function createItemInfo(items) {
	var link = "http://ddragon.leagueoflegends.com/cdn/8.8.2/img/item/";

	//main div
	var item_info = node("div", "item-info");

	jQuery.each(items, function() {
		var item_div = node("div", "item-img");	
		var img_div = node("img", "");
		img_div.src = link + this + ".png";
		item_div.appendChild(img_div);
		item_info.appendChild(item_div);
	});

	return item_info;
}

function appendText(div, text) {
	var p = node("p", "");
	p.appendChild(document.createTextNode(text));

	div.appendChild(p);
	return div;
}

function node(n, c) {
	var node = document.createElement(n);
	node.className = c;
	return node;
}

function createDamageTakenChart(dmg, i) {
	var ctx = document.getElementById("dmgTaken" + i).getContext("2d");
	var chart = new Chart(ctx, {
		type: 'horizontalBar',
		data: {
			labels: ["Magic", "Physical", "True"],
			datasets: [{
					label: "Damage Taken",
					data: [ dmg.magicDamageTaken, dmg.physicalDamageTaken, dmg.trueDamageTaken ],
					backgroundColor: [ "blue", "red", "black" ]
			}]
		}
	});
}

function createDamageDealtChart(dmg, i) {
	var ctx = document.getElementById("dmgDealt" + i).getContext("2d");
	var chart = new Chart(ctx, {
		type: 'horizontalBar',
		data: {
			labels: ["Magic", "Physical", "True"],
			datasets: [{
					label: "Damage Dealt",
					data: [ dmg.magicDamageDealt, dmg.physicalDamageDealt, dmg.trueDamageDealt ],
					backgroundColor: [ "blue", "red", "black" ]
			}]
		}
	});
}



