// Initialization
$(document).ready(function() {
	tab('tab1'); // switch to first tab
});

//Variables
var myVar = setInterval(function(){updateGold()},1000);
var gold = 0;
var minionsKilled = 0;
var minionsOwned = 0;

function killMinion() {
	minionsKilled += 1;
	gold += 1;
	document.getElementById("Gold").innerHTML = gold.toFixed(1);
	document.getElementById("MinionsKilledCount").innerHTML = minionsKilled;
}

function buyMinion() {
	if(gold >=10)
	{
		minionsOwned +=1;
		gold -= 10;
		document.getElementById("Gold").innerHTML = gold.toFixed(1);
		document.getElementById("MinionsOwned").innerHTML = minionsOwned;
	}
}

function updateGold() {
	gold += minionsOwned*0.1;
    document.getElementById("Gold").innerHTML = gold.toFixed(1);
}

function tab(tab) {
	document.getElementById('tab1').style.display = 'none';
	document.getElementById('tab2').style.display = 'none';
	document.getElementById('tab3').style.display = 'none';
	document.getElementById('tab4').style.display = 'none';
	document.getElementById('li_tab1').setAttribute("class", "");
	document.getElementById('li_tab2').setAttribute("class", "");
	document.getElementById('li_tab3').setAttribute("class", "");
	document.getElementById('li_tab4').setAttribute("class", "");
	document.getElementById(tab).style.display = 'block';
	document.getElementById('li_'+tab).setAttribute("class", "active");
}