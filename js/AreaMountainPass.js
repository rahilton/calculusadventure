
class AreaMountainPass extends GameEngine {

	constructor(p, w) {
		super("MountainPass1.dat",p, w);
		this.x = 20;
		this.y = 20;
		var zone1 = new Zone("1",25,10,2);
		zone1.addMonster(3, 20);
		zone1.addMonster(4, 20);
		this.zones.push(zone1);
		var zone2 = new Zone("2",20,10,2);
		zone2.addMonster(5, 40);
		this.zones.push(zone2);
		var zone3 = new Zone("3",20,10,2);
		zone3.addMonster(6, 20);
		this.zones.push(zone3);
		this.ani.push(new Animation("Fade In"));
		var guy = new NPC("chara3.png",4,88,37);
		guy.addMessage("This pass can be pretty dangerous. You should be at least level 6 before heading through.");
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
		this.checkMovePlayer("1","Area",false,24,35,0);
		this.checkMovePlayer("2","Area",false,21,34,0); /*
		if(mobilityMap[y].substring(x,x+1).equals("1")) {
			Animation newA = new Animation("BlackOut");
			newA.addMessage(new Message("Move Player",24,35,0));
			newA.addMessage(new Message("Change Area",0));
			newA.setNext(new Animation("Fade In"));
			ani.add(newA);
			//frozen = true;
		}
		if(mobilityMap[y].substring(x,x+1).equals("2")) {
			Animation newA = new Animation("BlackOut");
			newA.addMessage(new Message("Move Player",21,34,0));
			newA.addMessage(new Message("Change Area",0));
			newA.setNext(new Animation("Fade In"));
			ani.add(newA);
			//frozen = true;
		}*/
	}


}
