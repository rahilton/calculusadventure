class AreaOverWorld extends GameEngine {

	//int monsterNum = 50;
	
	constructor(p, w) {
		super("WorldMap2.dat",p, w);
		this.x = 13;//13
		this.y = 53;//53
		//win = new GameWindow(200,100,800,400);
		//win.setOptionBackground("outside.jpg");
		var zone1 = new Zone("1",25,10,0);
		//zone1.addMonster(54, 20);
		zone1.addMonster(0, 20);
		zone1.addMonster(1, 20);
		zone1.addMonster(2, 20);
		this.zones.push(zone1);
		var zone2 = new Zone("2",25,10,0);
		zone2.addMonster(0, 20);
		zone2.addMonster(1, 20);
		zone2.addMonster(2, 20);
		zone2.addMonster(3, 20);
		zone2.addMonster(4, 20);
		this.zones.push(zone2);
		var zone3 = new Zone("3",30,5,0);
		zone3.addMonster(2, 20);
		zone3.addMonster(3, 20);
		zone3.addMonster(4, 20);
		zone3.addMonster(5, 20);
		zone3.addMonster(6, 20);
		this.zones.push(zone3);
		var desert = new Zone("D",7,2,1);
		desert.addMonster(5, 20);
		desert.addMonster(6, 20);
		desert.addMonster(7, 20);
		this.zones.push(desert);
		var zone4 = new Zone("4",20,8,0);
		zone4.addMonster(6, 20);
		zone4.addMonster(10, 20);
		zone4.addMonster(11, 20);
		this.zones.push(zone4);
		var zone5 = new Zone("5",20,8,0);
		zone5.addMonster(11, 20);
		zone5.addMonster(12, 20);
		zone5.addMonster(13, 20);
		zone5.addMonster(14, 20);
		this.zones.push(zone5);
		var zone6 = new Zone("6",25,10,6);
		zone6.addMonster(20, 20);
		zone6.addMonster(21, 20);
		zone6.addMonster(22, 20);
		zone6.addMonster(23, 20);
		this.zones.push(zone6);
		var zone7 = new Zone("7",25,10,0);
		zone7.addMonster(29, 20);
		zone7.addMonster(30, 20);
		zone7.addMonster(31, 20);
		this.zones.push(zone7);
		var zone8 = new Zone("8",25,10,0);
		zone8.addMonster(29, 20);
		zone8.addMonster(30, 20);
		zone8.addMonster(31, 20);
		zone8.addMonster(32, 20);
		zone8.addMonster(33, 20);
		this.zones.push(zone8);
		var zone9 = new Zone("9",15,10,9);
		zone9.addMonster(41, 20);
		zone9.addMonster(42, 20);
		this.zones.push(zone9);
		var zone10 = new Zone("Y",25,10,0);
		zone10.addMonster(54, 20);
		zone10.addMonster(29, 20);
		this.zones.push(zone10);
		
		this.ani.push(new Animation("Fade In"));
	}
	
	/*
	public void process(int code) {
		super.process(code);
		if(code == 67) {
			//int rand = (int) (Math.random() * 4)+4;
			battle = new Battle(player, Monster.getMonster(monsterNum++, player), 0,ani);
			battle.setActive(true);
		}
		if(code == 68) {
			player.changeHp(1000);
			player.changeSp(1000);
			player.changeMp(1000);
		}
		if(/*!frozen &&* !menuOpen && (battle == null || !battle.getActive()) &&  (code == 37 || code == 38 || code == 39 || code == 40))
			checkEvent();
	}
	
	public void processTime() {
		super.processTime();
		processAnimations();
		//repaint();
		
	}*/
	
	
	checkEvent() {
		//System.out.println(mobilityMap[y]);
		this.checkMovePlayer("1","Area",false,20,36,1);
		this.checkMovePlayer("M","Area",false,90,40,10);
		this.checkMovePlayer("P","Area",false,12,36,10);
		this.checkMovePlayer("C","Area",false,11,11,11);
		this.checkMovePlayer("F","Area",false,47,53,12);
		this.checkMovePlayer("f","Area",false,30,5,12);
		this.checkMovePlayer("c","Area",false,69,44,13);
		this.checkMovePlayer("d","Area",false,23,28,14);
		this.checkMovePlayer("T","Area",false,17,30,15);
		this.checkMovePlayer("w","Area",false,14,9,16);
		this.checkMovePlayer("I","Area",false,10,14,17);
		this.checkMovePlayer("s","Area",false,15,28,18);
		this.checkMovePlayer("V","Area",false,13,18,19);
		this.checkMovePlayer("E","Area",false,25,40,20);/*
		if(mobilityMap[y].substring(x,x+1).equals("1")) {
			Animation newA = new Animation("BlackOut");
			newA.addMessage(new Message("Move Player",20,36,1));
			newA.addMessage(new Message("Change Area",1));
			newA.setNext(new Animation("Fade In"));
			ani.add(newA);
			processAnimations();
			//frozen = true;
		}
		if(mobilityMap[y].substring(x,x+1).equals("M")) {
			Animation newA = new Animation("BlackOut");
			newA.addMessage(new Message("Move Player",90,40,10));
			newA.addMessage(new Message("Change Area",10));
			newA.setNext(new Animation("Fade In"));
			ani.add(newA);
			processAnimations();
			//frozen = true;
		}
		if(mobilityMap[y].substring(x,x+1).equals("P")) {
			Animation newA = new Animation("BlackOut");
			newA.addMessage(new Message("Move Player",12,36,10));
			newA.addMessage(new Message("Change Area",10));
			newA.setNext(new Animation("Fade In"));
			ani.add(newA);
			processAnimations();
			//frozen = true;
		}
		if(mobilityMap[y].substring(x,x+1).equals("C")) {
			Animation newA = new Animation("BlackOut");
			newA.addMessage(new Message("Move Player",11,11,11));
			newA.addMessage(new Message("Change Area",11));
			newA.setNext(new Animation("Fade In"));
			ani.add(newA);
			processAnimations();
			//frozen = true;
		}
		if(mobilityMap[y].substring(x,x+1).equals("F")) {
			Animation newA = new Animation("BlackOut");
			newA.addMessage(new Message("Move Player",47,53,12));
			newA.addMessage(new Message("Change Area",12));
			newA.setNext(new Animation("Fade In"));
			ani.add(newA);
			processAnimations();
			//frozen = true;
		}
		if(mobilityMap[y].substring(x,x+1).equals("f")) {
			Animation newA = new Animation("BlackOut");
			newA.addMessage(new Message("Move Player",30,5,12));
			newA.addMessage(new Message("Change Area",12));
			newA.setNext(new Animation("Fade In"));
			ani.add(newA);
			processAnimations();
			//frozen = true;
		}
		if(mobilityMap[y].substring(x,x+1).equals("c")) {
			Animation newA = new Animation("BlackOut");
			newA.addMessage(new Message("Move Player",69,44,13));
			newA.addMessage(new Message("Change Area",13));
			newA.setNext(new Animation("Fade In"));
			ani.add(newA);
			processAnimations();
			//frozen = true;
		}
		if(mobilityMap[y].substring(x,x+1).equals("d")) {
			Animation newA = new Animation("BlackOut");
			newA.addMessage(new Message("Move Player",23,28,14));
			newA.addMessage(new Message("Change Area",14));
			newA.setNext(new Animation("Fade In"));
			ani.add(newA);
			processAnimations();
			//frozen = true;
		}
		if(mobilityMap[y].substring(x,x+1).equals("T")) {
			Animation newA = new Animation("BlackOut");
			newA.addMessage(new Message("Move Player",17,30,15));
			newA.addMessage(new Message("Change Area",15));
			newA.setNext(new Animation("Fade In"));
			ani.add(newA);
			processAnimations();
			//frozen = true;
		}
		if(mobilityMap[y].substring(x,x+1).equals("w")) {
			Animation newA = new Animation("BlackOut");
			newA.addMessage(new Message("Move Player",14,9,16));
			newA.addMessage(new Message("Change Area",16));
			newA.setNext(new Animation("Fade In"));
			ani.add(newA);
			processAnimations();
			//frozen = true;
		}
		if(mobilityMap[y].substring(x,x+1).equals("I")) {
			Animation newA = new Animation("BlackOut");
			newA.addMessage(new Message("Move Player",10,14,17));
			newA.addMessage(new Message("Change Area",17));
			newA.setNext(new Animation("Fade In"));
			ani.add(newA);
			processAnimations();
			//frozen = true;
		}
		if(mobilityMap[y].substring(x,x+1).equals("s")) {
			Animation newA = new Animation("BlackOut");
			newA.addMessage(new Message("Move Player",15,28,18));
			newA.addMessage(new Message("Change Area",18));
			newA.setNext(new Animation("Fade In"));
			ani.add(newA);
			processAnimations();
			//frozen = true;
		}
		if(mobilityMap[y].substring(x,x+1).equals("V")) {
			Animation newA = new Animation("BlackOut");
			newA.addMessage(new Message("Move Player",13,18,19));
			newA.addMessage(new Message("Change Area",19));
			newA.setNext(new Animation("Fade In"));
			ani.add(newA);
			processAnimations();
			//frozen = true;
		}
		if(mobilityMap[y].substring(x,x+1).equals("E")) {
			Animation newA = new Animation("BlackOut");
			newA.addMessage(new Message("Move Player",25,40,20));
			newA.addMessage(new Message("Change Area",20));
			newA.setNext(new Animation("Fade In"));
			ani.add(newA);
			processAnimations();
			//frozen = true;
		}*/
	}

}
