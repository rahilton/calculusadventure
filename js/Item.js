class Item {

	constructor(n, d, c) {
		if(typeof n === "object") {
			this.name = n.name;
			this.description = n.description;
			this.cost = n.cost;
			return;
		}
		this.name = n;
		this.description = d;
		this.cost = c;
	}
	
	getStatString() {
		var statSum = this.cost;
		var statString = this.name + this.description + statSum.toString();
		return statString;
	}
	
	
	getName() {
		return this.name;
	}
	
	//Not applicable in Item
	getUseCost() {
		return 0;
	}
	
	canUse(p) {
		if(this.name === "Repellant") return false;
		return true;
	}
	
	getDescription() {
		return this.description;
	}
	
	getCost() {
		return this.cost;
	}
	
	useItem(p) {
		if(this.name === "Potion") {
			p.changeHp(30);
		}
		if(this.name === "Hi-Potion") {
			p.changeHp(100);
		}
		if(this.name === "SP Potion") {
			p.changeSp(20);
		}
		if(this.name === "Ether") {
			p.changeMp(20);
		}
		if(this.name === "Hi-Ether") {
			p.changeMp(50);
		}
		if(this.name === "Wow Drink") {
			p.changeHp(500);
		}
		if(this.name === "Cookie") {
			p.changeSp(50);
		}
		if(this.name === "Candy") {
			p.changeSp(20);
			p.changeMp(20);
		}
		if(this.name === "Cupcake") {
			p.changeHp(200);
			p.changeSp(40);
			p.changeMp(30);
		}
		if(this.name === "Elixir") {
			p.changeHp(10000);
			p.changeSp(10000);
			p.changeMp(10000);
		}
		if(this.name === "Repellant") {
			p.setRepel(50);
		}
	}
	
	static getItem(itemNum) {
		if(itemNum == 0)
			return new Item("Potion", "Restores 30 HP", 20);
		if(itemNum == 1)
			return new Item("Hi-Potion", "Restores 100 HP", 100);
		if(itemNum == 2)
			return new Item("SP Potion", "Restores 20 SP", 100);
		if(itemNum == 3)
			return new Item("Ether", "Restores 20 MP", 200);
		if(itemNum == 4)
			return new Item("Hi-Ether", "Restores 50 MP", 600);
		if(itemNum == 5)
			return new Item("Wow Drink", "Restores 500 HP", 800);
		if(itemNum == 6)
			return new Item("Cookie", "Restores 50 SP", 400);
		if(itemNum == 7)
			return new Item("Candy", "Restores 20 SP and 20 MP", 1000);
		if(itemNum == 8)
			return new Item("Cupcake", "Restores 200 HP, 40 SP and 30 MP", 2000);
		if(itemNum == 9)
			return new Item("Elixir", "Restores all HP, SP and MP", 5000);
		if(itemNum == 10)
			return new Item("Repellant", "Prevents encounters of monsters 2 levels lower than you.", 600);
		return new Item("Nothing","This item does nothing",1);
	}

}
