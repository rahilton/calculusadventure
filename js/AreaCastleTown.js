class AreaCastleTown extends GameEngine {
	
	constructor(p, w) {
		super("CastleTown.dat",p, w);
		this.x = 69;
		this.y = 43;
		this.ani.push(new Animation("Fade In"));
		var guy = new NPC("chara2.png",1,86,21);
		guy.addMessage("The derivative spell can be used on monsters with high amounts of hit points.");
		guy.setMoves(true);
		guy.setFrequency(64);
		this.npcs.push(guy);
		guy = new NPC("chara1.png",1,60,21);
		guy.addMessage("There are many undead monsters in the tower to the east. Undead monsters are not defeated if their HP is negative.");
		this.npcs.push(guy);
		guy = new NPC("chara2.png",2,68,32);
		guy.addMessage("If you hit an undead monster into negative HP, make sure you have the Absoluate Value skill to bring them back to positive HP.");
		guy.setMoves(true);
		guy.setFrequency(87);
		this.npcs.push(guy);
		guy = new NPC("chara2.png",5,81,16);
		guy.addMessage("Some monster will have shields to your abilities. Train the Know skills to know what shields a monster has.");
		guy.setMoves(true);
		guy.setFrequency(64);
		this.npcs.push(guy);
		guy = new NPC("chara2.png",0,78,35);
		guy.addMessage("The Crystal of Air was seen in the abandoned tower to the east.");
		guy.setMoves(true);
		guy.setFrequency(64);
		this.npcs.push(guy);
		guy = new NPC("chara2.png",6,58,28);
		guy.addMessage("The square root and divide by 2 spells can only be used when the monster has a constant HP.");
		guy.setMoves(true);
		guy.setFrequency(64);
		this.npcs.push(guy);
		guy = new NPCElder("chara7.png",0,24,13,9,"Crystal of Air",5,this.player,this.parent);
		guy.addMessage("You are not ready. See me when you are Level 9.");
		guy.addMessage("The Crystal of Air has been lost in the abandoned tower. You must recover it and bring it here.");
		guy.addMessage("You have the Air Crystal! The bridge to SnowVille can now be restored!");
		guy.addMessage("You have the Air Crystal! However, before the bridge is restored, we must wait for the tides to subside. See me again.");
		this.npcs.push(guy);
	}
	/*
	public void process(int code) {
		super.process(code);
		if(code == 67) {
			//msg.push(new Message("Open Menu"));
		}
		//System.out.println("frozen=" + frozen + "code=" + code);
		if(/*!frozen &&* !menuOpen &&  (battle == null || !battle.getActive())&&(code == 37 || code == 38 || code == 39 || code == 40)) 
			checkEvent();
	}
	
	
	public void processTime() {
		super.processTime();
		
		//if(ani.size()>0) System.out.println("Animation type"+ " " + ani.peek().getType());
		
		
		processAnimations();
		
		
	}*/
	
	checkEvent() {
		//System.out.println(mobilityMap[y]);
		if(this.mobilityMap[this.y].substring(this.x,this.x+1) === "1") {
			this.parent.processMessage(new Message("Move Player",24,20,13));
		}
		if(this.mobilityMap[this.y].substring(this.x,this.x+1) === "2") {
			this.parent.processMessage(new Message("Move Player",25,20,13));
		}
		if(this.mobilityMap[this.y].substring(this.x,this.x+1) === "3") {
			this.parent.processMessage(new Message("Move Player",74,21,13));
		}
		if(this.mobilityMap[this.y].substring(this.x,this.x+1) === "4") {
			this.parent.processMessage(new Message("Move Player",75,21,13));
		}
		this.checkMovePlayer("E","Area",false,12,13,0);
		this.checkMovePlayer("I","Shop",true,2,0,2);
		this.checkMovePlayer("i","Shop",true,2,0,3);
		this.checkMovePlayer("T","Shop",true,2,0,4);
		this.checkMovePlayer("S","Shop",true,2,0,5);
		this.checkMovePlayer("K","Shop",true,2,0,6);
		this.checkMovePlayer("P","Shop",true,2,0,7);
		this.checkMovePlayer("W","Shop",true,2,0,8);
		this.checkMovePlayer("A","Shop",true,2,0,9);
		/*
		if(mobilityMap[y].substring(x,x+1).equals("I")) {
			Animation newA = new Animation("Open Door",x,y);
			Animation newB = new Animation("BlackOut");
			Animation newC = new Animation("Close Door",x,y);
			newC.addMessage(new Message("Change Shop",2,2));
			newC.addMessage(new Message("Change Area",2));
			newC.setNext(new Animation("Fade In"));
			newB.setNext(newC);
			newA.setNext(newB);
			ani.push(newA);
			processAnimations();
			//frozen = true;
		}
		if(mobilityMap[y].substring(x,x+1).equals("i")) {
			Animation newA = new Animation("Open Door",x,y);
			Animation newB = new Animation("BlackOut");
			Animation newC = new Animation("Close Door",x,y);
			newC.addMessage(new Message("Change Shop",3,2));
			newC.addMessage(new Message("Change Area",3));
			newC.setNext(new Animation("Fade In"));
			newB.setNext(newC);
			newA.setNext(newB);
			ani.push(newA);
			processAnimations();
			//frozen = true;
		}
		if(mobilityMap[y].substring(x,x+1).equals("T")) {
			Animation newA = new Animation("Open Door",x,y);
			Animation newB = new Animation("BlackOut");
			Animation newC = new Animation("Close Door",x,y);
			newC.addMessage(new Message("Change Shop",4,2));
			newC.addMessage(new Message("Change Area",4));
			newC.setNext(new Animation("Fade In"));
			newB.setNext(newC);
			newA.setNext(newB);
			ani.push(newA);
			processAnimations();
			//frozen = true;
		}
		if(mobilityMap[y].substring(x,x+1).equals("S")) {
			Animation newA = new Animation("Open Door",x,y);
			Animation newB = new Animation("BlackOut");
			Animation newC = new Animation("Close Door",x,y);
			newC.addMessage(new Message("Change Shop",5,2));
			newC.addMessage(new Message("Change Area",5));
			newC.setNext(new Animation("Fade In"));
			newB.setNext(newC);
			newA.setNext(newB);
			ani.push(newA);
			processAnimations();
			//frozen = true;
		}
		if(mobilityMap[y].substring(x,x+1).equals("K")) {
			Animation newA = new Animation("Open Door",x,y);
			Animation newB = new Animation("BlackOut");
			Animation newC = new Animation("Close Door",x,y);
			newC.addMessage(new Message("Change Shop",6,2));
			newC.addMessage(new Message("Change Area",6));
			newC.setNext(new Animation("Fade In"));
			newB.setNext(newC);
			newA.setNext(newB);
			ani.push(newA);
			processAnimations();
			//frozen = true;
		}
		if(mobilityMap[y].substring(x,x+1).equals("P")) {
			Animation newA = new Animation("Open Door",x,y);
			Animation newB = new Animation("BlackOut");
			Animation newC = new Animation("Close Door",x,y);
			newC.addMessage(new Message("Change Shop",7,2));
			newC.addMessage(new Message("Change Area",7));
			newC.setNext(new Animation("Fade In"));
			newB.setNext(newC);
			newA.setNext(newB);
			ani.push(newA);
			processAnimations();
			//frozen = true;
		}
		if(mobilityMap[y].substring(x,x+1).equals("W")) {
			Animation newA = new Animation("Open Door",x,y);
			Animation newB = new Animation("BlackOut");
			Animation newC = new Animation("Close Door",x,y);
			newC.addMessage(new Message("Change Shop",8,2));
			newC.addMessage(new Message("Change Area",8));
			newC.setNext(new Animation("Fade In"));
			newB.setNext(newC);
			newA.setNext(newB);
			ani.push(newA);
			processAnimations();
			//frozen = true;
		}
		if(mobilityMap[y].substring(x,x+1).equals("A")) {
			Animation newA = new Animation("Open Door",x,y);
			Animation newB = new Animation("BlackOut");
			Animation newC = new Animation("Close Door",x,y);
			newC.addMessage(new Message("Change Shop",9,2));
			newC.addMessage(new Message("Change Area",9));
			newC.setNext(new Animation("Fade In"));
			newB.setNext(newC);
			newA.setNext(newB);
			ani.push(newA);
			processAnimations();
			//frozen = true;
		}
		if(mobilityMap[y].substring(x,x+1).equals("E")) {
			Animation newA = new Animation("BlackOut");
			newA.addMessage(new Message("Move Player",12,13,0));
			newA.addMessage(new Message("Change Area",0));
			newA.setNext(new Animation("Fade In"));
			ani.push(newA);
			processAnimations();
			//frozen = true;
		}*/
	}


}
