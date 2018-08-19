class AnimationPoke extends Animation{
	
	//a = x-coordinate, b = y-coordinate, c = length of display, d = height of display
	
	constructor(a, b, c, d) {
		super("Poke",a,b,c,d);
		this.file = "Poke.png";
		this.tic = 0;
		this.maxTics = 35;
		this.aniWidth = 512;
		this.aniHeight = 512;
		this.aniRowNumber = 1;
		this.forward = 1;
		this.frame = 0;
		this.loadLock = true;
		this.gfx = document.createElement("img");
		this.gfx.src = "battle/" + this.file;
		this.gfx.onload = function() {this.loadLock = false;}.bind(this);
	
	
	}
	
	paintAnimation(g) {
	    if(this.loadLock) return;
		//System.out.println(data.get(0) + " " + data.get(1) + " " + data.get(2) + " " + data.get(3));
		
		
		g.drawImage(this.gfx, 0,0, 512, 512, this.data[0]-90 + this.frame, this.data[1], 100, 100);
		this.tic++;
		this.frame += 5 * this.forward;
		if(this.tic % 5 == 0) this.forward *= -1;
		if(this.tic == this.maxTics) this.setFinished(true);
	}

}
