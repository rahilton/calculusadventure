
class AreaCave extends GameEngine {

	constructor(p, w) {
		super("Cave1.dat",p, w);
		this.x = 13;
		this.y = 37;
		var zone1 = new Zone("1",25,10,3);
		zone1.addMonster(5, 20);
		zone1.addMonster(6, 20);
		this.zones.push(zone1);
		var zone2 = new Zone("2",25,10,3);
		zone2.addMonster(5, 20);
		zone2.addMonster(6, 20);
		zone2.addMonster(7, 20);
		this.zones.push(zone2);
		var zone3 = new Zone("3",25,10,3);
		zone3.addMonster(5, 20);
		zone3.addMonster(6, 40);
		zone3.addMonster(7, 40);
		this.zones.push(zone3);
		var zone4 = new Zone("4",25,16,3);
		zone4.addMonster(6, 40);
		zone4.addMonster(7, 20);
		zone4.addMonster(8, 20);
		this.zones.push(zone4);
		var zone5 = new Zone("5",25,17,3);
		zone5.addMonster(7, 20);
		zone5.addMonster(8, 20);
		this.zones.push(zone5);
		
		if(!this.player.getFlag(0)) {
			var guy = new NPCBoss("bosses.png",4,13,36,9,3,this.ani);
			guy.addMessage("You shall not take the crystal of Earth! I, the blight of Earth shall swallow you whole!");
			guy.addMessage("Battle");
			this.npcs.push(guy);
		}
		var makeCrystal = true;
		
		for(var i = 0; i < this.player.getKeyItemCount(); i++) {
			if(this.player.getKeyItem(i).getName().equals("Crystal of Earth"))
				makeCrystal = false;
		}
		if(makeCrystal) {
			var cry = new NPCCrystal(13,35,2,this.ani, this.player);
			cry.addMessage("You now have the Crystal of Earth!");
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
		if(/*!frozen && * (battle == null || !battle.getActive())&&(code == 37 || code == 38 || code == 39 || code == 40)) 
			checkEvent();
	}
	
	public void processTime() {
		super.processTime();
		
		//if(ani.size()>0) System.out.println("Animation type"+ " " + ani.peek().getType());
		
		
		processAnimations();
		
		
	}*/
	
	checkEvent() {
		//System.out.println(mobilityMap[y]);
		this.checkMovePlayer("1","Area",false,19,31,0);
		this.checkMovePlayer("2","Move",false,32,11,11);
		this.checkMovePlayer("3","Move",false,13,15,11);
		this.checkMovePlayer("4","Move",false,40,73,11);
		this.checkMovePlayer("5","Move",false,38,75,11);
		this.checkMovePlayer("6","Move",false,70,25,11);
		this.checkMovePlayer("7","Move",false,73,8,11);
		this.checkMovePlayer("8","Move",false,11,82,11);
		this.checkMovePlayer("9","Move",false,65,71,11);
		/*
		if(mobilityMap[y].substring(x,x+1).equals("1")) {
			Animation newA = new Animation("BlackOut");
			newA.addMessage(new Message("Move Player",19,31,0));
			newA.addMessage(new Message("Change Area",0));
			newA.setNext(new Animation("Fade In"));
			ani.add(newA);
			processAnimations();
			//frozen = true;
			
		}
		if(mobilityMap[y].substring(x,x+1).equals("2")) {
			Animation newA = new Animation("BlackOut");
			newA.addMessage(new Message("Move Player",32,11,11));
			newA.setNext(new Animation("Fade In"));
			ani.add(newA);
			processAnimations();
			//frozen = true;
		}
		if(mobilityMap[y].substring(x,x+1).equals("3")) {
			Animation newA = new Animation("BlackOut");
			newA.addMessage(new Message("Move Player",13,15,11));
			newA.setNext(new Animation("Fade In"));
			ani.add(newA);
			processAnimations();
			//frozen = true;
		}
		if(mobilityMap[y].substring(x,x+1).equals("4")) {
			Animation newA = new Animation("BlackOut");
			newA.addMessage(new Message("Move Player",40,73,11));
			newA.setNext(new Animation("Fade In"));
			ani.add(newA);
			processAnimations();
			//frozen = true;
		}
		if(mobilityMap[y].substring(x,x+1).equals("5")) {
			Animation newA = new Animation("BlackOut");
			newA.addMessage(new Message("Move Player",38,75,11));
			newA.setNext(new Animation("Fade In"));
			ani.add(newA);
			processAnimations();
			//frozen = true;
		}
		if(mobilityMap[y].substring(x,x+1).equals("6")) {
			Animation newA = new Animation("BlackOut");
			newA.addMessage(new Message("Move Player",70,25,11));
			newA.setNext(new Animation("Fade In"));
			ani.add(newA);
			processAnimations();
			//frozen = true;
		}
		if(mobilityMap[y].substring(x,x+1).equals("7")) {
			Animation newA = new Animation("BlackOut");
			newA.addMessage(new Message("Move Player",73,8,11));
			newA.setNext(new Animation("Fade In"));
			ani.add(newA);
			processAnimations();
			//frozen = true;
		}
		if(mobilityMap[y].substring(x,x+1).equals("8")) {
			Animation newA = new Animation("BlackOut");
			newA.addMessage(new Message("Move Player",11,82,11));
			newA.setNext(new Animation("Fade In"));
			ani.add(newA);
			processAnimations();
			//frozen = true;
		}
		if(mobilityMap[y].substring(x,x+1).equals("9")) {
			Animation newA = new Animation("BlackOut");
			newA.addMessage(new Message("Move Player",65,71,11));
			newA.setNext(new Animation("Fade In"));
			ani.add(newA);
			processAnimations();
			//frozen = true;
		}*/
	}


}
