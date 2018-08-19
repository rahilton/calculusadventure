// var World = require("World.js");
// var GameEngine = require("GameEngine.js");

class Task {

	constructor(s, p, par) {
	    if(p instanceof World) {
	        par = p;
	        p = null;
	    }
	    this.player = p;
		this.parent = par;
		this.backgroundFile = s;

		this.isLoaded = false;
		this.bkgrd = document.createElement("img");
		this.bkgrd.src = this.backgroundFile;
		this.bkgrd.onload = function() {
        	// this.parent.finishedLoadingImage();
        	this.isLoaded = true;
        }.bind(this);
		this.blackOutTic = 0;
		this.windows = [];
		this.ani = [];
	    this.CENTERX = GameEngine.CENTERX;
	    this.CENTERY = GameEngine.CENTERY;

	
	}
	
	paintComponent(g1) {
		if(!g1) g1 = document.getElementById("mainDisplay").getContext("2d");
		//super.paintComponent(g1);
		var disp = document.getElementById("workingDisplay");
		var g = disp.getContext("2d");
		//g.drawImage(this.bkgrd, 0, 0,1016,743,0,0,this.bkgrd.width,this.bkgrd.height);
		g.drawImage(this.bkgrd, 0,0,this.bkgrd.width,this.bkgrd.height,0, 0,GameEngine.PANEL_WIDTH,GameEngine.PANEL_HEIGHT);
		for(var i = 0; i < this.windows.length && !this.frozen; i++) {
			var temp = this.windows[i];
			temp.printWindow(g);
			/*if(temp.isClosed()) {
				windows.remove(i);
				i--;
			}*/
		}
		if(this.blackOut) this.blackOutFunction(g);
		if(this.fadeIn) this.fadeInFunction(g);
		for(var i = 0; i < this.ani.length; i++) {
			this.processAnimations(this.ani.shift());
		}
		
		if(this.parent.getStatus() != null) this.parent.getStatus().paintPanel(g);

		this.additionalPaint(g)
		g1.drawImage(disp,0,0,GameEngine.PANEL_WIDTH,GameEngine.PANEL_HEIGHT, 0, 0, document.getElementById("mainDisplay").width, document.getElementById("mainDisplay").height);
	}

	additionalPaint(g) {

	}
	
	blackOutFunction(g) {
	    if(!g) {
	        this.blackOutFunctionOver();
	        return;
	    }
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
	
	blackOutFunctionOver() {
		this.blackOut = true;
		this.blackOutTic = 500;
		this.frozen = true;
	}
	
	fadeInFunctionOver() {
		this.blackOut = false;
		this.fadeIn = true;
		this.blackOutTic = -50;
		this.frozen = true;
	}
	
	processAnimations(a) {
		if(a.getType() === "BlackOut") {
			if(a.getStarted() && a.getFinished()) {
				while(a.hasMessage()) {
					this.parent.processMessage(a.getMessage());
				}
				if(a.hasNext())
					this.ani.push(a.getNext());
			}
			else if(!a.getStarted()) {
				this.blackOutFunction();
				a.setStarted(true);
				this.ani.push(a);
			}
			else {
				this.ani.push(a);
			}
		}
		if(a.getType() === "Fade In") {
			if(a.getStarted() && a.getFinished()) {
				while(a.hasMessage()) {
					parent.processMessage(a.getMessage());
				}
				if(a.hasNext())
					this.ani.push(a.getNext());
			}
			else if(!a.getStarted()) {
				this.fadeInFunction();
				a.setStarted(true);
				this.ani.push(a);
			}
			else {
				this.ani.push(a);
			}
		}
		
		
	}
	
	
	process(c) {
		
	}
	processTime(){
		for(var i = 0; i < this.ani.length; i++) {
			var temp = this.ani.shift();
			this.processAnimations(temp);
		}
		
		this.paintComponent();
	}
	
	redraw() {
		this.paintComponent();
	}

	mouseClicked(e) {}
	
	giveMessage(m){}
    changeShopNumber(num) {}
	createImage() {}
	destroyImage() {}
}

