class ShopBank {}

ShopBank.start=18;

ShopBank.getTownName = function(shopNumber) {
	if(shopNumber==0) return "CalcTown";
	if(shopNumber==1) return "Derivative Dell";
	if(shopNumber==2) return "Castle Town";
	if(shopNumber==3) return "Snowville";
	if(shopNumber==4) return "Sine City";
	return "";
}
	
ShopBank.getInnLowQuestion = function(shopNumber) {
	if(shopNumber==0) return 0;
	if(shopNumber==1) return 3;
	if(shopNumber==2) return 7;
	if(shopNumber==3) return 10;
	if(shopNumber==4) return 0;
	return 0;
}
	
ShopBank.getInnHighQuestion = function(shopNumber) {
	if(shopNumber==0) return 5;
	if(shopNumber==1) return 10;
	if(shopNumber==2) return 15;
	if(shopNumber==3) return 20;
	if(shopNumber==4) return 20;
	return 0;
}
	
ShopBank.getInnReturnInfo = function(shopNumber) {
	if(shopNumber==0) return [24,27,1];
	if(shopNumber==1) return [20,40,14];
	if(shopNumber==2) return [61,34,13];
	if(shopNumber==3) return [10,19,16];
	if(shopNumber==4) return [12,37,18];
	return [1,1,1];
}
	
		
/////////////////////////////////////////////////////////////////////////////////////////////
	
ShopBank.getItemShopLowQuestion = function(shopNumber) {
	if(shopNumber==0) return 0;
	if(shopNumber==1) return 3;
	if(shopNumber==2) return 7;
	if(shopNumber==3) return 10;
	if(shopNumber==4) return 0;
	return 0;
}
	
ShopBank.getItemShopHighQuestion = function(shopNumber) {
	if(shopNumber==0) return 5;
	if(shopNumber==1) return 10;
	if(shopNumber==2) return 15;
	if(shopNumber==3) return 20;
	if(shopNumber==4) return 20;
	return 0;
}
	
ShopBank.getItemShopWares = function(shopNumber) {
	var wares = [];
	if(shopNumber == 0) {
		wares = [];
		wares[0] = Item.getItem(0);
		wares[1] = Item.getItem(1);
		wares[2] = Item.getItem(2);
		wares[3] = Item.getItem(3);
		wares[4] = Item.getItem(4);
	}
	if(shopNumber == 1) {
		wares = [];
		wares[0] = Item.getItem(0);
		wares[1] = Item.getItem(1);
		wares[2] = Item.getItem(2);
		wares[3] = Item.getItem(3);
		wares[4] = Item.getItem(4);
	}
	if(shopNumber == 2) {
		wares = [];
		wares[0] = Item.getItem(0);
		wares[1] = Item.getItem(1);
		wares[2] = Item.getItem(2);
		wares[3] = Item.getItem(3);
		wares[4] = Item.getItem(4);
		wares[5] = Item.getItem(5);
		wares[6] = Item.getItem(6);
		wares[7] = Item.getItem(10);
	}
	if(shopNumber == 3) {
		wares = [];
		wares[0] = Item.getItem(0);
		wares[1] = Item.getItem(1);
		wares[2] = Item.getItem(2);
		wares[3] = Item.getItem(3);
		wares[4] = Item.getItem(4);
		wares[5] = Item.getItem(5);
		wares[6] = Item.getItem(6);
		wares[7] = Item.getItem(7);
		wares[8] = Item.getItem(10);
	}
	if(shopNumber == 4) {
		wares = [];
		wares[0] = Item.getItem(0);
		wares[1] = Item.getItem(1);
		wares[2] = Item.getItem(2);
		wares[3] = Item.getItem(3);
		wares[4] = Item.getItem(4);
		wares[5] = Item.getItem(5);
		wares[6] = Item.getItem(6);
		wares[7] = Item.getItem(7);
		wares[8] = Item.getItem(8);
		wares[9] = Item.getItem(9);
		wares[10] = Item.getItem(10);
	}
	return wares;
}
	
ShopBank.getItemShopReturnInfo = function(shopNumber) {
	if(shopNumber==0) return [37,27,1];
	if(shopNumber==1) return [28,36,14];
	if(shopNumber==2) return [74,34,13];
	if(shopNumber==3) return [31,34,16];
	if(shopNumber==4) return [12,46,18];
	return [1,1,1];
}

/////////////////////////////////////////////////////////////////////////////////////////////
	
