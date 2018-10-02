// var Animation = require("Animation.js");
// var Battle = require("Battle.js");
// var Equation = require("Equation.js");
// var AnimationEvaluateAnimate = require("AnimationEvaluateAnimate.js");
// var Skill = require("Skill.js");
// var Spell = require("Spell.js");

class Player {
	
	constructor(n, l, h, s, m, st, de, w, worn, acc) {
		if(typeof n === "object") {
			this.activeSkillCount = n.activeSkillCount;
			this.activeSkills = [];
			for(var i = 0; i < n.activeSkills.length; i++) {
				this.activeSkills[i] = new Skill(n.activeSkills[i]);
			}
			
			this.armorCount = n.armorCount;
			this.armorInv = [];
			for(var i = 0; i < n.armorInv.length; i++) {
				this.armorInv[i] = new Armor(n.armorInv[i]);
				if(typeof n.wornAccess != "undefined" && this.armorInv[i].getName() === n.wornAccess.name) this.equipArmor(i);
				if(typeof n.wornArmor != "undefined" && this.armorInv[i].getName() === n.wornArmor.name) this.equipArmor(i);
			}
			
			this.attackBoost = n.attackBoost;
			this.battleOptions = n.battleOptions;
			this.boostTurns = n.boostTurns;
			this.bufferTurns = n.bufferTurns;
			this.character = document.createElement("canvas");
			this.def = n.def;
			this.defenseBuffer = n.defenseBuffer;
			this.diag = false;
			this.equationShield = n.equationShield;
			this.exp = n.exp;
			this.flags = n.flags;
			this.gold = n.gold;
			this.hp = n.hp;
			this.hpMax = n.hpMax;
			this.icons = n.icons;
			this.itemCount = n.itemCount;
			this.itemQuantity = n.itemQuantity;
			this.items = [];
			for(var i = 0; i < n.items.length; i++) {
				this.items[i] = new Item(n.items[i]);
			}
			this.keyItemCount = n.keyItemCount;
			this.keyItems = n.keyItems;
			this.keyItems = [];
			for(var i = 0; i < n.keyItems.length; i++) {
				this.keyItems[i] = new KeyItem(n.keyItems[i]);
			}
			this.lastAttack = n.lastAttack;
			this.lastTown = n.lastTown;
			this.level = n.level;
			this.magic = [];
			for(var i = 0; i < n.magic.length; i++) {
				this.magic[i] = new Spell(n.magic[i]);
			}
			this.magicCount = n.magicCount;
			this.mp = n.mp;
			this.mpMax = n.mpMax;
			this.name = n.name;
			this.passiveSkills = [];
			for(var i = 0; i < n.passiveSkills.length; i++) {
				this.passiveSkills[i] = new Skill(n.passiveSkills[i]);
			}
			this.passiveSkillCount = n.passiveSkillCount;
			this.repel = n.repel;
			this.shieldColor = n.shieldColor;
			this.sp = n.sp;
			this.spMax = n.spMax;
			this.str = n.str;
			this.tic = n.tic;
			this.tradeItemCount = n.tradeItemCount;
			this.tradeItems = [];
			for(var i = 0; i < n.tradeItems.length; i++) {
				this.tradeItems[i] = new TradeItem(n.tradeItems[i]);
			}
			this.version = n.version;
			this.weaponCount = n.weaponCount;
			this.weaponInv = [];
			for(var i = 0; i < n.weaponInv.length; i++) {
				this.weaponInv[i] = new Weapon(n.weaponInv[i]);
				if(typeof n.wieldedWeapon != "undefined" && this.weaponInv[i].getName() === n.wieldedWeapon.name)
					this.equipWeapon(i);
			}
			this.restorePlayerVariables();
		}
		else {
		    if(!l) {
		        l = 1;
		        h = 100;
		        s = 10;
		        m = 10;
		        st = 10;
		        de = 10;
		        w  = null;
		        worn = null;
		        acc = null;
		    }
			this.battleOptions = [];
	    	this.activeSkills = [];
	    	this.passiveSkills = [];
	    	this.magic = [];
	    	this.items = [];
	    	this.tradeItems = [];
	    	this.weaponInv = [];
	    	this.armorInv = [];
	    	this.keyItems = [];
	    	this.itemQuantity = [];
	    	this.flags = [];
		
			this.name = n;
			this.battleOptions[0] = "Subtract";
			this.battleOptions[1] = "Skills";
			this.battleOptions[2] = "Magic";
			this.battleOptions[3] = "Items";
			this.battleOptions[4] = "Run";
			this.activeSkillCount = 0;
			this.passiveSkillCount = 0;
			this.magicCount = 0;
			this.itemCount = 0;
			this.tradeItemCount = 0;
			this.weaponCount = 0;
			if(w != null) this.addWeapon(w);
			
			this.armorCount = 0;
			if(worn != null) this.addArmor(worn);
			if(acc != null) this.addArmor(acc);
			this.keyItemCount = 0;
			this.hp = this.hpMax = h;
			this.sp = this.spMax = s;
			this.mp = this.mpMax = m;
			this.str = st;
			this.def = de;
			this.gold = 1000;
			this.level = l;
			this.exp = 0;
			this.wieldedWeapon = w;
			this.wornArmor = worn;
			this.wornAccess = acc;
			this.equationShield = false;
			this.lastTown = 1;
			this.repel = 0;
			this.tic = 0;
			this.character = document.createElement("canvas");
			this.makeNewImage();
			this.lastAttack = "";
			this.shieldColor = "cyan";
			this.defenseBuffer = this.attackBoost = this.bufferTurns = this.boostTurns = 0;
			this.icons = document.createElement("img");
			this.icons.src = "Icons.png";
			
			this.flags.push(false); //Flag 0 - defeated Earth Elemental
			this.flags.push(false); //Flag 1 - defeated Mystic Dragon
			this.flags.push(false); //Flag 2 - defeated Sea Serpent
			this.flags.push(false); //Flag 3 - defeated Demon King
			this.flags.push(false); //Flag 4 - restored 1st bridge
			this.flags.push(false); //Flag 5 - restored 2nd bridge
			this.flags.push(false); //Flag 6 - restored 3rd bridge
			this.flags.push(false); //Flag 7 - restored 4th bridge
			this.flags.push(false); //Flag 8 - added Weather
			this.flags.push(false); //Flag 9 - added Tide
			this.flags.push(false); //Flag 10 - added Sun
		}
	}
	
	printPlayer(g) {
		//flags.set(3,false);
		g.drawImage(this.character,0,0,32,32, Battle.PLAYER_WINDOW_X1+18,Battle.PLAYER_WINDOW_Y1+18,Battle.PLAYER_WINDOW_X2-18 - Battle.PLAYER_WINDOW_X1-18,Battle.PLAYER_WINDOW_Y2-18 - Battle.PLAYER_WINDOW_Y1-18);
		if(this.equationShield) {
			g.fillStyle = "black";
			Player.roundRect(g,(Battle.PLAYER_WINDOW_X1+Battle.PLAYER_WINDOW_X2)/2 - this.shield.getLength()/2+2-10, Battle.PLAYER_WINDOW_Y1+2-this.shield.getHeight()/2-26, this.shield.getLength()+20, this.shield.getHeight()+4,10,true);
			g.fillStyle = this.shieldColor;
			Player.roundRect(g,(Battle.PLAYER_WINDOW_X1+Battle.PLAYER_WINDOW_X2)/2 - this.shield.getLength()/2-10, Battle.PLAYER_WINDOW_Y1-this.shield.getHeight()/2-26, this.shield.getLength()+20, this.shield.getHeight()+4,10,true);
			this.shield.printEquation(g,(Battle.PLAYER_WINDOW_X1+Battle.PLAYER_WINDOW_X2)/2-this.shield.getLength()/2,Battle.PLAYER_WINDOW_Y1-20);
		}
		if(this.bufferTurns > 0) {
			g.drawImage(this.icons , (1) * 78, (4) * 78,  78,  78,
			                     Battle.PLAYER_WINDOW_X1 - 50, Battle.PLAYER_WINDOW_Y1, 48,  48);
			
		}
		if(this.boostTurns > 0) {
			g.drawImage(this.icons ,	(0) * 78, (4) * 78, 78, 78,
			                    Battle.PLAYER_WINDOW_X2 + 2, Battle.PLAYER_WINDOW_Y1, 48, 48);
			
		}
	}
	
	printPassiveSkills(g, m) {
		var shields = m.getShields();
		var passive = this.getPassiveSkills();
		var showIcon = 0;
		var bigAdd = 0;
		for(var i=0; i< this.getPassiveSkillCount();i++) {
			if(m.isUndead() && passive[i].getName() === "Know Undead") {
				g.drawImage(this.icons ,	(passive[i].getIconNumber()%16) * 78, Math.floor(passive[i].getIconNumber()/16) * 78, 78, 78,
						Battle.MAIN_WINDOW_X1 + 40 + (Math.floor(showIcon/6) * 78/2), Battle.MAIN_WINDOW_Y1 + 40+ (showIcon%6 * 78/2),  78/2 ,  78/2 );
				showIcon++;
			}
		}
		
		
		for(var i = 0; i < shields.length; i++) {
			for(var j = 0; j < this.getPassiveSkillCount(); j++) {
				if(showIcon >=18) bigAdd = (Battle.MAIN_WINDOW_X2 - 40 - 3*78/2)-(Battle.MAIN_WINDOW_X1 + 40 + 3*78/2);
				if(shields[i]  === passive[j].getImmunity()) {
					g.drawImage(this.icons ,	(passive[j].getIconNumber()%16) * 78, Math.floor(passive[j].getIconNumber()/16) * 78,  78,  78, 
					                    Battle.MAIN_WINDOW_X1 + 40 + (Math.floor(showIcon/6) * 78/2)+bigAdd, Battle.MAIN_WINDOW_Y1 + 40+ (showIcon%6 * 78/2),  78/2, 78/2);
					showIcon++;
				}
				else if(shields[i].length>=7 && shields[i].substring(0,7) === passive[j].getImmunity()) {
					var immNum = 0;
					if(shields[i] === "Plug In All") immNum = 24;
					else if(shields[i] === "Subtct. All") immNum = 36;
					else immNum = parseInt(shields[i].substring(8),10);
					g.drawImage(this.icons , ((passive[j].getIconNumber() - immNum)%16) * 78, Math.floor((passive[j].getIconNumber()-immNum)/16) * 78, 78, 78,
					                    Battle.MAIN_WINDOW_X1 + 40 + (Math.floor(showIcon/6) * 78/2)+bigAdd, Battle.MAIN_WINDOW_Y1 + 40+ (showIcon%6 * 78/2), 78/2, 78/2 );
					showIcon++;
				}
				else if(shields[i].length>=5 && shields[i].substring(0,5) === passive[j].getImmunity()) {
					var immType = shields[i].substring(5);
					var immNum = 0;
					if(immType === "+x") immNum = 0; if(immType === "-x") immNum = 1;
					if(immType === "+2x") immNum = 2; if(immType ==="-2x") immNum = 3;
					if(immType === "+x²") immNum = 4; if(immType === "-x²") immNum = 5;
					if(immType === "+2x²") immNum = 6; if(immType === "-2x²") immNum = 7;
					if(immType === "All") immNum = 40;
					g.drawImage(this.icons , ((passive[j].getIconNumber() - immNum)%16) * 78, Math.floor((passive[j].getIconNumber()-immNum)/16) * 78, 78, 78,
					                   Battle.MAIN_WINDOW_X1 + 40 + (Math.floor(showIcon/6) * 78/2)+bigAdd, Battle.MAIN_WINDOW_Y1 + 40+ (showIcon%6 * 78/2), 78/2, 78/2);
					showIcon++;
				}
			}
		}
	}
	
	setFlag(num, val) {
		this.flags.splice(num, 1, val);
	}
	
	getFlag(num) {
		return this.flags[num];
	}
	
	getRepel() {
		return this.repel;
	}
	
	setRepel(num) {
		this.repel = num;
	}
	
	setVersion(ver) {
		this.version = ver;
	}
	
	getVersion() {
		return this.version;
	}
	
	setSecurity(sec) {
		this.security = sec;
	}
	
	getStatString() {
		var statString = this.name;
		this.battleOptions.forEach(function(all) { if(all != null) statString += all});
		this.activeSkills.forEach(function(all) { if(all != null) statString += all.getStatString() });
		this.passiveSkills.forEach(function(all) { if(all != null) statString += all.getStatString() });
		this.magic.forEach(function(all) { if(all != null) statString += all.getStatString() });
		this.items.forEach(function(all) { if(all != null) statString += all.getStatString() });
		this.tradeItems.forEach(function(all) { if(all != null) statString += all.getStatString() });
		this.weaponInv.forEach(function(all) { if(all != null) statString += all.getStatString() });
		this.armorInv.forEach(function(all) { if(all != null) statString += all.getStatString() });
		this.keyItems.forEach(function(all) {if(all != null) statString += all.getStatString() });
		statString += this.lastAttack;
		var statSum = 0;
		this.itemQuantity.forEach(function(all) {  statSum += all });
		statSum += this.activeSkillCount + this.passiveSkillCount + this.magicCount + this.itemCount + this.tradeItemCount + this.weaponCount + this.armorCount + this.keyItemCount;
		statSum += this.hp + this.hpMax + this.sp + this.spMax + this.mp + this.mpMax + this.str + this.def + this.level + this.exp + this.gold + this.repel + this.lastTown + this.tic;
		statString += statSum.toString() + this.diag.toString() + this.equationShield.toString();
		for(var i = 0; i < this.flags.length; i++) statString += this.flags[i].toString();
		return statString;
	}
	
	getSecurity() {
		return this.security;
	}
	
	setAlwaysRepel(set) {
		this.diag = set;
	}
	
	getAlwaysRepel() {
		return this.diag;
	}
	
	useRepel() {
		if(!this.diag)
			this.repel--;
	}
	
	setShieldBackColor(r, g, b) {
        var hex1 = Number(r).toString(16);
        if (hex1.length < 2) {
            hex1 = "0" + hex1;
        }
        var hex2 = Number(g).toString(16);
        if (hex2.length < 2) {
            hex2 = "0" + hex2;
        }
        var hex3 = Number(b).toString(16);
        if (hex3.length < 2) {
            hex3 = "0" + hex3;
        }
		this.shieldColor = "#" + hex1 + hex2 + hex3;
	}
	
	isShieldConstant() {
		return this.shield.isConstant();
	
	}
	
	plugIn(xVal) {
		if(this.hasShield()) {
			this.shield.plugIn(xVal);
			var temp = this.shield.getEquation();
			this.shield = new Equation(temp,16);
			//shield = new Equation(shield.getEquation(),(Battle.PLAYER_WINDOW_X1+Battle.PLAYER_WINDOW_X2)/2-shield.getLength()/2,Battle.PLAYER_WINDOW_Y1-20,16);
		}
	}
	
	evaluateAnimate() {
		if(this.hasShield()) {
			this.tic++;
			if(this.tic <= AnimationEvaluateAnimate.MAXTICS)
				this.shield.evaluateAnimate();
			if(this.tic == AnimationEvaluateAnimate.MAXTICS) {
				this.shield = new Equation(this.shield.createString(),16);
				//shield = new Equation(shield.getEquation(),(Battle.PLAYER_WINDOW_X1+Battle.PLAYER_WINDOW_X2)/2-shield.getLength()/2,Battle.PLAYER_WINDOW_Y1-20,16);
				this.tic = 0;
			}
		}
	}
	
	changeItemQuantity(item, change) {
		for(var i = 0; i < this.itemCount; i++) {
			if(this.items[i].getName() === item) {
				this.itemQuantity[i] += change;
				if(this.itemQuantity[i] == 0) {
					for(var j = i; j < this.itemCount-1; j++) {
						this.items[j] = this.items[j+1];
						this.itemQuantity[j] = this.itemQuantity[j+1]; 
					}
					this.itemCount--;
				}
			}
		}
	}
	
