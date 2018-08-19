class Skill {
	
	
	constructor(n, d, c, tc, tt, pass, imm, iconNum, levReq) {
		if(typeof n === "object") {
			this.cost = n.cost;
			this.description = n.description;
			this.iconNumber = n.iconNumber;
			this.immunity = n.immunity;
			this.learned = n.learned;
			this.level = n.level;
			this.levelingRequirements = n.levelingRequirements;
			this.name = n.name;
			this.passive = n.passive;
			this.training = n.training;
			this.trainingCost = n.trainingCost;
			this.trainingTotal = n.trainingTotal;
			return;
		}
	    if(typeof pass === "object") {
	        levReq = pass;
	        pass = false;
	        imm = "";
	        iconNum = -1;
	    }
	    else if(typeof imm === "object") {
	        levReq = imm;
	        imm = "";
	        iconNum = -1;
	    }
		this.name = n;
		this.description = d;
		this.cost = c;
		this.learned = false;
		this.training = 0;
		this.trainingCost = tc;
		this.trainingTotal = tt;
		this.level = 0  ;
		//Collections.sort(values);
		this.passive = pass;
		this.immunity = imm;
		this.iconNumber = iconNum;
		this.levelingRequirements = levReq;
	}
	
	getStatString() {
		var statSum = this.cost + this.trainingTotal + this.trainingCost + this.training + this.level + this.iconNumber;
		var statString = this.name + this.description + this.immunity + this.learned.toString() + this.passive.toString() + statSum.toString();
		return statString;
	}
	
	getName() {
		return this.name;
	}
	
	isPassive() {
		return this.passive;
	}
	
	getImmunity() {
		return this.immunity;
	}
	
	getIconNumber() {
		return this.iconNumber;
	}
	
	getDescription() {
		return this.description;
	}
	
	getUseCost() {
		return this.cost;
	}
	
	canUse(p) {
		if(p.getSp() >= this.getUseCost()) {
			return true;
		}
		return false;
	}
	
	changeCost(num) {
		this.cost += num;
	}
	
	getTrainingCost() {
		return this.trainingCost;
	}
	
	getTraining() {
		return this.training;
	}
	
	train() {
		if(this.learned) {
			//System.out.println("Leveling the spell up");
			this.levelUp();
		}
		else {
			this.training++;
			if(this.training == this.trainingTotal) {this.learned = true; this.levelUp();}
		}
	}
	
	getTrainingTotal() {
		return this.trainingTotal;
	}
	
	
	isLearned() {
		return this.learned;
	}
	
	levelUp() {
		this.cost--;
		this.level++;
	}
	
	getLevel() {
		return this.level;
	}
	/*
	public ArrayList<Integer> getValidValues() {
		return values;
	}
	
	public void addValidValue(int num) {
		values.add(num);
		Collections.sort(values);
	}*/
	
	getLevelRequirement(spellLevel) {
		if(spellLevel > this.levelingRequirements.length)
			return -1;
		return this.levelingRequirements[spellLevel-1];
	}
	

	
	
}

Skill.getTrainingProgress = function(sp, xloc, yloc) {
	var temp = document.createElement('canvas');
	temp.width = (xloc + 500).toString();
	temp.height = (yloc + 200).toString();
	var g = temp.getContext("2d");
	g.lineWidth =  3;
	var ratio = 1.2; //width 56 height 56 ratio 2
	var xOffset = xloc;
	var yOffset = yloc;
	if(sp.isLearned()) {
		g.font = "bold " + GameWindow.DEFAULT_WINDOW_FONT_SIZE + "px Courier New";
		g.fillStyle= "black";
		g.fillText("Level " + sp.getLevel(), xloc+2, yloc+2+Equation.getYSize(GameWindow.DEFAULT_WINDOW_FONT_SIZE)-16);
		g.fillStyle = "white";
		g.fillText("Level " + sp.getLevel(), xloc, yloc+Equation.getYSize(GameWindow.DEFAULT_WINDOW_FONT_SIZE)-16);
	}
	else {
		yOffset += 10;
		for(var i = 0; i < sp.getTrainingTotal(); i++) {
			xOffset = xloc + Math.floor(33* ratio) * i;
			//Polygon star = new Polygon(new int[] {(int) (0*ratio+xOffset),(int)(10*ratio+xOffset),(int)(13*ratio+xOffset),(int)(18*ratio+xOffset),(int)(28*ratio+xOffset),(int)(21*ratio+xOffset),(int)(24*ratio+xOffset),(int)(13*ratio+xOffset),(int)(4*ratio+xOffset),(int)(7*ratio+xOffset)}, 
			//						   new int[] {(int)(11*ratio+yOffset),(int)(10*ratio+yOffset),(int)(0*ratio+yOffset),(int)(10*ratio+yOffset),(int)(11*ratio+yOffset),(int)(18*ratio+yOffset),(int)(28*ratio+yOffset),(int)(23*ratio+yOffset),(int)(28*ratio+yOffset),(int)(18*ratio+yOffset)},10);
			g.beginPath();
			g.moveTo(Math.floor(0*ratio+xOffset), Math.floor(11*ratio+yOffset));
			g.lineTo(Math.floor(10*ratio+xOffset), Math.floor(10*ratio+yOffset));
			g.lineTo(Math.floor(13*ratio+xOffset), Math.floor(0*ratio+yOffset));
			g.lineTo(Math.floor(18*ratio+xOffset), Math.floor(10*ratio+yOffset));
			g.lineTo(Math.floor(28*ratio+xOffset), Math.floor(11*ratio+yOffset));
			g.lineTo(Math.floor(21*ratio+xOffset), Math.floor(18*ratio+yOffset));
			g.lineTo(Math.floor(24*ratio+xOffset), Math.floor(28*ratio+yOffset));
			g.lineTo(Math.floor(13*ratio+xOffset), Math.floor(23*ratio+yOffset));
			g.lineTo(Math.floor(4*ratio+xOffset), Math.floor(28*ratio+yOffset));
			g.lineTo(Math.floor(7*ratio+xOffset), Math.floor(18*ratio+yOffset));
			g.lineTo(Math.floor(0*ratio+xOffset), Math.floor(11*ratio+yOffset));
			
			if(sp.getTraining() > i) g.fillStyle = "yellow"; else g.fillStyle = "black";
			g.fill();
			g.strokeStyle = "white";
			g.stroke();
		}
	}
	return temp;
};

