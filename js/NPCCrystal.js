class NPCCrystal extends NPC {
	
	constructor(xPos, yPos, cNum, a, p) {
		super("Crystals.png", cNum, xPos, yPos);
		this.ani = a;
		this.crystalNum = cNum;
		this.tic = 0;
		this.frame = 0;
		this.player = p;
	}
	
	printNPC(g, charX, charY, charMoveX, charMoveY) {
		this.tic++;
		this.tic %= 16;
		if(this.tic >= 0 && this.tic < 4) this.frame = -2;
		if(this.tic >= 4 && this.tic < 8) this.frame = 0;
		if(this.tic >= 8 && this.tic < 12) this.frame = 2;
		if(this.tic >= 12 && this.tic < 16) this.frame = 0;
		
		g.drawImage(this.npcGfx,	13 + this.crystalNum * 69,									 		
			    			4, 															
			    			69 -27-13, 											
			    			47-4,
			    			(GameEngine.CENTERX + (this.x-charX)) * 64 + charMoveX - this.moveX, 	
		                    (GameEngine.CENTERY + (this.y-charY))* 64 + charMoveY - this.moveY-40+this.frame, 	
		                    64,
		                    49 + 40
			    			);
			    			
			    			
			    			
		g.drawImage(this.npcGfx,	13 + this.crystalNum * 69,									 		
							47, 															
							69 -27-13, 											
							59-47,
							(GameEngine.CENTERX + (this.x-charX)) * 64 + charMoveX - this.moveX, 	
		                    (GameEngine.CENTERY + (this.y-charY))* 64 + charMoveY - this.moveY+49, 	
		                    64, 	
		                    64 - 49 
							);
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
					if(this.crystalNum == 3)	this.player.addKeyItem(KeyItem.getKeyItem(3));
					if(this.crystalNum == 2)	this.player.addKeyItem(KeyItem.getKeyItem(0));
					if(this.crystalNum == 1)	this.player.addKeyItem(KeyItem.getKeyItem(1));
					if(this.crystalNum == 0)	this.player.addKeyItem(KeyItem.getKeyItem(2));
					this.ani.push(new Animation("Remove Crystal"));
				}
			}
		}
	}

}
