
class AreaForest extends GameEngine {

    constructor(p, w) {
		super("Forest1.dat",p, w);
		this.x = 10;
		this.y = 10;
		var zone1 = new Zone("1",25,10,4);
		zone1.addMonster(10, 20);
		zone1.addMonster(11, 20);
		zone1.addMonster(12, 20);
		this.zones.push(zone1);
		var zone2 = new Zone("2",25,10,4);
		zone2.addMonster(11, 20);
		zone2.addMonster(12, 20);
		this.zones.push(zone2);
		this.ani.push(new Animation("Fade In"));
		/*
		NPC guy = new NPC("chara.png",1,18,18);
		guy.addMessage("Hello!");
		guy.setMoves(true);
		guy.setFrequency(64);
		npcs.add(guy);
		*/
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
		this.checkMovePlayer("1","Area",false,18,24,0);
		this.checkMovePlayer("2","Area",false,15,20,0);/*
		if(mobilityMap[y].substring(x,x+1).equals("1")) {
			Animation newA = new Animation("BlackOut");
			newA.addMessage(new Message("Move Player",18,24,0));
			newA.addMessage(new Message("Change Area",0));
			newA.setNext(new Animation("Fade In"));
			ani.add(newA);
			processAnimations();
			//frozen = true;
		}
		if(mobilityMap[y].substring(x,x+1).equals("2")) {
			Animation newA = new Animation("BlackOut");
			newA.addMessage(new Message("Move Player",15,20,0));
			newA.addMessage(new Message("Change Area",0));
			newA.setNext(new Animation("Fade In"));
			ani.add(newA);
			processAnimations();
			//frozen = true;
		}*/
	}


}