	addItem(item) {
		var foundItem = false;
		for(var i = 0; i < this.itemCount; i++) {
			if(this.items[i].getName() === item.getName()) {
				this.itemQuantity[i]++;
				foundItem = true;
			}
		}
		if(!foundItem) {
			this.items[this.itemCount] = item;
			this.itemQuantity[this.itemCount] = 1;
			this.itemCount++;
		}
	}
	
	removeItem(num) {
		this.itemQuantity[num]--;
		if(this.itemQuantity[num] == 0) {
			for(var i = num; i < this.itemQuantity.length-1; i++) {
				this.items[i] = this.items[i+1];
				this.itemQuantity[i] = this.itemQuantity[i+1];
			}
			this.itemCount--;
		}
	}
	
	addSpellTraining(spe) {
		var foundItem = false;
		for(var i = 0; i < this.magicCount; i++) {
			if(this.magic[i].getName() === spe.getName()) {
				foundItem = true;
				this.magic[i].train();
			}
		}
		if(!foundItem) {
			spe.train();
			this.magic[this.magicCount] = spe;
			this.magicCount++;
		}
	}
	
	addSkillTraining(sk) {
		var foundItem = false;
		var skills = this.getSkills();
		for(var i = 0; i < this.getSkillCount(); i++) {
			if(skills[i].getName() === sk.getName()) {
				foundItem = true;
				skills[i].train();
			}
		}
		if(!foundItem) {
			sk.train();
			if(sk.isPassive()) {
				this.passiveSkills[this.passiveSkillCount] = sk;
				this.passiveSkillCount++;
			}
			else {
				this.activeSkills[this.activeSkillCount] = sk;
				this.activeSkillCount++;
			}
				
		}
	}
	
	
	getBattleOption(i) {
		return this.battleOptions[i];
	}
	
	getSkillOptions() {
		var list = [];
		var plugInFlag = false, subtractFlag = false, termFlag = false;
		for(var i = 0; i < this.activeSkillCount; i++) {
			if(this.activeSkills[i].getName().length > 7 && this.activeSkills[i].getName().substring(0,7) === "Plug In") {
				if(!plugInFlag && this.activeSkills[i].isLearned()) {
					list.push("Plug In #");
					plugInFlag = true;
				}
			}
			else if(this.activeSkills[i].getName().length > 7 && this.activeSkills[i].getName().substring(0,7) === "Subtct.") {
				if(!subtractFlag && this.activeSkills[i].isLearned()) {
					list.push("Subtct. #");
					subtractFlag = true;
				}
			}
			else if(this.activeSkills[i].getName().length > 5 && this.activeSkills[i].getName().substring(0,5) === "Term:") {
				if(!termFlag && this.activeSkills[i].isLearned()) {
					list.push("Term: ±#");
					termFlag = true;
				}
			}
			else if(this.activeSkills[i].isLearned())
				list.push(this.activeSkills[i].getName());
		}
		var newList = [];
		for(var i = 0; i < list.length;i++) 
			newList[i] = list[i];
		return newList;
	}
	
	getMagicOptions() {
		var list = [];
		var integrateFlag = false, lowerLimit = false, upperLimit = false;
		for(var i = 0; i < this.magicCount; i++) {
			if(this.magic[i].getName().length >= 9 && this.magic[i].getName().substring(0,9)=== "Low. Lim.") {
				if(this.magic[i].isLearned()) {
					lowerLimit = true;
					if(lowerLimit && upperLimit && !integrateFlag ) {
						list.push("Intgrte. #");
						integrateFlag = true;
					}
				}
			}
			else if(this.magic[i].getName().length >= 9 && this.magic[i].getName().substring(0,9) === "Upp. Lim.") {
				if(this.magic[i].isLearned()) {
					upperLimit = true;
					if(lowerLimit && upperLimit && !integrateFlag ) {
						list.push("Intgrte. #");
						integrateFlag = true;
					}
				}
			}
			else if(this.magic[i].isLearned())
				list.push(this.magic[i].getName());
		}
		var newList = [];
		for(var i = 0; i < list.length;i++) 
			newList[i] = list[i];
		return newList;
	}
	
	getSkillOptionCount() {
		return this.getSkillOptions().length;
	}
	
	getMagicOptionCount() {
		return this.getMagicOptions().length;
	}
	
	getSkillValues(name) {
		var list = [];
		var curSkills = this.getActiveSkills();
		for(var i = 0; i < this.activeSkillCount; i++) {
			if(curSkills[i].getName().length >= 7 && name.length>7 && curSkills[i].isLearned() && curSkills[i].getName().substring(0,7) === name.substring(0, 7))
				list.push(curSkills[i].getName().substring(8));
			else if(curSkills[i].getName().length >= 5 && name.length>5 && curSkills[i].isLearned() && curSkills[i].getName().substring(0,5) === name.substring(0, 5))
				list.push(curSkills[i].getName().substring(6));
		}
		var newList = [];
		for(var i = 0; i < list.length;i++) 
			newList[i] = list[i];
		return newList;
	}
	
	getSkillCount() {
		return this.passiveSkillCount + this.activeSkillCount;
	}
	
	getSkill(name) {
		if(typeof name === "number") {
			return this.getSkills()[name];
		}
		else {
			var theSkills = this.getSkills();
			for(var i = 0; i < theSkills.length; i++){
				if(theSkills[i].getName() === name)
					return theSkills[i];
			}
			return Skill.getSkill(-1);
		}
	}
	
	getSkills() {
		var temp = [];
		for(var i = 0; i < this.activeSkillCount;i++) {
			temp[i] = this.activeSkills[i];
		}
		for(var i = 0; i < this.passiveSkillCount;i++) {
			temp[i+this.activeSkillCount] = this.passiveSkills[i];
		}
		return temp;
	}
	
	getActiveSkills() {
		return this.activeSkills;
	}
	
	getPassiveSkills() {
		return this.passiveSkills;
	}
	
	getActiveSkillCount() {
		return this.activeSkillCount;
	}
	
	getPassiveSkillCount() {
		return this.passiveSkillCount;
	}
	
	getMagicCount() {
		return this.magicCount;
	}
	
	getMagic(name) {
		if(typeof name === "number") {
			return this.magic[name];
		}
		else {
			var theSpells = this.getMagics();
			for(var i = 0; i < this.magicCount; i++){
				if(theSpells[i].getName() === name)
					return theSpells[i];
			}
			return Spell.getSpell(-1);
		}
	}
	
	getMagics() {
		return this.magic;
	}
	
	getLowerLimits() {
		var theSpells = this.getMagics();
		var list = [];
		for(var i = 0; i < this.magicCount; i++) {
			if(theSpells[i].getName().length >= 9 && theSpells[i].isLearned() && theSpells[i].getName().substring(0,9) === "Low. Lim.")
				list.push(theSpells[i].getName().substring(10));
		}
		var newList = [];
		for(var i = 0; i < list.length;i++) 
			newList[i] = list[i];
		return newList;
	}
	
	getUpperLimits() {
		var theSpells = this.getMagics();
		var list = [];
		for(var i = 0; i < this.magicCount; i++) {
			if(theSpells[i].getName().length >= 9 && theSpells[i].isLearned() && theSpells[i].getName().substring(0,9) === "Upp. Lim.")
				list.push(theSpells[i].getName().substring(10));
		}
		var newList = [];
		for(var i = 0; i < list.length;i++) 
			newList[i] = list[i];
		return newList;
	}
	
	getTradeItemCount() {
		return this.tradeItemCount;
	}
	
	getTradeItem(i) {
		return this.tradeItems[i];
	}
	
	getTradeItems() {
		return this.tradeItems;
	}
	
	addTradeItem(ti) {
		this.tradeItems[this.tradeItemCount] = ti;
		this.tradeItemCount++;
	}
	
	removeTradeItem(ti) {
		for(var i = ti; i < this.tradeItemCount-1; i++) {
			this.tradeItems[i] = this.tradeItems[i+1];
		}
		this.tradeItemCount--;
	}
	
	getKeyItem(i) {
		return this.keyItems[i];
	}
	
	getKeyItems() {
		return this.keyItems;
	}
	
	addKeyItem(ki) {
		this.keyItems[this.keyItemCount] = ki;
		this.keyItemCount++;
	}
	
	removeKeyItem(ti) {
		for(var i = ti; i < this.keyItemCount-1; i++) {
			this.keyItems[i] = this.keyItems[i+1];
		}
		this.keyItemCount--;
	}
	
	getKeyItemCount() {
		return this.keyItemCount;
	}
	
	getWeaponCount() {
		return this.weaponCount;
	}
	
	getWeapon(i) {
		return this.weaponInv[i];
	}
	
	getWeapons() {
		return this.weaponInv;
	}
	
	getWieldedWeapon() {
		return this.wieldedWeapon;
	}
	
	addWeapon(ti) {
		this.weaponInv[this.weaponCount] = ti;
		this.weaponCount++;
	}
	
	removeWeapon(ti) {
		this.weaponInv.splice(ti,1);
		// for(var i = ti; i < this.weaponCount-1; i++) {
		// 	this.weaponInv[i] = this.weaponInv[i+1];
		// }
		this.weaponCount--;
	}
	
	getArmorCount() {
		return this.armorCount;
	}
	
	getArmor(i) {
		return this.armorInv[i];
	}
	
	getArmors() {
		return this.armorInv;
	}
	
	addArmor(ti) {
		this.armorInv[this.armorCount] = ti;
		this.armorCount++;
	}
	
	getWornArmor() {
		return this.wornArmor;
	}
	
	getWornAccessory() {
		return this.wornAccess;
	}
	
	removeArmor(ti) {
		this.armorInv.splice(ti,1);
		// for(var i = ti; i < this.armorCount-1; i++) {
		// 	this.armorInv[i] = this.armorInv[i+1];
		// }
		this.armorCount--;
	}
	getItemCount() {
		return this.itemCount;
	}
	
	getStrength() {
		return this.str;
	}
	
	addStrength(num) {
		this.str += num;
	}
	
	getDefense() {
		return this.def;
	}
	
	addDefense(num) {
		this.def += num;
	}
	
	getLevel() {
		return this.level;
	}
	
	levelUp() {
		this.level++;
	}
	
	//Only for diagnostic mode
	levelDown() {
		this.level--;
	}
	
	getExperience() {
		return this.exp;
	}
	
	addExperience(num) {
		this.exp += num;
	}
	
	getGold() {
		return this.gold;
	}
	
	addGold(am) {
		this.gold += am;
	}
	
	getItemAndQuantity(i) {
	    if(typeof i === "undefined") return this.getItemAndQuantityAlt();
		var temp = this.items[i].getName();
		var need = 0;
		if(this.itemQuantity[i] >= 10) need = 2;	else need = 1;
		while(temp.length < 11-need) temp += " ";
		return temp + this.itemQuantity[i].toString();
	}
	
	getItemAndQuantityAlt() {
		var temp = [];
		for(var i = 0; i < this.itemCount; i++) {
			temp[i]= this.items[i].getName();
			var need = 0;
			if(this.itemQuantity[i] >= 10) need = 2;	else need = 1;
			while(temp[i].length < 11-need) temp[i] += " ";
			temp[i] = temp[i] + this.itemQuantity[i].toString();
		}
		return temp;
	}
	
	useItem(i) {
		this.items[i].useItem(this);
		this.removeItem(i);
	}
	
	equipWeapon(i) {
		if(this.wieldedWeapon != null) 
			this.wieldedWeapon.unequip();
		if(this.weaponInv[i] == this.wieldedWeapon) {
			this.wieldedWeapon = null;
		}
		else {
			this.wieldedWeapon = this.weaponInv[i];
			this.weaponInv[i].equip();
		}
	}
	
	equipArmor(i) {
		if(this.armorInv[i].getType() === "Armor") {
			if(this.wornArmor != null) 
				this.wornArmor.unequip();
			if(this.armorInv[i] == this.wornArmor) {
				this.wornArmor = null;
			}
			else {
				this.wornArmor = this.armorInv[i];
				this.armorInv[i].equip();
			}
		}
		if(this.armorInv[i].getType() === "Accessory") {
			if(this.wornAccess != null) 
				this.wornAccess.unequip();
			if(this.armorInv[i] == this.wornAccess) {
				this.wornAccess = null;
			}
			else {
				this.wornAccess = this.armorInv[i];
				this.armorInv[i].equip();
			}
		}
	}
	
	getItems() {
		return this.items;
	}
	
	getHp() {
		return this.hp;
	}
	
	getHpMax() {
		return this.hpMax;
	}
	
	addHpMax(num) {
		this.hpMax += num;
	}
	
	getSp() {
		return this.sp;
	}
	
	getSpMax() {
		return this.spMax;
	}
	
	addSpMax(num) {
		this.spMax += num;
	}
	
	getMp() {
		return this.mp;
	}
	
	getMpMax() {
		return this.mpMax;
	}
	
	getName() {
		return this.name;
	}
	
	addMpMax(num) {
		this.mpMax += num;
	}

	changeHp(c) {
		if(this.equationShield && c < 0) {
			this.shield.add(c);
			this.shield = new Equation(this.shield.createString(),16);
			//shield = new Equation(shield.createString(),(Battle.PLAYER_WINDOW_X1+Battle.PLAYER_WINDOW_X2)/2-shield.getLength()/2,Battle.PLAYER_WINDOW_Y1-20,16);
		}
		else {
			this.hp += c;
			if(this.hp > this.hpMax) this.hp = this.hpMax;
			if(this.hp < 0) this.hp = 0;
		}
	}
	
	changeSp(c) {
		this.sp += c;
		if(this.sp > this.spMax) this.sp = this.spMax;
		if(this.sp < 0) this.sp = 0;
	}
	
	changeMp(c) {
		this.mp += c;
		if(this.mp > this.mpMax) this.mp = this.mpMax;
		if(this.mp < 0) this.mp = 0;
	}
	
	makeDefenseBuffer(buff) {
		this.defenseBuffer = buff;
		this.bufferTurns = 5;
	}
	
	makeAttackBoost(buff) {
		this.attackBoost = buff;
		this.boostTurns = 5;
	}
	
	updateBuffer() {
		this.bufferTurns--;
		if(this.bufferTurns == 0) this.defenseBuffer = 0;
	}
	
	updateBoost() {
		this.boostTurns--;
		if(this.boostTurns == 0) this.attackBoost = 0;
	}
	
	hasBuffer() {
		if(this.bufferTurns > 0) return true;
		return false;
	}
	
	hasBoost() {
		if(this.boostTurns > 0) return true;
		return false;
	}
	
	swapSkill(first, second) {
		if(first > this.activeSkillCount || second > this.activeSkillCount) return;
		var temp = this.activeSkills[first];
		this.activeSkills[first] = this.activeSkills[second];
		this.activeSkills[second] = temp;
	}
	
	swapSpell(first, second) {
		var temp = this.magic[first];
		this.magic[first] = this.magic[second];
		this.magic[second] = temp;
	}
	
	attackAmount() {
		var weaponAtt;
		if(this.wieldedWeapon != null)
			weaponAtt = this.wieldedWeapon.getBaseDamage() + Math.floor(Math.random() * this.wieldedWeapon.getModDamage());
		else
			weaponAtt = 0;
		return this.str + Math.floor(Math.random() * (this.str/8)) + weaponAtt + this.attackBoost; 
	}
	
	filterDamage(attack) {
		//System.out.println("Damage coming in:" + attack);
		var armorDef, accessDef;
		if(this.wornArmor != null)
			armorDef = this.wornArmor.getDefense() + Math.floor(Math.random() * this.wornArmor.getModDefense());
		else
			armorDef = 0;
		if(this.wornAccess != null)
			accessDef = this.wornAccess.getDefense() + Math.floor(Math.random() * this.wornAccess.getModDefense());
		else
			accessDef = 0;
		var newDamage = attack - (this.def + Math.floor(Math.random() * (this.def/8)) +armorDef + accessDef + this.defenseBuffer);
		if(newDamage < 1) newDamage = 1;
		//System.out.println("Damage leaving:" + newDamage);
		return newDamage;
	}
	
