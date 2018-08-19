
class AreaIceDungeon extends GameEngine {

	constructor(p, w) {
		super("IceDungeon.dat",p, w);
		this.x = 17;
		this.y = 30;
		var zone1 = new Zone("1",25,10,7);
		zone1.addMonster(23, 20);
		zone1.addMonster(24, 20);
		zone1.addMonster(25, 20);
		zone1.addMonster(26, 20);
		this.zones.push(zone1);
		var zone2 = new Zone("2",25,10,7);
		zone2.addMonster(24, 40);
		zone2.addMonster(25, 30);
		zone2.addMonster(26, 20);
		zone2.addMonster(27, 20);
		this.zones.push(zone2);
		var zone3 = new Zone("3",25,10,7);
		zone3.addMonster(24, 20);
		zone3.addMonster(25, 30);
		zone3.addMonster(26, 40);
		zone3.addMonster(27, 40);
		this.zones.push(zone3);
		this.ani.push(new Animation("Fade In"));
		
		if(!this.player.getFlag(2)) {
			var guy = new NPCBoss("bosses.png",1,34,28,28,7,this.ani);
			guy.addMessage("The Crystal of Water is mine! Be washed away in the flood!");
			guy.addMessage("Battle");
			this.npcs.push(guy);
		}
		var makeCrystal = true;
		
		for(var i = 0; i < this.player.getKeyItemCount(); i++) {
			if(this.player.getKeyItem(i).getName() === "Crystal of Water")
				makeCrystal = false;
		}
		if(makeCrystal) {
			var cry = new NPCCrystal(35,28,0,this.ani, this.player);
			cry.addMessage("You now have the Crystal of Water!");
			this.npcs.push(cry);
		}
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
		this.checkMovePlayer("1","Move",false,35,48,17);
		this.checkMovePlayer("2","Move",false,10,9,17);
		this.checkMovePlayer("E","Area",false,67,6,0);/*
		if(mobilityMap[y].substring(x,x+1).equals("1")) {
			Animation newA = new Animation("BlackOut");
			newA.addMessage(new Message("Move Player",35,48,17));
			newA.setNext(new Animation("Fade In"));
			ani.add(newA);
			//frozen = true;
		}
		if(mobilityMap[y].substring(x,x+1).equals("2")) {
			Animation newA = new Animation("BlackOut");
			newA.addMessage(new Message("Move Player",10,9,17));
			newA.setNext(new Animation("Fade In"));
			ani.add(newA);
			//frozen = true;
		}
		if(mobilityMap[y].substring(x,x+1).equals("E")) {
			Animation newA = new Animation("BlackOut");
			newA.addMessage(new Message("Move Player",67,6,0));
			newA.addMessage(new Message("Change Area",0));
			newA.setNext(new Animation("Fade In"));
			ani.add(newA);
			//frozen = true;
		}*/
	}
}
