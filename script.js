// Initialization
$(document).ready(function() {
	tab('tab1'); // switch to first tab
});

//Variables
var myVar = setInterval(function(){updateGold()},1000);
var gold = 0;
var minionsKilled = 0;
var minionsOwned = 0;

//Variables that see if Element has been created
var buyMinionBlockTrue = false;

function killMinion() {
	minionsKilled += 1;
	gold += 1;
	document.getElementById("Gold").innerHTML = gold.toFixed(1);
	document.getElementById("MinionsKilledCount").innerHTML = minionsKilled;
	if(minionsKilled >= 10 && !buyMinionBlockTrue)
	{	
		buyMinionBlockTrue = true;
		showBuyMinion();
	}
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

//create element to Buy Minion
function showBuyMinion() {
	//creating Buttons and Text
	var buyMinionBlockDiv = document.createElement("Div");
	var buyMinionBtn = document.createElement("Button");
	var buyMinionTxt = document.createTextNode("Buy Minion");
	var buyMinionTextSpan = document.createElement("Span");
	var minionOwnedTxt = document.createTextNode("Minions Owned: ");
	var minionAmtSpan = document.createElement("Span");
	var minionAmtTxt = document.createTextNode(minionsOwned);
	//appending items together
	buyMinionBtn.appendChild(buyMinionTxt);
	buyMinionBlockDiv.appendChild(buyMinionBtn);
	buyMinionTextSpan.appendChild(minionOwnedTxt);
	minionAmtSpan.appendChild(minionAmtTxt);
	buyMinionTextSpan.appendChild(minionAmtSpan);
	buyMinionBlockDiv.appendChild(buyMinionTextSpan);
	document.body.appendChild(buyMinionBlockDiv);
	//setting ID
	buyMinionBlockDiv.id = "buyMinionBlock";
	minionAmtSpan.id = "MinionsOwned";
	buyMinionBtn.id = "buyMinion";
	//setting onclick
	buyMinionBtn.onclick = function(){buyMinion()};
	
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