ShopBank.getTrainingValidity = function(shopNumber, p) {
	var temp = [];
	for(var i = 0; i < 6; i++) {
		temp[i] = "Can Train";
	}
	for(var i = 0; i < 6; i++) {
		if(p.getGold() < ShopBank.getTrainingPrices(shopNumber)[i])
			temp[i] = "Need Gold";
	}
	if(p.getExperience() < Player.getLevelingRequirements(p.getLevel()+1))
		temp[0] = "Need " + (Player.getLevelingRequirements(p.getLevel()+1) - p.getExperience()).toString() + " XP";
	if(p.getHpMax() > Player.getHpLimits(p.getLevel()))
		temp[1] = "Need Level " + (p.getLevel() + 1).toString();
	if(p.getSpMax() > Player.getSpLimits(p.getLevel()))
		temp[2] = "Need Level " + (p.getLevel() + 1).toString();
	if(p.getMpMax() > Player.getMpLimits(p.getLevel()))
		temp[3] = "Need Level " + (p.getLevel() + 1).toString();
	if(p.getStrength() > Player.getStrengthLimits(p.getLevel()))
		temp[4] = "Need Level " + (p.getLevel() + 1).toString();
	if(p.getDefense() > Player.getDefenseLimits(p.getLevel()))
		temp[5] = "Need Level " + (p.getLevel() + 1).toString();
	if(shopNumber==0) {
		if(p.getLevel() >= 5) temp[0] = "Maxed";
		if(p.getHp() >= Player.getHpLimits(5)) temp[1] = "Maxed";
		if(p.getSp() >= Player.getSpLimits(5)) temp[2] = "Maxed";
		if(p.getMp() >= Player.getMpLimits(5)) temp[3] = "Maxed";
		if(p.getStrength() >= Player.getStrengthLimits(5)) temp[4] = "Maxed";
		if(p.getDefense() >= Player.getDefenseLimits(5)) temp[5] = "Maxed";
	}
	if(shopNumber==1) {
		if(p.getLevel() >= 7) temp[0] = "Maxed";
		if(p.getHp() >= Player.getHpLimits(7)) temp[1] = "Maxed";
		if(p.getSp() >= Player.getSpLimits(7)) temp[2] = "Maxed";
		if(p.getMp() >= Player.getMpLimits(7)) temp[3] = "Maxed";
		if(p.getStrength() >= Player.getStrengthLimits(7)) temp[4] = "Maxed";
		if(p.getDefense() >= Player.getDefenseLimits(7)) temp[5] = "Maxed";
	}
	if(shopNumber==2) {
		if(p.getLevel() >= 11) temp[0] = "Maxed";
		if(p.getHp() >= Player.getHpLimits(11)) temp[1] = "Maxed";
		if(p.getSp() >= Player.getSpLimits(11)) temp[2] = "Maxed";
		if(p.getMp() >= Player.getMpLimits(11)) temp[3] = "Maxed";
		if(p.getStrength() >= Player.getStrengthLimits(11)) temp[4] = "Maxed";
		if(p.getDefense() >= Player.getDefenseLimits(11)) temp[5] = "Maxed";
	}
	if(shopNumber==3) {
		if(p.getLevel() >= 15) temp[0] = "Maxed";
		if(p.getHp() >= Player.getHpLimits(15)) temp[1] = "Maxed";
		if(p.getSp() >= Player.getSpLimits(15)) temp[2] = "Maxed";
		if(p.getMp() >= Player.getMpLimits(15)) temp[3] = "Maxed";
		if(p.getStrength() >= Player.getStrengthLimits(15)) temp[4] = "Maxed";
		if(p.getDefense() >= Player.getDefenseLimits(15)) temp[5] = "Maxed";
	}
	if(shopNumber==4) {
		if(p.getLevel() >= 19) temp[0] = "Maxed";
		if(p.getHp() >= Player.getHpLimits(19)) temp[1] = "Maxed";
		if(p.getSp() >= Player.getSpLimits(19)) temp[2] = "Maxed";
		if(p.getMp() >= Player.getMpLimits(19)) temp[3] = "Maxed";
		if(p.getStrength() >= Player.getStrengthLimits(19)) temp[4] = "Maxed";
		if(p.getDefense() >= Player.getDefenseLimits(19)) temp[5] = "Maxed";
	}
	return temp;
}
	
ShopBank.getTrainingPrices = function(shopNumber) {
	var costs = [];
	if(shopNumber == 0) {
		costs[0] = 100;
		costs[1] = 100;
		costs[2] = 100;
		costs[3] = 100;
		costs[4] = 200;
		costs[5] = 200;
	}
	if(shopNumber == 1) {
		costs[0] = 250;
		costs[1] = 250;
		costs[2] = 250;
		costs[3] = 250;
		costs[4] = 500;
		costs[5] = 500;
	}
	if(shopNumber == 2) {
		costs[0] = 335;
		costs[1] = 335;
		costs[2] = 335;
		costs[3] = 335;
		costs[4] = 670;
		costs[5] = 670;
	}
	if(shopNumber == 3) {
		costs[0] = 550;
		costs[1] = 550;
		costs[2] = 550;
		costs[3] = 550;
		costs[4] = 1100;
		costs[5] = 1100;
	}
	if(shopNumber == 4) {
		costs[0] = 1250;
		costs[1] = 1250;
		costs[2] = 1250;
		costs[3] = 1250;
		costs[4] = 2500;
		costs[5] = 2500;
	}
	return costs;
}
	
ShopBank.getTrainingReturnInfo = function(shopNumber) {
	if(shopNumber==0) return [11,25,1];
	if(shopNumber==1) return [28,45,14];
	if(shopNumber==2) return [81,34,13];
	if(shopNumber==3) return [31,22,16];
	if(shopNumber==4) return [20,44,18];
	return [1,1,1];
}
	
ShopBank.getTrainingLevelLowQuestion = function(shopNumber) {
	if(shopNumber==0) return 0;
	if(shopNumber==1) return 3;
	if(shopNumber==2) return 7;
	if(shopNumber==3) return 10;
	if(shopNumber==4) return 0;
	return 0;
}
	
ShopBank.getTrainingLevelHighQuestion = function(shopNumber) {
	if(shopNumber==0) return 5;
	if(shopNumber==1) return 10;
	if(shopNumber==2) return 15;
	if(shopNumber==3) return 20;
	if(shopNumber==4) return 20;
	return 0;
}
	
/////////////////////////////////////////////////////////////////////////////////////////////
	
ShopBank.getTrainingHPLowQuestion = function(shopNumber) {
	if(shopNumber==0) return 0;
	if(shopNumber==1) return 3;
	if(shopNumber==2) return 7;
	if(shopNumber==3) return 10;
	if(shopNumber==4) return 0;
	return 0;
}
	
ShopBank.getTrainingHPHighQuestion = function(shopNumber) {
	if(shopNumber==0) return 5;
	if(shopNumber==1) return 10;
	if(shopNumber==2) return 15;
	if(shopNumber==3) return 20;
	if(shopNumber==4) return 20;
	return 0;
}
	
/////////////////////////////////////////////////////////////////////////////////////////////
	
