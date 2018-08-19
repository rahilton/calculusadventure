class AnimationAddPolynomial extends Animation{
	
	//a = x-coordinate, b = y-coordinate, c = length of display, d = height of display
	
	constructor(t, a, b, c, d, m) {
		super(t,a,b,c,d);
		this.file = "AddPoly.png";
		this.tic = 0;
		this.maxTics = 50;
		this.aniWidth = 960/5;
		this.aniHeight = 960/5;
		this.aniRowNumber = 5;
		this.frame = 0;
		this.fontSize = 128;
		this.plugInValue = t.substring(6);
		this.mon = m;
		
		this.loadLock = true;
		this.gfx = document.createElement("img");
		this.gfx.src = "battle/" + this.file;
		this.gfx.onload = function() {this.loadLock = false;}.bind(this);
	}
	
	paintAnimation(g) {
	    if(this.loadLock) return;
		//System.out.println(data.get(0) + " " + data.get(1) + " " + data.get(2) + " " + data.get(3));
		g.drawImage(this.gfx, 
		                (this.frame%this.aniRowNumber)*this.aniWidth, 
				        Math.floor(this.frame/this.aniRowNumber)*this.aniHeight, 
				        this.aniWidth, 
				        this.aniHeight,
				        this.data[0], 
		                this.data[1], 
		                this.data[2], 
		                this.data[3]);
		this.tic++;
		if(this.tic<40)
			this.frame = this.tic%10;
		else
			this.frame++;
		
		if(this.tic > 10 && this.fontSize > 0) {
			this.fontSize -=4;
			g.font = "bold " + this.fontSize + "px Courier New";
			g.fillStyle = "black";
			g.fillText(this.plugInValue.toString(), this.data[0]+this.data[2]/2-this.fontSize/2+2, this.data[1]+this.data[3]/2+this.fontSize/4+2);
			g.fillStyle = "white";
			g.fillText(this.plugInValue.toString(), this.data[0]+this.data[2]/2-this.fontSize/2, this.data[1]+this.data[3]/2+this.fontSize/4);
		}
		
		
		if(this.tic == this.maxTics) {
			this.setFinished(true);
			var deg = 0;
			var add = 0;
			if(this.plugInValue.indexOf('x') != -1) {
				deg = 1;
			}
			if(this.plugInValue.indexOf('²') != -1) {
				deg = 2;
			}
			if(this.plugInValue.indexOf('³') != -1) {
				deg = 3;
			}
			for(var i = 0; i < 6; i ++) {
				//System.out.print((char) (8308+i));
				if(this.plugInValue.indexOf(String.fromCharCode(8308+i)) != -1) {
					deg = 4 + i;
				}
			}
			if(deg > 0) {
				if(this.plugInValue.substring(this.plugInValue.indexOf('x') -1,this.plugInValue.indexOf('x')) === "+" || this.plugInValue.substring(this.plugInValue.indexOf('x') -1,this.plugInValue.indexOf('x')) === "-"){
					add = 1;
				}
				else
					add = parseInt(this.plugInValue.substring(Math.max(this.plugInValue.indexOf('+'),this.plugInValue.indexOf('-')) +1,this.plugInValue.indexOf('x')));
			}
			else {
				add = parseInt(this.plugInValue.substring(Math.max(this.plugInValue.indexOf('+'),this.plugInValue.indexOf('-')) +1));
			}
			if(this.plugInValue.indexOf('-') != -1) {
				add *= -1;
			}
			//System.out.println("add=" + add + " deg=" + deg);
			this.mon.addDegree(add, deg);
		}
	}

}
