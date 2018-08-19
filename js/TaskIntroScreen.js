// var GameWindow = require("GameWindow.js");
// var WindowMessage = require("WindowMessage.js");
// var Task = require("Task.js");
// var Animation = require("Animation.js");
// var NameMaker = require("NameMaker.js");
// var Message = require("Message.js");

class TaskIntroScreen extends Task {

	

	
	constructor(w) {

		super("MainTitle.png", w);
		var temp1 = new Animation("Fade In");
		var temp2 = new Animation("Pause",16);
		var temp3 = new Animation("Open Main");
		temp1.setNext(temp2);temp2.setNext(temp3);
		this.ani.push(temp1);
		this.init();
		this.CENTERX = 9;
	    this.CENTERY = 5;
		
	}
	/*
	paintComponent(g) {
		if(!g) g = document.getElementById("mainDisplay").getContext("2d");
		super.paintComponent(g);
		g.drawImage(this.bkgrd, 0, 0,1216,743,0,0,this.bkgrd.width,this.bkgrd.height);
		for(var i = 0; i < this.windows.length && !this.frozen; i++) {
			var temp = this.windows[i];
			temp.printWindow(g);
		}
		g.font = "bold 16px Courier New";
		g.fillStyle = "black";
		g.fillText("Version 2.0", 1090+2, 20+2);
		g.fillStyle = "white";
		g.fillText("Version 2.0", 1090, 20);
		if(this.blackOut) this.blackOutFunction(g);
		if(this.fadeIn) this.fadeInFunction(g);
		for(var i = 0; i < this.ani.length; i++) {
			this.processAnimations(this.ani.shift());
		}
	}*/
	
	setHaveSave(val) {
		this.haveSave = val;
	}

	additionalPaint(g) {
		g.font = "bold 16px Courier New";
		g.fillStyle = "black";
		g.fillText("Version 2.0", 1090+2, 20+2);
		g.fillStyle = "white";
		g.fillText("Version 2.0", 1090, 20);
	}
	
	init() {
		//Window 0 - Main Window
		var win = new GameWindow(475,400,725,550,false);
		//Position 0
		var temp = new WindowMessage("");
		temp.setType("Option");
		temp.addOption("New");
		temp.addOption("Continue");
		win.addText(temp);
		this.windows.push(win);
		
		//Window 1 - Name Display
		win = new GameWindow(450,205,750,305,false);
		win.addText("");
		this.windows.push(win);
		
		
		//Window 2 - Name Maker Window
		this.windows.push(new NameMaker(300,325,900,625,false));
		
		//Window 3 - Instructions Window
		win = new GameWindow(250,0,950,200,false);
		win.addText(new WindowMessage("Enter your name. Type 'q' to go back.",false));
		win.addText(new WindowMessage("No .ply files found. Type 'q' to go back.",false));
		win.addText(new WindowMessage("Select which player to load. Type 'q' to go back.",false));
		this.windows.push(win);
		
		//Window 4 - File List Window
		win = new GameWindow(350,325,850,625,false);
		
		
		this.windows.push(win);
				
		
		
	}
	
