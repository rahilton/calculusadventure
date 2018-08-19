// var GameEngine = require("GameEngine.js");
// var Equation = require("Equation.js");

class StatusPanel {

	constructor(p, w) {
		
		this.player = p;
		this.hpTrans = this.player.getHp();
		this.spTrans = this.player.getSp();
		this.mpTrans = this.player.getMp();
		this.worldHandle = w;
		//addMouseListener(new MListener());
		this.tint = document.createElement("canvas");
		this.tint.height = "1200";
		this.tint.width = "200";
		var graph = this.tint.getContext("2d");
		graph.fillStyle = "green";
		graph.fillRect(0, 0, 200, 1200);
		var pix = graph.getImageData(0, 0, 200, 1200);
		for(var i = 0; i < pix.data.length; i+=4) {
			pix.data[i+3] = 64;
		}
		graph.putImageData(pix, 0, 0);
		this.MENUBASE = 0;
    	this.ITEMBASE = 0;
    	this.WEAPONBASE = 0;
    	this.ARMORBASE = 0;
    	this.SKILLBASE = 0;
    	this.MAGICBASE = 0;
    	this.TRADEITEMBASE = 0;
    	this.KEYITEMBASE = 0;
    	this.SPEEDBASE = 0;

	}
	
	paintPanel(g) {
		
		var img = document.createElement("img");
		img.src = "window04.png";
		
		
		//Main Background
		g.drawImage(img,0,0,64,64,StatusPanel.PANEL_BASE, 0, GameEngine.PANEL_WIDTH-StatusPanel.PANEL_BASE,GameEngine.PANEL_HEIGHT);
		
		
		//Texture
		for(var i = 0; i < 20; i++) {
			for(var j = 0; j < 20; j++) {
				g.drawImage(img,0,64,64,64, StatusPanel.PANEL_BASE + i*64, j*64, 64, 64);
			}
		}
		
		if(this.player.getRepel() > 0 || this.player.getAlwaysRepel()) {
			g.drawImage(this.tint, StatusPanel.PANEL_BASE, 0);
		}
				
		//Sides
		g.drawImage(img, 64,16,16,16, StatusPanel.PANEL_BASE, 0, 16,GameEngine.PANEL_HEIGHT);
		g.drawImage(img, 64+48,16,16,16, GameEngine.PANEL_WIDTH -16, 0, 16,GameEngine.PANEL_HEIGHT);
		g.drawImage(img, 64+16,0,32,16, StatusPanel.PANEL_BASE, 0, GameEngine.PANEL_WIDTH-StatusPanel.PANEL_BASE,16);
		g.drawImage(img, 64+16,48,32,16, StatusPanel.PANEL_BASE, GameEngine.PANEL_HEIGHT-16, GameEngine.PANEL_WIDTH-StatusPanel.PANEL_BASE,16);
		//Corners
		g.drawImage(img, 64,0,16,16, StatusPanel.PANEL_BASE,0,16,16);
		g.drawImage(img, 64+48,0,16,16, GameEngine.PANEL_WIDTH-16,0,16,16);
		g.drawImage(img, 64,48,16,16, StatusPanel.PANEL_BASE,GameEngine.PANEL_HEIGHT-16,16,16);
		g.drawImage(img, 64+48,48,16,16, GameEngine.PANEL_WIDTH-16,GameEngine.PANEL_HEIGHT-16,16,16);
				
		//Print the level
		g.font = "bold 32px Courier New";
		g.fillStyle = "black";
		var NAMEBASE = 35;
		g.fillText(this.player.getName(), StatusPanel.PANEL_BASE +16+2, NAMEBASE+2);
		g.fillStyle = "white";
		g.fillText(this.player.getName(), StatusPanel.PANEL_BASE +16, NAMEBASE);
		
		
		//Print the level
		g.font = "bold 32px Courier New";
		g.fillStyle = "black";
		var LEVELBASE = 75;
		g.fillText("Level " + this.player.getLevel().toString(), StatusPanel.PANEL_BASE +16+2, LEVELBASE+2);
		g.fillStyle = "white";
		g.fillText("Level " + this.player.getLevel().toString(), StatusPanel.PANEL_BASE +16, LEVELBASE);
				
		var fontSize = 16;
			
		//Print Hp and HpMax
		var HPBASEY = 100;
		var diff = Math.floor((this.hpTrans - this.player.getHp())/5);
		if(diff == 0 && this.hpTrans > this.player.getHp()) diff = 1;
		if(diff == 0 && this.hpTrans < this.player.getHp()) diff = -1;
		this.hpTrans -= diff;
		g.font = "bold " + fontSize + "px Courier New";
		g.fillStyle = "black";
		g.fillText("HP:", StatusPanel.PANEL_BASE +16 + 2, HPBASEY + 2);
		g.fillText(this.hpTrans.toString(), StatusPanel.PANEL_BASE +16 + 2 + 4 * Equation.getXSize(fontSize), HPBASEY + 2);
		g.fillText("/", StatusPanel.PANEL_BASE +16 + 2 + 9 * Equation.getXSize(fontSize), HPBASEY + 2);
		g.fillText(this.player.getHpMax().toString(), StatusPanel.PANEL_BASE +16 + 2 + 10 * Equation.getXSize(fontSize), HPBASEY + 2);
		g.fillRect(StatusPanel.PANEL_BASE +16+2, HPBASEY+15+2, 3, 10);
		g.fillRect(StatusPanel.PANEL_BASE +150+2, HPBASEY+15+2, 3, 10);
		g.beginPath(); g.strokeStyle = "black"; g.moveTo(StatusPanel.PANEL_BASE +16+2, HPBASEY+20+2);g.lineTo(StatusPanel.PANEL_BASE +150+2, HPBASEY+20+2);g.stroke();
		g.fillRect(StatusPanel.PANEL_BASE +16+2, HPBASEY+15+2, (150-16)*this.hpTrans/this.player.getHpMax(), 10);
		g.fillStyle = "white";
		g.fillText("HP:", StatusPanel.PANEL_BASE +16, HPBASEY);
		g.fillText(this.hpTrans.toString(), StatusPanel.PANEL_BASE +16 + 4 * Equation.getXSize(fontSize), HPBASEY);
		g.fillText("/", StatusPanel.PANEL_BASE +16 + 9 * Equation.getXSize(fontSize), HPBASEY);
		g.fillText(this.player.getHpMax().toString(), StatusPanel.PANEL_BASE +16 + 10 * Equation.getXSize(fontSize), HPBASEY);
		g.fillStyle = "orange";
		g.fillRect(StatusPanel.PANEL_BASE +16, HPBASEY+15, 3, 10);
		g.fillRect(StatusPanel.PANEL_BASE +150, HPBASEY+15, 3, 10);
		g.beginPath(); g.strokeStyle = "orange"; g.moveTo(StatusPanel.PANEL_BASE +16, HPBASEY+20);g.lineTo(StatusPanel.PANEL_BASE +150, HPBASEY+20);g.stroke();
		g.fillRect(StatusPanel.PANEL_BASE +16, HPBASEY+15, (150-16)*this.hpTrans/this.player.getHpMax(), 10);
		
		//Print Sp and SpMax
		var SPBASEY = 150;
		diff = Math.floor((this.spTrans - this.player.getSp())/5);
		if(diff == 0 && this.spTrans > this.player.getSp()) diff = 1;
		if(diff == 0 && this.spTrans < this.player.getSp()) diff = -1;
		this.spTrans -= diff;
		g.font = "bold " + fontSize + "px Courier New";
		g.fillStyle = "black";
		g.fillText("SP:", StatusPanel.PANEL_BASE +16 + 2, SPBASEY + 2);
		g.fillText(this.spTrans.toString(), StatusPanel.PANEL_BASE +16 + 2 + 4 * Equation.getXSize(fontSize), SPBASEY + 2);
		g.fillText("/", StatusPanel.PANEL_BASE +16 + 2 + 9 * Equation.getXSize(fontSize), SPBASEY + 2);
		g.fillText(this.player.getSpMax().toString(), StatusPanel.PANEL_BASE +16 + 2 + 10 * Equation.getXSize(fontSize), SPBASEY + 2);
		g.fillRect(StatusPanel.PANEL_BASE +16+2, SPBASEY+15+2, 3, 10);
		g.fillRect(StatusPanel.PANEL_BASE +150+2, SPBASEY+15+2, 3, 10);
		g.beginPath(); g.strokeStyle = "black"; g.moveTo(StatusPanel.PANEL_BASE +16+2, SPBASEY+20+2);g.lineTo(StatusPanel.PANEL_BASE +150+2, SPBASEY+20+2);g.stroke();
		g.fillRect(StatusPanel.PANEL_BASE +16+2, SPBASEY+15+2, (150-16)*this.spTrans/this.player.getSpMax(), 10);
		g.fillStyle = "white";
		g.fillText("SP:", StatusPanel.PANEL_BASE +16, SPBASEY);
		g.fillText(this.spTrans.toString(), StatusPanel.PANEL_BASE +16 + 4 * Equation.getXSize(fontSize), SPBASEY);
		g.fillText("/", StatusPanel.PANEL_BASE +16 + 9 * Equation.getXSize(fontSize), SPBASEY);
		g.fillText(this.player.getSpMax().toString(), StatusPanel.PANEL_BASE +16 + 10 * Equation.getXSize(fontSize), SPBASEY);
		g.fillStyle = "red";
		g.fillRect(StatusPanel.PANEL_BASE +16, SPBASEY+15, 3, 10);
		g.fillRect(StatusPanel.PANEL_BASE +150, SPBASEY+15, 3, 10);
		g.beginPath(); g.strokeStyle = "red"; g.moveTo(StatusPanel.PANEL_BASE +16, SPBASEY+20);g.lineTo(StatusPanel.PANEL_BASE +150, SPBASEY+20);g.stroke();
		g.fillRect(StatusPanel.PANEL_BASE +16, SPBASEY+15, (150-16)*this.spTrans/this.player.getSpMax(), 10);
		
		//Print Mp and MpMax
		var MPBASEY = 200;
		diff = Math.floor((this.mpTrans - this.player.getMp())/5);
		if(diff == 0 && this.mpTrans > this.player.getMp()) diff = 1;
		if(diff == 0 && this.mpTrans < this.player.getMp()) diff = -1;
		this.mpTrans -= diff;
		g.font = "bold " + fontSize + "px Courier New";
		g.fillStyle = "black";
		g.fillText("MP:", StatusPanel.PANEL_BASE +16 + 2, MPBASEY + 2);
		g.fillText(this.mpTrans.toString(), StatusPanel.PANEL_BASE +16 + 2 + 4 * Equation.getXSize(fontSize), MPBASEY + 2);
		g.fillText("/", StatusPanel.PANEL_BASE +16 + 2 + 9 * Equation.getXSize(fontSize), MPBASEY + 2);
		g.fillText(this.player.getMpMax().toString(), StatusPanel.PANEL_BASE +16 + 2 + 10 * Equation.getXSize(fontSize), MPBASEY + 2);
		g.fillRect(StatusPanel.PANEL_BASE +16+2, MPBASEY+15+2, 3, 10);
		g.fillRect(StatusPanel.PANEL_BASE +150+2, MPBASEY+15+2, 3, 10);
		g.beginPath(); g.strokeStyle = "black"; g.moveTo(StatusPanel.PANEL_BASE +16+2, MPBASEY+20+2);g.lineTo(StatusPanel.PANEL_BASE +150+2, MPBASEY+20+2);g.stroke();
		g.fillRect(StatusPanel.PANEL_BASE +16+2, MPBASEY+15+2, (150-16)*this.mpTrans/this.player.getMpMax(), 10);
		g.fillStyle = "white";
		g.fillText("MP:", StatusPanel.PANEL_BASE +16, MPBASEY);
		g.fillText(this.mpTrans.toString(), StatusPanel.PANEL_BASE +16 + 4 * Equation.getXSize(fontSize), MPBASEY);
		g.fillText("/", StatusPanel.PANEL_BASE +16 + 9 * Equation.getXSize(fontSize), MPBASEY);
		g.fillText(this.player.getMpMax().toString(), StatusPanel.PANEL_BASE +16 + 10 * Equation.getXSize(fontSize), MPBASEY);
		g.fillStyle = "blue";
		g.fillRect(StatusPanel.PANEL_BASE +16, MPBASEY+15, 3, 10);
		g.fillRect(StatusPanel.PANEL_BASE +150, MPBASEY+15, 3, 10);
		g.beginPath(); g.strokeStyle = "blue"; g.moveTo(StatusPanel.PANEL_BASE +16+2, MPBASEY+20+2);g.lineTo(StatusPanel.PANEL_BASE +150+2, MPBASEY+20+2);g.stroke();
		g.fillRect(StatusPanel.PANEL_BASE +16, MPBASEY+15, (150-16)*this.mpTrans/this.player.getMpMax(), 10);
		
		//Print strength and defense
		g.fillStyle = "black";
		var STRBASE = 250;
		var DEFBASE = 270;
		var EXPBASE = 290;
		var WEABASE = 320;
		var ARMBASE = 340;
		var ACCBASE = 360;
		g.fillText("Str: " + this.player.getStrength().toString(), StatusPanel.PANEL_BASE +16+2, STRBASE+2);
		g.fillText("Def: " + this.player.getDefense().toString(), StatusPanel.PANEL_BASE +16+2, DEFBASE+2);
		g.fillText("Exp: " + this.player.getExperience().toString(), StatusPanel.PANEL_BASE +16+2, EXPBASE+2);
		if(this.player.getWieldedWeapon() != null) g.fillText("+" + this.player.getWieldedWeapon().getBaseDamage().toString() + "±" + this.player.getWieldedWeapon().getModDamage().toString(), StatusPanel.PANEL_BASE +100+2, STRBASE+2);
		if(this.player.getWornArmor() != null && this.player.getWornAccessory() != null) g.fillText("+" + (this.player.getWornArmor().getDefense()+this.player.getWornAccessory().getDefense()).toString() + "±" + (this.player.getWornArmor().getModDefense()+this.player.getWornAccessory().getModDefense()).toString(), StatusPanel.PANEL_BASE +100+2, DEFBASE+2);
		else if(this.player.getWornArmor() != null) g.fillText("+" + this.player.getWornArmor().getDefense().toString() + "±" + this.player.getWornArmor().getModDefense().toString(), StatusPanel.PANEL_BASE +100+2, DEFBASE+2);
		else if(this.player.getWornAccessory() != null) g.fillText("+" + this.player.getWornAccessory().getDefense().toString() + "±" + this.player.getWornAccessory().getModDefense().toString(), StatusPanel.PANEL_BASE +100+2, DEFBASE+2);
		g.fillStyle = "white";
		g.fillText("Str: " + this.player.getStrength().toString(), StatusPanel.PANEL_BASE +16, STRBASE);
		g.fillText("Def: " + this.player.getDefense().toString(), StatusPanel.PANEL_BASE +16, DEFBASE);
		g.fillText("Exp: " + this.player.getExperience().toString(), StatusPanel.PANEL_BASE +16, EXPBASE);
		if(this.player.getWieldedWeapon() != null) g.fillText("+" + this.player.getWieldedWeapon().getBaseDamage().toString() + "±" + this.player.getWieldedWeapon().getModDamage().toString(), StatusPanel.PANEL_BASE +100, STRBASE);
		if(this.player.getWornArmor() != null && this.player.getWornAccessory() != null) g.fillText("+" + (this.player.getWornArmor().getDefense()+this.player.getWornAccessory().getDefense()).toString() + "±" + (this.player.getWornArmor().getModDefense()+this.player.getWornAccessory().getModDefense()).toString(), StatusPanel.PANEL_BASE +100, DEFBASE);
		else if(this.player.getWornArmor() != null) g.fillText("+" + this.player.getWornArmor().getDefense().toString() + "±" + this.player.getWornArmor().getModDefense().toString(), StatusPanel.PANEL_BASE +100, DEFBASE);
		else if(this.player.getWornAccessory() != null) g.fillText("+" + this.player.getWornAccessory().getDefense().toString() + "±" + this.player.getWornAccessory().getModDefense().toString(), StatusPanel.PANEL_BASE +100, DEFBASE);
		
		if(this.player.getWieldedWeapon() != null) {
			g.fillStyle = "black"; g.fillText(this.player.getWieldedWeapon().getName().toString(), StatusPanel.PANEL_BASE +16+2, WEABASE+2);
			g.fillStyle = "white"; g.fillText(this.player.getWieldedWeapon().getName().toString(), StatusPanel.PANEL_BASE +16, WEABASE);
		}
		else {
			g.fillStyle = "black"; g.fillText("----------",StatusPanel.PANEL_BASE +16+2,WEABASE+2);
			g.fillStyle = "white"; g.fillText("----------",StatusPanel.PANEL_BASE +16,WEABASE);
		}
		if(this.player.getWornArmor() != null) {
			g.fillStyle = "black";g.fillText(this.player.getWornArmor().getName().toString(), StatusPanel.PANEL_BASE +16+2, ARMBASE+2);
			g.fillStyle = "white";g.fillText(this.player.getWornArmor().getName().toString(), StatusPanel.PANEL_BASE +16, ARMBASE);
		}
		else {
			g.fillStyle = "black";g.fillText("----------",StatusPanel.PANEL_BASE +16+2,ARMBASE+2);
			g.fillStyle = "white";g.fillText("----------",StatusPanel.PANEL_BASE +16,ARMBASE);
		}
		if(this.player.getWornAccessory() != null) {
			g.fillStyle = "black";g.fillText(this.player.getWornAccessory().getName().toString(), StatusPanel.PANEL_BASE +16+2, ACCBASE+2);
			g.fillStyle = "white";g.fillText(this.player.getWornAccessory().getName().toString(), StatusPanel.PANEL_BASE +16, ACCBASE);
		}
		else {
			g.fillStyle = "black";g.fillText("----------",StatusPanel.PANEL_BASE +16+2,ACCBASE+2);
			g.fillStyle = "white";g.fillText("----------",StatusPanel.PANEL_BASE +16,ACCBASE);
		}
		
		
		//Print strength and defense
		g.fillStyle = "black";
		this.MENUBASE = 400;
		this.ITEMBASE = 430;
		this.WEAPONBASE = 460;
		this.ARMORBASE = 490;
		this.SKILLBASE = 520;
		this.MAGICBASE = 550;
		this.TRADEITEMBASE = 580;
		this.KEYITEMBASE = 610;
		this.SPEEDBASE = 640;
		g.font = "bold 25px Courier New";
		g.fillText("(M)ENU", StatusPanel.PANEL_BASE +14+2, this.MENUBASE+2);
		g.fillText("ITEMS", StatusPanel.PANEL_BASE +16+2, this.ITEMBASE+2);
		g.fillText("WEAPON", StatusPanel.PANEL_BASE +16+2, this.WEAPONBASE+2);
		g.fillText("ARMOR", StatusPanel.PANEL_BASE +16+2, this.ARMORBASE+2);
		g.fillText("SKILLS", StatusPanel.PANEL_BASE +16+2, this.SKILLBASE+2);
		g.fillText("MAGIC", StatusPanel.PANEL_BASE +16+2, this.MAGICBASE+2);
		g.fillText("TR. ITEM", StatusPanel.PANEL_BASE +16+2, this.TRADEITEMBASE+2);
		g.fillText("KEY ITEMS", StatusPanel.PANEL_BASE +16+2, this.KEYITEMBASE+2);
		g.fillText("+/- Spd:" + (20-this.worldHandle.getCurrentSpeed()/10), StatusPanel.PANEL_BASE +16+2, this.SPEEDBASE+2);
		g.fillStyle = "white";
		g.fillText("(M)ENU", StatusPanel.PANEL_BASE +14, this.MENUBASE);
		g.fillText("ITEMS", StatusPanel.PANEL_BASE +16, this.ITEMBASE);
		g.fillText("WEAPON", StatusPanel.PANEL_BASE +16, this.WEAPONBASE);
		g.fillText("ARMOR", StatusPanel.PANEL_BASE +16, this.ARMORBASE);
		g.fillText("SKILLS", StatusPanel.PANEL_BASE +16, this.SKILLBASE);
		g.fillText("MAGIC", StatusPanel.PANEL_BASE +16, this.MAGICBASE);
		g.fillText("TR. ITEM", StatusPanel.PANEL_BASE +16, this.TRADEITEMBASE);
		g.fillText("KEY ITEMS", StatusPanel.PANEL_BASE +16, this.KEYITEMBASE);
		g.fillText("+/- Spd:" + (20-this.worldHandle.getCurrentSpeed()/10), StatusPanel.PANEL_BASE +16, this.SPEEDBASE);
		
		//Display gold
		var GOLDBASEY = 680;
		g.font = "bold 32px Courier New";
		g.fillStyle = "black";
		if(this.player.getGold() == 0) g.fillText("0G", StatusPanel.PANEL_BASE +120 - (1)*Equation.getXSize(32) + 2, GOLDBASEY + 2);
		else g.fillText(this.player.getGold().toString() + "G", StatusPanel.PANEL_BASE +120 - (Math.floor(Math.log10(this.player.getGold())))*Equation.getXSize(32) + 2, GOLDBASEY + 2);
		g.fillStyle = "white";
		if(this.player.getGold() == 0) g.fillText("0G", StatusPanel.PANEL_BASE +120 - (1)*Equation.getXSize(32), GOLDBASEY);
		else g.fillText(this.player.getGold().toString() + "G", StatusPanel.PANEL_BASE +120 - (Math.floor(Math.log10(this.player.getGold())))*Equation.getXSize(32), GOLDBASEY);
		
		
	}
	
