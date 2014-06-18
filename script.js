//Initialization
$(document).ready(function() {
	tab('tab1'); // switch to first tab
});

//Variables
var myVar = setInterval(function(){updateGold()},1000);
var gold = 0;
var minionsKilled = 0;
var meleeMinionsOwned = 0;
var casterMinionsOwned = 0;

//Variables that see if Element has been created
var buyMeleeMinionBlockTrue = false;
var buyCasterMinionBlockTrue = false;

function killMinion() {
	minionsKilled += 1;
	gold += 1;
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
	if(gold >=10)
	{
		meleeMinionsOwned +=1;
		gold -= 10;
		document.getElementById("Gold").innerHTML = gold.toFixed(1);
		document.getElementById("MeleeMinionsOwned").innerHTML = meleeMinionsOwned;
	}
	if(meleeMinionsOwned >= 2 && !buyCasterMinionBlockTrue)
	{
		buyCasterMinionBlockTrue = true;
		showBuyCasterMinion();
	}
}

//when Buy Caster Minion Button is clicked
function buyCasterMinion() {
	if(gold >= 50)
	{
		casterMinionsOwned +=1;
		gold -= 50;
		document.getElementById("Gold").innerHTML = gold.toFixed(1);
		document.getElementById("CasterMinionsOwned").innerHTML = casterMinionsOwned;
	}
}

//create element to Buy Melee Minion
function showBuyMeleeMinion() {
	//creating Buttons and Text
	var buyMinionBtn = document.createElement("Button");
	var buyMinionTxt = document.createTextNode("Buy Melee Minion");
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
	var buyMinionTxt = document.createTextNode("Buy Caster Minion");
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

function updateGold() {
	gold += meleeMinionsOwned*0.1;
	gold += casterMinionsOwned*0.7;
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
