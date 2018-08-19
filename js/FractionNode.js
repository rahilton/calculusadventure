class FractionNode {
	
	constructor(s, xLoc, yLoc, si) {
		this.eq = s;
		//begin = b;
		//end = e;
		//fullEq = f;
		this.animateSpeed = 0;
		this.sign = "+";
		this.x = xLoc; this.y = yLoc; this.size = si;
		//System.out.println("FractionNode: " + eq);
		var eLoc = s.indexOf('/');
		
		var parenCount = 0;
		for(var i = 0; i < s.length; i++) {
			if(s.charAt(i) == '/' && parenCount == 0) {
				eLoc = i;
			}
			if(s.charAt(i) == '(') parenCount++;
			if(s.charAt(i) == ')') parenCount--;
		}
				
		var numerString = s.substring(0, eLoc);
		var denomString = s.substring(eLoc + 1, s.length);
		this.numer = new MultiNode(this.removeParen(numerString), this.x, this.y - Equation.getYSize(this.size)/2 - this.size/8,si);
		this.denom = new MultiNode(this.removeParen(denomString), this.x, this.y + Equation.getYSize(this.size)/2 + this.size/8,si);
		if(this.numer.getLength() > this.denom.getLength()) {
			this.denom = new MultiNode(this.removeParen(denomString), this.x + (this.numer.getLength() - this.denom.getLength())/2, this.y + Equation.getYSize(this.size)/2 + this.size/8,si);
		}
		else if(this.numer.getLength() < this.denom.getLength()) {
			this.numer = new MultiNode(this.removeParen(numerString), this.x + (this.denom.getLength() - this.numer.getLength())/2, this.y - Equation.getYSize(this.size)/2 - this.size/8,si);
		}
		this.length = Math.max(this.numer.getLength(), this.denom.getLength());
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
	
	plugIn(x) {
		this.numer.plugIn(x);
		this.denom.plugIn(x);
	}
	
	getLength() {
		return this.length;
	}
	
	getHeight() {
		return this.numer.getHeight() + this.denom.getHeight() + Equation.getYSize(this.size)/8;
	}
	
	printNodes(g, xOff, yOff) {
		this.numer.printNodes(g, xOff, yOff);
		g.fillRect(this.x - Equation.getXSize(this.size)/8 + xOff, this.y - Equation.getYSize(this.size)/3 + yOff, this.length + Equation.getXSize(this.size)/8, Equation.getYSize(this.size)/8);
		this.denom.printNodes(g, xOff, yOff);
	}
	
	toString() {
		return "Fraction Node: " + this.eq;
	}
	
	isEvaluated() {
		return this.evaluated;
	}
	
	isEvaluating() {
		return this.evaluating;
	}
	
	evaluate(x) {
		if( Math.floor(this.denom.evaluate(x)) == 0 && Math.floor(this.numer.evaluate(x)) != 0) {
			return 999999.0;
		}
		return this.numer.evaluate(x)/this.denom.evaluate(x);
	}
	
	createString() {
		return "(" + this.numer.createString() + ")/(" + this.denom.createString() + ")";
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
	
	derivative() {
		if(this.denom.isConstant()) {
			if(this.numer.isConstant())
				return "0";
			return "(" + this.numer.derivative() + ")/" + this.denom.createString();
		}
		var newExpo = "^2";
		var numerEq = "(" + this.numer.createString() + ")";
		var denomEq = "(" + this.denom.createString() + ")";
		var numerDer = "(" + this.numer.derivative() + ")";
		var denomDer = "(" + this.denom.derivative() + ")";
		if(this.denom.isContentNode()) denomEq = this.denom.createString();
		if(this.numer.derivative() === "1") {numerDer = ""; denomEq = this.denom.createString();}
		if(this.denom.derivative() === "1") {denomDer = ""; numerEq = this.numer.createString();}
		if(this.denom.isExponentNode()) {
			var temp = new ExponentNode(this.denom.createString(),0,0,this.size);
			if (temp.isExponentConstant()) {
				newExpo = "^" + (parseInt(temp.getExponent(),10) * 2).toString();
				denomEq = temp.getBase();
			}
		}
		if(this.numer.derivative() === "0") return "(-" + numerEq + denomDer + ")/(" +denomEq+ newExpo + ")";
		
		
		return "(" + denomEq + numerDer + "-" + numerEq + denomDer + ")/(" +denomEq+ newExpo + ")";
	}
	
	evaluateAnimate() {
		
		this.evaluating = true;
		if(!this.numer.isEvaluated()) {
			this.evaluating = false;
			this.numer.evaluateAnimate();
		}
		
		if(!this.denom.isEvaluated()) {
			this.evaluating = false;
			this.denom.evaluateAnimate();
		}
		
		if(this.evaluating) {
			this.animateSpeed++;
			this.numer.changeX(Math.min(this.animateSpeed, this.numer.getX()-this.x) * -1);
			this.numer.changeY(Math.min(this.animateSpeed, this.y-this.numer.getY()));
			this.denom.changeX(Math.min(this.animateSpeed, this.denom.getX()-this.x) * -1);
			this.denom.changeY(Math.min(this.animateSpeed, this.denom.getY()-this.y) * -1);
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
		if(this.denom.isConstant() && this.numer.isPolynomialForm()) return true;
		return false;
	}
	
	getDegree() {
		return this.numer.getDegree();
	}
	
	addDegree(add, deg) {
		if(this.numer.getDegree() == deg) {
			return "(" + this.numer.addDegree(Math.floor(add*this.denom.evaluate(0)), deg) + ")/(" + this.denom.createString() + ")";
		}
		return this.createString();
	}
}