	makeEquationShield() {
		var newEq = Math.floor(Math.random()*3 + 1).toString() + "x+" + Math.floor(Math.random()*20+1).toString();
		if (newEq.substring(0, 1) === "1") newEq = newEq.substring(1);
		this.shield = new Equation(newEq,16);
		//shield = new Equation(newEq,(Battle.PLAYER_WINDOW_X1+Battle.PLAYER_WINDOW_X2)/2-shield.getLength()/2,Battle.PLAYER_WINDOW_Y1-20,16);
		this.equationShield = true;
	}
	
	hasShield() {
		return this.equationShield;
	}
	
	isShieldBroken() {
		if(this.shield.isConstant()) {
			if(this.shield.evaluate(0) < 1) {
				return true;
			}
		}
		return false;
	}
	
	breakShield(a) {
		var last = a.getNext();
		var temp1 = new Animation("Clear Message");
		var temp2 = new Animation("Pause", 3);
		var temp3 = new Animation("Add Message", new WindowMessage("Shield Break",false));
		var temp4 = new Animation("Open Message");
		var temp5 = new AnimationBreak(this,Battle.PLAYER_WINDOW_X1,Battle.PLAYER_WINDOW_Y1,Battle.PLAYER_WINDOW_X2-Battle.PLAYER_WINDOW_X1,Battle.PLAYER_WINDOW_Y2-Battle.PLAYER_WINDOW_Y1);
		var temp6 = new Animation("Damage Player",Math.floor(this.hp/2)*-1);
		var temp7 = new AnimationDamage("Damage",(Battle.PLAYER_WINDOW_X1+Battle.PLAYER_WINDOW_X2)/2,Battle.PLAYER_WINDOW_Y1+((Battle.PLAYER_WINDOW_Y2-Battle.PLAYER_WINDOW_Y1)*7)/8,this.hp/2*-1);
		a.setNext(temp1);temp1.setNext(temp2);temp2.setNext(temp3);temp3.setNext(temp4);temp4.setNext(temp5);temp5.setNext(temp6);temp6.setNext(temp7);temp7.setNext(last);
		this.equationShield = false;
	}
	
	removeShield() {
		this.equationShield = false;
	}
	
	
	getImage() {
		return this.character;
	}
	
	getImageWidth() {
		return parseInt(this.character.width);
	}
	
	getImageHeight() {
		return parseInt(this.character.height);
	}
	
	makeNewImage() {
		
		var p = document.createElement("img");
		p.src = "chara.png";
		p.onload = function() {
			var ctx = this.character.getContext("2d");
			this.character.width = "32";
			this.character.height = "32";
			ctx.drawImage(p,0,32*3,32,32, 0,0,32,32);
		}.bind(this);
		
	}
	
	restorePlayerVariables() {
		this.makeNewImage();
		this.icons = document.createElement("img");
		this.icons.src = "Icons.png";
		this.shieldColor = "cyan";
		
	}
	
	isDead() {
		if (this.hp<1) return true;
		return false;
	}
	
	getLastTown() {
		return this.lastTown;
	}
	
	setLastTown(nt) {
		this.lastTown = nt;
	}
	
	getLastAttack() {
		return this.lastAttack;
	}
	
	setLastAttack(la) {
		this.lastAttack = la;
	}
	
