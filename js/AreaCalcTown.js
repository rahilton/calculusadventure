
class AreaCalcTown extends GameEngine {
	
	constructor(p, w) {
		super("CalcTown2.dat",p, w);
		this.x = 20;
		this.y = 20;
		this.ani.push(new Animation("Fade In"));
		var guy = new NPC("chara.png",1,18,18);
		guy.addMessage("Every town has the same seven shops.");
		guy.setMoves(true);
		guy.setFrequency(64);
		this.npcs.push(guy);
		guy = new NPC("chara.png",2,34,14);
		guy.addMessage("Make sure you equip your weapons and armor after you have purchased it.");
		guy.setMoves(true);
		guy.setFrequency(128);
		this.npcs.push(guy);
		guy = new NPC("chara.png",4,16,15);
		guy.addMessage("The only way to make money is by trading. Buy something at a low price, and sell it in another town for more.");
		this.npcs.push(guy);
		guy = new NPC("chara.png",5,16,26);
		guy.addMessage("You can train a level once you have earned enough experience. Train levels at the training facility.");
		this.npcs.push(guy);
		guy = new NPC("chara1.png",0,29,14);
		guy.addMessage("You must train a skill or spell multiple times before you can use it in battle.");
		guy.setMoves(true);
		guy.setFrequency(80);
		this.npcs.push(guy);
		guy = new NPC("chara1.png",1,42,26);
		guy.addMessage("After you have trained a spell, you can keep training it. Every level reduces the cost to use it.");
		guy.setMoves(true);
		guy.setFrequency(20);
		this.npcs.push(guy);
		guy = new NPC("chara1.png",2,43,16);
		guy.addMessage("Make sure you train the Heal spell. It gets more powerful the higher its level.");
		this.npcs.push(guy);
		guy = new NPC("chara1.png",3,33,30);
		guy.addMessage("If you follow the road to the south, you'll find Derivative Dell.");
		guy.setMoves(true);
		guy.setFrequency(100);
		this.npcs.push(guy);
		
		///////////////////////////////////////
		//guy = NPCQuestGiver.getQuestGiver(0, this.player, this.parent);
		//this.npcs.push(guy);
		
		
	}
	/*
	public void process(int code) {
		super.process(code);
		if(code == 67) {
			//msg.add(new Message("Open Menu"));
		}
		//System.out.println("frozen=" + frozen + "code=" + code);
		if(/*!frozen &&* !menuOpen && (battle == null || !battle.getActive())&&(code == 37 || code == 38 || code == 39 || code == 40)) 
			checkEvent();
	}
	
	public void processTime() {
		super.processTime();
		
		//if(ani.size()>0) System.out.println("Animation type"+ " " + ani.peek().getType());
		
		
		processAnimations();
		
		
	}*/
	
