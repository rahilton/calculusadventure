
class AreaDerivativeDell extends GameEngine {

	constructor(p, w) {
		super("DerivativeDell.dat",p, w);
		this.x = 19;
		this.y = 50;
		this.ani.push(new Animation("Fade In"));
		var guy = new NPC("chara.png",1,17,29);
		guy.addMessage("Don't go too far from Derivative Dell. The monsters are more difficult to defeat the farther you are from town.");
		guy.setMoves(true);
		guy.setFrequency(64);
		this.npcs.push(guy);
		guy = new NPC("chara1.png",1,35,36);
		guy.addMessage("Many monsters have an equation as their HP. Try the Plug In skill to make it a constant.");
		this.npcs.push(guy);
		guy = new NPC("chara2.png",1,12,48);
		guy.addMessage("Lord Calculus is an evil blight upon this land. You can see his island if you travel east of here.");
		guy.setMoves(true);
		guy.setFrequency(87);
		this.npcs.push(guy);
		guy = new NPC("chara.png",5,41,36);
		guy.addMessage("If you max out a stat, skill, or spell at one training facility, try training at a different facility.");
		guy.setMoves(true);
		guy.setFrequency(64);
		this.npcs.push(guy);
		guy = new NPC("chara2.png",0,34,47);
		guy.addMessage("To the north, you can find the mountain pass that heads to the Earth Cave. An old man lives in a tent by the pass.");
		guy.setMoves(true);
		guy.setFrequency(64);
		this.npcs.push(guy);
		guy = new NPC("chara.png",4,14,40);
		guy.addMessage("The bridge to the north has been broken for a long time. The village elder may know how to restore the bridge.");
		guy.setMoves(true);
		guy.setFrequency(64);
		this.npcs.push(guy);
		guy = new NPCElder("chara5.png",5,19,9,5,"Crystal of Earth",4,this.player,this.parent);
		guy.addMessage("I have a task for you, but you are not ready. Speak to me again when you are Level 5.");
		guy.addMessage("To repair the bridge, the Crystal of Earth must be recovered from the Earth Cave. Bring the crystal back to me.");
		guy.addMessage("Ah, that is the Earth Crystal. I will use it's power to restore the bridge. When you get there it will be restored.");
		guy.addMessage("Ah, that is the Earth Crystal. However, before the bridge is restored, we must wait for the good weather. See me again.");
		this.npcs.push(guy);
	}
	/*
	public void process(int code) {
		super.process(code);
		if(code == 67) {
			player.addKeyItem(new KeyItem("Crystal of Earth", "The crystal taken from the Earth Cave."));

		}
		if(/*!frozen && *!menuOpen &&  (battle == null || !battle.getActive())&&(code == 37 || code == 38 || code == 39 || code == 40)) 
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
			this.parent.processMessage(new Message("Move Player",19,13,14));
		}
		if(this.mobilityMap[this.y].substring(this.x,this.x+1)  === "3") {
			this.parent.processMessage(new Message("Move Player",19,49,14));
		}
		this.checkMovePlayer("1","Area",false,24,73,0);
		this.checkMovePlayer("I","Shop",true,1,0,2);
		this.checkMovePlayer("i","Shop",true,1,0,3);
		this.checkMovePlayer("T","Shop",true,1,0,4);
		this.checkMovePlayer("S","Shop",true,1,0,5);
		this.checkMovePlayer("K","Shop",true,1,0,6);
		this.checkMovePlayer("P","Shop",true,1,0,7);
		this.checkMovePlayer("W","Shop",true,1,0,8);
		this.checkMovePlayer("A","Shop",true,1,0,9);
	
	}


}
