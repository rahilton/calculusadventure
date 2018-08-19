class AnimationDoubleDerivative extends Animation{
	
	//a = x-coordinate, b = y-coordinate, c = length of display, d = height of display
	
	constructor(m, a, b, c, d) {
		super("Double Derivative",a,b,c,d);
		this.file1 = "Derivative.png";
		this.file2 = "DoubleDerivative.png";
		this.tic = 0;
		this.maxTics = 36;
		this.aniWidth = 960/5;
		this.aniHeight = 960/5;
		this.aniRowNumber = 5;
		this.frame1 = 0;
		this.frame2 = 0;
		this.frame3 = 0;
		this.mon = m;
		this.loadLock = 2;
		this.gfx1 = document.createElement("img");
		this.gfx1.src = "battle/" + this.file1;
		this.gfx1.onload = function() {this.loadLock--;}.bind(this);
		this.gfx2 = document.createElement("img");
		this.gfx2.src = "battle/" + this.file2;
		this.gfx2.onload = function() {this.loadLock--;}.bind(this);
		
		
	}
	
	paintAnimation(g) {
	    if(this.loadLock > 0) return;
		//System.out.println(data.get(0) + " " + data.get(1) + " " + data.get(2) + " " + data.get(3));
		g.drawImage(this.gfx1, (this.frame1%this.aniRowNumber)*this.aniWidth, Math.floor(this.frame1/this.aniRowNumber)*this.aniHeight, this.aniWidth, this.aniHeight, 
		                  this.data[0]+this.data[2]/2 - 2*this.aniWidth, this.data[1]+this.data[3]/2-2*this.aniHeight, 4*this.aniWidth, 4*this.aniHeight);
		if(this.tic > 8)
			g.drawImage(this.gfx2, (this.frame2%this.aniRowNumber)*this.aniWidth, Math.floor(this.frame2/this.aniRowNumber)*this.aniHeight, this.aniWidth, this.aniHeight, 
			              this.data[0]+this.data[2]/2 - 2*this.aniWidth, this.data[1]+this.data[3]/2-2*this.aniHeight, 4*this.aniWidth, 4*this.aniHeight);
		if(this.tic > 16)
			g.drawImage(this.gfx1, (this.frame3%this.aniRowNumber)*this.aniWidth, Math.floor(this.frame3/this.aniRowNumber)*this.aniHeight, this.aniWidth, this.aniHeight, 
			              this.data[0]+this.data[2]/2 - 2*this.aniWidth, this.data[1]+this.data[3]/2-2*this.aniHeight, 4*this.aniWidth, 4*this.aniHeight);
		
		this.tic++;
		this.frame1 = this.tic;
		this.frame2 = this.tic - 8;
		this.frame3 = this.tic - 16;
		if(this.tic == 16) {this.mon.derivative();this.mon.derivative();}
		if(this.tic == this.maxTics) this.setFinished(true);
	}

}
