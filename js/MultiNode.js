class MultiNode {
	
	constructor(s, xLoc, yLoc, si, process) {
	    if(typeof process === "boolean" && !process) {
	        this.ops = [];
    		this.list = [];
    		this.isParen = [];
    		this.list.push(new ContentNode(s,xLoc,yLoc,si));
    		this.isParen.push(false);
    		this.length = Equation.getXSize(si) * s.length;
    		this.ops.push("+");    
	    }
	    else {
    		this.eq = s;
    		this.x = xLoc; this.y = yLoc; this.size = si;
    		this.list = [];
    		this.ops = [];
    		this.isParen =[];
    		//begin = b;
    		//end = e;
    		//fullEq = f;
    		this.evaluating = false;
    		this.animateSpeed = 0;
    		this.totalMoved = 0;
    		this.height = 0;
    		this.length = 0;
    		
    		//System.out.println("MultiNode: " + eq);
    		if(this.eq.length > 2 && (this.eq.substring(0,2) === "0+" || this.eq.substring(0,2) ==="-0"))
    			this.eq = this.eq.substring(2);
    		if(this.eq.length > 2 && this.eq.substring(0,2) === "0-")
    			this.eq = this.eq.substring(1);
    		if(this.eq.length > 1 && this.eq.substring(0,1) === "+")
    			this.eq = this.eq.substring(1);
    		if(this.eq.length > 0) {
    			//breakUp(eq);
    			if(this.eq.substring(0,1) === "-") {
    				this.ops.push("-");
    				this.length += Equation.getXSize(this.size);
    				this.breakUp(this.eq.substring(1));
    			}
    			else {
    				this.ops.push("+");
    				this.breakUp(this.eq);
    			}
    		}
    		
    		if(this.list.length == 1 && this.list[0] instanceof ContentNode && this.list[0].isConstant()) {
    			this.evaluated = true;
    		}
    		else 
    			this.evaluated = false;
	    }
		//System.out.println("MultiNode Size: " + eq + " " + list.size());
	}
	
	breakUp(s) {
		var parenCount = 0;
		for(var i = 0; i < s.length; i++) {
			if((s.charAt(i) == '+' || ((s.charAt(i) == '-' || s.charAt(i) == '±') && i != 0)) && parenCount == 0) {
				this.createType(s.substring(0,i));
				this.list[this.list.length-1].setSign(this.ops[this.ops.length-1]);
				this.ops.push(s.substring(i,i+1));
				this.length += Equation.getXSize(this.size);
				this.height = Math.max(this.height, this.list[this.list.length-1].getHeight());
				this.breakUp(s.substring(i+1,s.length));
				
				/*
				if(ops.size() > 0) {
					list.get(list.size()-1).setSign(ops.get(ops.size()-1));
				}
				if(s.charAt(0) == '-' && ops.size() == 0)
					list.get(list.size()-1).setSign("-");
				ops.add(s.substring(i,i+1));
				length += Equation.getXSize(size);
				breakUp(s.substring(i+1,s.length()));*/
				return;
			}
			if(s.charAt(i) == '(') parenCount++;
			if(s.charAt(i) == ')') parenCount--;
		}
		this.createType(s);
		/*
		if(ops.size() > 0) {
			list.get(list.size()-1).setSign(ops.get(ops.size()-1));
		}*/
		this.list[this.list.length-1].setSign(this.ops[this.ops.length-1]);
		this.height = Math.max(this.height, this.list[this.list.length-1].getHeight());
		return;
		
	}
	
	createType(s) {
		var parenCount = 0;
		this.isParen.push(false);
		for(var i = 0; i < s.length; i++) {
			//Count and ignore anything in parentheses
			if(s.charAt(i) == '(') parenCount++;
			if(s.charAt(i) == ')') parenCount--;
			//If the outside symbol is a division sign, check to see if there's anything after
			if(s.charAt(i) == '/' && parenCount == 0) {
				i++;
				if(s.charAt(i) == '(') parenCount++;
				while (parenCount != 0) {
					i++;
					if(s.charAt(i) == '(') parenCount++;
					if(s.charAt(i) == ')') parenCount--;
				}
				if(i +1 == s.length) this.list.push(new FractionNode(s,this.x+this.length,this.y,this.size));
				else this.list.push(new ProductNode(s,this.x+this.length,this.y,this.size));
				
				this.length += this.list[this.list.length-1].getLength();
				return;
			}
			//If we are outside parentheses and the following is parentheses, make a Product Node.			
			if(i != s.length - 1 && s.charAt(i) == ')' && s.charAt(i+1) =='(' && parenCount == 0) {
				this.list.push(new ProductNode(s, this.x + this.length, this.y, this.size));
				this.length += this.list[this.list.length-1].getLength();
				return;
			}
			//If a number is next to a parentheses or an x
			if(i != s.length - 1 && (!isNaN(s.charAt(i)) || s.charAt(i) == 'x') && (s.charAt(i+1) =='(' || s.charAt(i+1) == 'x' || s.charAt(i+1) == '√' || s.charAt(i+1) == 'l' || s.charAt(i+1) == 's' || s.charAt(i+1) == 'c' || s.charAt(i+1) == 't') && parenCount == 0) {
				this.list.push(new ProductNode(s, this.x + this.length, this.y, this.size));
				this.length += this.list[this.list.length-1].getLength();
				return;
			}
			//If we encounter a 's' or a 'c' or a 't' check to see if there's anything after. If there is, it is a Product node otherwise a TrigNode
			//if((s.charAt(i) == 's' || s.charAt(i) == 'c'||s.charAt(i) == 't') && i == 0) {
			if((s.indexOf("sin",i) == i || s.indexOf("cos",i) == i || s.indexOf("tan",i) == i || s.indexOf("csc",i) == i || s.indexOf("sec",i) == i || s.indexOf("cot",i) == i) && i == 0) {
				i = 3; parenCount = 1;
				while (parenCount != 0) {
					i++;
					if(s.charAt(i) == '(') parenCount++;
					if(s.charAt(i) == ')') parenCount--;
				}
				//System.out.println("i=" + i + " s.length()=" + s.length());
				if(i +1 == s.length) this.list.push(new TrigNode(s,this.x+this.length,this.y,this.size));
				else this.list.push(new ProductNode(s,this.x+this.length,this.y,this.size));
				this.length += this.list[this.list.length-1].getLength();
				return;
			}
			//If we encounter a âˆš symbol check to see if there's anything after. If there is, it is a Product node otherwise a TrigNode
			if(s.charAt(i) == '√' && i == 0) {
				i = 1; parenCount = 1;
				while (parenCount != 0) {
					i++;
					if(s.charAt(i) == '(') parenCount++;
					if(s.charAt(i) == ')') parenCount--;
				}
				if(i +1 == s.length) this.list.push(new RootNode(s,this.x+this.length,this.y,this.size));
				else this.list.push(new ProductNode(s,this.x+this.length,this.y,this.size));
				this.length += this.list[this.list.length-1].getLength();
				return;
			}
			if(s.charAt(i) == 'l' && i == 0 && s.length>=2 && s.charAt(i+1)=='n') {
				i = 2; parenCount = 1;
				while (parenCount != 0) {
					i++;
					if(s.charAt(i) == '(') parenCount++;
					if(s.charAt(i) == ')') parenCount--;
				}
				if(i +1 == s.length) this.list.push(new LogNode(s,this.x+this.length,this.y,this.size));
				else this.list.push(new ProductNode(s,this.x+this.length,this.y,this.size));
				this.length += this.list[this.list.length-1].getLength();
				return;
			}
			//If we encounter a ^ symbol, we could have either a Product or Exponent Node 
			if(s.charAt(i) == '^' && parenCount == 0) {
				//If we are ^x and at the end of the string make an Exponent Node
				if(s.charAt(i+1) == 'x' && i+1 == s.length-1) {
					this.list.push(new ExponentNode(s, this.x + this.length, this.y, this.size));
					this.length += this.list[this.list.length-1].getLength();
					return;
				}
				//If we are ^ number
				if(!isNaN(s.charAt(i+1))) {
					//If the number is the last, make it an exponent Node
					while(i + 1 != s.length-1) {
						i++;
						//If the numbers stop and there's still more then Product node
						if(isNaN(s.charAt(i+1))) {
							this.list.push(new ProductNode(s, this.x + this.length, this.y, this.size));
							this.length += this.list[this.list.length-1].getLength();
							return;	
						}
					}
					this.list.push(new ExponentNode(s, this.x + this.length, this.y, this.size));
					this.length += this.list[this.list.length-1].getLength();
					return;
				}
				//If we are ^( then go to the end of the parentheses
				if(s.charAt(i+1) == '(') {
					i = i+1;
					parenCount = 1;
					while(parenCount != 0) {
						i++;
						if(s.charAt(i) == '(') parenCount++;
						if(s.charAt(i) == ')') parenCount--;
					}
					//If we are at the end and there is no more, make is an Exponent Node
					if(i == s.length-1) {
						this.list.push(new ExponentNode(s, this.x + this.length, this.y, this.size));
						this.length += this.list[this.list.length-1].getLength();
						return;
					}
					//If we are at the end and there is more, make is an Product Node
					else {
						this.list.push(new ProductNode(s, this.x + this.length, this.y, this.size));
						this.length += this.list[this.list.length-1].getLength();
						return;
					}
				}
			}
		}
		
		//If we get here, it's either x, a number, or something in parentheses.
		if(s.substring(0,1) === "(" && s.substring(s.length-1,s.length) === ")") {
			this.isParen.splice(this.isParen.length-1, 1, true);
			this.list.push(new MultiNode(s.substring(1,s.length-1),this.x+Equation.getXSize(this.size)+this.length,this.y,this.size));
			this.length += this.list[this.list.length-1].getLength() + 2*Equation.getXSize(this.size);
			//System.out.println(length/Equation.getXSize(size));
		}
		else {
			this.list.push(new ContentNode(s, this.x + this.length, this.y, this.size));
			//Check if it is a +0
			if(this.list[this.list.length-1].getContents() === "0" && this.list.length>1) {
				this.list.pop();
				this.ops.pop();
				this.length -= Equation.getXSize(this.size);
			}
			else
				this.length += this.list[this.list.length-1].getLength();
		}
		//if(ops.size() > 0 && list.get(list.size()-1) instanceof ContentNode) {
		//	((ContentNode)list.get(list.size()-1)).setSign(ops.get(ops.size()-1));
		//}
		
		return;
	}
	
	
	printNodes(g, xOff, yOff) {
		var runLen = 0;
		for(var i = 0; i < this.list.length; i++) {
			g.font = "bold " + this.size +"px Courier New";
			// Print the plus or minus for the operation.
			//if(i != list.size() - 1) {
			if(i != 0 || (i==0 && this.ops[0] === "-")) {
				if(this.totalMoved > runLen)
					g.fillText(this.ops[i], this.x + xOff, this.y + yOff);
				else
					g.fillText(this.ops[i], runLen + this.x - this.totalMoved + xOff, this.y + yOff);
				runLen += Equation.getXSize(this.size);
			}
			
			
			//Print all the nodes
			this.list[i].printNodes(g, xOff, yOff);
			g.font = "bold " + this.size +"px Courier New";
			//If the node is surrounded by parentheses, print the parentheses
			if(this.isParen[i]) {
				g.fillText("(", runLen + this.x + xOff, this.y + yOff);
				runLen += Equation.getXSize(this.size);
			}
			//Add to the run length the length of the node printed			
			runLen += this.list[i].getLength();
			//If the node is surrounded by parentheses, print the end parentheses
			if(this.isParen[i]) {
				g.fillText(")", runLen + this.x + xOff, this.y + yOff);
				runLen += Equation.getXSize(this.size);
			}
		}
		
	}
	
	plugIn(x) {
		for(var i = 0; i < this.list.length; i++) {
			this.list[i].plugIn(x);
		}
	}
	
	evaluateAnimate() {
		this.evaluating = true;
		for(var i = 0; i < this.list.length; i++) {
			if(!this.list[i].isEvaluated()) {
				this.evaluating = false;
				this.list[i].evaluateAnimate();
				if(this.list[i].isEvaluated()) {
					this.list.splice(i, 1, new ContentNode(Math.floor(this.list[i].evaluate(0)).toString(),this.x,this.y,this.size));
				}
			}
		}
		if(this.evaluating) {
			this.animateSpeed++;
			this.totalMoved += this.animateSpeed;
			for(var i = 0; i < this.list.length; i++) {
				this.list[i].changeX(Math.min(this.animateSpeed, this.list[i].getX()-this.x) * -1);
			}
			if(this.animateSpeed == AnimationEvaluateAnimate.MAXTICS) {
				var newNum = this.evaluate(0);
				var plusC = false;
				if(this.list[this.list.length-1] instanceof ContentNode && this.list[this.list.length-1].isPlusC())
					plusC = true;
				this.list = [];
				this.ops = [];
				this.list.push(new ContentNode(Math.abs(Math.floor(newNum)).toString(),this.x,this.y,this.size));
				if(newNum < 0) {
					this.ops.push("-");
				}
				else {
					this.ops.push("+");
				}
				if(plusC) {
					this.list.push(new ContentNode("C",x,y,size));
					this.ops.push("+");
				}
				this.evaluated = true;
				this.evaluating = false;
			}
		}
	}
	
	evaluate(x) {
		this.sum = this.list[0].evaluate(x);
		if(this.ops[0] === "-") this.sum *= -1;
		for(var i = 1; i < this.ops.length;i++) {
			//System.out.println("Multinode sum " + sum + " " + list.get(i).evaluate(x));
			if(this.ops[i] === "+") {
				this.sum += this.list[i].evaluate(x);
			}
			if(this.ops[i] === "-") {
				this.sum -= this.list[i].evaluate(x);
			}
		}
		/*
		for(int i = 0; i < ops.size();i++) {
			//System.out.println("Multinode sum " + sum + " " + list.get(i).evaluate(x));
			if(ops.get(i).equals("+")) {
				sum += list.get(i+1).evaluate(x);
			}
			if(ops.get(i).equals("-")) {
				sum -= list.get(i+1).evaluate(x);
			}
		}*/
		return this.sum;
	}
	
	isTrigNode() {
		if(this.list.length == 1 && this.list[0] instanceof TrigNode)
			return true;
		return false;
	}
	
	isExponentNode() {
		if(this.list.length == 1 && this.list[0] instanceof ExponentNode) {
			//System.out.println("isExponentNode() is returning true.");
			return true;
		}
		//System.out.println("isExponentNode() is returning false.");
		return false;
	}
	
	isContentNode() {
		if(this.list.length == 1 && this.list[0] instanceof ContentNode)
			return true;
		return false;
	}
	
	isProductNode() {
		if(this.list.length == 1 && this.list[0] instanceof ProductNode)
			return true;
		return false;
	}
	
	isNegative() {
		if(this.list.length == 1 && this.list[0] instanceof ContentNode && this.list[0].isNegative()) {
			return true;
		}
		return false;
	}
	
	getListSize() {
		return this.list.length;
	}
	
	isConstant() {
		if (this.list.length == 1 && this.list[0] instanceof ContentNode && ( this.list[0].isConstant() || this.list[0].isPlusC()))
			return true;
		if(this.list.length == 2 && this.list[0] instanceof ContentNode && this.list[1] instanceof ContentNode && this.list[0].isConstant() && this.list[1].isPlusC())
			return true;
		return false;
	}
	
	getConstant() {
		return parseInt(this.list[0].getContents());
	}
	
	add(s) {
		for(var i = 0; i < this.list.length; i++) {
			if(this.list[i] instanceof ContentNode && this.list[i].isConstant()) {
				this.list[i].add(s);
				return;
			}
		}
		if(s<0) {
			this.list.push(new ContentNode(Math.abs(s).toString(),this.x+this.length,this.y,this.size));
			this.list[this.list.length-1].setSign("-");
			this.ops.push("-");
		}
		if(s>0) {
			this.list.push(new ContentNode(s.toString(),this.x+this.length,this.y,this.size));
			this.ops.push("+");
		}
	}
	
	derivative() {
		var str = "";
		for(var i = 0; i < this.list.length; i++) {
			if(i != 0 || (i==0 && this.ops[0] === "-")) {
				str += this.ops[i];
			}
			str += this.list[i].derivative();
			/*
			str += list.get(i).derivative();
			if(i != list.size() - 1) {
				str += ops.get(i);
			}*/
		}
		return str;
	}
	
	createString() {
		var str = "";
		for(var i = 0; i < this.list.length; i++) {
			if(i != 0 || (i==0 && this.ops[0] === "-")) {
				str += this.ops[i];
			}
			str += this.list[i].createString();
		}/*
		for(int i = 0; i < list.size(); i++) {
			str += list.get(i).createString();
			if(i != list.size() - 1) {
				str += ops.get(i);
			}
		}*/
		//System.out.println("Create string returns: " + str);
		return str;
	}
	
	remTerm() {
		if(this.list.length==1) return this.list[0].createString();
		else {
			var str = "";
			for(var i = 1; i < this.list.length; i++) {
				str += this.ops[i];
				str += this.list[i].createString();
				
			}
			if(str.charAt(0)=='+') str = str.substring(1);
		return str;
		}
	}
	
	
	toString() {
		return "MultiNode: " + this.eq;// + " Start: " + begin + " End: " + end;
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
		var maxHeight;
		if(this.list.length > 0)
			maxHeight = this.list[0].getHeight();
		else 
			maxHeight = 0;
		for (var i = 0; i < this.list.length; i++) {
			Math.max(maxHeight, this.list[i].getHeight());
		}
		return maxHeight;
	}
	
	getX() {
		return this.x;
	}
	
	getY() {
		return this.y;
	}
	
	changeX(c) {
		for(var i = 0; i < this.list.length;i++) {
			this.list[i].changeX(c);
		}
		this.x += c;
	}
	
	changeY(c) {
		for(var i = 0; i < this.list.length;i++) {
			this.list[i].changeY(c);
		}
		this.y += c;
	}
	
	hasPlusC() {
		for(var i = 0; i < this.list.length;i++) {
			if(this.list[i] instanceof ContentNode && this.list[i].isPlusC())
				return true;
		}
		return false;
	}
	
	absoluteValue() {
		if(this.list.length == 1 && this.list[0] instanceof ContentNode && this.list[0].isConstant()) {
			return Math.floor(Math.abs(this.list[0].evaluate(0))).toString();
		}
		return this.createString();
	}
	
	isPolynomialForm() {
		for(var i = 0; i < this.list.length;i++) {
			if(!this.list[i].isPolynomialForm()) return false;
		}
		return true;
	}
	
	getDegree() {
		return this.list[0].getDegree();
	}
	
	addDegree(add, deg) {
		var str = "";
		var added = false;
		for(var i = 0; i < this.list.length; i++) {
			//System.out.println("MultiNode Degrees " + i + " " + list.get(i).getDegree());
			if(this.list[i].getDegree() == deg && !added) {
				if(i != 0 || (i==0 && this.ops[0] === "-")) {str += this.ops[i];}
				str += this.list[i].addDegree(add, deg);
				added = true;
			}
			else if (this.list[i].getDegree() < deg && !added) {
				var theX = add + "x";
				var theExp = "^" + deg;
				if(deg == 0) {theX = add.toString(); theExp = "";}
				if(deg == 1) {theExp = "";}
				if(add == 1 && deg > 0) {theX = "x";}
				if(add == -1 && deg > 0) {theX = "-x";}
				str += "+" + theX + theExp;
				added = true;
				str += this.ops[i];
				str += this.list[i].createString();
			}
			else if(i == this.list.length-1 && !added) {
				if(i != 0 || (i==0 && this.ops[0] === "-")) {str += this.ops[i];}
				str += this.list[i].createString();
				var theX = add + "x";
				var theExp = "^" + deg;
				if(deg == 0) {theX = add.toString(); theExp = "";}
				if(deg == 1) {theExp = "";}
				if(add == 1 && deg > 0) {theX = "x";}
				if(add == -1 && deg > 0) {theX = "-x";}
				str += "+" + theX + theExp;
				added = true;
			}
			else {
				if(i != 0 || (i==0 && this.ops[0] === "-")) {str += this.ops[i];}
				str += this.list[i].createString();
			}
				
			
		}
		//System.out.println("addDegree(" + add+","+deg+") in the MultiNode is returning:" + str);
		return str;
	}
	
	setSign(s) {
	}
}
