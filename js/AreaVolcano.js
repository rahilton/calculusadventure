
class AreaVolcano extends GameEngine {

	constructor(p, w) {
		super("Volcano.dat",p, w);
		this.x = 86;
		this.y = 19;
		var zone1 = new Zone("1",25,10,8);
		zone1.addMonster(34, 20);
		zone1.addMonster(35, 20);
		zone1.addMonster(36, 20);
		this.zones.push(zone1);
		var zone2 = new Zone("2",25,10,8);
		zone2.addMonster(34, 20);
		zone2.addMonster(35, 20);
		zone2.addMonster(36, 20);
		zone2.addMonster(37, 20);
		this.zones.push(zone2);
		var zone3 = new Zone("3",25,10,8);
		zone3.addMonster(36, 20);
		zone3.addMonster(37, 20);
		zone3.addMonster(38, 20);
		zone3.addMonster(39, 20);
		this.zones.push(zone3);
		var zone4 = new Zone("4",25,16,8);
		zone4.addMonster(37, 20);
		zone4.addMonster(38, 20);
		zone4.addMonster(39, 20);
		this.zones.push(zone4);
		this.ani.push(new Animation("Fade In"));
		if(!this.player.getFlag(3)) {
			var guy = new NPCBoss("bosses.png",0,86,15,40,8,this.ani);
			guy.addMessage("Burn in the flames and perish!");
			guy.addMessage("Battle");
			this.npcs.push(guy);
		}
		var makeCrystal = true;
		
		for(var i = 0; i < this.player.getKeyItemCount(); i++) {
			if(this.player.getKeyItem(i).getName() === "Crystal of Fire")
				makeCrystal = false;
		}
		if(makeCrystal) {
			var cry = new NPCCrystal(85,14,3,this.ani, this.player);
			cry.addMessage("You now have the Crystal of Fire!");
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
		this.checkMovePlayer("1","Area",false,53,72,0);
		this.checkMovePlayer("2","Move",false,31,89,19);
		this.checkMovePlayer("3","Move",false,13,15,19);
		this.checkMovePlayer("4","Move",false,85,65,19);
		this.checkMovePlayer("5","Move",false,28,44,19);
		this.checkMovePlayer("6","Move",false,86,19,19);
		this.checkMovePlayer("7","Move",false,83,94,19);
		/*
		if(mobilityMap[y].substring(x,x+1).equals("2")) {
			Animation newA = new Animation("BlackOut");
			newA.addMessage(new Message("Move Player",31,89,19));
			newA.setNext(new Animation("Fade In"));
			ani.add(newA);
			processAnimations();
		}
		if(mobilityMap[y].substring(x,x+1).equals("3")) {
			Animation newA = new Animation("BlackOut");
			newA.addMessage(new Message("Move Player",13,15,19));
			newA.setNext(new Animation("Fade In"));
			ani.add(newA);
			processAnimations();
		}
		if(mobilityMap[y].substring(x,x+1).equals("4")) {
			Animation newA = new Animation("BlackOut");
			newA.addMessage(new Message("Move Player",85,65,19));
			newA.setNext(new Animation("Fade In"));
			ani.add(newA);
			processAnimations();
		}
		if(mobilityMap[y].substring(x,x+1).equals("5")) {
			Animation newA = new Animation("BlackOut");
			newA.addMessage(new Message("Move Player",28,44,19));
			newA.setNext(new Animation("Fade In"));
			ani.add(newA);
			processAnimations();
		}
		if(mobilityMap[y].substring(x,x+1).equals("6")) {
			Animation newA = new Animation("BlackOut");
			newA.addMessage(new Message("Move Player",86,19,19));
			newA.setNext(new Animation("Fade In"));
			ani.add(newA);
			processAnimations();
		}
		if(mobilityMap[y].substring(x,x+1).equals("7")) {
			Animation newA = new Animation("BlackOut");
			newA.addMessage(new Message("Move Player",83,94,19));
			newA.setNext(new Animation("Fade In"));
			ani.add(newA);
			processAnimations();
		}
		if(mobilityMap[y].substring(x,x+1).equals("1")) {
			Animation newA = new Animation("BlackOut");
			newA.addMessage(new Message("Move Player",53,72,0));
			newA.addMessage(new Message("Change Area",0));
			newA.setNext(new Animation("Fade In"));
			ani.add(newA);
			processAnimations();
		}*/
	}
}