	checkSkills(sk, m) {
		if(!sk.canUse(this)) return new Animation("Nothing");
		this.setLastAttack(sk.getName());
		var pre1 = new Animation("Close Message");
		var pre2 = new Animation("Clear Message");
		var pre3 = new Animation("Close Options");
		var pre4 = new Animation("Close Second Window");
		var pre5 = new Animation("Pause",8);
		pre1.setNext(pre2);pre2.setNext(pre3);pre3.setNext(pre4);pre4.setNext(pre5);
		var action = sk.getName();
		//System.out.println("Action " + action);
		if(action.length > 7 && action.substring(0,7) === "Plug In") {
			var plugInValue = parseInt(action.substring(8));
			var temp1 = new Animation("Add Message",new WindowMessage(action,false));
			var temp2 = new Animation("Open Message");
			var temp3 = new Animation("Change SP", sk.getUseCost()*-1);
			var temp4 = new Animation("Pause",16);
			var temp5 = new Animation("Check Shield:"+action);
			var temp6 = new AnimationPlugIn("PlugIn",m.getX(),m.getY(), m.getWidth(), m.getHeight(),plugInValue);
			var temp7 = new Animation("Monster Plug In", plugInValue);
			var temp8 = new AnimationEvaluateAnimate(m);
			var temp9 = new Animation("Clear Message");
			var temp10 = new Animation("Check Death");
			var temp11 = new Animation("Monster Turn");
			pre5.setNext(temp1);temp1.setNext(temp2);temp2.setNext(temp3);temp3.setNext(temp4);temp4.setNext(temp5);temp5.setNext(temp6);temp6.setNext(temp7);temp7.setNext(temp8);temp8.setNext(temp9);temp9.setNext(temp10);temp10.setNext(temp11);
		}
		if(action === "Derivative") {
			var temp1 = new Animation("Add Message",new WindowMessage("Derivative",false));
			var temp2 = new Animation("Open Message");
			var temp3 = new Animation("Change MP", sk.getUseCost()*-1);
			var temp4 = new Animation("Pause",16);
			var temp5 = new Animation("Check Shield:Derivative");
			var temp6 = new AnimationDerivative(m,m.getX(),m.getY(), m.getWidth(), m.getHeight());
			var temp7 = new Animation("Clear Message");
			var temp8 = new Animation("Check Death");
			var temp9 = new Animation("Monster Turn");
			pre5.setNext(temp1);temp1.setNext(temp2);temp2.setNext(temp3);temp3.setNext(temp4);temp4.setNext(temp5);temp5.setNext(temp6);temp6.setNext(temp7);temp7.setNext(temp8);temp8.setNext(temp9);
		}
		if(action === "Dbl. Deriv.") {
			var temp1 = new Animation("Add Message",new WindowMessage("Double Derivative",false));
			var temp2 = new Animation("Open Message");
			var temp3 = new Animation("Change MP", sk.getUseCost()*-1);
			var temp4 = new Animation("Pause",16);
			var temp5 = new Animation("Check Shield:Double Derivative");
			var temp6 = new AnimationDoubleDerivative(m,m.getX(),m.getY(), m.getWidth(), m.getHeight());
			var temp7 = new Animation("Clear Message");
			var temp8 = new Animation("Check Death");
			var temp9 = new Animation("Monster Turn");
			pre5.setNext(temp1);temp1.setNext(temp2);temp2.setNext(temp3);temp3.setNext(temp4);temp4.setNext(temp5);temp5.setNext(temp6);temp6.setNext(temp7);temp7.setNext(temp8);temp8.setNext(temp9);
		}
		if(action === "Eq. Shield") {
			var temp1 = new Animation("Add Message",new WindowMessage("Equation Shield",false));
			var temp2 = new Animation("Open Message");
			var temp3 = new Animation("Change MP", sk.getUseCost()*-1);
			var temp4 = new Animation("Pause",16);
			var temp5 = new AnimationPlayerShield(this,Battle.PLAYER_WINDOW_X1,Battle.PLAYER_WINDOW_Y1,Battle.PLAYER_WINDOW_X2-Battle.PLAYER_WINDOW_X1,Battle.PLAYER_WINDOW_Y2-Battle.PLAYER_WINDOW_Y1);
			var temp6 = new Animation("Clear Message");
			var temp7 = new Animation("Check Death");
			var temp8 = new Animation("Monster Turn");
			pre5.setNext(temp1);temp1.setNext(temp2);temp2.setNext(temp3);temp3.setNext(temp4);temp4.setNext(temp5);temp5.setNext(temp6);temp6.setNext(temp7);temp7.setNext(temp8);
		}
		if(action.length > 5 && action.substring(0,6) === "Potion") {
			this.changeItemQuantity("Potion",-1);
			var temp1 = new Animation("Add Message",new WindowMessage("Potion",false));
			var temp2 = new Animation("Open Message");
			var temp3 = new Animation("Pause",16);
			var temp4 = new AnimationPotion(m,Battle.PLAYER_WINDOW_X1,Battle.PLAYER_WINDOW_Y1, Battle.PLAYER_WINDOW_X2-Battle.PLAYER_WINDOW_X1,Battle.PLAYER_WINDOW_Y2-Battle.PLAYER_WINDOW_Y1,false);
			var temp5 = new Animation("Damage Player",30);
			var temp6 = new AnimationDamage("Heal",(Battle.PLAYER_WINDOW_X1+Battle.PLAYER_WINDOW_X2)/2,Battle.PLAYER_WINDOW_Y1+((Battle.PLAYER_WINDOW_Y2-Battle.PLAYER_WINDOW_Y1)*7)/8,30);
			var temp7 = new Animation("Clear Message");
			var temp8 = new Animation("Check Death");
			var temp9 = new Animation("Monster Turn");
			pre5.setNext(temp1);temp1.setNext(temp2);temp2.setNext(temp3);temp3.setNext(temp4);temp4.setNext(temp5);temp5.setNext(temp6);temp6.setNext(temp7);temp7.setNext(temp8);temp8.setNext(temp9);
		}
		if(action.length > 8 && action.substring(0,9) === "Hi-Potion") {
			this.changeItemQuantity("Hi-Potion",-1);
			var temp1 = new Animation("Add Message",new WindowMessage("Hi-Potion",false));
			var temp2 = new Animation("Open Message");
			var temp3 = new Animation("Pause",16);
			var temp4 = new AnimationPotion(m,Battle.PLAYER_WINDOW_X1,Battle.PLAYER_WINDOW_Y1, Battle.PLAYER_WINDOW_X2-Battle.PLAYER_WINDOW_X1,Battle.PLAYER_WINDOW_Y2-Battle.PLAYER_WINDOW_Y1,true);
			var temp5 = new Animation("Damage Player",100);
			var temp6 = new AnimationDamage("Heal",(Battle.PLAYER_WINDOW_X1+Battle.PLAYER_WINDOW_X2)/2,Battle.PLAYER_WINDOW_Y1+((Battle.PLAYER_WINDOW_Y2-Battle.PLAYER_WINDOW_Y1)*7)/8,100);
			var temp7 = new Animation("Clear Message");
			var temp8 = new Animation("Check Death");
			var temp9 = new Animation("Monster Turn");
			pre5.setNext(temp1);temp1.setNext(temp2);temp2.setNext(temp3);temp3.setNext(temp4);temp4.setNext(temp5);temp5.setNext(temp6);temp6.setNext(temp7);temp7.setNext(temp8);temp8.setNext(temp9);
		}
		if(action.length > 8 && action.substring(0,9) === "SP Potion") {
			this.changeItemQuantity("SP Potion",-1);
			var temp1 = new Animation("Add Message",new WindowMessage("SP Potion",false));
			var temp2 = new Animation("Open Message");
			var temp3 = new Animation("Pause",16);
			var temp4 = new AnimationSPPotion(m,Battle.PLAYER_WINDOW_X1,Battle.PLAYER_WINDOW_Y1, Battle.PLAYER_WINDOW_X2-Battle.PLAYER_WINDOW_X1,Battle.PLAYER_WINDOW_Y2-Battle.PLAYER_WINDOW_Y1,false);
			var temp5 = new Animation("Change SP",20);
			var temp6 = new AnimationDamage("SP Heal",(Battle.PLAYER_WINDOW_X1+Battle.PLAYER_WINDOW_X2)/2,Battle.PLAYER_WINDOW_Y1+((Battle.PLAYER_WINDOW_Y2-Battle.PLAYER_WINDOW_Y1)*7)/8,20);
			var temp7 = new Animation("Clear Message");
			var temp8 = new Animation("Check Death");
			var temp9 = new Animation("Monster Turn");
			pre5.setNext(temp1);temp1.setNext(temp2);temp2.setNext(temp3);temp3.setNext(temp4);temp4.setNext(temp5);temp5.setNext(temp6);temp6.setNext(temp7);temp7.setNext(temp8);temp8.setNext(temp9);
		}
		if(action.length > 5 && action.substring(0,6) === "Cookie") {
			this.changeItemQuantity("Cookie",-1);
			var temp1 = new Animation("Add Message",new WindowMessage("Cookie",false));
			var temp2 = new Animation("Open Message");
			var temp3 = new Animation("Pause",16);
			var temp4 = new AnimationCookie(m,Battle.PLAYER_WINDOW_X1,Battle.PLAYER_WINDOW_Y1, Battle.PLAYER_WINDOW_X2-Battle.PLAYER_WINDOW_X1,Battle.PLAYER_WINDOW_Y2-Battle.PLAYER_WINDOW_Y1);
			var temp5 = new Animation("Change SP",50);
			var temp6 = new AnimationDamage("SP Heal",(Battle.PLAYER_WINDOW_X1+Battle.PLAYER_WINDOW_X2)/2,Battle.PLAYER_WINDOW_Y1+((Battle.PLAYER_WINDOW_Y2-Battle.PLAYER_WINDOW_Y1)*7)/8,50);
			var temp7 = new Animation("Clear Message");
			var temp8 = new Animation("Check Death");
			var temp9 = new Animation("Monster Turn");
			pre5.setNext(temp1);temp1.setNext(temp2);temp2.setNext(temp3);temp3.setNext(temp4);temp4.setNext(temp5);temp5.setNext(temp6);temp6.setNext(temp7);temp7.setNext(temp8);temp8.setNext(temp9);
		}
		if(action.length > 4 && action.substring(0,5) === "Candy") {
			this.changeItemQuantity("Candy",-1);
			var temp1 = new Animation("Add Message",new WindowMessage("Candy",false));
			var temp2 = new Animation("Open Message");
			var temp3 = new Animation("Pause",16);
			var temp4 = new AnimationCandy(m,Battle.PLAYER_WINDOW_X1,Battle.PLAYER_WINDOW_Y1, Battle.PLAYER_WINDOW_X2-Battle.PLAYER_WINDOW_X1,Battle.PLAYER_WINDOW_Y2-Battle.PLAYER_WINDOW_Y1);
			var temp5 = new Animation("Change SP",30);
			var temp6 = new AnimationDamage("SP Heal",(Battle.PLAYER_WINDOW_X1+Battle.PLAYER_WINDOW_X2)/2,Battle.PLAYER_WINDOW_Y1+((Battle.PLAYER_WINDOW_Y2-Battle.PLAYER_WINDOW_Y1)*7)/8,30);
			var temp5a = new Animation("Change MP",30);
			var temp6a = new AnimationDamage("MP Heal",(Battle.PLAYER_WINDOW_X1+Battle.PLAYER_WINDOW_X2)/2,Battle.PLAYER_WINDOW_Y1+((Battle.PLAYER_WINDOW_Y2-Battle.PLAYER_WINDOW_Y1)*7)/8,30);
			var temp7 = new Animation("Clear Message");
			var temp8 = new Animation("Check Death");
			var temp9 = new Animation("Monster Turn");
			pre5.setNext(temp1);temp1.setNext(temp2);temp2.setNext(temp3);temp3.setNext(temp4);temp4.setNext(temp5);temp5.setNext(temp6);temp6.setNext(temp5a);temp5a.setNext(temp6a);temp6a.setNext(temp7);temp7.setNext(temp8);temp8.setNext(temp9);
		}
		if(action.length > 4 && action.substring(0,5) === "Ether") {
			this.changeItemQuantity("Ether",-1);
			var temp1 = new Animation("Add Message",new WindowMessage("Ether",false));
			var temp2 = new Animation("Open Message");
			var temp3 = new Animation("Pause",16);
			var temp4 = new AnimationEther(m,Battle.PLAYER_WINDOW_X1,Battle.PLAYER_WINDOW_Y1, Battle.PLAYER_WINDOW_X2-Battle.PLAYER_WINDOW_X1,Battle.PLAYER_WINDOW_Y2-Battle.PLAYER_WINDOW_Y1,false);
			var temp5 = new Animation("Change MP",10);
			var temp6 = new AnimationDamage("MP Heal",(Battle.PLAYER_WINDOW_X1+Battle.PLAYER_WINDOW_X2)/2,Battle.PLAYER_WINDOW_Y1+((Battle.PLAYER_WINDOW_Y2-Battle.PLAYER_WINDOW_Y1)*7)/8,10);
			var temp7 = new Animation("Clear Message");
			var temp8 = new Animation("Check Death");
			var temp9 = new Animation("Monster Turn");
			pre5.setNext(temp1);temp1.setNext(temp2);temp2.setNext(temp3);temp3.setNext(temp4);temp4.setNext(temp5);temp5.setNext(temp6);temp6.setNext(temp7);temp7.setNext(temp8);temp8.setNext(temp9);
		}
		if(action.length > 7 && action.substring(0,8) === "Hi-Ether") {
			this.changeItemQuantity("Hi-Ether",-1);
			var temp1 = new Animation("Add Message",new WindowMessage("Hi-Ether",false));
			var temp2 = new Animation("Open Message");
			var temp3 = new Animation("Pause",16);
			var temp4 = new AnimationEther(m,Battle.PLAYER_WINDOW_X1,Battle.PLAYER_WINDOW_Y1, Battle.PLAYER_WINDOW_X2-Battle.PLAYER_WINDOW_X1,Battle.PLAYER_WINDOW_Y2-Battle.PLAYER_WINDOW_Y1,true);
			var temp5 = new Animation("Change MP",30);
			var temp6 = new AnimationDamage("MP Heal",(Battle.PLAYER_WINDOW_X1+Battle.PLAYER_WINDOW_X2)/2,Battle.PLAYER_WINDOW_Y1+((Battle.PLAYER_WINDOW_Y2-Battle.PLAYER_WINDOW_Y1)*7)/8,30);
			var temp7 = new Animation("Clear Message");
			var temp8 = new Animation("Check Death");
			var temp9 = new Animation("Monster Turn");
			pre5.setNext(temp1);temp1.setNext(temp2);temp2.setNext(temp3);temp3.setNext(temp4);temp4.setNext(temp5);temp5.setNext(temp6);temp6.setNext(temp7);temp7.setNext(temp8);temp8.setNext(temp9);
		}
		if(action.length > 8 && action.substring(0,9) === "Wow Drink") {
			this.changeItemQuantity("Wow Drink",-1);
			var temp1 = new Animation("Add Message",new WindowMessage("Wow Drink",false));
			var temp2 = new Animation("Open Message");
			var temp3 = new Animation("Pause",16);
			var temp4 = new AnimationWowDrink(m,Battle.PLAYER_WINDOW_X1,Battle.PLAYER_WINDOW_Y1, Battle.PLAYER_WINDOW_X2-Battle.PLAYER_WINDOW_X1,Battle.PLAYER_WINDOW_Y2-Battle.PLAYER_WINDOW_Y1);
			var temp5 = new Animation("Damage Player",500);
			var temp6 = new AnimationDamage("Heal",(Battle.PLAYER_WINDOW_X1+Battle.PLAYER_WINDOW_X2)/2,Battle.PLAYER_WINDOW_Y1+((Battle.PLAYER_WINDOW_Y2-Battle.PLAYER_WINDOW_Y1)*7)/8,500);
			var temp7 = new Animation("Clear Message");
			var temp8 = new Animation("Check Death");
			var temp9 = new Animation("Monster Turn");
			pre5.setNext(temp1);temp1.setNext(temp2);temp2.setNext(temp3);temp3.setNext(temp4);temp4.setNext(temp5);temp5.setNext(temp6);temp6.setNext(temp7);temp7.setNext(temp8);temp8.setNext(temp9);
		}
		if(action.length > 6 && action.substring(0,7) ==="Cupcake") {
			this.changeItemQuantity("Cupcake",-1);
			var temp1 = new Animation("Add Message",new WindowMessage("Cupcake",false));
			var temp2 = new Animation("Open Message");
			var temp3 = new Animation("Pause",16);
			var temp4 = new AnimationCupcake(m,Battle.PLAYER_WINDOW_X1,Battle.PLAYER_WINDOW_Y1, Battle.PLAYER_WINDOW_X2-Battle.PLAYER_WINDOW_X1,Battle.PLAYER_WINDOW_Y2-Battle.PLAYER_WINDOW_Y1);
			var temp5 = new Animation("Damage Player",200);
			var temp6 = new AnimationDamage("Heal",(Battle.PLAYER_WINDOW_X1+Battle.PLAYER_WINDOW_X2)/2,Battle.PLAYER_WINDOW_Y1+((Battle.PLAYER_WINDOW_Y2-Battle.PLAYER_WINDOW_Y1)*7)/8,200);
			var temp5a = new Animation("Change SP",40);
			var temp6a = new AnimationDamage("SP Heal",(Battle.PLAYER_WINDOW_X1+Battle.PLAYER_WINDOW_X2)/2,Battle.PLAYER_WINDOW_Y1+((Battle.PLAYER_WINDOW_Y2-Battle.PLAYER_WINDOW_Y1)*7)/8,40);
			var temp5b = new Animation("Change MP",30);
			var temp6b = new AnimationDamage("MP Heal",(Battle.PLAYER_WINDOW_X1+Battle.PLAYER_WINDOW_X2)/2,Battle.PLAYER_WINDOW_Y1+((Battle.PLAYER_WINDOW_Y2-Battle.PLAYER_WINDOW_Y1)*7)/8,30);
			var temp7 = new Animation("Clear Message");
			var temp8 = new Animation("Check Death");
			var temp9 = new Animation("Monster Turn");
			pre5.setNext(temp1);temp1.setNext(temp2);temp2.setNext(temp3);temp3.setNext(temp4);temp4.setNext(temp5);temp5.setNext(temp6);temp6.setNext(temp5a);temp5a.setNext(temp6a);temp6a.setNext(temp5b);temp5b.setNext(temp6b);temp6b.setNext(temp7);temp7.setNext(temp8);temp8.setNext(temp9);
		}
		if(action.length > 5 && action.substring(0,6) === "Elixir") {
			this.changeItemQuantity("Elixir",-1);
			var temp1 = new Animation("Add Message",new WindowMessage("Elixir",false));
			var temp2 = new Animation("Open Message");
			var temp3 = new Animation("Pause",16);
			var temp4 = new AnimationPotion(m,Battle.PLAYER_WINDOW_X1,Battle.PLAYER_WINDOW_Y1, Battle.PLAYER_WINDOW_X2-Battle.PLAYER_WINDOW_X1,Battle.PLAYER_WINDOW_Y2-Battle.PLAYER_WINDOW_Y1,true);
			var temp4a = new AnimationCupcake(m,Battle.PLAYER_WINDOW_X1,Battle.PLAYER_WINDOW_Y1, Battle.PLAYER_WINDOW_X2-Battle.PLAYER_WINDOW_X1,Battle.PLAYER_WINDOW_Y2-Battle.PLAYER_WINDOW_Y1);
			var temp4b = new AnimationWowDrink(m,Battle.PLAYER_WINDOW_X1,Battle.PLAYER_WINDOW_Y1, Battle.PLAYER_WINDOW_X2-Battle.PLAYER_WINDOW_X1,Battle.PLAYER_WINDOW_Y2-Battle.PLAYER_WINDOW_Y1);
			var temp5 = new Animation("Damage Player",10000);
			var temp6 = new AnimationDamage("Heal",(Battle.PLAYER_WINDOW_X1+Battle.PLAYER_WINDOW_X2)/2,Battle.PLAYER_WINDOW_Y1+((Battle.PLAYER_WINDOW_Y2-Battle.PLAYER_WINDOW_Y1)*7)/8,10000);
			var temp5a = new Animation("Change SP",10000);
			var temp6a = new AnimationDamage("SP Heal",(Battle.PLAYER_WINDOW_X1+Battle.PLAYER_WINDOW_X2)/2,Battle.PLAYER_WINDOW_Y1+((Battle.PLAYER_WINDOW_Y2-Battle.PLAYER_WINDOW_Y1)*7)/8,10000);
			var temp5b = new Animation("Change MP",10000);
			var temp6b = new AnimationDamage("MP Heal",(Battle.PLAYER_WINDOW_X1+Battle.PLAYER_WINDOW_X2)/2,Battle.PLAYER_WINDOW_Y1+((Battle.PLAYER_WINDOW_Y2-Battle.PLAYER_WINDOW_Y1)*7)/8,10000);
			var temp7 = new Animation("Clear Message");
			var temp8 = new Animation("Check Death");
			var temp9 = new Animation("Monster Turn");
			pre5.setNext(temp1);temp1.setNext(temp2);temp2.setNext(temp3);temp3.setNext(temp4);temp4.setNext(temp4a);temp4a.setNext(temp4b);temp4b.setNext(temp5);temp5.setNext(temp6);temp6.setNext(temp5a);temp5a.setNext(temp6a);temp6a.setNext(temp5b);temp5b.setNext(temp6b);temp6b.setNext(temp7);temp7.setNext(temp8);temp8.setNext(temp9);
		}
		if(action === "Heal") {
			var temp1 = new Animation("Add Message",new WindowMessage("Heal",false));
			var temp2 = new Animation("Open Message");
			var temp3 = new Animation("Change MP", sk.getUseCost()*-1);
			var temp4 = new Animation("Pause",16);
			var temp5 = new AnimationHeal(this,Battle.PLAYER_WINDOW_X1,Battle.PLAYER_WINDOW_Y1, Battle.PLAYER_WINDOW_X2-Battle.PLAYER_WINDOW_X1,Battle.PLAYER_WINDOW_Y2-Battle.PLAYER_WINDOW_Y1);
			var healAmount = 70*sk.getLevel() + Math.floor(Math.random()*70*sk.getLevel());
			var temp6 = new Animation("Damage Player", healAmount);
			var temp7 = new AnimationDamage("Heal",(Battle.PLAYER_WINDOW_X1+Battle.PLAYER_WINDOW_X2)/2,Battle.PLAYER_WINDOW_Y1+((Battle.PLAYER_WINDOW_Y2-Battle.PLAYER_WINDOW_Y1)*7)/8,healAmount);
			var temp8 = new Animation("Clear Message");
			var temp9 = new Animation("Check Death");
			var temp10 = new Animation("Monster Turn");
			pre5.setNext(temp1);temp1.setNext(temp2);temp2.setNext(temp3);temp3.setNext(temp4);temp4.setNext(temp5);temp5.setNext(temp6);temp6.setNext(temp7);temp7.setNext(temp8);temp8.setNext(temp9);temp9.setNext(temp10);
		}
		if(action === "SP Heal") {
			var temp1 = new Animation("Add Message",new WindowMessage("SP Heal",false));
			var temp2 = new Animation("Open Message");
			var temp3 = new Animation("Change MP", sk.getUseCost()*-1);
			var temp4 = new Animation("Pause",16);
			var temp5 = new AnimationSPHeal(m,Battle.PLAYER_WINDOW_X1,Battle.PLAYER_WINDOW_Y1, Battle.PLAYER_WINDOW_X2-Battle.PLAYER_WINDOW_X1,Battle.PLAYER_WINDOW_Y2-Battle.PLAYER_WINDOW_Y1);
			var healAmount = sk.getLevel() + Math.floor(Math.random()*5)+1;
			var temp6 = new Animation("Change SP", healAmount);
			var temp7 = new AnimationDamage("SP Heal",(Battle.PLAYER_WINDOW_X1+Battle.PLAYER_WINDOW_X2)/2,Battle.PLAYER_WINDOW_Y1+((Battle.PLAYER_WINDOW_Y2-Battle.PLAYER_WINDOW_Y1)*7)/8,healAmount);
			var temp8 = new Animation("Clear Message");
			var temp9 = new Animation("Check Death");
			var temp10 = new Animation("Monster Turn");
			pre5.setNext(temp1);temp1.setNext(temp2);temp2.setNext(temp3);temp3.setNext(temp4);temp4.setNext(temp5);temp5.setNext(temp6);temp6.setNext(temp7);temp7.setNext(temp8);temp8.setNext(temp9);temp9.setNext(temp10);
		}
		if(action === "Sq. Root") {
			var temp1 = new Animation("Add Message",new WindowMessage("Square Root",false));
			var temp2 = new Animation("Open Message");
			var temp3 = new Animation("Change MP", sk.getUseCost()*-1);
			var temp4 = new Animation("Pause",16);
			var temp5 = new Animation("Check Shield:Square Root");
			var temp6 = new AnimationSquareRoot(m,m.getX(),m.getY(), m.getWidth(), m.getHeight());
			var temp7 = new Animation("Nothing");
			var temp8 = new Animation("Nothing");
			if(m.isHpConstant() && m.getHP()>0) {
				var damAmount =  (m.getHP() - Math.floor( Math.sqrt(m.getHP()))) *-1;
				temp7 = new AnimationDamage("Damage",m.getX()+m.getWidth()/2,m.getY()+(m.getHeight()*7)/8,damAmount);
				temp8 = new Animation("Subtract Equation",damAmount);
			}
			var temp9 = new Animation("Clear Message");
			var temp10 = new Animation("Check Death");
			var temp11 = new Animation("Monster Turn");
			pre5.setNext(temp1);temp1.setNext(temp2);temp2.setNext(temp3);temp3.setNext(temp4);temp4.setNext(temp5);temp5.setNext(temp6);temp6.setNext(temp7);temp7.setNext(temp8);temp8.setNext(temp9);temp9.setNext(temp10);temp10.setNext(temp11);
		}
		if(action === "Nat. Log") {
			var temp1 = new Animation("Add Message",new WindowMessage("Natural Log",false));
			var temp2 = new Animation("Open Message");
			var temp3 = new Animation("Change MP", sk.getUseCost()*-1);
			var temp4 = new Animation("Pause",16);
			var temp5 = new Animation("Check Shield:Natural Log");
			var temp6 = new AnimationLog(m.getX(),m.getY(), m.getWidth(), m.getHeight());
			var temp7 = new Animation("Nothing");
			var temp8 = new Animation("Nothing");
			if(m.isHpConstant() && m.getHP()>0) {
				var damAmount =  (m.getHP() - Math.floor( Math.log(m.getHP()))) *-1;
				temp7 = new AnimationDamage("Damage",m.getX()+m.getWidth()/2,m.getY()+(m.getHeight()*7)/8,damAmount);
				temp8 = new Animation("Subtract Equation",damAmount);
			}
			var temp9 = new Animation("Clear Message");
			var temp10 = new Animation("Check Death");
			var temp11 = new Animation("Monster Turn");
			pre5.setNext(temp1);temp1.setNext(temp2);temp2.setNext(temp3);temp3.setNext(temp4);temp4.setNext(temp5);temp5.setNext(temp6);temp6.setNext(temp7);temp7.setNext(temp8);temp8.setNext(temp9);temp9.setNext(temp10);temp10.setNext(temp11);
		}
		if(action === "Div. By 2") {
			var temp1 = new Animation("Add Message",new WindowMessage("Divide By 2",false));
			var temp2 = new Animation("Open Message");
			var temp3 = new Animation("Change MP", sk.getUseCost()*-1);
			var temp4 = new Animation("Pause",16);
			var temp5 = new Animation("Check Shield:Div. By 2");
			var temp6 = new AnimationDivideBy2(m,m.getX(),m.getY(), m.getWidth(), m.getHeight());
			var temp7 = new Animation("Nothing");
			var temp8 = new Animation("Nothing");
			if(m.isHpConstant()) {
				var damAmount =  Math.floor(m.getHP()/2) *-1;
				temp7 = new AnimationDamage("Damage",m.getX()+m.getWidth()/2,m.getY()+(m.getHeight()*7)/8,damAmount);
				temp8 = new Animation("Subtract Equation",damAmount);
			}
			var temp9 = new Animation("Clear Message");
			var temp10 = new Animation("Check Death");
			var temp11 = new Animation("Monster Turn");
			pre5.setNext(temp1);temp1.setNext(temp2);temp2.setNext(temp3);temp3.setNext(temp4);temp4.setNext(temp5);temp5.setNext(temp6);temp6.setNext(temp7);temp7.setNext(temp8);temp8.setNext(temp9);temp9.setNext(temp10);temp10.setNext(temp11);
		}
		if(action === "Rem. Term") {
			var temp1 = new Animation("Add Message",new WindowMessage("Remove Term",false));
			var temp2 = new Animation("Open Message");
			var temp3 = new Animation("Change MP", sk.getUseCost()*-1);
			var temp4 = new Animation("Pause",16);
			var temp5 = new Animation("Check Shield:Remove Term");
			var temp6 = new AnimationRemoveTerm(m,m.getX(),m.getY(), m.getWidth(), m.getHeight());
			var temp7 = new Animation("Clear Message");
			var temp8 = new Animation("Check Death");
			var temp9 = new Animation("Monster Turn");
			pre5.setNext(temp1);temp1.setNext(temp2);temp2.setNext(temp3);temp3.setNext(temp4);temp4.setNext(temp5);temp5.setNext(temp6);temp6.setNext(temp7);temp7.setNext(temp8);temp8.setNext(temp9);
		}
		if(action === "Abs. Value") {
			var temp1 = new Animation("Add Message",new WindowMessage("Absolute Value",false));
			var temp2 = new Animation("Open Message");
			var temp3 = new Animation("Change SP", sk.getUseCost()*-1);
			var temp4 = new Animation("Pause",16);
			var temp5 = new Animation("Check Shield:Absolute Value");
			var temp6 = new AnimationAbsoluteValue(m,m.getX(),m.getY(), m.getWidth(), m.getHeight());
			var temp7 = new Animation("Clear Message");
			var temp8 = new Animation("Check Death");
			var temp9 = new Animation("Monster Turn");
			pre5.setNext(temp1);temp1.setNext(temp2);temp2.setNext(temp3);temp3.setNext(temp4);temp4.setNext(temp5);temp5.setNext(temp6);temp6.setNext(temp7);temp7.setNext(temp8);temp8.setNext(temp9);
		}
		if(action.length>=7 && action.substring(0,7) === "Subtct.") {
			var temp1 = new Animation("Add Message",new WindowMessage("Subtract "+action.substring(8),false));
			var temp2 = new Animation("Open Message");
			var temp3 = new Animation("Change SP", sk.getUseCost()*-1);
			var temp4 = new Animation("Pause",16);
			var temp5 = new Animation("Check Shield:Subtct. "+action.substring(8));
			//Animation temp6 = new AnimationSubtractAmount("Subtract "+action.substring(8),m.getX(), m.getY(), m.getWidth(), m.getHeight());
			var temp6 = new AnimationStandard("Slash.png",m.getX(), m.getY(), m.getWidth(), m.getHeight(),11,10);
			var damage = parseInt(action.substring(8))*-1;
			var temp7 = new AnimationDamage("Damage",m.getX()+m.getWidth()/2,m.getY()+(m.getHeight()*7)/8,damage);
			var temp8 = new Animation("Subtract Equation",damage);
			var temp9 = new Animation("Clear Message");
			var temp10 = new Animation("Check Death");
			var temp11 = new Animation("Monster Turn");
			pre5.setNext(temp1);temp1.setNext(temp2);temp2.setNext(temp3);temp3.setNext(temp4);temp4.setNext(temp5);temp5.setNext(temp6);temp6.setNext(temp7);temp7.setNext(temp8);temp8.setNext(temp9);temp9.setNext(temp10);temp10.setNext(temp11);
		}
		if(action.length>=5 && action.substring(0,5) ==="Term:") {
			var temp1 = new Animation("Add Message",new WindowMessage("Add Term "+action.substring(6),false));
			var temp2 = new Animation("Open Message");
			var temp3 = new Animation("Change SP", sk.getUseCost()*-1);
			var temp4 = new Animation("Pause",16);
			var temp5 = new Animation("Check Shield:Term "+action.substring(6));
			var temp6 = new AnimationAddPolynomial("Term: "+action.substring(6),m.getX(), m.getY(), m.getWidth(), m.getHeight(),m);
			var temp7 = new Animation("Clear Message");
			var temp8 = new Animation("Check Death");
			var temp9 = new Animation("Monster Turn");
			pre5.setNext(temp1);temp1.setNext(temp2);temp2.setNext(temp3);temp3.setNext(temp4);temp4.setNext(temp5);temp5.setNext(temp6);temp6.setNext(temp7);temp7.setNext(temp8);temp8.setNext(temp9);
		}
		if(action.length>=9 && action.substring(0,9) === "Integrate") {
			var temp1 = new Animation("Add Message",new WindowMessage(action,false));
			var temp2 = new Animation("Open Message");
			var temp3 = new Animation("Change MP", sk.getUseCost()*-1);
			var temp4 = new Animation("Pause",16);
			var temp5 = new Animation("Check Shield:Integrate");
			var temp6 = new AnimationIntegrate(m,action,m.getX(), m.getY(), m.getWidth(), m.getHeight());
			var temp7 = new Animation("Clear Message");
			var temp8 = new Animation("Check Death");
			var temp9 = new Animation("Monster Turn");
			pre5.setNext(temp1);temp1.setNext(temp2);temp2.setNext(temp3);temp3.setNext(temp4);temp4.setNext(temp5);temp5.setNext(temp6);temp6.setNext(temp7);temp7.setNext(temp8);temp8.setNext(temp9);
		}
		if(action === "Def. Buff.") {
			var temp1 = new Animation("Add Message",new WindowMessage("Defense Buffer",false));
			var temp2 = new Animation("Open Message");
			var temp3 = new Animation("Change SP", sk.getUseCost()*-1);
			var temp4 = new Animation("Pause",16);
			var temp6 = new AnimationDefenseBuffer(this,sk.getLevel(),Battle.PLAYER_WINDOW_X1,Battle.PLAYER_WINDOW_Y1, Battle.PLAYER_WINDOW_X2-Battle.PLAYER_WINDOW_X1,Battle.PLAYER_WINDOW_Y2-Battle.PLAYER_WINDOW_Y1);
			var temp7 = new Animation("Clear Message");
			var temp8 = new Animation("Check Death");
			var temp9 = new Animation("Monster Turn");
			pre5.setNext(temp1);temp1.setNext(temp2);temp2.setNext(temp3);temp3.setNext(temp4);temp4.setNext(temp6);temp6.setNext(temp7);temp7.setNext(temp8);temp8.setNext(temp9);
		}
		if(action ==="Att. Boost") {
			var temp1 = new Animation("Add Message",new WindowMessage("Attack Boost",false));
			var temp2 = new Animation("Open Message");
			var temp3 = new Animation("Change SP", sk.getUseCost()*-1);
			var temp4 = new Animation("Pause",16);
			var temp6 = new AnimationAttackBoost(this,sk.getLevel(),Battle.PLAYER_WINDOW_X1,Battle.PLAYER_WINDOW_Y1, Battle.PLAYER_WINDOW_X2-Battle.PLAYER_WINDOW_X1,Battle.PLAYER_WINDOW_Y2-Battle.PLAYER_WINDOW_Y1);
			var temp7 = new Animation("Clear Message");
			var temp8 = new Animation("Check Death");
			var temp9 = new Animation("Monster Turn");
			pre5.setNext(temp1);temp1.setNext(temp2);temp2.setNext(temp3);temp3.setNext(temp4);temp4.setNext(temp6);temp6.setNext(temp7);temp7.setNext(temp8);temp8.setNext(temp9);
		}
		
		return pre1;
	}
	
	
	static getPlayer(n, level) {
		var p = new Player(n);
		if(level == 1) {
			p = new Player(n,1,100,10,10,10,10,Weapon.getWeapon(3),Armor.getArmor(3),Armor.getArmor(19));
		}
		if(level == 2) {
			p = new Player(n,2,214,32,32,26,25,Weapon.getWeapon(3),Armor.getArmor(3),Armor.getArmor(19));
			p.addSkillTraining(Skill.getSkill(0));
			p.addSkillTraining(Skill.getSkill(1));
			p.addSkillTraining(Skill.getSkill(2));
			p.addSkillTraining(Skill.getSkill(3));
		}
		if(level == 3) {
			p = new Player(n,3,286,47,47,36,33,Weapon.getWeapon(3),Armor.getArmor(3),Armor.getArmor(19));
			for(var i = 0; i < 2; i++) p.addSkillTraining(Skill.getSkill(0));
			for(var i = 0; i < 2; i++) p.addSkillTraining(Skill.getSkill(1));
			for(var i = 0; i < 2; i++) p.addSkillTraining(Skill.getSkill(2));
			for(var i = 0; i < 2; i++) p.addSkillTraining(Skill.getSkill(3));
		}
		if(level == 4) {
			p = new Player(n,4,363,62,62,46,42,Weapon.getWeapon(3),Armor.getArmor(3),Armor.getArmor(19));
			for(var i = 0; i < 2; i++) p.addSkillTraining(Skill.getSkill(0));
			for(var i = 0; i < 2; i++) p.addSkillTraining(Skill.getSkill(1));
			for(var i = 0; i < 2; i++) p.addSkillTraining(Skill.getSkill(2));
			for(var i = 0; i < 2; i++) p.addSkillTraining(Skill.getSkill(3));
			p.addSpellTraining(Spell.getSpell(1));
		}
		if(level == 5) {
			p = new Player(n,5,444,78,78,58,51,Weapon.getWeapon(3),Armor.getArmor(3),Armor.getArmor(19));
			for(var i = 0; i < 3; i++) p.addSkillTraining(Skill.getSkill(0));
			for(var i = 0; i < 3; i++) p.addSkillTraining(Skill.getSkill(1));
			for(var i = 0; i < 3; i++) p.addSkillTraining(Skill.getSkill(2));
			for(var i = 0; i < 3; i++) p.addSkillTraining(Skill.getSkill(3));
			p.addSpellTraining(Spell.getSpell(1));
		}
		if(level == 6) {
			p = new Player(n,6,529,95,95,70,60,Weapon.getWeapon(6),Armor.getArmor(6),Armor.getArmor(22));
			for(var i = 0; i < 3; i++) p.addSkillTraining(Skill.getSkill(0));
			for(var i = 0; i < 3; i++) p.addSkillTraining(Skill.getSkill(1));
			for(var i = 0; i < 3; i++) p.addSkillTraining(Skill.getSkill(2));
			for(var i = 0; i < 3; i++) p.addSkillTraining(Skill.getSkill(3));
			for(var i = 0; i < 3; i++) p.addSkillTraining(Skill.getSkill(4));
			for(var i = 0; i < 3; i++) p.addSkillTraining(Skill.getSkill(5));
			for(var i = 0; i < 3; i++) p.addSkillTraining(Skill.getSkill(6));
			for(var i = 0; i < 2; i++) p.addSpellTraining(Spell.getSpell(1));
			p.addSpellTraining(Spell.getSpell(5));
		}
		if(level == 7) {
			p = new Player(n,7,616,113,113,82,69,Weapon.getWeapon(6),Armor.getArmor(6),Armor.getArmor(22));
			for(var i = 0; i < 4; i++) p.addSkillTraining(Skill.getSkill(0));
			for(var i = 0; i < 4; i++) p.addSkillTraining(Skill.getSkill(1));
			for(var i = 0; i < 4; i++) p.addSkillTraining(Skill.getSkill(2));
			for(var i = 0; i < 4; i++) p.addSkillTraining(Skill.getSkill(3));
			for(var i = 0; i < 4; i++) p.addSkillTraining(Skill.getSkill(4));
			for(var i = 0; i < 4; i++) p.addSkillTraining(Skill.getSkill(5));
			for(var i = 0; i < 4; i++) p.addSkillTraining(Skill.getSkill(6));
			for(var i = 0; i < 3; i++) p.addSpellTraining(Spell.getSpell(1));
			for(var i = 0; i < 2; i++) p.addSpellTraining(Spell.getSpell(5));
		}
		if(level == 8) {
			p = new Player(n,8,706,131,131,94,78,Weapon.getWeapon(9),Armor.getArmor(9),Armor.getArmor(25));
			for(var i = 0; i < 5; i++) p.addSkillTraining(Skill.getSkill(0));
			for(var i = 0; i < 5; i++) p.addSkillTraining(Skill.getSkill(1));
			for(var i = 0; i < 5; i++) p.addSkillTraining(Skill.getSkill(2));
			for(var i = 0; i < 5; i++) p.addSkillTraining(Skill.getSkill(3));
			for(var i = 0; i < 5; i++) p.addSkillTraining(Skill.getSkill(4));
			for(var i = 0; i < 5; i++) p.addSkillTraining(Skill.getSkill(5));
			for(var i = 0; i < 5; i++) p.addSkillTraining(Skill.getSkill(6));
			for(var i = 0; i < 5; i++) p.addSkillTraining(Skill.getSkill(7));
			for(var i = 0; i < 5; i++) p.addSkillTraining(Skill.getSkill(8));
			for(var i = 0; i < 5; i++) p.addSkillTraining(Skill.getSkill(9));
			for(var i = 0; i < 2; i++) p.addSkillTraining(Skill.getSkill(16));
			for(var i = 0; i < 3; i++) p.addSkillTraining(Skill.getSkill(46));
			for(var i = 0; i < 3; i++) p.addSkillTraining(Skill.getSkill(47));
			p.addSkillTraining(Skill.getSkill(21));
			p.addSkillTraining(Skill.getSkill(23));
			p.addSkillTraining(Skill.getSkill(26));
			p.addSkillTraining(Skill.getSkill(35));
			p.addSkillTraining(Skill.getSkill(39));
			p.addSkillTraining(Skill.getSkill(43));
			
			for(var i = 0; i < 2; i++) p.addSpellTraining(Spell.getSpell(0));
			for(var i = 0; i < 3; i++) p.addSpellTraining(Spell.getSpell(1));
			for(var i = 0; i < 4; i++) p.addSpellTraining(Spell.getSpell(4));
			for(var i = 0; i < 4; i++) p.addSpellTraining(Spell.getSpell(5));
			p.addSpellTraining(Spell.getSpell(6));
		}
		if(level == 9) {
			p = new Player(n,9,798,149,149,107,88,Weapon.getWeapon(9),Armor.getArmor(9),Armor.getArmor(25));
			for(var i = 0; i < 5; i++) p.addSkillTraining(Skill.getSkill(0));
			for(var i = 0; i < 5; i++) p.addSkillTraining(Skill.getSkill(1));
			for(var i = 0; i < 5; i++) p.addSkillTraining(Skill.getSkill(2));
			for(var i = 0; i < 5; i++) p.addSkillTraining(Skill.getSkill(3));
			for(var i = 0; i < 5; i++) p.addSkillTraining(Skill.getSkill(4));
			for(var i = 0; i < 5; i++) p.addSkillTraining(Skill.getSkill(5));
			for(var i = 0; i < 5; i++) p.addSkillTraining(Skill.getSkill(6));
			for(var i = 0; i < 5; i++) p.addSkillTraining(Skill.getSkill(7));
			for(var i = 0; i < 5; i++) p.addSkillTraining(Skill.getSkill(8));
			for(var i = 0; i < 5; i++) p.addSkillTraining(Skill.getSkill(9));
			for(var i = 0; i < 4; i++) p.addSkillTraining(Skill.getSkill(16));
			for(var i = 0; i < 2; i++) p.addSkillTraining(Skill.getSkill(21));
			for(var i = 0; i < 2; i++) p.addSkillTraining(Skill.getSkill(23));
			for(var i = 0; i < 2; i++) p.addSkillTraining(Skill.getSkill(26));
			for(var i = 0; i < 4; i++) p.addSkillTraining(Skill.getSkill(46));
			for(var i = 0; i < 4; i++) p.addSkillTraining(Skill.getSkill(47));
			p.addSkillTraining(Skill.getSkill(35));
			p.addSkillTraining(Skill.getSkill(39));
			p.addSkillTraining(Skill.getSkill(43));
			
			for(var i = 0; i < 3; i++) p.addSpellTraining(Spell.getSpell(0));
			for(var i = 0; i < 3; i++) p.addSpellTraining(Spell.getSpell(1));
			for(var i = 0; i < 6; i++) p.addSpellTraining(Spell.getSpell(4));
			for(var i = 0; i < 6; i++) p.addSpellTraining(Spell.getSpell(5));
			for(var i = 0; i < 2; i++) p.addSpellTraining(Spell.getSpell(6));
		}
		if(level == 10) {
			p = new Player(n,10,892,168,168,120,98,Weapon.getWeapon(9),Armor.getArmor(9),Armor.getArmor(25));
			for(var i = 0; i < 6; i++) p.addSkillTraining(Skill.getSkill(0));
			for(var i = 0; i < 6; i++) p.addSkillTraining(Skill.getSkill(1));
			for(var i = 0; i < 6; i++) p.addSkillTraining(Skill.getSkill(2));
			for(var i = 0; i < 6; i++) p.addSkillTraining(Skill.getSkill(3));
			for(var i = 0; i < 6; i++) p.addSkillTraining(Skill.getSkill(4));
			for(var i = 0; i < 6; i++) p.addSkillTraining(Skill.getSkill(5));
			for(var i = 0; i < 6; i++) p.addSkillTraining(Skill.getSkill(6));
			for(var i = 0; i < 6; i++) p.addSkillTraining(Skill.getSkill(7));
			for(var i = 0; i < 6; i++) p.addSkillTraining(Skill.getSkill(8));
			for(var i = 0; i < 6; i++) p.addSkillTraining(Skill.getSkill(9));
			for(var i = 0; i < 6; i++) p.addSkillTraining(Skill.getSkill(16));
			for(var i = 0; i < 3; i++) p.addSkillTraining(Skill.getSkill(21));
			for(var i = 0; i < 3; i++) p.addSkillTraining(Skill.getSkill(23));
			for(var i = 0; i < 3; i++) p.addSkillTraining(Skill.getSkill(26));
			for(var i = 0; i < 5; i++) p.addSkillTraining(Skill.getSkill(46));
			for(var i = 0; i < 5; i++) p.addSkillTraining(Skill.getSkill(47));
			p.addSkillTraining(Skill.getSkill(35));
			p.addSkillTraining(Skill.getSkill(39));
			p.addSkillTraining(Skill.getSkill(43));
			
			for(var i = 0; i < 4; i++) p.addSpellTraining(Spell.getSpell(0));
			for(var i = 0; i < 4; i++) p.addSpellTraining(Spell.getSpell(1));
			for(var i = 0; i < 6; i++) p.addSpellTraining(Spell.getSpell(4));
			for(var i = 0; i < 7; i++) p.addSpellTraining(Spell.getSpell(5));
			for(var i = 0; i < 4; i++) p.addSpellTraining(Spell.getSpell(6));
		}
		if(level == 11) {
			p = new Player(n,11,988,187,187,134,107,Weapon.getWeapon(9),Armor.getArmor(9),Armor.getArmor(25));
			for(var i = 0; i < 6; i++) p.addSkillTraining(Skill.getSkill(0));
			for(var i = 0; i < 6; i++) p.addSkillTraining(Skill.getSkill(1));
			for(var i = 0; i < 6; i++) p.addSkillTraining(Skill.getSkill(2));
			for(var i = 0; i < 6; i++) p.addSkillTraining(Skill.getSkill(3));
			for(var i = 0; i < 6; i++) p.addSkillTraining(Skill.getSkill(4));
			for(var i = 0; i < 6; i++) p.addSkillTraining(Skill.getSkill(5));
			for(var i = 0; i < 6; i++) p.addSkillTraining(Skill.getSkill(6));
			for(var i = 0; i < 6; i++) p.addSkillTraining(Skill.getSkill(7));
			for(var i = 0; i < 6; i++) p.addSkillTraining(Skill.getSkill(8));
			for(var i = 0; i < 6; i++) p.addSkillTraining(Skill.getSkill(9));
			for(var i = 0; i < 6; i++) p.addSkillTraining(Skill.getSkill(16));
			for(var i = 0; i < 4; i++) p.addSkillTraining(Skill.getSkill(21));
			for(var i = 0; i < 4; i++) p.addSkillTraining(Skill.getSkill(23));
			for(var i = 0; i < 4; i++) p.addSkillTraining(Skill.getSkill(26));
			for(var i = 0; i < 6; i++) p.addSkillTraining(Skill.getSkill(46));
			for(var i = 0; i < 6; i++) p.addSkillTraining(Skill.getSkill(47));
			p.addSkillTraining(Skill.getSkill(35));
			p.addSkillTraining(Skill.getSkill(39));
			p.addSkillTraining(Skill.getSkill(43));
			
			for(var i = 0; i < 5; i++) p.addSpellTraining(Spell.getSpell(0));
			for(var i = 0; i < 4; i++) p.addSpellTraining(Spell.getSpell(1));
			for(var i = 0; i < 6; i++) p.addSpellTraining(Spell.getSpell(4));
			for(var i = 0; i < 7; i++) p.addSpellTraining(Spell.getSpell(5));
			for(var i = 0; i < 6; i++) p.addSpellTraining(Spell.getSpell(6));
		}
		if(level == 12) {
			p = new Player(n,12,1086,207,207,148,117,Weapon.getWeapon(12),Armor.getArmor(12),Armor.getArmor(28));
			for(var i = 0; i < 7; i++) p.addSkillTraining(Skill.getSkill(0));
			for(var i = 0; i < 7; i++) p.addSkillTraining(Skill.getSkill(1));
			for(var i = 0; i < 7; i++) p.addSkillTraining(Skill.getSkill(2));
			for(var i = 0; i < 7; i++) p.addSkillTraining(Skill.getSkill(3));
			for(var i = 0; i < 7; i++) p.addSkillTraining(Skill.getSkill(4));
			for(var i = 0; i < 7; i++) p.addSkillTraining(Skill.getSkill(5));
			for(var i = 0; i < 7; i++) p.addSkillTraining(Skill.getSkill(6));
			for(var i = 0; i < 7; i++) p.addSkillTraining(Skill.getSkill(7));
			for(var i = 0; i < 7; i++) p.addSkillTraining(Skill.getSkill(8));
			for(var i = 0; i < 7; i++) p.addSkillTraining(Skill.getSkill(9));
			for(var i = 0; i < 7; i++) p.addSkillTraining(Skill.getSkill(10));
			for(var i = 0; i < 7; i++) p.addSkillTraining(Skill.getSkill(11));
			for(var i = 0; i < 7; i++) p.addSkillTraining(Skill.getSkill(12));
			for(var i = 0; i < 7; i++) p.addSkillTraining(Skill.getSkill(16));
			for(var i = 0; i < 5; i++) p.addSkillTraining(Skill.getSkill(19));
			for(var i = 0; i < 5; i++) p.addSkillTraining(Skill.getSkill(20));
			for(var i = 0; i < 5; i++) p.addSkillTraining(Skill.getSkill(21));
			for(var i = 0; i < 5; i++) p.addSkillTraining(Skill.getSkill(23));
			for(var i = 0; i < 5; i++) p.addSkillTraining(Skill.getSkill(24));
			for(var i = 0; i < 5; i++) p.addSkillTraining(Skill.getSkill(26));
			for(var i = 0; i < 7; i++) p.addSkillTraining(Skill.getSkill(46));
			for(var i = 0; i < 7; i++) p.addSkillTraining(Skill.getSkill(47));
			p.addSkillTraining(Skill.getSkill(27));
			p.addSkillTraining(Skill.getSkill(29));
			p.addSkillTraining(Skill.getSkill(31));
			p.addSkillTraining(Skill.getSkill(33));
			p.addSkillTraining(Skill.getSkill(35));
			p.addSkillTraining(Skill.getSkill(36));
			p.addSkillTraining(Skill.getSkill(37));
			p.addSkillTraining(Skill.getSkill(39));
			p.addSkillTraining(Skill.getSkill(43));
			p.addSkillTraining(Skill.getSkill(44));
			p.addSkillTraining(Skill.getSkill(45));
			
			for(var i = 0; i < 6; i++) p.addSpellTraining(Spell.getSpell(0));
			for(var i = 0; i < 5; i++) p.addSpellTraining(Spell.getSpell(1));
			for(var i = 0; i < 6; i++) p.addSpellTraining(Spell.getSpell(4));
			for(var i = 0; i < 7; i++) p.addSpellTraining(Spell.getSpell(5));
			for(var i = 0; i < 7; i++) p.addSpellTraining(Spell.getSpell(6));
			p.addSpellTraining(Spell.getSpell(7));
		}
		if(level == 13) {
			p = new Player(n,13,1185,227,227,161,127,Weapon.getWeapon(12),Armor.getArmor(12),Armor.getArmor(28));
			for(var i = 0; i < 7; i++) p.addSkillTraining(Skill.getSkill(0));
			for(var i = 0; i < 7; i++) p.addSkillTraining(Skill.getSkill(1));
			for(var i = 0; i < 7; i++) p.addSkillTraining(Skill.getSkill(2));
			for(var i = 0; i < 7; i++) p.addSkillTraining(Skill.getSkill(3));
			for(var i = 0; i < 7; i++) p.addSkillTraining(Skill.getSkill(4));
			for(var i = 0; i < 7; i++) p.addSkillTraining(Skill.getSkill(5));
			for(var i = 0; i < 7; i++) p.addSkillTraining(Skill.getSkill(6));
			for(var i = 0; i < 7; i++) p.addSkillTraining(Skill.getSkill(7));
			for(var i = 0; i < 7; i++) p.addSkillTraining(Skill.getSkill(8));
			for(var i = 0; i < 7; i++) p.addSkillTraining(Skill.getSkill(9));
			for(var i = 0; i < 7; i++) p.addSkillTraining(Skill.getSkill(10));
			for(var i = 0; i < 7; i++) p.addSkillTraining(Skill.getSkill(11));
			for(var i = 0; i < 7; i++) p.addSkillTraining(Skill.getSkill(12));
			for(var i = 0; i < 7; i++) p.addSkillTraining(Skill.getSkill(16));
			for(var i = 0; i < 5; i++) p.addSkillTraining(Skill.getSkill(19));
			for(var i = 0; i < 5; i++) p.addSkillTraining(Skill.getSkill(20));
			for(var i = 0; i < 5; i++) p.addSkillTraining(Skill.getSkill(21));
			for(var i = 0; i < 5; i++) p.addSkillTraining(Skill.getSkill(23));
			for(var i = 0; i < 5; i++) p.addSkillTraining(Skill.getSkill(24));
			for(var i = 0; i < 5; i++) p.addSkillTraining(Skill.getSkill(26));
			for(var i = 0; i < 2; i++) p.addSkillTraining(Skill.getSkill(27));
			for(var i = 0; i < 2; i++) p.addSkillTraining(Skill.getSkill(29));
			for(var i = 0; i < 2; i++) p.addSkillTraining(Skill.getSkill(31));
			for(var i = 0; i < 2; i++) p.addSkillTraining(Skill.getSkill(33));
			for(var i = 0; i < 7; i++) p.addSkillTraining(Skill.getSkill(46));
			for(var i = 0; i < 7; i++) p.addSkillTraining(Skill.getSkill(47));
			p.addSkillTraining(Skill.getSkill(35));
			p.addSkillTraining(Skill.getSkill(36));
			p.addSkillTraining(Skill.getSkill(37));
			p.addSkillTraining(Skill.getSkill(39));
			p.addSkillTraining(Skill.getSkill(43));
			p.addSkillTraining(Skill.getSkill(44));
			p.addSkillTraining(Skill.getSkill(45));
			
			for(var i = 0; i < 6; i++) p.addSpellTraining(Spell.getSpell(0));
			for(var i = 0; i < 6; i++) p.addSpellTraining(Spell.getSpell(1));
			p.addSpellTraining(Spell.getSpell(3));
			for(var i = 0; i < 6; i++) p.addSpellTraining(Spell.getSpell(4));
			for(var i = 0; i < 7; i++) p.addSpellTraining(Spell.getSpell(5));
			for(var i = 0; i < 7; i++) p.addSpellTraining(Spell.getSpell(6));
			for(var i = 0; i < 2; i++) p.addSpellTraining(Spell.getSpell(7));
		}
		if(level == 14) {
			p = new Player(n,14,1286,247,247,176,137,Weapon.getWeapon(12),Armor.getArmor(12),Armor.getArmor(28));
			for(var i = 0; i < 8; i++) p.addSkillTraining(Skill.getSkill(0));
			for(var i = 0; i < 8; i++) p.addSkillTraining(Skill.getSkill(1));
			for(var i = 0; i < 8; i++) p.addSkillTraining(Skill.getSkill(2));
			for(var i = 0; i < 8; i++) p.addSkillTraining(Skill.getSkill(3));
			for(var i = 0; i < 8; i++) p.addSkillTraining(Skill.getSkill(4));
			for(var i = 0; i < 8; i++) p.addSkillTraining(Skill.getSkill(5));
			for(var i = 0; i < 8; i++) p.addSkillTraining(Skill.getSkill(6));
			for(var i = 0; i < 8; i++) p.addSkillTraining(Skill.getSkill(7));
			for(var i = 0; i < 8; i++) p.addSkillTraining(Skill.getSkill(8));
			for(var i = 0; i < 8; i++) p.addSkillTraining(Skill.getSkill(9));
			for(var i = 0; i < 8; i++) p.addSkillTraining(Skill.getSkill(10));
			for(var i = 0; i < 8; i++) p.addSkillTraining(Skill.getSkill(11));
			for(var i = 0; i < 8; i++) p.addSkillTraining(Skill.getSkill(12));
			for(var i = 0; i < 7; i++) p.addSkillTraining(Skill.getSkill(16));
			for(var i = 0; i < 5; i++) p.addSkillTraining(Skill.getSkill(19));
			for(var i = 0; i < 5; i++) p.addSkillTraining(Skill.getSkill(20));
			for(var i = 0; i < 5; i++) p.addSkillTraining(Skill.getSkill(21));
			for(var i = 0; i < 5; i++) p.addSkillTraining(Skill.getSkill(23));
			for(var i = 0; i < 5; i++) p.addSkillTraining(Skill.getSkill(24));
			for(var i = 0; i < 5; i++) p.addSkillTraining(Skill.getSkill(26));
			for(var i = 0; i < 3; i++) p.addSkillTraining(Skill.getSkill(27));
			for(var i = 0; i < 3; i++) p.addSkillTraining(Skill.getSkill(29));
			for(var i = 0; i < 3; i++) p.addSkillTraining(Skill.getSkill(31));
			for(var i = 0; i < 3; i++) p.addSkillTraining(Skill.getSkill(33));
			for(var i = 0; i < 8; i++) p.addSkillTraining(Skill.getSkill(46));
			for(var i = 0; i < 8; i++) p.addSkillTraining(Skill.getSkill(47));
			p.addSkillTraining(Skill.getSkill(35));
			p.addSkillTraining(Skill.getSkill(36));
			p.addSkillTraining(Skill.getSkill(37));
			p.addSkillTraining(Skill.getSkill(39));
			p.addSkillTraining(Skill.getSkill(43));
			p.addSkillTraining(Skill.getSkill(44));
			p.addSkillTraining(Skill.getSkill(45));
			
			for(var i = 0; i < 7; i++) p.addSpellTraining(Spell.getSpell(0));
			for(var i = 0; i < 7; i++) p.addSpellTraining(Spell.getSpell(1));
			p.addSpellTraining(Spell.getSpell(2));
			for(var i = 0; i < 3; i++) p.addSpellTraining(Spell.getSpell(3));
			for(var i = 0; i < 6; i++) p.addSpellTraining(Spell.getSpell(4));
			for(var i = 0; i < 7; i++) p.addSpellTraining(Spell.getSpell(5));
			for(var i = 0; i < 7; i++) p.addSpellTraining(Spell.getSpell(6));
			for(var i = 0; i < 4; i++) p.addSpellTraining(Spell.getSpell(7));
		}
		if(level == 15) {
			p = new Player(n,15,1389,267,267,190,147,Weapon.getWeapon(12),Armor.getArmor(12),Armor.getArmor(28));
			for(var i = 0; i < 8; i++) p.addSkillTraining(Skill.getSkill(0));
			for(var i = 0; i < 8; i++) p.addSkillTraining(Skill.getSkill(1));
			for(var i = 0; i < 8; i++) p.addSkillTraining(Skill.getSkill(2));
			for(var i = 0; i < 8; i++) p.addSkillTraining(Skill.getSkill(3));
			for(var i = 0; i < 8; i++) p.addSkillTraining(Skill.getSkill(4));
			for(var i = 0; i < 8; i++) p.addSkillTraining(Skill.getSkill(5));
			for(var i = 0; i < 8; i++) p.addSkillTraining(Skill.getSkill(6));
			for(var i = 0; i < 8; i++) p.addSkillTraining(Skill.getSkill(7));
			for(var i = 0; i < 8; i++) p.addSkillTraining(Skill.getSkill(8));
			for(var i = 0; i < 8; i++) p.addSkillTraining(Skill.getSkill(9));
			for(var i = 0; i < 8; i++) p.addSkillTraining(Skill.getSkill(10));
			for(var i = 0; i < 8; i++) p.addSkillTraining(Skill.getSkill(11));
			for(var i = 0; i < 8; i++) p.addSkillTraining(Skill.getSkill(12));
			for(var i = 0; i < 7; i++) p.addSkillTraining(Skill.getSkill(16));
			for(var i = 0; i < 5; i++) p.addSkillTraining(Skill.getSkill(19));
			for(var i = 0; i < 5; i++) p.addSkillTraining(Skill.getSkill(20));
			for(var i = 0; i < 5; i++) p.addSkillTraining(Skill.getSkill(21));
			for(var i = 0; i < 5; i++) p.addSkillTraining(Skill.getSkill(23));
			for(var i = 0; i < 5; i++) p.addSkillTraining(Skill.getSkill(24));
			for(var i = 0; i < 5; i++) p.addSkillTraining(Skill.getSkill(26));
			for(var i = 0; i < 4; i++) p.addSkillTraining(Skill.getSkill(27));
			for(var i = 0; i < 4; i++) p.addSkillTraining(Skill.getSkill(29));
			for(var i = 0; i < 4; i++) p.addSkillTraining(Skill.getSkill(31));
			for(var i = 0; i < 4; i++) p.addSkillTraining(Skill.getSkill(33));
			for(var i = 0; i < 9; i++) p.addSkillTraining(Skill.getSkill(46));
			for(var i = 0; i < 9; i++) p.addSkillTraining(Skill.getSkill(47));
			p.addSkillTraining(Skill.getSkill(35));
			p.addSkillTraining(Skill.getSkill(36));
			p.addSkillTraining(Skill.getSkill(37));
			p.addSkillTraining(Skill.getSkill(39));
			p.addSkillTraining(Skill.getSkill(43));
			p.addSkillTraining(Skill.getSkill(44));
			p.addSkillTraining(Skill.getSkill(45));
			
			for(var i = 0; i < 8; i++) p.addSpellTraining(Spell.getSpell(0));
			for(var i = 0; i < 7; i++) p.addSpellTraining(Spell.getSpell(1));
			p.addSpellTraining(Spell.getSpell(2));
			for(var i = 0; i < 4; i++) p.addSpellTraining(Spell.getSpell(3));
			for(var i = 0; i < 6; i++) p.addSpellTraining(Spell.getSpell(4));
			for(var i = 0; i < 7; i++) p.addSpellTraining(Spell.getSpell(5));
			for(var i = 0; i < 7; i++) p.addSpellTraining(Spell.getSpell(6));
			for(var i = 0; i < 6; i++) p.addSpellTraining(Spell.getSpell(7));
			for(var i = 0; i < 2; i++) p.addSpellTraining(Spell.getSpell(8));
		}
		if(level == 16) {
			p = new Player(n,16,1492,288,288,205,157,Weapon.getWeapon(15),Armor.getArmor(15),Armor.getArmor(31));
			for(var i = 0; i < 9; i++) p.addSkillTraining(Skill.getSkill(0));
			for(var i = 0; i < 9; i++) p.addSkillTraining(Skill.getSkill(1));
			for(var i = 0; i < 9; i++) p.addSkillTraining(Skill.getSkill(2));
			for(var i = 0; i < 9; i++) p.addSkillTraining(Skill.getSkill(3));
			for(var i = 0; i < 9; i++) p.addSkillTraining(Skill.getSkill(4));
			for(var i = 0; i < 9; i++) p.addSkillTraining(Skill.getSkill(5));
			for(var i = 0; i < 9; i++) p.addSkillTraining(Skill.getSkill(6));
			for(var i = 0; i < 9; i++) p.addSkillTraining(Skill.getSkill(7));
			for(var i = 0; i < 9; i++) p.addSkillTraining(Skill.getSkill(8));
			for(var i = 0; i < 9; i++) p.addSkillTraining(Skill.getSkill(9));
			for(var i = 0; i < 9; i++) p.addSkillTraining(Skill.getSkill(10));
			for(var i = 0; i < 9; i++) p.addSkillTraining(Skill.getSkill(11));
			for(var i = 0; i < 9; i++) p.addSkillTraining(Skill.getSkill(12));
			for(var i = 0; i < 9; i++) p.addSkillTraining(Skill.getSkill(13));
			for(var i = 0; i < 9; i++) p.addSkillTraining(Skill.getSkill(14));
			for(var i = 0; i < 9; i++) p.addSkillTraining(Skill.getSkill(15));
			for(var i = 0; i < 7; i++) p.addSkillTraining(Skill.getSkill(16));
			for(var i = 0; i < 5; i++) p.addSkillTraining(Skill.getSkill(17));
			for(var i = 0; i < 5; i++) p.addSkillTraining(Skill.getSkill(18));
			for(var i = 0; i < 5; i++) p.addSkillTraining(Skill.getSkill(19));
			for(var i = 0; i < 5; i++) p.addSkillTraining(Skill.getSkill(20));
			for(var i = 0; i < 5; i++) p.addSkillTraining(Skill.getSkill(21));
			for(var i = 0; i < 5; i++) p.addSkillTraining(Skill.getSkill(22));
			for(var i = 0; i < 5; i++) p.addSkillTraining(Skill.getSkill(23));
			for(var i = 0; i < 5; i++) p.addSkillTraining(Skill.getSkill(24));
			for(var i = 0; i < 5; i++) p.addSkillTraining(Skill.getSkill(25));
			for(var i = 0; i < 5; i++) p.addSkillTraining(Skill.getSkill(26));
			for(var i = 0; i < 5; i++) p.addSkillTraining(Skill.getSkill(27));
			for(var i = 0; i < 5; i++) p.addSkillTraining(Skill.getSkill(28));
			for(var i = 0; i < 5; i++) p.addSkillTraining(Skill.getSkill(29));
			for(var i = 0; i < 5; i++) p.addSkillTraining(Skill.getSkill(30));
			for(var i = 0; i < 5; i++) p.addSkillTraining(Skill.getSkill(31));
			for(var i = 0; i < 5; i++) p.addSkillTraining(Skill.getSkill(32));
			for(var i = 0; i < 5; i++) p.addSkillTraining(Skill.getSkill(33));
			for(var i = 0; i < 5; i++) p.addSkillTraining(Skill.getSkill(34));
			for(var i = 0; i < 9; i++) p.addSkillTraining(Skill.getSkill(46));
			for(var i = 0; i < 9; i++) p.addSkillTraining(Skill.getSkill(47));
			p.addSkillTraining(Skill.getSkill(35));
			p.addSkillTraining(Skill.getSkill(36));
			p.addSkillTraining(Skill.getSkill(37));
			p.addSkillTraining(Skill.getSkill(38));
			p.addSkillTraining(Skill.getSkill(39));
			p.addSkillTraining(Skill.getSkill(40));
			p.addSkillTraining(Skill.getSkill(41));
			p.addSkillTraining(Skill.getSkill(42));
			p.addSkillTraining(Skill.getSkill(43));
			p.addSkillTraining(Skill.getSkill(44));
			p.addSkillTraining(Skill.getSkill(45));
			
			for(var i = 0; i < 9; i++) p.addSpellTraining(Spell.getSpell(0));
			for(var i = 0; i < 8; i++) p.addSpellTraining(Spell.getSpell(1));
			for(var i = 0; i < 2; i++) p.addSpellTraining(Spell.getSpell(2));
			for(var i = 0; i < 6; i++) p.addSpellTraining(Spell.getSpell(3));
			for(var i = 0; i < 6; i++) p.addSpellTraining(Spell.getSpell(4));
			for(var i = 0; i < 7; i++) p.addSpellTraining(Spell.getSpell(5));
			for(var i = 0; i < 7; i++) p.addSpellTraining(Spell.getSpell(6));
			for(var i = 0; i < 7; i++) p.addSpellTraining(Spell.getSpell(7));
			for(var i = 0; i < 4; i++) p.addSpellTraining(Spell.getSpell(8));
			for(var i = 0; i < 2; i++) p.addSpellTraining(Spell.getSpell(9));
			for(var i = 0; i < 2; i++) p.addSpellTraining(Spell.getSpell(10));
			for(var i = 0; i < 2; i++) p.addSpellTraining(Spell.getSpell(11));
			for(var i = 0; i < 2; i++) p.addSpellTraining(Spell.getSpell(12));
			for(var i = 0; i < 2; i++) p.addSpellTraining(Spell.getSpell(13));
			for(var i = 0; i < 2; i++) p.addSpellTraining(Spell.getSpell(14));
			for(var i = 0; i < 2; i++) p.addSpellTraining(Spell.getSpell(15));
			for(var i = 0; i < 2; i++) p.addSpellTraining(Spell.getSpell(16));
			for(var i = 0; i < 2; i++) p.addSpellTraining(Spell.getSpell(17));
			for(var i = 0; i < 2; i++) p.addSpellTraining(Spell.getSpell(18));
		}
		if(level == 17) {
			p = new Player(n,17,1597,309,309,219,167,Weapon.getWeapon(15),Armor.getArmor(15),Armor.getArmor(31));
			for(var i = 0; i < 9; i++) p.addSkillTraining(Skill.getSkill(0));
			for(var i = 0; i < 9; i++) p.addSkillTraining(Skill.getSkill(1));
			for(var i = 0; i < 9; i++) p.addSkillTraining(Skill.getSkill(2));
			for(var i = 0; i < 9; i++) p.addSkillTraining(Skill.getSkill(3));
			for(var i = 0; i < 9; i++) p.addSkillTraining(Skill.getSkill(4));
			for(var i = 0; i < 9; i++) p.addSkillTraining(Skill.getSkill(5));
			for(var i = 0; i < 9; i++) p.addSkillTraining(Skill.getSkill(6));
			for(var i = 0; i < 9; i++) p.addSkillTraining(Skill.getSkill(7));
			for(var i = 0; i < 9; i++) p.addSkillTraining(Skill.getSkill(8));
			for(var i = 0; i < 9; i++) p.addSkillTraining(Skill.getSkill(9));
			for(var i = 0; i < 9; i++) p.addSkillTraining(Skill.getSkill(10));
			for(var i = 0; i < 9; i++) p.addSkillTraining(Skill.getSkill(11));
			for(var i = 0; i < 9; i++) p.addSkillTraining(Skill.getSkill(12));
			for(var i = 0; i < 9; i++) p.addSkillTraining(Skill.getSkill(13));
			for(var i = 0; i < 9; i++) p.addSkillTraining(Skill.getSkill(14));
			for(var i = 0; i < 9; i++) p.addSkillTraining(Skill.getSkill(15));
			for(var i = 0; i < 7; i++) p.addSkillTraining(Skill.getSkill(16));
			for(var i = 0; i < 5; i++) p.addSkillTraining(Skill.getSkill(17));
			for(var i = 0; i < 5; i++) p.addSkillTraining(Skill.getSkill(18));
			for(var i = 0; i < 5; i++) p.addSkillTraining(Skill.getSkill(19));
			for(var i = 0; i < 5; i++) p.addSkillTraining(Skill.getSkill(20));
			for(var i = 0; i < 5; i++) p.addSkillTraining(Skill.getSkill(21));
			for(var i = 0; i < 5; i++) p.addSkillTraining(Skill.getSkill(22));
			for(var i = 0; i < 5; i++) p.addSkillTraining(Skill.getSkill(23));
			for(var i = 0; i < 5; i++) p.addSkillTraining(Skill.getSkill(24));
			for(var i = 0; i < 5; i++) p.addSkillTraining(Skill.getSkill(25));
			for(var i = 0; i < 5; i++) p.addSkillTraining(Skill.getSkill(26));
			for(var i = 0; i < 6; i++) p.addSkillTraining(Skill.getSkill(27));
			for(var i = 0; i < 6; i++) p.addSkillTraining(Skill.getSkill(28));
			for(var i = 0; i < 6; i++) p.addSkillTraining(Skill.getSkill(29));
			for(var i = 0; i < 6; i++) p.addSkillTraining(Skill.getSkill(30));
			for(var i = 0; i < 6; i++) p.addSkillTraining(Skill.getSkill(31));
			for(var i = 0; i < 6; i++) p.addSkillTraining(Skill.getSkill(32));
			for(var i = 0; i < 6; i++) p.addSkillTraining(Skill.getSkill(33));
			for(var i = 0; i < 6; i++) p.addSkillTraining(Skill.getSkill(34));
			for(var i = 0; i < 9; i++) p.addSkillTraining(Skill.getSkill(46));
			for(var i = 0; i < 9; i++) p.addSkillTraining(Skill.getSkill(47));
			p.addSkillTraining(Skill.getSkill(35));
			p.addSkillTraining(Skill.getSkill(36));
			p.addSkillTraining(Skill.getSkill(37));
			p.addSkillTraining(Skill.getSkill(38));
			p.addSkillTraining(Skill.getSkill(39));
			p.addSkillTraining(Skill.getSkill(40));
			p.addSkillTraining(Skill.getSkill(41));
			p.addSkillTraining(Skill.getSkill(42));
			p.addSkillTraining(Skill.getSkill(43));
			p.addSkillTraining(Skill.getSkill(44));
			p.addSkillTraining(Skill.getSkill(45));
			
			for(var i = 0; i < 9; i++) p.addSpellTraining(Spell.getSpell(0));
			for(var i = 0; i < 8; i++) p.addSpellTraining(Spell.getSpell(1));
			for(var i = 0; i < 3; i++) p.addSpellTraining(Spell.getSpell(2));
			for(var i = 0; i < 7; i++) p.addSpellTraining(Spell.getSpell(3));
			for(var i = 0; i < 6; i++) p.addSpellTraining(Spell.getSpell(4));
			for(var i = 0; i < 7; i++) p.addSpellTraining(Spell.getSpell(5));
			for(var i = 0; i < 7; i++) p.addSpellTraining(Spell.getSpell(6));
			for(var i = 0; i < 7; i++) p.addSpellTraining(Spell.getSpell(7));
			for(var i = 0; i < 6; i++) p.addSpellTraining(Spell.getSpell(8));
			for(var i = 0; i < 4; i++) p.addSpellTraining(Spell.getSpell(9));
			for(var i = 0; i < 4; i++) p.addSpellTraining(Spell.getSpell(10));
			for(var i = 0; i < 4; i++) p.addSpellTraining(Spell.getSpell(11));
			for(var i = 0; i < 4; i++) p.addSpellTraining(Spell.getSpell(12));
			for(var i = 0; i < 4; i++) p.addSpellTraining(Spell.getSpell(13));
			for(var i = 0; i < 4; i++) p.addSpellTraining(Spell.getSpell(14));
			for(var i = 0; i < 4; i++) p.addSpellTraining(Spell.getSpell(15));
			for(var i = 0; i < 4; i++) p.addSpellTraining(Spell.getSpell(16));
			for(var i = 0; i < 4; i++) p.addSpellTraining(Spell.getSpell(17));
			for(var i = 0; i < 4; i++) p.addSpellTraining(Spell.getSpell(18));
		}
		if(level == 18) {
			p = new Player(n,18,1704,330,330,234,178,Weapon.getWeapon(15),Armor.getArmor(15),Armor.getArmor(31));
			for(var i = 0; i < 9; i++) p.addSkillTraining(Skill.getSkill(0));
			for(var i = 0; i < 9; i++) p.addSkillTraining(Skill.getSkill(1));
			for(var i = 0; i < 9; i++) p.addSkillTraining(Skill.getSkill(2));
			for(var i = 0; i < 9; i++) p.addSkillTraining(Skill.getSkill(3));
			for(var i = 0; i < 9; i++) p.addSkillTraining(Skill.getSkill(4));
			for(var i = 0; i < 9; i++) p.addSkillTraining(Skill.getSkill(5));
			for(var i = 0; i < 9; i++) p.addSkillTraining(Skill.getSkill(6));
			for(var i = 0; i < 9; i++) p.addSkillTraining(Skill.getSkill(7));
			for(var i = 0; i < 9; i++) p.addSkillTraining(Skill.getSkill(8));
			for(var i = 0; i < 9; i++) p.addSkillTraining(Skill.getSkill(9));
			for(var i = 0; i < 9; i++) p.addSkillTraining(Skill.getSkill(10));
			for(var i = 0; i < 9; i++) p.addSkillTraining(Skill.getSkill(11));
			for(var i = 0; i < 9; i++) p.addSkillTraining(Skill.getSkill(12));
			for(var i = 0; i < 9; i++) p.addSkillTraining(Skill.getSkill(13));
			for(var i = 0; i < 9; i++) p.addSkillTraining(Skill.getSkill(14));
			for(var i = 0; i < 9; i++) p.addSkillTraining(Skill.getSkill(15));
			for(var i = 0; i < 7; i++) p.addSkillTraining(Skill.getSkill(16));
			for(var i = 0; i < 5; i++) p.addSkillTraining(Skill.getSkill(17));
			for(var i = 0; i < 5; i++) p.addSkillTraining(Skill.getSkill(18));
			for(var i = 0; i < 5; i++) p.addSkillTraining(Skill.getSkill(19));
			for(var i = 0; i < 5; i++) p.addSkillTraining(Skill.getSkill(20));
			for(var i = 0; i < 5; i++) p.addSkillTraining(Skill.getSkill(21));
			for(var i = 0; i < 5; i++) p.addSkillTraining(Skill.getSkill(22));
			for(var i = 0; i < 5; i++) p.addSkillTraining(Skill.getSkill(23));
			for(var i = 0; i < 5; i++) p.addSkillTraining(Skill.getSkill(24));
			for(var i = 0; i < 5; i++) p.addSkillTraining(Skill.getSkill(25));
			for(var i = 0; i < 5; i++) p.addSkillTraining(Skill.getSkill(26));
			for(var i = 0; i < 7; i++) p.addSkillTraining(Skill.getSkill(27));
			for(var i = 0; i < 7; i++) p.addSkillTraining(Skill.getSkill(28));
			for(var i = 0; i < 7; i++) p.addSkillTraining(Skill.getSkill(29));
			for(var i = 0; i < 7; i++) p.addSkillTraining(Skill.getSkill(30));
			for(var i = 0; i < 7; i++) p.addSkillTraining(Skill.getSkill(31));
			for(var i = 0; i < 7; i++) p.addSkillTraining(Skill.getSkill(32));
			for(var i = 0; i < 7; i++) p.addSkillTraining(Skill.getSkill(33));
			for(var i = 0; i < 7; i++) p.addSkillTraining(Skill.getSkill(34));
			for(var i = 0; i < 9; i++) p.addSkillTraining(Skill.getSkill(46));
			for(var i = 0; i < 9; i++) p.addSkillTraining(Skill.getSkill(47));
			p.addSkillTraining(Skill.getSkill(35));
			p.addSkillTraining(Skill.getSkill(36));
			p.addSkillTraining(Skill.getSkill(37));
			p.addSkillTraining(Skill.getSkill(38));
			p.addSkillTraining(Skill.getSkill(39));
			p.addSkillTraining(Skill.getSkill(40));
			p.addSkillTraining(Skill.getSkill(41));
			p.addSkillTraining(Skill.getSkill(42));
			p.addSkillTraining(Skill.getSkill(43));
			p.addSkillTraining(Skill.getSkill(44));
			p.addSkillTraining(Skill.getSkill(45));
			
			for(var i = 0; i < 10; i++) p.addSpellTraining(Spell.getSpell(0));
			for(var i = 0; i < 9; i++) p.addSpellTraining(Spell.getSpell(1));
			for(var i = 0; i < 4; i++) p.addSpellTraining(Spell.getSpell(2));
			for(var i = 0; i < 8; i++) p.addSpellTraining(Spell.getSpell(3));
			for(var i = 0; i < 6; i++) p.addSpellTraining(Spell.getSpell(4));
			for(var i = 0; i < 7; i++) p.addSpellTraining(Spell.getSpell(5));
			for(var i = 0; i < 7; i++) p.addSpellTraining(Spell.getSpell(6));
			for(var i = 0; i < 7; i++) p.addSpellTraining(Spell.getSpell(7));
			for(var i = 0; i < 8; i++) p.addSpellTraining(Spell.getSpell(8));
			for(var i = 0; i < 6; i++) p.addSpellTraining(Spell.getSpell(9));
			for(var i = 0; i < 6; i++) p.addSpellTraining(Spell.getSpell(10));
			for(var i = 0; i < 6; i++) p.addSpellTraining(Spell.getSpell(11));
			for(var i = 0; i < 6; i++) p.addSpellTraining(Spell.getSpell(12));
			for(var i = 0; i < 6; i++) p.addSpellTraining(Spell.getSpell(13));
			for(var i = 0; i < 6; i++) p.addSpellTraining(Spell.getSpell(14));
			for(var i = 0; i < 6; i++) p.addSpellTraining(Spell.getSpell(15));
			for(var i = 0; i < 6; i++) p.addSpellTraining(Spell.getSpell(16));
			for(var i = 0; i < 6; i++) p.addSpellTraining(Spell.getSpell(17));
			for(var i = 0; i < 6; i++) p.addSpellTraining(Spell.getSpell(18));
		}
		if(level == 19) {
			p = new Player(n,19,1811,352,352,249,188,Weapon.getWeapon(15),Armor.getArmor(15),Armor.getArmor(31));
			for(var i = 0; i < 9; i++) p.addSkillTraining(Skill.getSkill(0));
			for(var i = 0; i < 9; i++) p.addSkillTraining(Skill.getSkill(1));
			for(var i = 0; i < 9; i++) p.addSkillTraining(Skill.getSkill(2));
			for(var i = 0; i < 9; i++) p.addSkillTraining(Skill.getSkill(3));
			for(var i = 0; i < 9; i++) p.addSkillTraining(Skill.getSkill(4));
			for(var i = 0; i < 9; i++) p.addSkillTraining(Skill.getSkill(5));
			for(var i = 0; i < 9; i++) p.addSkillTraining(Skill.getSkill(6));
			for(var i = 0; i < 9; i++) p.addSkillTraining(Skill.getSkill(7));
			for(var i = 0; i < 9; i++) p.addSkillTraining(Skill.getSkill(8));
			for(var i = 0; i < 9; i++) p.addSkillTraining(Skill.getSkill(9));
			for(var i = 0; i < 9; i++) p.addSkillTraining(Skill.getSkill(10));
			for(var i = 0; i < 9; i++) p.addSkillTraining(Skill.getSkill(11));
			for(var i = 0; i < 9; i++) p.addSkillTraining(Skill.getSkill(12));
			for(var i = 0; i < 9; i++) p.addSkillTraining(Skill.getSkill(13));
			for(var i = 0; i < 9; i++) p.addSkillTraining(Skill.getSkill(14));
			for(var i = 0; i < 9; i++) p.addSkillTraining(Skill.getSkill(15));
			for(var i = 0; i < 7; i++) p.addSkillTraining(Skill.getSkill(16));
			for(var i = 0; i < 5; i++) p.addSkillTraining(Skill.getSkill(17));
			for(var i = 0; i < 5; i++) p.addSkillTraining(Skill.getSkill(18));
			for(var i = 0; i < 5; i++) p.addSkillTraining(Skill.getSkill(19));
			for(var i = 0; i < 5; i++) p.addSkillTraining(Skill.getSkill(20));
			for(var i = 0; i < 5; i++) p.addSkillTraining(Skill.getSkill(21));
			for(var i = 0; i < 5; i++) p.addSkillTraining(Skill.getSkill(22));
			for(var i = 0; i < 5; i++) p.addSkillTraining(Skill.getSkill(23));
			for(var i = 0; i < 5; i++) p.addSkillTraining(Skill.getSkill(24));
			for(var i = 0; i < 5; i++) p.addSkillTraining(Skill.getSkill(25));
			for(var i = 0; i < 5; i++) p.addSkillTraining(Skill.getSkill(26));
			for(var i = 0; i < 9; i++) p.addSkillTraining(Skill.getSkill(27));
			for(var i = 0; i < 9; i++) p.addSkillTraining(Skill.getSkill(28));
			for(var i = 0; i < 9; i++) p.addSkillTraining(Skill.getSkill(29));
			for(var i = 0; i < 9; i++) p.addSkillTraining(Skill.getSkill(30));
			for(var i = 0; i < 9; i++) p.addSkillTraining(Skill.getSkill(31));
			for(var i = 0; i < 9; i++) p.addSkillTraining(Skill.getSkill(32));
			for(var i = 0; i < 9; i++) p.addSkillTraining(Skill.getSkill(33));
			for(var i = 0; i < 9; i++) p.addSkillTraining(Skill.getSkill(34));
			for(var i = 0; i < 9; i++) p.addSkillTraining(Skill.getSkill(46));
			for(var i = 0; i < 9; i++) p.addSkillTraining(Skill.getSkill(47));
			p.addSkillTraining(Skill.getSkill(35));
			p.addSkillTraining(Skill.getSkill(36));
			p.addSkillTraining(Skill.getSkill(37));
			p.addSkillTraining(Skill.getSkill(38));
			p.addSkillTraining(Skill.getSkill(39));
			p.addSkillTraining(Skill.getSkill(40));
			p.addSkillTraining(Skill.getSkill(41));
			p.addSkillTraining(Skill.getSkill(42));
			p.addSkillTraining(Skill.getSkill(43));
			p.addSkillTraining(Skill.getSkill(44));
			p.addSkillTraining(Skill.getSkill(45));
			
			for(var i = 0; i < 10; i++) p.addSpellTraining(Spell.getSpell(0));
			for(var i = 0; i < 10; i++) p.addSpellTraining(Spell.getSpell(1));
			for(var i = 0; i < 4; i++) p.addSpellTraining(Spell.getSpell(2));
			for(var i = 0; i < 8; i++) p.addSpellTraining(Spell.getSpell(3));
			for(var i = 0; i < 6; i++) p.addSpellTraining(Spell.getSpell(4));
			for(var i = 0; i < 7; i++) p.addSpellTraining(Spell.getSpell(5));
			for(var i = 0; i < 7; i++) p.addSpellTraining(Spell.getSpell(6));
			for(var i = 0; i < 7; i++) p.addSpellTraining(Spell.getSpell(7));
			for(var i = 0; i < 8; i++) p.addSpellTraining(Spell.getSpell(8));
			for(var i = 0; i < 8; i++) p.addSpellTraining(Spell.getSpell(9));
			for(var i = 0; i < 8; i++) p.addSpellTraining(Spell.getSpell(10));
			for(var i = 0; i < 8; i++) p.addSpellTraining(Spell.getSpell(11));
			for(var i = 0; i < 8; i++) p.addSpellTraining(Spell.getSpell(12));
			for(var i = 0; i < 8; i++) p.addSpellTraining(Spell.getSpell(13));
			for(var i = 0; i < 8; i++) p.addSpellTraining(Spell.getSpell(14));
			for(var i = 0; i < 8; i++) p.addSpellTraining(Spell.getSpell(15));
			for(var i = 0; i < 8; i++) p.addSpellTraining(Spell.getSpell(16));
			for(var i = 0; i < 8; i++) p.addSpellTraining(Spell.getSpell(17));
			for(var i = 0; i < 8; i++) p.addSpellTraining(Spell.getSpell(18));
		}
		return p;
	}
}

