class MonsterLordCalculus extends Monster {
	
	constructor(p, fileName, n, w, h) {
		super(p, fileName, n, w, h);
		this.activeHp = new Equation("10");
		this.secondActiveHp = null;
		this.thirdActiveHp = null;
		this.hps = [];
		this.startingHps = [];
		this.cycle = 0;
		this.shieldList = [];
		this.shieldList[0] = [];
		this.shieldList[1] = [];
		this.shieldList[2] = [];
		this.shields = this.shieldList[0];
	}
	
	setStats(st, stm, de, dem, h1, h2, h3, exp, ml, lev) {
		this.level = lev;
		this.str = st;
		this.strMod = stm;
		this.def = de;
		this.defMod = dem;
		this.startingHps.push(h1); this.startingHps.push(h2);this.startingHps.push(h3);
		this.hp = new Equation(h1,this.EQSIZE);
		//hp = new Equation(h1,x + width/2 - hp.getLength()/2,Battle.MAIN_WINDOW_Y2-(Battle.MAIN_WINDOW_Y2-Battle.MAIN_WINDOW_Y1)/8-40,this.EQSIZE);
		this.hps.push(this.hp);
		this.hp = new Equation(h2,this.EQSIZE);
		//hp = new Equation(h2,x + width/2 - hp.getLength()/2,Battle.MAIN_WINDOW_Y2-(Battle.MAIN_WINDOW_Y2-Battle.MAIN_WINDOW_Y1)/8,this.EQSIZE);
		this.hps.push(this.hp);
		this.hp = new Equation(h3,this.EQSIZE);
		//hp = new Equation(h3,x + width/2 - hp.getLength()/2,Battle.MAIN_WINDOW_Y2-(Battle.MAIN_WINDOW_Y2-Battle.MAIN_WINDOW_Y1)/8+40,this.EQSIZE);
		this.hps.push(this.hp);
		this.xp = exp;
		this.magicLevel = ml;
		this.activeHp = this.hps[0];
		this.activeHpNum = 0;
		this.secondActiveHpNum = -1;
		this.thirdActiveHpNum = -1;
	}
	
	addShield(sh, num) {
		if(typeof num === "undefined") {
			super.addShield(sh);
		}
		else {
			for(var i = 0; i < this.shieldList[num].length; i++) {
				if(this.shieldList[num][i] === sh ) return;
			}
			this.shieldList[num].push(sh);
		}
	}
	
	setHp(h) {
		var match;
		if(this.activeHp == this.hps[0]) match = 0;
		else if (this.activeHp == this.hps[1]) match = 1;
		else match = 2;
		this.startingHps.splice(match, 1, h);
		//int offset = 40 * match - 40;
		this.hp = new Equation(h,this.EQSIZE);
		//hp = new Equation(h,x + width/2 - hp.getLength()/2,Battle.MAIN_WINDOW_Y2-(Battle.MAIN_WINDOW_Y2-Battle.MAIN_WINDOW_Y1)/8 + offset,this.EQSIZE);
		this.hps.splice(match, 1, this.hp);
	}
	
	restore() {
		super.restore();
		for(var i = 0; i < 3; i++) {
			//int offset = 40 * i - 40;
			this.hp = new Equation(this.startingHps[i],this.EQSIZE);
			//hp = new Equation(startingHps[i],x + width/2 - hp.getLength()/2,Battle.MAIN_WINDOW_Y2-(Battle.MAIN_WINDOW_Y2-Battle.MAIN_WINDOW_Y1)/8 + offset,this.EQSIZE);
			this.hps.splice(i, 1, this.hp);
		}
	}
	
