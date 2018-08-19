class AnimationEther extends Animation{
	
	//a = x-coordinate, b = y-coordinate, c = length of display, d = height of display
	
	constructor(m, a, b, c, d, hi) {
		super("Ether",a,b,c,d);
		this.file = "Potion.png";
		this.tic = 0;
		this.maxTics = 15;
		this.aniWidth = 960/5;
		this.aniHeight = 960/5;
		this.aniRowNumber = 5;
		this.high = hi;
		this.frame = this.frame1 = this.frame2 = this.frame3 = 13;
		this.mon = m;
		this.loadLock = true;
		this.gfx = document.createElement("img");
		this.gfx.src = "battle/" + this.file;
		this.gfx.onload = function() {this.loadLock = false;}.bind(this);
	
		if(this.high) {
			this.data.splice(0, 1, Math.floor(this.data[0]*17/22));
			this.data.splice(1, 1, Math.floor(this.data[1]*11/16));
			this.data.splice(2, 1, this.data[2]*3);
			this.data.splice(3, 1, this.data[3]*3);
		}
		else {
			this.data.splice(0, 1, Math.floor(this.data[0]*39/44));
			this.data.splice(1, 1, Math.floor(this.data[1]*13/16));
			this.data.splice(2, 1, this.data[2]*2);
			this.data.splice(3, 1, this.data[3]*2);
		}
	}
	
	paintAnimation(g) {
	    if(this.loadLock) return;
		//System.out.println(this.data[0] + " " + this.data[1] + " " + this.data[2] + " " + this.data[3]);
		
		if(this.tic >= 0 && this.tic < 8)
		g.drawImage(this.gfx, (this.frame%this.aniRowNumber)*this.aniWidth, Math.floor(this.frame/this.aniRowNumber)*this.aniHeight, this.aniWidth, this.aniHeight, 
		            this.data[0], this.data[1], this.data[2], this.data[3]);
		if(this.tic >=3 && this.tic < 11)
		g.drawImage(this.gfx, (this.frame1%this.aniRowNumber)*this.aniWidth, Math.floor(this.frame1/this.aniRowNumber)*this.aniHeight, this.aniWidth, this.aniHeight, 
		            this.data[0]-20, this.data[1], this.data[2], this.data[3]);
		if(this.tic >=6 && this.tic < 14)
		g.drawImage(this.gfx, (this.frame2%this.aniRowNumber)*this.aniWidth, Math.floor(this.frame2/this.aniRowNumber)*this.aniHeight, this.aniWidth, this.aniHeight, 
		            this.data[0]+20, this.data[1], this.data[2], this.data[3]);
		if(this.tic >=9 && this.tic < 17)
		g.drawImage(this.gfx, (this.frame3%this.aniRowNumber)*this.aniWidth, Math.floor(this.frame3/this.aniRowNumber)*this.aniHeight, this.aniWidth, this.aniHeight, 
		            this.data[0], this.data[1], this.data[2], this.data[3]);
		
		this.tic++;
		this.frame = this.tic + 13;
		this.frame1 = this.tic + 10;
		this.frame2 = this.tic + 7;
		this.frame3 = this.tic + 4;
		if(this.tic == this.maxTics) this.setFinished(true);
	}

}
