class ProductNode {
	
	constructor(s, xLoc, yLoc, si) {
		this.eq = s;
		//fullEq = f;
		//begin = b;
		//end = e;
		this.x = xLoc; this.y = yLoc; this.size = si;
		this.animateSpeed = 0;
		this.totalMoved = 0;
		this.sign = "+";
		//System.out.println("ProductNode: " + eq);
		
		var parenCount = 0;
		var split = 0;
		for(var i = 0; i < s.length; i++) {
			if(s.charAt(i) == '(') parenCount++;
			if(s.charAt(i) == ')') parenCount--;
			//If we end with a ) and the following is a (, s, c, t, or a âˆš.
			if(i != s.length - 1 && s.charAt(i) == ')' && (s.charAt(i+1) =='(' || s.charAt(i+1) == 's' || s.charAt(i+1) == 'c'|| s.charAt(i+1) == 't'|| s.charAt(i+1) == '√'|| s.charAt(i+1) == 'l')&& parenCount == 0) {
				split = i + 1;
				break;
			}
			//If we end with a number or x and the following is a x, (, s, c, t, l, or a âˆš.
			if(i != s.length - 1 && (!isNaN(s.charAt(i)) || s.charAt(i) == 'x') && (s.charAt(i+1) =='(' || s.charAt(i+1) =='x' || s.charAt(i+1) == 's' || s.charAt(i+1) == 'c'|| s.charAt(i+1) == 't'|| s.charAt(i+1) == '√'|| s.charAt(i+1) == 'l') && parenCount == 0) {
				split = i + 1;
				break;
			}
			if((s.charAt(i) == '^' || s.charAt(i) == '/') && parenCount == 0) {
				i++;
				if(s.charAt(i) == 'x') {
					split = i + 1;
					break;
				}
				if(!isNaN(s.charAt(i))) {
					while(!isNaN(s.charAt(i))) { //string out of bounds 4
						i++;
					}
					split = i;
					break;
				}
				if(s.charAt(i) == '(') {
					parenCount++;
					while(parenCount != 0) {
						i++;
						if(s.charAt(i) == '(') parenCount++;
						if(s.charAt(i) == ')') parenCount--;
					}
					split = i+1;
					break;
				}
			}
		}
		if(s.substring(0,split) === this.removeParen(s.substring(0,split))) {
			this.firstParen = false;
		}
		else this.firstParen = true;
		if(s.substring(split,s.length) === this.removeParen(s.substring(split,s.length))) {
			this.secondParen = false;
		}
		else this.secondParen = true;
		
		
				
		if(this.firstParen) {
			this.first = new MultiNode(s.substring(1,split-1), this.x + Equation.getXSize(this.size), this.y, this.size);
			this.length = this.first.getLength() + 2 * Equation.getXSize(this.size);
		}
		else {
			this.first = new MultiNode(s.substring(0,split), this.x, this.y, this.size);
			this.length = this.first.getLength();
		}
		if(this.secondParen) {
			this.second = new MultiNode(s.substring(split+1,s.length-1), this.x + this.length + Equation.getXSize(this.size), this.y, this.size);
			this.length += this.second.getLength() + 2 * Equation.getXSize(this.size);
		}
		else {
			this.second = new MultiNode(s.substring(split,s.length),this.x + this.length,this.y,this.size);
			this.length += this.second.getLength();
		}
		//The constant needs to go in front
		if(this.second.isConstant() && !this.first.isConstant()) {
			this.secondParen = this.firstParen;
			this.firstParen = false;
			var temp = this.first;
			this.first = new MultiNode(this.second.createString(),this.x,this.y,this.size);
			this.length = this.first.getLength();
			if(this.secondParen) {
				this.second = new MultiNode(temp.createString(), this.x + this.length + Equation.getXSize(this.size), this.y, this.size);
				this.length += this.second.getLength() + 2 * Equation.getXSize(this.size);
			}
			else {
				this.second = new MultiNode(temp.createString(),this.x+this.first.getLength(),this.y,this.size);
				this.length += this.second.getLength();
			}
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
		return "Product Node: " + this.eq;
	}
	
	printNodes(g, xOff, yOff) {
		if(this.firstParen) {
			g.font = "bold " + this.size + "px Courier New";
			g.fillText("(", this.x + xOff, this.y + yOff);
			g.fillText(")", this.x + this.first.getLength() + Equation.getXSize(this.size) + xOff, this.y + yOff);
		}
		this.first.printNodes(g, xOff, yOff);
		if(this.secondParen && this.firstParen) {
			g.font = "bold " + this.size + "px Courier New";
			if(this.totalMoved > this.first.getLength() + 2*Equation.getXSize(this.size)) g.fillText("(", this.x + xOff, this.y + yOff);
			else g.fillText("(", this.x - this.totalMoved + this.first.getLength() + 2*Equation.getXSize(this.size) + xOff, this.y + yOff);
			if(this.totalMoved > this.first.getLength() + this.second.getLength() + 3*Equation.getXSize(this.size)) g.fillText(")", this.x + xOff, this.y + yOff);
			else g.fillText(")", this.x - this.totalMoved + this.first.getLength() + this.second.getLength() + 3*Equation.getXSize(this.size) + xOff, this.y + yOff);
		}
		if(this.secondParen && !this.firstParen) {
			g.font = "bold " + this.size + "px Courier New";
			if (this.totalMoved > this.first.getLength()) g.fillText("(", this.x + xOff, this.y + yOff);
			else g.fillText("(", this.x - this.totalMoved + this.first.getLength() + xOff, this.y + yOff);
			if (this.totalMoved > this.first.getLength() + this.second.getLength()) g.fillText("(", this.x + xOff, this.y + yOff);
			else g.fillText(")", this.x - this.totalMoved + this.first.getLength() + this.second.getLength() + Equation.getXSize(this.size) + xOff, this.y + yOff);
		}
		this.second.printNodes(g, xOff, yOff);
	}
	
	plugIn(x) {
		this.first.plugIn(x);
		this.second.plugIn(x);
	}
	
	getLength() {
		return this.length;
	}
	
	getHeight() {
		return Math.max(this.first.getHeight(), this.second.getHeight());
	}
	
	isEvaluated() {
		return this.evaluated;
	}
	
	isEvaluating() {
		return this.evaluating;
	}
	
	isFirstConstant() {
		return this.first.isConstant();
	}
	
	isSecondConstant() {
		return this.second.isConstant();
	}
	
	getFirstConstant() {
		return this.first.getConstant();
	}
	
	getSecondConstant() {
		return this.second.getConstant();
	}
	
	getFirst() {
		if(this.firstParen)
			return "(" + this.first.createString() + ")";
		else
			return this.first.createString();
	}
	
	getSecond() {
		if(this.secondParen)
			return "(" + this.second.createString() + ")";
		else
			return this.second.createString();
	}
	
	derivative() {
		//Assumes that only the first number can be a constant;
		if(this.first.isConstant()) {
			var frontNum = this.first.getConstant();
			var temp = new MultiNode(this.second.derivative(),0,0,this.size);
			if(temp.isProductNode()) {
				var temp1 = new ProductNode(this.second.derivative(),0,0,this.size);
				if(temp1.isFirstConstant())
					frontNum *= temp1.getFirstConstant();
				return frontNum.toString() + temp1.getSecond();
			}
			if(temp.isConstant()) {
				frontNum *= temp.getConstant();
				return frontNum.toString();
			}
		}
		var firstEq = "(" + this.first.createString() + ")";
		var secondEq = "(" + this.second.createString() + ")";
		var firstDer = "(" + this.first.derivative() + ")";
		var secondDer = "(" + this.second.derivative() + ")";
		if(this.first.derivative() === "1") firstDer = "";
		if(this.second.derivative() === "1") secondDer = "";
				
		
		return firstEq + secondDer + "+" + secondEq + firstDer;
	}
	
	evaluate(x) {
		//System.out.println("Product Node : " + first.evaluate(x) + " " + second.evaluate(x));
		return this.first.evaluate(x) * this.second.evaluate(x);
	}

	createString() {
		if(this.first.isContentNode() && this.second.isContentNode() && this.first.isConstant() && !this.second.isConstant()) {
			return this.first.createString() + this.second.createString();
		}
		if(this.first.isContentNode() && this.second.isTrigNode()) {
			return this.first.createString() + this.second.createString();
		}
		if(this.first.isConstant() && this.second.isConstant()) {
			return this.first.createString() + "(" + this.second.createString() + ")";
		}
		if(this.first.isConstant() && this.second.getListSize() == 1) {
			return this.first.createString() + this.second.createString();
		}
		if(this.first.isContentNode()) {
			return this.first.createString() + "(" + this.second.createString() + ")";
		}
		else return "(" + this.first.createString() + ")(" + this.second.createString() + ")";
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
		if(!this.first.isEvaluated()) {
			this.evaluating = false;
			this.first.evaluateAnimate();
		}
		
		if(!this.second.isEvaluated()) {
			this.evaluating = false;
			this.second.evaluateAnimate();
		}
		
		if(this.evaluating) {
			this.animateSpeed++;
			this.totalMoved += this.animateSpeed;
			this.second.changeX(Math.min(this.animateSpeed, this.second.getX()-this.x) * -1);
			if(this.animateSpeed == AnimationEvaluateAnimate.MAXTICS) {
				this.evaluated = true;
				this.evaluating = false;
			}
		}
	}
	
	setSign(s) {
		//System.out.println("SetSign: ProductNode " + s);
		this.sign = s;
	}
	
	isPolynomialForm() {
		if(this.first.isConstant() && this.second.isPolynomialForm()) return true;
		return false;
	}
	
	getDegree() {
		return this.second.getDegree();
	}
	
	addDegree(add, deg) {
		//System.out.println("Add Degree Product " + first.evaluate(0) + " " + add + " " + deg + " " + sign);
		if(this.second.getDegree() == deg) {
			if(this.sign === "-") add *=-1;
			var newNum = Math.floor (this.first.evaluate(0)) + add;
			//System.out.println("The newNum=" + newNum + " " + sign);
			if(newNum == 0) return "0";
			if(newNum == 1) return this.second.createString();
			if(newNum == -1) return "-" + this.second.createString();
			return newNum.toString() + this.second.createString();
		}
		return this.createString();
	}
}
