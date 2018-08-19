class TaskWeaponShop extends Task{
	
	//Window 0 is the main dialog with bust.
	//Window 1 is the shop option window.
	//Window 2 is the item description window.
	//Window 3 is the cost window.
	//Window 4 is matching box 1
	//Window 5 is matching box 2
	//Window 6 is matching box 3
	//Window 7 is matching box 4
	//Window 8 is matching box 5
	//Window 9 is matching box 6

	constructor(p, w) {
		super("WeaponShop.jpg",p, w);
		this.ani.push(new Animation("Fade In"));
		this.buying = true;
		this.init();
		this.questionNum = 0;
		this.solved = false; 
		this.shopNumber = 0;
	}
	
	changeShopNumber(newNumber) {
		this.shopNumber = newNumber;
		this.init();
	}
	
	init() {
		this.windows = [];
		var win = new GameWindow(5,440,1000,700);
		//Position 0
		var temp = new WindowMessage("Welcome to the " + ShopBank.getTownName(this.shopNumber) + " Weapon Shop. You need a weapon?");
		temp.setType("Option");
		temp.addOption("Yes");
		temp.addOption("No");
		temp.setBust("WeaponSeller.png");
		win.addText(temp);
		
		//Position 1
		temp = new WindowMessage("Complete the square, I'll sell you a weapon.");
		temp.setBust("WeaponSeller.png");
		win.addText(temp);
		
		//Position 2
		temp = new WindowMessage("...");
		temp.setBust("WeaponSeller.png");
		win.addText(temp);
		
		//Position 3
		temp = new WindowMessage("Can I put a weapon in your hand today?");
		temp.setBust("WeaponSeller.png");
		win.addText(temp);
		
		//Position 4
		temp = new WindowMessage("Be careful out there.");
		temp.setBust("WeaponSeller.png");
		win.addText(temp);
						
		this.windows.push(win);
		
		win = new GameWindow(5,300,1000,700,false);
		//Populate the shop window: Window 1
		this.windows.push(win);
		this.populateShopWindow();
		this.windows[1].resetOptions();
		
		win = new GameWindow(5,5,1000,150,false);
		//Populate the item description window: Window 2
		this.windows.push(win);
		this.populateDescriptionWindow();
		
		//Populate the cost window: Window 3
		win = new GameWindow(600,200,1000,300,false);
		this.windows.push(win);
		this.populateCostWindow();
		this.setValidPurchases();
		
		this.buying = true;
		
		//Buying indicator: Window 4
		win = new GameWindow(5,200,150,300,false);
		temp = new WindowMessage("");
		temp.setType("Option");
		temp.addOption("Buy");
		win.addText(temp);
		win.addText(new WindowMessage("Buy",false));
		this.windows.push(win);
		
		//Selling indicator: Window 5
		win = new GameWindow(150,200,320,300,false);
		temp = new WindowMessage("");
		temp.setType("Option");
		temp.addOption("Sell");
		win.addText(temp);
		win.addText(new WindowMessage("Sell",false));
		win.setPosition(1);
		this.windows.push(win);
		
		//Fill the question windows
		//Equation[] eqs = getQuestion();
		
		win = new GameWindow(5,400,333,500,false);
		this.windows.push(win);
		win = new GameWindow(333,400,666,500,false);
		this.windows.push(win);
		win = new GameWindow(666,400,1000,500,false);
		this.windows.push(win);
		win = new GameWindow(5,100,1000,300,false);
		this.windows.push(win);

	}
	
	populateShopWindow() {
		this.windows[1].clearText();
		
		var temp = new WindowMessage("            Hit 'q' to exit",false);
		temp.setType("Option");
		var wares;
		if(this.buying) {
			 wares = ShopBank.getWeaponShopWares(this.shopNumber);
			 for(var i = 0; i < wares.length; i++) {
					temp.addOption(wares[i].getName());
			 }
		}
		else {
			//wares = player.getItems();
			for(var i = 0; i < this.player.getWeaponCount(); i++) {
				temp.addOption(this.player.getWeapon(i).getName());
				if(this.player.getWeapon(i) == this.player.getWieldedWeapon()) {
					temp.setValid(false, i);
				}
			}
		}
		this.windows[1].addText(temp);
		this.setValidPurchases();
	}
	
	populateDescriptionWindow() {
		this.windows[2].clearText();
		var wares;
		if(this.buying) {
			 wares = ShopBank.getWeaponShopWares(this.shopNumber);
			 for(var i = 0; i < wares.length; i++) {
					this.windows[2].addText(new WindowMessage(wares[i].getDescription(),false));
			}
		}
		else {
			wares = this.player.getWeapons();
			for(var i = 0; i < this.player.getWeaponCount(); i++) {
				this.windows[2].addText(new WindowMessage(wares[i].getDescription(),false));
			}	
		}	
	}
	
	populateCostWindow() {
		var wares;
		this.windows[3].clearText();
		if(this.buying) {
			 wares = ShopBank.getWeaponShopWares(this.shopNumber);
			 for(var i = 0; i < wares.length; i++) {
					this.windows[3].addText("Cost: " + (wares[i].getCost()).toString() + "G");
			 }
		}
		else {
			wares = this.player.getWeapons();
			for(var i = 0; i < this.player.getWeaponCount(); i++) {
				this.windows[3].addText("Sell: " + (wares[i].getCost()/2).toString() + "G");
			}
		}
		
	}
	
	process(code) {
		if(!this.frozen) {
			if (code == 32) {
				if(this.windows[0].isAppearing()) {
					this.windows[0].finishAppearing();
				}
				else if(this.windows[0].getPosition() == 0 && this.windows[0].getOption() == 1 && this.windows[0].isOpen()) {
					this.windows[0].setPosition(4);
				}
				else if(this.windows[0].getPosition() == 0 && this.windows[0].getOption() == 0 && this.windows[0].isOpen()) {
					this.windows[0].closeWindow();
					this.windows[1].openWindow();
					this.windows[2].openWindow();
					this.windows[3].openWindow();
					this.windows[4].openWindow();
					this.windows[5].openWindow();
					this.populateShopWindow();
					this.populateDescriptionWindow();
					this.populateCostWindow();
				}
				else if(this.windows[1].isOpen() && !this.solved) {
					this.windows[1].closeWindow();
					this.windows[2].closeWindow();
					this.windows[3].closeWindow();
					this.windows[4].closeWindow();
					this.windows[5].closeWindow();
					this.windows[0].openWindow();
					this.windows[0].setPosition(1);
				}
				else if(this.windows[1].isOpen() && this.solved) {
					if(this.windows[1].getMaxOptions() > 0 && this.windows[1].getOptionValid(0, this.windows[1].getOption())) {
						if(this.buying) {
							var items = ShopBank.getWeaponShopWares(this.shopNumber);
							this.player.addGold(items[this.windows[1].getOption()].getCost()*-1);
							this.player.addWeapon(items[this.windows[1].getOption()]);
						}
						else {
							var items = this.player.getWeapons();
							this.player.addGold(items[this.windows[1].getOption()].getCost()/2);
							this.player.removeWeapon(this.windows[1].getOption());
						}
						this.populateShopWindow();
						this.populateDescriptionWindow();
						this.populateCostWindow();
						this.windows[3].setPosition(this.windows[1].getOption());
						this.windows[3].finishAppearing();
						this.windows[2].addText("Thank you very much!");
						this.windows[2].setPosition(this.windows[2].getMaxText()-1);
						this.setValidPurchases();
						if(this.windows[1].getOption()>=this.windows[1].getMaxOptions() && !this.buying)
							this.windows[1].moveOptionUp();
					}
					else {
						if(this.player.getWeaponCount() >= Player.MAX_WEAPON_INVENTORY) {
							this.windows[2].addText(new WindowMessage("You have too many items.",false));
							this.windows[2].setPosition(this.windows[2].getMaxText()-1);
						}
						else if (this.player.getWeaponCount() == 0 && !this.buying) {
							this.windows[2].addText(new WindowMessage("You have nothing to sell.",false));
							this.windows[2].setPosition(this.windows[2].getMaxText()-1);
						}
						else if (!this.buying) {
							this.windows[2].addText(new WindowMessage("You are holding this.",false));
							this.windows[2].setPosition(this.windows[2].getMaxText()-1);	
						}
						else {
							this.windows[2].addText(new WindowMessage("You don't have enough gold.",false));
							this.windows[2].setPosition(this.windows[2].getMaxText()-1);
						}
					}
				}
				else if(this.windows[0].getPosition() == 1 && this.windows[0].isOpen()) {
						this.windows[0].closeWindow();
						this.questionNum = Math.floor(Math.random() * (ShopBank.getWeaponShopHighQuestion(this.shopNumber)-ShopBank.getWeaponShopLowQuestion(this.shopNumber))+ShopBank.getWeaponShopLowQuestion(this.shopNumber));
						this.question = Questions.getCompleteSquareEquations(this.questionNum);
						var resp = this.question.getResponse();
						var quest = this.question.getQuestions();
						this.windows[6].addEquation(resp[0],this.windows[6].getMiddleX()-resp[0].getLength()/2,this.windows[6].getMiddleY()+this.windows[6].getHeight()/10);
						this.windows[6].openWindow();
						this.windows[7].addEquation(resp[1],this.windows[7].getMiddleX()-resp[1].getLength()/2,this.windows[7].getMiddleY()+this.windows[7].getHeight()/10);
						this.windows[7].openWindow();
						this.windows[8].addEquation(resp[2],this.windows[8].getMiddleX()-resp[2].getLength()/2,this.windows[8].getMiddleY()+this.windows[8].getHeight()/10);
						this.windows[8].openWindow();
						var totalLength = quest[0].getLength() + quest[1].getLength();
						this.windows[9].addEquation(quest[0],this.windows[9].getMiddleX()-totalLength/2,this.windows[9].getMiddleY()+this.windows[9].getHeight()*60/200);
						this.windows[9].addEquation(quest[1],this.windows[9].getMiddleX()-totalLength/2+quest[0].getLength(),this.windows[9].getMiddleY()+this.windows[9].getHeight()*60/200);
						this.windows[9].addText(this.question.getQuestion());
						this.windows[9].openWindow();
				}
				else if(this.windows[0].getPosition() == 1) {}
				else if(this.windows[0].getPosition() == 2 || this.windows[0].getPosition() == 4) {
					var newA = new Animation("BlackOut");
					var place = ShopBank.getWeaponShopReturnInfo(this.shopNumber);
					newA.addMessage(new Message("Move Player",place[0],place[1],place[2]));
					newA.addMessage(new Message("Change Area",place[2]));
					newA.setNext(new Animation("Fade In"));
					this.ani.push(newA);
					this.windows[0].setPosition(0);
					this.solved = false;
				}
				else if (this.windows[0].getPosition() == 3) {
					this.windows[0].closeWindow();
					this.windows[1].openWindow();
					this.windows[2].openWindow();
					this.windows[3].openWindow();
					this.windows[4].openWindow();
					this.windows[5].openWindow();
				}
				else {
					this.windows[0].nextText();
				}
			}
			if (code == 38) {
				if(this.windows[0].getPosition()==0)
					this.windows[0].moveOptionUp();
				if(this.windows[1].isOpen()) {
					this.windows[1].moveOptionUp();
					if(this.player.getWeaponCount()>0 || this.buying)
						this.windows[2].setPosition(this.windows[1].getOption());
					this.windows[3].setPosition(this.windows[1].getOption());
					this.windows[3].finishAppearing();
				}
			}
			if (code == 40) {
				if(this.windows[0].getPosition()==0)
					this.windows[0].moveOptionDown();
				if(this.windows[1].isOpen()) {
					this.windows[1].moveOptionDown();
					if(this.player.getWeaponCount()>0 || this.buying)
						this.windows[2].setPosition(this.windows[1].getOption());
					this.windows[3].setPosition(this.windows[1].getOption());
					this.windows[3].finishAppearing();
				}
			}
			if (code == 39 || code == 37) {
				if(this.windows[1].isOpen()) {
					if(this.buying) {
						this.windows[4].setPosition(1);
						this.windows[5].setPosition(0);
						this.buying = false;
					}
					else {
						this.windows[4].setPosition(0);
						this.windows[5].setPosition(1);
						this.buying = true;
					}
					this.populateShopWindow();
					this.populateDescriptionWindow();
					this.populateCostWindow();
					this.windows[1].setOption(0, 0);
					this.windows[2].setPosition(0);
					this.windows[3].setPosition(0);
					this.windows[3].finishAppearing();
				}
			}
			if(code == 81) {
				if(this.windows[1].isOpen()) {
					this.windows[1].closeWindow();
					this.windows[2].closeWindow();
					this.windows[3].closeWindow();
					this.windows[4].closeWindow();
					this.windows[5].closeWindow();
					this.windows[0].openWindow();
					this.windows[0].setPosition(4);
				}
			}
			
		}
	}
	
	setValidPurchases() {
		if(!this.buying) return;
		var items = ShopBank.getWeaponShopWares(this.shopNumber);
		for(var i = 0; i < items.length;i++) {
			if(this.player.getGold() < items[i].getCost()) {
				this.windows[1].setOptionValid(0, i, false);
			}
			if(this.player.getWeaponCount() == Player.MAX_WEAPON_INVENTORY) {
				this.windows[1].setOptionValid(0, i, false);
			}
		}
	}
	
	/*
	private Weapon[] getItems() {
		Weapon[] theWares = new Weapon[5];
		theWares[0] = Weapon.getWeapon(0);
		theWares[1] = Weapon.getWeapon(1);
		theWares[2] = Weapon.getWeapon(2);
		theWares[3] = Weapon.getWeapon(3);
		theWares[4] = Weapon.getWeapon(4);
		return theWares;
	}*/
		
	
		
	mouseClicked(e) {
		this.process(32);
		if(this.windows[0].getPosition() == 1) {
			for(var i = 0; i < 3; i++) {
				if(this.windows[6+i].clickedOn(e)) {
					for(var j = 0; j < 4; j++) {
						this.windows[6+j].clearEquations();
						this.windows[6+j].clearText();
						this.windows[6+j].closeWindow();
					}
					this.windows[0].openWindow();
					if (this.question.isCorrect(i)) {
						this.windows[0].setPosition(3);
						this.solved = true;
					}
					else {
						this.windows[0].setPosition(2);
					}
				}
			}
		}
	}

}
