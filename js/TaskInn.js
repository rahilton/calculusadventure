class TaskInn extends Task{

	constructor(p, w) {
		super("Inn.jpg",p, w);
		this.ani.push(new Animation("Fade In"));
		this.init();
		//addMouseListener(new MListener());
		this.questionNum = 0;
		this.shopNumber = 0;
		this.NUMBER_OF_QUESTIONS = 1;
	}
	
	changeShopNumber(newNumber) {
		//System.out.println("The new shopNumber " + newNumber);
		this.shopNumber = newNumber;
		this.init();
	}
	
	init() {
		this.windows = [];
		var win = new GameWindow(5,500,1000,700);
		//Position 0
		var temp = new WindowMessage("Welcome to the " + ShopBank.getTownName(this.shopNumber) + " Inn.");
		temp.setBust("Innkeeper.png");
		win.addText(temp);
		
		//Position 1
		temp = new WindowMessage("Do you want to stay the night?");
		temp.setType("Option");
		temp.addOption("Yes");
		temp.addOption("No");
		temp.setBust("Innkeeper.png");
		win.addText(temp);
		
		//Position 2
		temp = new WindowMessage("To stay, you must satisfy the Trig Identity Challenge.");
		temp.setBust("Innkeeper.png");
		win.addText(temp);
		
		//Position 3
		temp = new WindowMessage("Click on the choice that will complete the identity.");
		temp.setBust("Innkeeper.png");
		win.addText(temp);
		
		//Position 4
		temp = new WindowMessage("Excellent! Have a good night.");
		temp.setBust("Innkeeper.png");
		win.addText(temp);
		
		//Position 5
		temp = new WindowMessage("We hope you enjoyed your stay. See you next time.");
		temp.setBust("Innkeeper.png");
		win.addText(temp);
		
		//Position 6
		temp = new WindowMessage("See you next time.");
		temp.setBust("Innkeeper.png");
		win.addText(temp);
		
		//Position 7
		temp = new WindowMessage("Sorry, that is not correct. See you next time.");
		temp.setBust("Innkeeper.png");
		win.addText(temp);
		
		//Position 8
		temp = new WindowMessage("That was close. Try to train up a bit or get better equipment.");
		temp.setBust("Innkeeper.png");
		win.addText(temp);
				
		
		this.windows.push(win);
		
		//Window 1 - First Response Window
		var w1 = new GameWindow(5,400,333,500,false);
		//Window 2 - First Response Window
		var w2 = new GameWindow(333,400,666,500,false);
		//Window 3 - First Response Window
		var w3 = new GameWindow(666,400,1000,500,false);
		//Window 4 - The Question Window
		var w4 = new GameWindow(5,100,1000,300,false);
		this.windows.push(w1); this.windows.push(w2); this.windows.push(w3); this.windows.push(w4);
		}
	
	process(code) {
		if(!this.frozen) {
			if (code == 32) {
				if(this.windows[0].isAppearing()) {
					this.windows[0].finishAppearing();
				}
				else if(this.windows[0].getPosition() == 1 && this.windows[0].getOption() == 1) {
					this.windows[0].setPosition(6);
				}
				else if(this.windows[0].getPosition() == 2) {
					this.questionNum = Math.floor(Math.random() * (ShopBank.getInnHighQuestion(this.shopNumber)-ShopBank.getInnLowQuestion(this.shopNumber))+ShopBank.getInnLowQuestion(this.shopNumber));
					this.question = Questions.getTrigIdentityEquations(this.questionNum);
					var resp = this.question.getResponse();
					var quest = this.question.getQuestions();
				
					this.windows[1].addEquation(resp[0],this.windows[1].getMiddleX() - Math.floor(resp[0].getLength()/2), this.windows[1].getMiddleY()+Math.floor(this.windows[1].getHeight()/10));
					this.windows[1].openWindow();
					this.windows[2].addEquation(resp[1],this.windows[2].getMiddleX() - Math.floor(resp[1].getLength()/2), this.windows[2].getMiddleY()+Math.floor(this.windows[2].getHeight()/10));
					this.windows[2].openWindow();
					this.windows[3].addEquation(resp[2],this.windows[3].getMiddleX() - Math.floor(resp[2].getLength()/2), this.windows[3].getMiddleY()+Math.floor(this.windows[3].getHeight()/10));
					this.windows[3].openWindow();
					var totalLength = quest[0].getLength() + quest[1].getLength() + quest[2].getLength();
					this.windows[4].addEquation(quest[0],this.windows[4].getMiddleX()-Math.floor(totalLength/2),this.windows[4].getMiddleY()+Math.floor(this.windows[4].getHeight()/10));
					this.windows[4].addEquation(quest[1],this.windows[4].getMiddleX()-Math.floor(totalLength/2)+quest[0].getLength(),this.windows[4].getMiddleY()+Math.floor(this.windows[4].getHeight()/10));
					this.windows[4].addEquation(quest[2],this.windows[4].getMiddleX()-Math.floor(totalLength/2)+quest[0].getLength() + quest[1].getLength(),this.windows[4].getMiddleY()+Math.floor(this.windows[4].getHeight()/10));
					this.windows[4].openWindow();
					this.windows[0].nextText();
					
				}
				else if(this.windows[0].getPosition() == 3) {}
				else if(this.windows[0].getPosition() == 4) {
					var newA = new Animation("BlackOut");
					newA.addMessage(new Message("HP Change", this.player.getHpMax()));
					newA.addMessage(new Message("SP Change", this.player.getSpMax()));
					newA.addMessage(new Message("MP Change", this.player.getMpMax()));
					newA.addMessage(new Message("Save Player"));
					newA.setNext(new Animation("Fade In"));
					this.ani.push(newA);
					this.windows[0].nextText();
				}
				else if(this.windows[0].getPosition() == 5 || this.windows[0].getPosition() == 6 || this.windows[0].getPosition() == 7 || this.windows[0].getPosition() == 8) {
					var newA = new Animation("BlackOut");
					var place = ShopBank.getInnReturnInfo(this.shopNumber);
					newA.addMessage(new Message("Move Player",place[0],place[1],place[2]));
					newA.addMessage(new Message("Change Area",place[2]));
					newA.setNext(new Animation("Fade In"));
					this.ani.push(newA);
					this.windows[0].setPosition(0);
				}
				else {
					this.windows[0].nextText();
				}
			}
			if (code == 38) {
				this.windows[0].moveOptionUp();
			}
			if (code == 40) {
				this.windows[0].moveOptionDown();
			}
		}
	}
	
	revive() {
		this.windows[0].setPosition(8);
		this.windows[0].openWindow();
		this.player.changeHp(1);
		this.player.makeNewImage();
	}
	
	
	
	
	
		
	mouseClicked(e) {
		this.process(32);
		if(this.windows[0].getPosition() == 3) {
			for(var i = 0; i<3; i++) {
				if(this.windows[1+i].clickedOn(e)) {
					for(var j = 0; j<4;j++) {
						this.windows[1+j].clearText();
						this.windows[1+j].clearEquations();
						this.windows[1+j].closeWindow();
					}
					if(this.question.isCorrect(i)) 
						this.windows[0].nextText();
					else 
						this.windows[0].setPosition(7);
				}
			}
		}
	}
	
}
