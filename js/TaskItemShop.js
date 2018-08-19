class TaskItemShop extends Task{
	
	//Window 0 is the main dialog with bust.
	//Window 1 is the shop option window.
	//Window 2 is the item description window.
	//Window 3 is the cost window.
	//Window 4 is the buying indicator
	//Window 5 is the selling indicator
	
	//Window 6 is matching box 1
	//Window 7 is matching box 2
	//Window 8 is matching box 3
	//Window 9 is matching box 4
	//Window 10 is matching box 5
	//Window 11 is matching box 6

	constructor(p, w) {
		super("Shop.jpg",p, w);
		this.ani.push(new Animation("Fade In"));
		this.buying = true;
		this.shopNumber = 0;
		this.init();
		this.questionNum = 0;
		this.solved = false; this.problemflag = false;
		this.choice = -1;
		this.rightAnswers = 0;
		this.NUMBER_OF_QUESTIONS = 1;
		
	}
	
	changeShopNumber(newNumber) {
		this.shopNumber = newNumber;
		this.init();
	}
	
	init() {
		this.windows = [];
		//Window 0 - Main Window
		var win = new GameWindow(5,440,1000,700);
		//Position 0
		var temp = new WindowMessage("Welcome to the "+ ShopBank.getTownName(this.shopNumber) + " Shop. You here to shop?");
		temp.setType("Option");
		temp.addOption("Yes");
		temp.addOption("No");
		temp.setBust("Shopkeeper.png");
		win.addText(temp);
		
		//Position 1
		temp = new WindowMessage("I only sell to Trig value masters. Can you match the trig expression to it's matching value?");
		temp.setBust("Shopkeeper.png");
		win.addText(temp);
		
		//Position 2
		temp = new WindowMessage("Get out....");
		temp.setBust("Shopkeeper.png");
		win.addText(temp);
		
		//Position 3
		temp = new WindowMessage("Good for you. Feel free to buy what you want.");
		temp.setBust("Shopkeeper.png");
		win.addText(temp);
		
		//Position 4
		temp = new WindowMessage("See you later.");
		temp.setBust("Shopkeeper.png");
		win.addText(temp);
						
		this.windows.push(win);
		
		//Populate the shop window: Window 1
		win = new GameWindow(5,300,1000,700,false);
		this.windows.push(win);
		this.populateShopWindow();
		this.windows[1].resetOptions();
		
		//Populate the item description window: Window 2
		win = new GameWindow(5,5,1000,150,false);
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
		
		//Make the question windows Windows 6-11
		win = new GameWindow(100,5,400,105,false);
		this.windows.push(win);
		win = new GameWindow(450,5,750,105,false);
		this.windows.push(win);
		win = new GameWindow(100,105,400,205,false);
		this.windows.push(win);
		win = new GameWindow(450,105,750,205,false);
		this.windows.push(win);
		win = new GameWindow(100,205,400,305,false);
		this.windows.push(win);
		win = new GameWindow(450,205,750,305,false);
		this.windows.push(win);
	}
	
	populateShopWindow() {
		this.windows[1].clearText();
		
		var temp = new WindowMessage("            Hit 'q' to exit",false);
		temp.setType("Option");
		var wares;
		if(this.buying) {
			 wares = ShopBank.getItemShopWares(this.shopNumber);
			 for(var i = 0; i < wares.length; i++) {
					temp.addOption(wares[i].getName());
			 }
		}
		else {
			//wares = player.getItems();
			for(var i = 0; i < this.player.getItemCount(); i++) {
				temp.addOption(this.player.getItemAndQuantity(i));
			}
		}
		this.windows[1].addText(temp);
		this.setValidPurchases();
	}
	
	populateDescriptionWindow() {
		this.windows[2].clearText();
		var wares;
		if(this.buying) {
			 wares = ShopBank.getItemShopWares(this.shopNumber);
			 for(var i = 0; i < wares.length; i++) {
				 this.windows[2].addText(new WindowMessage(wares[i].getDescription(),false));
			}
		}
		else {
			wares = this.player.getItems();
			for(var i = 0; i < this.player.getItemCount(); i++) {
				this.windows[2].addText(new WindowMessage(wares[i].getDescription(),false));
			}	
		}	
	}
	
	populateCostWindow() {
		var wares;
		this.windows[3].clearText();
		if(this.buying) {
			 wares = ShopBank.getItemShopWares(this.shopNumber);
			 for(var i = 0; i < wares.length; i++) {
					this.windows[3].addText("Cost: " + (wares[i].getCost()).toString() + "G");
				}
		}
		else {
			wares = this.player.getItems();
			for(var i = 0; i < this.player.getItemCount(); i++) {
				this.windows[3].addText("Sell: " + (wares[i].getCost()/2).toString() + "G");
			}
		}
		
	}
	
	process(code) {
		//System.out.println("Code=" + code);
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
							var items = ShopBank.getItemShopWares(this.shopNumber);
							this.player.addGold(items[this.windows[1].getOption()].getCost()*-1);
							this.player.addItem(items[this.windows[1].getOption()]);
						}
						else {
							var items = this.player.getItems();
							this.player.addGold(items[this.windows[1].getOption()].getCost()/2);
							this.player.removeItem(this.windows[1].getOption());
						}
						this.populateShopWindow();
						this.populateDescriptionWindow();
						this.populateCostWindow();
						this.windows[3].setPosition(this.windows[1].getOption());
						this.windows[3].finishAppearing();
						this.windows[2].addText("Thank you very much!");
						this.windows[2].setPosition(this.windows[2].getMaxText()-1);
						this.setValidPurchases();
						if(this.windows[1].getOption()>=this.windows[1].getMaxOptions() && !this.buying) {
							this.windows[1].moveOptionUp();
							
						}
							
					}
					else {
						if(this.player.getItemCount() >= Player.MAX_ITEM_INVENTORY) {
							this.windows[2].addText(new WindowMessage("You have too many items.",false));
							this.windows[2].setPosition(this.windows[2].getMaxText()-1);
						}
						else if (this.player.getItemCount() == 0 && !this.buying) {
							this.windows[2].addText(new WindowMessage("You have nothing to sell.",false));
							this.windows[2].setPosition(this.windows[2].getMaxText()-1);
						}
						else {
							this.windows[2].addText(new WindowMessage("You don't have enough gold.",false));
							this.windows[2].setPosition(this.windows[2].getMaxText()-1);
						}
					}
				}
				else if(this.windows[0].getPosition() == 1) {}
				
				else if(this.windows[0].getPosition() == 2 || this.windows[0].getPosition() == 4) {
					var newA = new Animation("BlackOut");
					var place = ShopBank.getItemShopReturnInfo(this.shopNumber);
					newA.addMessage(new Message("Move Player",place[0],place[1],place[2]));
					newA.addMessage(new Message("Change Area",place[2]));
					newA.setNext(new Animation("Fade In"));
					this.ani.push(newA);
					this.windows[0].setPosition(0);
					this.problemflag = false;
					this.solved = false;
					this.rightAnswers = 0;
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
					if(this.player.getItemCount()>0 || this.buying)
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
					if(this.player.getItemCount()>0 || this.buying)
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
		var items = ShopBank.getItemShopWares(this.shopNumber);
		for(var i = 0; i < items.length;i++) {
			if(this.player.getGold() < items[i].getCost()) {
				this.windows[1].setOptionValid(0, i, false);
			}
			if(this.player.getItemCount() == Player.MAX_ITEM_INVENTORY) {
				this.windows[1].setOptionValid(0, i, false);
			}
		}
	}
	/*
	private Item[] getItems() {
		Item[] theWares = new Item[5];
		theWares[0] = Item.getItem(0);
		theWares[1] = Item.getItem(1);
		theWares[2] = Item.getItem(2);
		theWares[3] = Item.getItem(3);
		theWares[4] = Item.getItem(4);
		return theWares;
	}*/
	
	processTime(){
		super.processTime();
		if(this.windows[0].getPosition()==1 && this.windows[0].isOpen() && !this.windows[0].isAppearing() && !this.problemflag) {
			this.questionNum = Math.floor(Math.random() * (ShopBank.getItemShopHighQuestion(this.shopNumber)-ShopBank.getItemShopLowQuestion(this.shopNumber))+ShopBank.getItemShopLowQuestion(this.shopNumber));
			this.question = Questions.getTrigValueEquations(this.questionNum);
			var resp = this.question.getResponse();
			for(var i = 0; i < 6; i++) {
				this.windows[6+i].clearEquations();
				this.windows[6+i].addEquation(resp[i],this.windows[6+i].getMiddleX() - resp[i].getLength()/2, this.windows[6+i].getMiddleY()+this.windows[6+i].getHeight()/10);
				this.windows[6+i].openWindow();
			}
			this.problemflag = true;
		}
	}
	
	
	
		
	mouseClicked(e) {
		this.process(32);
		if(this.windows[0].getPosition() == 1) {
			for(var i = 0; i < 6; i++) {
				if(this.windows[6+i].clickedOn(e)) {
					if(this.choice == i) {
						this.choice = -1;
						this.windows[6+i].deselectEquation(0);
					}
					else if(this.choice == -1) {
						this.choice = i;
						this.windows[6+i].selectEquation(0);
					}
					else if(this.question.isCorrect(i,this.choice)) {
						this.windows[6+i].closeWindow();
						this.windows[6+this.choice].closeWindow();
						this.choice = -1;
						this.rightAnswers++;
						if(this.rightAnswers == 3) {
							this.windows[0].setPosition(3);
							this.solved = true;
						}
					}
					else {
						this.choice = -1;
						this.windows[6].closeWindow();
						this.windows[7].closeWindow();
						this.windows[8].closeWindow();
						this.windows[9].closeWindow();
						this.windows[10].closeWindow();
						this.windows[11].closeWindow();
						this.windows[0].setPosition(2);
					}
				}
			}
		}
	}
	
}
