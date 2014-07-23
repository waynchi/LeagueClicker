//Initialization
$(document).ready(function() {
	tab('tab1'); // switch to first tab
	$('#buyChampion').click(buyChampion);
/*	$('#SaveGameButton').click(function() {saveData();saveState(saveFile);});
	$('#LoadGameButton').click(gameStart);*/
	$('#clearButton').click(function() {clear()});
});

//Variables
var myVar = setInterval(function(){incrementGold(); scheduler();},100);
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
	name: "Annie",
	type: "Ranged",
	skill: "Tibbers"
	}, {
	name: "Ashe",
	type: "Ranged",
	skill: "Hawkshot"
	}, {
	name: "Caitlyn",
	type: "Ranged",
	skill: "Sniper"
	}, {
	name: "Jax",
	type: "Melee",
	skill: "Champ"
	}, {
	name: "Riven",
	type: "Melee",
	skill: "Wings"
	}
	]
//Owned Champion List
var ownedChampionList = new Array();

//Upgrade List
//First Upgrades
var firstUpgradeList = [{
	name: "Teamwork",
	id: "teamwork",
	cost: 4000,
	buttonClickFunction: function () {teamwork();},
	owned: false,
	detail: "Your minions work as a team. For each melee and caster minion pair, gain additional gold income",
	ability: function() {return (Math.min(minionData[0].minionsOwned, minionData[1].minionsOwned)*0.1)}
	} , {
	name: "Inhibitor",
	id: "inhibitor",
	cost: 6000,
	buttonClickFunction: function() {inhibitor(); },
	owned: false,
	detail: "Destroy an inhibitor. Gain the ability to create Super Minions",
	ability: function() {return minionData[2].minionsOwned*minionData[2].minionProduction*0.5}
	}, {
	name: "Advanced CM",
	id: "advancedCM",
	cost: 10000,
	buttonClickFunction: function() {advancedCM();},
	owned: false,
	detail: "Power ups your Caster Minions. They kill faster and, as a result, generate more gold",
	ability: function() {return (minionData[1].minionsOwned)*(minionData[1].minionProduction)*0.1}
	}]

//Variables that see if Element has been created
var buyChampionBlockTrue = false;
var killMinionBlockTrue = false;
var buyMeleeMinionBlockTrue = false;
var buyCasterMinionBlockTrue = false;
var buySiegeMinionBlockTrue = false;
var buyFirstUpgradeBlockTrue = false;

// Variables for stats tab
var totalGold = 0;
var gameStarted = 0;
var totalMinionsOwned = 0;
var enemyTeemosKilled = 0;

//Variable that stores champions in a Summoner's Rift Battle
var battlingChampions = [];

//JSON save storage array
var saveFile = [];

//SAVING
//gameStart();

$( window ).load(function() {
  gameStart();
});

//HTML 5 DOM SAVE
function saveState(state) { 
    window.localStorage.setItem("gameState", JSON.stringify(state)); 
	console.log("save");
} 
 
function restoreState() { 
    var state = window.localStorage.getItem("gameState"); 
	console.log("restore");
    if (state) { 
        return JSON.parse(state); 
		console.log("found save");
    } else { 
        return null; 
    } 
}

