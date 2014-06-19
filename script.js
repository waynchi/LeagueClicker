//Initialization
$(document).ready(function() {
	tab('tab1'); // switch to first tab
});

//Variables
var myVar = setInterval(function(){incrementGold();updateButtons()},1000);
var gold = 0;
//minions
var minionsKilled = 0;
var minionKillGold = 1;
//melee minions
var meleeMinionsOwned = 0;
var baseMeleeCost = 10;
var meleeMinionCost = 10;
var meleeMinionProduction = 0.1;
//caster minions
var baseCasterCost = 50;
var casterMinionsOwned = 0;
var casterMinionCost = 50;
var casterMinionProduction = 0.7;
//siege minions
var siegeMinionsOwned = 0;
var baseSiegeCost = 200;
var siegeMinionCost = 200;
var siegeMinionProduction = 5;
//champions
var championsOwned = 0;
var baseChampionCost = 1000;
var championCost = 0;


//Variables that see if Element has been created
var buyChampionBlockTrue = true;
var killMinionBlockTrue = false;
var buyMeleeMinionBlockTrue = false;
var buyCasterMinionBlockTrue = false;
var buySiegeMinionBlockTrue = false;

function killMinion() {
	minionsKilled += 1;
	gold += minionKillGold;
	$("#Gold").text(gold.toFixed(1));
	$("#MinionsKilledCount").text(minionsKilled);
	updateButtons();
	if(!buyMeleeMinionBlockTrue && minionsKilled >= 10)
	{	
		buyMeleeMinionBlockTrue = true;
		showBuyMeleeMinion();
	}
}

//Called when Buy A Champion
function buyChampion() {
	if(championsOwned == 0)
	{
		championCost = 0;
	}
	if(gold >= championCost)
	{
		championsOwned ++;
		gold -= championCost;
		$("#Gold").text(gold.toFixed(1));
		//for later when we implement individual champs
		championCost = baseChampionCost * Math.pow(championsOwned,2);
		updateButtons();
		if(!killMinionBlockTrue)
		{
			showKillMinion();
			killMinionBlockTrue = !killMinionBlockTrue;
		}
	}
	
}

//Called when Buy Melee Minion Button is clicked
function buyMeleeMinion() {
	if(gold >= meleeMinionCost)
	{
		meleeMinionsOwned += 1;
		gold -= meleeMinionCost;
		$("#Gold").text(gold.toFixed(1));
		$("#MeleeMinionsOwned").text(meleeMinionsOwned);
		meleeMinionCost = baseMeleeCost * Math.pow(1.1,meleeMinionsOwned);
		updateButtons();
	}
	//Causes caster minions to show up
	if(!buyCasterMinionBlockTrue && meleeMinionsOwned >= 2 )
	{
		buyCasterMinionBlockTrue = true;
		showBuyCasterMinion();
	}
}

//Called when Buy Caster Minion Button is clicked
function buyCasterMinion() {
	if(gold >= casterMinionCost)
	{
		casterMinionsOwned += 1;
		gold -= casterMinionCost;
		$("#Gold").text(gold.toFixed(1));
		$("#CasterMinionsOwned").text(casterMinionsOwned);
		casterMinionCost = baseCasterCost * Math.pow(1.1,casterMinionsOwned);
		updateButtons();
	}
	//Causes siege minions to show up
	if(!buySiegeMinionBlockTrue && casterMinionsOwned >= 2)
	{
		buySiegeMinionBlockTrue = true;
		showBuySiegeMinion();
	}
}

//Called when Buy Siege Minion Button is clicked
function buySiegeMinion() {
	if(gold >= siegeMinionCost)
	{
		siegeMinionsOwned += 1;
		gold -= siegeMinionCost;
		$("#Gold").text(gold.toFixed(1));
		$("#SiegeMinionsOwned").text(siegeMinionsOwned);
		siegeMinionCost = baseSiegeCost * Math.pow(1.1, siegeMinionsOwned);
		updateButtons();
	}
	//Causes champions to show up
}

