// var Equation = require("Equation.js");
// var WindowMessage = require("WindowMessage.js");

class GameWindow {

	
	//static BufferedImage texture;
	

	constructor(x1loc, y1loc, x2loc, y2loc, visible) {
	    this.DISTANCE_X = 16;
    	this.DISTANCE_Y = 12;
    	this.DEFAULT_WINDOW_FONT_SIZE = 40;
	    this.x1 = x1loc;
		this.y1 = y1loc;
		this.x2 = x2loc;
		this.y2 = this.y1;
		this.oriY2 = y2loc;
		this.height = this.oriY2 - this.y1;
		this.width = this.x2 - this.x1;
		this.opening = true;
		this.open = false;
		this.closing = false;
		this.closed = false;
		this.appearing = true;
		this.endText = 0;
		this.option = 0;
		this.position = 0;
		this.optionBackground = null;
		this.size = this.DEFAULT_WINDOW_FONT_SIZE;
		this.topList = 0;
		this.busts = [];
		
    	if(this.background == null) {
        	this.background = document.createElement('img');
            this.background.src = "window04.png";
    	}
		this.text = [];
	    this.eqs = [];
	    this.xEqs = [];
	    this.yEqs = [];
	    this.imgs = [];
	
		if(typeof visible == "boolean" && !visible) {
			this.closeWindow();
		}
	}
	
	
	printWindow(g) {
		if(this.closed) return;
		
		//Open and closing the window
		if(this.opening) {
			this.y2 += 64;
			if(this.y2 >= this.oriY2) {
				this.y2 = this.oriY2;
				this.opening = false;
				this.open = true;
			}
		}
		if(this.closing) {
			this.y2 -= 64;
			if(this.y2 <= this.y1) {
				this.y2 = this.y1;
				this.closing = false;
				this.closed = true;
			}
		}
		if(this.optionBackground == null) {
			//Draw the background and texture
			g.drawImage(this.background, 0, 0, 64, 64, this.x1, this.y1, this.x2-this.x1, this.y2-this.y1);
			g.drawImage(GameWindow.texture, this.x1, this.y1, this.x2-this.x1, this.y2-this.y1, this.x1, this.y1, this.x2-this.x1, this.y2-this.y1);
			
		}
		else {
			//Image newBackground = ImageIO.read(new File(optionBackground));
			g.drawImage(this.newBackground, 0, 0, this.newBackground.width, this.newBackground.height * (this.y2 - this.y1)/(this.oriY2 - this.y1), this.x1, this.y1, this.x2 - this.x1, this.y2 - this.y1);
			//g.fillRect(x1, y1, x2-x1, y2-y1);
		}
		//Draw the borders and text only if the window is open
		if(this.y1 != this.y2) {
			//Draw the borders
			g.drawImage(this.background, 64+16, 0, 16, 16, this.x1, this.y1, this.x2-this.x1, 16);
			g.drawImage(this.background, 64+16, 48, 16, 16, this.x1, this.y2-16, this.x2-this.x1, 16);
			g.drawImage(this.background, 64, 16, 16, 32, this.x1, this.y1, 16, this.y2-this.y1);
			g.drawImage(this.background, 64+48, 16, 16, 32, this.x2-16, this.y1, 16, this.y2-this.y1);
			//Draw the corners
			g.drawImage(this.background, 64, 0, 16, 16, this.x1, this.y1, 16, 16);
			g.drawImage(this.background, 64+48, 0, 16, 16, this.x2-16, this.y1, 16, 16);
			g.drawImage(this.background, 64, 48, 16, 16, this.x1, this.y2-16, 16, 16);
			g.drawImage(this.background, 64+48, 48, 16, 16, this.x2-16, this.y2-16, 16, 16);
			
			
			if(!this.closing && !this.opening) {
				//Draw text if there is text available
				if(this.position < this.text.length) {
					//If the message is not appearing, turn off appearing
					if(!this.text[this.position].getAppearing()) this.finishAppearing();
					//If there is a bust, display it
					if(this.text[this.position].isBust()) {
						var foundBust = false;
						var bustPos;
						for(var i = 0; i < this.busts.length; i++) {
							if(this.text[this.position].getBust() === this.busts[i].file) {
								foundBust = true;
								bustPos = i;
							}
						}
						if(!foundBust) {
							var bust = document.createElement("img");
							bust.src = this.text[this.position].getBust();
							this.busts.push({file:this.text[this.position].getBust(),img:bust});
							bustPos = this.busts.length - 1;
						}
						var bust = this.busts[bustPos].img;
						g.drawImage(bust, 0,0,bust.width, bust.height, this.x1, this.y1-bust.height,bust.height,bust.height);
					}
					g.font = "bold " + this.size + "px Courier New";					
					
					
					var lines = this.breakTextUp();
					
					
					//Print the text by line
					var end = this.endText;
					var finish = 0;
					for(var i = 0; i < lines.length; i++) {
						if(end > lines[i].length) {
							finish = lines[i].length;
							end -= lines[i].length;
						}
						else {
							finish = end;
							end = 0;
						}
						//System.out.println(i*split + " " + (i*split + finish) + " " + finish + " " + split + " " + endText);
						//console.log(lines[i] + " " + finish + " " + this.endText + " " + this.appearing + " " + this.opening);
						g.fillStyle = "black";
						g.fillText(lines[i].substring(0, finish),this.x1 + this.DISTANCE_X + 2, this.y1 + this.DISTANCE_Y + 2 + Equation.getYSize(this.size) * (i+1));
						g.fillStyle = "white";
						g.fillText(lines[i].substring(0, finish),this.x1 + this.DISTANCE_X + 0, this.y1 + this.DISTANCE_Y + 0 + Equation.getYSize(this.size) * (i+1));
						
						//g.setColor(Color.RED);
						//g.drawLine(x1+DISTANCE_X, y1+DISTANCE_Y, x1+DISTANCE_X +30, y1+DISTANCE_Y);
						//g.drawLine(x1+DISTANCE_X, y1+DISTANCE_Y + Equation.getYSize(size), x1+DISTANCE_X +30, y1+DISTANCE_Y+Equation.getYSize(size));
						//g.drawLine(x1+DISTANCE_X, y1+DISTANCE_Y + Equation.getYSize(size)*2, x1+DISTANCE_X +30, y1+DISTANCE_Y+Equation.getYSize(size)*2);
					}
					//Increment the appearing variables
					if(this.appearing && !this.opening) {
						this.endText++;
						if(this.endText >= this.text[this.position].getMessage().length) {
							this.appearing = false;
						}
					}
					
					//Print the options here
					if(!this.appearing && !this.opening && this.text[this.position].getType() === "Option") {
						var offset = this.text[this.position].getOptionOffset();
						var maxOptions = this.getMaxOptions();
						//System.out.println("The Max Options are " + maxOptions);
						//Print selection box
						g.drawImage(this.background, 64+3, 64+3, 32-3-3, 32-3-3,
													 this.x1 + this.DISTANCE_X,
													 this.y1 + this.DISTANCE_Y + offset + Equation.getYSize(this.size) * (lines.length + this.option+1-this.topList) - Equation.getYSizeReal(this.size) - this.size/8, 
												     this.x1 + this.DISTANCE_X + this.text[this.position].maxOptionLength() * Equation.getXSize(this.size+1) - (this.x1 + this.DISTANCE_X), 
												     this.y1 + this.DISTANCE_Y + offset + Equation.getYSize(this.size) * (lines.length + this.option+1-this.topList)+this.size/8 - (this.y1 + this.DISTANCE_Y + offset + Equation.getYSize(this.size) * (lines.length + this.option+1-this.topList) - Equation.getYSizeReal(this.size) - this.size/8)) ;
						//If we sell items, the top of the list may need to be adjusted
						while(this.topList + this.getMaxOptions() > this.text[this.position].getOptionSize())
							this.topList--;
						//Print text
						for(var i = 0; i < maxOptions;i++) {
							var op = this.text[this.position].getOption(i+this.topList);
							g.fillStyle = "black";
							g.fillText(op,this.x1 + this.DISTANCE_X + 2, this.y1 + this.DISTANCE_Y + 2 + offset + Equation.getYSize(this.size) * (lines.length + i + 1));
							if(!this.text[this.position].getValid(i+this.topList)) g.fillStyle = "dark_gray";
							else if (this.text[this.position].getSpecial(i+this.topList)) g.fillStyle = "red";
							else g.fillStyle = "white";
							g.fillText(op,this.x1 + this.DISTANCE_X + 0, this.y1 + this.DISTANCE_Y + 0 + offset + Equation.getYSize(this.size) * (lines.length + i + 1));
							
						}
						//First there are more options than fit the screen, display the arrow indicator that there are more.
						if(maxOptions < this.text[this.position].getOptionSize() && this.topList != 0) {
							//g.drawImage(background, x2-64-8, y2-64+16, x2-8, y2-64+32+16, 88, 8, 104, 32, null);
							g.fillStyle = "black";
							var xpts = [this.x2-32-8+2,this.x2-16-8+2,this.x2-8+2]; var ypts = [this.y2-32+2,this.y2-48+2,this.y2-32+2];
							g.beginPath();
                            g.moveTo(xpts[0], ypts[0]);
							for( var item=1 ; item < xpts.length ; item++ ){g.lineTo( xpts[item] , ypts[item] )}
							g.closePath();
                            g.fill();
							g.fillStyle = "white";
							var xpts2 = [this.x2-32-8,this.x2-16-8,this.x2-8]; var ypts2 = [this.y2-32,this.y2-48,this.y2-32];
							g.beginPath();
                            g.moveTo(xpts2[0], ypts2[0]);
							for( var item=1 ; item < xpts2.length ; item++ ){g.lineTo( xpts2[item] , ypts2[item] )}
							g.closePath();
                            g.fill();
						}
						if(maxOptions < this.text[this.position].getOptionSize() && this.topList + maxOptions != this.text[this.position].getOptionSize()) {
							//g.drawImage(background, x2-64-8, y2-64+32, x2-8, y2, 88, 32, 104, 56, null);
							g.fillStyle = "black";
							var xpts = [this.x2-32-8+2,this.x2-16-8+2,this.x2-8+2]; var ypts = [this.y2-32+4,this.y2-16+4,this.y2-32+4];
							g.beginPath();
                            g.moveTo(xpts[0], ypts[0]);
							for( var item=1 ; item < xpts.length ; item++ ){g.lineTo( xpts[item] , ypts[item] )}
							g.closePath();
                            g.fill();
							g.fillStyle = "white";
							var xpts2 = [this.x2-32-8,this.x2-16-8,this.x2-8]; var ypts2 = [this.y2-32+2,this.y2-16+2,this.y2-32+2];
							g.beginPath();
                            g.moveTo(xpts2[0], ypts2[0]);
							for( var item=1 ; item < xpts2.length ; item++ ){g.lineTo( xpts2[item] , ypts2[item] )}
							g.closePath();
                            g.fill();
						}
					}
				}
				for(var i = 0; i < this.eqs.length; i++) {
					this.eqs[i].printEquation(g,this.xEqs[i],this.yEqs[i]);
				}
				for(var i = 0; i < this.imgs.length; i++) {
					// System.out.println("Images size " + imgs.size());
					g.drawImage(this.imgs[i],this.x1,this.y1);
				}
			}
		}
		
    }
	