//Triggers at the start of the game
function gameStart() {
	var gameState = restoreState();
	if(gameState)
	{
		gameState.reverse();
		console.log(gameState); // debugging purposes
		gold = gameState.pop();
		minionsKilled = gameState.pop();
		minionKillGold = gameState.pop();
		minionData = JSON.parse(gameState.pop());
		minionData[minionEnum.MELEE].buttonClickFunction = function() {buyMeleeMinion()};
		minionData[minionEnum.CASTER].buttonClickFunction = function() {buyCasterMinion()};
		minionData[minionEnum.SIEGE].buttonClickFunction = function() {buySiegeMinion()};
		championsOwned = gameState.pop();
		championCost = gameState.pop();
		//May need to change how this works depending on whether or not updates will be available
		championList = JSON.parse(gameState.pop());
		ownedChampionList = JSON.parse(gameState.pop());
		var tempFirstUpgradeList = JSON.parse(gameState.pop());
		jQuery.each(firstUpgradeList, function(index,value) {
			value.owned = tempFirstUpgradeList[index].owned;
		})
		buyChampionBlockTrue = gameState.pop();
		killMinionBlockTrue = gameState.pop();
		buyMeleeMinionBlockTrue = gameState.pop();
		buyCasterMinionBlockTrue = gameState.pop();
		buySiegeMinionBlockTrue = gameState.pop();
		buyFirstUpgradeBlockTrue = gameState.pop();
		if(championsOwned > 0)
		{
			$("#buyChampion").remove();
			$("#tabs").show();
			$("#li_tab1").show();
			$("#li_tab4").show();
			$("#li_tab5").show();
		}
		if(buyChampionBlockTrue){
			$("#GoldContentArea").show();
			//updateButtons();
			showBuyChampion();}
		if(killMinionBlockTrue){
			if(!buyChampionBlockTrue)
			{
				$("#GoldContentArea").show();
			}
			showKillMinion();}
		if(buyMeleeMinionBlockTrue){
			showMinionBlock(minionEnum.MELEE);
			$("#GoldPSContentArea").show();}
		if(buyCasterMinionBlockTrue){
			showMinionBlock(minionEnum.CASTER);}
		if(buySiegeMinionBlockTrue){
			showMinionBlock(minionEnum.SIEGE);}
		if(buyFirstUpgradeBlockTrue){
			showFirstUpgrades();
			$("#li_tab2").show();
			jQuery.each(firstUpgradeList, function(index,value) {
				if(value.owned)
				{
					value.buttonClickFunction();
				}
			})
		}
		if(ownedChampionList.length != 0)
		{
			jQuery.each(ownedChampionList, function(index,value){
				var tr = $("<tr></tr>", {
					id: value.name,
					class: 'champion',
				}).appendTo("#ChampionList");
				var img = $("<td/>").append($("<img/>", {
					class: 'championImage',
					src: 'img/' + value.name + '.png'
				}));
				var text = $("<td/>").append($("<span/>", {
					class: 'championText',
					text: value.name
				}));
				var type = $("<td/>").append($("<span/>", {
					class: 'championText',
					text: value.type
				}));
				var skill = $("<td/>").append($("<span/>", {
					class: 'championText',
					text: value.skill
				}));
				tr.append(img).append(text).append(type).append(skill);	
			})
		}
		updateButtons();
		$("#Gold").text(gold.toFixed(1));
		updateGoldPS();
	}
}

//Used to clear HTML 5 DOM save
function clear() {
	window.localStorage.clear();
	
}

//When the save game Button Is Pressed
function saveData() {
	//empty the array
	while(saveFile.length > 0)
	{
		saveFile.pop();
	}
	saveFile.push(gold);
	saveFile.push(minionsKilled);
	saveFile.push(minionKillGold);
	saveFile.push(JSON.stringify(minionData));
	saveFile.push(championsOwned);
	saveFile.push(championCost);
	saveFile.push(JSON.stringify(championList));
	saveFile.push(JSON.stringify(ownedChampionList));
	saveFile.push(JSON.stringify(firstUpgradeList));
	saveFile.push(buyChampionBlockTrue);
	saveFile.push(killMinionBlockTrue);
	saveFile.push(buyMeleeMinionBlockTrue);
	saveFile.push(buyCasterMinionBlockTrue);
	saveFile.push(buySiegeMinionBlockTrue);
	saveFile.push(buyFirstUpgradeBlockTrue);
}	

//combines saveData and saveState
function save() {
	saveData();
	saveState(saveFile);
}



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

//UPGRADES
//buying Teamwork
function teamwork() {
	firstUpgradeList[0].owned = true;
	updateGoldPS();
	$('#teamwork').remove();
}

function inhibitor() {
	firstUpgradeList[1].owned = true;
	updateGoldPS();
	minionData[2].name = "Super Minion";
	$(minionData[2].textSpanId).text(minionData[2].name + "s Owned: ");
	updateButtons();
	$('#inhibitor').remove();
}

function advancedCM() {
	firstUpgradeList[2].owned = true;
	updateGoldPS();
	$('#advancedCM').remove();
}

