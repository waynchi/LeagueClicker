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
	document.getElementById("Gold").innerHTML = gold;
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
		document.getElementById("Gold").innerHTML = gold;
		console.log(gold);
		document.getElementById("MinionsOwned").innerHTML = minionsOwned;
		console.log(minionsOwned);
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
    document.getElementById("Gold").innerHTML = gold;
}
