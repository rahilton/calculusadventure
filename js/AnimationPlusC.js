 class AnimationPlusC extends Animation{
	
	//a = x-coordinate, b = y-coordinate, c = length of display, d = height of display
	
	constructor(m, a, b, c, d) {
		super("Plus C",a,b,c,d);
		this.file = "PlusC.png";
		this.tic = 0;
		this.maxTics = 51;
		this.aniWidth = 960/10;
		this.aniHeight = 960/10;
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
		//System.out.println(this.data[0] + " " + this.data[1] + " " + this.data[2] + " " + this.data[3]);
		
		//Still need to fix heights and widths of data for all drawImages.
		
		if(this.tic < 20) {
			this.frame = 0;
			g.drawImage(this.gfx, (this.frame%this.aniRowNumber)*this.aniWidth, Math.floor(this.frame/this.aniRowNumber)*this.aniHeight, this.aniWidth, this.aniHeight, 
			                    this.data[0]+Math.floor(this.data[2]/2)-(Math.floor(this.data[2]/20)*this.tic), this.data[1] + this.data[3] - Math.floor(this.data[3]/8), Math.floor(this.data[2]/20)*this.tic, this.data[3]/8);
			this.frame = 1;
			g.drawImage(this.gfx, (this.frame%this.aniRowNumber)*this.aniWidth, Math.floor(this.frame/this.aniRowNumber)*this.aniHeight, this.aniWidth, this.aniHeight, 
			                    this.data[0]+Math.floor(this.data[2]/2), this.data[1] + this.data[3] - Math.floor(this.data[3]/8), Math.floor(this.data[2]/20)*this.tic, Math.floor(this.data[3]/8));
		}
		if(this.tic >= 20 && this.tic <= 40) {
			this.frame = 0;
			g.drawImage(this.gfx, (this.frame%this.aniRowNumber)*this.aniWidth, Math.floor(this.frame/this.aniRowNumber)*this.aniHeight, this.aniWidth, this.aniHeight, 
			                    this.data[0]-Math.floor(this.data[2]/2), 
			                    this.data[1] + this.data[3] - Math.floor(this.data[3]/8) - (this.data[3]*7*(this.tic-20)/160), 
			                    this.data[2], 
			                    Math.floor(this.data[3]/8) + (this.data[3]*7*(this.tic-20)/160));
			this.frame = 1;
			g.drawImage(this.gfx, (this.frame%this.aniRowNumber)*this.aniWidth, Math.floor(this.frame/this.aniRowNumber)*this.aniHeight, this.aniWidth, this.aniHeight, 
			                    this.data[0]+Math.floor(this.data[2]/2), 
			                    this.data[1] + this.data[3] - Math.floor(this.data[3]/8) - (this.data[3]*7*(this.tic-20)/160), 
			                    this.data[2], 
			                    Math.floor(this.data[3]/8) + (this.data[3]*7*(this.tic-20)/160) );
		}
		if(this.tic == 40) this.frame = 4;
		
		if(this.frame == 4 || this.frame == 5 || this.frame == 8 || this.frame == 13 || this.frame == 16 || this.frame == 20 || this.frame == 21 || this.frame == 22 || this.frame == 23 || this.frame == 24) {
			
			

			g.drawImage(this.gfx, (this.frame%this.aniRowNumber)*this.aniWidth, Math.floor(this.frame/this.aniRowNumber)*this.aniHeight, this.aniWidth, this.aniHeight, 
			                    this.data[0], this.data[1], this.data[2], this.data[3]);
			this.frame++;
			if(this.frame == 17) {
				g.drawImage(this.gfx, (this.frame%this.aniRowNumber)*this.aniWidth, Math.floor(this.frame/this.aniRowNumber)*this.aniHeight, this.aniWidth, this.aniHeight, 
				                this.data[0], this.data[1]-this.data[3], this.data[2], this.data[3]);
				this.frame++;
			}
		}
		else if (this.frame > 1){
			g.drawImage(this.gfx, (this.frame%this.aniRowNumber)*this.aniWidth, Math.floor(this.frame/this.aniRowNumber)*this.aniHeight, this.aniWidth, this.aniHeight, 
			                    this.data[0]-this.data[2]/2, this.data[1], this.data[2], this.data[3]);
			this.frame++;
			g.drawImage(this.gfx, (this.frame%this.aniRowNumber)*this.aniWidth, Math.floor(this.frame/this.aniRowNumber)*this.aniHeight, this.aniWidth, this.aniHeight, 
			                    this.data[0]+this.data[2]/2, this.data[1], this.data[2], this.data[3]);
			this.frame++;
		}
		this.tic++;
		//this.frame = this.tic;
		if(this.tic == this.maxTics) this.setFinished(true);
	}

}
