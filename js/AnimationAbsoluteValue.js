class AnimationAbsoluteValue extends Animation{
	
	//a = x-coordinate, b = y-coordinate, c = length of display, d = height of display
	
	constructor(m, a, b, c, d) {
		super("Absolute Value",a,b,c,d);
		this.file = "AbsoluteValue.png";
		this.tic = 0;
		this.maxTics = 25;
		this.aniWidth = 960/5;
		this.aniHeight = 960/5;
		this.aniRowNumber = 5;
		this.frame = 0;
		this.mon = m;
		
		this.loadLock = true;
		this.gfx = document.createElement("img");
		this.gfx.src = "battle/" + this.file;
		this.gfx.onload = function() {this.loadLock = false;}.bind(this);
	}
	
	paintAnimation(g) {
		if(this.loadLock) return;
		g.drawImage(this.gfx, 
		           (this.frame%this.aniRowNumber)*this.aniWidth, 
				   Math.floor(this.frame/this.aniRowNumber)*this.aniHeight, 
				   this.aniWidth, 
				   this.aniHeight,
				   this.data[0]-this.data[2]/5, 
		           this.data[1]-this.data[3]/5, 
		           this.data[0]+this.data[2]/2+this.data[2]/5 -(this.data[0]-this.data[2]/5) , 
		           this.data[1] + this.data[3]+this.data[3]/5 -(this.data[1]-this.data[3]/5));
		
		g.drawImage(this.gfx, 
		           (this.frame%this.aniRowNumber)*this.aniWidth, 
				   Math.floor(this.frame/this.aniRowNumber)*this.aniHeight, 
				   this.aniWidth, 
				   this.aniHeight,
				   this.data[0]+this.data[2]/2-this.data[2]/5, 
		           this.data[1]-this.data[3]/5, 
		           this.data[0]+this.data[2]+this.data[2]/5 - (this.data[0]+this.data[2]/2-this.data[2]/5), 
		           this.data[1] + this.data[3]+this.data[3]/5 - (this.data[1]-this.data[3]/5));
		
		this.tic++;
		this.frame = this.tic;
		if(this.tic == 15) this.mon.absoluteValue();
		if(this.tic == this.maxTics) this.setFinished(true);
	}

}