	printMonster(g) {
		if(this.loadLock) return;
		g.drawImage(this.monImage, 0,0,this.monImage.width,this.monImage.height, this.x, this.y, this.width, this.height);
		
		g.fillStyle = "black";
		Player.roundRect(g, this.x + this.width/2 - this.hps[0].getLength()/2+2-10, Battle.MAIN_WINDOW_Y2-(Battle.MAIN_WINDOW_Y2-Battle.MAIN_WINDOW_Y1)/8+2-this.hps[0].getHeight()/2-6-40, this.hps[0].getLength()+20, this.hps[0].getHeight()+4,10,10);
		Player.roundRect(g, this.x + this.width/2 - this.hps[1].getLength()/2+2-10, Battle.MAIN_WINDOW_Y2-(Battle.MAIN_WINDOW_Y2-Battle.MAIN_WINDOW_Y1)/8+2-this.hps[1].getHeight()/2-6, this.hps[1].getLength()+20, this.hps[1].getHeight()+4,10,10);
		Player.roundRect(g, this.x + this.width/2 - this.hps[2].getLength()/2+2-10, Battle.MAIN_WINDOW_Y2-(Battle.MAIN_WINDOW_Y2-Battle.MAIN_WINDOW_Y1)/8+2-this.hps[2].getHeight()/2-6+40, this.hps[2].getLength()+20, this.hps[2].getHeight()+4,10,10);
		
		if(this.activeHp == this.hps[0] || this.secondActiveHp == this.hps[0] || this.thirdActiveHp == this.hps[0]) g.fillStyle = this.hpBackColor; else g.fillStyle = "#333333";
		Player.roundRect(g, this.x + this.width/2 - this.hps[0].getLength()/2-10, Battle.MAIN_WINDOW_Y2-(Battle.MAIN_WINDOW_Y2-Battle.MAIN_WINDOW_Y1)/8-this.hps[0].getHeight()/2-6-40, this.hps[0].getLength()+20, this.hps[0].getHeight()+4,10,10);
		if(this.activeHp == this.hps[1] || this.secondActiveHp == this.hps[1] || this.thirdActiveHp == this.hps[1]) g.fillStyle = this.hpBackColor; else g.fillStyle = "#333333";
		Player.roundRect(g, this.x + this.width/2 - this.hps[1].getLength()/2-10, Battle.MAIN_WINDOW_Y2-(Battle.MAIN_WINDOW_Y2-Battle.MAIN_WINDOW_Y1)/8-this.hps[1].getHeight()/2-6, this.hps[1].getLength()+20, this.hps[1].getHeight()+4,10,10);
		if(this.activeHp == this.hps[2] || this.secondActiveHp == this.hps[2] || this.thirdActiveHp == this.hps[2]) g.fillStyle = this.hpBackColor; else g.fillStyle = "#333333";
		Player.roundRect(g, this.x + this.width/2 - this.hps[2].getLength()/2-10, Battle.MAIN_WINDOW_Y2-(Battle.MAIN_WINDOW_Y2-Battle.MAIN_WINDOW_Y1)/8-this.hps[2].getHeight()/2-6+40, this.hps[2].getLength()+20, this.hps[2].getHeight()+4,10,10);
		
		for(var i = 0; i < 3; i++)
			this.hps[i].printEquation(g,this.x + this.width/2 - this.hps[i].getLength()/2,Battle.MAIN_WINDOW_Y2-(Battle.MAIN_WINDOW_Y2-Battle.MAIN_WINDOW_Y1)/8-40 + i*40);
	
	}
	
	isHpConstant(num) {
		if(typeof num === "undefined") {
			return this.activeHp.isConstant();	
		}
		return this.hps[num].isConstant();
	}
	
	changeHp(a) {
		this.activeHp.add(a);
		var temp = this.activeHp.getEquation();
		//int offset = 40*activeHpNum - 40;
		this.hp = new Equation(temp,this.EQSIZE);
		//hp = new Equation(hp.getEquation(),x + width/2 - hp.getLength()/2,Battle.MAIN_WINDOW_Y2-(Battle.MAIN_WINDOW_Y2-Battle.MAIN_WINDOW_Y1)/8+offset,this.EQSIZE);
		this.hps.splice(this.activeHpNum, 1, this.hp);
		this.activeHp = this.hps[this.activeHpNum];
		if(this.secondActiveHp != null) {
			this.secondActiveHp.add(a);
			temp = this.secondActiveHp.getEquation();
			//offset = 40*secondActiveHpNum - 40;
			this.hp = new Equation(temp,this.EQSIZE);
			//hp = new Equation(hp.getEquation(),x + width/2 - hp.getLength()/2,Battle.MAIN_WINDOW_Y2-(Battle.MAIN_WINDOW_Y2-Battle.MAIN_WINDOW_Y1)/8+offset,this.EQSIZE);
			this.hps.splice(this.secondActiveHpNum, 1, this.hp);
			this.secondActiveHp = this.hps[this.secondActiveHpNum];
		}
		if(this.thirdActiveHp != null) {
			this.thirdActiveHp.add(a);
			temp = this.thirdActiveHp.getEquation();
			//offset = 40*thirdActiveHpNum - 40;
			this.hp = new Equation(temp,this.EQSIZE);
			//hp = new Equation(hp.getEquation(),x + width/2 - hp.getLength()/2,Battle.MAIN_WINDOW_Y2-(Battle.MAIN_WINDOW_Y2-Battle.MAIN_WINDOW_Y1)/8+offset,this.EQSIZE);
			this.hps.splice(this.thirdActiveHpNum, 1, this.hp);
			this.thirdActiveHp = this.hps[this.thirdActiveHpNum];
		}
	}
	
