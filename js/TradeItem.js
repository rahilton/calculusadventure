class TradeItem {
	
	constructor(n, d, c) {
		this.name = n;
		this.description = d;
		this.cost = c;
	}
	
	getStatString() {
		var statSum = this.cost;
		var statString = this.name + this.description + (statSum).toString();
		return statString;
	}
	
	getName() {
		return this.name;
	}
	
	getDescription() {
		return this.description;
	}
	
	//Not applicable in TradeItem
	getUseCost() {
		return 0;
	}
	
	//Not applicable in TradeItem
	canUse(p) {
		return true;
	}
	
	getCost() {
		return this.cost;
	}
	
	static getItem(itemNum) {
		if(itemNum == 0)
			return new TradeItem("Rice", "Perfect for many food dishes.", 20);
		if(itemNum == 1)
			return new TradeItem("Beans", "Beans, beans, the magical fruit...", 30);
		if(itemNum == 2)
			return new TradeItem("Cotton", "Don't put it in the dryer. It will shrink.", 40);
		if(itemNum == 3)
			return new TradeItem("Leather", "Gotta love that smell.", 50);
		if(itemNum == 4)
			return new TradeItem("Coffee", "There's a Starbucks even here.", 100);
		if(itemNum == 5)
			return new TradeItem("Furs", "To rub against your face.", 150);
		if(itemNum == 6)
			return new TradeItem("Spices", "It's getting spicy in here.", 220);
		if(itemNum == 7)
			return new TradeItem("Bottles", "Where all the stuff goes.", 260);
		if(itemNum == 8)
			return new TradeItem("Clay", "Feel like making a sculpture?", 350);
		if(itemNum == 9)
			return new TradeItem("Dyes", "How I love my coat of many colors...", 420);
		if(itemNum == 10)
			return new TradeItem("Paper", "Got a thought? Write it down.", 440);
		if(itemNum == 11)
			return new TradeItem("Salt", "For those savory treats.", 470);
		if(itemNum == 12)
			return new TradeItem("Perfume", "Gotta smell good. Especially in the wilderness.", 530);
		if(itemNum == 13)
			return new TradeItem("Flax", "The linens you sleep on.", 590);
		if(itemNum == 14)
			return new TradeItem("Books", "Got a story? Write a book.", 670);
		if(itemNum == 15)
			return new TradeItem("Beads", "Pretty beads....", 720);
		if(itemNum == 16)
			return new TradeItem("Herbs", "For making potions and remedies.", 830);
		if(itemNum == 17)
			return new TradeItem("Nectar", "Sweet, sweet nectar.", 900);
		if(itemNum == 18)
			return new TradeItem("Opals", "That's some nice looking stones you got there.", 1010);
		if(itemNum == 19)
			return new TradeItem("Silk", "So smooth.....", 1090);
		if(itemNum == 20)
			return new TradeItem("Marble", "Go ahead, make another sculpture with no arms.", 1110);
		if(itemNum == 21)
			return new TradeItem("Crystal", "Gaze into my ball of crystal.", 1340);
		if(itemNum == 22)
			return new TradeItem("Rubies", "The best of the red jewels.", 1500);
		if(itemNum == 23)
			return new TradeItem("Emeralds", "Those jewels match your eyes.", 2000);
		if(itemNum == 24)
			return new TradeItem("Diamonds", "...are a girl's best friend.", 2500);

		return new TradeItem("Nothing","This item does nothing",1);
	}
	
	/* Furs
	 * Spices
	 * Beans
	 * Rice
	 * Bottles
	 * Wine
	 * Beer
	 * Flax
	 * Cotton
	 * Leather
	 * Salt
	 * Cloth
	 * Silk
	 * Clay
	 * Marble
	 * Dyes
	 * Coffee
	 * Books
	 * Crystal
	 * Opals
	 * Rubies
	 * Diamonds
	 * Paper
	 * Perfume
	 * Beads
	 * Nectar
	 * Herbs
	 */
	

}

TradeItem.MAX_TRADE_ITEMS = 25;