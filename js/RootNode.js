class RootNode {
	
	constructor(s, xLoc, yLoc, si) {
		this.eq = s;
		this.sign = "+";
		this.x = xLoc; this.y = yLoc; this.size = si;
		//System.out.println("RootNode: " + eq);
		this.contents = new MultiNode(s.substring(2,s.length-1),this.x+1*Equation.getXSize(si),this.y,si);
		this.length = Equation.getXSize(this.size) * 1 + this.contents.getLength();
	}
	
	derivative() {
		return "TBA";
	}
	
	/*
	private String removeParen(String s) {
		if(s.charAt(0) == '(' && s.charAt(s.length()-1) == ')') {
			int paraCount = 0;
			boolean remove = false;
			for(int i = 0; i < s.length();i++) {
				if(s.charAt(i) == '(') paraCount++;
				if(s.charAt(i) == ')') paraCount--;
				if(paraCount == 0) {
					if(i == s.length()-1) remove = true;
					break;
				}
			}
			if(remove) s = s.substring(1,s.length()-1);
		}
		return s;
	}
	*/
	
	toString() {
		return "Root Node: " + this.eq;
	}
	
	printNodes(g, xOff, yOff) {
		g.font = "bold " + this.size + "px Courier New";
		g.fillText("√",this.x-this.size/8 + xOff,this.y + yOff);
		g.fillRect(this.x + Equation.getXSize(this.size) + this.size/8 + xOff, this.y - Equation.getYSize(this.size) + this.size/4 + yOff, this.contents.getLength() - this.size/8, this.size/16);
		this.contents.printNodes(g, xOff, yOff);
	}
	
	plugIn(x) {
		this.contents.plugIn(x);
	}
	
	getLength() {
		return this.length;
	}
	
	getHeight() {
		return this.contents.getHeight();
	}
	
	isEvaluated() {
		return this.evaluated;
	}
	
	isEvaluating() {
		return this.evaluating;
	}
	
	evaluate(x) {
		return Math.sqrt(this.contents.evaluate(x));
	}
	
	createString() {
		return "√(" + this.contents.createString() + ")";
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
		
	}
	
	setSign(s) {
		this.sign = s;
	}
	
	isPolynomialForm() {
		return false;
	}
	
	getDegree() {
		return -1;
	}
	
	addDegree(add, deg) {
		return this.createString();
	}

}