	derivative() {
		var temp = this.activeHp.derivative();
		//int offset = 40*activeHpNum - 40;
		this.hp = new Equation(temp,this.EQSIZE);
		//hp = new Equation(hp.getEquation(),x + width/2 - hp.getLength()/2,Battle.MAIN_WINDOW_Y2-(Battle.MAIN_WINDOW_Y2-Battle.MAIN_WINDOW_Y1)/8+offset,this.EQSIZE);
		this.hps.splice(this.activeHpNum, 1, this.hp);
		this.activeHp = this.hps[this.activeHpNum];
		if(this.secondActiveHp != null) {
			temp = this.secondActiveHp.derivative();
			//offset = 40*secondActiveHpNum - 40;
			this.hp = new Equation(temp,this.EQSIZE);
			//hp = new Equation(hp.getEquation(),x + width/2 - hp.getLength()/2,Battle.MAIN_WINDOW_Y2-(Battle.MAIN_WINDOW_Y2-Battle.MAIN_WINDOW_Y1)/8+offset,this.EQSIZE);
			this.hps.splice(this.secondActiveHpNum, 1, this.hp);
			this.secondActiveHp = this.hps[this.secondActiveHpNum];
		}
		if(this.thirdActiveHp != null) {
			temp = this.thirdActiveHp.derivative();
			//offset = 40*thirdActiveHpNum - 40;
			this.hp = new Equation(temp,this.EQSIZE);
			//hp = new Equation(hp.getEquation(),x + width/2 - hp.getLength()/2,Battle.MAIN_WINDOW_Y2-(Battle.MAIN_WINDOW_Y2-Battle.MAIN_WINDOW_Y1)/8+offset,this.EQSIZE);
			this.hps.splice(this.thirdActiveHpNum, 1, this.hp);
			this.thirdActiveHp = this.hps[this.thirdActiveHpNum];
		}

	}
	
	integrate(low, high) {
		var temp = this.activeHp.integrate(low,high);
		//int offset = 40*activeHpNum - 40;
		this.hp = new Equation(temp,this.EQSIZE);
		//hp = new Equation(hp.getEquation(),x + width/2 - hp.getLength()/2,Battle.MAIN_WINDOW_Y2-(Battle.MAIN_WINDOW_Y2-Battle.MAIN_WINDOW_Y1)/8+offset,this.EQSIZE);
		this.hps.splice(this.activeHpNum, 1, this.hp);
		this.activeHp = this.hps[this.activeHpNum];
		if(this.secondActiveHp != null) {
			temp = this.secondActiveHp.integrate(low,high);
			//offset = 40*secondActiveHpNum - 40;
			this.hp = new Equation(temp,this.EQSIZE);
			//hp = new Equation(hp.getEquation(),x + width/2 - hp.getLength()/2,Battle.MAIN_WINDOW_Y2-(Battle.MAIN_WINDOW_Y2-Battle.MAIN_WINDOW_Y1)/8+offset,this.EQSIZE);
			this.hps.splice(this.secondActiveHpNum, 1, this.hp);
			this.secondActiveHp = this.hps[this.secondActiveHpNum];
		}
		if(this.thirdActiveHp != null) {
			temp = this.thirdActiveHp.integrate(low,high);
			//offset = 40*thirdActiveHpNum - 40;
			this.hp = new Equation(temp,this.EQSIZE);
			//hp = new Equation(hp.getEquation(),x + width/2 - hp.getLength()/2,Battle.MAIN_WINDOW_Y2-(Battle.MAIN_WINDOW_Y2-Battle.MAIN_WINDOW_Y1)/8+offset,this.EQSIZE);
			this.hps.splice(this.thirdActiveHpNum, 1, this.hp);
			this.thirdActiveHp = this.hps[this.thirdActiveHpNum];
		}

	}
	
