class AnimationDefenseBuffer extends Animation{
	
	//a = x-coordinate, b = y-coordinate, c = length of display, d = height of display
	
	constructor(p, magLev, a, b, c, d) {
		super("Defense Buffer",a,b,c,d);
		this.file = "Buffer.png";
		this.tic = 0;
		this.maxTics = 25;
		this.aniWidth = 960/5;
		this.aniHeight = 960/5;
		this.aniRowNumber = 5;
		this.frame = 0;
		this.play=p;
		this.magicLevel = magLev;
		this.loadLock = true;
		this.gfx = document.createElement("img");
		this.gfx.src = "battle/" + this.file;
		this.gfx.onload = function() {this.loadLock = false;}.bind(this);
	}
	
	paintAnimation(g) {
	    if(this.loadLock) return;
		g.drawImage(this.gfx, (this.frame%this.aniRowNumber)*this.aniWidth, Math.floor(this.frame/this.aniRowNumber)*this.aniHeight, this.aniWidth, this.aniHeight, 
		                    this.data[0], this.data[1], this.data[2], this.data[3]);
		this.tic++;
		this.frame = this.tic;
		if(this.tic == this.maxTics) {this.setFinished(true); this.play.makeDefenseBuffer(this.magicLevel*15 + Math.floor(Math.random() * 10));}
	}

}