Skill.getSkill = function(itemNum) {
		if(itemNum == 0)
			return new Skill("Plug In 15","Plugs in the value specified. Values must be trained.",10,300,5, [2,3,5,7,8,10,12,14,16]);
		if(itemNum == 1)
			return new Skill("Plug In 14","Plugs in the value specified. Values must be trained.",10,300,5, [2,3,5,7,8,10,12,14,16]);
		if(itemNum == 2)
			return new Skill("Plug In 13","Plugs in the value specified. Values must be trained.",10,300,5, [2,3,5,7,8,10,12,14,16]);
		if(itemNum == 3)
			return new Skill("Plug In 12","Plugs in the value specified. Values must be trained.",10,300,5, [2,3,5,7,8,10,12,14,16]);
		if(itemNum == 4)
			return new Skill("Plug In 11","Plugs in the value specified. Values must be trained.",10,750,5, [2,3,5,7,8,10,12,14,16]);
		if(itemNum == 5)
			return new Skill("Plug In 10","Plugs in the value specified. Values must be trained.",10,750,5, [2,3,5,7,8,10,12,14,16]);
		if(itemNum == 6)
			return new Skill("Plug In 9","Plugs in the value specified. Values must be trained.",10,750,5, [2,3,5,7,8,10,12,14,16]);
		if(itemNum == 7)
			return new Skill("Plug In 8","Plugs in the value specified. Values must be trained.",10,1000,5, [2,3,5,7,8,10,12,14,16]);
		if(itemNum == 8)
			return new Skill("Plug In 7","Plugs in the value specified. Values must be trained.",10,1000,5, [2,3,5,7,8,10,12,14,16]);
		if(itemNum == 9)
			return new Skill("Plug In 6","Plugs in the value specified. Values must be trained.",10,1000,5, [2,3,5,7,8,10,12,14,16]);
		if(itemNum == 10)
			return new Skill("Plug In 5","Plugs in the value specified. Values must be trained.",10,1600,5, [2,3,5,7,8,10,12,14,16]);
		if(itemNum == 11)
			return new Skill("Plug In 4","Plugs in the value specified. Values must be trained.",10,1600,5, [2,3,5,7,8,10,12,14,16]);
		if(itemNum == 12)
			return new Skill("Plug In 3","Plugs in the value specified. Values must be trained.",10,1600,5, [2,3,5,7,8,10,12,14,16]);
		if(itemNum == 13)
			return new Skill("Plug In 2","Plugs in the value specified. Values must be trained.",10,3000,5, [2,3,5,7,8,10,12,14,16]);
		if(itemNum == 14)
			return new Skill("Plug In 1","Plugs in the value specified. Values must be trained.",10,3000,5, [2,3,5,7,8,10,12,14,16]);
		if(itemNum == 15)
			return new Skill("Plug In 0","Plugs in the value specified. Values must be trained.",10,3000,5, [2,3,5,7,8,10,12,14,16]);
		if(itemNum == 16)
			return new Skill("Abs. Value", "Takes the absolute value of a monsters HP (for undead monsters.)",9,1000,2, [8,8,9,9,10,10,11,11,12]);
		if(itemNum == 17)
			return new Skill("Subtct. 10","Plugs in the value specified. Values must be trained.",6,3000,3, [8,9,10,11,12]);
		if(itemNum == 18)
			return new Skill("Subtct. 9","Plugs in the value specified. Values must be trained.",6,3000,3, [8,9,10,11,12]);
		if(itemNum == 19)
			return new Skill("Subtct. 8","Plugs in the value specified. Values must be trained.",6,1600,3, [8,9,10,11,12]);
		if(itemNum == 20)
			return new Skill("Subtct. 7","Plugs in the value specified. Values must be trained.",6,1600,3, [8,9,10,11,12]);
		if(itemNum == 21)
			return new Skill("Subtct. 6","Plugs in the value specified. Values must be trained.",6,1000,3, [8,9,10,11,12]);
		if(itemNum == 22)
			return new Skill("Subtct. 5","Plugs in the value specified. Values must be trained.",6,3000,3, [8,9,10,11,12]);
		if(itemNum == 23)
			return new Skill("Subtct. 4","Plugs in the value specified. Values must be trained.",6,1000,3, [8,9,10,11,12]);
		if(itemNum == 24)
			return new Skill("Subtct. 3","Plugs in the value specified. Values must be trained.",6,1600,3, [8,9,10,11,12]);
		if(itemNum == 25)
			return new Skill("Subtct. 2","Plugs in the value specified. Values must be trained.",6,3000,3, [8,9,10,11,12]);
		if(itemNum == 26)
			return new Skill("Subtct. 1","Plugs in the value specified. Values must be trained.",6,1000,3, [8,9,10,11,12]);
		if(itemNum == 27) //charcode 0178 ²³   charcode 8308 ⁴⁵⁶⁷⁸⁹
			return new Skill("Term: -x","Adds the specified polynomial. Values must be trained",10,1600,5, [12,13,14,15,16,17,18,19,19]);
		if(itemNum == 28) 
			return new Skill("Term: -2x","Adds the specified polynomial. Values must be trained.",10,3000,5, [12,13,14,15,16,17,18,19,19]);
		if(itemNum == 29) 
			return new Skill("Term: +x","Adds the specified polynomial. Values must be trained.",10,1600,5, [12,13,14,15,16,17,18,19,19]);
		if(itemNum == 30) 
			return new Skill("Term: +2x","Adds the specified polynomial. Values must be trained.",10,3000,5, [12,13,14,15,16,17,18,19,19]);
		if(itemNum == 31) 
			return new Skill("Term: -x²","Adds the specified polynomial. Values must be trained.",10,1600,5, [12,13,14,15,16,17,18,19,19]);
		if(itemNum == 32) 
			return new Skill("Term: -2x²","Adds the specified polynomial. Values must be trained.",10,3000,5, [12,13,14,15,16,17,18,19,19]);
		if(itemNum == 33) 
			return new Skill("Term: +x²","Adds the specified polynomial. Values must be trained.",10,1600,5, [12,13,14,15,16,17,18,19,19]);
		if(itemNum == 34) 
			return new Skill("Term: +2x²","Adds the specified polynomial. Values must be trained.",10,3000,5, [12,13,14,15,16,17,18,19,19]);
		if(itemNum == 35)
			return new Skill("Know D. Shield", "Lets you know if a monster is immune to a derivative. (Passive)", 1,1000,3,true,"Derivative",0, [1]);
		if(itemNum == 36)
			return new Skill("Know D. D. Sh.", "Lets you know if a monster is immune to double derivative. (Passive)", 1,1600,3,true,"Double Derivative",1,[1]);
		if(itemNum == 37)
			return new Skill("Know √ Shield", "Lets you know if a monster is immune to square root. (Passive)", 1,1600,3,true,"Square Root",3, [1]);
		if(itemNum == 38)
			return new Skill("Know Ln Shield", "Lets you know if a monster is immune to natural log. (Passive)", 1,3000,3,true,"Natural Log",4,[1]);		                   
		if(itemNum == 39)
			return new Skill("Know PI Shield", "Lets you know what values of Plug In the monster is immune to. (Passive)", 1,1000, 3,true,"Plug In",31,[1]);
		if(itemNum == 40)
			return new Skill("Know Sub Shield", "Lets you know what values of Subtract the monster is immune to. (Passive)", 1,3000, 3,true,"Subtct.",42,[1]);		                   
		if(itemNum == 41)
			return new Skill("Know Tm Shield", "Lets you know what polynomial values cannot be applied. (Passive)", 1,3000, 3,true,"Term:",48,[1]);
		if(itemNum == 42)
			return new Skill("Know RT Shield", "Lets you know if a monster is immune to remove term. (Passive)", 1,3000, 3,true,"Remove Term",2,[1]);
		if(itemNum == 43)
			return new Skill("Know /2 Shield", "Lets you know if a monster is immune to divide by 2. (Passive)", 1,1000, 3,true,"Div. By 2",5,[1]);		                   
		if(itemNum == 44)
			return new Skill("Know Undead", "Lets you know if a monster is undead (Passive)", 1,1600, 3,true,"Undead",9,[1]);		                   
		if(itemNum == 45)
			return new Skill("Iron Will", "During battle, you recover 1 SP every turn. (Passive)", 1,1600, 5,true,[15]);
		if(itemNum == 46)
			return new Skill("Def. Buff.", "Use to temporarily increase your defense.", 20,1000, 5,[7,7,8,9,10,11,12,14,15]);		                   
		if(itemNum == 47)
			return new Skill("Att. Boost", "Use to temporarily increase your attack", 20,1000, 5,[7,7,8,9,10,11,12,14,15]);		                   
		
		
		return new Skill("Nothing","This skill does nothing.",1,0,0,[1,1,1,2,2,2,3,3,3]);
	};

	