	isDead() {
		if(this.hps[0].isConstant() && this.hps[1].isConstant() && this.hps[2].isConstant()) {
			if(this.hps[0].evaluate(0) == 1000 && this.hps[1].evaluate(0) == 0 && this.hps[2].evaluate(0) == -1000) {
				return true;
			}
		}
		return false;
	}
	
	plugIn(xVal) {
		this.activeHp.plugIn(xVal);
		var temp = this.activeHp.getEquation();
		//int offset = 40*activeHpNum - 40;
		this.hp = new Equation(temp,this.EQSIZE);
		//hp = new Equation(hp.getEquation(),x + width/2 - hp.getLength()/2,Battle.MAIN_WINDOW_Y2-(Battle.MAIN_WINDOW_Y2-Battle.MAIN_WINDOW_Y1)/8+offset,this.EQSIZE);
		this.hps.splice(this.activeHpNum, 1, this.hp);
		this.activeHp = this.hps[this.activeHpNum];
		if(this.secondActiveHp != null) {
			this.secondActiveHp.plugIn(xVal);
			temp = this.secondActiveHp.getEquation();
			//offset = 40*secondActiveHpNum - 40;
			this.hp = new Equation(temp,this.EQSIZE);
			//hp = new Equation(hp.getEquation(),x + width/2 - hp.getLength()/2,Battle.MAIN_WINDOW_Y2-(Battle.MAIN_WINDOW_Y2-Battle.MAIN_WINDOW_Y1)/8+offset,this.EQSIZE);
			this.hps.splice(this.secondActiveHpNum, 1, this.hp);
			this.secondActiveHp = this.hps[this.secondActiveHpNum];
		}
		if(this.thirdActiveHp != null) {
			this.thirdActiveHp.plugIn(xVal);
			temp = this.thirdActiveHp.getEquation();
			//offset = 40*thirdActiveHpNum - 40;
			this.hp = new Equation(temp,this.EQSIZE);
			//hp = new Equation(hp.getEquation(),x + width/2 - hp.getLength()/2,Battle.MAIN_WINDOW_Y2-(Battle.MAIN_WINDOW_Y2-Battle.MAIN_WINDOW_Y1)/8+offset,this.EQSIZE);
			this.hps.splice(this.thirdActiveHpNum, 1, this.hp);
			this.thirdActiveHp = this.hps[this.thirdActiveHpNum];
		}
	}
	
	evaluateAnimate() {
		this.tic++;
		if(this.tic <= AnimationEvaluateAnimate.MAXTICS) {
			this.activeHp.evaluateAnimate();
			if(this.secondActiveHp != null) this.secondActiveHp.evaluateAnimate();
			if(this.thirdActiveHp != null) this.thirdActiveHp.evaluateAnimate();
		}
		if(this.tic == AnimationEvaluateAnimate.MAXTICS) {
			//int offset = 40*activeHpNum - 40;
			this.hp = new Equation(this.activeHp.createString(),this.EQSIZE);
			//hp = new Equation(hp.getEquation(),x + width/2 - hp.getLength()/2,Battle.MAIN_WINDOW_Y2-(Battle.MAIN_WINDOW_Y2-Battle.MAIN_WINDOW_Y1)/8+offset,this.EQSIZE);
			this.hps.splice(this.activeHpNum, 1, this.hp);
			this.activeHp = this.hps[this.activeHpNum];
			if(this.secondActiveHp != null) {
				//offset = 40*secondActiveHpNum - 40;
				this.hp = new Equation(this.secondActiveHp.createString(),this.EQSIZE);
				//hp = new Equation(hp.getEquation(),x + width/2 - hp.getLength()/2,Battle.MAIN_WINDOW_Y2-(Battle.MAIN_WINDOW_Y2-Battle.MAIN_WINDOW_Y1)/8+offset,this.EQSIZE);
				this.hps.splice(this.secondActiveHpNum, 1, this.hp);
				this.secondActiveHp = this.hps[this.secondActiveHpNum];
			}
			if(this.thirdActiveHp != null) {
				//offset = 40*thirdActiveHpNum - 40;
				this.hp = new Equation(this.thirdActiveHp.createString(),this.EQSIZE);
				//hp = new Equation(hp.getEquation(),x + width/2 - hp.getLength()/2,Battle.MAIN_WINDOW_Y2-(Battle.MAIN_WINDOW_Y2-Battle.MAIN_WINDOW_Y1)/8+offset,this.EQSIZE);
				this.hps.splice(this.thirdActiveHpNum, 1, this.hp);
				this.thirdActiveHp = this.hps[this.thirdActiveHpNum];
			}
			this.tic = 0;
		}
		
	}
	
