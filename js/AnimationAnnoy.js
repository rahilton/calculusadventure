class AnimationAnnoy extends Animation{
	
	//a = x-coordinate, b = y-coordinate, c = length of display, d = height of display
	
	constructor(a, b, c, d) {
		super("Annoy",a,b,c,d);
		this.file = "Annoy.png";
		this.tic = 0;
		this.maxTics = 40;
		this.aniWidth = 500;
		this.aniHeight = 700;
		this.aniRowNumber = 2;
		this.loadLock = true;
		this.gfx = document.createElement("img");
		this.gfx.src = "battle/" + this.file;
		this.gfx.onload = function() {this.loadLock = false;}.bind(this);
		this.frame = 0;
	}
	
	paintAnimation(g) {
		//System.out.println(data.get(0) + " " + data.get(1) + " " + data.get(2) + " " + data.get(3));
		if(this.loadLock) return;
		
		g.drawImage(this.gfx, (this.frame%this.aniRowNumber)*this.aniWidth, Math.floor(this.frame/this.aniRowNumber)*this.aniHeight, this.aniWidth, this.aniHeight,
		                 this.data[0], this.data[1]-120, 120, 240);
		this.tic++;
		if(this.tic % 4 == 0) this.frame = 1 - this.frame; 
		if(this.tic == this.maxTics) this.setFinished(true);
	}

}
