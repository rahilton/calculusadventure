class Spell {
	
	constructor(n, d, c, tc, tt, levReq) {
		if(typeof n === "object") {
			this.cost = n.cost;
			this.description = n.description;
			this.learned = n.learned;
			this.level = n.level;
			this.levelingRequirements = n.levelingRequirements;
			this.name = n.name;
			this.training = n.training;
			this.trainingCost = n.trainingCost;
			this.trainingTotal = n.trainingTotal;
			return;
		}
		this.name = n;
		this.description = d;
		this.cost = c;
		//learned = false;
		this.learned = false;
		this.training = 0;
		this.trainingCost = tc;
		this.trainingTotal = tt;
		this.level = 0;
		this.levelingRequirements = levReq;
	}
	
	getStatString() {
		var statSum = this.cost + this.trainingTotal + this.trainingCost + this.training + this.level;
		var statString = this.name + this.description + (this.learned).toString()  + (statSum).toString();
		return statString;
	}
	
	getName() {
		return this.name;
	}
	
	getDescription() {
		return this.description;
	}
	
	getUseCost() {
		return this.cost;
	}
	
	canUse(p) {
		if(p.getMp() >= this.getUseCost()) {
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
	
	static getTrainingProgress(sp, xloc, yloc) {
		var temp = document.createElement('canvas');
		temp.width = (xloc + 500).toString();
		temp.height = (yloc + 200).toString();
		var g = temp.getContext("2d");
	    g.lineWidth =  "3";
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
				// Polygon star = new Polygon(new int[] {(int) (0*ratio+xOffset),(int)(10*ratio+xOffset),(int)(13*ratio+xOffset),(int)(18*ratio+xOffset),(int)(28*ratio+xOffset),(int)(21*ratio+xOffset),(int)(24*ratio+xOffset),(int)(13*ratio+xOffset),(int)(4*ratio+xOffset),(int)(7*ratio+xOffset)}, 
				// 						   new int[] {(int)(11*ratio+yOffset),(int)(10*ratio+yOffset),(int)(0*ratio+yOffset),(int)(10*ratio+yOffset),(int)(11*ratio+yOffset),(int)(18*ratio+yOffset),(int)(28*ratio+yOffset),(int)(23*ratio+yOffset),(int)(28*ratio+yOffset),(int)(18*ratio+yOffset)},10);
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
	
	getLevelRequirement(spellLevel) {
		if(spellLevel > this.levelingRequirements.length)
			return -1;
		return this.levelingRequirements[spellLevel-1];
	}
	
	static getSpell(itemNum) {
		if(itemNum == 0)
			return new Spell("Derivative","Takes the derivative of the monsters hit points.",11,1000,5, [8,8,9,10,11,12,14,15,16,18]);
		if(itemNum == 1)
			return new Spell("Heal", "Restores a small amount of HP.", 11,300, 3, [4,6,8,10,12,13,14,16,18,19]);
		if(itemNum == 2)
			return new Spell("Eq. Shield", "Creates an equation shield to protect you HP.",15, 1600,4, [14,16,17,18]);
		if(itemNum == 3)
			return new Spell("Dbl. Deriv.", "Takes the derivative of the monsters hit points twice.",14, 1600,5, [13,14,14,15,16,16,17,18]);
		if(itemNum == 4)
			return new Spell("SP Heal", "Restores a few of your SP points.",10, 1000,4, [7,7,8,8,9,9]);
		if(itemNum == 5)
			return new Spell("Div. By 2", "Divide the monsters HP by 2. Only works when HP is constant.",10, 750,4, [6,7,8,8,9,9,10]);
		if(itemNum == 6)
			return new Spell("Sq. Root", "Takes the sqaure root of the monster HP. Only works when HP is constant.",10, 1000,4, [8,9,10,10,11,11,12]);
		if(itemNum == 7)
			return new Spell("Nat. Log", "Takes the natural log of the monster HP. Only works when HP is constant.",10, 1600,4, [12,13,14,14,15,15,16]);
		if(itemNum == 8)
			return new Spell("Rem. Term", "Removes the first term of the HP. Does nothing if there is only one term.",16, 1600,4, [15,15,16,16,17,17,18,18]);
		if(itemNum == 9)
			return new Spell("Low. Lim. 0", "The lower limit of integration. Needs an upper limit to use.",10, 3000,3, [16,16,17,17,18,18,19,19]);
		if(itemNum == 10)
			return new Spell("Low. Lim. 1", "The lower limit of integration. Needs an upper limit to use.",10, 3000,3, [16,16,17,17,18,18,19,19]);
		if(itemNum == 11)
			return new Spell("Low. Lim. 2", "The lower limit of integration. Needs an upper limit to use.",10, 3000,3, [16,16,17,17,18,18,19,19]);
		if(itemNum == 12)
			return new Spell("Low. Lim. 3", "The lower limit of integration. Needs an upper limit to use.",10, 3000,3, [16,16,17,17,18,18,19,19]);
		if(itemNum == 13)
			return new Spell("Low. Lim. 4", "The lower limit of integration. Needs an upper limit to use.",10, 3000,3, [16,16,17,17,18,18,19,19]);
		if(itemNum == 14)
			return new Spell("Upp. Lim. 5", "The upper limit of integration. Needs a lower limit to use.",10, 3000,3, [16,16,17,17,18,18,19,19]);
		if(itemNum == 15)
			return new Spell("Upp. Lim. 6", "The upper limit of integration. Needs a lower limit to use.",10, 3000,3, [16,16,17,17,18,18,19,19]);
		if(itemNum == 16)
			return new Spell("Upp. Lim. 7", "The upper limit of integration. Needs a lower limit to use.",10, 3000,3, [16,16,17,17,18,18,19,19]);
		if(itemNum == 17)
			return new Spell("Upp. Lim. 8", "The upper limit of integration. Needs a lower limit to use.",10, 3000,3, [16,16,17,17,18,18,19,19]);
		if(itemNum == 18)
			return new Spell("Upp. Lim. 9", "The upper limit of integration. Needs a lower limit to use.",10, 3000,3, [16,16,17,17,18,18,19,19]);
		
		
		return new Spell("Nothing","This spell does nothing",1,0,0,[0]);
	}

}
