 class AnimationCookie extends Animation{
	

	//a = x-coordinate, b = y-coordinate, c = length of display, d = height of display
	
	constructor(m, a, b, c, d) {
		super("Heal",a,b,c,d);
		this.file = "Cookie.png";
		this.tic = 0;
		this.maxTics = 35;
		this.aniWidth = 960/5;
		this.aniHeight = 960/5;
		this.aniRowNumber = 5;
		this.mon = m;
		this.frame = 0;
		this.loadLock = true;
		this.gfx = document.createElement("img");
		this.gfx.src = "battle/" + this.file;
		this.gfx.onload = function() {this.loadLock = false;}.bind(this);
	
	
	}
	
	paintAnimation(g) {
		//System.out.println(data.get(0) + " " + data.get(1) + " " + data.get(2) + " " + data.get(3));
		if(this.loadLock) return;
		
		g.drawImage(this.gfx, (this.frame%this.aniRowNumber)*this.aniWidth, Math.floor(this.frame/this.aniRowNumber)*this.aniHeight, this.aniWidth, this.aniHeight, 
		                    this.data[0]-this.data[2], 
		                    this.data[1]-this.data[2]-60, 
		                    this.data[0] + this.data[2]*2 -(this.data[0]-this.data[2]), 
		                    this.data[1] + this.data[3]*2 -(this.data[1]-this.data[2]-60));
		this.tic++;
		this.frame++;
		if(this.tic == this.maxTics) this.setFinished(true);
	}

}