ShopBank.getTrainingSPLowQuestion = function(shopNumber) {
	if(shopNumber==0) return 0;
	if(shopNumber==1) return 3;
	if(shopNumber==2) return 7;
	if(shopNumber==3) return 10;
	if(shopNumber==4) return 0;
	return 0;
}
	
ShopBank.getTrainingSPHighQuestion = function(shopNumber) {
	if(shopNumber==0) return 5;
	if(shopNumber==1) return 10;
	if(shopNumber==2) return 15;
	if(shopNumber==3) return 20;
	if(shopNumber==4) return 20;
	return 0;
}
	
/////////////////////////////////////////////////////////////////////////////////////////////
	
ShopBank.getTrainingMPLowQuestion = function(shopNumber) {
	if(shopNumber==0) return 0;
	if(shopNumber==1) return 3;
	if(shopNumber==2) return 7;
	if(shopNumber==3) return 10;
	if(shopNumber==4) return 0;
	return 0;
}
	
ShopBank.getTrainingMPHighQuestion = function(shopNumber) {
	if(shopNumber==0) return 5;
	if(shopNumber==1) return 10;
	if(shopNumber==2) return 15;
	if(shopNumber==3) return 20;
	if(shopNumber==4) return 20;
	return 0;
}
	
////////////////////////////////////////////////////////////////////////////////////////////
	
ShopBank.getTrainingStrengthLowQuestion = function(shopNumber) {
	if(shopNumber==0) return 0;
	if(shopNumber==1) return 3;
	if(shopNumber==2) return 7;
	if(shopNumber==3) return 10;
	if(shopNumber==4) return 0;
	return 0;
}
	
ShopBank.getTrainingStrengthHighQuestion = function(shopNumber) {
	if(shopNumber==0) return 5;
	if(shopNumber==1) return 10;
	if(shopNumber==2) return 15;
	if(shopNumber==3) return 20;
	if(shopNumber==4) return 20;
	return 0;
}
	
////////////////////////////////////////////////////////////////////////////////////////////
	
ShopBank.getTrainingDefenseLowQuestion = function(shopNumber) {
	if(shopNumber==0) return 0;
	if(shopNumber==1) return 3;
	if(shopNumber==2) return 7;
	if(shopNumber==3) return 10;
	if(shopNumber==4) return 0;
	return 0;
}
	
ShopBank.getTrainingDefenseHighQuestion = function(shopNumber) {
	if(shopNumber==0) return 5;
	if(shopNumber==1) return 10;
	if(shopNumber==2) return 15;
	if(shopNumber==3) return 20;
	if(shopNumber==4) return 20;
	return 0;
}

///////////////////////////////////////////////////////////////////////////////////////////
	
ShopBank.getMagicShopLowQuestion = function(shopNumber) {
	if(shopNumber==0) return 0;
	if(shopNumber==1) return 3;
	if(shopNumber==2) return 7;
	if(shopNumber==3) return 10;
	if(shopNumber==4) return 0;
	return 0;
}
	
ShopBank.getMagicShopHighQuestion = function(shopNumber) {
	if(shopNumber==0) return 5;
	if(shopNumber==1) return 10;
	if(shopNumber==2) return 15;
	if(shopNumber==3) return 20;
	if(shopNumber==4) return 20;
	return 0;
}
	
ShopBank.getMagicShopValidity = function(shopNumber, p) {
	var wares = ShopBank.getMagicShopWares(shopNumber, p);
	var temp = []; 
	
	for(var i = 0; i < wares.length; i++) {
		temp[i] = "Can Train";
	}
	for(var i = 0; i < wares.length; i++) {
		if(p.getGold() < wares[i].getTrainingCost())
			temp[i] = "Need Gold";
	}
	for(var i = 0; i < wares.length; i++) {
		if(p.getLevel() < wares[i].getLevelRequirement(wares[i].getLevel()+1)) {
			temp[i] = "Need Level " + wares[i].getLevelRequirement(wares[i].getLevel()+1).toString();
		}
		if(wares[i].getLevelRequirement(wares[i].getLevel()+1) == -1) {
			temp[i] = "Maxed";
		}
	}
	if(shopNumber==0) {
		if(wares[0].getLevel() >= 3) temp[0] = "Maxed";
	}
	if(shopNumber==1) {
		if(wares[0].getLevel() >= 4) temp[0] = "Maxed";
		if(wares[1].getLevel() >= 3) temp[1] = "Maxed";
	}
	if(shopNumber==2) {
		if(wares[0].getLevel() >= 5) temp[0] = "Maxed";
		if(wares[1].getLevel() >= 7) temp[1] = "Maxed";
		if(wares[2].getLevel() >= 3) temp[2] = "Maxed";
		if(wares[3].getLevel() >= 5) temp[3] = "Maxed";
		if(wares[4].getLevel() >= 4) temp[4] = "Maxed";
	}
	if(shopNumber==3) {
		if(wares[0].getLevel() >= 10) temp[0] = "Maxed";
		if(wares[1].getLevel() >= 10) temp[1] = "Maxed";
		if(wares[2].getLevel() >= 4) temp[2] = "Maxed";
		if(wares[3].getLevel() >= 8) temp[3] = "Maxed";
		if(wares[4].getLevel() >= 6) temp[4] = "Maxed";
		if(wares[5].getLevel() >= 7) temp[5] = "Maxed";
		if(wares[6].getLevel() >= 7) temp[6] = "Maxed";
		if(wares[7].getLevel() >= 7) temp[7] = "Maxed";
		if(wares[8].getLevel() >= 8) temp[8] = "Maxed";
	}
	if(shopNumber==4) {
		if(wares[0].getLevel() >= 8) temp[0] = "Maxed";
		if(wares[1].getLevel() >= 8) temp[1] = "Maxed";
		if(wares[2].getLevel() >= 8) temp[2] = "Maxed";
		if(wares[3].getLevel() >= 8) temp[3] = "Maxed";
		if(wares[4].getLevel() >= 8) temp[4] = "Maxed";
		if(wares[5].getLevel() >= 8) temp[5] = "Maxed";
		if(wares[6].getLevel() >= 8) temp[6] = "Maxed";
		if(wares[7].getLevel() >= 8) temp[7] = "Maxed";
		if(wares[8].getLevel() >= 8) temp[8] = "Maxed";
		if(wares[9].getLevel() >= 8) temp[9] = "Maxed";
	}
	return temp;
}
	
