class Weapon {
	
	constructor(n, des, c, b, m) {
		if(typeof n === "object") {
			this.name = n.name;
			this.description = n.description;
			this.cost = n.cost;
			this.baseDamage = n.baseDamage;
			this.modDamage = n.modDamage;
			this.equipped = n.equipped;
			return;
		}
		this.name = n;
		this.description = des;
		this.cost = c;
		this.baseDamage = b;
		this.modDamage = m;
		this.equipped = false;
	}
	
	getStatString() {
		var statSum = this.cost + this.baseDamage + this.modDamage;
		var statString = this.name + this.description + this.equipped.toString() + statSum.toString();
		return statString;
	}
	
	getName() {
		return this.name;
	}
	
	getDescription() {
		return this.description;
	}
	
	//Not applicable in Weapon
	getUseCost() {
		return 0;
	}
	
	//Not applicable in Weapon
	canUse(p) {
		return true;
	}
	getCost() {
		return this.cost;
	}
	
	setBaseDamage(b) {
		this.baseDamage = b;
	}
	
	getBaseDamage() {
		return this.baseDamage;
	}
	
	setModDamage(b) {
		this.modDamage = b;
	}
	
	getModDamage() {
		return this.modDamage;
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
	
	static getWeapon(itemNum) {
		if(itemNum == 0)
			return new Weapon("Stick", "+2 Attack, +2 Variance", 100,2,2);
		if(itemNum == 1)
			return new Weapon("Dagger", "+4 Attack, +2 Variance", 400,4,2);
		if(itemNum == 2)
			return new Weapon("Wooden Sword", "+5 Attack, +3 Variance", 750,5,3);
		if(itemNum == 3)
			return new Weapon("Short Sword", "+7 Attack, +4 Variance", 1000,7,4);
		if(itemNum == 4)
			return new Weapon("Flail", "+3 Attack, +5 Variance", 1500,3,5);
		if(itemNum == 5)
			return new Weapon("Whip", "+8 Attack, +7 Variance", 2000,8,7);
		if(itemNum == 6)
			return new Weapon("Wand", "+7 Attack, +20 Variance", 2500,7,20);
		if(itemNum == 7)
			return new Weapon("War Axe", "+14 Attack, +8 Variance", 2670,14,8);
		if(itemNum == 8)
			return new Weapon("The Zero", "+20 Attack, +10 Variance", 3000,20,10);
		if(itemNum == 9)
			return new Weapon("Divisor", "+25 Attack, +8 Variance", 3350,25,8);
		if(itemNum == 10)
			return new Weapon("The Cubic", "+27 Attack, +8 Variance", 4100,27,8);
		if(itemNum == 11)
			return new Weapon("Fulgarithm", "+33 Attack, +6 Variance", 4700,33,6);
		if(itemNum == 12)
			return new Weapon("Discontinuous", "+40 Attack, +10 Variance", 5500,40,10);
		if(itemNum == 13)
			return new Weapon("A++", "+46 Attack, +2 Variance", 7250,46,2);
		if(itemNum == 14)
			return new Weapon("The Cheater", "+54 Attack, +7 Variance", 9000,54,7);
		if(itemNum == 15)
			return new Weapon("AP Crusher", "+70 Attack, +20 Variance", 12500,70,20);
		
		
		return new Weapon("Nothing","This item does nothing",1,0,0);
	}
}
