
class AreaSnowVille extends GameEngine {

	constructor(p, w) {
		super("Snowville.dat",p, w);
		this.x = 14;
		this.y = 9;
		this.ani.push(new Animation("Fade In"));
		var guy = new NPC("chara2.png",1,11,19);
		guy.addMessage("Make sure to keep up with your training!");
		guy.setMoves(true);
		guy.setFrequency(64);
		this.npcs.push(guy);
		guy = new NPC("chara4.png",1,21,17);
		guy.addMessage("The Crystal of Water can be found in the Ice Dungeon.");
		this.npcs.push(guy);
		guy = new NPC("chara4.png",2,13,34);
		guy.addMessage("The Sea Serpent will require you to make his HP be in a certain range before you can defeat him.");
		guy.setMoves(true);
		guy.setFrequency(87);
		this.npcs.push(guy);
		guy = new NPC("chara4.png",5,27,31);
		guy.addMessage("The Remove Term spell only works when there is more than one term.");
		guy.setMoves(true);
		guy.setFrequency(64);
		this.npcs.push(guy);
		guy = new NPC("chara4.png",0,28,17);
		guy.addMessage("When you add or subtract term, you can control the monsters HP.");
		guy.setMoves(true);
		guy.setFrequency(57);
		this.npcs.push(guy);
		guy = new NPC("chara4.png",6,17,34);
		guy.addMessage("You must defeated the Ice Cube monster in one turn.");
		guy.setMoves(true);
		guy.setFrequency(64);
		this.npcs.push(guy);
		guy = new NPCElder("chara6.png",4,52,35,13,"Crystal of Water",6,this.player,this.parent);
		guy.addMessage("Prove that you are worthy. Return to me when you are Level 13.");
		guy.addMessage("You must find the Crystal of Water. Go to the Ice Dungeon.");
		guy.addMessage("Ah yes! The Water Crystal. Now you can go across the bridge to the south.");
		guy.addMessage("Ah yes! The Water Crystal. When the sun has returned, we can repair the bridge to the south.");
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
		if(this.mobilityMap[this.y].substring(this.x,this.x+1) === "2") {
			this.parent.processMessage(new Message("Move Player",52,38,16));
		}
		if(this.mobilityMap[this.y].substring(this.x,this.x+1) === "3") {
			this.parent.processMessage(new Message("Move Player",22,39,16));
		}
		this.checkMovePlayer("1","Area",false,57,12,0);
		this.checkMovePlayer("I","Shop",true,3,0,2);
		this.checkMovePlayer("i","Shop",true,3,0,3);
		this.checkMovePlayer("T","Shop",true,3,0,4);
		this.checkMovePlayer("S","Shop",true,3,0,5);
		this.checkMovePlayer("K","Shop",true,3,0,6);
		this.checkMovePlayer("P","Shop",true,3,0,7);
		this.checkMovePlayer("W","Shop",true,3,0,8);
		this.checkMovePlayer("A","Shop",true,3,0,9);/*
		if(mobilityMap[y].substring(x,x+1).equals("I")) {
			Animation newA = new Animation("Open Door",x,y);
			Animation newB = new Animation("BlackOut");
			Animation newC = new Animation("Close Door",x,y);
			newC.addMessage(new Message("Change Shop",2,3));
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
			newC.addMessage(new Message("Change Shop",3,3));
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
			newC.addMessage(new Message("Change Shop",4,3));
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
			newC.addMessage(new Message("Change Shop",5,3));
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
			newC.addMessage(new Message("Change Shop",6,3));
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
			newC.addMessage(new Message("Change Shop",7,3));
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
			newC.addMessage(new Message("Change Shop",8,3));
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
			newC.addMessage(new Message("Change Shop",9,3));
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
			newA.addMessage(new Message("Move Player",57,12,0));
			newA.addMessage(new Message("Change Area",0));
			newA.setNext(new Animation("Fade In"));
			ani.push(newA);
			processAnimations();
			//frozen = true;
		}*/
	}


}