ShopBank.getMagicShopWares = function(shopNumber, p) {
	var wares = [];
	if(shopNumber == 0) {
		wares = [];
		wares[0] = Spell.getSpell(1);
	}
	if(shopNumber == 1) {
		wares = [];
		wares[0] = Spell.getSpell(1);
		wares[1] = Spell.getSpell(5);
	}
	if(shopNumber == 2) {
		wares = [];
		wares[0] = Spell.getSpell(0);
		wares[1] = Spell.getSpell(1);
		wares[2] = Spell.getSpell(4);
		wares[3] = Spell.getSpell(5);
		wares[4] = Spell.getSpell(6);
	}
	if(shopNumber == 3) {
		wares = [];
		wares[0] = Spell.getSpell(0);
		wares[1] = Spell.getSpell(1);
		wares[2] = Spell.getSpell(2);
		wares[3] = Spell.getSpell(3);
		wares[4] = Spell.getSpell(4);
		wares[5] = Spell.getSpell(5);
		wares[6] = Spell.getSpell(6);
		wares[7] = Spell.getSpell(7);
		wares[8] = Spell.getSpell(8);
	}
	if(shopNumber == 4) {
		wares = [];
		wares[0] = Spell.getSpell(9);
		wares[1] = Spell.getSpell(10);
		wares[2] = Spell.getSpell(11);
		wares[3] = Spell.getSpell(12);
		wares[4] = Spell.getSpell(13);
		wares[5] = Spell.getSpell(14);
		wares[6] = Spell.getSpell(15);
		wares[7] = Spell.getSpell(16);
		wares[8] = Spell.getSpell(17);
		wares[9] = Spell.getSpell(18);
	}
	
	for(var i = 0; i < wares.length; i++) {
		for(var j = 0; j < p.getMagicCount();j++) {
			if(wares[i].getName() === p.getMagic(j).getName()) {
				wares[i] = p.getMagic(j);
			}
		}
	}
	return wares;
}
	
ShopBank.getMagicShopReturnInfo = function(shopNumber) {
	if(shopNumber==0) return [45,26,1];
	if(shopNumber==1) return [39,36,14];
	if(shopNumber==2) return [87,16,13];
	if(shopNumber==3) return [23,28,16];
	if(shopNumber==4) return [45,44,18];
	return [1,1,1];
}
	
///////////////////////////////////////////////////////////////////////////////////////////
	
ShopBank.getSkillShopLowQuestion = function(shopNumber) {
	if(shopNumber==0) return 0;
	if(shopNumber==1) return 3;
	if(shopNumber==2) return 7;
	if(shopNumber==3) return 10;
	if(shopNumber==4) return 0;
	return 0;
}
	
ShopBank.getSkillShopHighQuestion = function(shopNumber) {
	if(shopNumber==0) return 5;
	if(shopNumber==1) return 10;
	if(shopNumber==2) return 15;
	if(shopNumber==3) return 20;
	if(shopNumber==4) return 20;
	return 0;
}
	
