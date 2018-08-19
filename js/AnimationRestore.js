class AnimationRestore extends Animation{
	
	//a = x-coordinate, b = y-coordinate, c = length of display, d = height of display
	
	constructor(m) {
		super("Restore");
		this.file = "Restore.png";
		this.tic = 0;
		this.maxTics = 30;
		this.aniWidth = 960/5;
		this.aniHeight = 960/5;
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
		//System.out.println(data.get(0) + " " + data.get(1) + " " + data.get(2) + " " + data.get(3));
		g.drawImage(this.gfx, (this.frame%this.aniRowNumber)*this.aniWidth, Math.floor(this.frame/this.aniRowNumber)*this.aniHeight, this.aniWidth, this.aniHeight, 
		                Battle.MAIN_WINDOW_X1 + Math.floor((Battle.MAIN_WINDOW_X2-Battle.MAIN_WINDOW_X1)*1/4), 
		                Battle.MAIN_WINDOW_Y1 + Math.floor((Battle.MAIN_WINDOW_Y2-Battle.MAIN_WINDOW_Y1)*1/8),
		                (Battle.MAIN_WINDOW_X2-Battle.MAIN_WINDOW_X1)/2, 
		                Math.floor((Battle.MAIN_WINDOW_Y2-Battle.MAIN_WINDOW_Y1)*6/8))


		this.tic++;
		this.frame = this.tic;
		if(this.tic == this.maxTics) {
			this.mon.restore();
			this.setFinished(true);
		}
		//System.out.println(tic + " " + finished);
	}

}