	hasPlusC() {
		return false;
	}
	
	removeTerm() {
		//int offset = 40 * activeHpNum - 40;
		this.hp = new Equation(this.activeHp.removeTerm(),this.EQSIZE);
		//hp = new Equation(hp.getEquation(),x + width/2 - hp.getLength()/2,Battle.MAIN_WINDOW_Y2-(Battle.MAIN_WINDOW_Y2-Battle.MAIN_WINDOW_Y1)/8+offset,this.EQSIZE);
		this.hps.splice(this.activeHpNum, 1, this.hp);
		this.activeHp = this.hps[this.activeHpNum];
		if(this.secondActiveHp != null) {
			//offset = 40*secondActiveHpNum - 40;
			this.hp = new Equation(this.secondActiveHp.removeTerm(),this.EQSIZE);
			//hp = new Equation(hp.getEquation(),x + width/2 - hp.getLength()/2,Battle.MAIN_WINDOW_Y2-(Battle.MAIN_WINDOW_Y2-Battle.MAIN_WINDOW_Y1)/8+offset,this.EQSIZE);
			this.hps.splice(this.secondActiveHpNum, 1, this.hp);
			this.secondActiveHp = this.hps[this.secondActiveHpNum];
		}
		if(this.thirdActiveHp != null) {
			//offset = 40*thirdActiveHpNum - 40;
			this.hp = new Equation(this.thirdActiveHp.removeTerm(),this.EQSIZE);
			//hp = new Equation(hp.getEquation(),x + width/2 - hp.getLength()/2,Battle.MAIN_WINDOW_Y2-(Battle.MAIN_WINDOW_Y2-Battle.MAIN_WINDOW_Y1)/8+offset,this.EQSIZE);
			this.hps.splice(this.thirdActiveHpNum, 1, this.hp);
			this.thirdActiveHp = this.hps[this.thirdActiveHpNum];
		}
	}
	
	getHP() {
		return Math.floor(this.activeHp.evaluate(0));
	}
	
	getHP(num) {
		return Math.floor(this.hps[num].evaluate(0));
	}
	
	absoluteValue() {
		//int offset = 40 * activeHpNum - 40;
		this.hp = new Equation(this.activeHp.absoluteValue(),this.EQSIZE);
		//hp = new Equation(hp.getEquation(),x + width/2 - hp.getLength()/2,Battle.MAIN_WINDOW_Y2-(Battle.MAIN_WINDOW_Y2-Battle.MAIN_WINDOW_Y1)/8+offset,this.EQSIZE);
		this.hps.splice(this.activeHpNum, 1, this.hp);
		this.activeHp = this.hps[this.activeHpNum];
		if(this.secondActiveHp != null) {
			//offset = 40*secondActiveHpNum - 40;
			this.hp = new Equation(this.secondActiveHp.absoluteValue(),this.EQSIZE);
			//hp = new Equation(hp.getEquation(),x + width/2 - hp.getLength()/2,Battle.MAIN_WINDOW_Y2-(Battle.MAIN_WINDOW_Y2-Battle.MAIN_WINDOW_Y1)/8+offset,this.EQSIZE);
			this.hps.splice(this.secondActiveHpNum, 1, this.hp);
			this.secondActiveHp = this.hps[this.secondActiveHpNum];
		}
		if(this.thirdActiveHp != null) {
			//offset = 40*thirdActiveHpNum - 40;
			this.hp = new Equation(this.thirdActiveHp.absoluteValue(),this.EQSIZE);
			//hp = new Equation(hp.getEquation(),x + width/2 - hp.getLength()/2,Battle.MAIN_WINDOW_Y2-(Battle.MAIN_WINDOW_Y2-Battle.MAIN_WINDOW_Y1)/8+offset,this.EQSIZE);
			this.hps.splice(this.thirdActiveHpNum, 1, this.hp);
			this.thirdActiveHp = this.hps[this.thirdActiveHpNum];
		}
	}
	