ShopBank.getSkillShopValidity = function(shopNumber, p) {
	var wares = ShopBank.getSkillShopWares(shopNumber, p);
	var temp = []; 
	
	for(var i = 0; i < wares.length; i++) {
		temp[i] = "Can Train";
	}
	for(var i = 0; i < wares.length; i++) {
		if(p.getGold() < wares[i].getTrainingCost())
			temp[i] = "Need Gold";
	}
	for(var i = 0; i < wares.length; i++) {
		if(p.getLevel() < wares[i].getLevelRequirement(wares[i].getLevel()+1)) {
			temp[i] = "Need Level " + wares[i].getLevelRequirement(wares[i].getLevel()+1).toString();
		}
		if(wares[i].getLevelRequirement(wares[i].getLevel()+1) == -1) {
			temp[i] = "Maxed";
		}
	}
	if(shopNumber==0) {
		if(wares[0].getLevel() >= 3) temp[0] = "Maxed";
		if(wares[1].getLevel() >= 3) temp[1] = "Maxed";
		if(wares[2].getLevel() >= 3) temp[2] = "Maxed";
		if(wares[3].getLevel() >= 3) temp[3] = "Maxed";
	}
	if(shopNumber==1) {
		if(wares[0].getLevel() >= 6) temp[0] = "Maxed";
		if(wares[1].getLevel() >= 6) temp[1] = "Maxed";
		if(wares[2].getLevel() >= 6) temp[2] = "Maxed";
		if(wares[3].getLevel() >= 6) temp[4] = "Maxed";
		if(wares[4].getLevel() >= 3) temp[5] = "Maxed";
		if(wares[5].getLevel() >= 3) temp[5] = "Maxed";
		if(wares[6].getLevel() >= 3) temp[6] = "Maxed";
	}
	if(shopNumber==2) {
		if(wares[0].getLevel() >= 9) temp[0] = "Maxed";
		if(wares[1].getLevel() >= 9) temp[1] = "Maxed";
		if(wares[2].getLevel() >= 9) temp[2] = "Maxed";
		if(wares[3].getLevel() >= 9) temp[3] = "Maxed";
		if(wares[4].getLevel() >= 6) temp[4] = "Maxed";
		if(wares[5].getLevel() >= 6) temp[5] = "Maxed";
		if(wares[6].getLevel() >= 6) temp[6] = "Maxed";
		if(wares[7].getLevel() >= 3) temp[7] = "Maxed";
		if(wares[8].getLevel() >= 3) temp[8] = "Maxed";
		if(wares[9].getLevel() >= 3) temp[9] = "Maxed";
		if(wares[10].getLevel() >= 3) temp[10] = "Maxed";
		if(wares[11].getLevel() >= 2) temp[11] = "Maxed";
		if(wares[12].getLevel() >= 2) temp[12] = "Maxed";
		if(wares[13].getLevel() >= 2) temp[13] = "Maxed";
		if(wares[14].getLevel() >= 1) temp[14] = "Maxed";
		if(wares[15].getLevel() >= 1) temp[15] = "Maxed";
		if(wares[16].getLevel() >= 1) temp[16] = "Maxed";
		if(wares[15].getLevel() >= 5) temp[17] = "Maxed";
		if(wares[16].getLevel() >= 5) temp[18] = "Maxed";
	}		
	if(shopNumber==3) {
		if(wares[0].getLevel() >= 9) temp[0] = "Maxed";
		if(wares[1].getLevel() >= 9) temp[1] = "Maxed";
		if(wares[2].getLevel() >= 9) temp[2] = "Maxed";
		if(wares[3].getLevel() >= 6) temp[3] = "Maxed";
		if(wares[4].getLevel() >= 6) temp[4] = "Maxed";
		if(wares[5].getLevel() >= 6) temp[5] = "Maxed";
		if(wares[6].getLevel() >= 3) temp[6] = "Maxed";
		if(wares[7].getLevel() >= 3) temp[7] = "Maxed";
		if(wares[8].getLevel() >= 3) temp[8] = "Maxed";
		if(wares[9].getLevel() >= 6) temp[9] = "Maxed";
		if(wares[10].getLevel() >= 3) temp[10] = "Maxed";
		if(wares[11].getLevel() >= 3) temp[11] = "Maxed";
		if(wares[12].getLevel() >= 4) temp[12] = "Maxed";
		if(wares[13].getLevel() >= 4) temp[13] = "Maxed";
		if(wares[14].getLevel() >= 3) temp[14] = "Maxed";
		if(wares[15].getLevel() >= 4) temp[15] = "Maxed";
		if(wares[16].getLevel() >= 5) temp[16] = "Maxed";
		if(wares[17].getLevel() >= 5) temp[17] = "Maxed";
		if(wares[18].getLevel() >= 5) temp[18] = "Maxed";
		if(wares[19].getLevel() >= 5) temp[19] = "Maxed";
		if(wares[20].getLevel() >= 1) temp[20] = "Maxed";
		if(wares[21].getLevel() >= 1) temp[21] = "Maxed";
		if(wares[22].getLevel() >= 1) temp[22] = "Maxed";
		if(wares[23].getLevel() >= 1) temp[23] = "Maxed";
		if(wares[22].getLevel() >= 9) temp[22] = "Maxed";
		if(wares[23].getLevel() >= 9) temp[23] = "Maxed";
	}
	if(shopNumber==4) {
		if(wares[0].getLevel() >= 9) temp[0] = "Maxed";
		if(wares[1].getLevel() >= 9) temp[1] = "Maxed";
		if(wares[2].getLevel() >= 9) temp[2] = "Maxed";
		if(wares[3].getLevel() >= 9) temp[3] = "Maxed";
		if(wares[4].getLevel() >= 9) temp[4] = "Maxed";
		if(wares[5].getLevel() >= 9) temp[5] = "Maxed";
		if(wares[6].getLevel() >= 9) temp[6] = "Maxed";
		if(wares[7].getLevel() >= 9) temp[7] = "Maxed";
		if(wares[8].getLevel() >= 9) temp[8] = "Maxed";
		if(wares[9].getLevel() >= 9) temp[9] = "Maxed";
		if(wares[10].getLevel() >= 5) temp[10] = "Maxed";
		if(wares[11].getLevel() >= 5) temp[11] = "Maxed";
		if(wares[12].getLevel() >= 5) temp[12] = "Maxed";
		if(wares[13].getLevel() >= 5) temp[13] = "Maxed";
		if(wares[14].getLevel() >= 5) temp[14] = "Maxed";
		if(wares[15].getLevel() >= 5) temp[15] = "Maxed";
		if(wares[16].getLevel() >= 5) temp[16] = "Maxed";
		if(wares[17].getLevel() >= 5) temp[17] = "Maxed";
		if(wares[18].getLevel() >= 5) temp[18] = "Maxed";
		if(wares[19].getLevel() >= 5) temp[19] = "Maxed";
		if(wares[20].getLevel() >= 9) temp[20] = "Maxed";
		if(wares[21].getLevel() >= 9) temp[21] = "Maxed";
		if(wares[22].getLevel() >= 9) temp[22] = "Maxed";
		if(wares[23].getLevel() >= 9) temp[23] = "Maxed";
		if(wares[24].getLevel() >= 9) temp[24] = "Maxed";
		if(wares[25].getLevel() >= 9) temp[25] = "Maxed";
		if(wares[26].getLevel() >= 9) temp[26] = "Maxed";
		if(wares[27].getLevel() >= 9) temp[27] = "Maxed";
		if(wares[28].getLevel() >= 1) temp[28] = "Maxed";
		if(wares[29].getLevel() >= 1) temp[29] = "Maxed";
		if(wares[30].getLevel() >= 1) temp[30] = "Maxed";
		if(wares[31].getLevel() >= 1) temp[31] = "Maxed";
	
	
	}
	return temp;
}
	
