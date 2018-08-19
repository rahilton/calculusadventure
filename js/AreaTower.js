
class AreaTower extends GameEngine {


	constructor(p, w) {
		super("Tower.dat",p, w);
		this.x = 16;
		this.y = 54;
		var zone1 = new Zone("1",25,10,5);
		zone1.addMonster(15, 20);
		this.zones.push(zone1);
		var zone2 = new Zone("2",25,10,5);
		zone2.addMonster(15, 20);
		zone2.addMonster(16, 20);
		this.zones.push(zone2);
		var zone3 = new Zone("3",25,10,5);
		zone3.addMonster(15, 20);
		zone3.addMonster(16, 20);
		zone3.addMonster(17, 20);
		this.zones.push(zone3);
		var zone4 = new Zone("4",25,16,5);
		zone4.addMonster(16, 40);
		zone4.addMonster(17, 20);
		this.zones.push(zone4);
		var zone5 = new Zone("5",25,17,5);
		zone5.addMonster(16, 20);
		zone5.addMonster(17, 20);
		zone5.addMonster(18, 20);
		this.zones.push(zone5);
		var zone6 = new Zone("6",25,17,5);
		zone6.addMonster(16, 20);
		zone6.addMonster(17, 30);
		zone6.addMonster(18, 40);
		this.zones.push(zone6);
		
		if(!this.player.getFlag(1)) {
			var guy = new NPCBoss("bosses.png",5,16,52,19,5,this.ani);
			guy.addMessage("Feel the wrath of the wind!!");
			guy.addMessage("Battle");
			this.npcs.push(guy);
		}
		var makeCrystal = true;
		
		for(var i = 0; i < this.player.getKeyItemCount(); i++) {
			if(this.player.getKeyItem(i).getName() === "Crystal of Air")
				makeCrystal = false;
		}
		if(makeCrystal) {
			var cry = new NPCCrystal(16,51,1,this.ani, this.player);
			cry.addMessage("You now have the Crystal of Air!");
			this.npcs.push(cry);
		}
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
		this.checkMovePlayer("1","Move",false,58,15,15);
		this.checkMovePlayer("2","Move",false,63,15,15);
		this.checkMovePlayer("3","Move",false,60,21,15);
		this.checkMovePlayer("4","Move",false,90,20,15);
		this.checkMovePlayer("5","Move",false,81,20,15);
		this.checkMovePlayer("6","Move",false,81,25,15);
		this.checkMovePlayer("7","Move",false,88,25,15);
		this.checkMovePlayer("8","Move",false,90,50,15);
		this.checkMovePlayer("9","Move",false,85,50,15);
		this.checkMovePlayer("0","Move",false,81,50,15);
		this.checkMovePlayer("!","Move",false,85,54,15);
		this.checkMovePlayer("@","Move",false,63,55,15);
		this.checkMovePlayer("#","Move",false,63,58,15);
		this.checkMovePlayer("$","Move",false,54,58,15);
		this.checkMovePlayer("%","Move",false,16,58,15);
		this.checkMovePlayer("a","Move",false,17,15,15);
		this.checkMovePlayer("b","Move",false,21,15,15);
		this.checkMovePlayer("c","Move",false,17,21,15);
		this.checkMovePlayer("d","Move",false,63,18,15);
		this.checkMovePlayer("e","Move",false,58,20,15);
		this.checkMovePlayer("f","Move",false,54,25,15);
		this.checkMovePlayer("g","Move",false,60,25,15);
		this.checkMovePlayer("h","Move",false,90,15,15);
		this.checkMovePlayer("i","Move",false,86,15,15);
		this.checkMovePlayer("j","Move",false,81,15,15);
		this.checkMovePlayer("k","Move",false,84,20,15);
		this.checkMovePlayer("l","Move",false,90,54,15);
		this.checkMovePlayer("m","Move",false,90,59,15);
		this.checkMovePlayer("n","Move",false,81,58,15);
		this.checkMovePlayer("o","Move",false,58,58,15);
		this.checkMovePlayer("E","Area",false,48,26,0);
		/*
		if(mobilityMap[y].substring(x,x+1).equals("1")) {
			Animation newA = new Animation("BlackOut");
			newA.addMessage(new Message("Move Player",58,15,15));
			newA.setNext(new Animation("Fade In"));
			ani.add(newA);
			processAnimations();
		}
		if(mobilityMap[y].substring(x,x+1).equals("2")) {
			Animation newA = new Animation("BlackOut");
			newA.addMessage(new Message("Move Player",63,15,15));
			newA.setNext(new Animation("Fade In"));
			ani.add(newA);
			processAnimations();
		}
		if(mobilityMap[y].substring(x,x+1).equals("3")) {
			Animation newA = new Animation("BlackOut");
			newA.addMessage(new Message("Move Player",60,21,15));
			newA.setNext(new Animation("Fade In"));
			ani.add(newA);
			processAnimations();
		}
		if(mobilityMap[y].substring(x,x+1).equals("4")) {
			Animation newA = new Animation("BlackOut");
			newA.addMessage(new Message("Move Player",90,20,15));
			newA.setNext(new Animation("Fade In"));
			ani.add(newA);
			processAnimations();
		}
		if(mobilityMap[y].substring(x,x+1).equals("5")) {
			Animation newA = new Animation("BlackOut");
			newA.addMessage(new Message("Move Player",81,20,15));
			newA.setNext(new Animation("Fade In"));
			ani.add(newA);
			processAnimations();
		}
		if(mobilityMap[y].substring(x,x+1).equals("6")) {
			Animation newA = new Animation("BlackOut");
			newA.addMessage(new Message("Move Player",81,25,15));
			newA.setNext(new Animation("Fade In"));
			ani.add(newA);
			processAnimations();
		}
		if(mobilityMap[y].substring(x,x+1).equals("7")) {
			Animation newA = new Animation("BlackOut");
			newA.addMessage(new Message("Move Player",88,25,15));
			newA.setNext(new Animation("Fade In"));
			ani.add(newA);
			processAnimations();
		}
		if(mobilityMap[y].substring(x,x+1).equals("8")) {
			Animation newA = new Animation("BlackOut");
			newA.addMessage(new Message("Move Player",90,50,15));
			newA.setNext(new Animation("Fade In"));
			ani.add(newA);
			processAnimations();
		}
		if(mobilityMap[y].substring(x,x+1).equals("9")) {
			Animation newA = new Animation("BlackOut");
			newA.addMessage(new Message("Move Player",85,50,15));
			newA.setNext(new Animation("Fade In"));
			ani.add(newA);
			processAnimations();
		}
		if(mobilityMap[y].substring(x,x+1).equals("0")) {
			Animation newA = new Animation("BlackOut");
			newA.addMessage(new Message("Move Player",81,50,15));
			newA.setNext(new Animation("Fade In"));
			ani.add(newA);
			processAnimations();
		}
		if(mobilityMap[y].substring(x,x+1).equals("!")) {
			Animation newA = new Animation("BlackOut");
			newA.addMessage(new Message("Move Player",85,54,15));
			newA.setNext(new Animation("Fade In"));
			ani.add(newA);
			processAnimations();
		}
		if(mobilityMap[y].substring(x,x+1).equals("@")) {
			Animation newA = new Animation("BlackOut");
			newA.addMessage(new Message("Move Player",63,55,15));
			newA.setNext(new Animation("Fade In"));
			ani.add(newA);
			processAnimations();
		}
		if(mobilityMap[y].substring(x,x+1).equals("#")) {
			Animation newA = new Animation("BlackOut");
			newA.addMessage(new Message("Move Player",63,58,15));
			newA.setNext(new Animation("Fade In"));
			ani.add(newA);
			processAnimations();
		}
		if(mobilityMap[y].substring(x,x+1).equals("$")) {
			Animation newA = new Animation("BlackOut");
			newA.addMessage(new Message("Move Player",54,58,15));
			newA.setNext(new Animation("Fade In"));
			ani.add(newA);
			processAnimations();
		}
		if(mobilityMap[y].substring(x,x+1).equals("%")) {
			Animation newA = new Animation("BlackOut");
			newA.addMessage(new Message("Move Player",16,58,15));
			newA.setNext(new Animation("Fade In"));
			ani.add(newA);
			processAnimations();
		}
		if(mobilityMap[y].substring(x,x+1).equals("a")) {
			Animation newA = new Animation("BlackOut");
			newA.addMessage(new Message("Move Player",17,15,15));
			newA.setNext(new Animation("Fade In"));
			ani.add(newA);
			processAnimations();
		}
		if(mobilityMap[y].substring(x,x+1).equals("b")) {
			Animation newA = new Animation("BlackOut");
			newA.addMessage(new Message("Move Player",21,15,15));
			newA.setNext(new Animation("Fade In"));
			ani.add(newA);
			processAnimations();
		}
		if(mobilityMap[y].substring(x,x+1).equals("c")) {
			Animation newA = new Animation("BlackOut");
			newA.addMessage(new Message("Move Player",17,21,15));
			newA.setNext(new Animation("Fade In"));
			ani.add(newA);
			processAnimations();
		}
		if(mobilityMap[y].substring(x,x+1).equals("d")) {
			Animation newA = new Animation("BlackOut");
			newA.addMessage(new Message("Move Player",63,18,15));
			newA.setNext(new Animation("Fade In"));
			ani.add(newA);
			processAnimations();
		}
		if(mobilityMap[y].substring(x,x+1).equals("e")) {
			Animation newA = new Animation("BlackOut");
			newA.addMessage(new Message("Move Player",58,20,15));
			newA.setNext(new Animation("Fade In"));
			ani.add(newA);
			processAnimations();
		}
		if(mobilityMap[y].substring(x,x+1).equals("f")) {
			Animation newA = new Animation("BlackOut");
			newA.addMessage(new Message("Move Player",54,25,15));
			newA.setNext(new Animation("Fade In"));
			ani.add(newA);
			processAnimations();
		}
		if(mobilityMap[y].substring(x,x+1).equals("g")) {
			Animation newA = new Animation("BlackOut");
			newA.addMessage(new Message("Move Player",60,25,15));
			newA.setNext(new Animation("Fade In"));
			ani.add(newA);
			processAnimations();
		}
		if(mobilityMap[y].substring(x,x+1).equals("h")) {
			Animation newA = new Animation("BlackOut");
			newA.addMessage(new Message("Move Player",90,15,15));
			newA.setNext(new Animation("Fade In"));
			ani.add(newA);
			processAnimations();
		}
		if(mobilityMap[y].substring(x,x+1).equals("i")) {
			Animation newA = new Animation("BlackOut");
			newA.addMessage(new Message("Move Player",86,15,15));
			newA.setNext(new Animation("Fade In"));
			ani.add(newA);
			processAnimations();
		}
		if(mobilityMap[y].substring(x,x+1).equals("j")) {
			Animation newA = new Animation("BlackOut");
			newA.addMessage(new Message("Move Player",81,15,15));
			newA.setNext(new Animation("Fade In"));
			ani.add(newA);
			processAnimations();
		}
		if(mobilityMap[y].substring(x,x+1).equals("k")) {
			Animation newA = new Animation("BlackOut");
			newA.addMessage(new Message("Move Player",84,20,15));
			newA.setNext(new Animation("Fade In"));
			ani.add(newA);
			processAnimations();
		}
		if(mobilityMap[y].substring(x,x+1).equals("l")) {
			Animation newA = new Animation("BlackOut");
			newA.addMessage(new Message("Move Player",90,54,15));
			newA.setNext(new Animation("Fade In"));
			ani.add(newA);
			processAnimations();
		}
		if(mobilityMap[y].substring(x,x+1).equals("m")) {
			Animation newA = new Animation("BlackOut");
			newA.addMessage(new Message("Move Player",90,58,15));
			newA.setNext(new Animation("Fade In"));
			ani.add(newA);
			processAnimations();
		}
		if(mobilityMap[y].substring(x,x+1).equals("n")) {
			Animation newA = new Animation("BlackOut");
			newA.addMessage(new Message("Move Player",81,58,15));
			newA.setNext(new Animation("Fade In"));
			ani.add(newA);
			processAnimations();
		}
		if(mobilityMap[y].substring(x,x+1).equals("o")) {
			Animation newA = new Animation("BlackOut");
			newA.addMessage(new Message("Move Player",58,58,15));
			newA.setNext(new Animation("Fade In"));
			ani.add(newA);
			processAnimations();
		}
		if(mobilityMap[y].substring(x,x+1).equals("E")) {
			Animation newA = new Animation("BlackOut");
			newA.addMessage(new Message("Move Player",48,26,0));
			newA.addMessage(new Message("Change Area",0));
			newA.setNext(new Animation("Fade In"));
			ani.add(newA);
			processAnimations();
		}*/
	}
}