//Called when Buy A Champion is clicked
function buyChampion() {
	if(championsOwned == 0)
	{
		championCost = 0;
		$("#buyChampion").remove();
		buyChampionBlockTrue = false;
		$("#tabs").show();
		$("#li_tab1").show();
		$("#li_tab4").show();
		$("#li_tab5").show();
		$("#GoldContentArea").show();
	}
	if(gold >= championCost)
	{
		championsOwned ++;
		gold -= championCost;
		$("#Gold").text(gold.toFixed(1));
		//adding the champion to the list
		var length = championList.length;
		var tempChamp = championList[Math.floor(Math.random()*length)];
		//adding champion to owned
		ownedChampionList.push(tempChamp);
		var tr = $("<tr></tr>", {
			id: tempChamp.name,
			class: 'champion',
		}).appendTo("#ChampionList");
		var img = $("<td/>").append($("<img/>", {
			class: 'championImage',
			src: 'img/' + tempChamp.name + '.png'
		}));
		var text = $("<td/>").append($("<span/>", {
			class: 'championText',
			text: tempChamp.name
		}));
		var type = $("<td/>").append($("<span/>", {
			class: 'championText',
			text: tempChamp.type
		}));
		var skill = $("<td/>").append($("<span/>", {
			class: 'championText',
			text: tempChamp.skill
		}));
		tr.append(img).append(text).append(type).append(skill);
		//deleting champion from available
		delete championList[championList.indexOf(tempChamp)];
		championList.sort();
		championList.length--;
		championCost = baseChampionCost * Math.pow(championsOwned,2);
		updateButtons();
		/* if(!killMinionBlockTrue)
		{
			showKillMinion();
			killMinionBlockTrue = !killMinionBlockTrue;
		}
		if(!buyFirstUpgradeBlockTrue && ownedChampionList.length == 2)
		{
			buyFirstUpgradeBlockTrue = true;
			showFirstUpgrades();
			$("#li_tab2").show();
		} */
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
		updateGoldPS();
		$("#GoldPSContentArea").show();
	}
	//Causes caster minions to show up
	/* if(!buyCasterMinionBlockTrue && minionData[minionEnum.MELEE].minionsOwned >= 2 )
	{
		buyCasterMinionBlockTrue = true;
		showMinionBlock(minionEnum.CASTER);
	} */
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
		updateGoldPS();
	}
	//Causes siege minions to show up
	/* if(!buySiegeMinionBlockTrue && minionData[minionEnum.CASTER].minionsOwned >= 2)
	{
		buySiegeMinionBlockTrue = true;
		showMinionBlock(minionEnum.SIEGE);
	} */
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
		updateGoldPS();
	}
	//Causes champions to show up
	/* if(!buyChampionBlockTrue && minionData[minionEnum.SIEGE].minionsOwned >= 2)
	{
		buyChampionBlockTrue = true;
		showBuyChampion();
	} */
}

//Create Element to Buy First Set of Upgrades
function showFirstUpgrades() {
	jQuery.each(firstUpgradeList, function(index,value) {
		var listID = '#' + value.id;
		if($(listID).length == 0)
		{
			var tr = $("<tr></tr>", {
				id: value.id,
				class: "upgrade"
			}).appendTo('#UpgradeList');
			
			var buttontd = $("<td/>").appendTo('#' + value.id);

			buttontd.append($("<button/>", {
				id: value.id + 'Button',
				text: "Buy",
				click: value.buttonClickFunction,
				disabled: false
			}));

			$("<td/>", {
				text: value.name
			}).appendTo('#' + value.id);

			$("<td/>", {
				text: value.cost
			}).appendTo('#' + value.id);

			$('<td/>', {
				id: value.id + "Detail",
				class: 'UpgradeDetails',
				text: value.detail
			}).appendTo('#' + value.id);
		}
	});
}

//Create element to Buy Champion
function showBuyChampion() {
	//Create Button
	var buttonText = "Buy Champion for " + championCost.toFixed(0) + " gold";
	if($('#buyChampion').length == 0)
	{
		$('<button/>', {
			id: 'buyChampion',
			text: buttonText,
			click: function() {buyChampion();},
			disabled: (gold < championCost) ? true:false
		}).appendTo('#buyChampionButton')
	}
}
		
		