	checkEvent() {
		//System.out.println(mobilityMap[y]);
		this.checkMovePlayer("1","Area",false,13,47,0);
		this.checkMovePlayer("I","Shop",true,0,0,2);
		this.checkMovePlayer("S","Shop",true,0,0,3);
		this.checkMovePlayer("T","Shop",true,0,0,4);
		this.checkMovePlayer("M","Shop",true,0,0,5);
		this.checkMovePlayer("3","Shop",true,0,0,6);
		this.checkMovePlayer("2","Shop",true,0,0,7);
		this.checkMovePlayer("4","Shop",true,0,0,8);
		this.checkMovePlayer("5","Shop",true,0,0,9);
		/*
		if(mobilityMap[y].substring(x,x+1).equals("1")) {
			Animation newA = new Animation("BlackOut");
			newA.addMessage(new Message("Move Player",13,47,0));
			newA.addMessage(new Message("Change Area",0));
			newA.setNext(new Animation("Fade In"));
			ani.add(newA);
			processAnimations();
			//frozen = true;
		}
		if(mobilityMap[y].substring(x,x+1).equals("I")) {
			Animation newA = new Animation("Open Door",x,y);
			Animation newB = new Animation("BlackOut");
			Animation newC = new Animation("Close Door",x,y);
			newC.addMessage(new Message("Change Shop",2,0));
			newC.addMessage(new Message("Change Area",2));
			newC.setNext(new Animation("Fade In"));
			newB.setNext(newC);
			newA.setNext(newB);
			ani.add(newA);
			processAnimations();
			//frozen = true;
		}
		if(mobilityMap[y].substring(x,x+1).equals("S")) {
			Animation newA = new Animation("Open Door",x,y);
			Animation newB = new Animation("BlackOut");
			Animation newC = new Animation("Close Door",x,y);
			newC.addMessage(new Message("Change Shop",3,0));
			newC.addMessage(new Message("Change Area",3));
			newC.setNext(new Animation("Fade In"));
			newB.setNext(newC);
			newA.setNext(newB);
			ani.add(newA);
			processAnimations();
			//frozen = true;
		}
		if(mobilityMap[y].substring(x,x+1).equals("T")) {
			Animation newA = new Animation("Open Door",x,y);
			Animation newB = new Animation("BlackOut");
			Animation newC = new Animation("Close Door",x,y);
			newC.addMessage(new Message("Change Shop",4,0));
			newC.addMessage(new Message("Change Area",4));
			newC.setNext(new Animation("Fade In"));
			newB.setNext(newC);
			newA.setNext(newB);
			ani.add(newA);
			processAnimations();
			//frozen = true;
		}
		if(mobilityMap[y].substring(x,x+1).equals("M")) {
			Animation newA = new Animation("Open Door",x,y);
			Animation newB = new Animation("BlackOut");
			Animation newC = new Animation("Close Door",x,y);
			newC.addMessage(new Message("Change Shop",5,0));
			newC.addMessage(new Message("Change Area",5));
			newC.setNext(new Animation("Fade In"));
			newB.setNext(newC);
			newA.setNext(newB);
			ani.add(newA);
			processAnimations();
			//frozen = true;
		}
		if(mobilityMap[y].substring(x,x+1).equals("3")) {
			Animation newA = new Animation("Open Door",x,y);
			Animation newB = new Animation("BlackOut");
			Animation newC = new Animation("Close Door",x,y);
			newC.addMessage(new Message("Change Shop",6,0));
			newC.addMessage(new Message("Change Area",6));
			newC.setNext(new Animation("Fade In"));
			newB.setNext(newC);
			newA.setNext(newB);
			ani.add(newA);
			processAnimations();
			//frozen = true;
		}
		if(mobilityMap[y].substring(x,x+1).equals("2")) {
			Animation newA = new Animation("Open Door",x,y);
			Animation newB = new Animation("BlackOut");
			Animation newC = new Animation("Close Door",x,y);
			newC.addMessage(new Message("Change Shop",7,0));
			newC.addMessage(new Message("Change Area",7));
			newC.setNext(new Animation("Fade In"));
			newB.setNext(newC);
			newA.setNext(newB);
			ani.add(newA);
			processAnimations();
			//frozen = true;
		}
		if(mobilityMap[y].substring(x,x+1).equals("4")) {
			Animation newA = new Animation("Open Door",x,y);
			Animation newB = new Animation("BlackOut");
			Animation newC = new Animation("Close Door",x,y);
			newC.addMessage(new Message("Change Shop",8,0));
			newC.addMessage(new Message("Change Area",8));
			newC.setNext(new Animation("Fade In"));
			newB.setNext(newC);
			newA.setNext(newB);
			ani.add(newA);
			processAnimations();
			//frozen = true;
		}
		if(mobilityMap[y].substring(x,x+1).equals("5")) {
			Animation newA = new Animation("Open Door",x,y);
			Animation newB = new Animation("BlackOut");
			Animation newC = new Animation("Close Door",x,y);
			newC.addMessage(new Message("Change Shop",9,0));
			newC.addMessage(new Message("Change Area",9));
			newC.setNext(new Animation("Fade In"));
			newB.setNext(newC);
			newA.setNext(newB);
			ani.add(newA);
			processAnimations();
			//frozen = true;
		}*/
	}


}
