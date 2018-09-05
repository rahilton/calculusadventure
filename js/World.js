class World {
	
	
	constructor(user, flags) {
		this.globalFlags = flags;
		this.user = user;
        this.NUMBER_OF_AREAS = 23;
	
    	this.WEATHERFILE = "STORMYWEATHER.key";
    	this.TIDEFILE = "SURFSUP.key";
    	this.SUNFILE = "RARASISBOOMBA.key";
    	
    	this.DIAGKEY = "diagforyou";
    	
    	
    	this.VERSION = 2.0;
    	
    	this.timeCount = 0;
    	
    	this.STARTING_AREA = 1;
    	this.STARTING_X = 13;
    	this.STARTING_Y = 48;
    	this.DEFAULT_X_SIZE = 1216;
    	this.DEFAULT_Y_SIZE = 743;
    	
    	this.ALTERED_SETUP = true;

		this.current =  new TaskIntroScreen(this);
		
		this.selecting = this.itemNumber = this.flagNum = 0;
			
		this.currentSpeed = 30;
		
		/*
		timer = new javax.swing.Timer(currentSpeed, new TimeListener());
		timer.start();
		*/

		window.setTimeout(this.actionPerformed.bind(this),this.currentSpeed);
		this.infoPanel = new DiagnosticInfoPanel();
	    
		var can = document.getElementById("mainDisplay");
		window.addEventListener("keydown", this.keyPressed.bind(this));
		can.addEventListener("click", this.mouseClicked.bind(this));
		
		GameWindow.makeTexture();
		this.bar = new LoadingBar(this.NUMBER_OF_AREAS);
		this.makingWorld = false;
		this.floors = [];
		
		
		
	}
	
	makePlayer(name) {
		//this.player = Player.getPlayer("Hilton",19);
		this.player = new Player(name);
		//this.infoPanel.setPlayer(this.player);
		this.processFlags();
		window.setInterval(this.savePlayer.bind(this), 30000);
	}
	
	makeWorld() {
		this.debug = false;
		this.alteredSetup = this.ALTERED_SETUP;
			
		if(this.bar.getProgress() == 0) {
			GameEngine.makeGraphics();
			this.floors[0] = new AreaOverWorld(this.player, this);
			this.bar.addProgress();
		}
		else if(this.bar.getProgress() == 1) {
			if(!this.alteredSetup) this.floors[1] = new AreaCalcTown(this.player, this);
			this.bar.addProgress();
			if(this.alteredSetup) this.makeWorld();
		}
		else if(this.bar.getProgress() == 2) {
			if(!this.alteredSetup) this.floors[2] = new TaskInn(this.player, this);
			this.bar.addProgress();
			if(this.alteredSetup) this.makeWorld();
		}
		else if(this.bar.getProgress() == 3) {
			if(!this.alteredSetup) this.floors[3] = new TaskItemShop(this.player, this);
			this.bar.addProgress();
			if(this.alteredSetup) this.makeWorld();
		}
		else if(this.bar.getProgress() == 4) {
			if(!this.alteredSetup) this.floors[4] = new TaskTraining(this.player, this);
			this.bar.addProgress();
			if(this.alteredSetup) this.makeWorld();
		}
		else if(this.bar.getProgress() == 5) {
			if(!this.alteredSetup) this.floors[5] = new TaskMagicShop(this.player, this);
			this.bar.addProgress();
			if(this.alteredSetup) this.makeWorld();
		}
		else if(this.bar.getProgress() == 6) {
			if(!this.alteredSetup) this.floors[6] = new TaskSkillsShop(this.player, this);
			this.bar.addProgress();
			if(this.alteredSetup) this.makeWorld();
		}
		else if(this.bar.getProgress() == 7) {
			if(!this.alteredSetup) this.floors[7] = new TaskTradingPost(this.player, this);
			this.bar.addProgress();
			if(this.alteredSetup) this.makeWorld();
		}
		else if(this.bar.getProgress() == 8) {
			if(!this.alteredSetup) this.floors[8] = new TaskWeaponShop(this.player, this);
			this.bar.addProgress();
			if(this.alteredSetup) this.makeWorld();
		}
		else if(this.bar.getProgress() == 9) {
			if(!this.alteredSetup) this.floors[9] = new TaskArmorShop(this.player, this);
			this.bar.addProgress();
			if(this.alteredSetup) this.makeWorld();
		}
		else if(this.bar.getProgress() == 10) {
			if(!this.alteredSetup) this.floors[10] = new AreaMountainPass(this.player, this);
			this.bar.addProgress();
			if(this.alteredSetup) this.makeWorld();
		}
		else if(this.bar.getProgress() == 11) {
			this.floors[11] = new AreaCave(this.player, this);
			this.bar.addProgress();
		}
		else if(this.bar.getProgress() == 12) {
			if(!this.alteredSetup) this.floors[12] = new AreaForest(this.player, this);
			this.bar.addProgress();
			if(this.alteredSetup) this.makeWorld();
		}
		else if(this.bar.getProgress() == 13) {
			if(!this.alteredSetup) this.floors[13] = new AreaCastleTown(this.player, this);
			this.bar.addProgress();
			if(this.alteredSetup) this.makeWorld();
		}
		else if(this.bar.getProgress() == 14) {
			if(!this.alteredSetup) this.floors[14] = new AreaDerivativeDell(this.player, this);
			this.bar.addProgress();
			if(this.alteredSetup) this.makeWorld();
		}
		else if(this.bar.getProgress() == 15) {
			this.floors[15] = new AreaTower(this.player, this);
			this.bar.addProgress();
		}
		else if(this.bar.getProgress() == 16) {
			if(!this.alteredSetup) this.floors[16] = new AreaSnowVille(this.player, this);
			this.bar.addProgress();
			if(this.alteredSetup) this.makeWorld();
		}
		else if(this.bar.getProgress() == 17) {
			this.floors[17] = new AreaIceDungeon(this.player, this);
			this.bar.addProgress();
		}
		else if(this.bar.getProgress() == 18) {
			if(!this.alteredSetup) this.floors[18] = new AreaSineCity(this.player, this);
			this.bar.addProgress();
			if(this.alteredSetup) this.makeWorld();
		}
		else if(this.bar.getProgress() == 19) {
			this.floors[19] = new AreaVolcano(this.player, this);
			this.bar.addProgress();
		}
		else if(this.bar.getProgress() == 20) {
			this.floors[20] = new AreaEvilLair(this.player, this);
			this.bar.addProgress();
		}
		else if(this.bar.getProgress() == 21) {
			if(!this.alteredSetup) this.floors[21] = new TaskEndingScreen(this.player, this);
			this.bar.addProgress();
			if(this.alteredSetup) this.makeWorld();
		}
		else if(this.bar.getProgress() == 22) {
			if(!this.alteredSetup) this.floors[22] = new TaskIntroScreen(this);
			this.bar.addProgress();
			/*
			Container pane = frame.getContentPane();
			pane.remove(bar);
			*/
			this.status = new StatusPanel(this.player, this);
			
			this.makingWorld = false;
			this.changeArea(this.player.getLastTown());

			
			
	        if(this.player.getFlag(4)) this.processMessage(new Message("Change Map",4));
	        if(this.player.getFlag(5)) this.processMessage(new Message("Change Map",5));
	        if(this.player.getFlag(6)) this.processMessage(new Message("Change Map",6));
	        if(this.player.getFlag(7)) this.processMessage(new Message("Change Map",7));
			
			this.bar.addProgress();
			
		}
		/*
		//currentFloor = 21;
		//current = floors[currentFloor];
		//current.createImage();
		//newA.addMessage(new Message("Move Player",STARTING_X,STARTING_Y,STARTING_AREA));
		//newA.addMessage(new Message("Change Area",STARTING_AREA));			
		*/
	}
	
	/*
	public JFrame getFrame() {
		return frame;
	}
	*/
	
	getStatus() {
		return this.status;
	}
	
	getFloors() {
		return this.floors;
	}
	
	makeFloor(fl) {
		if(fl == 1) this.floors[1] = new AreaCalcTown(this.player, this);
		if(fl == 2) this.floors[2] = new TaskInn(this.player, this);
		if(fl == 3) this.floors[3] = new TaskItemShop(this.player, this);
		if(fl == 4) this.floors[4] = new TaskTraining(this.player, this);
		if(fl == 5) this.floors[5] = new TaskMagicShop(this.player, this);
		if(fl == 6) this.floors[6] = new TaskSkillsShop(this.player, this);
		if(fl == 7) this.floors[7] = new TaskTradingPost(this.player, this);
		if(fl == 8) this.floors[8] = new TaskWeaponShop(this.player, this);
		if(fl == 9) this.floors[9] = new TaskArmorShop(this.player, this);
		if(fl == 10) this.floors[10] = new AreaMountainPass(this.player, this);
		if(fl == 11) this.floors[11] = new AreaCave(this.player, this);
		if(fl == 12) this.floors[12] = new AreaForest(this.player, this);
		if(fl == 13) this.floors[13] = new AreaCastleTown(this.player, this);
		if(fl == 14) this.floors[14] = new AreaDerivativeDell(this.player, this);
		if(fl == 15) this.floors[15] = new AreaTower(this.player, this);
		if(fl == 16) this.floors[16] = new AreaSnowVille(this.player, this);
		if(fl == 17) this.floors[17] = new AreaIceDungeon(this.player, this);
		if(fl == 18) this.floors[18] = new AreaSineCity(this.player, this);
		if(fl == 19) this.floors[19] = new AreaVolcano(this.player, this);
		if(fl == 20) this.floors[20] = new AreaEvilLair(this.player, this);
		if(fl == 21) this.floors[21] = new TaskEndingScreen(this.player, this);
		if(fl == 22) this.floors[22] = new TaskIntroScreen(this);
	}
	
	
	
	
	
	
	
	processMessage(m) {
		if(m.getType() === "Move Player") {
			if(this.floors[m.getData(2)] == null) this.makeFloor(m.getData(2));
			this.floors[m.getData(2)].giveMessage(m);
		}
		if(m.getType() === "Change Area") {
			this.changeArea(m.getData());
		}
		if(m.getType() === "HP Change") {
			this.player.changeHp(m.getData());
		}
		if(m.getType() === "SP Change") {
			this.player.changeSp(m.getData());
		}
		if(m.getType() === "MP Change") {
			this.player.changeMp(m.getData());
		}
		if(m.getType() === "Change Shop") {
			if(this.floors[m.getData(0)] == null) this.makeFloor(m.getData(0));
			this.floors[m.getData(0)].changeShopNumber(m.getData(1));
		}
		if(m.getType() === "Revive") {
			if(this.floors[2] == null) this.makeFloor(2);
			this.floors[2].revive();
		}
		if(m.getType() === "MP Change") {
			this.player.changeMp(m.getData());
		}
		if(m.getType() === "Open Menu") {
			this.current.giveMessage(m);
		}
		if(m.getType().length > 11 && m.getType().substring(0,11) === "Make Player") {
			this.makePlayer(m.getType().substring(12));
		}
		if(m.getType() === "Load Player") {
			this.loadPlayer();
		}
		if(m.getType() === "Make World") {
			this.makingWorld = true;
			/*
			Container pane = frame.getContentPane();
			pane.remove((JPanel) current);
			pane.add(bar);
			pane.validate();
			*/
			this.current = this.bar;
			this.bar.redraw();
			//this.makeWorld();
		}
		if(m.getType() === "Change Map") {
			this.floors[0].giveMessage(m);
			
		}
		if(m.getType() === "Save Player") {
			this.savePlayer();
		}
		if(m.getType() === "Slow Down") {
			this.currentSpeed += 10;
			if(this.currentSpeed > 200) this.currentSpeed = 200;
		}
		if(m.getType() === "Speed Up") {
			this.currentSpeed -= 10;
			if(this.currentSpeed < 0) this.currentSpeed = 0;
		}
	}
	
	getCurrentSpeed() {
		return this.currentSpeed;
	}
	
	// finishedLoadingImage() {
	// 	if(this.makingWorld) {
	// 		this.makeWorld();
	// 	}
	// 	else {
	// 		this.changeArea(this.currentFloor, true);
	// 	}
	// }
	
	changeArea(floor, secondVisit) {
		this.current = null;
		// console.log(this.currentFloor + " "  + floor);
		// if(this.currentFloor === 0 && floor === 1) this.debug = true;
		// // if(!secondVisit) {
			if(this.ALTERED_SETUP && (this.currentFloor != 0 && this.currentFloor != 11 && this.currentFloor != 15 && this.currentFloor != 17 && this.currentFloor != 19 && this.currentFloor != 20)) { 
				this.floors[this.currentFloor] = null;
			}
			else {
				this.floors[this.currentFloor].destroyImage();
			}
		// }
		this.currentFloor = floor;
		if(this.floors[floor] === null || this.floors[floor] === undefined) {
			this.makeFloor(floor); 
			// return;
		}
		/*
		Container pane = frame.getContentPane();
		pane.remove((JPanel)current);
		*/
		this.current = this.floors[floor];
		this.floors[floor].createImage();
		//debugger;
		// this.current.processTime();
		// this.current.redraw();
		/*
		pane.add((JPanel)current);
		pane.validate();
		*/
		if(floor == 1 || floor == 13 || floor == 14 || floor == 16 || floor == 18) {
			this.player.setLastTown(floor);
		}
	}
	
	
	
	keyPressed(e) {	
		var code = e.keyCode;
		if([32, 37, 38, 39, 40].indexOf(code) > -1) {
	        e.preventDefault();
	    }
		if(!this.diagMode) {
			this.dWord += String.fromCharCode(code).toLowerCase();
			//console.log(this.dWord);
			if(!(this.dWord.length <= this.DIAGKEY.length && this.dWord === this.DIAGKEY.substring(0, this.dWord.length))) {
				this.dWord = "";
			}
			else if(this.dWord  === this.DIAGKEY) {
				document.getElementById("diagPanel").classList.toggle("diag");
				this.infoPanel.paintComponent();
				// infoFrame.setVisible(true);
				this.diagMode = true;
			}
		}
		if(this.diagMode) this.diagProcess(code);
		this.current.process(code);	
	}

	mouseClicked(e) {
		if(this.current != null) {
			var can = document.getElementById("mainDisplay");
			var rect = can.getBoundingClientRect();
			e.getX = Math.floor((e.clientX - rect.left)*GameEngine.PANEL_WIDTH/can.width);
			e.getY = Math.floor((e.clientY - rect.top)*GameEngine.PANEL_HEIGHT/can.height);
			
			this.current.mouseClicked(e);
		}
	}
	
	
	actionPerformed(e) {
		if(!this.loadLock) {
			//if(this.debug) debugger;
			if(this.makingWorld) this.makeWorld();		
			if(this.current != null && this.current.isLoaded) {
				this.current.processTime();
				this.current.redraw();
			}
			if(this.status != null)  {
			    this.status.redraw();
			}
		}
		window.setTimeout(this.actionPerformed.bind(this),this.currentSpeed);
	}
	
	/*
	
	
	public static String MD5(String input) {
		try {
			byte[] bytesOfMessage = input.getBytes("UTF-8");
	
			MessageDigest md = MessageDigest.getInstance("MD5");
			byte[] thedigest = md.digest(bytesOfMessage);
			
			StringBuilder sb = new StringBuilder();
		    for (byte b : thedigest) {
		        sb.append(String.format("%02X", b));
		    }
		    return sb.toString();
		}
		catch(Exception e) {}
		return "";
	}
	
	*/
	
	loadPlayer(player) {
		if(typeof player == "undefined") {
			this.loadLock = true;
			this.socket.emit("load player", {user:this.user});
			return;
		}
		/*
		if(player.getVersion() != VERSION - 1) {
			if(player.getVersion() != VERSION) {
				JOptionPane.showMessageDialog(null, "Incorrect Version Player File!");
				frame.dispatchEvent(new WindowEvent(frame, WindowEvent.WINDOW_CLOSING));
			}
			if(!MD5(player.getStatString()).equals(player.getSecurity())) {
				JOptionPane.showMessageDialog(null, "Player File Inconsistant!");
				frame.dispatchEvent(new WindowEvent(frame, WindowEvent.WINDOW_CLOSING));
			}
		}*/
		this.player = new Player(player);
		this.loadLock = false;
		this.processFlags();
		window.setInterval(this.savePlayer.bind(this), 30000);
		
	}
	
	
	diagProcess(code) {
		if(this.player == null) return;
		var letter = String.fromCharCode(code).toLowerCase();
		//change level
		if(letter == 'w') this.player.levelUp();
		if(letter == 'q') this.player.levelDown();
		//change hp/hpmax
		if(letter == 'r') this.player.addHpMax(10);
		if(letter == 'e') this.player.addHpMax(-10);
		//change sp/spmax
		if(letter == 'f') this.player.addSpMax(10);
		if(letter == 'd') this.player.addSpMax(-10);
		//change mp/mpmax
		if(letter == 'v') this.player.addMpMax(10);
		if(letter == 'c') this.player.addMpMax(-10);
		//change str
		if(letter == 's') this.player.addStrength(1);
		if(letter == 'a') this.player.addStrength(-1);
		//change def
		if(letter == 'x') this.player.addDefense(1);
		if(letter == 'z') this.player.addDefense(-1);
		//change change xp
		if(letter == 'y') this.player.addExperience(100);
		if(letter == 't') this.player.addExperience(-100);
		//change gold
		if(letter == 'h') this.player.addGold(1000);
		if(letter == 'g') this.player.addGold(-1000);
		//all heal
		if(letter == 'n') {this.player.changeHp(10000); this.player.changeSp(10000);this.player.changeMp(10000);}
		//give item
		//give skill
		//train skill
		//give spell
		//train spell
		//give weapon
		//give armor
		//give trade item
		//give key item
		if(letter == 'j') {this.selecting = (this.selecting + 1) % 7; this.itemNumber = 0; this.infoPanel.setSelecting(this.selecting); this.infoPanel.setItem(this.itemNumber);}
		if(letter == 'l') {this.selecting = (this.selecting + 6) % 7; this.itemNumber = 0; this.infoPanel.setSelecting(this.selecting); this.infoPanel.setItem(this.itemNumber);}
		if(letter == 'i') {
			this.itemNumber = this.itemNumber - 1;
			if(this.itemNumber == -1) this.itemNumber =0;
			this.infoPanel.setItem(this.itemNumber);
		}
		if(letter == 'k') {
			this.itemNumber = this.itemNumber + 1;
			this.infoPanel.setItem(this.itemNumber);
		}
		if(letter == 'u') {
			if(this.selecting == 0) {var thing = Item.getItem(this.itemNumber); if(thing.getName() !== "Nothing") this.player.addItem(thing);}
			if(this.selecting == 1) {var thing = Skill.getSkill(this.itemNumber); if(thing.getName() !== "Nothing") this.player.addSkillTraining(thing);}
			if(this.selecting == 2) {var thing = Spell.getSpell(this.itemNumber); if(thing.getName() !== "Nothing") this.player.addSpellTraining(thing);}
			if(this.selecting == 3) {var thing = Weapon.getWeapon(this.itemNumber); if(thing.getName() !== "Nothing") this.player.addWeapon(thing);}
			if(this.selecting == 4) {var thing = Armor.getArmor(this.itemNumber); if(thing.getName() !== "Nothing") this.player.addArmor(thing);}
			if(this.selecting == 5) {var thing = TradeItem.getItem(this.itemNumber); if(thing.getName() !== "Nothing") this.player.addTradeItem(thing);}
			if(this.selecting == 6) {var thing = KeyItem.getKeyItem(this.itemNumber); if(thing.getName() !== "Nothing") this.player.addKeyItem(thing);}
			if(this.current instanceof GameEngine && this.current.menuOpen) { this.current.populateItemWindow(); this.current.populateDescriptionWindow();}
		}	
		//toggle repel
		if(letter == 'b') {
			this.player.setAlwaysRepel(!this.player.getAlwaysRepel());
		}
		if(letter == 'p') {
			this.player.setAlwaysRepel(false);
			this.diagMode = false;
			// diagFrame.setVisible(false);
			document.getElementById("diagPanel").classList.toggle("diag");
			// this.infoFrame.setVisible(false);
		}
		
		//change flag
		var number = String.fromCharCode(code);
		if(number == '1') {
			this.flagNum--;
			if(this.flagNum < 0) this.flagNum = 0;
			this.infoPanel.setFlag(this.flagNum);
		}
		if(number == '2') {
			this.flagNum++;
			this.player.getFlag(this.flagNum);
			this.infoPanel.setFlag(this.flagNum);
		}
		if(number == '3') {this.player.setFlag(this.flagNum, !this.player.getFlag(this.flagNum));this.infoPanel.setFlag(this.flagNum);}
		this.infoPanel.paintComponent();
	}
	
	processFlags() {
		if(this.globalFlags.weather) this.player.setFlag(8, true); // For getting through Lock 1
		if(this.globalFlags.tide) this.player.setFlag(9, true); // For getting through Lock 2
		if(this.globalFlags.sun) this.player.setFlag(10, true); // For getting through Lock 3
	}
	
	setSocket(sock) {
		this.socket = sock;
	}

	
	savePlayer() {
		//this.player.setAlwaysRepel(false);
		this.player.setVersion(this.VERSION);
		this.socket.emit('save player' , {player:this.player, user:this.user});
	}
	
}