Player.MAX_TRADE_ITEM_INVENTORY = 25;
Player.MAX_ITEM_INVENTORY = 10;
Player.MAX_WEAPON_INVENTORY = 10;
Player.MAX_ARMOR_INVENTORY = 10;
Player.MAX_KEY_ITEM_INVENTORY = 10;

Player.roundRect = function (ctx, x, y, width, height, radius, fill, stroke) {
  if (typeof stroke == 'undefined') {
    stroke = true;
  }
  if (typeof radius === 'undefined') {
    radius = 5;
  }
  if (typeof radius === 'number') {
    radius = {tl: radius, tr: radius, br: radius, bl: radius};
  } else {
    var defaultRadius = {tl: 0, tr: 0, br: 0, bl: 0};
    for (var side in defaultRadius) {
      radius[side] = radius[side] || defaultRadius[side];
    }
  }
  ctx.beginPath();
  ctx.moveTo(x + radius.tl, y);
  ctx.lineTo(x + width - radius.tr, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
  ctx.lineTo(x + width, y + height - radius.br);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
  ctx.lineTo(x + radius.bl, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
  ctx.lineTo(x, y + radius.tl);
  ctx.quadraticCurveTo(x, y, x + radius.tl, y);
  ctx.closePath();
  if (fill) {
    ctx.fill();
  }
  if (stroke) {
    ctx.stroke();
  }

};

Player.getLevelingRequirements = function(level) {
		return Math.floor(75 * Math.pow(level-1,2.2));
};
	
Player.getHpLimits = function(level) {
		return Math.floor(50 * Math.pow(level,1.2)) + 100;
};
	
Player.getSpLimits = function(level) {
		return Math.floor(10 * Math.pow(level,1.2)) + 10;
};
	
Player.getMpLimits = function(level) {
		return Math.floor(10 * Math.pow(level,1.2)) + 10;
};
	
Player.getStrengthLimits = function(level) {
		return Math.floor(7 * Math.pow(level,1.2)) + 10;
};
	
Player.getDefenseLimits = function(level) {
		return Math.floor(7 * Math.pow(level,1.1)) + 10;
};
	