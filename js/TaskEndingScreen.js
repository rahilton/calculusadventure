
class TaskEndingScreen extends Task {

	constructor(pl, par) {
		super("Space.jpg",pl, par);
		var temp1 = new Animation("Fade In");
		var temp2 = new Animation("Pause",16);
		var temp3 = new Animation("Open Main");
		temp1.setNext(temp2);temp2.setNext(temp3);
		this.ani.push(temp1);
		this.init();
		// this.bkgrd.onload = function() {
  //       	this.parent.finishedLoadingImage();
  //       }.bind(this);
		
		
	}
	
	init() {
		//Window 0 - Main Window
		var win = new GameWindow(200,200,800,500);
		//Position 0
		win.addText("Congratulations! You have finally defeated Lord Calculus!");
		win.addText("Your expolits will be sung of for years to come. Your valor... TODO: insert heroic stuff here...");
		win.addText(".....hero......amazing....yada yada... ding dong... fa la la la la la.");
		win.addText("Hey, wanna hear a joke? Can a trigonometry student breathe underwater?");
		win.addText(new WindowMessage("Cosecant!!!!!",false));
		win.addText("Hahahahahahahahahahahahahahahahahahahahahahahahahahahahahahaha!");
		win.addText("Hahahahahahahahahahahahahahahahahahahahahahahahahahahahahahaha!");
		win.addText("So anyway...  You're done now. Give the code to Mr. Hilton so maybe he'll give you extra credit.");
		win.addText("That's it. See you soon.");
		win.addText("........");
		win.addText("What, we're done right?");
		win.addText("Uh, I didn't give you the code?");
		win.addText("Oh, my mistake.");
		win.addText("Heh, heh.... heh heh.");
		win.addText("Are you ready for it?");
		win.addText("Here it comes.");
		win.addText("The code for your character is: " + this.makeCode());
		this.windows.push(win);
	}
	
	makeCode() {
		var name = this.player.getName();
		var code = "" + name.length;
		//First character
		code += String.fromCharCode(name.charCodeAt(0) - 3);
		code += String.fromCharCode(name.charCodeAt(0) + 3);
		//Second character
		if(name.length > 1) {
			var tempNum = name.charCodeAt(1);
			if(tempNum > 99) 
				code += tempNum.toString();
			else
				code += "0" + tempNum.toString();;
		}
		else
			code += "000";
		//Third character
		if(name.length > 2) {
			code += String.fromCharCode(name.charCodeAt(2) + 4);
		}
		else
			code += "_";
		//Fourth character
		if(name.length > 3) {
			code += String.fromCharCode(187 - name.charCodeAt(3));
		}
		else
			code += "!";
		//Fifth character
		if(name.length > 4) {
			code += String.fromCharCode(name.charCodeAt(4) - 4);
		}
		//Sixth character
		if(name.length > 5) {
			code += String.fromCharCode(name.charCodeAt(5) -2 );
		}
		//Seventh character
		if(name.length > 6) {
			code += String.fromCharCode(name.charCodeAt(6));
		}
		//Eighth character
		if(name.length > 7) {
			code += String.fromCharCode(name.charCodeAt(7) + 2);
		}
		//Ninth character
		if(name.length > 8) {
			code += String.fromCharCode(name.charCodeAt(8) + 4);
		}

		return code;
		
	}
	
	process(code) {
		//System.out.println("Code=" + code);
		if (code == 32) {
			if(!this.windows[0].isAppearing()) {
				if(this.windows[0].getPosition() != this.windows[0].getMaxText() - 1)
					this.windows[0].nextText();
			}
		}
	}

}
