class ContentNode {
	
	constructor(s, xLoc, yLoc, si) {
		this.content = s;
		//begin = b;
		//end = e;
		//fullEq = f;
		this.x = xLoc; this.y = yLoc; this.size = si;
		this.length = s.length * Equation.getXSize(si);
		this.sign = "+";
		this.evaluated = true;
		this.evaluating = false;
		//System.out.println("ContentNode: " + content);
	}
	
	getLength() {
		return this.length;
	}
	
	printNodes(g, xOff, yOff) {
		g.font = "bold " + this.size + "px Courier New";
		g.fillText(this.content, this.x + xOff, this.y + yOff);
		//System.out.println("ContentNode x Value: " + x);
		//System.out.println("Content: " + content + " Begin: " + begin + " End: " + end);
		
	}
	
	isConstant() {
		for(var i = 0;i < this.content.length; i++) {
			if(isNaN(this.content.charAt(i))) {
				if(this.content.charAt(i) == '-' && i == 0) continue;
				return false;
			}
		}
		//if(content.length() == 0) return false;
		return true;
	}
	
	isNegative() {
		if(this.content.charAt(0) == '-') return true;
		return false;
	}
	
	setSign(s) {
		this.sign = s;
	}
	
	toString() {
		return "Content Node: " + this.content;
	}
	
	add(s) {
		var newConstant  = parseInt(this.content);
		if(this.sign === "+")
			newConstant += s;
		else
			newConstant -= s;
		this.content = newConstant.toString();
		/*
		if(newConstant == 0 && begin  > 0) return fullEq.substring(0, begin-1) + fullEq.substring(end);
		return fullEq.substring(0, begin) + String.valueOf(newConstant) + fullEq.substring(end);
		*/
	}
	
	derivative() {
		if(this.content === "x") {
			return "1";
		}
		else
			return "0";
	}
	
	plugIn(x) {
		if(this.content === "x") {
			this.content = "(" + x.toString() + ")";
		}
	}
	
	getContents() {
		return this.content;
	}
	
	evaluate(x) {
		if(this.content === "x")
			return x;
		else if (this.content === "C")
			return 0;
		return parseFloat(this.content);
	}
	
	isEvaluated() {
		return this.evaluated;
	}
	
	createString() {
		return this.content;
	}
	
	isEvaluating() {
		return this.evaluating;
	}
	
	getHeight() {
		return Equation.getYSize(this.size);
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
	
	isPlusC() {
		if(this.content === "C") return true;
		else
			return false;
	}
	
	evaluateAnimate() {
		
	}
	
	isPolynomialForm() {
		return true;
	}
	
	getDegree() {
		if(this.content ==="x") return 1;
		return 0;
	}
	
	addDegree(add, deg) {
		if(this.getDegree() == deg && deg == 1) {
			if(this.sign === "-") add *= -1;
			var newNum = 1+add;
			if(newNum == 0) return "0";
			if(newNum == 1) return this.createString();
			if(newNum == -1) return "-" + this.createString();
			return newNum.toString() + this.createString();
		}
		else if(this.getDegree() == deg && deg == 0) {
			var newConstant  = parseInt(this.content,10);
			if(this.sign.equals("+"))
				newConstant += add;
			else
				newConstant -= add;
				
			return String.valueOf(newConstant);
		}
			
		return this.content;
	}

}
