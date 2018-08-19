class AnimationLog extends Animation{
	
	//a = x-coordinate, b = y-coordinate, c = length of display, d = height of display
	
	constructor(a, b, c, d) {
		super("Natural Log",a,b,c,d);
		this.file = "Log.png";
		this.tic = 0;
		this.maxTics = 30;
		this.aniWidth = 960/5;
		this.aniHeight = 960/5;
		this.aniRowNumber = 5;
		this.frame = 0;
	
		this.loadLock = true;
		this.gfx = document.createElement("img");
		this.gfx.src = "battle/" + this.file;
		this.gfx.onload = function() {this.loadLock = false;}.bind(this);
	
	
	}
	
	paintAnimation(g) {
	    if(this.loadLock) return;
		//System.out.println(data[0) + " " + data[1) + " " + data[2) + " " + data[3));
		g.drawImage(this.gfx, (this.frame%this.aniRowNumber)*this.aniWidth, Math.floor(this.frame/this.aniRowNumber)*this.aniHeight, this.aniWidth, this.aniHeight, 
		                    this.data[0]+this.data[2]/2-this.aniWidth, this.data[1] + this.data[3]/2-this.aniHeight, 2*this.aniWidth, 2*this.aniHeight);
		this.tic++;
		this.frame = this.tic;
		if(this.tic == this.maxTics) this.setFinished(true);
	}

}
