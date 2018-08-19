class Armor {

	//final static int MAX_TRADE_ITEMS = 5;

	constructor(n, d, c, def, mdef, t) {
		if(typeof n === "object") {
			this.cost = n.cost;
			this.defense = n.defense;
			this.description = n.description;
			this.equipped = n.equipped;
			this.modDefense = n.modDefense;
			this.name = n.name;
			this.type = n.type;
			return;
		}
		this.name = n;
		this.description = d;
		this.cost = c;
		this.defense = def;
		this.modDefense = mdef;
		this.type = t;
		this.equipped = false;
	}
	
	getStatString() {
		var statSum = this.cost + this.defense + this.modDefense;
		var statString = this.name + this.description + this.type + this.equipped.toString() + statSum.toString();
		return statString;
	}
	
	getName() {
		return this.name;
	}
	
	getDescription() {
		return this.description;
	}
	
	//Not applicable in Armor
	getUseCost() {
		return 0;
	}
	
	//Not applicable in Armor
	canUse(p) {
		return true;
	}
	
	getDefense() {
		return this.defense;
	}
	
	getModDefense() {
		return this.modDefense;
	}
	getCost() {
		return this.cost;
	}
	
	equip() {
		this.equipped = true;
	}
	
	unequip() {
		this.equipped = false;
	}
	
	isEquipped() {
		return this.equipped;
	}
	
	getType() {
		return this.type;
	}
	
	static getArmor(itemNum) {
		if(itemNum == 0)
			return new Armor("Cloth", "+2 Defense, +2 Variance, Armor", 20,2,2,"Armor");
		if(itemNum == 1)
			return new Armor("Toga", "+3 Defense, +2 Variance, Armor", 100,3,2,"Armor");
		if(itemNum == 2)
			return new Armor("Leather Armor", "+5 Defense, +3 Variance, Armor", 500,5,3,"Armor");
		if(itemNum == 3)
			return new Armor("Splint Mail", "+8 Defense, +6 Variance, Armor", 1000,8,6,"Armor");
		if(itemNum == 4)
			return new Armor("Chain Mail", "+14 Defense, +3 Variance, Armor", 1600,14,3,"Armor");
		if(itemNum == 5)
			return new Armor("Plate Mail", "+18 Defense, +8 Variance, Armor", 2050,18,8,"Armor");
		if(itemNum == 6)
			return new Armor("Magic Armor", "+22 Defense, +6 Variance, Armor", 2500,22,6,"Armor");
		if(itemNum == 7)
			return new Armor("Defense Mail", "+27 Defense, +4 Variance, Armor", 2700,27,4,"Armor");
		if(itemNum == 8)
			return new Armor("Crystal Tunic", "+30 Defense, +5 Variance, Armor", 3000,30,5,"Armor");
		if(itemNum == 9)
			return new Armor("Correction", "+34 Defense, +7 Variance, Armor", 3350,34,7,"Armor");
		if(itemNum == 10)
			return new Armor("Inverse Mail", "+39 Defense, +6 Variance, Armor", 4000,39,6,"Armor");
		if(itemNum == 11)
			return new Armor("Stop", "+42 Defense, +4 Variance, Armor", 4750,42,4,"Armor");
		if(itemNum == 12)
			return new Armor("Extra Credit", "+48 Defense, +9 Variance, Armor", 5500,48,9,"Armor");
		if(itemNum == 13)
			return new Armor("Favoitism", "+52 Defense, +6 Variance, Armor", 6250,52,6,"Armor");
		if(itemNum == 14)
			return new Armor("Study Armor", "+56 Defense, +10 Variance, Armor", 8000,56,10,"Armor");
		if(itemNum == 15)
			return new Armor("AP Protection", "+70 Defense, +5 Variance, Armor", 12500,70,5,"Armor");
		
		if(itemNum == 16)
			return new Armor("Ring", "+2 Defense, +1 Variance, Accessory", 50,2,1,"Accessory");
		if(itemNum == 17)
			return new Armor("Badge", "+3 Defense, +2 Variance, Accessory", 250,3,2,"Accessory");
		if(itemNum == 18)
			return new Armor("Necklace", "+4 Defense, +3 Variance, Accessory", 500,4,3,"Accessory");
		if(itemNum == 19)
			return new Armor("Scabbard", "+6 Defense, +3 Variance, Accessory", 1000,6,3,"Accessory");
		if(itemNum == 20)
			return new Armor("Shield", "+8 Defense, +4 Variance, Accessory", 1400,8,4,"Accessory");
		if(itemNum == 21)
			return new Armor("Opal", "+9 Defense, +1 Variance, Accessory", 1900,9,1,"Accessory");
		if(itemNum == 22)
			return new Armor("Amulet", "+11 Defense, +3 Variance, Accessory", 2500,11,3,"Accessory");
		if(itemNum == 23)
			return new Armor("Plus", "+12 Defense, +4 Variance, Accessory", 2850,12,4,"Accessory");
		if(itemNum == 24)
			return new Armor("Composite", "+0 Defense, +20 Variance, Accessory", 3225,0,20,"Accessory");
		if(itemNum == 25)
			return new Armor("Square", "+14 Defense, +5 Variance, Accessory", 3350,14,5,"Accessory");
		if(itemNum == 26)
			return new Armor("Octogon", "+18 Defense, +8 Variance, Accessory", 4100,18,8,"Accessory");
		if(itemNum == 27)
			return new Armor("Continuous", "+19 Defense, +4 Variance, Accessory", 4875,19,4,"Accessory");
		if(itemNum == 28)
			return new Armor("IVT", "+20 Defense, +5 Variance, Accessory", 5500,20,5,"Accessory");
		if(itemNum == 29)
			return new Armor("Differential", "+23 Defense, +3 Variance, Accessory", 7000,23,3,"Accessory");
		if(itemNum == 30)
			return new Armor("Infinity", "+28 Defense, +2 Variance, Accessory", 9000,28,2,"Accessory");
		if(itemNum == 31)
			return new Armor("AP Calculator", "+30 Defense, +5 Variance, Accessory", 12500,30,5,"Accessory");
		
		return new Armor("Nothing","This item does nothing",1,0,0,"Armor");
	}
}