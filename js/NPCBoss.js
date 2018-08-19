//var GameEngine = require("GameEngine.js");
class NPCBoss extends NPC {

	constructor(fname, pos, xPos, yPos, mnum, bbg, a) {
		super(fname, pos, xPos, yPos);
		this.monsterNum = mnum;
		this.ani = a;
		this.battleBg = bbg;
		this.tic = 0;
		this.frame = 0;
	}
	
	printNPC(g, charX, charY, charMoveX, charMoveY) {
		this.tic++;
		this.tic %= 16;
		if(this.tic >= 0 && this.tic < 4) this.frame = 0;
		if(this.tic >= 4 && this.tic < 8) this.frame = 1;
		if(this.tic >= 8 && this.tic < 12) this.frame = 2;
		if(this.tic >= 12 && this.tic < 16) this.frame = 1;
		g.drawImage(this.npcGfx, (  Math.abs(this.moveX + this.moveY)/22)*32 + 32*3*(this.position%4) + 32*this.frame, 		
		                            this.direction * 32 + 32*4*(this.position/4), 						
		                            32,      
		                            32,
		                            (GameEngine.CENTERX + (this.x-charX)) * 64 + charMoveX - this.moveX, 	
		                            (GameEngine.CENTERY + (this.y-charY))* 64 + charMoveY - this.moveY, 	
		                            64, 	
		                            64);
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
				if(this.message.getText(this.message.getPosition())==="Battle") {
					this.message.closeWindow();
					this.ani.push(new Animation ("Start Battle", this.monsterNum, this.battleBg));
					this.fighting = true;
					this.message.setPosition(0);
				}
				if(this.message.isClosing()) { 
					this.talking = false;
					this.message.setPosition(0);
				}
			}
		}
	}
	
	getFighting() {
		return this.fighting;
	}
	
	getDead() {
		return this.dead;
	}
	
	setDead(d) {
		this.dead = d;
	}
	
	setFighting(f) {
		this.fighting = f;
	}
}