//Create element to Kill Minion
function showKillMinion() {
	// Create Button
	var buttonText = "Hit Teemo for Gold";
	console.log($('#minion').length);
	if($('#minion').length == 0)
	{
		$('<button/>', {
			id: 'minion',
			//text: buttonText,
			click: function() {killMinion();},
			disabled: false
		}).appendTo('#KillMinionButton');
		$('<img></img>', {
			id: 'teemoImg',
			src: 'img/TeemoHurt.png'
		}).appendTo('#minion');
		//$('#teemoImg').mousedown(function() {$('#teemoImg').attr("src", 'img/TeemoHurt.png');});
		//$('#teemoImg').mouseup(function() {$('#teemoImg').attr("src", 'img/Teemo.png');});
		//create text
		$('#KillMinionText').text("Minions Killed: ");
		$('#MinionsKilledCount').text(minionsKilled);
	}
}
	
// Shows Buy Minion Blocks
function showMinionBlock(minionType) {
	console.log(minionType);
	var buttonText = "Buy " + minionData[minionType].name + " for " + 
		minionData[minionType].minionCost + " gold";
	console.log($("#"+minionData[minionType].buttonIdText).length);
	if($("#"+minionData[minionType].buttonIdText).length == 0)
	{
		$('<button/>', {
			id: minionData[minionType].buttonIdText,
			text: buttonText,
			click: minionData[minionType].buttonClickFunction,
			disabled: function() {return (gold < minionData[minionType].minionCost) ? true:false;}
		}).appendTo(minionData[minionType].buttonSpanId)
		// Create text
		$(minionData[minionType].textSpanId).text(minionData[minionType].name + "s Owned: ");
		$(minionData[minionType].ownedSpanId).text(minionData[minionType].minionsOwned);
	}
}

//Putting Champions into Queue
function addChampionToQueue(champion) {
	var buttonID = '#' + champion.name + 'Button';
	$(buttonID).remove();
	$('<button></button>', {
		id: champion.name + 'Button',
		class: 'championButton',  //change this to it's own thing later
		click: function() {removeChampionFromQueue(champion);}
	}).appendTo('#championsInQueue');
	$('<img></img>', {
		class: 'championImage',
		src: 'img/' + champion.name + '.png'
	}).appendTo(buttonID);
	
	battlingChampions.push(champion);
}

//Removing Champions from Queue
function removeChampionFromQueue(champion) {
	var buttonID = '#' + champion.name + 'Button';
	var optionID = '#' + champion.name + 'Option';
	$(buttonID).remove();
	$('<button></button>', {
		id: champion.name + 'Button',
		class: 'championButton',
		click: function() {addChampionToQueue(champion);}
	}).appendTo(optionID);
	$('<img></img', {
		class: 'championImage',
		src: 'img/' + champion.name + '.png'
	}).appendTo(buttonID);
	
	jQuery.each(battlingChampions, function(index, value) {
		if(value.name == champion.name)
		{
			battlingChampions.splice(index,1);
		}
	});
}
//Enter Battle
function enterBattle() {
}
function updateButtons() {
	// Update Melee Minion Button
	if (buyMeleeMinionBlockTrue)
	{
		$("#buyMeleeMinion").text("Buy " + minionData[0].name + " for " + minionData[minionEnum.MELEE].minionCost.toFixed(0) + " gold");
		$("#buyMeleeMinion").attr("disabled", (gold.toFixed(1) < minionData[minionEnum.MELEE].minionCost) ? true:false);
	}
	// Update Caster Minion Button
	if (buyCasterMinionBlockTrue)
	{
		$("#buyCasterMinion").text("Buy " + minionData[1].name + " for " + minionData[minionEnum.CASTER].minionCost.toFixed(0) + " gold");
		$("#buyCasterMinion").attr("disabled", (gold.toFixed(1) < minionData[minionEnum.CASTER].minionCost) ? true:false);
	}
	// Update Siege Minion Button
	if (buySiegeMinionBlockTrue)
	{
		$("#buySiegeMinion").text("Buy " + minionData[2].name + " for " + minionData[minionEnum.SIEGE].minionCost.toFixed(0) + " gold");
		$("#buySiegeMinion").attr("disabled", (gold.toFixed(1) < minionData[minionEnum.SIEGE].minionCost) ? true:false);
	}
	// Update Buy Champion Button
	if (buyChampionBlockTrue)
	{
		$("#buyChampion").text("Buy Champion for " + championCost.toFixed(0) + " gold");
		$("#buyChampion").attr("disabled", ((gold.toFixed(1) < championCost) || championList.length == 0) ? true:false);
	}
	// Update Buy Upgrade Buttons
	if (buyFirstUpgradeBlockTrue) {
		jQuery.each(firstUpgradeList, function(index, value) {
	  		//iterate through array
	 	 	var upgradeButtonID = '#' + value.id + 'Button';
	  		$(upgradeButtonID).attr("disabled", ((gold.toFixed(1) < value.cost) || ownedChampionList.length == 0) ? true:false);
		});
	}
}


