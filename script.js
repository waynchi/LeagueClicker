//Initialization
$(document).ready(function() {
	tab('tab1'); // switch to first tab
});

//Variables
var myVar = setInterval(function(){updateGold();updateButtons()},1000);
// var myVar = setInterval(function(){updateGold()},1000);
var gold = 0;
var minionsKilled = 0;
var minionKillGold = 1;
var meleeMinionsOwned = 0;
var meleeMinionCost = 10;
var meleeMinionProduction = 0.1;
var casterMinionsOwned = 0;
var casterMinionCost = 50;
var casterMinionProduction = 0.7;

//Variables that see if Element has been created
var buyMeleeMinionBlockTrue = false;
var buyCasterMinionBlockTrue = false;

function killMinion() {
	minionsKilled += 1;
	gold += minionKillGold;
	document.getElementById("Gold").innerHTML = gold.toFixed(1);
	document.getElementById("MinionsKilledCount").innerHTML = minionsKilled;
	if(minionsKilled >= 10 && !buyMeleeMinionBlockTrue)
	{	
		buyMeleeMinionBlockTrue = true;
		showBuyMeleeMinion();
	}
}

//when Buy Melee Minion Button is clicked
function buyMeleeMinion() {
	if(gold >= meleeMinionCost)
	{
		meleeMinionsOwned += 1;
		gold -= meleeMinionCost;
		document.getElementById("Gold").innerHTML = gold.toFixed(1);
		document.getElementById("MeleeMinionsOwned").innerHTML = meleeMinionsOwned;
		meleeMinionCost = 10 * Math.pow(1.1,meleeMinionsOwned);
		updateButtons();
	}
	if(!buyCasterMinionBlockTrue && meleeMinionsOwned >= 2 )
	{
		buyCasterMinionBlockTrue = true;
		showBuyCasterMinion();
	}
}

//when Buy Caster Minion Button is clicked
function buyCasterMinion() {
	if(gold >= casterMinionCost)
	{
		casterMinionsOwned += 1;
		gold -= casterMinionCost;
		document.getElementById("Gold").innerHTML = gold.toFixed(1);
		document.getElementById("CasterMinionsOwned").innerHTML = casterMinionsOwned;
		casterMinionCost = 50 * Math.pow(1.1,casterMinionsOwned);
		updateButtons();
	}
}

//create element to Buy Melee Minion
function showBuyMeleeMinion() {
	//creating Buttons and Text
	var buyMinionBtn = document.createElement("Button");
	var buyMinionTxt = document.createTextNode("Buy Melee Minion for " + meleeMinionCost.toFixed(0) + " gold");
	var minionOwnedTxt = document.createTextNode("Minions Owned: ");
	var minionAmtTxt = document.createTextNode(meleeMinionsOwned);
	//appending items together
	buyMinionBtn.appendChild(buyMinionTxt);
	document.getElementById("MeleeMinionButton").appendChild(buyMinionBtn);
	document.getElementById("MeleeMinionsText").appendChild(minionOwnedTxt);
	document.getElementById("MeleeMinionsOwned").appendChild(minionAmtTxt);
	//setting ID
	buyMinionBtn.id = "buyMeleeMinion";
	//setting onclick
	buyMinionBtn.onclick = function(){buyMeleeMinion()};
	
}

//create element to Buy Caster Minion
function showBuyCasterMinion() {
	//creating Buttons and Text
	var buyMinionBtn = document.createElement("Button");
	var buyMinionTxt = document.createTextNode("Buy Caster Minion for " + casterMinionCost.toFixed(0) + " gold");
	var minionOwnedTxt = document.createTextNode("Minions Owned: ");
	var minionAmtTxt = document.createTextNode(casterMinionsOwned);
	//appending items together
	buyMinionBtn.appendChild(buyMinionTxt);
	document.getElementById("CasterMinionButton").appendChild(buyMinionBtn);
	document.getElementById("CasterMinionsText").appendChild(minionOwnedTxt);
	document.getElementById("CasterMinionsOwned").appendChild(minionAmtTxt);
	//setting ID
	buyMinionBtn.id = "buyCasterMinion";
	//setting onclick
	buyMinionBtn.onclick = function(){buyCasterMinion()};
}

function updateButtons() {
	if (buyMeleeMinionBlockTrue)
		document.getElementById("buyMeleeMinion").innerHTML = "Buy Melee Minion for " + meleeMinionCost.toFixed(0) + " gold";
	if (buyCasterMinionBlockTrue)
		document.getElementById("buyCasterMinion").innerHTML = "Buy Caster Minion for " + casterMinionCost.toFixed(0) + " gold";

}

function updateGold() {
	gold += meleeMinionsOwned*meleeMinionProduction;
	gold += casterMinionsOwned*casterMinionProduction;
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

//Debug function
//Simulates 1000 seconds
function wut()
{
	for (var i = 0; i < 1000; i++) {
		updateGold();
		updateButtons();
	};
}