	breakTextUp() {
		var lines = [];
		if(this.text[this.position].getMessage()==="") return lines;
		var split = (this.width - 32)/Equation.getXSize(this.size) - 1;
		var former = 0, current = 0, first = 0;
		while((current = this.text[this.position].getMessage().indexOf(' ',former+1)) != -1) {
			if(this.text[this.position].getMessage().substring(first, current).length > split) {
				if(former == first) former = first + split;
				lines.push(this.text[this.position].getMessage().substring(first, former));
				if(this.text[this.position].getMessage().charAt(former)==' ')
					first = current = former = former + 1;
				else
					first = current = former;
			}
			former = current;
		}
		while(this.text[this.position].getMessage().substring(first, this.text[this.position].getMessage().length).length>split) {
			if(former == first) former = first + split;
			lines.push(this.text[this.position].getMessage().substring(first, former));
			if(this.text[this.position].getMessage().charAt(former)==' ')
				first = former = former + 1;
			else
				first = former;
		}
		lines.push(this.text[this.position].getMessage().substring(first));
		return lines;
	}
	
	getLineSplit() {
		return (this.width - 32)/Equation.getXSize(this.size) - 1;
	}
	
	getTopList() {
		return this.topList;
	}
	
	resetOptions(){
		this.option = 0;
		this.topList = 0;
	}
	