ShopBank.getSkillShopWares = function(shopNumber, p) {
	var wares = [];
	if(shopNumber == 0) {
		wares = [];
		wares[0] = Skill.getSkill(0);
		wares[1] = Skill.getSkill(1);
		wares[2] = Skill.getSkill(2);
		wares[3] = Skill.getSkill(3);
	}
	if(shopNumber == 1) {
		wares = [];
		wares[0] = Skill.getSkill(0);
		wares[1] = Skill.getSkill(1);
		wares[2] = Skill.getSkill(2);
		wares[3] = Skill.getSkill(3);
		wares[4] = Skill.getSkill(4);
		wares[5] = Skill.getSkill(5);
		wares[6] = Skill.getSkill(6);
	}
	if(shopNumber == 2) {
		wares = [];
		wares[0] = Skill.getSkill(0);
		wares[1] = Skill.getSkill(1);
		wares[2] = Skill.getSkill(2);
		wares[3] = Skill.getSkill(3);
		wares[4] = Skill.getSkill(4);
		wares[5] = Skill.getSkill(5);
		wares[6] = Skill.getSkill(6);
		wares[7] = Skill.getSkill(7);
		wares[8] = Skill.getSkill(8);
		wares[9] = Skill.getSkill(9);
		wares[10] = Skill.getSkill(16);
		wares[11] = Skill.getSkill(21);
		wares[12] = Skill.getSkill(23);
		wares[13] = Skill.getSkill(26);
		wares[14] = Skill.getSkill(35);
		wares[15] = Skill.getSkill(39);
		wares[16] = Skill.getSkill(43);
		wares[17] = Skill.getSkill(46);
		wares[18] = Skill.getSkill(47);
	}
	if(shopNumber == 3) {
		wares = [];
		wares[0] = Skill.getSkill(4);
		wares[1] = Skill.getSkill(5);
		wares[2] = Skill.getSkill(6);
		wares[3] = Skill.getSkill(7);
		wares[4] = Skill.getSkill(8);
		wares[5] = Skill.getSkill(9);
		wares[6] = Skill.getSkill(10);
		wares[7] = Skill.getSkill(11);
		wares[8] = Skill.getSkill(12);
		wares[9] = Skill.getSkill(16);
		wares[10] = Skill.getSkill(19);
		wares[11] = Skill.getSkill(20);
		wares[12] = Skill.getSkill(21);
		wares[13] = Skill.getSkill(23);
		wares[14] = Skill.getSkill(24);
		wares[15] = Skill.getSkill(26);
		wares[16] = Skill.getSkill(27);
		wares[17] = Skill.getSkill(29);
		wares[18] = Skill.getSkill(31);
		wares[19] = Skill.getSkill(33);
		wares[20] = Skill.getSkill(36);
		wares[21] = Skill.getSkill(37);
		wares[22] = Skill.getSkill(44);
		wares[23] = Skill.getSkill(45);
		wares[24] = Skill.getSkill(46);
		wares[25] = Skill.getSkill(47);
	}
	if(shopNumber == 4) {
		wares = [];
		wares[0] = Skill.getSkill(7);
		wares[1] = Skill.getSkill(8);
		wares[2] = Skill.getSkill(9);
		wares[3] = Skill.getSkill(10);
		wares[4] = Skill.getSkill(11);
		wares[5] = Skill.getSkill(12);
		wares[6] = Skill.getSkill(13);
		wares[7] = Skill.getSkill(14);
		wares[8] = Skill.getSkill(15);
		wares[9] = Skill.getSkill(16);
		wares[10] = Skill.getSkill(17);
		wares[11] = Skill.getSkill(18);
		wares[12] = Skill.getSkill(19);
		wares[13] = Skill.getSkill(20);
		wares[14] = Skill.getSkill(21);
		wares[15] = Skill.getSkill(22);
		wares[16] = Skill.getSkill(23);
		wares[17] = Skill.getSkill(24);
		wares[18] = Skill.getSkill(25);
		wares[19] = Skill.getSkill(26);
		wares[20] = Skill.getSkill(27);
		wares[21] = Skill.getSkill(28);
		wares[22] = Skill.getSkill(29);
		wares[23] = Skill.getSkill(30);
		wares[24] = Skill.getSkill(31);
		wares[25] = Skill.getSkill(32);
		wares[26] = Skill.getSkill(33);
		wares[27] = Skill.getSkill(34);
		wares[28] = Skill.getSkill(38);
		wares[29] = Skill.getSkill(40);
		wares[30] = Skill.getSkill(41);
		wares[31] = Skill.getSkill(42);
	
	}
	
	for(var i = 0; i < wares.length; i++) {
		for(var j = 0; j < p.getSkillCount();j++) {
			if(wares[i].getName() === p.getSkill(j).getName()) {
				wares[i] = p.getSkill(j);
			}
		}
	}
	return wares;
}
	
ShopBank.getSkillShopReturnInfo = function(shopNumber) {
	if(shopNumber==0) return [32,15,1];
	if(shopNumber==1) return [34,36,14];
	if(shopNumber==2) return [82,16,13];
	if(shopNumber==3) return [18,28,16];
	if(shopNumber==4) return [37,44,18];
	return new [1,1,1];
}

///////////////////////////////////////////////////////////////////////////////////////////
	
ShopBank.getTradingPostLowQuestion = function(shopNumber) {
	if(shopNumber==0) return 0;
	if(shopNumber==1) return 3;
	if(shopNumber==2) return 7;
	if(shopNumber==3) return 10;
	if(shopNumber==4) return 0;
	return 0;
}
	
ShopBank.getTradingPostHighQuestion = function(shopNumber) {
	if(shopNumber==0) return 5;
	if(shopNumber==1) return 10;
	if(shopNumber==2) return 15;
	if(shopNumber==3) return 16;
	if(shopNumber==4) return 16;
	return 0;
}
	
