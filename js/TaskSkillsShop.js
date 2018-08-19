class TaskSkillsShop extends Task{
	
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
		super("SkillsShop.jpg",p, w);
		this.ani.push(new Animation("Fade In"));
		this.init();
		this.questionNum = 0;
		this.solved = false; this.problemflag = false;
		this.buying = -1;
		this.rightAnswers = 0;
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
		var temp = new WindowMessage("Welcome to the " + ShopBank.getTownName(this.shopNumber) + " Skills Shop. Have you come to learn?");
		temp.setType("Option");
		temp.addOption("Yes");
		temp.addOption("No");
		temp.setBust("Skillsseller.png");
		win.addText(temp);
		
		//Position 1
		temp = new WindowMessage("Knowing piecewise functions is the key to this skill. Do you know them?");
		temp.setType("Option");
		temp.addOption("Yes");
		temp.addOption("No");
		temp.setBust("Skillsseller.png");
		win.addText(temp);
		
		//Position 2
		temp = new WindowMessage("No! Do better next time!");
		temp.setBust("Skillsseller.png");
		win.addText(temp);
		
		//Position 3
		temp = new WindowMessage("Perfect! Your skills training is complete.");
		temp.setBust("Skillsseller.png");
		win.addText(temp);
		
		//Position 4
		temp = new WindowMessage("Good luck out there.");
		temp.setBust("Skillsseller.png");
		win.addText(temp);
						
		this.windows.push(win);
		
		//Window 1
		win = new GameWindow(5,300,1000,700,false);
		//Populate the shop window
		temp = new WindowMessage("            Hit 'q' to exit",false);
		temp.setType("Option");
		var wares = ShopBank.getSkillShopWares(this.shopNumber, this.player);
		for(var i = 0; i < wares.length; i++) {
			temp.addOption(wares[i].getName());
		}
		win.addText(temp);
		this.windows.push(win);
		
		//Window 2
		win = new GameWindow(5,5,1000,150,false);
		//Populate the item description window
		for(var i = 0; i < wares.length; i++) {
			win.addText(wares[i].getDescription());
		}
		this.windows.push(win);
		
		//Window 3
		win = new GameWindow(600,200,1000,300,false);
		//Populate the cost window
		for(var i = 0; i < wares.length; i++) {
			win.addText("Cost: " + (wares[i].getTrainingCost()).toString() + "G");
		}
		this.windows.push(win);
		
		//Window 4
		win = new GameWindow(5,200,400,300,false);
		this.windows.push(win);
		this.setValidPurchases();
		
		//Make the Piecewise question window. It will be populated later, Window 5
		win = new GameWindow(100,100,900,500,false);
		this.windows.push(win);
		
		//Make the Piecewise answer window 1. It will be populated later, Window 6
		win = new GameWindow(50,500,350,600,false);
		this.windows.push(win);
		
		//Make the Piecewise answer window 2. It will be populated later, Window 7
		win = new GameWindow(350,500,650,600,false);
		this.windows.push(win);
				
		//Make the Piecewise answer window 3. It will be populated later, Window 8
		win = new GameWindow(650,500,950,600,false);
		this.windows.push(win);
		
		//Make the question window. They get filled later, Window 9
		win = new GameWindow(100,5,900,105,false);
		this.windows.push(win);
		
		//this.windows[0].nextText();
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
					this.setValidPurchases();
				}
				else if(this.windows[1].isOpen()) {
					if(this.windows[1].getOptionValid(0, this.windows[1].getOption())) {
						this.buying = this.windows[1].getOption();
						this.windows[1].closeWindow();
						this.windows[2].closeWindow();
						this.windows[3].closeWindow();
						this.windows[4].closeWindow();
						this.windows[0].openWindow();
						this.windows[0].setPosition(1);
					}
				}
				else if(this.windows[0].getPosition() == 1 && this.windows[0].getOption() == 1 && this.windows[0].isOpen()) {
					this.windows[0].closeWindow();
					this.windows[1].openWindow();
					this.windows[2].openWindow();
					this.windows[3].openWindow();
					this.windows[4].openWindow();
					this.buying = -1;
				}
				else if(this.windows[0].getPosition() == 1 && this.windows[0].getOption() == 0 && this.windows[0].isOpen()) {
					this.windows[0].closeWindow();
					//Fill the question this.windows
					this.questionNum = Math.floor(Math.random() * (ShopBank.getSkillShopHighQuestion(this.shopNumber)-ShopBank.getSkillShopLowQuestion(this.shopNumber))+ShopBank.getSkillShopLowQuestion(this.shopNumber));
					this.question = Questions.getPieceWiseEquations(this.questionNum);
					var resp = this.question.getResponse();
					var quest = this.question.getQuestions();
					var skills = ShopBank.getSkillShopWares(this.shopNumber, this.player);
					this.player.addGold(skills[this.windows[1].getOption()].getTrainingCost()*-1);
					this.windows[6].addEquation(resp[0],this.windows[6].getMiddleX()-resp[0].getLength()/2,this.windows[6].getMiddleY()+this.windows[6].getHeight()/10);			
					this.windows[7].addEquation(resp[1],this.windows[7].getMiddleX()-resp[1].getLength()/2,this.windows[7].getMiddleY()+this.windows[7].getHeight()/10);
					this.windows[8].addEquation(resp[2],this.windows[8].getMiddleX()-resp[2].getLength()/2,this.windows[8].getMiddleY()+this.windows[8].getHeight()/10);
					
					var totalLength = quest[0].getLength() + quest[1].getLength() + Math.max(quest[2].getLength()+ quest[4].getLength() + Equation.getXSize(64), quest[3].getLength()+ quest[5].getLength()+ Equation.getXSize(64));
					this.windows[5].addEquation(quest[0],this.windows[5].getMiddleX()-totalLength/2,this.windows[5].getMiddleY()+this.windows[5].getHeight()*60/400);
					this.windows[5].addEquation(quest[1],this.windows[5].getMiddleX()-totalLength/2+quest[0].getLength(),this.windows[5].getMiddleY()+this.windows[5].getHeight()/4);
					this.windows[5].addEquation(quest[2],this.windows[5].getMiddleX()-totalLength/2+quest[0].getLength()+quest[1].getLength(),this.windows[5].getMiddleY());
					this.windows[5].addEquation(quest[3],this.windows[5].getMiddleX()-totalLength/2+quest[0].getLength()+quest[1].getLength(),this.windows[5].getMiddleY()+this.windows[5].getHeight()/4);
					this.windows[5].addEquation(quest[4],this.windows[5].getMiddleX()-totalLength/2+quest[0].getLength()+quest[1].getLength()+Math.max(quest[2].getLength(), quest[3].getLength()) + Equation.getXSize(64),this.windows[5].getMiddleY());
					this.windows[5].addEquation(quest[5],this.windows[5].getMiddleX()-totalLength/2+quest[0].getLength()+quest[1].getLength()+Math.max(quest[2].getLength(), quest[3].getLength()) + Equation.getXSize(64),this.windows[5].getMiddleY()+this.windows[5].getHeight()/4);
					
					this.windows[9].addText(new WindowMessage(this.question.getQuestion(),false));
					this.windows[5].openWindow();
					this.windows[6].openWindow();
					this.windows[7].openWindow();
					this.windows[8].openWindow();
					this.windows[9].openWindow();
				}
				else if(this.windows[0].getPosition() == 1) {}
				else if(this.windows[0].getPosition() == 3 && this.windows[0].isOpen()) {
					var skills = ShopBank.getSkillShopWares(this.shopNumber, this.player);
					this.player.addSkillTraining(skills[this.windows[1].getOption()]);
					this.setValidPurchases();
					this.windows[0].closeWindow();
					this.windows[1].openWindow();
					this.windows[2].openWindow();
					this.windows[3].openWindow();
					this.windows[4].openWindow();
					

				}
				else if(this.windows[0].getPosition() == 2 || this.windows[0].getPosition() == 4) {
					var newA = new Animation("BlackOut");
					var place = ShopBank.getSkillShopReturnInfo(this.shopNumber);
					newA.addMessage(new Message("Move Player",place[0],place[1],place[2]));
					newA.addMessage(new Message("Change Area",place[2]));
					newA.setNext(new Animation("Fade In"));
					this.ani.push(newA);
					this.windows[0].setPosition(0);
					this.problemflag = false;
					this.rightAnswers = 0;
				}
				else {
					this.windows[0].nextText();
				}
			}
			if (code == 38) {
				if(this.windows[0].getPosition()==0 || this.windows[0].getPosition()==1)
					this.windows[0].moveOptionUp();
				if(this.windows[1].isOpen()) {
					this.windows[1].moveOptionUp();
					this.setValidPurchases();
					this.windows[2].setPosition(this.windows[1].getOption());
					this.windows[3].setPosition(this.windows[1].getOption());
					this.windows[3].finishAppearing();
					this.windows[4].setPosition(this.windows[1].getOption());
					this.windows[4].finishAppearing();
				}
			}
			if (code == 40) {
				if(this.windows[0].getPosition()==0 || this.windows[0].getPosition()==1)
					this.windows[0].moveOptionDown();
				if(this.windows[1].isOpen()) {
					this.windows[1].moveOptionDown();
					this.setValidPurchases();
					this.windows[2].setPosition(this.windows[1].getOption());
					this.windows[3].setPosition(this.windows[1].getOption());
					this.windows[3].finishAppearing();
					this.windows[4].setPosition(this.windows[1].getOption());
					this.windows[4].finishAppearing();
				}
			}
			if(code == 81) {
				if(this.windows[1].isOpen()) {
					this.windows[1].closeWindow();
					this.windows[2].closeWindow();
					this.windows[3].closeWindow();
					this.windows[4].closeWindow();
					this.windows[0].openWindow();
					this.windows[0].setPosition(4);
				}
			}
			
		}
	}
	/*
	 setValidPurchases() {
		Skill[] skills = getSkills();
		this.windows[1].clearImage();
		for(int i = 0; i < skills.length;i++) {
			if(i < this.windows[1].getMaxOptions()) {
				this.windows[1].addImage(Skill.getTrainingProgress(skills[i+this.windows[1].getTopList()],700,70+ i*Equation.getYSize(GameWindow.DEFAULT_WINDOW_FONT_SIZE)));
			}
			if(this.player.getGold() < skills[i].getTrainingCost()) {
				this.windows[1].setOptionValid(0, i, false);
			}
		}
	}*/
	
	 setValidPurchases() {
		var isValid =  ShopBank.getSkillShopValidity(this.shopNumber, this.player);
		var skills = ShopBank.getSkillShopWares(this.shopNumber, this.player);
		this.windows[4].clearText();
		this.windows[1].clearImage();
		for(var i = 0; i < isValid.length; i++) {
			this.windows[4].addText(new WindowMessage(isValid[i],false));
		}
		
		for(var i = 0; i < skills.length;i++) {
			if(i < this.windows[1].getMaxOptions()) {
				this.windows[1].addImage(Skill.getTrainingProgress(skills[i+this.windows[1].getTopList()],700,75+ i*Equation.getYSize(GameWindow.DEFAULT_WINDOW_FONT_SIZE)));
			}			
			if(!isValid[i] === "Can Train") {
				this.windows[1].setOptionValid(0, i, false);
			}
			else
				this.windows[1].setOptionValid(0, i, true);
		}
		this.windows[4].setPosition(this.windows[1].getOption());
	}
	
	
	
		
	mouseClicked(e) {
		this.process(32);
		if(this.windows[0].getPosition() == 1) {
			for(var i = 0; i < 3; i++) {
				if(this.windows[6+i].clickedOn(e)) {
					for(var j = 0; j < 5; j++) {
						this.windows[5+j].clearEquations();
						this.windows[5+j].clearText();
						this.windows[5+j].closeWindow();
					}
					this.windows[0].openWindow();
					if(this.question.isCorrect(i)) {
						this.windows[0].setPosition(3);
						this.solved = true;
					}
					else
						this.windows[0].setPosition(2);
				}
			}
		}
	}

}
