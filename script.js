//Variables
var gold = 0;
var minionsKilled = 0;
var minionsOwned = 0;

function killMinion() {
	minionsKilled += 1;
	Gold += 1;
	document.getElementById("MinionsKilledCount").innerHTML = minionsKilled;
}

function buyMinion() {
	minionsOwned +=1;
	Gold -= 10;
	document.getElementById("MinionsOwned").innerHTML = minionsOwned;
}
	

function updateGold() {
    document.getElementById("Gold").innerHTML = gold;
	alert ("Test");
}
