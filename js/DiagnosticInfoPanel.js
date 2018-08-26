class DiagnosticInfoPanel {

	constructor() {
		this.selecting = 0;
		this.itemNumber = 0;
		this.flagNumber = 0;
		this.img = document.createElement("img");
		this.img.src = "window04.png";
		
//		this.setPreferredSize(new Dimension(500,300));
	}
	
	setPlayer(pl) {
		this.player = pl;
		this.paintComponent();
	}
	
	paintComponent(g) {
		var canvas = document.getElementById("diagPanel");
		var g = canvas.getContext("2d");
		var fontSize = 16;
		
		
		//Main Background
		g.drawImage(this.img,0,0,64,64, 0, 0, canvas.width,canvas.height);
		//Texture
		for(var i = 0; i < 20; i++) {
			for(var j = 0; j < 20; j++) {
				g.drawImage(this.img,0,64,64,64, i*64, j*64, 64, 64);
			}
		}
		
		//Sides
		g.drawImage(this.img,64,16,16,16, 0, 0, 16,canvas.height);
		g.drawImage(this.img,64+48,16,16,16, canvas.width -16, 0, 16,canvas.height);
		g.drawImage(this.img,64+16,0,32,16, 0, 0, canvas.width,16);
		g.drawImage(this.img,64+16,48,32,16, 0, canvas.height-16, canvas.width,16);
		//Corners
		g.drawImage(this.img, 64,0,16,16, 0,0,16,16);
		g.drawImage(this.img, 64+48,0,16,16, canvas.width-16,0,16,16);
		g.drawImage(this.img, 64,48,16,16, 0,canvas.height-16,16,16);
		g.drawImage(this.img, 64+48,48,16,16, canvas.width-16,canvas.height-16,16,16);
				
		
		//Print strength and defense
		g.fillStyle = "black";
		var LEVBASE = 50;
		var STRBASE = 70;
		var DEFBASE = 90;
		var HPMBASE = 110;
		var SPMBASE = 130;
		var MPMBASE = 150;
		var EXPBASE = 170;
		var GOLBASE = 190;
		var REPBASE = 210;
		var HEABASE = 230;
		var EXIBASE = 250;
		
		g.font = "bold " + fontSize + "px Courier New";
		g.fillStyle = "black";
		g.fillText("q/w Level -/+", 16+2, LEVBASE+2);
		g.fillText("a/s Strength -/+" , 16+2, STRBASE+2);
		g.fillText("z/x Defense -/+", 16+2, DEFBASE+2);
		g.fillText("e/r HP Max -10/+10", 16+2, HPMBASE+2);
		g.fillText("d/f SP Max -10/+10" , 16+2, SPMBASE+2);
		g.fillText("c/v MP Max -10/+10", 16+2, MPMBASE+2);
		g.fillText("t/y Experience -100/+100", 16+2, EXPBASE+2);
		g.fillText("g/h Gold -1000/+1000" , 16+2, GOLBASE+2);
		g.fillText("b - Repel Monsters" , 16+2, REPBASE+2);
		g.fillText("n - All Heal" , 16+2, HEABASE+2);
		g.fillText("p - Exit Diagnostic Mode" , 16+2, EXIBASE+2);
		
		
		g.fillStyle = "white";
		g.fillText("q/w Level -/+", 16, LEVBASE);
		g.fillText("a/s Strength -/+" , 16, STRBASE);
		g.fillText("z/x Defense -/+", 16, DEFBASE);
		g.fillText("e/r HP Max -10/+10", 16, HPMBASE);
		g.fillText("d/f SP Max -10/+10" , 16, SPMBASE);
		g.fillText("c/v MP Max -10/+10", 16, MPMBASE);
		g.fillText("t/y Experience -100/+100", 16, EXPBASE);
		g.fillText("g/h Gold -1000/+1000" , 16, GOLBASE);
		g.fillText("b - Repel Monsters" , 16, REPBASE);
		g.fillText("n - All Heal" , 16, HEABASE);
		g.fillText("p - Exit Diagnostic Mode" , 16, EXIBASE);
		
		var sel = "";
		var item = "";
		if(this.selecting == 0) {sel = "Item"; item = Item.getItem(this.itemNumber).getName();}
		if(this.selecting == 1) {sel = "Skill"; item = Skill.getSkill(this.itemNumber).getName();}
		if(this.selecting == 2) {sel = "Spell"; item = Spell.getSpell(this.itemNumber).getName();}
		if(this.selecting == 3) {sel = "Weapon"; item = Weapon.getWeapon(this.itemNumber).getName();}
		if(this.selecting == 4) {sel = "Armor"; item = Armor.getArmor(this.itemNumber).getName();}
		if(this.selecting == 5) {sel = "Trade"; item = TradeItem.getItem(this.itemNumber).getName();}
		if(this.selecting == 6) {sel = "Key Item"; item = KeyItem.getKeyItem(this.itemNumber).getName();}
		
		var SELBASE = 50;
		var INOBASE = 70;
		var TRNBASE = 90;
		var CATBASE = 120;
		var ITMBASE = 150;
		var FLGBASE = 180;
		var VALBASE = 200;
		var CFLBASE = 220;
		var TOGBASE = 240;
		
		g.fillStyle = "black";
		g.fillText("j/l Change type", 300+2, SELBASE+2);
		g.fillText("i/k Change Item" , 300+2, INOBASE+2);
		g.fillText("u - Give/Train item", 300+2, TRNBASE+2);
		g.fillText(sel, 300+2, CATBASE+2);
		g.fillText(item, 300+2, ITMBASE+2);
		g.fillText("Flag Number " + this.flagNumber, 300+2, FLGBASE+2);
		if(this.player != null)
			g.fillText("is " + this.player.getFlag(this.flagNumber) , 300+2, VALBASE+2);
		g.fillText("1/2 Change Flag", 300+2, CFLBASE+2);
		g.fillText("3 - Toggle Flag", 300+2, TOGBASE+2);
				
		
		g.fillStyle = "white";
		g.fillText("j/l Change type", 300, SELBASE);
		g.fillText("i/k Change Item" , 300, INOBASE);
		g.fillText("u - Give/Train item", 300, TRNBASE);
		g.fillText(sel, 300, CATBASE);
		g.fillText(item, 300, ITMBASE);
		g.fillText("Flag Number " + this.flagNumber, 300, FLGBASE);
		if(this.player != null)
			g.fillText("is " + this.player.getFlag(this.flagNumber) , 300, VALBASE);
		g.fillText("1/2 Change Flag", 300, CFLBASE);
		g.fillText("3 - Toggle Flag", 300, TOGBASE);
		
	}
	
	setSelecting(num) {
		this.selecting = num;
		this.paintComponent();
	}
	
	setItem(num) {
		this.itemNumber = num;
		this.paintComponent();
	}
	
	setFlag(num) {
		this.flagNumber = num;
		this.paintComponent();
	}
}