ShopBank.getTradingPostWares = function(shopNumber) {
	var wares = [];
	if(shopNumber == 0) {
		wares = [];
		wares[0] = TradeItem.getItem(0);
		wares[1] = TradeItem.getItem(1);
		wares[2] = TradeItem.getItem(2);
		wares[3] = TradeItem.getItem(3);
		wares[4] = TradeItem.getItem(4);
	}
	if(shopNumber == 1) {
		wares = [];
		wares[0] = TradeItem.getItem(5);
		wares[1] = TradeItem.getItem(6);
		wares[2] = TradeItem.getItem(7);
		wares[3] = TradeItem.getItem(8);
		wares[4] = TradeItem.getItem(9);
	}
	if(shopNumber == 2) {
		wares = [];
		wares[0] = TradeItem.getItem(10);
		wares[1] = TradeItem.getItem(11);
		wares[2] = TradeItem.getItem(12);
		wares[3] = TradeItem.getItem(13);
		wares[4] = TradeItem.getItem(14);
	}
	if(shopNumber == 3) {
		wares = [];
		wares[0] = TradeItem.getItem(15);
		wares[1] = TradeItem.getItem(16);
		wares[2] = TradeItem.getItem(17);
		wares[3] = TradeItem.getItem(18);
		wares[4] = TradeItem.getItem(19);
	}
	if(shopNumber == 4) {
		wares = [];
		wares[0] = TradeItem.getItem(20);
		wares[1] = TradeItem.getItem(21);
		wares[2] = TradeItem.getItem(22);
		wares[3] = TradeItem.getItem(23);
		wares[4] = TradeItem.getItem(24);
	}
	return wares;
}
	
ShopBank.getMultipliers = function(shopNumber) {
	var allValues = [];
	for(var i = 0; i < TradeItem.MAX_TRADE_ITEMS;i++) allValues[i] = 1;
	if(shopNumber == 0) {
		allValues[0] = .8;
		allValues[1] = 1.3;
		allValues[2] = 1.7;
		allValues[3] = 1.0;
		allValues[4] = .9;
		allValues[5] = .8;
		allValues[6] = .4;
		allValues[7] = 1.4;
		allValues[8] = 1.8;
		allValues[9] = 2.3;
		allValues[10] = .7;
		allValues[11] = 2.4;
		allValues[12] = 1.1;
		allValues[13] = .6;
		allValues[14] = .2;
		allValues[15] = 1.3;
		allValues[16] = 1.6;
		allValues[17] = 1.9;
		allValues[18] = 2.1;
		allValues[19] = 2.9;
		allValues[20] = .8;
		allValues[21] = 2.0;
		allValues[22] = 1.4;
		allValues[23] = 1.2;
		allValues[24] = .9;
	}
	if(shopNumber == 1) {
		allValues[0] = 1.1;
		allValues[1] = 2.3;
		allValues[2] = .7;
		allValues[3] = 1.0;
		allValues[4] = 1.9;
		allValues[5] = .3;
		allValues[6] = 1.4;
		allValues[7] = 1.7;
		allValues[8] = .7;
		allValues[9] = 1.4;
		allValues[10] = .8;
		allValues[11] = .6;
		allValues[12] = 1.4;
		allValues[13] = .9;
		allValues[14] = 1.2;
		allValues[15] = 1.0;
		allValues[16] = 1.9;
		allValues[17] = .5;
		allValues[18] = 1.5;
		allValues[19] = 1.9;
		allValues[20] = .5;
		allValues[21] = 1.3;
		allValues[22] = 1.0;
		allValues[23] = 1.7;
		allValues[24] = 1.4;
	}
	if(shopNumber == 2) {
		allValues[0] = .5;
		allValues[1] = 1.4;
		allValues[2] = 2.3;
		allValues[3] = .9;
		allValues[4] = 1.1;
		allValues[5] = 1.4;
		allValues[6] = 2.1;
		allValues[7] = .8;
		allValues[8] = 1.0;
		allValues[9] = 1.7;
		allValues[10] = 1.6;
		allValues[11] = .4;
		allValues[12] = .8;
		allValues[13] = 2.2;
		allValues[14] = 1.1;
		allValues[15] = 1.6;
		allValues[16] = 1.4;
		allValues[17] = 1.5;
		allValues[18] = 1.3;
		allValues[19] = 1.2;
		allValues[20] = 1.5;
		allValues[21] = .3;
		allValues[22] = .8;
		allValues[23] = 1.9;
		allValues[24] = 2.0;
	}
	if(shopNumber == 3) {
		allValues[0] = 1.5;
		allValues[1] = .8;
		allValues[2] = 1.7;
		allValues[3] = 1.3;
		allValues[4] = 2.5;
		allValues[5] = .9;
		allValues[6] = 1.9;
		allValues[7] = 1.2;
		allValues[8] = 1.0;
		allValues[9] = 1.8;
		allValues[10] = 1.2;
		allValues[11] = 1.6;
		allValues[12] = .4;
		allValues[13] = .6;
		allValues[14] = 1.6;
		allValues[15] = 1.3;
		allValues[16] = 1.1;
		allValues[17] = .6;
		allValues[18] = 1.9;
		allValues[19] = .7;
		allValues[20] = 1.5;
		allValues[21] = .8;
		allValues[22] = .9;
		allValues[23] = 1.2;
		allValues[24] = 1.5;
	}
	if(shopNumber == 4) {
		allValues[0] = 3.1;
		allValues[1] = 2.3;
		allValues[2] = 3.7;
		allValues[3] = 2.0;
		allValues[4] = 1.9;
		allValues[5] = 1.3;
		allValues[6] = 1.9;
		allValues[7] = 1.6;
		allValues[8] = .7;
		allValues[9] = .4;
		allValues[10] = 1.9;
		allValues[11] = 1.6;
		allValues[12] = 1.3;
		allValues[13] = 1.3;
		allValues[14] = 1.9;
		allValues[15] = 1.6;
		allValues[16] = 1.8;
		allValues[17] = 1.5;
		allValues[18] = 1.7;
		allValues[19] = 2.2;
		allValues[20] = .5;
		allValues[21] = 1.1;
		allValues[22] = .9;
		allValues[23] = 1.3;
		allValues[24] = .6;
	}
	return allValues;
}
	
