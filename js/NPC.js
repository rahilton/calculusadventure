class NPC {
	
	constructor(fname, pos, xPos, yPos) {
		this.fileName = fname;
		this.position = pos;
		this.npcGfx = document.createElement("img");
		this.npcGfx.src = this.fileName;
		this.message = new GameWindow(5,5,1000,300);
		this.message.closeWindow();
		this.oriX = this.x = xPos;
		this.oriY = this.y = yPos;
		this.direction = 0;
		this.moveX = 0;
		this.moveY = 0;
		this.moves = false;
		this.moveFreq = 0;
		this.tic = 0;
		this.talking = false;
		this.movingUp = this.movingDown = this.movingLeft = this.movingRight = false;
	}
	

	printNPC(g, charX, charY, charMoveX, charMoveY) {
		g.drawImage(this.npcGfx,	Math.floor(Math.abs(this.moveX + this.moveY)/22)*32 + 32*3*(this.position%4), 		
			    			this.direction * 32 + 32*4*(Math.floor(this.position/4)), 						
			    			32,
			    			32, 
			    			(GameEngine.CENTERX + (this.x-charX)) * 64 + charMoveX - this.moveX,
		                    (GameEngine.CENTERY + (this.y-charY))* 64 + charMoveY - this.moveY, 	
		                    64, 	
		                    64
			    			);
		
	}
	
	printWindow(g) {
		if(!this.message.isClosed()) this.message.printWindow(g);
	}
	
	collided(xloc, yloc) {
		if(this.x == xloc && this.y == yloc)
			return true;
		return false;
	}
	
	getX() {
		return this.x;
	}
	
	getY() {
		return this.y;
	}
	
	interact(code) {
		if(code == 32) {
			if(this.message.isClosed()) {
				this.message.openWindow();
				this.talking = true;
			}
			else if(this.message.isAppearing())
				this.message.finishAppearing();
			else { 
				this.message.nextText();
				if(this.message.isClosing()) { 
					this.talking = false;
					this.message.setPosition(0);
				}
			}
		}
	}
	
	processTime(mobilityMap, xPlay, yPlay, npcs) {
		if(!this.moves || this.talking) return;
		if(this.tic == this.moveFreq) {
			this.checkMove( Math.floor(Math.random()*4)+37,mobilityMap, xPlay, yPlay, npcs);
			this.tic = 0;
		}
		this.tic++;
		if(this.movingLeft) {
			this.moveX += 8;
			if(this.moveX == 0) {
				this.movingLeft = false;
			}
		}
		if(this.movingUp) {
			this.moveY += 8;
			if(this.moveY == 0) {
				this.movingUp = false;
			}
		}
		if(this.movingRight) {
			this.moveX -= 8;
			if(this.moveX == 0) {
				this.movingRight = false;
			}
		}
		if(this.movingDown) {
			this.moveY -= 8;
			if(this.moveY == 0) {
				this.movingDown = false;
			}
		}
	}
	
	setMoves(s) {
		this.moves = s;
	}
	
	setFrequency(f) {
		this.moveFreq = f;
	}
	
	npcCollided(npcs) {
		for(var i = 0; i < npcs.length;i++) {
			if(npcs[i] == this) continue;
			if(npcs[i].collided(this.x, this.y))
				return true;
		}
		return false;
	}
	
	checkMove(code, mobilityMap, xPlay, yPlay, npcs) {
		var width = mobilityMap[0].length;
		var height = mobilityMap.length;
		if(code == 37) {
			this.x--;
			this.x = (this.x + width)%width;
			this.direction = 1;
			if(mobilityMap[this.y].substring(this.x,this.x+1)!=="O" || (xPlay == this.x && yPlay == this.y) || this.npcCollided(npcs)) {
				this.cancelMove(width,height);
			}
			else {
				this.movingLeft = true;
				this.moveX = -64;
			}
		}
		if(code == 38) {
			this.y--;
			this.y = (this.y + height)%height;
			this.direction = 3;
			if(mobilityMap[this.y].substring(this.x,this.x+1) !== "O" || (xPlay == this.x && yPlay == this.y) || this.npcCollided(npcs)) {
				this.cancelMove(width, height);
			}
			else {
				this.movingUp = true;
				this.moveY = -64;
			}
		}
		if(code == 39) {
			this.x++;
			this.x = (this.x + width)%width;
			this.direction = 2;
			if(mobilityMap[this.y].substring(this.x,this.x+1) !== "O" || (xPlay == this.x && yPlay == this.y) || this.npcCollided(npcs)) {
				this.cancelMove(width, height);
			}
			else {
				this.movingRight = true;
				this.moveX = 64;
			}
		}
		if(code == 40) {
			this.y++;
			this.y = (this.y + height)%height;
			this.direction = 0;
			if(mobilityMap[this.y].substring(this.x,this.x+1) !== "O" || (xPlay == this.x && yPlay == this.y) || this.npcCollided(npcs)) {
				this.cancelMove(width, height);
			}
			else {
				this.movingDown = true;
				this.moveY = 64;
			}
		}
	}
	
	cancelMove(width, height) {
		if(this.direction == 0) this.y--;
		if(this.direction == 1) this.x++;
		if(this.direction == 2) this.x--;
		if(this.direction == 3) this.y++;
		this.y = (this.y + height)%height;
		this.x = (this.x + width)%width;
		this.movingUp = this.movingDown = this.movingLeft = this.movingRight = false;
		this.moveX = this.moveY = 0;
	}
	
	
	isWindowOpen() {
		return !this.message.isClosed();
	}
	
	setDirection(d) {
		this.direction = d;
	}
	
	addMessage(str) {
		this.message.addText(str);
	}
	
	resetPosition() {
		this.x = this.oriX;
		this.y = this.oriY;
	}
	
	

}
