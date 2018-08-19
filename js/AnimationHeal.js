class AnimationHeal extends Animation{
	

	//a = x-coordinate, b = y-coordinate, c = length of display, d = height of display
	constructor(tar, a, b, c, d) {
		super("Heal",a,b,c,d);
		if(tar instanceof Monster) {
		    this.mon = tar;
		}
		else {
		    this.play = tar;
		}
		this.file = "Heal1.png";
		this.tic = 0;
		this.maxTics = 50;
		this.aniWidth = 960/5;
		this.aniHeight = 960/5;
		this.aniRowNumber = 5;
		this.frame = 0;
		//inc = true;
		
		this.loadLock = true;
		this.gfx = document.createElement("img");
		this.gfx.src = "battle/" + this.file;
		this.gfx.onload = function() {this.loadLock = false;}.bind(this);
	}

	
	paintAnimation(g) {
		if(this.loadLock) return;
		g.drawImage(this.gfx, (this.frame%this.aniRowNumber)*this.aniWidth, Math.floor(this.frame/this.aniRowNumber)*this.aniHeight, this.aniWidth, this.aniHeight, 
		                 	  this.data[0]+this.data[2]/2-this.aniWidth/2, this.data[1]-60, this.aniWidth, Math.floor(this.data[3]*9/8) + 60);
		this.tic++;
		this.frame++;
		if(this.tic == this.maxTics) this.setFinished(true);
	}

}
