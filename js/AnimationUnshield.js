class AnimationUnshield extends Animation{
	
	//a = x-coordinate, b = y-coordinate, c = length of display, d = height of display
	
	constructor(m, a, b, c, d, shield) {
		super("Unshield",a,b,c,d);
		this.file = "MakeShield.png";
		this.tic = 0;
		this.maxTics = 20;
		this.aniWidth = 960/5;
		this.aniHeight = 960/5;
		this.aniRowNumber = 5;
		this.frame = 0;
		this.mon = m;
		this.newShield = shield.substring(9);
		//System.out.println("newShield=" + newShield);
		this.loadLock = true;
		this.gfx = document.createElement("img");
		this.gfx.src = "battle/" + this.file;
		this.gfx.onload = function() {this.loadLock = false;}.bind(this);
	
	
	}
	
	paintAnimation(g) {
	    if(this.loadLock) return;
		//System.out.println(data.get(0) + " " + data.get(1) + " " + data.get(2) + " " + data.get(3));
		g.drawImage(this.gfx, (this.frame%this.aniRowNumber)*this.aniWidth, Math.floor(this.frame/this.aniRowNumber)*this.aniHeight, this.aniWidth, this.aniHeight, 
		                    this.data[0]+this.data[2]/2-this.aniWidth, this.data[1] + this.data[3]/2-this.aniHeight, 2*this.aniWidth, 2*this.aniHeight);
		this.tic++;
		this.frame = this.maxTics - this.tic;
		if(this.tic == this.maxTics) {this.setFinished(true); this.mon.removeShield(this.newShield);}
	}

}