	getMaxOptions() {
		var offset = this.text[this.position].getOptionOffset();
		var lines = this.breakTextUp(); 
		var maxOptions = 0;
		for(var i = 0; i < this.text[this.position].getOptionSize(); i++) {
			if(this.y1 + this.DISTANCE_Y + offset + Equation.getYSize(this.size) * (lines.length + i+1)+this.size/8 < this.oriY2) {
				maxOptions++;
			}
			else
				break;
		}
		return maxOptions;
	}
	
	setOption(position, newOp) {
		this.option = newOp;
	}
	
	setOptionBackground(fileName) {
		this.optionBackground = fileName;
		this.newBackground = document.createElement("img");
		this.newBackground.src = "battle/" + this.optionBackground;
	}
	
	finishAppearing() {
		this.appearing = false;
		if(this.position < this.text.length)
			this.endText = this.text[this.position].getMessage().length;
		else
			this.endText = 0;
	}
	
	clearText() {
		while(this.text.length > 0)
			this.text.splice(0);
		this.position = 0;
	}
	
	addEquation(eq, x, y) {
		this.eqs.push(eq);
		this.xEqs.push(x);
		this.yEqs.push(y);
	}
	
	clearEquations() {
		while(this.eqs.length > 0) {
			this.eqs.splice(0);
			this.xEqs.splice(0);
			this.yEqs.splice(0);
		}
	}
	
