class ExponentNode {
	
	constructor(s, xLoc, yLoc, si) {
		
		this.eq = s;
		this.x = xLoc; this.y = yLoc; this.size = si;
		this.animateSpeed = 0;
		this.sign = "+";
		this.frontNeg = false;
		//System.out.println("ExponentNode: " + eq);
		var eLoc = s.indexOf('^');
		var parenCount = 0;
		if(s.charAt(0) == '-') {
			this.frontNeg = true;
		}
		
		for(var i = 0; i < s.length; i++) {
			if(s.charAt(i) == '^' && parenCount == 0) {
				eLoc = i;
			}
			if(s.charAt(i) == '(') parenCount++;
			if(s.charAt(i) == ')') parenCount--;
		}
		
		if(s.substring(0,eLoc) === this.removeParen(s.substring(0,eLoc))) {
			this.baseParen = false;
		}
		else this.baseParen = true;
		if(s.substring(eLoc + 1,s.length) === this.removeParen(s.substring(eLoc + 1,s.length))) {
			this.expoParen = false;
		}
		else this.expoParen = true;
		
		//System.out.println(eq + " baseParen=" + baseParen + " expoParen=" + expoParen);
		if(this.baseParen) {
			this.base = new MultiNode(s.substring(1,eLoc-1), this.x + Equation.getXSize(this.size), this.y, this.size);
			this.length = this.base.getLength() + 2 * Equation.getXSize(this.size);
		}
		else if (this.frontNeg) {
			this.base = new MultiNode(s.substring(1,eLoc), this.x + Equation.getXSize(this.size), this.y, this.size);
			this.length = this.base.getLength() + Equation.getXSize(this.size);
		}
		else {
			this.base = new MultiNode(s.substring(0,eLoc), this.x, this.y, this.size);
			this.length = this.base.getLength();
		}
		
		if(this.expoParen) {
			this.exponent = new MultiNode(s.substring(eLoc+2,s.length-1), this.x + this.length /*+ Equation.getXSize(size/2)*/, this.y- Equation.getYSize(this.size)/2, this.size/2);
			this.length += this.exponent.getLength(); //+ 2 * Equation.getXSize(size/2);
		}
		else {
			this.exponent = new MultiNode(s.substring(eLoc+1,s.length),this.x + this.length,this.y - Equation.getYSize(this.size)/2,this.size/2);
			this.length += this.exponent.getLength();
		}
		
		if(this.base.isTrigNode() && this.exponent.isConstant()) {
			this.baseParen = false;
			this.base = new MultiNode(s.substring(1,eLoc-1), this.x, this.y, this.size);
			this.length = this.base.getLength();
			if(this.expoParen)
				this.exponent = new MultiNode(s.substring(eLoc+2,s.length-1),this.x + Equation.getXSize(this.size)*3,this.y - Equation.getYSize(this.size)/2-this.size/8,this.size/2);
			else
				this.exponent = new MultiNode(s.substring(eLoc+1,s.length),this.x + Equation.getXSize(this.size)*3,this.y - Equation.getYSize(this.size)/2-this.size/8,this.size/2);
		}
		
		
	}
	
	removeParen(s) {
		if(s.charAt(0) == '(' && s.charAt(s.length-1) == ')') {
			var paraCount = 0;
			var remove = false;
			for(var i = 0; i < s.length;i++) {
				if(s.charAt(i) == '(') paraCount++;
				if(s.charAt(i) == ')') paraCount--;
				if(paraCount == 0) {
					if(i == s.length-1) remove = true;
					break;
				}
			}
			if(remove) s = s.substring(1,s.length-1);
		}
		return s;
	}
	
	toString() {
		return "Exponent Node: " + this.eq;
	}
	
	printNodes(g, xOff, yOff) {
		if(this.baseParen) {
			g.font = "bold " + this.size + "px Courier New";
			g.fillText("(", this.x + xOff, this.y + yOff);
			g.fillText(")", this.x + this.base.getLength() + Equation.getXSize(this.size) + xOff, this.y + yOff);
		}
		if(this.frontNeg) {
			g.font = "bold " + this.size + "px Courier New";
			g.drawString("-", this.x + xOff, this.y + yOff);
		}
		this.base.printNodes(g, xOff, yOff);
		/*if(expoParen && baseParen) {
			g.setFont(new Font("Monospaced",Font.BOLD,size/2));
			g.drawString("(", x + base.getLength() + 2*Equation.getXSize(size), y - Equation.getYSize(size)/2);
			g.drawString(")", x + base.getLength() + exponent.getLength() + 2*Equation.getXSize(size) + Equation.getXSize(size/2), y - Equation.getYSize(size)/2);
		}
		if(expoParen && !baseParen) {
			g.setFont(new Font("Monospaced",Font.BOLD,size/2));
			g.drawString("(", x + base.getLength(), y - Equation.getYSize(size)/2);
			g.drawString(")", x + base.getLength() + exponent.getLength() + Equation.getXSize(size/2), y - Equation.getYSize(size)/2);
		}*/
		this.exponent.printNodes(g, xOff, yOff);
	}
	
