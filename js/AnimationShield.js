class AnimationShield extends Animation{
	
	//a = x-coordinate, b = y-coordinate, c = length of display, d = height of display
	
	constructor(m, a, b, c, d) {
		super("Shield",a,b,c,d);
		this.file = "Shield.png";
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
		//System.out.println(data.get(0) + " " + data.get(1) + " " + data.get(2) + " " + data.get(3));
		g.drawImage(this.gfx,(this.frame%this.aniRowNumber)*this.aniWidth, Math.floor(this.frame/this.aniRowNumber)*this.aniHeight, this.aniWidth, this.aniHeight, 
		                    this.data[0] + this.data[2]/2-this.aniWidth*2, 
		                    this.data[1] + this.data[3]/2-this.aniHeight, 
		                    this.aniWidth*4, 
		                    Math.floor(this.aniHeight*2.5));
		this.tic++;
		this.frame = this.tic;
		if(this.tic == this.maxTics) this.setFinished(true);
	}

}
