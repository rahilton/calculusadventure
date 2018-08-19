class TrigNode  {
	
	constructor(s, xLoc, yLoc, si) {
		this.eq = s;
		//begin = b;
		//end = e;
		//fullEq = f;
		this.x = xLoc; this.y = yLoc; this.size = si;
		this.sign = "+";
		//System.out.println("TrigNode: " + eq);
		this.contents = new MultiNode(s.substring(4,s.length-1),this.x+4*Equation.getXSize(si),this.y,si);
		this.type = s.substring(0,3);
		this.length = Equation.getXSize(this.size) * 5 + this.contents.getLength();
		
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
		return "Product Node: " + this.eq;
	}
	
	printNodes(g, xOff, yOff) {
		g.font = "bold " + this.size + "px Courier New";
		g.fillText(this.type,this.x + xOff,this.y + yOff);
		g.fillText("(", this.x + 3*Equation.getXSize(this.size) + xOff, this.y + yOff);
		g.fillText(")", this.x + this.contents.getLength() + 4*Equation.getXSize(this.size) + xOff, this.y + yOff);
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
		//System.out.println("Product Node : " + first.evaluate(x) + " " + second.evaluate(x));
		if(this.type === "sin")	return Math.sin(this.contents.evaluate(x));
		if(this.type === "cos")	return Math.cos(this.contents.evaluate(x));
		if(this.type === "tan")	return Math.tan(this.contents.evaluate(x));
		if(this.type === "sec")	return 1.0/Math.cos(this.contents.evaluate(x));
		if(this.type === "csc")	return 1.0/Math.sin(this.contents.evaluate(x));
		else
			return 1.0/Math.tan(this.contents.evaluate(x));
	}
	
	createString() {
		return this.type + "(" + this.contents.createString() + ")";
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
	
	addDegree(add,deg) {
		return this.createString();
	}

}