
class AreaEvilLair extends GameEngine {

	constructor(p, w) {
		super("EvilLair.dat",p, w);
		this.x = 25;
		this.y = 40;
		var zone1 = new Zone("1",25,10,10);
		zone1.addMonster(43, 20);
		zone1.addMonster(44, 20);
		zone1.addMonster(45, 20);
		zone1.addMonster(50, 40);
		this.zones.push(zone1);
		var zone2 = new Zone("2",25,10,10);
		zone2.addMonster(45, 20);
		zone2.addMonster(46, 20);
		zone2.addMonster(47, 20);
		zone2.addMonster(51, 40);
		this.zones.push(zone2);
		var zone3 = new Zone("3",25,10,10);
		zone3.addMonster(47, 20);
		zone3.addMonster(48, 20);
		zone3.addMonster(49, 20);
		zone3.addMonster(52, 40);
		this.zones.push(zone3);
		var zone4 = new Zone("4",25,10,10);
		zone4.addMonster(48, 40);
		zone4.addMonster(49, 20);
		this.zones.push(zone4);
		this.ani.push(new Animation("Fade In"));
		var guy = new NPCBoss("bosses.png",7,75,22,53,10,this.ani);
		guy.addMessage("You dare to defy Lord Calculus!? You shall never defeat me. Perish in the darkness!");
		guy.addMessage("Battle");
		this.npcs.push(guy);
		guy = new NPC("Ghosts.png",6,76,70);
		guy.addMessage("The wizards, Melmond, Erasmus, and Mystero hold the secret to defeating Lord Calculus.");
		guy.addMessage("Find one of them on each floor of the castle.");
		this.npcs.push(guy);
	}
	
	/*
	public void process(int code) {
		super.process(code);
		if(code == 67) {
			//msg.add(new Message("Open Menu"));
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
		this.checkMovePlayer("1","Area",false,41,38,0);
		this.checkMovePlayer("2","Move",false,19,71,20);
		this.checkMovePlayer("3","Move",false,31,71,20);
		this.checkMovePlayer("4","Move",false,18,24,20);
		this.checkMovePlayer("5","Move",false,32,24,20);
		this.checkMovePlayer("6","Move",false,81,85,20);
		this.checkMovePlayer("7","Move",false,33,84,20);
		this.checkMovePlayer("8","Move",false,75,31,20);
		this.checkMovePlayer("9","Move",false,73,70,20);
		/*
		if(mobilityMap[y].substring(x,x+1).equals("2")) {
			Animation newA = new Animation("BlackOut");
			newA.addMessage(new Message("Move Player",19,71,20));
			newA.setNext(new Animation("Fade In"));
			ani.add(newA);
			processAnimations();
			//frozen = true;
		}
		if(mobilityMap[y].substring(x,x+1).equals("3")) {
			Animation newA = new Animation("BlackOut");
			newA.addMessage(new Message("Move Player",31,71,20));
			newA.setNext(new Animation("Fade In"));
			ani.add(newA);
			processAnimations();
			//frozen = true;
		}
		if(mobilityMap[y].substring(x,x+1).equals("4")) {
			Animation newA = new Animation("BlackOut");
			newA.addMessage(new Message("Move Player",18,24,20));
			newA.setNext(new Animation("Fade In"));
			ani.add(newA);
			processAnimations();
			//frozen = true;
		}
		if(mobilityMap[y].substring(x,x+1).equals("5")) {
			Animation newA = new Animation("BlackOut");
			newA.addMessage(new Message("Move Player",32,24,20));
			newA.setNext(new Animation("Fade In"));
			ani.add(newA);
			processAnimations();
			//frozen = true;
		}
		if(mobilityMap[y].substring(x,x+1).equals("6")) {
			Animation newA = new Animation("BlackOut");
			newA.addMessage(new Message("Move Player",81,85,20));
			newA.setNext(new Animation("Fade In"));
			ani.add(newA);
			processAnimations();
			//frozen = true;
		}
		if(mobilityMap[y].substring(x,x+1).equals("7")) {
			Animation newA = new Animation("BlackOut");
			newA.addMessage(new Message("Move Player",33,84,20));
			newA.setNext(new Animation("Fade In"));
			ani.add(newA);
			processAnimations();
			//frozen = true;
		}
		if(mobilityMap[y].substring(x,x+1).equals("8")) {
			Animation newA = new Animation("BlackOut");
			newA.addMessage(new Message("Move Player",75,31,20));
			newA.setNext(new Animation("Fade In"));
			ani.add(newA);
			processAnimations();
			//frozen = true;
		}
		if(mobilityMap[y].substring(x,x+1).equals("9")) {
			Animation newA = new Animation("BlackOut");
			newA.addMessage(new Message("Move Player",73,70,20));
			newA.setNext(new Animation("Fade In"));
			ani.add(newA);
			processAnimations();
			//frozen = true;
		}
		
		if(mobilityMap[y].substring(x,x+1).equals("1")) {
			Animation newA = new Animation("BlackOut");
			newA.addMessage(new Message("Move Player",41,38,0));
			newA.addMessage(new Message("Change Area",0));
			newA.setNext(new Animation("Fade In"));
			ani.add(newA);
			processAnimations();
			//frozen = true;
		}*/
	}
}
