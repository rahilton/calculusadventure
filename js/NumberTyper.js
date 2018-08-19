class NumberTyper extends GameWindow {
	

	constructor(x1, y1, visible) {
		super(x1,y1,x1+NumberTyper.WINDOW_WIDTH, y1+NumberTyper.WINDOW_HEIGHT, visible);
		this.DISPLAY_HEIGHT = NumberTyper.WINDOW_HEIGHT/5;
		this.eqString = "";
		this.eqDone = false;
	}
	
	reset() {
		this.eqDone = false;
		this.eqString = "";
	}
	
	printWindow(g){
		super.printWindow(g);
		
		var fontSize = (NumberTyper.WINDOW_HEIGHT + NumberTyper.WINDOW_WIDTH) * 64/900;
		if(this.isOpen()) {
			g.fillStyle = "#AAAAAA";
			g.fillRect(this.x1+6, this.y1+6, NumberTyper.WINDOW_WIDTH-12, NumberTyper.WINDOW_HEIGHT-12);
			var temp = new Equation(this.eqString,fontSize);
			//temp = new Equation(eqString,x1+(x2-x1)/2-temp.getLength()/2,y1+DISPLAY_HEIGHT/2 + temp.getHeight()/2,fontSize);
			temp.printEquation(g,this.x1+(this.x2-this.x1)/2-temp.getLength()/2,this.y1+this.DISPLAY_HEIGHT/2 + temp.getHeight()/2);
			
			g.fillStyle = "#AAAAAA";
			NumberTyper.fill3DRect(g,this.x1+6 +0*(NumberTyper.WINDOW_WIDTH-12)/3, this.y1+6+this.DISPLAY_HEIGHT+0*(NumberTyper.WINDOW_HEIGHT-12)/5, (NumberTyper.WINDOW_WIDTH-12)/3, (NumberTyper.WINDOW_HEIGHT-12)/5, true);
			NumberTyper.fill3DRect(g,this.x1+6 +1*(NumberTyper.WINDOW_WIDTH-12)/3, this.y1+6+this.DISPLAY_HEIGHT+0*(NumberTyper.WINDOW_HEIGHT-12)/5, (NumberTyper.WINDOW_WIDTH-12)/3, (NumberTyper.WINDOW_HEIGHT-12)/5, true);
			NumberTyper.fill3DRect(g,this.x1+6 +2*(NumberTyper.WINDOW_WIDTH-12)/3, this.y1+6+this.DISPLAY_HEIGHT+0*(NumberTyper.WINDOW_HEIGHT-12)/5, (NumberTyper.WINDOW_WIDTH-12)/3, (NumberTyper.WINDOW_HEIGHT-12)/5, true);
			
			NumberTyper.fill3DRect(g,this.x1+6 +0*(NumberTyper.WINDOW_WIDTH-12)/3, this.y1+6+this.DISPLAY_HEIGHT+1*(NumberTyper.WINDOW_HEIGHT-12)/5, (NumberTyper.WINDOW_WIDTH-12)/3, (NumberTyper.WINDOW_HEIGHT-12)/5, true);
			NumberTyper.fill3DRect(g,this.x1+6 +1*(NumberTyper.WINDOW_WIDTH-12)/3, this.y1+6+this.DISPLAY_HEIGHT+1*(NumberTyper.WINDOW_HEIGHT-12)/5, (NumberTyper.WINDOW_WIDTH-12)/3, (NumberTyper.WINDOW_HEIGHT-12)/5, true);
			NumberTyper.fill3DRect(g,this.x1+6 +2*(NumberTyper.WINDOW_WIDTH-12)/3, this.y1+6+this.DISPLAY_HEIGHT+1*(NumberTyper.WINDOW_HEIGHT-12)/5, (NumberTyper.WINDOW_WIDTH-12)/3, (NumberTyper.WINDOW_HEIGHT-12)/5, true);
			
			NumberTyper.fill3DRect(g,this.x1+6 +0*(NumberTyper.WINDOW_WIDTH-12)/3, this.y1+6+this.DISPLAY_HEIGHT+2*(NumberTyper.WINDOW_HEIGHT-12)/5, (NumberTyper.WINDOW_WIDTH-12)/3, (NumberTyper.WINDOW_HEIGHT-12)/5, true);
			NumberTyper.fill3DRect(g,this.x1+6 +1*(NumberTyper.WINDOW_WIDTH-12)/3, this.y1+6+this.DISPLAY_HEIGHT+2*(NumberTyper.WINDOW_HEIGHT-12)/5, (NumberTyper.WINDOW_WIDTH-12)/3, (NumberTyper.WINDOW_HEIGHT-12)/5, true);
			NumberTyper.fill3DRect(g,this.x1+6 +2*(NumberTyper.WINDOW_WIDTH-12)/3, this.y1+6+this.DISPLAY_HEIGHT+2*(NumberTyper.WINDOW_HEIGHT-12)/5, (NumberTyper.WINDOW_WIDTH-12)/3, (NumberTyper.WINDOW_HEIGHT-12)/5, true);
			
			NumberTyper.fill3DRect(g,this.x1+6 +0*(NumberTyper.WINDOW_WIDTH-12)/3, this.y1+6+this.DISPLAY_HEIGHT+3*(NumberTyper.WINDOW_HEIGHT-12)/5, (NumberTyper.WINDOW_WIDTH-12)/3, (NumberTyper.WINDOW_HEIGHT-12)/5, true);
			NumberTyper.fill3DRect(g,this.x1+6 +1*(NumberTyper.WINDOW_WIDTH-12)/3, this.y1+6+this.DISPLAY_HEIGHT+3*(NumberTyper.WINDOW_HEIGHT-12)/5, (NumberTyper.WINDOW_WIDTH-12)/3, (NumberTyper.WINDOW_HEIGHT-12)/5, true);
			NumberTyper.fill3DRect(g,this.x1+6 +2*(NumberTyper.WINDOW_WIDTH-12)/3, this.y1+6+this.DISPLAY_HEIGHT+3*(NumberTyper.WINDOW_HEIGHT-12)/5, (NumberTyper.WINDOW_WIDTH-12)/3, (NumberTyper.WINDOW_HEIGHT-12)/5, true);
			
			g.font = "bold " + fontSize + "px Courier New";
			g.fillStyle = "black";
			g.fillText("1", this.x1+6+ 0*(NumberTyper.WINDOW_WIDTH-12)/3+(NumberTyper.WINDOW_WIDTH-12)/6-Equation.getXSize(fontSize)/2, this.y1+6+this.DISPLAY_HEIGHT+1*(NumberTyper.WINDOW_HEIGHT-12)/5-(NumberTyper.WINDOW_HEIGHT-12)/10+Equation.getYSizeReal(fontSize)/2);
			g.fillText("2", this.x1+6+ 1*(NumberTyper.WINDOW_WIDTH-12)/3+(NumberTyper.WINDOW_WIDTH-12)/6-Equation.getXSize(fontSize)/2, this.y1+6+this.DISPLAY_HEIGHT+1*(NumberTyper.WINDOW_HEIGHT-12)/5-(NumberTyper.WINDOW_HEIGHT-12)/10+Equation.getYSizeReal(fontSize)/2);
			g.fillText("3", this.x1+6+ 2*(NumberTyper.WINDOW_WIDTH-12)/3+(NumberTyper.WINDOW_WIDTH-12)/6-Equation.getXSize(fontSize)/2, this.y1+6+this.DISPLAY_HEIGHT+1*(NumberTyper.WINDOW_HEIGHT-12)/5-(NumberTyper.WINDOW_HEIGHT-12)/10+Equation.getYSizeReal(fontSize)/2);
			
			g.fillText("4", this.x1+6+ 0*(NumberTyper.WINDOW_WIDTH-12)/3+(NumberTyper.WINDOW_WIDTH-12)/6-Equation.getXSize(fontSize)/2, this.y1+6+this.DISPLAY_HEIGHT+2*(NumberTyper.WINDOW_HEIGHT-12)/5-(NumberTyper.WINDOW_HEIGHT-12)/10+Equation.getYSizeReal(fontSize)/2);
			g.fillText("5", this.x1+6+ 1*(NumberTyper.WINDOW_WIDTH-12)/3+(NumberTyper.WINDOW_WIDTH-12)/6-Equation.getXSize(fontSize)/2, this.y1+6+this.DISPLAY_HEIGHT+2*(NumberTyper.WINDOW_HEIGHT-12)/5-(NumberTyper.WINDOW_HEIGHT-12)/10+Equation.getYSizeReal(fontSize)/2);
			g.fillText("6", this.x1+6+ 2*(NumberTyper.WINDOW_WIDTH-12)/3+(NumberTyper.WINDOW_WIDTH-12)/6-Equation.getXSize(fontSize)/2, this.y1+6+this.DISPLAY_HEIGHT+2*(NumberTyper.WINDOW_HEIGHT-12)/5-(NumberTyper.WINDOW_HEIGHT-12)/10+Equation.getYSizeReal(fontSize)/2);
			
			g.fillText("7", this.x1+6+ 0*(NumberTyper.WINDOW_WIDTH-12)/3+(NumberTyper.WINDOW_WIDTH-12)/6-Equation.getXSize(fontSize)/2, this.y1+6+this.DISPLAY_HEIGHT+3*(NumberTyper.WINDOW_HEIGHT-12)/5-(NumberTyper.WINDOW_HEIGHT-12)/10+Equation.getYSizeReal(fontSize)/2);
			g.fillText("8", this.x1+6+ 1*(NumberTyper.WINDOW_WIDTH-12)/3+(NumberTyper.WINDOW_WIDTH-12)/6-Equation.getXSize(fontSize)/2, this.y1+6+this.DISPLAY_HEIGHT+3*(NumberTyper.WINDOW_HEIGHT-12)/5-(NumberTyper.WINDOW_HEIGHT-12)/10+Equation.getYSizeReal(fontSize)/2);
			g.fillText("9", this.x1+6+ 2*(NumberTyper.WINDOW_WIDTH-12)/3+(NumberTyper.WINDOW_WIDTH-12)/6-Equation.getXSize(fontSize)/2, this.y1+6+this.DISPLAY_HEIGHT+3*(NumberTyper.WINDOW_HEIGHT-12)/5-(NumberTyper.WINDOW_HEIGHT-12)/10+Equation.getYSizeReal(fontSize)/2);
			
			g.fillText("BS", this.x1+6+ 0*(NumberTyper.WINDOW_WIDTH-12)/3+(NumberTyper.WINDOW_WIDTH-12)/6-Equation.getXSize(fontSize)/2-Equation.getXSize(fontSize)/2, this.y1+6+this.DISPLAY_HEIGHT+4*(NumberTyper.WINDOW_HEIGHT-12)/5-(NumberTyper.WINDOW_HEIGHT-12)/10+Equation.getYSizeReal(fontSize)/2);
			g.fillText("0", this.x1+6+ 1*(NumberTyper.WINDOW_WIDTH-12)/3+(NumberTyper.WINDOW_WIDTH-12)/6-Equation.getXSize(fontSize)/2								  , this.y1+6+this.DISPLAY_HEIGHT+4*(NumberTyper.WINDOW_HEIGHT-12)/5-(NumberTyper.WINDOW_HEIGHT-12)/10+Equation.getYSizeReal(fontSize)/2);
			g.fillText("Ent", this.x1+6+ 2*(NumberTyper.WINDOW_WIDTH-12)/3+(NumberTyper.WINDOW_WIDTH-12)/6-Equation.getXSize(fontSize)/2-Equation.getXSize(fontSize) , this.y1+6+this.DISPLAY_HEIGHT+4*(NumberTyper.WINDOW_HEIGHT-12)/5-(NumberTyper.WINDOW_HEIGHT-12)/10+Equation.getYSizeReal(fontSize)/2);
		}
	}
	
	processButton(e) {
	    var x = e.getX;
		var y = e.getY;		
		if(x > this.x1+6 +0*(NumberTyper.WINDOW_WIDTH-12)/3 && x < this.x1+6 +1*(NumberTyper.WINDOW_WIDTH-12)/3 && y > this.y1+6+this.DISPLAY_HEIGHT+0*(NumberTyper.WINDOW_HEIGHT-12)/5 && y < this.y1+6+this.DISPLAY_HEIGHT+1*(NumberTyper.WINDOW_HEIGHT-12)/5)
			this.eqString += "1";
		if(x > this.x1+6 +1*(NumberTyper.WINDOW_WIDTH-12)/3 && x < this.x1+6 +2*(NumberTyper.WINDOW_WIDTH-12)/3 && y > this.y1+6+this.DISPLAY_HEIGHT+0*(NumberTyper.WINDOW_HEIGHT-12)/5 && y < this.y1+6+this.DISPLAY_HEIGHT+1*(NumberTyper.WINDOW_HEIGHT-12)/5)
			this.eqString += "2";
		if(x > this.x1+6 +2*(NumberTyper.WINDOW_WIDTH-12)/3 && x < this.x1+6 +3*(NumberTyper.WINDOW_WIDTH-12)/3 && y > this.y1+6+this.DISPLAY_HEIGHT+0*(NumberTyper.WINDOW_HEIGHT-12)/5 && y < this.y1+6+this.DISPLAY_HEIGHT+1*(NumberTyper.WINDOW_HEIGHT-12)/5)
			this.eqString += "3";
		if(x > this.x1+6 +0*(NumberTyper.WINDOW_WIDTH-12)/3 && x < this.x1+6 +1*(NumberTyper.WINDOW_WIDTH-12)/3 && y > this.y1+6+this.DISPLAY_HEIGHT+1*(NumberTyper.WINDOW_HEIGHT-12)/5 && y < this.y1+6+this.DISPLAY_HEIGHT+2*(NumberTyper.WINDOW_HEIGHT-12)/5)
			this.eqString += "4";
		if(x > this.x1+6 +1*(NumberTyper.WINDOW_WIDTH-12)/3 && x < this.x1+6 +2*(NumberTyper.WINDOW_WIDTH-12)/3 && y > this.y1+6+this.DISPLAY_HEIGHT+1*(NumberTyper.WINDOW_HEIGHT-12)/5 && y < this.y1+6+this.DISPLAY_HEIGHT+2*(NumberTyper.WINDOW_HEIGHT-12)/5)
			this.eqString += "5";
		if(x > this.x1+6 +2*(NumberTyper.WINDOW_WIDTH-12)/3 && x < this.x1+6 +3*(NumberTyper.WINDOW_WIDTH-12)/3 && y > this.y1+6+this.DISPLAY_HEIGHT+1*(NumberTyper.WINDOW_HEIGHT-12)/5 && y < this.y1+6+this.DISPLAY_HEIGHT+2*(NumberTyper.WINDOW_HEIGHT-12)/5)
			this.eqString += "6";
		if(x > this.x1+6 +0*(NumberTyper.WINDOW_WIDTH-12)/3 && x < this.x1+6 +1*(NumberTyper.WINDOW_WIDTH-12)/3 && y > this.y1+6+this.DISPLAY_HEIGHT+2*(NumberTyper.WINDOW_HEIGHT-12)/5 && y < this.y1+6+this.DISPLAY_HEIGHT+3*(NumberTyper.WINDOW_HEIGHT-12)/5)
			this.eqString += "7";
		if(x > this.x1+6 +1*(NumberTyper.WINDOW_WIDTH-12)/3 && x < this.x1+6 +2*(NumberTyper.WINDOW_WIDTH-12)/3 && y > this.y1+6+this.DISPLAY_HEIGHT+2*(NumberTyper.WINDOW_HEIGHT-12)/5 && y < this.y1+6+this.DISPLAY_HEIGHT+3*(NumberTyper.WINDOW_HEIGHT-12)/5)
			this.eqString += "8";
		if(x > this.x1+6 +2*(NumberTyper.WINDOW_WIDTH-12)/3 && x < this.x1+6 +3*(NumberTyper.WINDOW_WIDTH-12)/3 && y > this.y1+6+this.DISPLAY_HEIGHT+2*(NumberTyper.WINDOW_HEIGHT-12)/5 && y < this.y1+6+this.DISPLAY_HEIGHT+3*(NumberTyper.WINDOW_HEIGHT-12)/5)
			this.eqString += "9";
		if(x > this.x1+6 +0*(NumberTyper.WINDOW_WIDTH-12)/3 && x < this.x1+6 +1*(NumberTyper.WINDOW_WIDTH-12)/3 && y > this.y1+6+this.DISPLAY_HEIGHT+3*(NumberTyper.WINDOW_HEIGHT-12)/5 && y < this.y1+6+this.DISPLAY_HEIGHT+4*(NumberTyper.WINDOW_HEIGHT-12)/5)
			if(this.eqString.length() > 0)
				this.eqString = this.eqString.substring(0,this.eqString.length()-1);
		if(x > this.x1+6 +1*(NumberTyper.WINDOW_WIDTH-12)/3 && x < this.x1+6 +2*(NumberTyper.WINDOW_WIDTH-12)/3 && y > this.y1+6+this.DISPLAY_HEIGHT+3*(NumberTyper.WINDOW_HEIGHT-12)/5 && y < this.y1+6+this.DISPLAY_HEIGHT+4*(NumberTyper.WINDOW_HEIGHT-12)/5)
			this.eqString += "0";
		if(x > this.x1+6 +2*(NumberTyper.WINDOW_WIDTH-12)/3 && x < this.x1+6 +3*(NumberTyper.WINDOW_WIDTH-12)/3 && y > this.y1+6+this.DISPLAY_HEIGHT+3*(NumberTyper.WINDOW_HEIGHT-12)/5 && y < this.y1+6+this.DISPLAY_HEIGHT+4*(NumberTyper.WINDOW_HEIGHT-12)/5)
			this.eqDone = true;
	}
	
	isEqDone() {
		return this.eqDone;
	}
	
	getEquation() {
		return this.eqString;
	}

	addText(m, center) {
		debugger;
		console.log("NumberTyper adding text");
		super.addText(m, center);
	}

}

NumberTyper.WINDOW_HEIGHT = 300;
NumberTyper.WINDOW_WIDTH = 200;

NumberTyper.fill3DRect = function(g, x, y, width, height) {
    g.fillStyle = "white";
    g.fillRect(x,y,width,height-2);
    g.fillStyle = "#444444";
    g.fillRect(x+1,y+2,width-1,height-2);
    g.fillStyle = "#AAAAAA";
    g.fillRect(x+1,y+1,width-2,height-2);
    
}
	