	removeEquation(i) {
		this.eqs.splice(i);
		this.xEqs.splice(i);
		this.yEqs.splice(i);
	
	}
	
	addImage(im) {
		this.imgs.push(im);
	}
	
	clearImage() {
		while(this.imgs.length > 0)
			this.imgs.splice(0);
	}
	
	getEquation(i) {
		return this.eqs[i];
	}
	
	getText(pos) {
		return this.text[pos].getMessage();
	}
	
	addText(m, center) {
		if(typeof m == "string") {
		    m = new WindowMessage(m);
		}
		
		if(center) {
			var lines = m.getMessage().split("\n");
			var len = this.getLineSplit();
			var mes = "";
			for(var i = 0; i < lines.length; i++) {
				while(lines[i].length < len+1) lines[i] = " " + lines[i] + " ";
				if(lines[i].length > len+1) lines[i] = lines[i].substring(0,lines[i].length-1);
				mes += lines[i];
			}
			m.setMessage(mes);
		}
		this.text.push(m);
	}
	
	getTextSize() {
		return this.text.length;
	}
	
	changeFontSize(newFont) {
		this.size = newFont;
	}
	
	isAppearing() {
		return this.appearing;
	}
	
	isClosing() {
		return this.closing;
	}
	
	isOpening() {
		return this.opening;
	}
	
	isClosed() {
		return this.closed;
	}
	
	nextText() {
		this.position++;
		this.appearing = true;
		this.endText = 0;
		if(this.position >= this.text.length)
			this.closeWindow();
	}
	