function scheduler() {
	//Increments gameStarted
	gameStarted += 1 / (60 * 60 * 10);
	//Open Battle Tab
	if(ownedChampionList.length >= 5 )
	{
		$("#li_tab3").show();
	}
	//Show Kill Minion Button
	if(ownedChampionList.length == 1 && !killMinionBlockTrue)
	{
		showKillMinion();
		killMinionBlockTrue = !killMinionBlockTrue;
	}
	//Show Upgrades Tab
	if(!buyFirstUpgradeBlockTrue && ownedChampionList.length == 2)
	{
		buyFirstUpgradeBlockTrue = true;
		showFirstUpgrades();
		$("#li_tab2").show();
	}
	//Show Caster Minion Button
	if(!buyCasterMinionBlockTrue && minionData[minionEnum.MELEE].minionsOwned >= 2 )
	{
		buyCasterMinionBlockTrue = true;
		showMinionBlock(minionEnum.CASTER);
	}
	//Show Siege Minion Button
	if(!buySiegeMinionBlockTrue && minionData[minionEnum.CASTER].minionsOwned >= 2)
	{
		buySiegeMinionBlockTrue = true;
		showMinionBlock(minionEnum.SIEGE);
	}
	//Show Champion Button
	if(!buyChampionBlockTrue && minionData[minionEnum.SIEGE].minionsOwned >= 2)
	{
		buyChampionBlockTrue = true;
		showBuyChampion();
	}
	//Updates Battle Dropdown Selector
	jQuery.each(ownedChampionList, function(index,value) {
		var optionID = '#' + value.name + 'Option';
		var buttonID = '#' + value.name + 'Button';
		if($(optionID).length == 0)
		{
			console.log("TEST2");
			$('<span></span>', {
				id: value.name + 'Option',
				//text: value.name
			}).appendTo('#battleSelect')
			$('<button></button>', {
				id: value.name + 'Button',
				class: 'championButton',  //change this to it's own thing later
				click: function() {addChampionToQueue(value);}
				//src: 'img/' + value.name + '.png'
			}).appendTo(optionID);
			$('<img></img>', {
				class: 'championImage',
				src: 'img/' + value.name + '.png'
			}).appendTo(buttonID);
		}
	});
}

// Called every second (100 ms for debugging purposes)
function incrementGold() {
	gold += updateGoldPS();
	gold = Math.round(gold * 10) / 10; // rounds to nearest tenth
	totalGold += updateGoldPS();
	totalGold = Math.round(totalGold * 10) / 10; // rounds to nearest tenth
	$("#Gold").text(gold.toFixed(1)); // converts to string with one decimal digit
	updateButtons();
}

// Updates and returns gold generated per second
function updateGoldPS() {
	var arrayLength = minionData.length;
	var goldPerSecond = 0;
	for (var i = 0; i < arrayLength; i++) {
		goldPerSecond += minionData[i].minionsOwned*minionData[i].minionProduction;
	}
	jQuery.each(firstUpgradeList, function(index , value)
	{
		if(value.owned)
		{
			goldPerSecond += value.ability();
		}
	})
	$("#GoldPS").text(goldPerSecond.toFixed(1));
	return goldPerSecond;
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
	return 0;
}

function give()
{
	gold += 100000000;
	updateButtons();
	incrementGold();
	return 0;
}