	redraw() {
		//repaint();
	}
	
	clickedOnPanel(xPoint, yPoint) {
	
	//private class MListener extends MouseAdapter {
		
	//	public void mouseClicked(MouseEvent e) {
		
		if(xPoint < StatusPanel.PANEL_BASE) {
			return;
		}
		
		
		
		var diff = this.ITEMBASE - this.MENUBASE;
		if(yPoint > this.MENUBASE - diff && yPoint < this.MENUBASE) {
			this.worldHandle.processMessage(new Message("Open Menu"));
		}
		if(yPoint > this.ITEMBASE - diff && yPoint < this.ITEMBASE) {
			this.worldHandle.processMessage(new Message("Open Menu",0));
		}
		if(yPoint > this.WEAPONBASE - diff && yPoint < this.WEAPONBASE) {
			this.worldHandle.processMessage(new Message("Open Menu",1));
		}
		if(yPoint > this.ARMORBASE - diff && yPoint < this.ARMORBASE) {
			this.worldHandle.processMessage(new Message("Open Menu",2));
		}
		if(yPoint > this.SKILLBASE - diff && yPoint < this.SKILLBASE) {
			this.worldHandle.processMessage(new Message("Open Menu",3));
		}
		if(yPoint > this.MAGICBASE - diff && yPoint < this.MAGICBASE) {
			this.worldHandle.processMessage(new Message("Open Menu",4));
		}
		if(yPoint > this.TRADEITEMBASE - diff && yPoint < this.TRADEITEMBASE) {
			this.worldHandle.processMessage(new Message("Open Menu",5));
		}
		if(yPoint > this.KEYITEMBASE - diff && yPoint < this.KEYITEMBASE) {
			this.worldHandle.processMessage(new Message("Open Menu",6));
		}
		if(yPoint > this.SPEEDBASE - diff && yPoint < this.SPEEDBASE) {
			if(xPoint < 30 + StatusPanel.PANEL_BASE)
				this.worldHandle.processMessage(new Message("Speed Up"));
			else if(xPoint < 60 + StatusPanel.PANEL_BASE)
				this.worldHandle.processMessage(new Message("Slow Down"));
		}
	}
}
	/*
	public void changeHP(int amount) {
		hp += amount;
		repaint();
	}
	
	public void addPoints(int amount) {
		points += amount;
		repaint();
	}
	
	public void giveKey(int num) {
		if(num == 1) gotKey1 = true;
		if(num == 2) gotKey2 = true;
		if(num == 3) gotKey3 = true;
		if(num == 4) gotKey4 = true;
		repaint();
	}
	
	public boolean checkKey(int num) {
		if(num == 1) return gotKey1;
		if(num == 2) return gotKey2;
		if(num == 3) return gotKey3;
		if(num == 4) return gotKey4;
		return false;
	}
	
	public int getHP() {
		return hp;
	}
	
	public int getPoints() {
		return points;
	}
	
	public boolean gotBonus() {
		return !clickBlank;
	}
	*/
	
StatusPanel.PREFERRED_X_SIZE = 200;
StatusPanel.PREFERRED_Y_SIZE = 500;
StatusPanel.PANEL_BASE = GameEngine.PANEL_WIDTH-StatusPanel.PREFERRED_X_SIZE;