	setPosition(p) {
		this.position = p;
		this.appearing = true;
		this.endText = 0;
	}
	
	getPosition() {
		return this.position;
	}
	
	closeWindow() {
		this.closing = true;
		this.opening = false;
		this.open = false;
	}
	
	openWindow() {
		this.opening = true;
		this.closing = false;
		this.closed = false;
	}
	
	isOpen() {
		return this.open;
	}
	
	moveOptionDown() {
		if(this.position < this.text.length && this.text[this.position].getOptionSize() > 0) {
			this.option++;
			this.option = this.option%this.text[this.position].getOptionSize();
			while(this.option - this.topList >= this.getMaxOptions())
				this.topList++;
			while(this.option - this.topList < 0)
				this.topList--;	
		}
	}
	
	moveOptionUp() {
		if(this.position < this.text.length && this.text[this.position].getOptionSize() > 0) {
			this.option--;
			this.option = (this.option + this.text[this.position].getOptionSize())%this.text[this.position].getOptionSize();
			while(this.option - this.topList >= this.getMaxOptions())
				this.topList++;
			while(this.option - this.topList < 0)
				this.topList--;
		}
		//System.out.println("The option="+option);
	}
	
	getOptionText(o) {
		return this.text[this.position].getOption(o);
	}
	
	getOption() {
		return this.option;
	}
	
	setOptionValid(posNum, opNum, val) {
		this.text[posNum].setValid(val, opNum);
	}
	
	getOptionValid(posNum, opNum) {
		return this.text[posNum].getValid(opNum);
	}
	
	getMaxText() {
		return this.text.length;
	}

	getWidth() {
		return this.width;
	}
	
	getHeight() {
		return this.oriY2 - this.y1;
	}
	
	getX1() {
		return this.x1;
	}
	
	getY1() {
		return this.y1;
	}
	
	getX2() {
		return this.x2;
	}
	
	getY2() {
		return this.oriY2;
	}
	
	getMiddleX() {
		return (this.x2+this.x1)/2;
	}
	
	getMiddleY() {
		return (this.oriY2+this.y1)/2;
	}

	
	
	clickedOn(e) {
		var xPos = e.getX;
		var yPos = e.getY;			
		if(xPos>= this.x1 && xPos <= this.x2 && yPos >= this.y1 && yPos <= this.y2 && this.open)
			return true;
		return false;
	}
	
	selectEquation(num) {
		this.eqs[num].select();
	}
	
	deselectEquation(num) {
		this.eqs[num].deselect();
	}
	
	//Draw the texture
	/*
	int endY, endX, readEndX, readEndY;
	for(int i = 0; i < height/64 +1; i++) {
		if(i == height/64) {
			endY = y2;
			readEndY = y2 - (y1+64*i);
		}
		else {
			endY = y1 + i*64 + 64;
			readEndY = 64;
		}
		for(int j = 0; j < width/64 +1; j++) {
			if(j == width/64) {
				endX = x2;
				readEndX = x2 - (x1 + 64*j);
			}
			else {
				endX = x1 + j*64 + 64;
				readEndX = 64;
			}
			//System.out.println(x1+64*j + " " + (y1+64*i) + " " + endX + " " + endY + " " + readEndX + " " + (64+readEndY));
			g.drawImage(background, x1+64*j, y1+64*i, endX, endY, 0, 64, readEndX, 64+readEndY, null);
		}
	}*/
	
}

GameWindow.makeTexture = function(){
    GameWindow.texture = document.getElementById("texture");
	var tex = document.createElement('img');
	tex.src = "window04.png";
	for(var i = 0; i < 25; i++) {
		for(var j = 0; j < 25; j++) {
			GameWindow.texture.getContext("2d").drawImage(tex, 0, 64, 64, 64, i*64, j*64, 64, 64);
		}
	}
}

GameWindow.DEFAULT_WINDOW_FONT_SIZE = 40;
//module.exports = GameWindow;