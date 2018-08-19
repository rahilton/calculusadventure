class KeyItem {

	constructor(n, d) {
		if(typeof n === "object") {
			this.name = n.name;
			this.description = n.description;
			return;
		}
		this.name = n;
		this.description = d;
	}
	
	getStatString() {
		var statString = this.name + this.description;
		return statString;
	}
	
	getName() {
		return this.name;
	}
	
	//Not applicable in KeyItem
	getUseCost() {
		return 0;
	}
	
	//Not applicable in KeyItem
	canUse(p) {
		return true;
	}
	
	getDescription() {
		return this.description;
	}
	
	static getKeyItem(itemNum) {
		if(itemNum == 0)
			return new KeyItem("Crystal of Earth", "The crystal taken from the Earth Cave.");
		if(itemNum == 1)
			return new KeyItem("Crystal of Air", "The crystal taken from the abandoned tower.");
		if(itemNum == 2)
			return new KeyItem("Crystal of Water", "The crystal taken from the Ice Dungeon.");
		if(itemNum == 3)
			return new KeyItem("Crystal of Fire", "The crystal taken from the volcano.");
		if(itemNum == 4)
			return new KeyItem("Beacon", "Creates a path to the floating island.");
		
		return new KeyItem("Nothing","This item does nothing");
	}

}
