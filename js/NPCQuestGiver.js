class NPCQuestGiver extends NPC {
	
	constructor(fname, pos, xPos, yPos, n, key, fl, p, par) {
		super(fname, pos, xPos, yPos);
		this.keyItem = key;
		this.flag = fl;
		this.player = p;
		this.parent = par;
		this.name = n;
	}
	
	interact(code) {
		
		if(this.name === "Island") {
			this.islandLogic(code);
		}
	}

	islandLogic(code) {
		if(code == 32) {
			if(this.message.isClosed()) {
				this.message.openWindow();
				var haveItem = false;
				for(var i = 0; i < this.player.getKeyItemCount(); i++) {
					if(this.player.getKeyItem(i).getName() === this.keyItem) 
						haveItem = true;
				}
				if(haveItem) {
					this.message.setPosition(3);
				}
				else {
					if(this.player.getFlag(this.flag) ) {
						this.message.setPosition(5);
						this.message.clearEquations();
						this.player.addKeyItem(KeyItem.getKeyItem(4));
						this.curQuest = Questions.getIslandProblem(this.player, this.parent);
						this.parent.processMessage(new Message("Move Island", this.curQuest));
					}
					else {
						this.message.setPosition(0);
						this.message.clearEquations();
						this.player.addKeyItem(KeyItem.getKeyItem(4));
						this.curQuest = Questions.getIslandProblem(this.player, this.parent);
						this.parent.processMessage(new Message("Move Island", this.curQuest));
					}
				}
				this.talking = true;
			}
			else if(this.message.isAppearing())
				this.message.finishAppearing();
			else {
				if(this.message.getPosition() < 4) {
					this.message.nextText();
					if(this.message.getPosition() == 4) {
						var eqs = this.curQuest.getQuestions();
						this.message.addEquation(eqs[0], 20, 200);
						this.message.addEquation(eqs[1], 300, 200);
						
					}
				}
				else if (this.message.getPosition() == 5){
					this.message.setPosition(3);
				}
				else {
					this.message.closeWindow();
					this.message.setPosition(this.message.getPosition());
					this.talking = false;
				}
			}
		}
	}	
}

NPCQuestGiver.getQuestGiver = function(num, player, parent) {
	var guy = null;
	if(num == 0) {
		guy = new NPCQuestGiver("chara1.png",3,33,30,"Island","Beacon",10,player,parent);
		guy.addMessage("There is an island that floats high above the sky. I've heard that it moves around a lot.");
		guy.addMessage("If you were to use this beacon directly below the island, you could be transported to it.");
		guy.addMessage("When you have reached the island, come back and tell me.");
		guy.addMessage(new WindowMessage("You receive a beacon.",false));
		guy.addMessage("From this city, to find the island you should travel:");
		guy.addMessage("Do you wish to return to the island? Here, have another beacon.");
		
	}
	
	return guy;
}
