//Initialization
$(document).ready(function() {
	tab('tab1'); // switch to first tab
	$('#buyChampion').click(buyChampion);
});



//Variables
var myVar = setInterval(function(){incrementGold();updateButtons()},1000);
var gold = 0;
//minions
var minionsKilled = 0;
var minionKillGold = 1;

var minionEnum = {
	MELEE: 0,
	CASTER: 1,
	SIEGE: 2
}

var minionData = [{
		name: "Melee Minion",
		buttonIdText: 'buyMeleeMinion',
		buttonClickFunction: function() {buyMeleeMinion();},
		buttonSpanId: '#MeleeMinionButton',
		textSpanId: '#MeleeMinionsText',
		ownedSpanId: '#MeleeMinionsOwned',
		minionsOwned: 0,
		baseCost: 10,
		minionCost: 10,
		minionProduction: 0.1
	}, {
		name: "Caster Minion",
		buttonIdText: 'buyCasterMinion',
		buttonClickFunction: function() {buyCasterMinion();},
		buttonSpanId: '#CasterMinionButton',
		textSpanId: '#CasterMinionsText',
		ownedSpanId: '#CasterMinionsOwned',
		minionsOwned: 0,
		baseCost: 50,
		minionCost: 50,
		minionProduction: 0.7
	}, {
		name: "Siege Minion",
		buttonIdText: 'buySiegeMinion',
		buttonClickFunction: function() {buySiegeMinion();},
		buttonSpanId: '#SiegeMinionButton',
		textSpanId: '#SiegeMinionsText',
		ownedSpanId: '#SiegeMinionsOwned',
		minionsOwned: 0,
		baseCost: 200,
		minionCost: 200,
		minionProduction: 5
	}]

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
		showMinionBlock(minionEnum.MELEE);
	}
}

//Called when Buy A Champion is clicked
function buyChampion() {
	if(championsOwned == 0)
	{
		championCost = 0;
		$("#buyChampion").remove();
		buyChampionBlockTrue = false;
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
		showMinionBlock(minionEnum.CASTER);
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
		showMinionBlock(minionEnum.SIEGE);
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
	if(!buyChampionBlockTrue && siegeMinionsOwned >= 2)
	{
		buyChampionBlockTrue = true;
		showBuyChampion();
	}
}

//Create element to Buy Champion
function showBuyChampion() {
	//Create Button
	var buttonText = "Buy Champion for " + championCost.toFixed(0) + " gold";
	$('<button/>', {
		id: 'buyChampion',
		text: buttonText,
		click: function() {buyChampion();},
		disabled: (gold < championCost) ? true:false
	}).appendTo('#buyChampionButton')
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
	
// Shows Buy Minion Blocks
function showMinionBlock(minionType) {
	console.log(minionType);
	var buttonText = "Buy " + minionData[minionType].name + " for " + 
		minionData[minionType].minionCost + " gold";
	$('<button/>', {
		id: minionData[minionType].buttonIdText,
		text: buttonText,
		click: minionData[minionType].buttonClickFunction,
		disabled: function() {return (gold < minionData[minionType].minionCost) ? true:false;}
	}).appendTo(minionData[minionType].buttonSpanId)
	// Create text
	$(minionData[minionType].textSpanId).text(minionData[minionType].name + "s Owned: ");
	$(minionData[minionType].ownedSpanId).text('0');
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
		$("#buyChampion").text("Buy Champion for " + championCost.toFixed(0) + " gold");
		$("#buyChampion").attr("disabled", (gold < championCost) ? true:false);
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