//Initialization
$(document).ready(function() {
	tab('tab1'); // switch to first tab
	$('#buyChampion').click(buyChampion);
});



//Variables
var myVar = setInterval(function(){incrementGold()},1000);
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
		ownedSpanId: 'SiegeMinionsOwned',
		minionsOwned: 0,
		baseCost: 200,
		minionCost: 200,
		minionProduction: 5
	}]

//champions
var championsOwned = 0;
var baseChampionCost = 1000;
var championCost = 0;
//champion array list (currently testing 10)
var championList = [{
	name: "Ashe",
	type: "Ranged",
	skill: "Hawkshot"
	}, {
	name: "Teemo",
	type: "Ranged",
	skill: "Satan"
	}, {
	name: "Jax",
	type: "Melee",
	skill: "Champ"
	}, {
	name: "Riven",
	type: "Melee",
	skill: "Wings"
	}]
//Owned Champion List
var ownedChampionList = new Array();

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
		//adding the champion to the list
		var length = championList.length;
		var tempChamp = championList[Math.floor(Math.random()*length)];
		ownedChampionList.push(tempChamp);
		$("<li></li>", {
			id: tempChamp.name,
			class: 'champion',
			text: tempChamp.name
		}).appendTo("#ChampionList")
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
	if(gold >= minionData[minionEnum.MELEE].minionCost)
	{
		minionData[minionEnum.MELEE].minionsOwned += 1;
		gold -= minionData[minionEnum.MELEE].minionCost;
		$("#Gold").text(gold.toFixed(1));
		$("#MeleeMinionsOwned").text(minionData[minionEnum.MELEE].minionsOwned);
		minionData[minionEnum.MELEE].minionCost = minionData[minionEnum.MELEE].baseCost * Math.pow(1.1,minionData[minionEnum.MELEE].minionsOwned);
		updateButtons();
	}
	//Causes caster minions to show up
	if(!buyCasterMinionBlockTrue && minionData[minionEnum.MELEE].minionsOwned >= 2 )
	{
		buyCasterMinionBlockTrue = true;
		showMinionBlock(minionEnum.CASTER);
	}
}

//Called when Buy Caster Minion Button is clicked
function buyCasterMinion() {
	if(gold >= minionData[minionEnum.CASTER].minionCost)
	{
		minionData[minionEnum.CASTER].minionsOwned += 1;
		gold -= minionData[minionEnum.CASTER].minionCost;
		$("#Gold").text(gold.toFixed(1));
		$("#CasterMinionsOwned").text(minionData[minionEnum.CASTER].minionsOwned);
		minionData[minionEnum.CASTER].minionCost = minionData[minionEnum.CASTER].baseCost * Math.pow(1.1,minionData[minionEnum.CASTER].minionsOwned);
		updateButtons();
	}
	//Causes siege minions to show up
	if(!buySiegeMinionBlockTrue && minionData[minionEnum.CASTER].minionsOwned >= 2)
	{
		buySiegeMinionBlockTrue = true;
		showMinionBlock(minionEnum.SIEGE);
	}
}

//Called when Buy Siege Minion Button is clicked
function buySiegeMinion() {
	if(gold >= minionData[minionEnum.SIEGE].minionCost)
	{
		minionData[minionEnum.SIEGE].minionsOwned += 1;
		gold -= minionData[minionEnum.SIEGE].minionCost;
		$("#Gold").text(gold.toFixed(1));
		$("#SiegeMinionsOwned").text(minionData[minionEnum.SIEGE].minionsOwned);
		minionData[minionEnum.SIEGE].minionCost = minionData[minionEnum.SIEGE].baseCost * Math.pow(1.1, minionData[minionEnum.SIEGE].minionsOwned);
		updateButtons();
	}
	//Causes champions to show up
	if(!buyChampionBlockTrue && minionData[minionEnum.SIEGE].minionsOwned >= 2)
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
		$("#buyMeleeMinion").text("Buy Melee Minion for " + minionData[minionEnum.MELEE].minionCost.toFixed(0) + " gold");
		$("#buyMeleeMinion").attr("disabled", (gold.toFixed(1) < minionData[minionEnum.MELEE].minionCost) ? true:false);
	}
	// Update Caster Minion Button
	if (buyCasterMinionBlockTrue)
	{
		$("#buyCasterMinion").text("Buy Caster Minion for " + minionData[minionEnum.CASTER].minionCost.toFixed(0) + " gold");
		$("#buyCasterMinion").attr("disabled", (gold.toFixed(1) < minionData[minionEnum.CASTER].minionCost) ? true:false);
	}
	// Update Siege Minion Button
	if (buySiegeMinionBlockTrue)
	{
		$("#buySiegeMinion").text("Buy Siege Minion for " + minionData[minionEnum.SIEGE].minionCost.toFixed(0) + " gold");
		$("#buySiegeMinion").attr("disabled", (gold.toFixed(1) < minionData[minionEnum.SIEGE].minionCost) ? true:false);
	}
	// Update Buy Champion Button
	if (buyChampionBlockTrue)
	{
		$("#buyChampion").text("Buy Champion for " + championCost.toFixed(0) + " gold");
		$("#buyChampion").attr("disabled", (gold.toFixed(1) < championCost) ? true:false);
	}
}

function incrementGold() {
	gold += minionData[minionEnum.MELEE].minionsOwned*minionData[minionEnum.MELEE].minionProduction;
	gold += minionData[minionEnum.CASTER].minionsOwned*minionData[minionEnum.CASTER].minionProduction;
	gold += minionData[minionEnum.SIEGE].minionsOwned*minionData[minionEnum.SIEGE].minionProduction;
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