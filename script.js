//Variables
var minionsKilled = 0;

function killMinion() {
	minionsKilled += 1;
	document.getElementById("MinionsKilledCount").innerHTML = minionsKilled;
}