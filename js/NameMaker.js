// var GameWindow = require("GameWindow.js");
// var Equation = require("Equation.js");

class NameMaker extends GameWindow {
	
	constructor(x1loc, y1loc, x2loc, y2loc, rLength, open) {
	    if(typeof rLength === "boolean") {
	        open = rLength;
	        rLength = 12;
	    }
	    if(typeof rLength === "undefined") {
	    	open = true;
	        rLength = 12;
	    }
	    super(x1loc, y1loc, x2loc, y2loc, open);
	    this.rowLength = rLength;
		this.x = 0;
		this.y = 0;
		this.symbolCount = 54;
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
		//Draw the background and texture
		g.drawImage(this.background, 0, 0, 64, 64, this.x1, this.y1, this.x2-this.x1, this.y2-this.y1);
		g.drawImage(GameWindow.texture, this.x1, this.y1, this.x2-this.x1, this.y2-this.y1, this.x1, this.y1, this.x2-this.x1, this.y2-this.y1);
		//Draw the borders and text only if the window is open
		if(this.y1 != this.y2) {
			//Draw the borders
			g.drawImage(this.background, 64+16, 0, 16, 16, this.x1, this.y1, this.x2-this.x1, 16);
			g.drawImage(this.background, 64+16, 48, 16, 16, this.x1, this.y2-16, this.x2-this.x1, 16);
			g.drawImage(this.background, 64, 16, 16, 16, this.x1, this.y1, 16, this.y2-this.y1);
			g.drawImage(this.background, 64+48, 16, 16, 32, this.x2-16, this.y1, 16, this.y2-this.y1);
			//Draw the corners
			g.drawImage(this.background, 64, 0, 16, 16, this.x1, this.y1, 16, 16);
			g.drawImage(this.background, 64+48, 0, 16, 16, this.x2-16, this.y1, 16, 16);
			g.drawImage(this.background, 64, 48, 16, 16, this.x1, this.y2-16, 16, 16);
			g.drawImage(this.background, 64+48, 48, 16, 16, this.x2-16, this.y2-16, 16, 16);
		}
		if(this.y2 == this.oriY2) {
			var edgeBuffer = 50;
			var xStep = (this.x2-this.x1-edgeBuffer)/(this.rowLength);
			var yStep = (this.y2-this.y1-edgeBuffer)/(this.symbolCount/this.rowLength+1);
			var fontSize = 0;
			while(Equation.getXSize(fontSize) < xStep && Equation.getYSizeReal(fontSize) < yStep) {
				fontSize++;
			}
			fontSize--;
			var letter = 'A'.charCodeAt();
			var xOffset = ((this.x2 - this.x1 - edgeBuffer) - (xStep * this.rowLength))/2 ;
			var yOffset = ((this.y2 - this.y1 - edgeBuffer) - (yStep * (this.symbolCount/this.rowLength+1)))/2;
			g.font = "bold " + fontSize + "px Courier New";
			
			//Draw the cursor
			g.drawImage(this.background, 64+3, 64+3, 32-6, 32-6,
									this.x1 + edgeBuffer/2 + xOffset + this.x * xStep - fontSize/8, 
									this.y1 + edgeBuffer/2 + yOffset + this.y * yStep - fontSize/8,
									this.x1 + edgeBuffer/2 + xOffset + this.x * xStep + Equation.getXSize(fontSize) + fontSize/8 - (this.x1 + edgeBuffer/2 + xOffset + this.x * xStep - fontSize/8), 
									this.y1 + edgeBuffer/2 + yOffset + Equation.getYSizeReal(fontSize) + this.y * yStep + fontSize/8 - (this.y1 + edgeBuffer/2 + yOffset + this.y * yStep - fontSize/8),
									);
			
			//Print the letters
			for(var i = 0; i < 52; i++) {
				g.fillStyle = "black";
				g.fillText(String.fromCharCode(letter), this.x1 + edgeBuffer/2 + xOffset + (i % this.rowLength) * xStep + fontSize/16, this.y1 + edgeBuffer/2 + yOffset + Equation.getYSizeReal(fontSize) + Math.floor(i / this.rowLength) * yStep + fontSize/16);
				g.fillStyle = "white";
				g.fillText(String.fromCharCode(letter), this.x1 + edgeBuffer/2 + xOffset + (i % this.rowLength) * xStep, this.y1 + edgeBuffer/2 + yOffset + Equation.getYSizeReal(fontSize) + Math.floor(i / this.rowLength) * yStep);
				if(letter == 'Z'.charCodeAt()) letter = 'a'.charCodeAt();
				else letter++;
			}
			//Print other symbols
			g.font = "bold " + fontSize/2 + "px Courier New";
			var i = 52;
			g.fillStyle = "black";
			g.fillText("←", this.x1 + edgeBuffer/2 + xOffset + (i % this.rowLength) * xStep + fontSize/32, this.y1 + edgeBuffer/2 + yOffset + Equation.getYSizeReal(fontSize) + Math.floor(i / this.rowLength) * yStep + fontSize/32);
			g.fillStyle = "white";
			g.fillText("←", this.x1 + edgeBuffer/2 + xOffset + (i % this.rowLength) * xStep, this.y1 + edgeBuffer/2 + yOffset + Equation.getYSizeReal(fontSize) + Math.floor(i / this.rowLength) * yStep);
			i = 53;
			g.fillStyle = "black";
			g.fillText("✓", this.x1 + edgeBuffer/2 + xOffset + (i % this.rowLength) * xStep + fontSize/32, this.y1 + edgeBuffer/2 + yOffset + Equation.getYSizeReal(fontSize) + Math.floor(i / this.rowLength) * yStep + fontSize/32);
			g.fillStyle = "white";
			g.fillText("✓", this.x1 + edgeBuffer/2 + xOffset + (i % this.rowLength) * xStep, this.y1 + edgeBuffer/2 + yOffset + Equation.getYSizeReal(fontSize) + Math.floor(i / this.rowLength) * yStep);
		
			
		}
	}
	
	moveCursorUp() {
		this.y--;
		if(this.y < 0) this.y = this.y + Math.floor(this.symbolCount/this.rowLength) + 1;
		if(this.y * this.rowLength + this.x >= this.symbolCount) this.y--;
	}
	
	moveCursorDown() {
		this.y++;
		if(this.y * this.rowLength + this.x >= this.symbolCount) this.y++;
		if(this.y > Math.floor(this.symbolCount/this.rowLength)) this.y = 0;
		
	}
	
	moveCursorLeft() {
		this.x--;
		if(this.x < 0) this.x = this.x + this.rowLength;
		while(this.y * this.rowLength + this.x >= this.symbolCount) this.x--;
	}
	
	moveCursorRight() {
		this.x++;
		if(this.y * this.rowLength + this.x >= this.symbolCount) this.x=0;
		if(this.x > this.rowLength - 1) this.x = 0;
	}
	
	select() {
		return this.y * this.rowLength + this.x;
	}
}
