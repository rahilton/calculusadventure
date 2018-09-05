// var MultiNode = require("MultiNode.js");
// var AnimationEvaluateAnimate = require("AnimationEvaluateAnimate.js");

class Equation {
	
	constructor(s, si, process) {
		//console.log(s);
		if(!si) si = 0;
	    if(typeof process == "undefined") process = true;
	    if(process) {
			for(var i = 0; i < s.length-1;i++) {
				if(s.substring(i,i+2) === "+-") {
					s = s.substring(0,i) + "-" + s.substring(i+2);
				}
				if(s.substring(i,i+2) === "--") {
					s = s.substring(0,i) + "+" + s.substring(i+2);
				}
			}
			this.root = new MultiNode(s,0,0,si);
			this.shadow = new MultiNode(s,si/16,si/16,si);
		}
		else {
			this.root = new MultiNode(s,0,0,si,process);
			this.shadow = new MultiNode(s,si/16,si/16,si,process);
		}
		this.eq = s;
		this.selected = false;
		this.size = si;
		this.equationColor = "white";
		this.tic = 0;
	}
	
	printEquation(g, xloc, yloc) {
		g.fillStyle = "black";
		this.shadow.printNodes(g, xloc, yloc);		
		g.fillStyle = this.equationColor;
		this.root.printNodes(g, xloc, yloc);
	}
	
	plugIn(xVal) {
		this.root.plugIn(xVal);
		this.eq = this.root.createString();
		this.root = new MultiNode(this.eq,this.x,this.y,this.size);
		this.shadow = new MultiNode(this.eq,this.x+this.size/16,this.y+this.size/16,this.size);
	}
	
	evaluateAnimate() {
		this.tic++;
		this.root.evaluateAnimate();
		this.shadow.evaluateAnimate();
		if(this.tic == AnimationEvaluateAnimate.MAXTICS) {
			this.eq = this.root.createString();
			this.root = new MultiNode(this.eq,this.x,this.y,this.size);
			this.shadow = new MultiNode(this.eq,this.x+this.size/16,this.y+this.size/16,this.size);
			this.tic = 0;
		}
	}
	
	select() {
		this.selected = true;
		this.equationColor = "green";
	}
	
	deselect() {
		this.selected = false;
		this.equationColor = "white";
	}
	
	getHeight() {
		return this.root.getHeight();
	}
	
	setColor(c) {
		this.equationColor = c;
	}
	
	static getXSize(si) {
	    /*
		BufferedImage test = new BufferedImage(1,1,BufferedImage.TYPE_4BYTE_ABGR);
		Graphics2D g = test.createGraphics();
		g.setFont(new Font("Monospaced",Font.BOLD,si));
		//System.out.println("Comparison: Metrics=" + g.getFontMetrics().charWidth(80) + " Formula " + (si*38/64));
		*/
		var canvas = document.getElementById('mainDisplay');
		var ctx = canvas.getContext('2d');
		var tempFont = ctx.font;
		ctx.font = "bold " + si + "px Courier New"
		var text = ctx.measureText('A'); // TextMetrics object
		ctx.font = tempFont
		//return g.getFontMetrics().charWidth(80);
		return text.width;
	}
	
	//Includes space between lines
	static getYSize(si) {
		/*return (si*74)/64;
		BufferedImage test = new BufferedImage(1,1,BufferedImage.TYPE_4BYTE_ABGR);
		Graphics2D g = test.createGraphics();
		g.setFont(new Font("Monospaced",Font.BOLD,si));*/
		//return g.getFontMetrics().getHeight(); 
		return (si*74)/64;
	}
	
	//Doesn't include space.
	static getYSizeReal(si) {
		return (si*34)/64; //haven't fully tested
	}
	
	evaluate(x) {
		return this.root.evaluate(x);
	}
	
	getLength() {
		return this.root.getLength();
	}
	
	add(a) {
		this.root.add(a);
		this.eq = this.root.createString();
		this.root = new MultiNode(this.eq,this.x,this.y,this.size);
		this.shadow = new MultiNode(this.eq,this.x+this.size/16,this.y+this.size/16,this.size);
	}
	
	getEquation() {
		return this.eq;
	}
	
	integrate(low, high) {
		var step = (high - low)/1000.0;
		//System.out.println(step);
		var sum = 0.0;
		for(var i = 0; i < 1000; i++) {
			sum += this.root.evaluate(low + i*step) * step;
			//System.out.println(sum);
		}
		return Math.round(sum).toString();
	}
	
	removeTerm() {
		return this.root.remTerm();
	}
	
	createString() {
		return this.root.createString();
	}
	
	isConstant() {
		return this.root.isConstant();
	}
	
	derivative() {
		return this.root.derivative();
	}
	
	hasPlusC() {
		return this.root.hasPlusC();
	}
	
	absoluteValue() {
		if(this.root.isConstant())
			return this.root.absoluteValue();
		else return this.eq;
	}
	
	addDegree(add, deg) {
		return this.root.addDegree(add, deg);
	}
	
}

// module.exports = Equation;
