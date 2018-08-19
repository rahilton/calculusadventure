class TaskTraining extends Task{
	
	//Window 0 is the main dialog with bust.
	//Window 1 is the training selection window
	//Window 2 is the training cost window
	//Window 3 is the training validity window
	//Window 4 is problem display window for SOHCAHTOA/Quadratic Formula
	//Window 5 is one of 3 choices for SOHCATOA/Exponents
	//Window 6 is two of 3 choices for SOHCATOA/Exponents
	//Window 7 is three of 3 choices for SOHCATOA/Exponents
	//Window 8 is Composite/Inverse/Complex Factoring Trig Choice 1
	//Window 9 is Composite/Inverse/Complex Factoring Trig Choice 2
	//Window 10 is Composite/Inverse/Complex Factoring Trig Choice 3
	//Window 11 is Composite/Inverse/Complex Factoring Trig Choice 4
	//Window 12 is Composite/Inverse/Complex Factoring Trig Choice 5
	//Window 13 is Composite/Inverse/Complex Factoring Trig Choice 6
	//Window 14 is the Composite/Inverse Trig question instruction window. ∘
	//Window 15 is the Composite/Inverse Trig question window.
	//Window 16 is the NumberTyper for Quadratic
	//Window 17 is results window

	constructor(p, w) {
		super("Training.jpg",p, w);
		this.ani.push(new Animation("Fade In"));
		this.init();
		this.questionNum = 0;
		this.solved = false; this.problemflag = false;
		this.choice = -1;
		this.rightAnswers = 0;
		this.stat = "";
		this.statIncrease = 0;
		this.quad = [];
		this.quad[0] = -1;
		this.quad[1] = -1;
		this.shopNumber = 0;
	}
	
	changeShopNumber(newNumber) {
		this.shopNumber = newNumber;
		this.init();
	}
	
	init() {
		this.windows = [];
		//Game Window 0 - the Main Window
		var win = new GameWindow(5,480,1000,700);
		//Position 0
		var temp = new WindowMessage("You here to train?");
		temp.setType("Option");
		temp.addOption("Yes");
		temp.addOption("No");
		temp.setBust("Trainer.png");
		win.addText(temp);
		
		//Position 1 - This will be open the same time
		temp = new WindowMessage("What do you want to train?");
		temp.setBust("Trainer.png");
		win.addText(temp);
		
		//Position 2
		temp = new WindowMessage("Later....");
		temp.setBust("Trainer.png");
		win.addText(temp);
		
		//Position 3
		temp = new WindowMessage("To raise your level, you must answer questions that use the quadratic formula.");
		temp.setBust("Trainer.png");
		win.addText(temp);
		
		//Position 4
		temp = new WindowMessage("You don't get the level if you miss any, and you don't get your money back.");
		temp.setBust("Trainer.png");
		win.addText(temp);
		
		//Position 5
		temp = new WindowMessage("Are you ready?");
		temp.setType("Option");
		temp.addOption("Yes");
		temp.addOption("No");
		temp.setBust("Trainer.png");
		win.addText(temp);
		
		//Position 6
		temp = new WindowMessage("To raise your HP, you must answer questions about right angle relationships.");
		temp.setBust("Trainer.png");
		win.addText(temp);
		
		//Position 7
		temp = new WindowMessage("You don't get the HP if you miss any, and you don't get your money back.");
		temp.setBust("Trainer.png");
		win.addText(temp);
		
		//Position 8
		temp = new WindowMessage("Are you ready?");
		temp.setType("Option");
		temp.addOption("Yes");
		temp.addOption("No");
		temp.setBust("Trainer.png");
		win.addText(temp);
						
		//Position 9
		temp = new WindowMessage("To raise your SP, you must answer questions of composite functions.");
		temp.setBust("Trainer.png");
		win.addText(temp);
		
		//Position 10
		temp = new WindowMessage("You don't get the SP if you miss any, and you don't get your money back.");
		temp.setBust("Trainer.png");
		win.addText(temp);
		
		//Position 11
		temp = new WindowMessage("Are you ready?");
		temp.setType("Option");
		temp.addOption("Yes");
		temp.addOption("No");
		temp.setBust("Trainer.png");
		win.addText(temp);
		
		//Position 12
		temp = new WindowMessage("To raise your MP, you must answer questions that use inverse trig functions.");
		temp.setBust("Trainer.png");
		win.addText(temp);
		
		//Position 13
		temp = new WindowMessage("You don't get the MP if you miss any, and you don't get your money back.");
		temp.setBust("Trainer.png");
		win.addText(temp);
		
		//Position 14
		temp = new WindowMessage("Are you ready?");
		temp.setType("Option");
		temp.addOption("Yes");
		temp.addOption("No");
		temp.setBust("Trainer.png");
		win.addText(temp);
		
		//Position 15
		temp = new WindowMessage("To raise your strength, you must answer questions about factoring.");
		temp.setBust("Trainer.png");
		win.addText(temp);
		
		//Position 16
		temp = new WindowMessage("You don't get the strength if you miss any, and you don't get your money back.");
		temp.setBust("Trainer.png");
		win.addText(temp);
		
		//Position 17
		temp = new WindowMessage("Are you ready?");
		temp.setType("Option");
		temp.addOption("Yes");
		temp.addOption("No");
		temp.setBust("Trainer.png");
		win.addText(temp);
		
		//Position 18
		temp = new WindowMessage("To raise your defense, you must answer questions that use the rules of exponents.");
		temp.setBust("Trainer.png");
		win.addText(temp);
		
		//Position 19
		temp = new WindowMessage("You don't get the defense if you miss any, and you don't get your money back.");
		temp.setBust("Trainer.png");
		win.addText(temp);
		
		//Position 20
		temp = new WindowMessage("Are you ready?");
		temp.setType("Option");
		temp.addOption("Yes");
		temp.addOption("No");
		temp.setBust("Trainer.png");
		win.addText(temp);
		
		//Position 21
		temp = new WindowMessage("Sorry, that is wrong.");
		temp.setBust("Trainer.png");
		win.addText(temp);
		
		//Position 22
		temp = new WindowMessage("Good job.");
		temp.setBust("Trainer.png");
		win.addText(temp);
		
		this.windows.push(win);
				
		win = new GameWindow(400,100,1000,500,false);
		//Populate the shop window, Window 1
		temp = new WindowMessage("    Hit 'q' to exit",false);
		temp.setType("Option");
		var trainingOptions = this.getTrainingOptions();
		for(var i = 0; i < trainingOptions.length; i++) {
			temp.addOption(trainingOptions[i]);
		}
		win.addText(temp);
		this.windows.push(win);
		
		//Populate the cost window, Window 2
		win = new GameWindow(650,0,1000,100,false);
		var trainingCosts = this.getTrainingCosts();
		for(var i = 0; i < trainingCosts.length; i++) {
			win.addText("Cost: " + (trainingCosts[i]).toString() + "G");
		}
		this.windows.push(win);
		
		//Populate the valid window, Window 3
		win = new GameWindow(200,0,600,100,false);
		this.windows.push(win);
		this.setValidPurchases();
		
		//Make the SOHCAHTOA question window. It will be populated later, Window 4
		win = new GameWindow(100,100,900,500,false);
		this.windows.push(win);
		
		//Make the SOHCAHTOA/Exponents answer window 1. It will be populated later, Window 5
		win = new GameWindow(50,500,350,600,false);
		this.windows.push(win);
		
		//Make the SOHCAHTOA/Exponents answer window 2. It will be populated later, Window 6
		win = new GameWindow(350,500,650,600,false);
		this.windows.push(win);
				
		//Make the SOHCAHTOA/Exponents answer window 3. It will be populated later, Window 7
		win = new GameWindow(650,500,950,600,false);
		this.windows.push(win);
		
		//Make the question response windows. They get filled later, Window 8-13
		win = new GameWindow(100,105,400,205,false);
		this.windows.push(win);
		win = new GameWindow(550,105,850,205,false);
		this.windows.push(win);
		win = new GameWindow(100,205,400,305,false);
		this.windows.push(win);
		win = new GameWindow(550,205,850,305,false);
		this.windows.push(win);
		win = new GameWindow(100,305,400,405,false);
		this.windows.push(win);
		win = new GameWindow(550,305,850,405,false);
		this.windows.push(win);
		
		//Make the question window. They get filled later, Window 14
		win = new GameWindow(100,5,850,105,false);
		this.windows.push(win);
		
		//Make the question window instructions. They get filled later, Window 15
		win = new GameWindow(5,480,1000,680,false);
		this.windows.push(win);
		
		//NumberTyper for Quadratic equations, Window 16
		win = new NumberTyper(600,150, false);
		this.windows.push(win);
		
		//The results window, Window 17
		win = new GameWindow(200,200,800,600,false);
		this.windows.push(win);
		
		//The question window for Quadratic, window 18
		win = new GameWindow(100,100,500,500,false);
		this.windows.push(win);
		
		//The question instructions window for Quadratic, window 19
		win = new GameWindow(100,600,800,700,false);
		this.windows.push(win);
	}
	
	process(code) {
		//System.out.println("Code=" + code);
		if(!this.frozen) {
			if (code == 32) {
				if(this.windows[0].isAppearing()) {
					this.windows[0].finishAppearing();
				}
				else if(this.windows[0].getPosition() == 0 && this.windows[0].getOption() == 1 && this.windows[0].isOpen()) {
					this.windows[0].setPosition(2);
				}
				else if(this.windows[0].getPosition() == 0 && this.windows[0].getOption() == 0 && this.windows[0].isOpen()) {
					this.windows[0].setPosition(1);
					this.windows[1].openWindow();
					this.windows[2].openWindow();
					this.windows[3].openWindow();
					this.setValidPurchases();
				}
				else if(this.windows[1].isOpen()) {
					if(this.windows[1].getOptionValid(0, this.windows[1].getOption())) {
						this.windows[1].closeWindow();
						this.windows[2].closeWindow();
						this.windows[3].closeWindow();
						this.windows[0].setPosition((this.windows[1].getOption() * 3) + 3);
					}
				}
				else if(this.windows[0].getPosition() == 1) {}
				
				else if(this.windows[0].getPosition() == 2) {
					var newA = new Animation("BlackOut");
					var place = ShopBank.getTrainingReturnInfo(this.shopNumber);
					newA.addMessage(new Message("Move Player",place[0],place[1],place[2]));
					newA.addMessage(new Message("Change Area",place[2]));
					newA.setNext(new Animation("Fade In"));
					this.ani.push(newA);
					this.windows[0].setPosition(0);
					this.rightAnswers = 0;
				}
				else if((this.windows[0].getPosition() == 5 || this.windows[0].getPosition() == 8 || this.windows[0].getPosition() == 11 ||
						 this.windows[0].getPosition() == 14||this.windows[0].getPosition() == 17 || this.windows[0].getPosition() == 20) && this.windows[0].getOption() == 1 && this.windows[0].isOpen()) {
					this.windows[0].setOption(this.windows[0].getPosition(),0);
					this.windows[0].setPosition(1);
					this.windows[1].openWindow();
					this.windows[2].openWindow();
					this.windows[3].openWindow();
				}
				else if (this.windows[0].getPosition() == 5 && this.windows[0].getOption() == 0 && this.windows[0].isOpen()) {
					this.windows[0].closeWindow();
					this.questionNum = Math.floor(Math.random() * (ShopBank.getTrainingLevelHighQuestion(this.shopNumber)-ShopBank.getTrainingLevelLowQuestion(this.shopNumber))+ShopBank.getTrainingLevelLowQuestion(this.shopNumber));
					this.player.addGold(this.getTrainingCosts()[this.windows[1].getOption()]*-1);
					this.question = Questions.getQuadraticEquation(this.questionNum);
					var quest = this.question.getQuestions();
					var questText = this.question.getQuestionMul();
					
					var totalLength = quest[0].getLength()+quest[1].getLength();
					this.windows[14].addEquation(quest[0],this.windows[14].getMiddleX()-totalLength/2,this.windows[14].getMiddleY() + this.windows[14].getHeight()/10);
					this.windows[14].addEquation(quest[1], this.windows[14].getMiddleX()-totalLength/2 + quest[0].getLength(),this.windows[14].getMiddleY() + this.windows[14].getHeight()/10);
					this.windows[14].openWindow();
					this.windows[16].openWindow();
					
					this.windows[18].clearEquations();
					this.windows[18].addText(questText[0]);
					this.windows[18].addText(questText[1]);
					this.windows[18].addText(questText[2]);
					this.windows[18].setPosition(0);
					this.windows[18].addEquation(quest[2],this.windows[18].getX1()+this.windows[18].getWidth()*150/400,this.windows[18].getY1()+this.windows[18].getHeight()*3/4);
					this.windows[18].openWindow();
					
					this.windows[19].addText(questText[3]);
					this.windows[19].setPosition(0);
					this.windows[19].changeFontSize(30);
					this.windows[19].openWindow();
					
					this.windows[5].addText(new WindowMessage("A=",false));
					this.windows[5].openWindow();
					this.windows[6].addText(new WindowMessage("B=",false));
					this.windows[6].openWindow();
					this.windows[7].addText(new WindowMessage("C=",false));
					this.windows[7].openWindow();
					
				}
				else if (this.windows[0].getPosition() == 5) {}
				else if (this.windows[0].getPosition() == 8 && this.windows[0].getOption() == 0 && this.windows[0].isOpen()) {
					this.windows[0].closeWindow();
					this.questionNum = Math.floor(Math.random() * (ShopBank.getTrainingHPHighQuestion(this.shopNumber)-ShopBank.getTrainingHPLowQuestion(this.shopNumber))+ShopBank.getTrainingHPLowQuestion(this.shopNumber));
					this.player.addGold(this.getTrainingCosts()[this.windows[1].getOption()]*-1);
					this.question = Questions.getSOHCAHTOAEquations(this.questionNum);
					var quest = this.question.getQuestions();
					var resp = this.question.getResponse();
										
					this.windows[4].addImage(Questions.getSOHCAHTOATriangle(this.windows[4]));
					this.windows[4].addText(new WindowMessage(this.question.getQuestion(),false));
					this.windows[4].addEquation(quest[0],this.windows[4].getX1() + this.windows[4].getWidth()*710/800, this.windows[4].getMiddleY() + this.windows[4].getHeight()*20/400);
					this.windows[4].addEquation(quest[1],this.windows[4].getMiddleX(), this.windows[4].getMiddleY() + this.windows[4].getHeight()*125/400);
					this.windows[4].addEquation(quest[2],this.windows[4].getMiddleX()-this.windows[4].getWidth()*40/800, this.windows[4].getMiddleY() - this.windows[4].getHeight()*20/400);
					this.windows[4].addEquation(quest[3],this.windows[4].getX1() + this.windows[4].getWidth()/4, this.windows[4].getMiddleY() + this.windows[4].getHeight()*90/400);
					this.windows[4].openWindow();
					
					this.windows[5].addEquation(resp[0],this.windows[5].getMiddleX()-quest[3].getLength()/2,this.windows[5].getMiddleY()+this.windows[5].getHeight()/10);
					this.windows[5].openWindow();
					
					this.windows[6].addEquation(resp[1],this.windows[6].getMiddleX()-resp[0].getLength()/2,this.windows[6].getMiddleY()+this.windows[6].getHeight()/10);
					this.windows[6].openWindow();
					
					this.windows[7].addEquation(resp[2],this.windows[7].getMiddleX()-resp[2].getLength()/2,this.windows[7].getMiddleY()+this.windows[7].getHeight()/10);
					this.windows[7].openWindow();
				}
				else if (this.windows[0].getPosition() == 8) {}
				else if (this.windows[0].getPosition() == 11 && this.windows[0].getOption() == 0 && this.windows[0].isOpen()) {
					this.windows[0].closeWindow();
					this.questionNum = Math.floor(Math.random() * (ShopBank.getTrainingSPHighQuestion(this.shopNumber)-ShopBank.getTrainingSPLowQuestion(this.shopNumber))+ShopBank.getTrainingSPLowQuestion(this.shopNumber));
					this.player.addGold(this.getTrainingCosts()[this.windows[1].getOption()]*-1);
					this.question = Questions.getCompositeEquations(this.questionNum);
					var quest = this.question.getQuestions();
					var resp = this.question.getResponse();
					var questText = this.question.getQuestionMul();
										
					this.windows[8].addEquation(resp[0],this.windows[8].getMiddleX()-resp[0].getLength()/2, this.windows[8].getMiddleY() + this.windows[8].getHeight()/10);
					this.windows[8].openWindow();
					
					this.windows[9].addEquation(resp[1],this.windows[9].getMiddleX()-resp[1].getLength()/2, this.windows[9].getMiddleY() + this.windows[9].getHeight()/10);
					this.windows[9].openWindow();
					
					this.windows[10].addEquation(resp[2],this.windows[10].getMiddleX()-resp[2].getLength()/2, this.windows[10].getMiddleY() + this.windows[10].getHeight()/10);
					this.windows[10].openWindow();
					
					this.windows[11].addEquation(resp[3],this.windows[11].getMiddleX()-resp[3].getLength()/2, this.windows[11].getMiddleY() + this.windows[11].getHeight()/10);
					this.windows[11].openWindow();
					
					this.windows[12].addEquation(resp[4],this.windows[12].getMiddleX()-resp[4].getLength()/2, this.windows[12].getMiddleY() + this.windows[12].getHeight()/10);
					this.windows[12].openWindow();
					
					this.windows[13].addEquation(resp[5],this.windows[13].getMiddleX()-resp[5].getLength()/2, this.windows[13].getMiddleY() + this.windows[13].getHeight()/10);
					this.windows[13].openWindow();
					
					var totalLength = quest[0].getLength() + quest[1].getLength();
					this.windows[14].addEquation(quest[0],this.windows[14].getMiddleX()-totalLength/2,this.windows[14].getMiddleY() + this.windows[14].getHeight()/10);
					this.windows[14].addEquation(quest[1],this.windows[14].getMiddleX()-totalLength/2 + quest[0].getLength(),this.windows[14].getMiddleY() + this.windows[14].getHeight()/10);
					this.windows[14].openWindow();
					
					this.windows[15].addText(questText[0]);
					this.windows[15].addText(questText[1]);
					this.windows[15].setPosition(0);
					this.windows[15].openWindow();
					
					
				}
				else if (this.windows[0].getPosition() == 11) {}
				else if (this.windows[0].getPosition() == 14 && this.windows[0].getOption() == 0 && this.windows[0].isOpen()) {
					this.windows[0].closeWindow();
					this.questionNum = Math.floor(Math.random() * (ShopBank.getTrainingMPHighQuestion(this.shopNumber)-ShopBank.getTrainingMPLowQuestion(this.shopNumber))+ShopBank.getTrainingMPLowQuestion(this.shopNumber));
					this.player.addGold(this.getTrainingCosts()[this.windows[1].getOption()]*-1);
					this.question = Questions.getInverseEquations(this.questionNum);
					var quest = this.question.getQuestions();
					var resp = this.question.getResponse();
															
					this.windows[8].addEquation(resp[0], this.windows[8].getMiddleX()-resp[0].getLength()/2, this.windows[8].getMiddleY() + this.windows[8].getHeight()/10);
					this.windows[8].openWindow();
					
					this.windows[9].addEquation(resp[1], this.windows[9].getMiddleX()-resp[1].getLength()/2, this.windows[9].getMiddleY() + this.windows[9].getHeight()/10);
					this.windows[9].openWindow();
					
					this.windows[10].addEquation(resp[2], this.windows[10].getMiddleX()-resp[2].getLength()/2, this.windows[10].getMiddleY() + this.windows[10].getHeight()/10);
					this.windows[10].openWindow();
					
					this.windows[11].addEquation(resp[3], this.windows[11].getMiddleX()-resp[3].getLength()/2, this.windows[11].getMiddleY() + this.windows[11].getHeight()/10);
					this.windows[11].openWindow();
					
					this.windows[12].addEquation(resp[4], this.windows[12].getMiddleX()-resp[4].getLength()/2, this.windows[12].getMiddleY() + this.windows[12].getHeight()/10);
					this.windows[12].openWindow();
					
					this.windows[13].addEquation(resp[5], this.windows[13].getMiddleX()-resp[5].getLength()/2, this.windows[13].getMiddleY() + this.windows[13].getHeight()/10);
					this.windows[13].openWindow();
					
					var totalLength = quest[0].getLength() + quest[1].getLength() + quest[2].getLength();
					this.windows[14].addEquation(quest[0],this.windows[14].getMiddleX()-totalLength/2,this.windows[14].getMiddleY() + this.windows[14].getHeight()/10);
					this.windows[14].addEquation(quest[1],this.windows[14].getMiddleX()-totalLength/2 + quest[0].getLength(),this.windows[14].getMiddleY() + this.windows[14].getHeight()/10);
					this.windows[14].addEquation(quest[2],this.windows[14].getMiddleX()-totalLength/2 + quest[0].getLength() + + quest[1].getLength(),this.windows[14].getMiddleY() + this.windows[14].getHeight()/10);
					this.windows[14].openWindow();
					
					this.windows[15].addText(this.question.getQuestion());
					this.windows[15].setPosition(0);
					this.windows[15].openWindow();
					
					
				}
				else if (this.windows[0].getPosition() == 14) {}
				else if (this.windows[0].getPosition() == 17 && this.windows[0].getOption() == 0 && this.windows[0].isOpen()) {
					this.windows[0].closeWindow();
					this.player.addGold(this.getTrainingCosts()[this.windows[1].getOption()]*-1);
					this.questionNum = Math.floor(Math.random() * (ShopBank.getTrainingStrengthHighQuestion(this.shopNumber)-ShopBank.getTrainingStrengthLowQuestion(this.shopNumber))+ShopBank.getTrainingStrengthLowQuestion(this.shopNumber));
					this.question = Questions.getFactoringEquations(this.questionNum);
					var resp = this.question.getResponse();
					var quest = this.question.getQuestions();
															
					this.windows[8].addEquation(resp[0],this.windows[8].getMiddleX()-resp[0].getLength()/2, this.windows[8].getMiddleY() + this.windows[8].getHeight()/10);
					this.windows[8].openWindow();
					
					this.windows[9].addEquation(resp[1],this.windows[9].getMiddleX()-resp[1].getLength()/2, this.windows[9].getMiddleY() + this.windows[9].getHeight()/10);
					this.windows[9].openWindow();
					
					this.windows[10].addEquation(resp[2],this.windows[10].getMiddleX()-resp[2].getLength()/2, this.windows[10].getMiddleY() + this.windows[10].getHeight()/10);
					this.windows[10].openWindow();
					
					this.windows[11].addEquation(resp[3],this.windows[11].getMiddleX()-resp[3].getLength()/2, this.windows[11].getMiddleY() + this.windows[11].getHeight()/10);
					this.windows[11].openWindow();
					
					this.windows[12].addEquation(resp[4],this.windows[12].getMiddleX()-resp[4].getLength()/2, this.windows[12].getMiddleY() + this.windows[12].getHeight()/10);
					this.windows[12].openWindow();
					
					this.windows[13].addEquation(resp[5],this.windows[13].getMiddleX()-resp[5].getLength()/2, this.windows[13].getMiddleY() + this.windows[13].getHeight()/10);
					this.windows[13].openWindow();
					
					var totalLength = quest[0].getLength() + quest[1].getLength();
					this.windows[14].addEquation(quest[0],this.windows[14].getMiddleX()-totalLength/2,this.windows[14].getMiddleY() + this.windows[14].getHeight()/10);
					this.windows[14].addEquation(quest[1],this.windows[14].getMiddleX()-totalLength/2 + quest[0].getLength(),this.windows[14].getMiddleY() + this.windows[14].getHeight()/10);
					this.windows[14].openWindow();
					
					this.windows[15].addText(this.question.getQuestion());
					this.windows[15].setPosition(0);
					this.windows[15].openWindow();
					
					
				}
				else if (this.windows[0].getPosition() == 17) {}
				else if (this.windows[0].getPosition() == 20 && this.windows[0].getOption() == 0 && this.windows[0].isOpen()) {
					this.windows[0].closeWindow();
					this.questionNum = Math.floor(Math.random() * (ShopBank.getTrainingDefenseHighQuestion(this.shopNumber)-ShopBank.getTrainingDefenseLowQuestion(this.shopNumber))+ShopBank.getTrainingDefenseLowQuestion(this.shopNumber));
					
					this.player.addGold(this.getTrainingCosts()[this.windows[1].getOption()]*-1);
					this.question = Questions.getExponentEquations(this.questionNum);
					var resp = this.question.getResponse();
					var quest = this.question.getQuestions();
										
					this.windows[4].addText(this.question.getQuestion());
					this.windows[4].setPosition(0);
					this.windows[4].addEquation(quest[0],this.windows[4].getMiddleX()-quest[0].getLength()/2,this.windows[4].getMiddleY() + this.windows[4].getHeight()/10);
					this.windows[4].openWindow();
					
					this.windows[5].addEquation(resp[0],this.windows[5].getMiddleX()-resp[0].getLength()/2,this.windows[5].getMiddleY() + this.windows[5].getHeight()/10);
					this.windows[5].openWindow();
					this.windows[6].addEquation(resp[1],this.windows[6].getMiddleX()-resp[1].getLength()/2,this.windows[6].getMiddleY() + this.windows[6].getHeight()/10);
					this.windows[6].openWindow();
					this.windows[7].addEquation(resp[2],this.windows[7].getMiddleX()-resp[2].getLength()/2,this.windows[7].getMiddleY() + this.windows[7].getHeight()/10);
					this.windows[7].openWindow();
					
					
				}
				else if (this.windows[0].getPosition() == 20) {}
				else if (this.windows[0].getPosition() == 21) {
					this.windows[0].setPosition(1);
					this.windows[1].openWindow();
					this.windows[2].openWindow();
					this.windows[3].openWindow();
					this.setValidPurchases();
				}
				else if (this.windows[0].getPosition() == 22 && this.windows[0].isOpen()) {
					this.changeStat(this.stat,this.statIncrease);
					//while(stat.length() < 7) stat = " " + stat;
					this.windows[17].addText(new WindowMessage("\n\nYou have\nincreased your\n" + this.stat + " by " + this.statIncrease + ".",false),true);
					this.windows[17].openWindow();
					this.windows[0].closeWindow();
					this.setValidPurchases();
				}
				else if (this.windows[17].isOpen()) {
					this.windows[0].setPosition(1);
					this.windows[17].closeWindow();
					this.windows[17].clearText();
					this.windows[0].openWindow();
					this.windows[1].openWindow();
					this.windows[2].openWindow();
					this.windows[3].openWindow();
				}
				else {
					this.windows[0].nextText();
				}
			}
			//Up
			if (code == 38) {
				if(this.windows[0].getPosition()==0 || this.windows[0].getPosition()==5 || this.windows[0].getPosition()==8 ||
				   this.windows[0].getPosition()==11 || this.windows[0].getPosition()==14 || this.windows[0].getPosition()==17 ||
				   this.windows[0].getPosition()==20) {
				   this.windows[0].moveOptionUp();
				}
				if(this.windows[1].isOpen()) {
					this.windows[1].moveOptionUp();
					this.windows[2].setPosition(this.windows[1].getOption());
					this.windows[3].setPosition(this.windows[1].getOption());
					this.windows[2].finishAppearing();
					this.windows[3].finishAppearing();
				}
			}
			//Down
			if (code == 40) {
				if(this.windows[0].getPosition()==0 || this.windows[0].getPosition()==5 || this.windows[0].getPosition()==8 ||
				   this.windows[0].getPosition()==11 || this.windows[0].getPosition()==14 || this.windows[0].getPosition()==17 ||
				   this.windows[0].getPosition()==20) {
					this.windows[0].moveOptionDown();
				}
				if(this.windows[1].isOpen()) {
					this.windows[1].moveOptionDown();
					this.windows[2].setPosition(this.windows[1].getOption());
					this.windows[3].setPosition(this.windows[1].getOption());
					this.windows[2].finishAppearing();
					this.windows[3].finishAppearing();
				}
			}
			if(code == 81) {
				if(this.windows[1].isOpen()) {
					this.windows[1].closeWindow();
					this.windows[2].closeWindow();
					this.windows[3].closeWindow();
					this.windows[0].openWindow();
					this.windows[0].setPosition(2);
				}
			}
			
		}
	}
	
	getTrainingOptions() {
		var ops = [];
		ops[0] = "Level";
		ops[1] = "HP";
		ops[2] = "SP";
		ops[3] = "MP";
		ops[4] = "Strength";
		ops[5] = "Defense";
		return ops;
	}
	
	getTrainingCosts() {
		return ShopBank.getTrainingPrices(this.shopNumber);
	}
	
	setValidPurchases() {
		var isValid = ShopBank.getTrainingValidity(this.shopNumber, this.player);
		this.windows[3].clearText();
		for(var i = 0; i < isValid.length; i++) {
			this.windows[3].addText(new WindowMessage(isValid[i],false));
		}
		
		for(var i = 0; i < this.getTrainingOptions().length;i++) {
			if(isValid[i] !=="Can Train") {
				this.windows[1].setOptionValid(0, i, false);
			}
			else
				this.windows[1].setOptionValid(0, i, true);
		}
		this.windows[3].setPosition(this.windows[1].getOption());
	}
	
	changeStat(st, inc) {
		if(st === "HP") {
			this.player.addHpMax(inc);
		}
		if(st === "SP") {
			this.player.addSpMax(inc);
		}
		if(st === "MP") {
			this.player.addMpMax(inc);
		}
		if(st === "Level") {
			this.player.levelUp();
		}
		if(st === "strength") {
			this.player.addStrength(inc);
		}
		if(st === "defense") {
			this.player.addDefense(inc);
		}
	}

	mouseClicked(e) {
		this.process(32);
		if(this.windows[0].getPosition() == 5) {
			if(this.windows[16].clickedOn(e)) {
				this.windows[16].processButton(e);
				if(this.windows[16].isEqDone()) {
					this.choice++;
					if(this.windows[16].getEquation() === "") 
						this.quad[this.choice] = 0;
					else
						this.quad[this.choice] = parseInt(this.windows[16].getEquation());
					this.windows[5+this.choice].clearText();
					this.windows[5+this.choice].addText( new WindowMessage(String.fromCharCode(65+this.choice) + "=" +  (this.quad[this.choice]).toString(), false));
					this.windows[18].nextText();
					this.windows[16].reset();
					if(this.choice == 2) {
						
						this.choice = -1;	
						this.windows[14].clearEquations();
						this.windows[14].closeWindow();
						this.windows[16].reset();
						this.windows[16].closeWindow();
						
						this.windows[18].clearEquations();
						this.windows[18].clearText();
						this.windows[18].closeWindow();
						
						this.windows[19].clearText();
						this.windows[19].closeWindow();
						
						this.windows[5].clearText();
						this.windows[5].closeWindow();
						this.windows[6].clearText();
						this.windows[6].closeWindow();
						this.windows[7].clearText();
						this.windows[7].closeWindow();
						this.windows[0].openWindow();
						if(this.question.isCorrect(this.quad[0], this.quad[1], this.quad[2])) {
							this.windows[0].setPosition(22);
							this.stat = "Level";
							this.statIncrease = 1;
						}
						else {
							this.windows[0].setPosition(21);
						}
						this.quad = [];
					}
				}
			}
		
		}
		if(this.windows[0].getPosition() == 8) {
			for(var i = 0; i < 3; i++) {
				if(this.windows[5+i].clickedOn(e)) {
					for(var j = 0; j < 4; j++) {
						this.windows[4+j].closeWindow();
						this.windows[4+j].clearEquations();
						this.windows[4+j].clearText();
						this.windows[4+j].clearImage();
					}
					this.windows[0].openWindow();
					if(this.question.isCorrect(i)) {
						this.windows[0].setPosition(22);
						this.stat = "HP";
						this.statIncrease = Math.floor(Math.random() * 5 * (this.player.getLevel() / 3.0) ) + 5;
					}
					else
						this.windows[0].setPosition(21);
				}
			}
		}
		if(this.windows[0].getPosition() == 11) {
			for(var i = 0; i < 6; i++) {
				if(this.windows[8+i].clickedOn(e)) {
					if(this.choice == -1) {
						this.choice = i;
						this.windows[8+i].selectEquation(0);
						this.windows[15].nextText();
					}
					else {
						if(this.question.isCorrect(this.choice,i)) {
							this.rightAnswers++;
							this.windows[8+this.choice].closeWindow();
							this.windows[8+i].closeWindow();
							this.windows[15].setPosition(0);
						}
						else {
							for(var j = 0; j < 8; j++)  {
								this.windows[8+j].clearEquations();
								this.windows[8+j].clearText();
								this.windows[8+j].closeWindow();
							}
							this.windows[0].setPosition(21);
							this.windows[0].openWindow();
							this.rightAnswers = 0;
							this.choice = -1;
						}
						this.choice = -1;
						if(this.rightAnswers == 3) {
							this.rightAnswers = 0;
							this.choice = -1;
							for(var j = 0; j < 8; j++)  {
								this.windows[8+j].clearEquations();
								this.windows[8+j].clearText();
								this.windows[8+j].closeWindow();
							}
							this.windows[14].closeWindow();
							this.windows[15].closeWindow();
							this.windows[0].setPosition(22);
							this.windows[0].openWindow();
							this.stat = "SP";
							this.statIncrease = Math.floor(Math.random() * 3 * (this.player.getLevel() / 3.0)) + 3;
						}
					}
				}
			}
		}
		if(this.windows[0].getPosition() == 14) {
			for(var i = 0; i < 6; i++) {
				if(this.windows[8+i].clickedOn(e)) {
					if(this.choice == -1) {
						this.choice = i;
						this.windows[8+i].selectEquation(0);
					}
					else {
						if(this.choice == i) {
							this.windows[8+i].deselectEquation(0);
							this.choice = -1;
						}
						else if(this.question.isCorrect(this.choice,i)) {
							this.choice = -1;
							for(var j = 0; j < 8; j++)  {
								this.windows[8+j].clearEquations();
								this.windows[8+j].clearText();
								this.windows[8+j].closeWindow();
							}
							this.windows[14].closeWindow();
							this.windows[15].closeWindow();
							this.windows[0].setPosition(22);
							this.windows[0].openWindow();
							this.stat = "MP";
							this.statIncrease = Math.floor(Math.random() * 3 * (this.player.getLevel() / 3.0)) + 3;
						}
						else {
							for(var j = 0; j < 8; j++)  {
								this.windows[8+j].clearEquations();
								this.windows[8+j].clearText();
								this.windows[8+j].closeWindow();
							}
							this.windows[0].setPosition(21);
							this.windows[0].openWindow();
							this.choice = -1;
						}
					}
				}
			}
		}
		if(this.windows[0].getPosition() == 17) {
			for(var i = 0; i < 6; i++) {
				if(this.windows[8+i].clickedOn(e)) {
					if(this.choice == -1) {
						this.choice = i;
						this.windows[8+i].selectEquation(0);
					}
					else {
						if(this.choice == i) {
							this.windows[8+i].deselectEquation(0);
							this.choice = -1;
						}
						else if(this.question.isCorrect(this.choice,i)) {
							this.choice = -1;
							for(var j = 0; j < 8; j++)  {
								this.windows[8+j].clearEquations();
								this.windows[8+j].clearText();
								this.windows[8+j].closeWindow();
							}
							this.windows[14].closeWindow();
							this.windows[15].closeWindow();
							this.windows[0].setPosition(22);
							this.windows[0].openWindow();
							this.stat = "strength";
							this.statIncrease = Math.floor(Math.random() * 3) + 1;
						}
						else {
							for(var j = 0; j < 8; j++)  {
								this.windows[8+j].clearEquations();
								this.windows[8+j].clearText();
								this.windows[8+j].closeWindow();
							}
							this.windows[0].setPosition(21);
							this.windows[0].openWindow();
							this.choice = -1;
						}
					}
				}
			}
		}
		if(this.windows[0].getPosition() == 20) {
			for(var i = 0; i < 3; i++) {
				if(this.windows[5+i].clickedOn(e)) {
					for(var j = 0; j < 4; j++)  {
						this.windows[4+j].clearEquations();
						this.windows[4+j].clearText();
						this.windows[4+j].closeWindow();
					}
					if(this.question.isCorrect(i)) {
						this.windows[0].setPosition(22);
						this.windows[0].openWindow();
						this.stat = "defense";
						this.statIncrease = Math.floor(Math.random() * 3) + 1;
					}
					else {
						this.windows[0].setPosition(21);
						this.windows[0].openWindow();
					}
				}
			}
		}
	}
	
}