	getBase() {
		if(this.baseParen) {
			return "(" + this.base.createString() + ")";
		}
		return this.base.createString();
	}
	
	getExponent() {
		return this.exponent.createString();
	}
	
	isExponentConstant() {
		return this.exponent.isConstant();
	}
	
	derivative() {
		if(this.base.isConstant() && this.exponent.isConstant())
			return "0";
		if(this.exponent.isConstant()) {
			var frontNum = this.exponent.getConstant();
			var frontString;
			var expoString;
			var chain = new MultiNode(this.base.derivative(),0,0,this.size);
			if(chain.isConstant()) {
				 frontNum *= chain.getConstant();
			}
			if(frontNum == 1)
				frontString = "";
			else
				frontString = frontNum.toString();
			if(this.exponent.getConstant()-1 == 1) {
				expoString = "";
			
			}
			else
				expoString = "^" + (this.exponent.getConstant()-1).toString();
			if(this.baseParen) 
				return frontString + "(" + this.base.createString() + ")" + expoString;
			else 
				return frontString + this.base.createString() + expoString;
		}
		return "Cannot yet handle if the exponent is not a constant";
	}
	
	plugIn(x) {
		this.exponent.plugIn(x);
		this.base.plugIn(x);
	}
	
	getLength() {
		return this.length;
	}
	
	isEvaluated() {
		return this.evaluated;
	}
	
	isEvaluating() {
		return this.evaluating;
	}
	
	getHeight() {
		return this.base.getHeight() + this.exponent.getHeight(); 
	}
	
	evaluate(x) {
		return Math.pow(this.base.evaluate(x), this.exponent.evaluate(x));
	}
	
	createString() {
		var neg = "";					// neg is a reference to if the first things in the equation is a negtive but the rest is an exponent node.
		if(this.frontNeg) neg = "-";
		if(this.base.isContentNode() && !this.base.isNegative()) {
			return neg + this.base.createString() + "^(" + this.exponent.createString() + ")";
		}
		else return "(" + this.base.createString() + ")^(" + this.exponent.createString() + ")";
	}
	
	getX() {
		return this.x;
	}
	
	getY() {
		return this.y;
	}
	
	changeX(c) {
		this.x += c;
	}
	
	changeY(c) {
		this.y += c;
	}
	
	evaluateAnimate() {
		
		this.evaluating = true;
		if(!this.base.isEvaluated()) {
			this.evaluating = false;
			this.base.evaluateAnimate();
		}
		
		if(!this.exponent.isEvaluated()) {
			this.evaluating = false;
			this.exponent.evaluateAnimate();
		}
		
		if(this.evaluating) {
			this.animateSpeed++;
			this.exponent.changeX(Math.min(this.animateSpeed, this.exponent.getX()-this.x) * -1);
			this.exponent.changeY(Math.min(this.animateSpeed, this.y-this.exponent.getY()));
			if(this.animateSpeed == AnimationEvaluateAnimate.MAXTICS) {
				this.evaluated = true;
				this.evaluating = false;
			}
		}
	}
	
	setSign(s) {
		this.sign = s;
	}
	
	isPolynomialForm() {
		if(this.base.isContentNode() && this.base.createString() === "x" && this.exponent.isConstant()) return true;
		return false;
	}
	
	getDegree() {
		return Math.floor(this.exponent.evaluate(0));
	}
	
	addDegree(add, deg) {
		//System.out.println("Add Degree Exponent " + add + " " + deg + " " + sign);
		if(this.getDegree() == deg) {
			if(this.sign === "-") add *= -1;
			var newNum = 1+add;
			if(newNum == 0) return "0";
			if(newNum == 1) return this.createString();
			//if(newNum == -1) System.out.println("This is createString for newNum = -1 " + createString());
			if(newNum == -1) return "-" + this.createString();
			return newNum.toString() + this.createString();
		}
		return this.createString();
	}

}
