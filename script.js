//Initialization
$(document).ready(function() {
	tab('tab1'); // switch to first tab
});

//Variables
var myVar = setInterval(function(){incrementGold();updateButtons()},1000);
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
	updateButtons();
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
		meleeMinionCost *= 1.1;
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
		casterMinionCost *= 1.1;
		updateButtons();
	}
}

//create element to Buy Melee Minion
function showBuyMeleeMinion() {
	//creating Buttons and Text
	var buyMinionBtn = document.createElement("Button");
	var buyMinionTxt = document.createTextNode("Buy Melee Minion for " + meleeMinionCost.toFixed(0) + " gold");
	var minionOwnedTxt = document.createTextNode("Melee Minions Owned: ");
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
	//disable button
	buyMinionBtn.disabled = true;
}

//create element to Buy Caster Minion
function showBuyCasterMinion() {
	//creating Buttons and Text
	var buyMinionBtn = document.createElement("Button");
	var buyMinionTxt = document.createTextNode("Buy Caster Minion for " + casterMinionCost.toFixed(0) + " gold");
	var minionOwnedTxt = document.createTextNode("Caster Minions Owned: ");
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
	//disable button
	buyMinionBtn.disabled = true;
}

function updateButtons() {
	// Update Melee Minion Button
	if (buyMeleeMinionBlockTrue)
	{
		document.getElementById("buyMeleeMinion").innerHTML = "Buy Melee Minion for " + meleeMinionCost.toFixed(0) + " gold";
		if (gold >= meleeMinionCost)
			document.getElementById("buyMeleeMinion").disabled = false;
		else
			document.getElementById("buyMeleeMinion").disabled = true;
	}
	// Update Caster Minion Button
	if (buyCasterMinionBlockTrue)
	{
		document.getElementById("buyCasterMinion").innerHTML = "Buy Caster Minion for " + casterMinionCost.toFixed(0) + " gold";
		if (gold >= casterMinionCost)
			document.getElementById("buyCasterMinion").disabled = false;
		else
			document.getElementById("buyCasterMinion").disabled = true;
	}
}

function incrementGold() {
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
		incrementGold();
		updateButtons();
	};
}