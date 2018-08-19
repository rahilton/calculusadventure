class TaskTradingPost extends Task{
	
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
		super("TradingPost.jpg",p, w);
		this.ani.push(new Animation("Fade In"));
		this.buying = true;
		this.shopNumber = 0;
		this.questionNum = 0;
		this.solved = false; 
		this.init();
	}
	
	changeShopNumber(newNumber) {
		this.shopNumber = newNumber;
		this.init();
	}
	
	init() {
		this.windows = [];
		var win = new GameWindow(5,440,1000,700);
		//Position 0
		var temp = new WindowMessage("Welcome to the " + ShopBank.getTownName(this.shopNumber) + " Trading Post. You here to trade?");
		temp.setType("Option");
		temp.addOption("Yes");
		temp.addOption("No");
		temp.setBust("Trader.png");
		win.addText(temp);
		
		//Position 1
		temp = new WindowMessage("Volume and Area Formulas must be known to trade.");
		temp.setBust("Trader.png");
		win.addText(temp);
		
		//Position 2
		temp = new WindowMessage("I don't think we should trade...");
		temp.setBust("Trader.png");
		win.addText(temp);
		
		//Position 3
		temp = new WindowMessage("Yes. Maybe we should do business.");
		temp.setBust("Trader.png");
		win.addText(temp);
		
		//Position 4
		temp = new WindowMessage("May you be profitable.");
		temp.setBust("Trader.png");
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
		
		this.buying = true;
		
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
			 wares = ShopBank.getTradingPostWares(this.shopNumber);
			 for(var i = 0; i < wares.length; i++) {
					temp.addOption(wares[i].getName());
			 }
		}
		else {
			//wares = player.getItems();
			for(var i = 0; i < this.player.getTradeItemCount(); i++) {
				temp.addOption(this.player.getTradeItem(i).getName());
			}
		}
		this.windows[1].addText(temp);
		this.setValidPurchases();
	}
	
	populateDescriptionWindow() {
		this.windows[2].clearText();
		var wares;
		if(this.buying) {
			 wares = ShopBank.getTradingPostWares(this.shopNumber);
			 for(var i = 0; i < wares.length; i++) {
				 this.windows[2].addText(new WindowMessage(wares[i].getDescription(),false));
			}
		}
		else {
			wares = this.player.getTradeItems();
			for(var i = 0; i < this.player.getTradeItemCount(); i++) {
				this.windows[2].addText(new WindowMessage(wares[i].getDescription(),false));
			}	
		}	
	}
	
	populateCostWindow() {
		var wares;
		var mul = this.getMultipliers();
		this.windows[3].clearText();
		if(this.buying) {
			 wares = ShopBank.getTradingPostWares(this.shopNumber);
			 for(var i = 0; i < wares.length; i++) {
					this.windows[3].addText("Cost: " + ( Math.floor (wares[i].getCost()*mul[i])).toString() + "G");
			 }
		}
		else {
			wares = this.player.getTradeItems();
			for(var i = 0; i < this.player.getTradeItemCount(); i++) {
				this.windows[3].addText("Sell: " + ( Math.floor (wares[i].getCost()*mul[i])).toString() + "G");
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
							var items = ShopBank.getTradingPostWares(this.shopNumber);
							var multiplier = this.getMultipliers();
							this.player.addGold( Math.floor (multiplier[this.windows[1].getOption()] * items[this.windows[1].getOption()].getCost())*-1);
							this.player.addTradeItem(items[this.windows[1].getOption()]);
						}
						else {
							var items = this.player.getTradeItems();
							var multiplier = this.getMultipliers();
							this.player.addGold( Math.floor (multiplier[this.windows[1].getOption()] * items[this.windows[1].getOption()].getCost()));
							this.player.removeTradeItem(this.windows[1].getOption());
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
						if(this.player.getTradeItemCount() >= Player.MAX_TRADE_ITEM_INVENTORY) {
							this.windows[2].addText(new WindowMessage("You have too many items.",false));
							this.windows[2].setPosition(this.windows[2].getMaxText()-1);
						}
						else if (this.player.getTradeItemCount() == 0 && !this.buying) {
							this.windows[2].addText(new WindowMessage("You have nothing to sell.",false));
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
						this.questionNum = Math.floor (Math.random() * (ShopBank.getTradingPostHighQuestion(this.shopNumber)-ShopBank.getTradingPostLowQuestion(this.shopNumber))+ShopBank.getTradingPostLowQuestion(this.shopNumber));
						this.question = Questions.getVolumeAreaEquations(this.questionNum);
						var resp = this.question.getResponse();
						var quest = this.question.getQuestions();
						
						var totalLength = resp[0].getLength() + resp[3].getLength();
						this.windows[6].addEquation(resp[3],this.windows[6].getMiddleX()-totalLength/2,this.windows[6].getMiddleY()+this.windows[6].getHeight()/10);
						this.windows[6].addEquation(resp[0],this.windows[6].getMiddleX()-totalLength/2 + resp[3].getLength(),this.windows[6].getMiddleY()+this.windows[6].getHeight()/10);
						this.windows[6].openWindow();
						totalLength = resp[1].getLength() + resp[4].getLength();
						this.windows[7].addEquation(resp[4],this.windows[7].getMiddleX()-totalLength/2,this.windows[7].getMiddleY()+this.windows[7].getHeight()/10);
						this.windows[7].addEquation(resp[1],this.windows[7].getMiddleX()-totalLength/2 + resp[4].getLength(),this.windows[7].getMiddleY()+this.windows[7].getHeight()/10);
						this.windows[7].openWindow();
						totalLength = resp[2].getLength() + resp[5].getLength();
						this.windows[8].addEquation(resp[5],this.windows[8].getMiddleX()-totalLength/2,this.windows[8].getMiddleY()+this.windows[8].getHeight()/10);
						this.windows[8].addEquation(resp[2],this.windows[8].getMiddleX()-totalLength/2 + resp[5].getLength(),this.windows[8].getMiddleY()+this.windows[6].getHeight()/10);
						this.windows[8].openWindow();
						this.windows[9].addText(new WindowMessage(this.question.getQuestion(),false));
						this.windows[9].openWindow();
				}
				else if(this.windows[0].getPosition() == 1) {}
				else if(this.windows[0].getPosition() == 2 || this.windows[0].getPosition() == 4) {
					var newA = new Animation("BlackOut");
					var place = ShopBank.getTradingPostReturnInfo(this.shopNumber);
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
					if(this.player.getTradeItemCount()>0 || this.buying)
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
					if(this.player.getTradeItemCount()>0 || this.buying)
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
		var items = ShopBank.getTradingPostWares(this.shopNumber);
		var mults = this.getMultipliers();
		for(var i = 0; i < items.length;i++) {
			if(this.player.getGold() < Math.floor (items[i].getCost() * mults[i])) {
				this.windows[1].setOptionValid(0, i, false);
			}
			if(this.player.getTradeItemCount() == Player.MAX_TRADE_ITEM_INVENTORY) {
				this.windows[1].setOptionValid(0, i, false);
			}
		}
	}
	
	getMultipliers() {
		var mults;
		var allValues = ShopBank.getMultipliers(this.shopNumber);
		//System.out.println("The shopnumber " + this.shopNumber);
		if(this.buying) {
			var items = ShopBank.getTradingPostWares(this.shopNumber);
			mults = [];
			for(var i = 0; i < items.length; i++) {
				for(var j = 0; j < TradeItem.MAX_TRADE_ITEMS; j++) {
					if(items[i].getName() === TradeItem.getItem(j).getName()) {
						mults[i] = allValues[j];
					}
				}
			}
		}
		else {
			var items = this.player.getTradeItems();
			mults = [];
			for(var i = 0; i < this.player.getTradeItemCount(); i++) {
				for(var j = 0; j < TradeItem.MAX_TRADE_ITEMS; j++) {
					if(items[i].getName() === TradeItem.getItem(j).getName()) {
						mults[i] = allValues[j];
					}
				}
			}
		}
		return mults;
	}
	/*
	private TradeItem[] getItems() {
		TradeItem[] theWares = new TradeItem[5];
		theWares[0] = TradeItem.getItem(0);
		theWares[1] = TradeItem.getItem(1);
		theWares[2] = TradeItem.getItem(2);
		theWares[3] = TradeItem.getItem(3);
		theWares[4] = TradeItem.getItem(4);
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
