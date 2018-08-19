class NPCElder extends NPC {
	
	constructor(fname, pos, xPos, yPos, lev, key, fl,p, par) {
		super(fname, pos, xPos, yPos);
		this.level = lev;
		this.keyItem = key;
		this.flag = fl;
		this.player = p;
		this.parent = par;
	}

	interact(code) {
		if(code == 32) {
			if(this.message.isClosed()) {
				this.message.openWindow();
				if(this.player.getLevel() >= this.level) {
					this.message.setPosition(1);
				}
				for(var i = 0; i < this.player.getKeyItemCount(); i++) {
					if(this.player.getKeyItem(i).getName() === this.keyItem) {
						if(this.flag == 7 || this.player.getFlag(this.flag + 4) ) {
							this.player.setFlag(this.flag, true);
							this.parent.processMessage(new Message("Change Map",this.flag));
							this.message.setPosition(2);
						}
						else {
							this.message.setPosition(3);
						}
					}
				}
				this.talking = true;
			}
			else if(this.message.isAppearing())
				this.message.finishAppearing();
			else {
				this.message.closeWindow();
				this.message.setPosition(this.message.getPosition());
				this.talking = false;
			}
		}
	}
}
