class AnimationIntegrate extends Animation{
	
	//a = x-coordinate, b = y-coordinate, c = length of display, d = height of display
	
	constructor(m, s, a, b, c, d) {
		super(s,a,b,c,d);
		this.file = "Integrate.png";
		this.tic = 0;
		this.maxTics = 58;
		this.aniWidth = 960/5;
		this.aniHeight = 960/5;
		this.aniRowNumber = 5;
		this.frame = 0;
		this.fontSize = 128;
		this.mon = m;
		this.loadLock = true;
		this.gfx = document.createElement("img");
		this.gfx.src = "battle/" + this.file;
		this.gfx.onload = function() {this.loadLock = false;}.bind(this);
	
	
	}
	
	paintAnimation(g) {
	    if(this.loadLock) return;
		//System.out.println(this.data[0] + " " + this.data[1] + " " + this.data[2] + " " + this.data[3]);
		//g.drawImage(gfx, this.data[0]+this.data[2]/2-this.aniWidth, this.data[1] + this.data[3]/2-this.aniHeight, this.data[0] + this.data[2]/2+this.aniWidth, this.data[1] + this.data[3]/2+this.aniHeight,
		//		   (this.frame%this.aniRowNumber)*this.aniWidth, (this.frame/this.aniRowNumber)*this.aniHeight, (this.frame%this.aniRowNumber+1)*this.aniWidth, (this.frame/this.aniRowNumber+1)*this.aniHeight, null);
		g.drawImage(this.gfx, (this.frame%this.aniRowNumber)*this.aniWidth, Math.floor(this.frame/this.aniRowNumber)*this.aniHeight, this.aniWidth, this.aniHeight, 
		                 (Battle.MAIN_WINDOW_X1+Battle.MAIN_WINDOW_X2)/2-this.aniWidth, (Battle.MAIN_WINDOW_Y1+Battle.MAIN_WINDOW_Y2)/2-this.aniHeight, 2*this.aniWidth, 2*this.aniHeight);
		var lowerLimit = parseInt(this.type.split(" ")[1]);
		var upperLimit = parseInt(this.type.split(" ")[2]);
		this.tic++;
		this.frame++;
		if(this.tic == 10) this.mon.integrate(lowerLimit, upperLimit);
		if(this.tic > 5 && this.tic < 40) {
			if (this.tic%3 == 0) this.frame-=3;
			g.font = "bold 200px Courier New";
			g.fillStyle = "black";
			g.fillText("∫" , this.data[0]+this.data[2]/2-60+2, this.data[1]+this.data[3]/2+80+2);
			g.fillStyle = "white";
			g.fillText("∫" , this.data[0]+this.data[2]/2-60, this.data[1]+this.data[3]/2+80);
		}
		if(this.tic > 10 && this.fontSize > 0) {
			this.fontSize -=4;
			g.font = "bold " + this.fontSize + "px Courier New";
			g.fillStyle = "black";
			g.fillText(lowerLimit.toString(), this.data[0]+this.data[2]/2-this.fontSize/2+2, this.data[1]+this.data[3]/2+this.fontSize+2);
			g.fillStyle = "white";
			g.fillText(lowerLimit.toString(), this.data[0]+this.data[2]/2-this.fontSize/2, this.data[1]+this.data[3]/2+this.fontSize);
		}
		if(this.tic > 10 && this.fontSize > 0) {
			this.fontSize -=4;
			g.font = "bold " + this.fontSize + "px Courier New";
			g.fillStyle = "black";
			g.fillText(upperLimit.toString(), this.data[0]+this.data[2]/2-this.fontSize/2+2, this.data[1]+this.data[3]/2-this.fontSize/2+2);
			g.fillStyle = "white";
			g.fillText(upperLimit.toString(), this.data[0]+this.data[2]/2-this.fontSize/2, this.data[1]+this.data[3]/2-this.fontSize/2);
		}
		
		if(this.tic == this.maxTics) this.setFinished(true);
	}

}
