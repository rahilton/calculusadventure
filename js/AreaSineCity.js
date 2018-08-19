class AreaSineCity extends GameEngine {

	constructor(p, w) {
		super("SineCity.dat",p, w);
		this.x = 15;
		this.y = 37;
		this.ani.push(new Animation("Fade In"));
		var guy = new NPC("chara2.png",1,10,38);
		guy.addMessage("The Integrate spell requires that you train a lower limit and an upper limit before you use it.");
		guy.setMoves(true);
		guy.setFrequency(64);
		this.npcs.push(guy);
		guy = new NPC("chara.png",1,11,48);
		guy.addMessage("The volcano is to the west. There are many fire monsters there.");
		this.npcs.push(guy);
		guy = new NPC("chara.png",2,14,35);
		guy.addMessage("The Crystal of Fire is somewhere deep in the volcano.");
		guy.setMoves(true);
		guy.setFrequency(87);
		this.npcs.push(guy);
		guy = new NPC("chara2.png",5,25,14);
		guy.addMessage("Lord Calculus' castle is on an island northwest of here.");
		guy.setMoves(true);
		guy.setFrequency(64);
		this.npcs.push(guy);
		guy = new NPC("chara1.png",0,30,35);
		guy.addMessage("Lord Calculus cannot be defeated by driving his HP to zero. Find the secret to defeating him in his castle.");
		guy.setMoves(true);
		guy.setFrequency(57);
		this.npcs.push(guy);
		guy = new NPC("chara2.png",6,50,37);
		guy.addMessage("Monsters with a +C will resurrect after their defeat. Use derivative to remove the +C.");
		guy.setMoves(true);
		guy.setFrequency(64);
		this.npcs.push(guy);
		guy = new NPCElder("chara5.png",7,64,26,16,"Crystal of Fire",7,this.player,this.parent);
		guy.addMessage("I do not talk to weaklings. Get to level 16.");
		guy.addMessage("Return here with the Crystal of Fire from the volcano.");
		guy.addMessage("Finally, the bridge to Lord Calculus can be repaired. Go and defeat him!");
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
		if(this.mobilityMap[this.y].substring(this.x,this.x+1) === "3") {
			this.parent.processMessage(new Message("Move Player",64,53,18));
		}
		if(this.mobilityMap[this.y].substring(this.x,this.x+1) === "2") {
			this.parent.processMessage(new Message("Move Player",64,31,18));
		}
		this.checkMovePlayer("1","Area",false,72,73,0);
		this.checkMovePlayer("I","Shop",true,4,0,2);
		this.checkMovePlayer("i","Shop",true,4,0,3);
		this.checkMovePlayer("T","Shop",true,4,0,4);
		this.checkMovePlayer("S","Shop",true,4,0,5);
		this.checkMovePlayer("K","Shop",true,4,0,6);
		this.checkMovePlayer("P","Shop",true,4,0,7);
		this.checkMovePlayer("W","Shop",true,4,0,8);
		this.checkMovePlayer("A","Shop",true,4,0,9); /*
		if(mobilityMap[y].substring(x,x+1).equals("I")) {
			Animation newA = new Animation("Open Door",x,y);
			Animation newB = new Animation("BlackOut");
			Animation newC = new Animation("Close Door",x,y);
			newC.addMessage(new Message("Change Shop",2,4));
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
			newC.addMessage(new Message("Change Shop",3,4));
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
			newC.addMessage(new Message("Change Shop",4,4));
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
			newC.addMessage(new Message("Change Shop",5,4));
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
			newC.addMessage(new Message("Change Shop",6,4));
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
			newC.addMessage(new Message("Change Shop",7,4));
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
			newC.addMessage(new Message("Change Shop",8,4));
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
			newC.addMessage(new Message("Change Shop",9,4));
			newC.addMessage(new Message("Change Area",9));
			newC.setNext(new Animation("Fade In"));
			newB.setNext(newC);
			newA.setNext(newB);
			ani.push(newA);
			processAnimations();
			//frozen = true;
		}
		if(mobilityMap[y].substring(x,x+1).equals("1")) {
			Animation newA = new Animation("BlackOut");
			newA.addMessage(new Message("Move Player",72,73,0));
			newA.addMessage(new Message("Change Area",0));
			newA.setNext(new Animation("Fade In"));
			ani.push(newA);
			processAnimations();
			//frozen = true;
		}*/
	}


}