//Create element to Kill Minion
function showKillMinion() {
	// Create Button
	var buttonText = "Last Hit an Enemy Minion";
	$('<button/>', {
		id: 'minion',
		text: buttonText,
		click: function() {killMinion();},
		disabled: false
	}).appendTo('#KillMinionButton')
	//create text
	$('#KillMinionText').text("Minions Killed: ");
	$('#MinionsKilledCount').text('0');
}
	

//Create element to Buy Melee Minion
function showBuyMeleeMinion() {
	// Create button
	var buttonText = "Buy Melee Minion for " + meleeMinionCost.toFixed(0) + " gold";
	$('<button/>', {
		id: 'buyMeleeMinion',
		text: buttonText,
		click: function() {buyMeleeMinion();},
		disabled: function() {return (gold < meleeMinionCost) ? true:false;}
	}).appendTo('#MeleeMinionButton')
	// Create text
	$('#MeleeMinionsText').text("Melee Minions Owned: ");
	$('#MeleeMinionsOwned').text('0');
}

//Create element to Buy Caster Minion
function showBuyCasterMinion() {
	// Create button
	var buttonText = "Buy Caster Minion for " + casterMinionCost.toFixed(0) + " gold";
	$('<button/>', {
		id: 'buyCasterMinion',
		text: buttonText,
		click: function() {buyCasterMinion();},
		disabled: function() {return (gold < casterMinionCost) ? true:false;}
	}).appendTo('#CasterMinionButton')
	// Create text
	$('#CasterMinionsText').text("Caster Minions Owned: ");
	$('#CasterMinionsOwned').text('0');
}

//Create element to Buy Siege Minion
function showBuySiegeMinion() {
	// Create button
	var buttonText = "Buy Siege Minion for " + siegeMinionCost.toFixed(0) + " gold";
	$('<button/>', {
		id: 'buySiegeMinion',
		text: buttonText,
		click: function() {buySiegeMinion();},
		disabled: function() {return (gold < siegeMinionCost) ? true:false;}
	}).appendTo('#SiegeMinionButton')
	// Create text
	$('#SiegeMinionsText').text("Siege Minions Owned: ");
	$('#SiegeMinionsOwned').text('0');
}

function updateButtons() {
	// Update Melee Minion Button
	if (buyMeleeMinionBlockTrue)
	{
		$("#buyMeleeMinion").text("Buy Melee Minion for " + meleeMinionCost.toFixed(0) + " gold");
		$("#buyMeleeMinion").attr("disabled", (gold < meleeMinionCost) ? true:false);
	}
	// Update Caster Minion Button
	if (buyCasterMinionBlockTrue)
	{
		$("#buyCasterMinion").text("Buy Caster Minion for " + casterMinionCost.toFixed(0) + " gold");
		$("#buyCasterMinion").attr("disabled", (gold < casterMinionCost) ? true:false);
	}
	// Update Siege Minion Button
	if (buySiegeMinionBlockTrue)
	{
		$("#buySiegeMinion").text("Buy Siege Minion for " + siegeMinionCost.toFixed(0) + " gold");
		$("#buySiegeMinion").attr("disabled", (gold < siegeMinionCost) ? true:false);
	}
	// Update Buy Champion Button
	if (buyChampionBlockTrue)
	{
		//$("#buyChampionButton").text("Buy Champion for " + championCost.toFixed(0) + " gold");
		console.log("test");
		$("#buyChampionButton").attr("disabled", (gold < championCost) ? true:false);
	}
}

function incrementGold() {
	gold += meleeMinionsOwned*meleeMinionProduction;
	gold += casterMinionsOwned*casterMinionProduction;
	gold += siegeMinionsOwned*siegeMinionProduction;
	$("#Gold").text(gold.toFixed(1));
}

// Allows switching between tabs
function tab(tab) {
	$('#Content_Area > div').hide();
	$('#tabs > ul:first-of-type > li').removeClass();
	$('#' + tab).show();
	$('#li_' + tab).addClass('active');
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