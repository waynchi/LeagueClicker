//Variables
var myVar = setInterval(function(){updateGold()},1000);
var gold = 0;
var minionsKilled = 0;
var minionsOwned = 0;

function killMinion() {
	minionsKilled += 1;
	gold += 1;
	document.getElementById("Gold").innerHTML = gold;
	document.getElementById("MinionsKilledCount").innerHTML = minionsKilled;
}

function buyMinion() {
	if(gold >=10)
	{
		minionsOwned +=1;
		gold -= 10;
		document.getElementById("Gold").innerHTML = gold;
		document.getElementById("MinionsOwned").innerHTML = minionsOwned;
	}
}

function updateGold() {
	gold += minionsOwned*0.1;
    document.getElementById("Gold").innerHTML = gold;
}