ShopBank.getTradingPostReturnInfo = function(shopNumber) {
	if(shopNumber==0) return [13,16,1];
	if(shopNumber==1) return [12,40,14];
	if(shopNumber==2) return [62,27,13];
	if(shopNumber==3) return [10,29,16];
	if(shopNumber==4) return [45,35,18];
	return [1,1,1];
}
	
///////////////////////////////////////////////////////////////////////////////////////////
	
ShopBank.getWeaponShopLowQuestion = function(shopNumber) {
	if(shopNumber==0) return 0;
	if(shopNumber==1) return 3;
	if(shopNumber==2) return 7;
	if(shopNumber==3) return 10;
	if(shopNumber==4) return 0;
	return 0;
}
	
ShopBank.getWeaponShopHighQuestion = function(shopNumber) {
	if(shopNumber==0) return 5;
	if(shopNumber==1) return 10;
	if(shopNumber==2) return 15;
	if(shopNumber==3) return 20;
	if(shopNumber==4) return 20;
	return 0;
}
	
ShopBank.getWeaponShopWares = function(shopNumber) {
	var wares = [];
	if(shopNumber == 0) {
		wares = [];
		wares[0] = Weapon.getWeapon(0);
		wares[1] = Weapon.getWeapon(1);
		wares[2] = Weapon.getWeapon(2);
		wares[3] = Weapon.getWeapon(3);
	}
	if(shopNumber == 1) {
		wares = [];
		wares[0] = Weapon.getWeapon(4);
		wares[1] = Weapon.getWeapon(5);
		wares[2] = Weapon.getWeapon(6);
	}
	if(shopNumber == 2) {
		wares = [];
		wares[0] = Weapon.getWeapon(7);
		wares[1] = Weapon.getWeapon(8);
		wares[2] = Weapon.getWeapon(9);
	}
	if(shopNumber == 3) {
		wares = [];
		wares[0] = Weapon.getWeapon(10);
		wares[1] = Weapon.getWeapon(11);
		wares[2] = Weapon.getWeapon(12);
	}
	if(shopNumber == 4) {
		wares = [];
		wares[0] = Weapon.getWeapon(13);
		wares[1] = Weapon.getWeapon(14);
		wares[2] = Weapon.getWeapon(15);
	}
	return wares;
}
	
ShopBank.getWeaponShopReturnInfo = function(shopNumber) {
		if(shopNumber==0) return [40,15,1];
		if(shopNumber==1) return [34,45,14];
		if(shopNumber==2) return [59,16,13];
		if(shopNumber==3) return [19,17,16];
		if(shopNumber==4) return [24,44,18];
		return [1,1,1];
	}
	
//////////////////////////////////////////////////////////////////////////////////////////
	
ShopBank.getArmorShopLowQuestion = function(shopNumber) {
	if(shopNumber==0) return 0;
	if(shopNumber==1) return 3;
	if(shopNumber==2) return 7;
	if(shopNumber==3) return 10;
	if(shopNumber==4) return 0;
	return 0;
}
	
ShopBank.getArmorShopHighQuestion = function(shopNumber) {
	if(shopNumber==0) return 5;
	if(shopNumber==1) return 10;
	if(shopNumber==2) return 15;
	if(shopNumber==3) return 20;
	if(shopNumber==4) return 20;
	return 0;
}
	
ShopBank.getArmorShopWares = function(shopNumber) {
	var wares = [];
	if(shopNumber == 0) {
		wares = [];
		wares[0] = Armor.getArmor(0);
		wares[1] = Armor.getArmor(1);
		wares[2] = Armor.getArmor(2);
		wares[3] = Armor.getArmor(3);
		wares[4] = Armor.getArmor(16);
		wares[5] = Armor.getArmor(17);
		wares[6] = Armor.getArmor(18);
		wares[7] = Armor.getArmor(19);
	}
	if(shopNumber == 1) {
		wares = [];
		wares[0] = Armor.getArmor(4);
		wares[1] = Armor.getArmor(5);
		wares[2] = Armor.getArmor(6);
		wares[3] = Armor.getArmor(20);
		wares[4] = Armor.getArmor(21);
		wares[5] = Armor.getArmor(22);
		
	}
	if(shopNumber == 2) {
		wares = [];
		wares[0] = Armor.getArmor(7);
		wares[1] = Armor.getArmor(8);
		wares[2] = Armor.getArmor(9);
		wares[3] = Armor.getArmor(23);
		wares[4] = Armor.getArmor(24);
		wares[5] = Armor.getArmor(25);
	}
	if(shopNumber == 3) {
		wares = [];
		wares[0] = Armor.getArmor(10);
		wares[1] = Armor.getArmor(11);
		wares[2] = Armor.getArmor(12);
		wares[3] = Armor.getArmor(26);
		wares[4] = Armor.getArmor(27);
		wares[5] = Armor.getArmor(28);
	}
	if(shopNumber == 4) {
		wares = [];
		wares[0] = Armor.getArmor(13);
		wares[1] = Armor.getArmor(14);
		wares[2] = Armor.getArmor(15);
		wares[3] = Armor.getArmor(29);
		wares[4] = Armor.getArmor(30);
		wares[5] = Armor.getArmor(31);
		
	}
	return wares;
}
	
ShopBank.getArmorShopReturnInfo = function(shopNumber) {
		if(shopNumber==0) return [42,15,1];
		if(shopNumber==1) return [39,45,14];
		if(shopNumber==2) return [66,16,13];
		if(shopNumber==3) return [26,17,16];
		if(shopNumber==4) return [30,44,18];
		return [1,1,1];
}
	

