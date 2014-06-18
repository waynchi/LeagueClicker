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
var baseMeleeCost = 10;
var meleeMinionCost = 10;
var meleeMinionProduction = 0.1;
var baseCasterCost = 50;
var casterMinionsOwned = 0;
var casterMinionCost = 50;
var casterMinionProduction = 0.7;
var siegeMinionsOwned = 0;
var baseSiegeCost = 200;
var siegeMinionCost = 200;
var siegeMinionProduction = 5;


//Variables that see if Element has been created
var buyMeleeMinionBlockTrue = false;
var buyCasterMinionBlockTrue = false;
var buySiegeMinionBlockTrue = false;

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
		meleeMinionCost = baseMeleeCost * Math.pow(1.1,meleeMinionsOwned);
		updateButtons();
	}
	//causes caster minions to show up
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
		casterMinionCost = baseCasterCost * Math.pow(1.1,casterMinionsOwned);
		updateButtons();
	}
	//causes siege minions to show up
	if(!buySiegeMinionBlockTrue && casterMinionsOwned >= 2)
	{
		buySiegeMinionBlockTrue = true;
		showBuySiegeMinion();
	}
}

//when Buy Siege Minion Button is clicked
function buySiegeMinion() {
	if(gold >= siegeMinionCost)
	{
		siegeMinionsOwned += 1;
		gold -= siegeMinionCost;
		document.getElementById("Gold").innerHTML = gold.toFixed(1);
		document.getElementById("SiegeMinionsOwned").innerHTML = siegeMinionsOwned;
		siegeMinionCost = baseSiegeCost * Math.pow(1.1, siegeMinionsOwned);
		updateButtons();
	}
	//causes champions to show up
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
	buyMinionBtn.disabled = (gold < meleeMinionCost) ? true:false;
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
	buyMinionBtn.disabled = (gold < casterMinionCost) ? true:false;
}

//create element to Buy Siege Minion
function showBuySiegeMinion() {
	//creating Buttons and Text
	var buyMinionBtn = document.createElement("Button");
	var buyMinionTxt = document.createTextNode("Buy Siege Minion for " + siegeMinionCost.toFixed(0) + " gold");
	var minionOwnedTxt = document.createTextNode("Siege Minions Owned: ");
	var minionAmtTxt = document.createTextNode(siegeMinionsOwned);
	//appending items together
	buyMinionBtn.appendChild(buyMinionTxt);
	document.getElementById("SiegeMinionButton").appendChild(buyMinionBtn);
	document.getElementById("SiegeMinionsText").appendChild(minionOwnedTxt);
	document.getElementById("SiegeMinionsOwned").appendChild(minionAmtTxt);
	//setting ID
	buyMinionBtn.id = "buySiegeMinion";
	//setting onclick
	buyMinionBtn.onclick = function(){buySiegeMinion()};
	//disable button
	buyMinionBtn.disabled = (gold < siegeMinionCost) ? true:false;
}

function updateButtons() {
	// Update Melee Minion Button
	
	if (buyMeleeMinionBlockTrue)
	{
		document.getElementById("buyMeleeMinion").innerHTML = "Buy Melee Minion for " + meleeMinionCost.toFixed(0) + " gold";
		document.getElementById("buyMeleeMinion").disabled = (gold < meleeMinionCost) ? true:false;
		/*if (gold >= meleeMinionCost)
			document.getElementById("buyMeleeMinion").disabled = false;
		else
			document.getElementById("buyMeleeMinion").disabled = true;*/
	}
	// Update Caster Minion Button
	if (buyCasterMinionBlockTrue)
	{
		document.getElementById("buyCasterMinion").innerHTML = "Buy Caster Minion for " + casterMinionCost.toFixed(0) + " gold";
		document.getElementById("buyCasterMinion").disabled = (gold < casterMinionCost) ? true:false;
		/*if (gold >= casterMinionCost)
			document.getElementById("buyCasterMinion").disabled = false;
		else
			document.getElementById("buyCasterMinion").disabled = true;*/
	}
	// Update Siege Minion Button
	if (buySiegeMinionBlockTrue)
	{
		document.getElementById("buySiegeMinion").innerHTML = "Buy Siege Minion for " + siegeMinionCost.toFixed(0) + " gold";
		document.getElementById("buySiegeMinion").disabled = (gold < siegeMinionCost) ? true:false;
		/*if (gold >= siegeMinionCost)
			document.getElementById("buySiegeMinion").disabled = false;
		else
			document.getElementById("buySiegeMinion").disabled = true;*/
	}
}

function incrementGold() {
	gold += meleeMinionsOwned*meleeMinionProduction;
	gold += casterMinionsOwned*casterMinionProduction;
	gold += siegeMinionsOwned*siegeMinionProduction;
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