	addDegree(add, deg) {
		//int offset = 40 * activeHpNum - 40;
		this.hp = new Equation(this.activeHp.addDegree(add,deg),this.EQSIZE);
		//hp = new Equation(hp.getEquation(),x + width/2 - hp.getLength()/2,Battle.MAIN_WINDOW_Y2-(Battle.MAIN_WINDOW_Y2-Battle.MAIN_WINDOW_Y1)/8+offset,this.EQSIZE);
		this.hps.splice(this.activeHpNum, 1, this.hp);
		this.activeHp = this.hps[this.activeHpNum];
		if(this.secondActiveHp != null) {
			//offset = 40*secondActiveHpNum - 40;
			this.hp = new Equation(this.secondActiveHp.addDegree(add,deg),this.EQSIZE);
			//hp = new Equation(hp.getEquation(),x + width/2 - hp.getLength()/2,Battle.MAIN_WINDOW_Y2-(Battle.MAIN_WINDOW_Y2-Battle.MAIN_WINDOW_Y1)/8+offset,this.EQSIZE);
			this.hps.splice(this.secondActiveHpNum, 1, this.hp);
			this.secondActiveHp = this.hps[this.secondActiveHpNum];
		}
		if(this.thirdActiveHp != null) {
			//offset = 40*thirdActiveHpNum - 40;
			this.hp = new Equation(this.thirdActiveHp.addDegree(add,deg),this.EQSIZE);
			//hp = new Equation(hp.getEquation(),x + width/2 - hp.getLength()/2,Battle.MAIN_WINDOW_Y2-(Battle.MAIN_WINDOW_Y2-Battle.MAIN_WINDOW_Y1)/8+offset,this.EQSIZE);
			this.hps.splice(this.thirdActiveHpNum, 1, this.hp);
			this.thirdActiveHp = this.hps[this.thirdActiveHpNum];
		}
	}
	
	changeActive(num) {
		this.activeHp = this.hps[num];
		this.activeHpNum = num;
		this.shields = [];
		for(var i = 0; i < this.shieldList[num].length; i++)
			this.addShield(this.shieldList[num][i]);
	}
	
	changeSecondActive(num) {
		if(num == -1)
			this.secondActiveHp = null;
		else {
			this.secondActiveHp = this.hps[num];
			for(var i = 0; i < this.shieldList[num].length; i++)
				this.addShield(this.shieldList[num][i]);
		}
		this.secondActiveHpNum = num;
	}
	
	changeThirdActive(num) {
		if(num == -1)
			this.thirdActiveHp = null;
		else {
			this.thirdActiveHp = this.hps[num];
			for(var i = 0; i < this.shieldList[num].length; i++)
				this.addShield(this.shieldList[num][i]);
		}
		this.thirdActiveHpNum = num;
	}
	
	getCycle() {
		this.cycle++;
		this.cycle = this.cycle % 7;
		return this.cycle;
	}
	
	getAttackAnimation(att, m, mul) {
		var current = super.getAttackAnimation(att,m,mul);
		if(current.hasNext()) return current;
		
		var temp1 = new AnimationMonsterFlash(this);
		var temp3 = new Animation("Open Message");
		var temp4 = new Animation("Pause",8);
		var temp8 = new Animation("Clear Message");
		var temp9 = new Animation("Check Death");
		var temp10 = new Animation("Open Options");
		
		if(att === "Change Active") {
			var temp2 = new Animation("Add Message",new WindowMessage("Change Focus",false));
			var temp5 = new AnimationRecalculate(m.getX(), m.getY(), m.getWidth(), m.getHeight());
			var temp6 = new Animation("Active Change");		
			temp1.setNext(temp2);temp2.setNext(temp3);temp3.setNext(temp4);temp4.setNext(temp5);temp5.setNext(temp6);temp6.setNext(temp8);temp8.setNext(temp9);temp9.setNext(temp10);
		}
		return temp1;
	}
}
