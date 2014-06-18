//Variables
var myVar = setInterval(function(){updateGold()},1000);
var gold = 0;
var minionsKilled = 0;
var minionsOwned = 0;

function killMinion() {
	minionsKilled += 1;
	gold += 1;
	updateGold();
	document.getElementById("MinionsKilledCount").innerHTML = minionsKilled;
}

function buyMinion() {
	minionsOwned +=1;
	gold -= 10;
	updateGold();
	document.getElementById("MinionsOwned").innerHTML = minionsOwned;
}

function updateGold() {
    document.getElementById("Gold").innerHTML = gold;
}
