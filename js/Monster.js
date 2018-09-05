class Monster {

	constructor(p, fileName, n, w, h) {
		this.file = fileName;
		this.name = n;
		
		var input = document.createElement("img");
		input.src = "battle/" + this.file;

		this.loadLock = true;
		input.onload = function() {
			this.monImage = document.createElement("canvas");
			this.monImage.width = input.width.toString();
			this.monImage.height = input.height.toString();
			this.monImage.getContext("2d").drawImage(input, 0, 0);
			this.makeGray();
			this.loadLock = false;
		}.bind(this);
		
		this.width = w;//270
		this.height = h;//200
		this.x = (Battle.MAIN_WINDOW_X2+Battle.MAIN_WINDOW_X1)/2-this.width/2;
		this.y = (Battle.MAIN_WINDOW_Y2+Battle.MAIN_WINDOW_Y1)/2-this.height/2;
		
		this.EQSIZE = 16;
		var theeq = "10";
		this.startingHp = theeq;
		this.hp = new Equation(theeq,this.EQSIZE);
		//this.hp = new Equation(theeq,x + this.width/2 - this.hp.getLength()/2,Battle.MAIN_WINDOW_Y2-(Battle.MAIN_WINDOW_Y2-Battle.MAIN_WINDOW_Y1)/8,EQSIZE);
		this.str = 1;
		this.strMod = 1;
		this.def = 1;
		this.defMod = 1;
		this.tic = 0;
		this.plusC = 20;
		this.hpBackColor = "#AAAAAA";
		this.shields = [];
		this.startingShields = [];
		this.undead = false;
		this.runnable = true;
		this.xp = 1;
		this.player = p;
		this.root = new AIAttackNode("Plague",this);
		
		//this.shields.push("Derivative");
		//this.shields.push("Plug In All");
		
	}
	
	setStats(st, stm, de, dem, h, exp, ml, lev) {
	    if(typeof lev === "undefined") {
	        lev = ml;
	        ml = 1;
	    }
		this.level = lev;
		this.str = st;
		this.strMod = stm;
		this.def = de;
		this.defMod = dem;
		this.startingHp = h;
		this.hp = new Equation(h,this.EQSIZE);
		//this.hp = new Equation(h,x + this.width/2 - this.hp.getLength()/2,Battle.MAIN_WINDOW_Y2-(Battle.MAIN_WINDOW_Y2-Battle.MAIN_WINDOW_Y1)/8,this.EQSIZE);
		this.xp = exp;
		this.magicLevel = ml;
	}
	
	setHp(h) {
		this.startingHp = h;
		this.hp = new Equation(h,this.EQSIZE);
		//this.hp = new Equation(h,x + this.width/2 - this.hp.getLength()/2,Battle.MAIN_WINDOW_Y2-(Battle.MAIN_WINDOW_Y2-Battle.MAIN_WINDOW_Y1)/8,this.EQSIZE);
	}
	
	getMagicLevel() {
		return this.magicLevel;
	}
	
	makeUndead() {
		this.undead = true;
	}
	
	restore() {
		this.hp = new Equation(this.startingHp,this.EQSIZE);
		//this.hp = new Equation(this.startingHp,x + this.width/2 - this.hp.getLength()/2,Battle.MAIN_WINDOW_Y2-(Battle.MAIN_WINDOW_Y2-Battle.MAIN_WINDOW_Y1)/8,this.EQSIZE);
		this.shields = [];
		for(var i = 0; i < this.startingShields.length; i++) {
			this.shields.push(this.startingShields[i]);
		}
		
	}
	
	setRunnable(r) {
		this.runnable = r;
	}
	
	addShield(sh) {
		for(var i = 0; i < this.shields.length; i++) {
			if(this.shields[i] === sh) return;
		}
		this.shields.push(sh);
	}
	
	removeShield(sh) {
		for(var i = 0; i < this.shields.length; i++) {
			if(this.shields[i] === sh) this.shields.splice(i,1);
		}
	}
	
	setStartingShields() {
		this.startingShields = [];
		for(var i = 0; i < this.shields.length; i++) {
			this.startingShields.push(this.shields[i]);
		}
	}
	
	getShields() {
		return this.shields;
	}
	
	isShielded(sh) {
		for(var i = 0; i < this.shields.length; i++) {
			if(this.shields[i] === sh) return true;
		}
		return false;
	}
	
	setPlusC(num) {
		this.plusC = num;
	}
	
	setAI(node) {
		this.root = node;
	}
	
	getName() {
		return this.name;
	}
	
	getLevel() {
		return this.level;
	}
	
	getRunnable() {
		return this.runnable;
	}
	
	printMonster(g) {
		if(this.loadLock) return;
		g.drawImage(this.monImage, 0,0,this.monImage.width,this.monImage.height, this.x, this.y, this.width, this.height);
		
		g.fillStyle = "black";
		g.strokeStyle = "black";
		Player.roundRect(g, this.x + this.width/2 - this.hp.getLength()/2+2-10, Battle.MAIN_WINDOW_Y2-(Battle.MAIN_WINDOW_Y2-Battle.MAIN_WINDOW_Y1)/8+2-this.hp.getHeight()/2-6, this.hp.getLength()+20, this.hp.getHeight()+4,10,10);
		g.fillStyle = this.hpBackColor;
		g.strokeStyle = this.hpBackColor;
		Player.roundRect(g, this.x + this.width/2 - this.hp.getLength()/2-10, Battle.MAIN_WINDOW_Y2-(Battle.MAIN_WINDOW_Y2-Battle.MAIN_WINDOW_Y1)/8-this.hp.getHeight()/2-6, this.hp.getLength()+20, this.hp.getHeight()+4,10,10);
		this.hp.printEquation(g,this.x + this.width/2 - this.hp.getLength()/2,Battle.MAIN_WINDOW_Y2-(Battle.MAIN_WINDOW_Y2-Battle.MAIN_WINDOW_Y1)/8);
	
	}
	
	makeGray() {
		var pix = this.monImage.getContext("2d").getImageData(0,0,parseInt(this.monImage.width),parseInt(this.monImage.height));
		for(var i = 0; i < pix.data.length; i += 4) {
			pix.data[i+1] = pix.data[i];
			pix.data[i+2] = pix.data[i];
		}
		this.grayImage = document.createElement("canvas");
		this.grayImage.width = this.monImage.width;
		this.grayImage.height = this.monImage.height;
		this.grayImage.getContext("2d").putImageData(pix, 0, 0)
	}
	
	flash() {
		var temp = this.grayImage;
		this.grayImage = this.monImage;
		this.monImage = temp;
	}
	
	setHpBackColor(r, g, b) {
	    var rhex = r.toString(16);
	    rhex = rhex.length == 1 ? "0" + rhex : rhex;
	    var ghex = g.toString(16);
	    ghex = ghex.length == 1 ? "0" + ghex : ghex;
	    var bhex = b.toString(16);
	    bhex = bhex.length == 1 ? "0" + bhex : bhex;
		this.hpBackColor = "#" + rhex + ghex + bhex;
	}
	
	isHpConstant() {
		return this.hp.isConstant();
	}
	
	getHpEquation() {
		return this.hp;
	}
	
	getX() {
		return this.x;
	}
	
	getY() {
		return this.y;
	}
	
	getWidth() {
		return this.width;
	}
	
	getHeight() {
		return this.height;
	}
	
	getXp() {
		return this.xp;
	}
	
	getImageWidth() {
		return parseInt(this.monImage.width);
	}
	
	getImageHeight() {
		return parseInt(this.monImage.height);
	}
	
	changeHp(a) {
		this.hp.add(a);
		var temp = this.hp.getEquation();
		this.hp = new Equation(temp,this.EQSIZE);
		//this.hp = new Equation(this.hp.getEquation(),x + width/2 - this.hp.getLength()/2,Battle.MAIN_WINDOW_Y2-(Battle.MAIN_WINDOW_Y2-Battle.MAIN_WINDOW_Y1)/8,this.EQSIZE);
	}
	
	derivative() {
		var temp = this.hp.derivative();
		this.hp = new Equation(temp,this.EQSIZE);
		//this.hp = new Equation(this.hp.getEquation(),x + width/2 - this.hp.getLength()/2,Battle.MAIN_WINDOW_Y2-(Battle.MAIN_WINDOW_Y2-Battle.MAIN_WINDOW_Y1)/8,this.EQSIZE);
	}
	
	integrate(low, high) {
		var temp = this.hp.integrate(low,high);
		this.hp = new Equation(temp,this.EQSIZE);
		//this.hp = new Equation(this.hp.getEquation(),x + width/2 - this.hp.getLength()/2,Battle.MAIN_WINDOW_Y2-(Battle.MAIN_WINDOW_Y2-Battle.MAIN_WINDOW_Y1)/8,this.EQSIZE);
	}
	
	attackAmount() {
		return Math.floor(Math.random() * this.strMod) + this.str;
	}
	
	defenseAmount() {
		return Math.floor(Math.random() * this.defMod) + this.def;
	}
	
	processShield(check) {
		var action = check.getType().substring(13);
		//System.out.println("The action =" + action);
		for(var i = 0; i < this.shields.length; i++) {
			if(this.shields[i] === action || 
					(action.length >= 7 && this.shields[i].length >=7 && action.substring(0, 7) === this.shields[i].substring(0, 7) && this.shields[i].substring(this.shields[i].length-3) === "All") ||
					(action.length >= 5 && this.shields[i].length >=5 && action.substring(0, 5) === this.shields[i].substring(0, 5) && this.shields[i].substring(this.shields[i].length-3) === "All")) {
				var temp1 = new Animation("Clear Message");
				var temp2 = new Animation("Pause",3);
				var temp3 = new Animation("Add Message",new WindowMessage(check.getType().substring(6),false));
				var temp4 = new Animation("Open Message");
				var temp5 = new AnimationShield(this,this.getX(),this.getY(),this.getWidth(),this.getHeight());
				var temp6 = new Animation("Clear Message");
				var temp7 = new Animation("Check Death");
				var temp8 = new Animation("Monster Turn");
				check.setNext(temp1);temp1.setNext(temp2);temp2.setNext(temp3);temp3.setNext(temp4);temp4.setNext(temp5);temp5.setNext(temp6);temp6.setNext(temp7);temp7.setNext(temp8);
			}
		}
	}
	
	isDead() {
		if(this.hp.isConstant()) {
			if(this.hp.evaluate(0) < 1 && !this.undead) {
				return true;
			}
			if(this.hp.evaluate(0) == 0 && this.undead) {
				return true;
			}
		}
		return false;
	}
	
	getImage() {
		return this.monImage;
	}
	
	plugIn(xVal) {
		this.hp.plugIn(xVal);
		var temp = this.hp.getEquation();
		this.hp = new Equation(temp,this.EQSIZE);
		//this.hp = new Equation(this.hp.getEquation(),x + width/2 - this.hp.getLength()/2,Battle.MAIN_WINDOW_Y2-(Battle.MAIN_WINDOW_Y2-Battle.MAIN_WINDOW_Y1)/8,this.EQSIZE);
	}
	
	evaluateAnimate() {
		this.tic++;
		if(this.tic <= AnimationEvaluateAnimate.MAXTICS)
			this.hp.evaluateAnimate();
		if(this.tic == AnimationEvaluateAnimate.MAXTICS) {
			this.hp = new Equation(this.hp.createString(),this.EQSIZE);
			//this.hp = new Equation(this.hp.getEquation(),x + width/2 - this.hp.getLength()/2,Battle.MAIN_WINDOW_Y2-(Battle.MAIN_WINDOW_Y2-Battle.MAIN_WINDOW_Y1)/8,this.EQSIZE);
			this.tic = 0;
		}
		
	}
	
	attack() {
		return this.root.getAttack();
	}
	
	getAttackAnimation(att, m, mul) {
		var temp1 = new AnimationMonsterFlash(this);
		var temp3 = new Animation("Open Message");
		var temp4 = new Animation("Pause",8);
		var temp8 = new Animation("Clear Message");
		var temp9 = new Animation("Check Death");
		var temp10 = new Animation("Open Options");
		
		if(att === "Subtract") {
			var temp2 = new Animation("Add Message",new WindowMessage("Subtract",false));
			var temp5 = new AnimationStandard("Slash.png",Battle.PLAYER_WINDOW_X1,Battle.PLAYER_WINDOW_Y1,Battle.PLAYER_WINDOW_X2-Battle.PLAYER_WINDOW_X1,Battle.PLAYER_WINDOW_Y2-Battle.PLAYER_WINDOW_Y1,18,10);
			var monsterDamage = this.player.filterDamage(Math.floor (this.attackAmount()*mul))*-1;
			var temp6 = new Animation("Damage Player",monsterDamage);		
			var temp7 = new AnimationDamage("Damage",(Battle.PLAYER_WINDOW_X1+Battle.PLAYER_WINDOW_X2)/2,Battle.PLAYER_WINDOW_Y1+((Battle.PLAYER_WINDOW_Y2-Battle.PLAYER_WINDOW_Y1)*7)/8,monsterDamage);
			temp1.setNext(temp2);temp2.setNext(temp3);temp3.setNext(temp4);temp4.setNext(temp5);temp5.setNext(temp6);temp6.setNext(temp7);temp7.setNext(temp8);temp8.setNext(temp9);temp9.setNext(temp10);
		}
		if(att.length >= 7 && att.substring(0,7) === "Plug In") {
			var temp2 = new Animation("Add Message",new WindowMessage(att,false));
			temp4 = new AnimationPlugIn(att,Battle.PLAYER_WINDOW_X1,Battle.PLAYER_WINDOW_Y1,Battle.PLAYER_WINDOW_X2-Battle.PLAYER_WINDOW_X1,Battle.PLAYER_WINDOW_Y2-Battle.PLAYER_WINDOW_Y1,parseInt(att.substring(8)));
			var temp5 = new Animation("Player Plug In",parseInt(att.substring(8)));
			var temp6 = new AnimationEvaluateAnimate(this.player);
			temp1.setNext(temp2);temp2.setNext(temp3);temp3.setNext(temp4);temp4.setNext(temp5);temp5.setNext(temp6);temp6.setNext(temp8);temp8.setNext(temp9);temp9.setNext(temp10);
		}
		if(att === "Restore") {
			var temp2 = new Animation("Add Message",new WindowMessage("Restore",false));
			var temp5 = new AnimationRestore(this);
			temp1.setNext(temp2);temp2.setNext(temp3);temp3.setNext(temp4);temp4.setNext(temp5);temp5.setNext(temp8);temp8.setNext(temp9);temp9.setNext(temp10);
		}
		if(att.length >= 6 && att.substring(0,6) === "Shield") {
			var temp2 = new Animation("Add Message",new WindowMessage(att,false));
			var temp5 = new AnimationMakeShield(m,m.getX(),m.getY(), m.getWidth(), m.getHeight(),att);
			temp1.setNext(temp2);temp2.setNext(temp3);temp3.setNext(temp4);temp4.setNext(temp5);temp5.setNext(temp8);temp8.setNext(temp9);temp9.setNext(temp10);
		}
		if(att.length >= 8 && att.substring(0,8) === "Unshield") {
			var temp2 = new Animation("Add Message",new WindowMessage(att,false));
			var temp5 = new AnimationUnshield(m,m.getX(),m.getY(), m.getWidth(), m.getHeight(),att);
			temp1.setNext(temp2);temp2.setNext(temp3);temp3.setNext(temp4);temp4.setNext(temp5);temp5.setNext(temp8);temp8.setNext(temp9);temp9.setNext(temp10);
		}
		if(att === "Heal") {
			var temp2 = new Animation("Add Message",new WindowMessage("Heal",false));
			var temp5 = new AnimationHeal(m,m.getX(),m.getY(), m.getWidth(), m.getHeight());
			var healAmount = 3 * this.getMagicLevel() + Math.floor (Math.random()*10);
			var temp6 = new AnimationDamage("Heal",m.getX()+m.getWidth()/2,m.getY()+(m.getHeight()*7)/8,healAmount);
			var temp7 = new Animation("Subtract Equation",healAmount);
			temp1.setNext(temp2);temp2.setNext(temp3);temp3.setNext(temp4);temp4.setNext(temp5);temp5.setNext(temp6);temp6.setNext(temp7);temp7.setNext(temp8);temp8.setNext(temp9);temp9.setNext(temp10);
		}
		if(att === "Water Drop") {
			var temp2 = new Animation("Add Message",new WindowMessage("Water Drop",false));
			var temp5 = new AnimationStandard("WaterDrop.png",Battle.PLAYER_WINDOW_X1,Battle.PLAYER_WINDOW_Y1,Battle.PLAYER_WINDOW_X2-Battle.PLAYER_WINDOW_X1,Battle.PLAYER_WINDOW_Y2-Battle.PLAYER_WINDOW_Y1,25,10);
			var monsterDamage = this.player.filterDamage(Math.floor (this.attackAmount()*mul))*-1;
			var temp6 = new Animation("Damage Player",monsterDamage);
			var temp7 = new AnimationDamage("Damage",(Battle.PLAYER_WINDOW_X1+Battle.PLAYER_WINDOW_X2)/2,Battle.PLAYER_WINDOW_Y1+((Battle.PLAYER_WINDOW_Y2-Battle.PLAYER_WINDOW_Y1)*7)/8,monsterDamage);
			temp1.setNext(temp2);temp2.setNext(temp3);temp3.setNext(temp4);temp4.setNext(temp5);temp5.setNext(temp6);temp6.setNext(temp7);temp7.setNext(temp8);temp8.setNext(temp9);temp9.setNext(temp10);
		}
		if(att === "Claw") {
			var temp2 = new Animation("Add Message",new WindowMessage("Claw",false));
			var temp5 = new AnimationStandard("Claw.png", Battle.PLAYER_WINDOW_X1,Battle.PLAYER_WINDOW_Y1,Battle.PLAYER_WINDOW_X2-Battle.PLAYER_WINDOW_X1,Battle.PLAYER_WINDOW_Y2-Battle.PLAYER_WINDOW_Y1,12,5);
			var monsterDamage = this.player.filterDamage(Math.floor (this.attackAmount()*mul))*-1;
			var temp6 = new Animation("Damage Player",monsterDamage);
			var temp7 = new AnimationDamage("Damage",(Battle.PLAYER_WINDOW_X1+Battle.PLAYER_WINDOW_X2)/2,Battle.PLAYER_WINDOW_Y1+((Battle.PLAYER_WINDOW_Y2-Battle.PLAYER_WINDOW_Y1)*7)/8,monsterDamage);
			temp1.setNext(temp2);temp2.setNext(temp3);temp3.setNext(temp4);temp4.setNext(temp5);temp5.setNext(temp6);temp6.setNext(temp7);temp7.setNext(temp8);temp8.setNext(temp9);temp9.setNext(temp10);
		}
		if(att === "Bite") {
			var temp2 = new Animation("Add Message",new WindowMessage("Bite",false));
			var temp5 = new AnimationBite(this.player,Battle.PLAYER_WINDOW_X1,Battle.PLAYER_WINDOW_Y1,Battle.PLAYER_WINDOW_X2-Battle.PLAYER_WINDOW_X1,Battle.PLAYER_WINDOW_Y2-Battle.PLAYER_WINDOW_Y1);
			var monsterDamage = this.player.filterDamage(Math.floor (this.attackAmount()*mul))*-1;
			var temp6 = new Animation("Damage Player",monsterDamage);
			var temp7 = new AnimationDamage("Damage",(Battle.PLAYER_WINDOW_X1+Battle.PLAYER_WINDOW_X2)/2,Battle.PLAYER_WINDOW_Y1+((Battle.PLAYER_WINDOW_Y2-Battle.PLAYER_WINDOW_Y1)*7)/8,monsterDamage);
			temp1.setNext(temp2);temp2.setNext(temp3);temp3.setNext(temp4);temp4.setNext(temp5);temp5.setNext(temp6);temp6.setNext(temp7);temp7.setNext(temp8);temp8.setNext(temp9);temp9.setNext(temp10);
		}
		if(att === "Strike") {
			var temp2 = new Animation("Add Message",new WindowMessage("Strike",false));
			var temp5 = new AnimationStrike(this.player,Battle.PLAYER_WINDOW_X1,Battle.PLAYER_WINDOW_Y1,Battle.PLAYER_WINDOW_X2-Battle.PLAYER_WINDOW_X1,Battle.PLAYER_WINDOW_Y2-Battle.PLAYER_WINDOW_Y1);
			var monsterDamage = this.player.filterDamage(Math.floor (this.attackAmount()*mul))*-1;
			var temp6 = new Animation("Damage Player",monsterDamage);
			var temp7 = new AnimationDamage("Damage",(Battle.PLAYER_WINDOW_X1+Battle.PLAYER_WINDOW_X2)/2,Battle.PLAYER_WINDOW_Y1+((Battle.PLAYER_WINDOW_Y2-Battle.PLAYER_WINDOW_Y1)*7)/8,monsterDamage);
			temp1.setNext(temp2);temp2.setNext(temp3);temp3.setNext(temp4);temp4.setNext(temp5);temp5.setNext(temp6);temp6.setNext(temp7);temp7.setNext(temp8);temp8.setNext(temp9);temp9.setNext(temp10);
		}
		if(att === "V-Slash") {
			var temp2 = new Animation("Add Message",new WindowMessage("V-Slash",false));
			var temp5 = new AnimationVSlash(this.player,Battle.PLAYER_WINDOW_X1,Battle.PLAYER_WINDOW_Y1,Battle.PLAYER_WINDOW_X2-Battle.PLAYER_WINDOW_X1,Battle.PLAYER_WINDOW_Y2-Battle.PLAYER_WINDOW_Y1);
			var monsterDamage = this.player.filterDamage(Math.floor (this.attackAmount()*mul))*-1;
			var temp6 = new Animation("Damage Player",monsterDamage);
			var temp7 = new AnimationDamage("Damage",(Battle.PLAYER_WINDOW_X1+Battle.PLAYER_WINDOW_X2)/2,Battle.PLAYER_WINDOW_Y1+((Battle.PLAYER_WINDOW_Y2-Battle.PLAYER_WINDOW_Y1)*7)/8,monsterDamage);
			temp1.setNext(temp2);temp2.setNext(temp3);temp3.setNext(temp4);temp4.setNext(temp5);temp5.setNext(temp6);temp6.setNext(temp7);temp7.setNext(temp8);temp8.setNext(temp9);temp9.setNext(temp10);
		}
		if(att === "Gust") {
			var temp2 = new Animation("Add Message",new WindowMessage("Gust",false));
			var temp5 = new AnimationStandard("GustNew.png",Battle.PLAYER_WINDOW_X1,Battle.PLAYER_WINDOW_Y1,Battle.PLAYER_WINDOW_X2-Battle.PLAYER_WINDOW_X1,Battle.PLAYER_WINDOW_Y2-Battle.PLAYER_WINDOW_Y1,30,5);
			var monsterDamage = this.player.filterDamage(Math.floor (this.attackAmount()*mul))*-1;
			var temp6 = new Animation("Damage Player",monsterDamage);
			var temp7 = new AnimationDamage("Damage",(Battle.PLAYER_WINDOW_X1+Battle.PLAYER_WINDOW_X2)/2,Battle.PLAYER_WINDOW_Y1+((Battle.PLAYER_WINDOW_Y2-Battle.PLAYER_WINDOW_Y1)*7)/8,monsterDamage);
			temp1.setNext(temp2);temp2.setNext(temp3);temp3.setNext(temp4);temp4.setNext(temp5);temp5.setNext(temp6);temp6.setNext(temp7);temp7.setNext(temp8);temp8.setNext(temp9);temp9.setNext(temp10);
		}
		if(att === "Fire") {
			var temp2 = new Animation("Add Message",new WindowMessage("Fire",false));
			var temp5 = new AnimationStandard("Fire.png",Battle.PLAYER_WINDOW_X1,Battle.PLAYER_WINDOW_Y1,Battle.PLAYER_WINDOW_X2-Battle.PLAYER_WINDOW_X1,Battle.PLAYER_WINDOW_Y2-Battle.PLAYER_WINDOW_Y1,25,5);
			var monsterDamage = this.player.filterDamage(Math.floor (this.attackAmount()*mul))*-1;
			var temp6 = new Animation("Damage Player",monsterDamage);
			var temp7 = new AnimationDamage("Damage",(Battle.PLAYER_WINDOW_X1+Battle.PLAYER_WINDOW_X2)/2,Battle.PLAYER_WINDOW_Y1+((Battle.PLAYER_WINDOW_Y2-Battle.PLAYER_WINDOW_Y1)*7)/8,monsterDamage);
			temp1.setNext(temp2);temp2.setNext(temp3);temp3.setNext(temp4);temp4.setNext(temp5);temp5.setNext(temp6);temp6.setNext(temp7);temp7.setNext(temp8);temp8.setNext(temp9);temp9.setNext(temp10);
		}
		if(att === "Plague") {
			var temp2 = new Animation("Add Message",new WindowMessage("Plague",false));
			var temp5 = new AnimationPlague(this.player,Battle.PLAYER_WINDOW_X1,Battle.PLAYER_WINDOW_Y1,Battle.PLAYER_WINDOW_X2-Battle.PLAYER_WINDOW_X1,Battle.PLAYER_WINDOW_Y2-Battle.PLAYER_WINDOW_Y1);
			var monsterDamage = this.player.filterDamage(Math.floor (this.attackAmount()*mul))*-1;
			var temp6 = new Animation("Damage Player",monsterDamage);
			var temp7 = new AnimationDamage("Damage",(Battle.PLAYER_WINDOW_X1+Battle.PLAYER_WINDOW_X2)/2,Battle.PLAYER_WINDOW_Y1+((Battle.PLAYER_WINDOW_Y2-Battle.PLAYER_WINDOW_Y1)*7)/8,monsterDamage);
			temp1.setNext(temp2);temp2.setNext(temp3);temp3.setNext(temp4);temp4.setNext(temp5);temp5.setNext(temp6);temp6.setNext(temp7);temp7.setNext(temp8);temp8.setNext(temp9);temp9.setNext(temp10);
		}
		
		if(att === "Fluster") {
			var temp2 = new Animation("Add Message",new WindowMessage("Fluster",false));
			var temp5 = new AnimationFluster(this.player,Battle.PLAYER_WINDOW_X1,Battle.PLAYER_WINDOW_Y1,Battle.PLAYER_WINDOW_X2-Battle.PLAYER_WINDOW_X1,Battle.PLAYER_WINDOW_Y2-Battle.PLAYER_WINDOW_Y1);
			var monsterDamage = this.player.filterDamage(Math.floor (Math.random()*100))*-1;
			var temp6 = new Animation("Damage Player",monsterDamage);
			var temp7 = new AnimationDamage("Damage",(Battle.PLAYER_WINDOW_X1+Battle.PLAYER_WINDOW_X2)/2,Battle.PLAYER_WINDOW_Y1+((Battle.PLAYER_WINDOW_Y2-Battle.PLAYER_WINDOW_Y1)*7)/8,monsterDamage,1);
			monsterDamage = this.player.filterDamage(Math.floor (Math.random()*100))*-1;
			var temp61 = new Animation("Damage Player",monsterDamage);
			var temp71 = new AnimationDamage("Damage",(Battle.PLAYER_WINDOW_X1+Battle.PLAYER_WINDOW_X2)/2,Battle.PLAYER_WINDOW_Y1+((Battle.PLAYER_WINDOW_Y2-Battle.PLAYER_WINDOW_Y1)*7)/8,monsterDamage,1);
			monsterDamage = this.player.filterDamage(Math.floor (Math.random()*100))*-1;
			var temp62 = new Animation("Damage Player",monsterDamage);
			var temp72 = new AnimationDamage("Damage",(Battle.PLAYER_WINDOW_X1+Battle.PLAYER_WINDOW_X2)/2,Battle.PLAYER_WINDOW_Y1+((Battle.PLAYER_WINDOW_Y2-Battle.PLAYER_WINDOW_Y1)*7)/8,monsterDamage,1);
			monsterDamage = this.player.filterDamage(Math.floor (Math.random()*100))*-1;
			var temp63 = new Animation("Damage Player",monsterDamage);
			var temp73 = new AnimationDamage("Damage",(Battle.PLAYER_WINDOW_X1+Battle.PLAYER_WINDOW_X2)/2,Battle.PLAYER_WINDOW_Y1+((Battle.PLAYER_WINDOW_Y2-Battle.PLAYER_WINDOW_Y1)*7)/8,monsterDamage);
			temp1.setNext(temp2);temp2.setNext(temp3);temp3.setNext(temp4);temp4.setNext(temp5);temp5.setNext(temp6);temp6.setNext(temp7);temp7.setNext(temp8);temp8.setNext(temp9);temp9.setNext(temp10);
			temp7.setNext(temp61);temp61.setNext(temp71);temp71.setNext(temp62);temp62.setNext(temp72);temp72.setNext(temp63);temp63.setNext(temp73);temp73.setNext(temp8);
		}
		if(att === "Slime") {
			var temp2 = new Animation("Add Message",new WindowMessage("Slime",false));
			var temp5 = new AnimationStandard("Slime.png",Battle.PLAYER_WINDOW_X1,Battle.PLAYER_WINDOW_Y1,Battle.PLAYER_WINDOW_X2-Battle.PLAYER_WINDOW_X1,Battle.PLAYER_WINDOW_Y2-Battle.PLAYER_WINDOW_Y1,30,5);
			var monsterDamage = this.player.filterDamage(Math.floor (this.attackAmount()*mul))*-1;
			var temp6 = new Animation("Damage Player",monsterDamage);
			var temp7 = new AnimationDamage("Damage",(Battle.PLAYER_WINDOW_X1+Battle.PLAYER_WINDOW_X2)/2,Battle.PLAYER_WINDOW_Y1+((Battle.PLAYER_WINDOW_Y2-Battle.PLAYER_WINDOW_Y1)*7)/8,monsterDamage,10);
			monsterDamage = Math.floor ((Math.random()*7)+3)*-1;
			var temp61 = new Animation("Change SP",monsterDamage);
			var temp71 = new AnimationDamage("SP Damage",(Battle.PLAYER_WINDOW_X1+Battle.PLAYER_WINDOW_X2)/2,Battle.PLAYER_WINDOW_Y1+((Battle.PLAYER_WINDOW_Y2-Battle.PLAYER_WINDOW_Y1)*7)/8,monsterDamage);	
			temp1.setNext(temp2);temp2.setNext(temp3);temp3.setNext(temp4);temp4.setNext(temp5);temp5.setNext(temp6);temp6.setNext(temp7);temp7.setNext(temp8);temp8.setNext(temp9);temp9.setNext(temp10);
			temp7.setNext(temp61);temp61.setNext(temp71);temp71.setNext(temp8);
		}
		if(att === "Stone") {
			var temp2 = new Animation("Add Message",new WindowMessage("Stone",false));
			var temp5 = new AnimationStone(this.player,Battle.PLAYER_WINDOW_X1,Battle.PLAYER_WINDOW_Y1,Battle.PLAYER_WINDOW_X2-Battle.PLAYER_WINDOW_X1,Battle.PLAYER_WINDOW_Y2-Battle.PLAYER_WINDOW_Y1);
			var monsterDamage = this.player.filterDamage(Math.floor (this.attackAmount()*mul))*-1;
			var temp6 = new Animation("Damage Player",monsterDamage);		
			var temp7 = new AnimationDamage("Damage",(Battle.PLAYER_WINDOW_X1+Battle.PLAYER_WINDOW_X2)/2,Battle.PLAYER_WINDOW_Y1+((Battle.PLAYER_WINDOW_Y2-Battle.PLAYER_WINDOW_Y1)*7)/8,monsterDamage);
			temp1.setNext(temp2);temp2.setNext(temp3);temp3.setNext(temp4);temp4.setNext(temp5);temp5.setNext(temp6);temp6.setNext(temp7);temp7.setNext(temp8);temp8.setNext(temp9);temp9.setNext(temp10);
		}
		if(att.length > 7 && att.substring(0,7) === "Message") {
			var temp2 = new Animation("Add Message",new WindowMessage(att.substring(8),false));
			var temp5 = new Animation("Pause",16);
			temp1.setNext(temp2);temp2.setNext(temp3);temp3.setNext(temp4);temp4.setNext(temp5);temp5.setNext(temp8);temp8.setNext(temp9);temp9.setNext(temp10);
		}
		if(att === "Eruption") {
			var temp2 = new Animation("Add Message",new WindowMessage("Eruption",false));
			var temp5 = new AnimationLog(Battle.PLAYER_WINDOW_X1,Battle.PLAYER_WINDOW_Y1,Battle.PLAYER_WINDOW_X2-Battle.PLAYER_WINDOW_X1,Battle.PLAYER_WINDOW_Y2-Battle.PLAYER_WINDOW_Y1);
			var monsterDamage = this.player.filterDamage(Math.floor (this.attackAmount()*mul))*-1;
			var temp6 = new Animation("Damage Player",monsterDamage);
			var temp7 = new AnimationDamage("Damage",(Battle.PLAYER_WINDOW_X1+Battle.PLAYER_WINDOW_X2)/2,Battle.PLAYER_WINDOW_Y1+((Battle.PLAYER_WINDOW_Y2-Battle.PLAYER_WINDOW_Y1)*7)/8,monsterDamage);
			temp1.setNext(temp2);temp2.setNext(temp3);temp3.setNext(temp4);temp4.setNext(temp5);temp5.setNext(temp6);temp6.setNext(temp7);temp7.setNext(temp8);temp8.setNext(temp9);temp9.setNext(temp10);
		}
		if(att === "Pummel") {
			var temp2 = new Animation("Add Message",new WindowMessage("Pummel",false));
			var temp5 = new AnimationPummel(Battle.PLAYER_WINDOW_X1,Battle.PLAYER_WINDOW_Y1,Battle.PLAYER_WINDOW_X2-Battle.PLAYER_WINDOW_X1,Battle.PLAYER_WINDOW_Y2-Battle.PLAYER_WINDOW_Y1);
			var monsterDamage = this.player.filterDamage(Math.floor (this.attackAmount()*mul))*-1;
			var temp6 = new Animation("Damage Player",monsterDamage);
			var temp7 = new AnimationDamage("Damage",(Battle.PLAYER_WINDOW_X1+Battle.PLAYER_WINDOW_X2)/2,Battle.PLAYER_WINDOW_Y1+((Battle.PLAYER_WINDOW_Y2-Battle.PLAYER_WINDOW_Y1)*7)/8,monsterDamage,5);
			monsterDamage = this.player.filterDamage(Math.floor (this.attackAmount()*mul))*-1;
			var temp61 = new Animation("Damage Player",monsterDamage);
			var temp71 = new AnimationDamage("Damage",(Battle.PLAYER_WINDOW_X1+Battle.PLAYER_WINDOW_X2)/2,Battle.PLAYER_WINDOW_Y1+((Battle.PLAYER_WINDOW_Y2-Battle.PLAYER_WINDOW_Y1)*7)/8,monsterDamage,5);
			monsterDamage = this.player.filterDamage(Math.floor (this.attackAmount()*mul))*-1;
			var temp62 = new Animation("Damage Player",monsterDamage);
			var temp72 = new AnimationDamage("Damage",(Battle.PLAYER_WINDOW_X1+Battle.PLAYER_WINDOW_X2)/2,Battle.PLAYER_WINDOW_Y1+((Battle.PLAYER_WINDOW_Y2-Battle.PLAYER_WINDOW_Y1)*7)/8,monsterDamage,5);
			monsterDamage = this.player.filterDamage(Math.floor (this.attackAmount()*mul))*-1;
			var temp63 = new Animation("Damage Player",monsterDamage);
			var temp73 = new AnimationDamage("Damage",(Battle.PLAYER_WINDOW_X1+Battle.PLAYER_WINDOW_X2)/2,Battle.PLAYER_WINDOW_Y1+((Battle.PLAYER_WINDOW_Y2-Battle.PLAYER_WINDOW_Y1)*7)/8,monsterDamage);
			temp1.setNext(temp2);temp2.setNext(temp3);temp3.setNext(temp4);temp4.setNext(temp5);temp5.setNext(temp6);temp6.setNext(temp7);temp7.setNext(temp8);temp8.setNext(temp9);temp9.setNext(temp10);
			temp7.setNext(temp61);temp61.setNext(temp71);temp71.setNext(temp62);temp62.setNext(temp72);temp72.setNext(temp63);temp63.setNext(temp73);temp73.setNext(temp8);
		}
		if(att === "Thunder Shock") {
			var temp2 = new Animation("Add Message",new WindowMessage("Thunder Shock",false));
			var temp5 = new AnimationThunderShock(Battle.PLAYER_WINDOW_X1,Battle.PLAYER_WINDOW_Y1,Battle.PLAYER_WINDOW_X2-Battle.PLAYER_WINDOW_X1,Battle.PLAYER_WINDOW_Y2-Battle.PLAYER_WINDOW_Y1);
			var monsterDamage = this.player.filterDamage(Math.floor (this.attackAmount()*mul))*-1;
			var temp6 = new Animation("Damage Player",monsterDamage);
			var temp7 = new AnimationDamage("Damage",(Battle.PLAYER_WINDOW_X1+Battle.PLAYER_WINDOW_X2)/2,Battle.PLAYER_WINDOW_Y1+((Battle.PLAYER_WINDOW_Y2-Battle.PLAYER_WINDOW_Y1)*7)/8,monsterDamage,5);
			monsterDamage = this.player.filterDamage(Math.floor (this.attackAmount()*mul))*-1;
			var temp61 = new Animation("Damage Player",monsterDamage);
			var temp71 = new AnimationDamage("Damage",(Battle.PLAYER_WINDOW_X1+Battle.PLAYER_WINDOW_X2)/2,Battle.PLAYER_WINDOW_Y1+((Battle.PLAYER_WINDOW_Y2-Battle.PLAYER_WINDOW_Y1)*7)/8,monsterDamage,5);
			monsterDamage = this.player.filterDamage(Math.floor (this.attackAmount()*mul))*-1;
			var temp62 = new Animation("Damage Player",monsterDamage);
			var temp72 = new AnimationDamage("Damage",(Battle.PLAYER_WINDOW_X1+Battle.PLAYER_WINDOW_X2)/2,Battle.PLAYER_WINDOW_Y1+((Battle.PLAYER_WINDOW_Y2-Battle.PLAYER_WINDOW_Y1)*7)/8,monsterDamage,5);
			monsterDamage = this.player.filterDamage(Math.floor (this.attackAmount()*mul))*-1;
			var temp63 = new Animation("Damage Player",monsterDamage);
			var temp73 = new AnimationDamage("Damage",(Battle.PLAYER_WINDOW_X1+Battle.PLAYER_WINDOW_X2)/2,Battle.PLAYER_WINDOW_Y1+((Battle.PLAYER_WINDOW_Y2-Battle.PLAYER_WINDOW_Y1)*7)/8,monsterDamage);
			temp1.setNext(temp2);temp2.setNext(temp3);temp3.setNext(temp4);temp4.setNext(temp5);temp5.setNext(temp6);temp6.setNext(temp7);temp7.setNext(temp8);temp8.setNext(temp9);temp9.setNext(temp10);
			temp7.setNext(temp61);temp61.setNext(temp71);temp71.setNext(temp62);temp62.setNext(temp72);temp72.setNext(temp63);temp63.setNext(temp73);temp73.setNext(temp8);
		}
		if(att === "Breeze") {
			var temp2 = new Animation("Add Message",new WindowMessage("Breeze",false));
			var temp5 = new AnimationBreeze(Battle.PLAYER_WINDOW_X1,Battle.PLAYER_WINDOW_Y1,Battle.PLAYER_WINDOW_X2-Battle.PLAYER_WINDOW_X1,Battle.PLAYER_WINDOW_Y2-Battle.PLAYER_WINDOW_Y1);
			var monsterDamage = this.player.filterDamage(Math.floor (this.attackAmount()*mul))*-1;
			var temp6 = new Animation("Damage Player",monsterDamage);
			var temp7 = new AnimationDamage("Damage",(Battle.PLAYER_WINDOW_X1+Battle.PLAYER_WINDOW_X2)/2,Battle.PLAYER_WINDOW_Y1+((Battle.PLAYER_WINDOW_Y2-Battle.PLAYER_WINDOW_Y1)*7)/8,monsterDamage);
			temp1.setNext(temp2);temp2.setNext(temp3);temp3.setNext(temp4);temp4.setNext(temp5);temp5.setNext(temp6);temp6.setNext(temp7);temp7.setNext(temp8);temp8.setNext(temp9);temp9.setNext(temp10);
		}
		if(att === "Frost") {
			var temp2 = new Animation("Add Message",new WindowMessage("Frost",false));
			var temp5 = new AnimationFrost(Battle.PLAYER_WINDOW_X1,Battle.PLAYER_WINDOW_Y1,Battle.PLAYER_WINDOW_X2-Battle.PLAYER_WINDOW_X1,Battle.PLAYER_WINDOW_Y2-Battle.PLAYER_WINDOW_Y1);
			var monsterDamage = this.player.filterDamage(Math.floor (this.attackAmount()*mul))*-1;
			var temp6 = new Animation("Damage Player",monsterDamage);
			var temp7 = new AnimationDamage("Damage",(Battle.PLAYER_WINDOW_X1+Battle.PLAYER_WINDOW_X2)/2,Battle.PLAYER_WINDOW_Y1+((Battle.PLAYER_WINDOW_Y2-Battle.PLAYER_WINDOW_Y1)*7)/8,monsterDamage);
			temp1.setNext(temp2);temp2.setNext(temp3);temp3.setNext(temp4);temp4.setNext(temp5);temp5.setNext(temp6);temp6.setNext(temp7);temp7.setNext(temp8);temp8.setNext(temp9);temp9.setNext(temp10);
		}
		if(att === "Ice Claw") {
			var temp2 = new Animation("Add Message",new WindowMessage("Ice Claw",false));
			var temp5 = new AnimationStandard("IceClaw.png", Battle.PLAYER_WINDOW_X1,Battle.PLAYER_WINDOW_Y1,Battle.PLAYER_WINDOW_X2-Battle.PLAYER_WINDOW_X1,Battle.PLAYER_WINDOW_Y2-Battle.PLAYER_WINDOW_Y1,12,5);
			var monsterDamage = this.player.filterDamage(Math.floor (this.attackAmount()*mul))*-1;
			var temp6 = new Animation("Damage Player",monsterDamage);
			var temp7 = new AnimationDamage("Damage",(Battle.PLAYER_WINDOW_X1+Battle.PLAYER_WINDOW_X2)/2,Battle.PLAYER_WINDOW_Y1+((Battle.PLAYER_WINDOW_Y2-Battle.PLAYER_WINDOW_Y1)*7)/8,monsterDamage);
			temp1.setNext(temp2);temp2.setNext(temp3);temp3.setNext(temp4);temp4.setNext(temp5);temp5.setNext(temp6);temp6.setNext(temp7);temp7.setNext(temp8);temp8.setNext(temp9);temp9.setNext(temp10);
		}
		if(att === "Blizzard Sphere") {
			var temp2 = new Animation("Add Message",new WindowMessage("Blizzard Sphere",false));
			var temp5 = new AnimationBlizzardSphere(Battle.PLAYER_WINDOW_X1,Battle.PLAYER_WINDOW_Y1,Battle.PLAYER_WINDOW_X2-Battle.PLAYER_WINDOW_X1,Battle.PLAYER_WINDOW_Y2-Battle.PLAYER_WINDOW_Y1);
			var monsterDamage = this.player.filterDamage(Math.floor (this.attackAmount()*mul))*-1;
			var temp6 = new Animation("Damage Player",monsterDamage);
			var temp7 = new AnimationDamage("Damage",(Battle.PLAYER_WINDOW_X1+Battle.PLAYER_WINDOW_X2)/2,Battle.PLAYER_WINDOW_Y1+((Battle.PLAYER_WINDOW_Y2-Battle.PLAYER_WINDOW_Y1)*7)/8,monsterDamage,5);
			monsterDamage = this.player.filterDamage(Math.floor (this.attackAmount()*mul))*-1;
			var temp61 = new Animation("Damage Player",monsterDamage);
			var temp71 = new AnimationDamage("Damage",(Battle.PLAYER_WINDOW_X1+Battle.PLAYER_WINDOW_X2)/2,Battle.PLAYER_WINDOW_Y1+((Battle.PLAYER_WINDOW_Y2-Battle.PLAYER_WINDOW_Y1)*7)/8,monsterDamage,5);
			monsterDamage = this.player.filterDamage(Math.floor (this.attackAmount()*mul))*-1;
			var temp62 = new Animation("Damage Player",monsterDamage);
			var temp72 = new AnimationDamage("Damage",(Battle.PLAYER_WINDOW_X1+Battle.PLAYER_WINDOW_X2)/2,Battle.PLAYER_WINDOW_Y1+((Battle.PLAYER_WINDOW_Y2-Battle.PLAYER_WINDOW_Y1)*7)/8,monsterDamage,5);
			monsterDamage = this.player.filterDamage(Math.floor (this.attackAmount()*mul))*-1;
			var temp63 = new Animation("Damage Player",monsterDamage);
			var temp73 = new AnimationDamage("Damage",(Battle.PLAYER_WINDOW_X1+Battle.PLAYER_WINDOW_X2)/2,Battle.PLAYER_WINDOW_Y1+((Battle.PLAYER_WINDOW_Y2-Battle.PLAYER_WINDOW_Y1)*7)/8,monsterDamage);
			temp1.setNext(temp2);temp2.setNext(temp3);temp3.setNext(temp4);temp4.setNext(temp5);temp5.setNext(temp6);temp6.setNext(temp7);temp7.setNext(temp8);temp8.setNext(temp9);temp9.setNext(temp10);
			temp7.setNext(temp61);temp61.setNext(temp71);temp71.setNext(temp62);temp62.setNext(temp72);temp72.setNext(temp63);temp63.setNext(temp73);temp73.setNext(temp8);
		}
		if(att.length>=5 && att.substring(0,5) === "Term:") {
			var temp2 = new Animation("Add Message",new WindowMessage("Add Term "+att.substring(6),false));
			var temp5 = new AnimationAddPolynomial("Term: "+att.substring(6),m.getX(), m.getY(), m.getWidth(), m.getHeight(),m);
			temp1.setNext(temp2);temp2.setNext(temp3);temp3.setNext(temp4);temp4.setNext(temp5);temp5.setNext(temp8);temp8.setNext(temp9);temp9.setNext(temp10);
		}
		if(att.length >= 11 && att.substring(0,11) === "Recalculate") {
			var temp2 = new Animation("Add Message",new WindowMessage("Recalculate",false));
			var temp5 = new AnimationRecalculate(m,m.getX(), m.getY(), m.getWidth(), m.getHeight(),att);
			temp1.setNext(temp2);temp2.setNext(temp3);temp3.setNext(temp4);temp4.setNext(temp5);temp5.setNext(temp8);temp8.setNext(temp9);temp9.setNext(temp10);
		}
		if(att === "Shatter") {
			var temp2 = new Animation("Add Message",new WindowMessage("Shatter",false));
			var temp5 = new AnimationStandard("Shatter.png",Battle.PLAYER_WINDOW_X1,Battle.PLAYER_WINDOW_Y1,Battle.PLAYER_WINDOW_X2-Battle.PLAYER_WINDOW_X1,Battle.PLAYER_WINDOW_Y2-Battle.PLAYER_WINDOW_Y1,40,5);
			var monsterDamage = -9999;
			var temp6 = new Animation("Damage Player",monsterDamage);
			var temp7 = new AnimationDamage("Damage",(Battle.PLAYER_WINDOW_X1+Battle.PLAYER_WINDOW_X2)/2,Battle.PLAYER_WINDOW_Y1+((Battle.PLAYER_WINDOW_Y2-Battle.PLAYER_WINDOW_Y1)*7)/8,monsterDamage);
			temp1.setNext(temp2);temp2.setNext(temp3);temp3.setNext(temp4);temp4.setNext(temp5);temp5.setNext(temp6);temp6.setNext(temp7);temp7.setNext(temp8);temp8.setNext(temp9);temp9.setNext(temp10);
		}
		if(att === "Bomb") {
			var temp2 = new Animation("Add Message",new WindowMessage("Bomb",false));
			var temp5 = new AnimationStandard("Bomb.png", Battle.PLAYER_WINDOW_X1,Battle.PLAYER_WINDOW_Y1,Battle.PLAYER_WINDOW_X2-Battle.PLAYER_WINDOW_X1,Battle.PLAYER_WINDOW_Y2-Battle.PLAYER_WINDOW_Y1,40,5);
			var monsterDamage = this.player.filterDamage(Math.floor (this.attackAmount()*mul))*-1;
			var temp6 = new Animation("Damage Player",monsterDamage);
			var temp7 = new AnimationDamage("Damage",(Battle.PLAYER_WINDOW_X1+Battle.PLAYER_WINDOW_X2)/2,Battle.PLAYER_WINDOW_Y1+((Battle.PLAYER_WINDOW_Y2-Battle.PLAYER_WINDOW_Y1)*7)/8,monsterDamage);
			temp1.setNext(temp2);temp2.setNext(temp3);temp3.setNext(temp4);temp4.setNext(temp5);temp5.setNext(temp6);temp6.setNext(temp7);temp7.setNext(temp8);temp8.setNext(temp9);temp9.setNext(temp10);
		}
		if(att === "Explosion") {
			var temp2 = new Animation("Add Message",new WindowMessage("Explosion",false));
			var temp5 = new AnimationExplosion(Battle.PLAYER_WINDOW_X1,Battle.PLAYER_WINDOW_Y1,Battle.PLAYER_WINDOW_X2-Battle.PLAYER_WINDOW_X1,Battle.PLAYER_WINDOW_Y2-Battle.PLAYER_WINDOW_Y1);
			var monsterDamage = this.player.filterDamage(Math.floor (this.attackAmount()*mul))*-1;
			var temp6 = new Animation("Damage Player",monsterDamage);
			var temp7 = new AnimationDamage("Damage",(Battle.PLAYER_WINDOW_X1+Battle.PLAYER_WINDOW_X2)/2,Battle.PLAYER_WINDOW_Y1+((Battle.PLAYER_WINDOW_Y2-Battle.PLAYER_WINDOW_Y1)*7)/8,monsterDamage,5);
			monsterDamage = this.player.filterDamage(Math.floor (this.attackAmount()*mul))*-1;
			var temp61 = new Animation("Damage Player",monsterDamage);
			var temp71 = new AnimationDamage("Damage",(Battle.PLAYER_WINDOW_X1+Battle.PLAYER_WINDOW_X2)/2,Battle.PLAYER_WINDOW_Y1+((Battle.PLAYER_WINDOW_Y2-Battle.PLAYER_WINDOW_Y1)*7)/8,monsterDamage,5);
			monsterDamage = this.player.filterDamage(Math.floor (this.attackAmount()*mul))*-1;
			var temp62 = new Animation("Damage Player",monsterDamage);
			var temp72 = new AnimationDamage("Damage",(Battle.PLAYER_WINDOW_X1+Battle.PLAYER_WINDOW_X2)/2,Battle.PLAYER_WINDOW_Y1+((Battle.PLAYER_WINDOW_Y2-Battle.PLAYER_WINDOW_Y1)*7)/8,monsterDamage,5);
			monsterDamage = this.player.filterDamage(Math.floor (this.attackAmount()*mul))*-1;
			var temp63 = new Animation("Damage Player",monsterDamage);
			var temp73 = new AnimationDamage("Damage",(Battle.PLAYER_WINDOW_X1+Battle.PLAYER_WINDOW_X2)/2,Battle.PLAYER_WINDOW_Y1+((Battle.PLAYER_WINDOW_Y2-Battle.PLAYER_WINDOW_Y1)*7)/8,monsterDamage);
			temp1.setNext(temp2);temp2.setNext(temp3);temp3.setNext(temp4);temp4.setNext(temp5);temp5.setNext(temp6);temp6.setNext(temp7);temp7.setNext(temp8);temp8.setNext(temp9);temp9.setNext(temp10);
			temp7.setNext(temp61);temp61.setNext(temp71);temp71.setNext(temp62);temp62.setNext(temp72);temp72.setNext(temp63);temp63.setNext(temp73);temp73.setNext(temp8);
		}
		if(att === "Sap") {
			var temp2 = new Animation("Add Message",new WindowMessage("Sap",false));
			var temp5 = new AnimationStandard("Sap.png",Battle.PLAYER_WINDOW_X1,Battle.PLAYER_WINDOW_Y1,Battle.PLAYER_WINDOW_X2-Battle.PLAYER_WINDOW_X1,Battle.PLAYER_WINDOW_Y2-Battle.PLAYER_WINDOW_Y1,40,5);
			var temp6 = new Animation("Change SP",-500);
			var temp7 = new AnimationDamage("SP Damage",(Battle.PLAYER_WINDOW_X1+Battle.PLAYER_WINDOW_X2)/2,Battle.PLAYER_WINDOW_Y1+((Battle.PLAYER_WINDOW_Y2-Battle.PLAYER_WINDOW_Y1)*7)/8,-500);
			var temp61 = new Animation("Change MP",-500);
			var temp71 = new AnimationDamage("MP Damage",(Battle.PLAYER_WINDOW_X1+Battle.PLAYER_WINDOW_X2)/2,Battle.PLAYER_WINDOW_Y1+((Battle.PLAYER_WINDOW_Y2-Battle.PLAYER_WINDOW_Y1)*7)/8,-500);
			temp1.setNext(temp2);temp2.setNext(temp3);temp3.setNext(temp4);temp4.setNext(temp5);temp5.setNext(temp6);temp6.setNext(temp7);temp7.setNext(temp61);temp61.setNext(temp71);temp71.setNext(temp8);temp8.setNext(temp9);temp9.setNext(temp10);
		}
		if(att === "Leech") {
			var temp2 = new Animation("Add Message",new WindowMessage("Leech",false));
			var temp5 = new AnimationStandard("Leech.png",Battle.PLAYER_WINDOW_X1,Battle.PLAYER_WINDOW_Y1,Battle.PLAYER_WINDOW_X2-Battle.PLAYER_WINDOW_X1,Battle.PLAYER_WINDOW_Y2-Battle.PLAYER_WINDOW_Y1,24,5);
			var temp6 = new Animation("Change MP",this.getMagicLevel()*-1);
			var temp7 = new AnimationDamage("MP Damage",(Battle.PLAYER_WINDOW_X1+Battle.PLAYER_WINDOW_X2)/2,Battle.PLAYER_WINDOW_Y1+((Battle.PLAYER_WINDOW_Y2-Battle.PLAYER_WINDOW_Y1)*7)/8,this.getMagicLevel()*-1);
			temp1.setNext(temp2);temp2.setNext(temp3);temp3.setNext(temp4);temp4.setNext(temp5);temp5.setNext(temp6);temp6.setNext(temp7);temp7.setNext(temp8);temp8.setNext(temp9);temp9.setNext(temp10);
		}
		if(att === "Darkness Blade") {
			var temp2 = new Animation("Add Message",new WindowMessage("Darkness Blade",false));
			var temp5 = new AnimationDarknessBlade(Battle.PLAYER_WINDOW_X1,Battle.PLAYER_WINDOW_Y1,Battle.PLAYER_WINDOW_X2-Battle.PLAYER_WINDOW_X1,Battle.PLAYER_WINDOW_Y2-Battle.PLAYER_WINDOW_Y1);
			var monsterDamage = Math.floor(this.player.getHpMax() * 7 / 8 * -1);
			var temp6 = new Animation("Damage Player",monsterDamage);
			var temp7 = new AnimationDamage("Damage",(Battle.PLAYER_WINDOW_X1+Battle.PLAYER_WINDOW_X2)/2,Battle.PLAYER_WINDOW_Y1+((Battle.PLAYER_WINDOW_Y2-Battle.PLAYER_WINDOW_Y1)*7)/8,monsterDamage);
			temp1.setNext(temp2);temp2.setNext(temp3);temp3.setNext(temp4);temp4.setNext(temp5);temp5.setNext(temp6);temp6.setNext(temp7);temp7.setNext(temp8);temp8.setNext(temp9);temp9.setNext(temp10);
		}
		if(att === "Poke") {
			var temp2 = new Animation("Add Message",new WindowMessage("Poke",false));
			var temp5 = new AnimationPoke(Battle.PLAYER_WINDOW_X1,Battle.PLAYER_WINDOW_Y1,Battle.PLAYER_WINDOW_X2-Battle.PLAYER_WINDOW_X1,Battle.PLAYER_WINDOW_Y2-Battle.PLAYER_WINDOW_Y1);
			var temp6 = new Animation("Damage Player",-1);
			var temp7 = new AnimationDamage("Damage",(Battle.PLAYER_WINDOW_X1+Battle.PLAYER_WINDOW_X2)/2,Battle.PLAYER_WINDOW_Y1+((Battle.PLAYER_WINDOW_Y2-Battle.PLAYER_WINDOW_Y1)*7)/8,-1);
			temp1.setNext(temp2);temp2.setNext(temp3);temp3.setNext(temp4);temp4.setNext(temp5);temp5.setNext(temp6);temp6.setNext(temp7);temp7.setNext(temp8);temp8.setNext(temp9);temp9.setNext(temp10);
		}
		if(att === "Annoy") {
			var temp2 = new Animation("Add Message",new WindowMessage("Annoy",false));
			var temp5 = new AnimationAnnoy(Battle.PLAYER_WINDOW_X1,Battle.PLAYER_WINDOW_Y1,Battle.PLAYER_WINDOW_X2-Battle.PLAYER_WINDOW_X1,Battle.PLAYER_WINDOW_Y2-Battle.PLAYER_WINDOW_Y1);
			var monsterDamage = this.player.filterDamage(Math.floor (this.attackAmount()*mul))*-1;
			var temp6 = new Animation("Damage Player",monsterDamage);
			var temp7 = new AnimationDamage("Damage",(Battle.PLAYER_WINDOW_X1+Battle.PLAYER_WINDOW_X2)/2,Battle.PLAYER_WINDOW_Y1+((Battle.PLAYER_WINDOW_Y2-Battle.PLAYER_WINDOW_Y1)*7)/8,monsterDamage);
			temp1.setNext(temp2);temp2.setNext(temp3);temp3.setNext(temp4);temp4.setNext(temp5);temp5.setNext(temp6);temp6.setNext(temp7);temp7.setNext(temp8);temp8.setNext(temp9);temp9.setNext(temp10);
		}
		return temp1;
	}
	
	attackRun() {
		var a = this.attack();
		var first = a;
		var temp1 = new Animation("Close Message");
		var temp2 = new Animation("Clear Message");
		var temp3 = new Animation("Close Options");
		var temp4 = new Animation("Pause",8);
		var temp5 = new Animation("Open Message");
		var temp6 = new Animation("Add Message",new WindowMessage("Running",false));
		var temp7 = new Animation("Pause",16);
		var temp8 = new Animation("Clear Message");
		while(a.hasNext() && a.getNext().hasNext() && a.getNext().getNext().hasNext()) a = a.getNext();
		var temp9 = new Animation("Check Death");
		var temp10 = new Animation("Pause",8);
		var temp11 = new Animation("Shutdown");
		var temp12 = new Animation("Battle Done");
		temp1.setNext(temp2);temp2.setNext(temp3);temp3.setNext(temp4);temp4.setNext(temp5);temp5.setNext(temp6);temp6.setNext(temp7);temp7.setNext(temp8);temp8.setNext(first);a.setNext(temp9);temp9.setNext(temp10);temp10.setNext(temp11);temp11.setNext(temp12);
		return temp1;
	}
	
	hasPlusC() {
		return this.hp.hasPlusC();
	}
	
	getPlusCAmount() {
		return this.plusC;
	}
	
	resurrect() {
		this.hp = new Equation((this.plusC).toString(),this.EQSIZE);
		//this.hp = new Equation(this.hp.getEquation(),x + width/2 - this.hp.getLength()/2,Battle.MAIN_WINDOW_Y2-(Battle.MAIN_WINDOW_Y2-Battle.MAIN_WINDOW_Y1)/8,this.EQSIZE);
	}
	
	removeTerm() {
		this.hp = new Equation(this.hp.removeTerm(),this.EQSIZE);
		//this.hp = new Equation(this.hp.getEquation(),x + width/2 - this.hp.getLength()/2,Battle.MAIN_WINDOW_Y2-(Battle.MAIN_WINDOW_Y2-Battle.MAIN_WINDOW_Y1)/8,this.EQSIZE);
	}
	
	isUndead() {
		return this.undead;
	}
	
	getHP() {
		return Math.floor( this.hp.evaluate(0));
	}
	
	absoluteValue() {
		this.hp = new Equation(this.hp.absoluteValue(),this.EQSIZE);
		//this.hp = new Equation(this.hp.getEquation(),x + width/2 - this.hp.getLength()/2,Battle.MAIN_WINDOW_Y2-(Battle.MAIN_WINDOW_Y2-Battle.MAIN_WINDOW_Y1)/8,this.EQSIZE);
	}
	
	addDegree(add, deg) {
		//System.out.println("Monster.addDegree " +this.hp.addDegree(add, deg));
		this.hp = new Equation(this.hp.addDegree(add,deg),this.EQSIZE);
		//this.hp = new Equation(this.hp.getEquation(),x + width/2 - this.hp.getLength()/2,Battle.MAIN_WINDOW_Y2-(Battle.MAIN_WINDOW_Y2-Battle.MAIN_WINDOW_Y1)/8,this.EQSIZE);
	}
	
	static getMonster(num, p) {
		if(num == 0) {
			var temp = new Monster(p, "pinky.png", "Piggy", 150, 150);
			temp.setStats(20, 5, 10, 5, "20", 16, 3);
			var node1 = new AIRandomNode();
			node1.addNode(new AIAttackNode("Subtract",temp), 50);
			node1.addNode(new AIAttackNode("Water Drop",temp,1.3), 50);
			temp.setAI(node1);
			return temp;
		}
		if(num == 1) {
			var temp = new Monster(p, "CopterBird.png", "Copter Bird", 150, 150);
			temp.setStats(25, 13, 10, 2, "25", 24, 3);
			temp.setAI(new AIAttackNode("Strike",temp));
			return temp;
		}
		if(num == 2) {
			var temp = new Monster(p, "OnionKnight.png", "Onion Knight", 150, 100);
			temp.setStats(29, 9, 11, 5, "40", 35, 3);
			var node1 = new AIRandomNode();
			node1.addNode(new AIAttackNode("Strike",temp), 70);
			node1.addNode(new AIAttackNode("V-Slash",temp,1.3), 30);
			var node2= new AIResponseToStat("HP","<","Monster",10,new AIAttackNode("Heal",temp),node1,temp,p);
			temp.setAI(node2);
			return temp;
		}
		if(num == 3) {
			var temp = new Monster(p, "Baboosh.png", "Baboosh", 200, 200);
			temp.setStats(40, 13, 12, 7, "100", 54, 5);
			var node1 = new AIRandomNode();
			node1.addNode(new AIAttackNode("Bite",temp,1.6), 20);
			node1.addNode(new AIAttackNode("Claw",temp, 1.3), 30);
			node1.addNode(new AIAttackNode("Strike",temp), 50);
			var node2= new AIResponseToAttack(p,node1);
			var node3 = new AICounterAttack(node1,new AIAttackNode("Claw",temp, 1.3));
			node2.addNode("Subtract", node3);
			temp.setAI(node2);
			return temp;
		}
		if(num == 4) {
			var temp = new Monster(p, "Spuff.png", "Spuff", 100, 100);
			temp.setStats(30, 50, 3, 15, "6x-36", 67,5);
			var node1 = new AIRandomNode();
			node1.addNode(new AIAttackNode("Subtract",temp), 50);
			node1.addNode(new AIAttackNode("Water Drop",temp, 1.3), 30);
			node1.addNode(new AIAttackNode("Bite",temp, 1.6), 20);
			temp.setAI(node1);
			return temp;
		}
		if(num == 5) {
			var temp = new Monster(p, "FranticFowl.png", "Frantic Fowl", 200, 150);
			temp.setStats(40, 20, 3, 15, "8x-12", 87,5);
			var node = new AIRandomNode();
			node.addNode(new AIAttackNode("Fluster",temp, 1.2), 50);
			node.addNode(new AIAttackNode("Strike",temp, 1), 50);
			var node1 = new AICounterAttack(new AIAttackNode("Heal",temp),new AIAttackNode("Fluster",temp, 1.3));
			var node2 = new AIRandomNode();
			node2.addNode(node1, 50);
			node2.addNode(node, 50);
			var node3= new AIResponseToAttack(p,node);
			node3.addNode("Subtract", node2);
			node3.addNode("Plug In", node2);
			temp.setAI(node3);
			return temp;
		}
		if(num == 6) {
			var temp = new Monster(p, "HeroApe.png", "Hero Ape", 100, 100);
			temp.setStats(70, 6, 20, 4, "12x+24", 94,6);
			var node1 = new AIRandomNode();
			node1.addNode(new AIAttackNode("V-Slash",temp,1.6), 20);
			node1.addNode(new AIAttackNode("Strike",temp, 1.3), 30);
			node1.addNode(new AIAttackNode("Subtract",temp), 50);
			temp.setAI(node1);
			return temp;
		}
		if(num == 7) {
			var temp = new Monster(p, "KingCube.png", "King Cube", 200, 200);
			temp.setStats(83, 16, 30, 7, "2x^2", 124,7);
			var node1 = new AICounterNode(3, new AIAttackNode("Slime",temp),new AIAttackNode("Strike",temp, 1.3), true);
			temp.setAI(node1);
			return temp;
		}
		if(num == 8) {
			var temp = new Monster(p, "Bat.png", "Cave Bat", 150, 150);
			temp.setStats(90, 8, 27, 15, "2x^2+50", 153,7);
			var node1 = new AIRandomNode();
			node1.addNode(new AIAttackNode("Gust",temp,1.6), 20);
			node1.addNode(new AIAttackNode("Bite",temp, 1.3), 30);
			node1.addNode(new AIAttackNode("Strike",temp), 50);
			temp.setAI(node1);
			return temp;
		}
		if(num == 9) {
			var temp = new Monster(p, "EarthElemental.png", "Earth Elemental", 400, 250);
			temp.setRunnable(false);
			temp.setStats(120, 15, 40, 20, "4x^2+50", 800,10,25);
			var qnode1 = new AIQueueNode(new AIAttackNode("Stone",temp,2.0));
			var qnode2 = new AIQueueNode(new AIAttackNode("Message:Storing Power",temp,1.0),qnode1);
			var qnode3 = new AIQueueNode(new AIAttackNode("Heal",temp),qnode2);
			var qnode4 = new AIQueueNode(new AIAttackNode("Fire",temp,1.4),qnode3);
			var qnode5 = new AIQueueNode(new AIAttackNode("Strike",temp,1.0),qnode4);
			var node2 = new AICounterNode(10, new AIAttackNode("Eruption",temp,20.0),qnode5,false);
			var node1 = new AIResponseToAttack(p,node2);
			node1.addNode("Div. By 2", new AIAttackNode("Shield:Div. By 2",temp),false);
			temp.setAI(node1);
			return temp;
		}
		if(num == 10) {
			var temp = new Monster(p, "PumpkinKnight.png", "Pumpkin Knight", 150, 150);
			temp.setStats(100, 20, 35, 20, "25x-143", 167, 8);
			var node1 = new AIRandomNode();
			node1.addNode(new AIAttackNode("V-Slash",temp, 1.4), 30);
			node1.addNode(new AIAttackNode("Subtract",temp), 70);
			temp.setAI(node1);
			return temp;
		}
		if(num == 11) {
			var temp = new Monster(p, "FightingFowl.png", "Fighting Fowl", 150, 200);
			temp.setStats(118, 25, 44, 25, "5x^2-70", 190, 9);
			var node1 = new AIRandomNode();
			node1.addNode(new AIAttackNode("Pummel",temp, 1.4), 30);
			node1.addNode(new AIAttackNode("Strike",temp), 70);
			temp.setAI(node1);
			return temp;
		}
		if(num == 12) {
			var temp = new Monster(p, "Chesnutter.png", "Chesnutter", 200, 150);
			temp.setStats(118, 25, 44, 25, "20x+93", 232, 9);
			var node1 = new AIRandomNode();
			node1.addNode(new AIAttackNode("Stone",temp, 1.4), 30);
			node1.addNode(new AIAttackNode("Bite",temp), 70);
			temp.setAI(node1);
			return temp;
		}
		if(num == 13) {
			var temp = new Monster(p, "Aspit.png", "Aspit", 200, 200);
			temp.addShield("Div. By 2");
			temp.setStats(150, 28, 50, 27, "10000", 245, 9);
			var node1 = new AIRandomNode();
			node1.addNode(new AIAttackNode("Fire",temp, 1.4), 30);
			node1.addNode(new AIAttackNode("Bite",temp), 70);
			temp.setAI(node1);
			return temp;
		}
		if(num == 14) {
			var temp = new Monster(p, "Baba.png", "Baba", 100, 100);
			temp.setStats(174, 40, 60, 36, "325x-100", 259, 9);
			var node1 = new AIResponseToAttack(p,new AIAttackNode("Strike",temp));
			node1.addNode("Derivative", new AICounterAttack(new AIAttackNode("Strike",temp), new AIAttackNode("Shield:Derivative",temp)),false);
			node1.addNode("Plug In", new AICounterAttack(new AIAttackNode("Strike",temp), new AIAttackNode("Shield:Derivative",temp)),false);
			temp.setAI(node1);
			return temp;
		}
		if(num == 15) {
			var temp = new Monster(p, "Ghost.png", "Ghost", 100, 100);
			temp.makeUndead();
			temp.setStats(174, 40, 60, 36, "9x-126", 264, 10);
			var node1 = new AIRandomNode();
			node1.addNode(new AIAttackNode("Plague",temp, 1.6), 30);
			node1.addNode(new AIAttackNode("Subtract",temp), 70);
			temp.setAI(node1);
			return temp;
		}
		if(num == 16) {
			var temp = new Monster(p, "Zombie.png", "Zombie", 150, 200);
			temp.makeUndead();
			temp.setStats(224, 45, 90, 36, "100x+4", 275, 10);
			var node1 = new AIRandomNode();
			node1.addNode(new AIAttackNode("Plague",temp, 1.6), 30);
			node1.addNode(new AIAttackNode("Claw",temp), 70);
			var node2 = new AIResponseToAttack(p,node1);
			node2.addNode("Derivative", new AICounterAttack(node1, new AIAttackNode("Shield:Derivative",temp)),false);
			node2.addNode("Plug In", new AICounterAttack(node1, new AIAttackNode("Shield:Derivative",temp)),false);
			temp.setAI(node2);
			return temp;
		}
		if(num == 17) {
			var temp = new Monster(p, "Mr.Bones.png", "Mr. Bones", 150, 200);
			temp.addShield("Plug In 6");temp.addShield("Plug In 7");temp.addShield("Plug In 8");
			temp.addShield("Plug In 15");temp.addShield("Plug In 12");
			temp.makeUndead();
			temp.setStats(240, 60, 101, 46, "3x^2-66x+34", 310, 10);
			var node1 = new AIRandomNode();
			node1.addNode(new AIAttackNode("Plague",temp, 1.6), 30);
			node1.addNode(new AIAttackNode("Message:Dance",temp), 10);
			node1.addNode(new AIAttackNode("Strike",temp), 60);
			var node2 = new AIResponseToAttack(p,node1);
			node2.addNode("Derivative", new AICounterAttack(node1, new AIAttackNode("Shield:Derivative",temp)),false);
			node2.addNode("Plug In", new AICounterAttack(node1, new AIAttackNode("Shield:Derivative",temp)),false);
			temp.setAI(node2);
			return temp;
		}
		if(num == 18) {
			var temp = new Monster(p, "PurpleGhost.png", "Purple Ghost", 150, 200);
			temp.addShield("Derivative");temp.addShield("Div. By 2");
			temp.makeUndead();
			temp.setStats(257, 65, 109, 32, "865", 345, 10);
			var node1 = new AIRandomNode();
			node1.addNode(new AIAttackNode("Plague",temp, 1.6), 30);
			node1.addNode(new AIAttackNode("Slime",temp, 1.3), 20);
			node1.addNode(new AIAttackNode("Bite",temp), 50);
			temp.setAI(node1);
			return temp;
		}
		if(num == 19) {
			var temp = new Monster(p, "ChineseDragonNew.png", "Mystic Dragon", 400, 250);
			temp.addShield("Plug In All");
			temp.addShield("Square Root");
			temp.setStartingShields();
			temp.setStats(270, 45, 40, 32, "710x^2+350x", 1200,30, 25);
			temp.setRunnable(false);
			var qnode1 = new AIQueueNode(new AIAttackNode("Gust",temp,2.0));
			var qnode2 = new AIQueueNode(new AIAttackNode("Heal",temp),qnode1);
			var qnode3 = new AIQueueNode(new AIAttackNode("Fire",temp,1.4),qnode2);
			var qnode4 = new AIQueueNode(new AIAttackNode("Bite",temp,1.0),qnode3);
			var node6 = new AICounterNode(32, new AIAttackNode("Thunder Shock",temp, .8),qnode4,false);
			var node5 = new AICounterNode(15, new AIAttackNode("Restore",temp),node6,false);
			var node4 = new AIResponseToStat("Shield:Div. By 2","","Monster",0,node5,new AIAttackNode("Shield:Div. By 2",temp),temp,p);
			var node3 = new AIResponseToAttack(p,node5);
			node3.addNode("Div. By 2", node4);
			var node2 = new AIResponseToStat("Shield:Derivative","","Monster",0,node3,new AIAttackNode("Shield:Derivative",temp),temp,p);
			var node1 = new AIResponseToStat("Constant","","Monster",0,node2,node6,temp,p);
			temp.setAI(node1);
			return temp;
		}
		if(num == 20) {
			var temp = new Monster(p, "Vanillite.png", "Vanillite", 150, 200);
			temp.addShield("Derivative");temp.addShield("Sq. Root");
			temp.setStats(232, 40, 29, 32, "4x^2+15x", 362, 11);
			var node1 = new AIRandomNode();
			node1.addNode(new AIAttackNode("Breeze",temp, 1.3), 50);
			node1.addNode(new AIAttackNode("Strike",temp), 50);
			temp.setAI(node1);
			return temp;
		}
		if(num == 21) {
			var temp = new Monster(p, "EvilSnowman.png", "Evil Snowman", 150, 200);
			temp.addShield("Derivative");temp.addShield("Div. By 2");
			temp.setStats(270, 60, 50, 14, "x^6", 398, 11);
			var node1 = new AIRandomNode();
			node1.addNode(new AIAttackNode("Frost",temp, 1.6), 30);
			node1.addNode(new AIAttackNode("Strike",temp), 70);
			temp.setAI(node1);
			return temp;
		}
		if(num == 22) {
			var temp = new Monster(p, "IceCube.png", "Ice Cube", 250, 250);
			temp.setStats(300, 30, 1000, 1, "x^2+9x-112", 412, 11);
			temp.makeUndead();
			var node2 = new AIRandomNode();
			node2.addNode(new AIAttackNode("Frost",temp, 1.6), 60);
			node2.addNode(new AIAttackNode("Breeze",temp), 40);
			var node1 = new AICounterAttack(node2,new AIAttackNode("Restore",temp));
			temp.setAI(node1);
			return temp;
		}
		if(num == 23) {
			var temp = new Monster(p, "ColdSlime.png", "Cold Slime", 200, 150);
			temp.setStats(312, 47, 63, 29, "-2x^2", 412, 11);
			temp.addShield("Plug In 15");temp.addShield("Plug In 14");temp.addShield("Plug In 13");temp.addShield("Plug In 12");
			temp.addShield("Plug In 11");temp.addShield("Plug In 10");temp.addShield("Plug In 9");temp.addShield("Plug In 8");
			temp.addShield("Plug In 7");temp.addShield("Plug In 6");temp.addShield("Plug In 5");temp.addShield("Plug In 4");temp.addShield("Plug In 3");
			temp.addShield("Derivative");temp.addShield("Double Derivative");
			var node1 = new AIRandomNode();
			node1.addNode(new AIAttackNode("Frost",temp, 1.6), 20);
			node1.addNode(new AIAttackNode("Breeze",temp,1.3), 30);
			node1.addNode(new AIAttackNode("Strike",temp), 50);
			temp.setAI(node1);
			return temp;
		}
		if(num == 24) {
			var temp = new Monster(p, "IceMask.PNG", "Ice Mask", 200, 150);
			temp.setStats(323, 49, 120, 29, "6x^4", 435, 13);
			temp.addShield("Double Derivative");
			var node3 = new AIRandomNode();
			node3.addNode(new AIAttackNode("Breeze",temp,1.3), 50);
			node3.addNode(new AIAttackNode("Ice Claw",temp), 50);
			var node1 = new AIResponseToStat("Constant","","Monster",0,new AIAttackNode("Term:+4x",temp),node3,temp,p);
			temp.setAI(node1);
			return temp;
		}
		if(num == 25) {
			var temp = new Monster(p, "FrostLizard.png", "Frost Lizard", 200, 150);
			temp.setStats(323, 49, 120, 29, "3x^3+2x^2-x-20", 435, 13);
			temp.addShield("Plug In 7");temp.addShield("Plug In 6");temp.addShield("Plug In 5");temp.addShield("Plug In 4");temp.addShield("Plug In 3");
			var node4 = new AIRandomNode();
			node4.addNode(new AIAttackNode("Breeze",temp,1.3), 50);
			node4.addNode(new AIAttackNode("Ice Claw",temp), 50);
			var node3 = new AIResponseToStat("Shield:Derivative","","Monster",0,node4,new AICounterAttack(node4, new AIAttackNode("Shield:Derivative",temp)),temp,p);
			var node2 = new AIResponseToStat("Shield:Double Derivative","","Monster",0,node4,new AICounterAttack(node4, new AIAttackNode("Shield:Double Derivative",temp)),temp,p);
			var node1 = new AIResponseToAttack(p,node4);
			node1.addNode("Dbl. Deriv.", node2);
			node1.addNode("Derivative", node3);
			temp.setAI(node1);
			return temp;
		}
		if(num == 26) {
			var temp = new Monster(p, "Yeti.png", "Yeti", 200, 200);
			temp.setStats(335, 49, 45, 67, "5939733", 467, 13);
			temp.addShield("Double Derivative");
			temp.addShield("Derivative");
			temp.addShield("Div. By 2");
			temp.addShield("Square Root");
			var node3 = new AIRandomNode();
			node3.addNode(new AIAttackNode("Pummel",temp,.9), 20);
			node3.addNode(new AIAttackNode("Frost",temp,1.4), 30);
			node3.addNode(new AIAttackNode("Ice Claw",temp), 50);
			var node2 = new AIResponseToStat("Shield:Subtract","","Monster",0,node3,new AICounterAttack(node3, new AIAttackNode("Shield:Subtract",temp)),temp,p);
			var node1 = new AIResponseToAttack(p,node3);
			node1.addNode("Nat. Log",node2);
			temp.setAI(node1);
			return temp;
		}
		if(num == 27) {
			var temp = new Monster(p, "IceGolem.png", "Ice Golem", 200, 200);
			temp.setStats(347, 20, 50, 36, "4x^8", 489, 14);
			temp.addShield("Plug In 15");temp.addShield("Plug In 14");temp.addShield("Plug In 12");
			temp.addShield("Plug In 11");temp.addShield("Plug In 10");temp.addShield("Plug In 9");temp.addShield("Plug In 8");
			temp.addShield("Plug In 7");temp.addShield("Plug In 6");temp.addShield("Plug In 5");temp.addShield("Plug In 4");temp.addShield("Plug In 3");
			temp.addShield("Natural Log");
			var node6 = new AIRandomNode();
			node6.addNode(new AIAttackNode("Frost",temp,1.8), 20);
			node6.addNode(new AIAttackNode("Breeze",temp,1.4), 30);
			node6.addNode(new AIAttackNode("Strike",temp), 50);
			
			var node5 = new AIResponseToStat("Shield:Square Root","","Monster",0,node6,new AICounterAttack(node6, new AIAttackNode("Shield:Square Root",temp)),temp,p);
			var node4 = new AIResponseToStat("HP","<","Monster",1000,node5,node6,temp,p);
			
			var node3 = new AIResponseToStat("Shield:Double Derivative","","Monster",0,node4,new AICounterAttack(node4, new AIAttackNode("Shield:Double Derivative",temp)),temp,p);
			var node2 = new AIResponseToStat("Shield:Derivative","","Monster",0,node3,new AICounterAttack(node3, new AIAttackNode("Shield:Derivative",temp)),temp,p);
			var node1 = new AIResponseToStat("Constant","","Monster",0,node2,node4,temp,p);
			temp.setAI(node1);
			return temp;
		}
		if(num == 28) {
			var temp = new Monster(p, "SeaSerpent.png", "Ice Serpent", 500, 300);
			temp.setStats(375, 40, 60, 26, "-4x^3+50000", 1500,200,25);
			temp.addShield("Double Derivative");
			temp.addShield("Remove Term");
			temp.setStartingShields();
			temp.setRunnable(false);
			var fail = new AICounterAttack(new AIAttackNode("Restore",temp),new AIAttackNode("Blizzard Sphere",temp));
			////////////////////////
			var gotGoal1 = new AICounterAttack(new AICounterAttack(new AIAttackNode("Recalculate:2x^3+2000",temp),new AIAttackNode("Unshield:Derivative",temp)),new AIAttackNode("Shield:Plug In 10",temp));
			var stdAtt1 = new AIAttackNode("Bite",temp);
			var shieldConstantCheck1 = new AIResponseToStat("Shield Constant","","Player",0,new AIAttackNode("Shatter",temp),new AIAttackNode("Plug In 5", temp),temp,p);
			var shieldCheck1 = new AIResponseToStat("Shield","","Player",0,shieldConstantCheck1,stdAtt1,temp,p);
			var checkGoal12 = new AIResponseToStat("HP","<","Monster",301,gotGoal1,shieldCheck1,temp,p);
			var checkGoal11 = new AIResponseToStat("HP",">","Monster",199,checkGoal12,shieldCheck1,temp,p);
			var firstTime = new AICounterNode(1,new AIAttackNode("Message:Try 200-300",temp),checkGoal11,false);
			var checkFail1 = new AIResponseToStat("HP","<","Monster",200,fail,firstTime,temp,p);
			var firstResponse = new AIResponseToAttack(p,checkFail1);
			firstResponse.addNode("Derivative", new AIAttackNode("Term:+500x",temp));
			firstResponse.addNode("Subtract", new AIResponseToStat("Constant","","Monster",0,checkFail1, new AIAttackNode("Heal",temp),temp,p));
			////////////////////////
			var stdAtt2 = new AIAttackNode("Breeze",temp,1.3);
			var shieldConstantCheck2 = new AIResponseToStat("Shield Constant","","Player",0,new AIAttackNode("Shatter",temp),new AIAttackNode("Plug In 5", temp),temp,p);
			var shieldCheck2 = new AIResponseToStat("Shield","","Player",0,shieldConstantCheck2,stdAtt2,temp,p);
			var gotGoal2 = new AICounterAttack(new AICounterAttack(new AIAttackNode("Recalculate:20x",temp),new AIAttackNode("Unshield:Derivative",temp)),new AIAttackNode("Shield:Plug In 7",temp));
			var checkGoal22 = new AIResponseToStat("HP","<","Monster",601,gotGoal2,shieldCheck2,temp,p);
			var checkGoal21 = new AIResponseToStat("HP",">","Monster",499,checkGoal22,shieldCheck2,temp,p);			
			var secondTime = new AICounterNode(1,new AIAttackNode("Message:Try 500-600",temp),checkGoal21,false);
			var checkFail2 = new AIResponseToStat("HP","<","Monster",500,fail,secondTime,temp,p);
			var secondResponse = new AIResponseToAttack(p,checkFail2);
			secondResponse.addNode("Derivative", new AIAttackNode("Term:+20x",temp));
			secondResponse.addNode("Subtract", new AIResponseToStat("Constant","","Monster",0,checkFail2, new AIAttackNode("Heal",temp),temp,p));
			////////////////////////
			var stdAtt3 = new AIAttackNode("Frost",temp,1.5);		
			var shieldConstantCheck3 = new AIResponseToStat("Shield Constant","","Player",0,new AIAttackNode("Shatter",temp),new AIAttackNode("Plug In 5", temp),temp,p);
			var shieldCheck3 = new AIResponseToStat("Shield","","Player",0,shieldConstantCheck3,stdAtt3,temp,p);
			var gotGoal3 = new AICounterAttack(new AICounterAttack(new AIAttackNode("Shield:Natural Log",temp),new AIAttackNode("Shield:Div. By 2",temp)),new AIAttackNode("Shield:Square Root",temp));
			var checkGoal32 = new AIResponseToStat("HP","<","Monster",1401,gotGoal3,shieldCheck3,temp,p);
			var checkGoal31 = new AIResponseToStat("HP",">","Monster",1299,checkGoal32,shieldCheck3,temp,p);			
			var thirdTime = new AICounterNode(1,new AIAttackNode("Message:Try 1300-1400",temp),checkGoal31,false);
			var checkFail3 = new AIResponseToStat("HP","<","Monster",1300,fail,thirdTime,temp,p);
			var thirdResponse = new AIResponseToAttack(p,checkFail3);
			thirdResponse.addNode("Derivative", new AIAttackNode("Term:+20x",temp));
			thirdResponse.addNode("Subtract", new AIResponseToStat("Constant","","Monster",0,checkFail3, new AIAttackNode("Heal",temp),temp,p));
			
			////////////////////////
			var stdAtt4 = new AIRandomNode();
			stdAtt4.addNode(new AIAttackNode("Frost",temp, 1.5), 10);
			stdAtt4.addNode(new AIAttackNode("Breeze",temp, 1.3), 30);
			stdAtt4.addNode(new AIAttackNode("Heal",temp), 20);
			stdAtt4.addNode(new AIAttackNode("Bite",temp), 50);
			var lastTime = new AICounterNode(1,new AIAttackNode("Message:Broke Concentration",temp),stdAtt4,false);
			///////////////////////
			var checkState3 = new AIResponseToStat("Shield:Plug In 10","","Monster",0,secondResponse,firstResponse,temp,p);
			var checkState2 = new AIResponseToStat("Shield:Plug In 7","","Monster",0,thirdResponse,checkState3,temp,p);
			var checkState1 = new AIResponseToStat("Shield:Natural Log","","Monster",0,lastTime,checkState2,temp,p);
			
			var makeDerivShield = new AIResponseToStat("Shield:Derivative","","Monster",0,checkState1,new AICounterAttack(checkState1, new AIAttackNode("Shield:Derivative",temp)),temp,p);
			var derivCheck = new AIResponseToStat("Constant","","Monster",0,makeDerivShield,checkState1,temp,p);
			
			
			
			temp.setAI(derivCheck);
			return temp;
		}
		if(num == 29) {
			var temp = new Monster(p, "Kobald.png", "Kobald", 300, 200);
			temp.setStats(350, 68, 120, 29, "2345", 475, 16);
			temp.addShield("Div. By 2");
			temp.addShield("Natural Log");
			temp.addShield("Square Root");
			temp.addShield("Derivative");
			var node1 = new AIRandomNode();
			node1.addNode(new AIAttackNode("V-Slash",temp,1.3), 50);
			node1.addNode(new AIAttackNode("Claw",temp), 50);
			temp.setAI(node1);
			return temp;
		}
		if(num == 30) {
			var temp = new Monster(p, "Gorp.png", "Gorp", 150, 200);
			temp.setStats(367, 45, 132, 34, "2x^3-35x^2+144x+81", 497, 17);
			temp.addShield("Double Derivative");
			temp.setStartingShields();
			var node2 = new AIRandomNode();
			node2.addNode(new AIAttackNode("Plague",temp,1.6), 50);
			node2.addNode(new AIAttackNode("Claw",temp), 50);
			var node1 = new AIResponseToStat("Constant","","Monster",0,new AICounterAttack(new AIAttackNode("Restore",temp), node2),node2,temp,p);
			temp.setAI(node1);
			return temp;
		}
		if(num == 31) {
			var temp = new Monster(p, "Needle Cyclops.png", "Needle Cyclops", 200, 200);
			temp.setStats(367, 45, 132, 34, "4x^3-5x^2+44x+23", 497, 17);
			temp.addShield("Add Term All");
			temp.addShield("Plug In All");
			temp.addShield("Remove Term");
			temp.addShield("Derivative");
			temp.addShield("Double Derivative");
			var node1 = new AIRandomNode();
			node1.addNode(new AIAttackNode("Slime",temp,1.3), 20);
			node1.addNode(new AIAttackNode("Claw",temp,1.3), 40);
			node1.addNode(new AIAttackNode("Strike",temp), 40);
			temp.setAI(node1);
			return temp;
		}
		if(num == 32) {
			var temp = new Monster(p, "LeapingLizard.png", "Leaping Lizard", 200, 200);
			temp.addShield("Plug In 1");temp.addShield("Plug In 0");
			temp.setStats(374, 24, 78, 34, "4x^9-2x", 527, 17);
			var node6 = new AIRandomNode();
			node6.addNode(new AIAttackNode("Fire",temp,1.6), 20);
			node6.addNode(new AIAttackNode("Bite",temp,1.3), 30);
			node6.addNode(new AIAttackNode("Claw",temp), 50);
			var node5 = new AIResponseToStat("Shield:Plug In All","","Monster",0,node6,new AICounterAttack(node6, new AIAttackNode("Shield:Plug In All",temp)),temp,p);
			var node4 = new AIResponseToAttack(p,node6);
			node4.addNode("Rem. Term", node5);
			var node3 = new AIResponseToStat("Shield:Double Derivative","","Monster",0,node4,new AICounterAttack(node4, new AIAttackNode("Shield:Double Derivative",temp)),temp,p);
			var node2 = new AIResponseToStat("Shield:Derivative","","Monster",0,node3,new AICounterAttack(node3, new AIAttackNode("Shield:Derivative",temp)),temp,p);
			var node1 = new AIResponseToStat("Constant","","Monster",0,node2,node4,temp,p);
			temp.setAI(node1);
			return temp;
		}
		if(num == 33) {
			var temp = new Monster(p, "WargoreNew.png", "Wargore", 250, 200);
			temp.setStats(381, 45, 132, 34, "x^4-10x^3+25x^2-40x+250", 535, 16);
			var node2 = new AIRandomNode();
			node2.addNode(new AIAttackNode("Bite",temp,1.3), 50);
			node2.addNode(new AIAttackNode("Strike",temp), 50);
			var node1 = new AIResponseToStat("Constant","","Monster",0,new AICounterAttack(new AIAttackNode("Restore",temp), node2),node2,temp,p);
			temp.setAI(node1);
			return temp;
		}
		if(num == 34) {
			var temp = new Monster(p, "LilDevil.png", "Lil' Devil", 100, 100);
			temp.setStats(390, 29, 125, 45, "1250", 547, 17);
			temp.addShield("Derivative");
			temp.addShield("Double Derivative");
			var node1 = new AIRandomNode();
			node1.addNode(new AIAttackNode("Fire",temp,1.3), 40);
			node1.addNode(new AIAttackNode("Bite",temp), 60);
			temp.setAI(node1);
			return temp;
		}
		if(num == 35) {
			var temp = new Monster(p, "GreenDragon.png", "Green Dragon", 200, 150);
			temp.setStats(397, 34, 125, 46, "x^2-10x+24", 565, 17);
			temp.addShield("Derivative");
			temp.addShield("Double Derivative");
			temp.addShield("Remove Term");
			temp.addShield("Term:All");
			temp.addShield("Plug In All");
			var node2 = new AIRandomNode();
			node2.addNode(new AIAttackNode("Bite",temp,1.3), 40);
			node2.addNode(new AIAttackNode("Claw",temp), 60);
			var node1 = new AIResponseToStat("Constant","","Monster",0,new AICounterAttack(new AIAttackNode("Fire",temp,1.6), node2),node2,temp,p);
			temp.setAI(node1);
			return temp;
		}
		if(num == 36) {
			var temp = new Monster(p, "FireMan.png", "Fire Man", 150, 200);
			temp.setStats(400, 45, 130, 23, "2x^4-36x^3+238x^2-684x+721", 578, 17);
			temp.addShield("Div. By 2");
			temp.addShield("Square Root");
			temp.addShield("Natural Log");
			temp.addShield("Subtract");
			temp.addShield("Term:All");
			temp.addShield("Plug In All");
			temp.addShield("Double Derivative");
			temp.addShield("Subtct. 10");
			temp.addShield("Subtct. 9");
			temp.addShield("Subtct. 8");
			temp.addShield("Subtct. 7");
			var node3 = new AIRandomNode();
			node3.addNode(new AIAttackNode("Fire",temp,1.3), 40);
			node3.addNode(new AIAttackNode("Claw",temp), 60);
			var node2 = new AIResponseToStat("Shield:Derivative","","Monster",0,new AIAttackNode("Bomb",temp,1.6), new AIAttackNode("Shield:Derivative",temp),temp,p);
			var node1 = new AIResponseToStat("Constant","","Monster",0,new AICounterAttack(node3, node2),node3,temp,p);
			var randomPlugIn = new AIRandomNode();
			randomPlugIn.addNode(node1, 50);
			randomPlugIn.addNode(new AIAttackNode("Plug In 10", temp),50);
			var shieldConstantCheck = new AIResponseToStat("Shield Constant","","Player",0,node1,randomPlugIn,temp,p);
			var shieldCheck = new AIResponseToStat("Shield","","Player",0,shieldConstantCheck,node1,temp,p);
			temp.setAI(shieldCheck);
			return temp;
		}
		if(num == 37) {
			var temp = new Monster(p, "Chili.png", "Chili", 150, 200);
			temp.setStats(402, 34, 125, 46, "x^9+4x^8+24", 582, 17);
			temp.addShield("Plug In 0");
			temp.addShield("Plug In 1");
			var node4 = new AIRandomNode();
			node4.addNode(new AIAttackNode("Bomb",temp,1.3), 40);
			node4.addNode(new AIAttackNode("Fire",temp), 60);
			var node3 = new AIResponseToStat("Shield:Double Derivative","","Monster",0,node4,new AICounterAttack(node4, new AIAttackNode("Shield:Double Derivative",temp)),temp,p);
			var node2 = new AIResponseToStat("Shield:Derivative","","Monster",0,node3,new AICounterAttack(node3, new AIAttackNode("Shield:Derivative",temp)),temp,p);
			var node1 = new AIResponseToStat("Constant","","Monster",0,node2,node4,temp,p);
			temp.setAI(node1);
			return temp;
		}
		if(num == 38) {
			var temp = new Monster(p, "Minion.png", "Minion", 200, 200);
			temp.setStats(403, 15, 125, 45, "172x^4-3472x^3+21585x^2-33442x-40752", 586, 17);
			temp.addShield("Derivative");
			temp.addShield("Double Derivative");
			temp.addShield("Plug In All");
			var node1 = new AIRandomNode();
			node1.addNode(new AIAttackNode("Bomb",temp,1.6), 40);
			node1.addNode(new AIAttackNode("Fire",temp,1.3), 30);
			node1.addNode(new AIAttackNode("Claw",temp), 30);
			temp.setAI(node1);
			return temp;
		}
		if(num == 39) {
			var temp = new Monster(p, "FireLion.png", "Fire Lion", 150, 250);
			temp.setStats(413, 25, 128, 45, "250", 597, 65,17);
			temp.addShield("Derivative");
			temp.addShield("Double Derivative");
			temp.addShield("Natural Log");
			temp.addShield("Square Root");
			temp.addShield("Div. By 2");
			var node2 = new AIRandomNode();
			node2.addNode(new AIAttackNode("Bomb",temp,1.6), 30);
			node2.addNode(new AIAttackNode("Fire",temp,1.3), 30);
			node2.addNode(new AIAttackNode("Bite",temp), 40);
			var node1 = new AICounterAttack(node2,new AIAttackNode("Heal",temp));
			var randomPlugIn = new AIRandomNode();
			randomPlugIn.addNode(node1, 50);
			randomPlugIn.addNode(new AIAttackNode("Plug In 4", temp),50);
			var shieldConstantCheck = new AIResponseToStat("Shield Constant","","Player",0,node1,randomPlugIn,temp,p);
			var shieldCheck = new AIResponseToStat("Shield","","Player",0,shieldConstantCheck,node1,temp,p);
			temp.setAI(shieldCheck);
			
			return temp;
		}
		if(num == 40) {
			var temp = new Monster(p, "DemonKing.png", "Demon King", 500, 300);
			temp.setStats(430, 13, 60, 26, "4x^3-5x^2+14x+235", 2000,60,25);
			temp.addShield("Plug In All");
			temp.addShield("Derivative");
			temp.addShield("Double Derivative");
			temp.addShield("Remove Term");
			temp.setStartingShields();
			temp.setRunnable(false);
			var fail = new AICounterAttack(new AIAttackNode("Restore",temp),new AIAttackNode("Explosion",temp));
			////////////////////////
			var gotGoal1 = new AICounterAttack(new AIAttackNode("Recalculate:x^3-3x^2+132",temp),new AIAttackNode("Shield:Plug In 2",temp));
			var stdAtt1 = new AIAttackNode("Claw",temp);
			var checkGoal12 = new AIResponseToStat("HP","<","Monster",5601,gotGoal1,fail,temp,p);
			var checkGoal11 = new AIResponseToStat("HP",">","Monster",5499,checkGoal12,fail,temp,p);
			var firstTime = new AICounterNode(1,new AIAttackNode("Message:Try 5500-5600",temp),stdAtt1,false);
			////////////////////////
			var gotGoal2 = new AICounterAttack(new AIAttackNode("Recalculate:8x^3-16x^2+600",temp),new AIAttackNode("Shield:Plug In 4",temp));
			var stdAtt2 = new AIAttackNode("Fire",temp,1.3);
			var checkGoal22 = new AIResponseToStat("HP","<","Monster",601,gotGoal2,fail,temp,p);
			var checkGoal21 = new AIResponseToStat("HP",">","Monster",499,checkGoal22,fail,temp,p);
			var secondTime = new AICounterNode(1,new AIAttackNode("Message:Try 500-600",temp),stdAtt2,false);
			////////////////////////
			var gotGoal3 = new AICounterAttack(new AICounterAttack(new AIAttackNode("Shield:Natural Log",temp),new AIAttackNode("Shield:Div. By 2",temp)),new AICounterAttack(new AIAttackNode("Shield:Square Root",temp),new AIAttackNode("Sap",temp)));
			var stdAtt3 = new AIAttackNode("Bomb",temp,1.6);
			var checkGoal32 = new AIResponseToStat("HP","<","Monster",1701,gotGoal3,fail,temp,p);
			var checkGoal31 = new AIResponseToStat("HP",">","Monster",1599,checkGoal32,fail,temp,p);
			var thirdTime = new AICounterNode(1,new AIAttackNode("Message:Try 1600-1700",temp),stdAtt3,false);
			////////////////////////
			var stdAtt4 = new AIRandomNode();
			stdAtt4.addNode(new AIAttackNode("Explosion",temp, 1.2), 10);
			stdAtt4.addNode(new AIAttackNode("Bomb",temp, 1.6), 30);
			stdAtt4.addNode(new AIAttackNode("Heal",temp), 20);
			stdAtt4.addNode(new AIAttackNode("Claw",temp), 40);
			var lastTime = new AICounterNode(1,new AIAttackNode("Message:Broke Concentration",temp),stdAtt4,false);
			///////////////////////
			var checkState3a = new AIResponseToStat("Shield:Plug In 2","","Monster",0,checkGoal21,checkGoal11,temp,p);
			var checkState2a = new AIResponseToStat("Shield:Plug In 4","","Monster",0,checkGoal31,checkState3a,temp,p);
			var checkState1a = new AIResponseToStat("Shield:Natural Log","","Monster",0,lastTime,checkState2a,temp,p);
			
			var checkState3 = new AIResponseToStat("Shield:Plug In 2","","Monster",0,secondTime,firstTime,temp,p);
			var checkState2 = new AIResponseToStat("Shield:Plug In 4","","Monster",0,thirdTime,checkState3,temp,p);
			var checkState1 = new AIResponseToStat("Shield:Natural Log","","Monster",0,lastTime,checkState2,temp,p);
			
			var shieldConstantCheck = new AIResponseToStat("Shield Constant","","Player",0,new AIAttackNode("Shatter",temp),new AIAttackNode("Plug In 5", temp),temp,p);
			var shieldCheck = new AIResponseToStat("Shield","","Player",0,shieldConstantCheck,checkState1,temp,p);
			
			var integralDefense = new AIResponseToStat("Integral Defense", "","Monster",0,new AIAttackNode("Restore",temp),shieldCheck,temp,p);
			
			var derivCheck = new AIResponseToStat("Constant","","Monster",0,checkState1a,integralDefense,temp,p);
			
			temp.setAI(derivCheck);
			return temp;
		}
		if(num == 41) {
			var temp = new Monster(p, "Bob.png", "Bob", 200, 300);
			temp.setStats(445, 52, 120, 35, "x^3+4x^2-10x+3433+C", 603,18);
			temp.setPlusC(200);
			var node1 = new AIRandomNode();
			node1.addNode(new AIAttackNode("Fire",temp,1.6), 20);
			node1.addNode(new AIAttackNode("Bite",temp,1.3), 30);
			node1.addNode(new AIAttackNode("Claw",temp), 50);
			temp.setAI(node1);
			return temp;
		}
		if(num == 42) {
			var temp = new Monster(p, "Dragoshell.png", "Dragoshell", 150, 200);
			temp.setStats(453, 26, 124, 25, "777777777", 612, 18);
			temp.addShield("Derivative");
			temp.addShield("Double Derivative");
			var node1 = new AIRandomNode();
			node1.addNode(new AIAttackNode("Fire",temp,1.6), 20);
			node1.addNode(new AIAttackNode("Bite",temp,1.3), 30);
			node1.addNode(new AIAttackNode("Claw",temp), 50);
			temp.setAI(node1);
			return temp;
		}
		if(num == 43) {
			var temp = new Monster(p, "Spook.png", "Spook", 150, 200);
			temp.makeUndead();
			temp.setStats(457, 45, 127, 34, "13x^2+34x+340+C", 624, 19);
			temp.setPlusC(75);
			var node1 = new AIRandomNode();
			node1.addNode(new AIAttackNode("Plague",temp,1.6), 20);
			node1.addNode(new AIAttackNode("Water Drop",temp,1.3), 30);
			node1.addNode(new AIAttackNode("Slime",temp), 50);
			temp.setAI(node1);
			return temp;
		}
		if(num == 44) {
			var temp = new Monster(p, "Ghosty.png", "Ghosty", 100, 100);
			temp.makeUndead();
			temp.setStats(461, 67, 143, 34, "13x^2+34x+340", 624, 19);
			var node4 = new AIRandomNode();
			node4.addNode(new AIAttackNode("Plague",temp,1.6), 20);
			node4.addNode(new AIAttackNode("Frost",temp,1.3), 30);
			node4.addNode(new AIAttackNode("V-Slash",temp), 50);
			var node3 = new AIResponseToStat("Shield:Double Derivative","","Monster",0,node4,new AICounterAttack(node4, new AIAttackNode("Shield:Double Derivative",temp)),temp,p);
			var node2 = new AIResponseToStat("Shield:Derivative","","Monster",0,node3,new AICounterAttack(node3, new AIAttackNode("Shield:Derivative",temp)),temp,p);
			var node1 = new AIResponseToStat("Constant","","Monster",0,node2,node4,temp,p);
			var randomPlugIn = new AIRandomNode();
			randomPlugIn.addNode(node1, 50);
			randomPlugIn.addNode(new AIAttackNode("Plug In 24", temp),50);
			var shieldConstantCheck = new AIResponseToStat("Shield Constant","","Player",0,node1,randomPlugIn,temp,p);
			var shieldCheck = new AIResponseToStat("Shield","","Player",0,shieldConstantCheck,node1,temp,p);
			temp.setAI(shieldCheck);
			
			return temp;
		}
		if(num == 45) {
			var temp = new Monster(p, "EyeMon.png", "Eyemon", 200, 200);
			var plugInNum = Math.floor (Math.random() * 16);
			var plugInNum1 = Math.floor (Math.random() * 16);
			while(plugInNum == plugInNum1) plugInNum1 = Math.floor (Math.random() * 16);
			var plugInNum2 = Math.floor (Math.random() * 16);
			while(plugInNum2 == plugInNum1 || plugInNum2 == plugInNum) plugInNum2 = Math.floor (Math.random() * 16);
			temp.setStats(466, 56, 145, 37, "13x^3-34x+620+C", 635, 19);
			temp.setPlusC(400);
			temp.addShield("Plug In " + plugInNum.toString());
			temp.addShield("Plug In " + plugInNum1.toString());
			temp.addShield("Plug In " + plugInNum2.toString());
			var node1 = new AIRandomNode();
			node1.addNode(new AIAttackNode("Thunder Shock",temp,1.1), 20);
			node1.addNode(new AIAttackNode("Water Drop",temp,1.3), 30);
			node1.addNode(new AIAttackNode("Claw",temp), 50);
			temp.setAI(node1);
			return temp;
		}
		if(num == 46) {
			var temp = new Monster(p, "treeface.png", "Treeface", 150, 200);
			temp.setStats(457, 45, 127, 34, "x^8+54x^7+1200+C", 624,100, 19);
			temp.addShield("Square Root");
			temp.addShield("Natural Log");
			temp.setPlusC(467);
			var node4 = new AIRandomNode();
			node4.addNode(new AIAttackNode("Heal",temp), 20);
			node4.addNode(new AIAttackNode("Claw",temp,1.3), 30);
			node4.addNode(new AIAttackNode("Strike",temp), 50);
			var node3 = new AIResponseToStat("Shield:Double Derivative","","Monster",0,node4,new AICounterAttack(node4, new AIAttackNode("Shield:Double Derivative",temp)),temp,p);
			var node2 = new AIResponseToStat("Shield:Derivative","","Monster",0,node3,new AICounterAttack(node3, new AIAttackNode("Shield:Derivative",temp)),temp,p);
			var node1 = new AIResponseToStat("Constant","","Monster",0,node2,node4,temp,p);
			var randomPlugIn = new AIRandomNode();
			randomPlugIn.addNode(node1, 50);
			randomPlugIn.addNode(new AIAttackNode("Plug In 6", temp),50);
			var shieldConstantCheck = new AIResponseToStat("Shield Constant","","Player",0,node1,randomPlugIn,temp,p);
			var shieldCheck = new AIResponseToStat("Shield","","Player",0,shieldConstantCheck,node1,temp,p);
			temp.setAI(shieldCheck);
			return temp;
		}
		if(num == 47) {
			var temp = new Monster(p, "KingToad.png", "King Toad", 150, 200);
			temp.setStats(464, 45, 131, 54, "1465", 612, 19);
			temp.addShield("Derivative");
			temp.addShield("Double Derivative");
			temp.addShield("Square Root");
			temp.addShield("Natural Log");
			temp.addShield("Div. By 2");
			var node1 = new AIRandomNode();
			node1.addNode(new AIAttackNode("Fire",temp,1.6), 20);
			node1.addNode(new AIAttackNode("Bite",temp,1.3), 30);
			node1.addNode(new AIAttackNode("Claw",temp), 50);
			var randomPlugIn = new AIRandomNode();
			randomPlugIn.addNode(node1, 50);
			randomPlugIn.addNode(new AIAttackNode("Plug In 13", temp),50);
			var shieldConstantCheck = new AIResponseToStat("Shield Constant","","Player",0,node1,randomPlugIn,temp,p);
			var shieldCheck = new AIResponseToStat("Shield","","Player",0,shieldConstantCheck,node1,temp,p);
			temp.setAI(shieldCheck);
			return temp;
		}
		if(num == 48) {
			var temp = new Monster(p, "Skeledeer.png", "Skeledeer", 250, 200);
			temp.makeUndead();
			var coef1 = (Math.floor (Math.random() * 15) +3).toString();
			var coef2 = (Math.floor ((Math.random() * 15) +3)*2).toString();
			var coef3 = (Math.floor ((Math.random() * 126) +56).toString());
			temp.setStats(457, 45, 127, 34, coef1 + "x^2+"+ coef2 + "x+" + coef3, 624, 19);
			temp.addShield("Derivative");
			temp.addShield("Double Derivative");
			var node1 = new AIRandomNode();
			node1.addNode(new AIAttackNode("Frost",temp,1.6), 20);
			node1.addNode(new AIAttackNode("Breeze",temp,1.3), 30);
			node1.addNode(new AIAttackNode("Bite",temp), 50);
			var randomPlugIn = new AIRandomNode();
			randomPlugIn.addNode(node1, 50);
			randomPlugIn.addNode(new AIAttackNode("Plug In 13", temp),50);
			var shieldConstantCheck = new AIResponseToStat("Shield Constant","","Player",0,node1,randomPlugIn,temp,p);
			var shieldCheck = new AIResponseToStat("Shield","","Player",0,shieldConstantCheck,node1,temp,p);
			temp.setAI(shieldCheck);
			return temp;
		}
		if(num == 49) {
			var temp = new Monster(p, "Cerberus.png", "Cerberus", 200, 200);
			temp.setStats(470, 13, 127, 34, "3x^5-13x^3+45x-200+C", 650, 19);
			temp.addShield("Derivative");
			temp.addShield("Double Derivative");
			temp.setPlusC(500);
			var qnode1 = new AIQueueNode(new AIAttackNode("Explosion",temp));
			var qnode2 = new AIQueueNode(new AIAttackNode("Message:Growl",temp),qnode1);
			var randomPlugIn = new AIRandomNode();
			randomPlugIn.addNode(qnode2, 50);
			randomPlugIn.addNode(new AIAttackNode("Plug In 11", temp),50);
			var shieldConstantCheck = new AIResponseToStat("Shield Constant","","Player",0,qnode2,randomPlugIn,temp,p);
			var shieldCheck = new AIResponseToStat("Shield","","Player",0,shieldConstantCheck,qnode2,temp,p);
			temp.setAI(shieldCheck);
			return temp;
		}
		if(num == 50) {
			var temp = new Monster(p, "Melmond.png", "Melmond", 200, 200);
			var rand = Math.floor (Math.random() * 14)+1;
			var coef1 = (rand * 2 + 1).toString();
			var coef2 = (rand * rand + rand).toString();
			temp.setStats(470, 13, 127, 34, "x^2-" + coef1 + "x+" + coef2, 670,20, 19);
			var att = new AIAttackNode("Leech",temp);
			var breakShield = new AICounterAttack(new AICounterAttack(att,new AIAttackNode("Shatter",temp)),new AIAttackNode("Plug In 7",temp));
			var shieldCheck = new AIResponseToStat("Shield","","Player",0,breakShield,att,temp,p);
			temp.setAI(shieldCheck);
			return temp;
		}
		if(num == 51) {
			var temp = new Monster(p, "Erasmus.png", "Erasmus", 250, 250);
			var a = Math.floor (Math.random() * 14)+1;
			var b = Math.floor (Math.random() * 14)+1;
			var coef1 = "";
			var co1 = -2*b + a; 
			if(co1 == 0) {;}
			else if(co1 == 1){coef1 = "x^2";}
			else if(co1 == -1){coef1 = "-x^2";}
			else if(co1 > 1){coef1 = "+" + (co1).toString() + "x^2";}
			else {coef1 = (co1).toString() + "x^2";}
			var coef2 = "";
			var co2 = b*b - 2 * a * b; 
			if(co2 == 0) {;}
			else if(co2 == 1){coef2 = "x";}
			else if(co2 == -1){coef2 = "-x";}
			else if(co2 > 1){coef2 = "+" + (co2).toString() + "x";}
			else {coef2 = (co2).toString() + "x";}
			var coef3 = "";
			var co3 = a*b*b; 
			if(co3 == 0) {;}
			else if(co3 > 0){coef3 = "+" + (co3).toString();}
			else {coef3 = (co3).toString();}
			temp.setStats(470, 13, 127, 34, "x^3" + coef1 + coef2 + coef3, 690,25, 19);
			var att = new AIAttackNode("Leech",temp);
			var breakShield = new AICounterAttack(new AICounterAttack(att,new AIAttackNode("Shatter",temp)),new AIAttackNode("Plug In 7",temp));
			var shieldCheck = new AIResponseToStat("Shield","","Player",0,breakShield,att,temp,p);
			temp.setAI(shieldCheck);
			return temp;
		}
		if(num == 52) {
			var temp = new Monster(p, "Mystero.png", "Mystero", 200, 250);
			var a = Math.floor (Math.random() * 14)+1;
			var b = Math.floor (Math.random() * 14)+1;
			var coef1 = "";
			var co1 = -2*b; 
			coef1 = (co1).toString() + "x^3";
			var coef2 = "";
			var co2 = b*b + a; 
			coef2 = "+" + (co2).toString() + "x^2";
			var coef3 = "";
			var co3 = -2 * a * b; 
			coef3 = (co3).toString() + "x";
			var coef4 = "";
			var co4 = a*b*b; 
			coef4 = "+" + (co4).toString();
			temp.setStats(470, 13, 127, 34, "x^4" + coef1 + coef2 + coef3 + coef4, 710,30,19);
			//temp.setStats(470, 13, 127, 34, "6x^2+136", 710,30);
			
			var att = new AIAttackNode("Leech",temp);
			var breakShield = new AICounterAttack(new AICounterAttack(att,new AIAttackNode("Shatter",temp)),new AIAttackNode("Plug In 7",temp));
			var shieldCheck = new AIResponseToStat("Shield","","Player",0,breakShield,att,temp,p);
			temp.setAI(shieldCheck);
			return temp;
		}
		if(num == 53) {
			var temp = new MonsterLordCalculus(p, "LordCalculus.png", "Lord Calculus", 500,300);
			//temp.setStats(500, 25, 140, 30, "1000", "0", "-1000", 3500, 60);
			temp.setStats(500, 25, 140, 30, "6x^2+136", "x^2-7x+24", "x^9+x^8", 3500, 60, 50);
			temp.addShield("Derivative", 0);
			temp.addShield("Double Derivative", 0);
			temp.addShield("Natural Log", 1);
			temp.addShield("Square Root", 1);
			temp.addShield("Div. By 2", 1);
			temp.addShield("Plug In All", 2);
			temp.addShield("Term:All", 2);
			temp.addShield("Natural Log", 2);
			temp.addShield("Square Root", 2);
			temp.addShield("Div. By 2", 2);
			temp.setRunnable(false);
			
			var stdAtt = new AIRandomNode();
			stdAtt.addNode(new AIAttackNode("V-Slash",temp, 1.0), 40);
			stdAtt.addNode(new AIAttackNode("Stone",temp,1.2), 30);
			stdAtt.addNode(new AIAttackNode("Gust",temp,1.4), 20);
			stdAtt.addNode(new AIAttackNode("Message:Maniacal Laughter",temp), 10);
					
			var qnode1 = new AIQueueNode(new AIAttackNode("Darkness Blade",temp));
			var qnode2 = new AIQueueNode(new AIAttackNode("Explosion",temp,1.5),qnode1);
			var qnode3 = new AIQueueNode(new AIAttackNode("Blizzard Sphere",temp,1.3),qnode2);
			var qnode4 = new AIQueueNode(new AIAttackNode("Thunder Shock",temp,1.1),qnode3);
			var qnode5 = new AIQueueNode(new AIAttackNode("Eruption",temp,.9),qnode4);
			var qnode6 = new AIQueueNode(new AIAttackNode("Pummel",temp,.7),qnode5);
			var qnode7 = new AIQueueNode(new AIAttackNode("Fluster",temp),qnode6);
			
			var bigAttack = new AICounterNode(7,qnode7,stdAtt,true);
			
			var changeActive = new AICounterAttack(bigAttack,new AIAttackNode("Change Active",temp));
			var breakShield = new AICounterAttack(new AICounterAttack(changeActive,new AIAttackNode("Shatter",temp)),new AIAttackNode("Plug In 7",temp));
			var shieldCheck = new AIResponseToStat("Shield","","Player",0,breakShield,changeActive,temp,p);
			temp.setAI(shieldCheck);
			return temp;
		}
		if(num == 54) {
			var temp = new Monster(p, "Yoshi.Png", "Yoshi", 100, 200);
			temp.setStats(300, 20, 50, 5, "600", 2000, 15);
			var node1 = new AIRandomNode();
			node1.addNode(new AIAttackNode("Poke",temp), 50);
			node1.addNode(new AIAttackNode("Annoy",temp), 50);
			temp.setAI(node1);
			return temp;
		}
		
		return new Monster(p,"","Nothing",100,100);
	}
}