	process(code) {
		//System.out.println("Code=" + code);
		if(!this.frozen) {
			if (code == 32) {
				if(this.windows[0].isAppearing()) {
					this.windows[0].finishAppearing();
				}
				else if(this.windows[0].getOption() == 0 && this.windows[0].isOpen()) {
					this.windows[0].closeWindow();
					this.windows[1].openWindow();
					this.windows[2].openWindow();
					this.windows[3].openWindow();
					this.windows[3].setPosition(0);
				}
				else if(this.windows[0].getOption() == 1 && this.windows[0].isOpen()) {
					//Continue code
					/*
					windows.get(0).closeWindow();
					File path = new File(".");
					File[] listOfFiles = path.listFiles();
					WindowMessage temp = new WindowMessage("");
					temp.setType("Option");
					for(int i = 0; i < listOfFiles.length; i++) {
						String current = listOfFiles[i].toString();
						if(current.substring(current.length()-4, current.length()).equals(".ply")) {
							temp.addOption(current.substring(2));
						}	
					}
					if(temp.getOptionSize() > 0) {
						windows.get(4).addText(temp);
						windows.get(4).openWindow();
						windows.get(3).openWindow();
						windows.get(3).setPosition(2);
					}
					else {
						windows.get(3).openWindow();
						windows.get(3).setPosition(1);
					}
					*/
					if(this.haveSave) {
						var newA = new Animation("BlackOut");
						newA.addMessage(new Message("Load Player"));
						newA.addMessage(new Message("Make World"));
						this.ani.push(newA);
					}
					
				}
				else if(this.windows[4].isOpen()) {
					/*
					var newA = new Animation("BlackOut");
					newA.addMessage(new Message("Load Player:" + this.windows[4].getOptionText(this.windows[4].getOption())));
					newA.addMessage(new Message("Make World"));
					this.ani.push(newA);
					*/
				}
				else if(this.windows[2].isOpen()) {
					var choice = this.windows[2].select();
					if (choice == 52) { //backspace
						var nameSoFar = this.windows[1].getText(0);
						if(nameSoFar.length > 0) {
							nameSoFar = nameSoFar.substring(0,nameSoFar.length-1);
						}
						this.windows[1].clearText();
						this.windows[1].addText(new WindowMessage(nameSoFar,false));
					}
					else if (choice == 53 && this.windows[1].getText(0).length > 0) { //confirm
						var newA = new Animation("BlackOut");
						newA.addMessage(new Message("Make Player:" + this.windows[1].getText(0)));
						newA.addMessage(new Message("Make World"));
						this.ani.push(newA);
					}
					else { //add letter
						var nameSoFar = this.windows[1].getText(0);
						if(nameSoFar.length < 10) {
							if(choice < 26)
								nameSoFar += String.fromCharCode('A'.charCodeAt() + choice);
							else
								nameSoFar += String.fromCharCode('a'.charCodeAt() + choice - 26);
						}
						this.windows[1].clearText();
						this.windows[1].addText(new WindowMessage(nameSoFar,false));
					}
				}
			}
			if (code == 38) {
				if(this.windows[0].isOpen())
					this.windows[0].moveOptionUp();
				if(this.windows[2].isOpen())
					this.windows[2].moveCursorUp();
				if(this.windows[4].isOpen())
					this.windows[4].moveOptionUp();
			}
			if (code == 40) {
				if(this.windows[0].isOpen())
					this.windows[0].moveOptionDown();
				if(this.windows[2].isOpen())
					this.windows[2].moveCursorDown();
				if(this.windows[4].isOpen())
					this.windows[4].moveOptionDown();
			}
			if (code == 37) {
				if(this.windows[2].isOpen())
					this.windows[2].moveCursorLeft();
			}
			if (code == 39) {
				if(this.windows[2].isOpen())
					this.windows[2].moveCursorRight();
			}
			if (code == 81) {
				this.windows[0].openWindow();
				this.windows[1].closeWindow();
				this.windows[1].clearText();
				this.windows[1].addText("");
				this.windows[2].closeWindow();
				this.windows[3].closeWindow();
				this.windows[4].closeWindow();
				this.windows[4].clearText();
				this.windows[4].resetOptions();
			}
		}
	}
	
	/*
	blackOutFunction(g) {
		this.blackOutTic -= 20;
		g.fillStyle = "black";
		g.fillRect(0, 0, 2000, this.CENTERY*64-this.blackOutTic);
		g.fillRect(0, (this.CENTERY+1)*64+this.blackOutTic, 2000, 2000);
		g.fillRect(0, 0, this.CENTERX*64-this.blackOutTic, 2000);
		g.fillRect((this.CENTERX+1)*64+this.blackOutTic, 0, 2000, 2000);
		if(this.blackOutTic <=-50) {
			//blackOut = false;
			//frozen = false;
			for(var i = 0; i < this.ani.length; i++) {
				var temp = this.ani.shift();
				if(temp.getType() === "BlackOut") {
					temp.setFinished(true);
				}
				this.ani.push(temp);
			}
		}
	}
	
	fadeInFunction(g) {
		if(!g) {
	        this.fadeInFunctionOver();
	        return;
	    }
		this.blackOutTic += 20;
		g.fillStyle = "black";
		g.fillRect(0, 0, 2000, this.CENTERY*64-this.blackOutTic);
		g.fillRect(0, (this.CENTERY+1)*64+this.blackOutTic, 2000, 2000);
		g.fillRect(0, 0, this.CENTERX*64-this.blackOutTic, 2000);
		g.fillRect((this.CENTERX+1)*64+this.blackOutTic, 0, 2000, 2000);
		if(this.blackOutTic >= 600) {
			this.fadeIn = false;
			this.frozen = false;
			for(var i = 0; i < this.ani.length; i++) {
				var temp = this.ani.shift();
				if(temp.getType() === "Fade In") {
					temp.setFinished(true);
				}
				this.ani.push(temp);
			}
		}
	}
	*/
	
	processAnimations(a) {
		super.processAnimations(a);
		//System.out.println(a.getType());
		if(a.getType() === "Pause" && !a.getStarted()) {
			a.setMaxTic(a.getData(0));
			this.ani.push(a);
		}
		if(a.getType() === "Pause" && !a.getFinished() ) {
			this.ani.push(a);
		}
		if(a.getType() === "Open Main") {
			this.windows[0].openWindow();
		}
		if(!a.getStarted()) a.setStarted(true);
		if(a.getFinished() && a.hasNext()) this.ani.push(a.getNext());
		a.paintAnimation();
	}
	
	processTime(){
		for(var i = 0; i < this.ani.length; i++) {
			var temp = this.ani.shift();
			this.processAnimations(temp);
		}
		
	this.paintComponent();
	}
}

// module.exports = TaskIntroScreen;