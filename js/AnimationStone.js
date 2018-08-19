class AnimationStone extends Animation{
	
	//a = x-coordinate, b = y-coordinate, c = length of display, d = height of display
	
	constructor(p, a, b, c, d) {
		super("Stone",a,b,c,d);
		this.file = "Stone.png";
		this.tic = 0;
		this.maxTics = 25;
		this.aniWidth = 960/10;
		this.aniHeight = 960/10;
		this.aniRowNumber = 5;
		this.frame = 0;
		this.stone = 0;
		this.pla = p;
		this.loadLock = true;
		this.gfx = document.createElement("img");
		this.gfx.src = "battle/" + this.file;
		this.gfx.onload = function() {this.loadLock = false;}.bind(this);
	
	
	}
	
	paintAnimation(g) {
	    if(this.loadLock) return;
		if(this.tic < 10) {
			var randX = Math.floor(Math.random() * 5) - 2;
			var randY = Math.floor(Math.random() * 5) - 2;
			g.drawImage(this.gfx, (this.frame%this.aniRowNumber)*this.aniWidth, Math.floor(this.frame/this.aniRowNumber)*this.aniHeight, this.aniWidth, this.aniHeight, 
			                    this.data[0]+this.data[2]/2-this.aniWidth/2 + randX, 
			                    this.data[1]+this.data[3]/2-this.aniHeight/2-20 + randY, 
			                    this.aniWidth, 
			                    this.aniHeight);

		}
		this.tic++;
		this.frame = Math.floor(this.tic/2);
		if(this.tic > 10) {
			
			this.frame = 6;
			this.stone++;
			g.drawImage(this.gfx, (this.frame%this.aniRowNumber)*this.aniWidth, Math.floor(this.frame/this.aniRowNumber)*this.aniHeight, this.aniWidth, this.aniHeight, 
			                        this.data[0] + this.data[2]/2 - this.aniWidth/2+this.stone*(this.tic-11)*10, this.data[1] + this.data[3]/2 - this.aniHeight/2+this.stone*(this.tic-11)*10, this.aniWidth, this.aniHeight);
			g.drawImage(this.gfx, (this.frame%this.aniRowNumber)*this.aniWidth, Math.floor(this.frame/this.aniRowNumber)*this.aniHeight, this.aniWidth, this.aniHeight, 
			                        this.data[0] + this.data[2]/2 - this.aniWidth/2-this.stone*(this.tic-11)*10, this.data[1] + this.data[3]/2 - this.aniHeight/2+this.stone*(this.tic-11)*10, this.aniWidth, this.aniHeight);
			g.drawImage(this.gfx, (this.frame%this.aniRowNumber)*this.aniWidth, Math.floor(this.frame/this.aniRowNumber)*this.aniHeight, this.aniWidth, this.aniHeight, 
			                        this.data[0] + this.data[2]/2 - this.aniWidth/2+this.stone*(this.tic-11)*10, this.data[1] + this.data[3]/2 - this.aniHeight/2-this.stone*(this.tic-11)*10, this.aniWidth, this.aniHeight);
			g.drawImage(this.gfx, (this.frame%this.aniRowNumber)*this.aniWidth, Math.floor(this.frame/this.aniRowNumber)*this.aniHeight, this.aniWidth, this.aniHeight, 
			                        this.data[0] + this.data[2]/2 - this.aniWidth/2-this.stone*(this.tic-11)*10, this.data[1] + this.data[3]/2 - this.aniHeight/2-this.stone*(this.tic-11)*10, this.aniWidth, this.aniHeight);
		}
		if(this.tic == this.maxTics) this.setFinished(true);
	}

}
