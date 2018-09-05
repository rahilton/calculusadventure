class AnimationDarknessBlade extends Animation{
	
	//a = x-coordinate, b = y-coordinate, c = length of display, d = height of display
	
	constructor(a, b, c, d) {
		super("DarknessBlade",a,b,c,d);
		this.file = "Gash.png";
		this.tic = 0;
		this.maxTics = 58;
		this.aniWidth = 960/10;
		this.aniHeight = 960/10;
		this.aniRowNumber = 5;
		this.frame = 0;
		this.loadLock = true;
		this.gfx = document.createElement("img");
		this.gfx.src = "battle/" + this.file;
		this.gfx.onload = function() {this.loadLock = false;}.bind(this);
		
		this.blackScreen = document.createElement("canvas");
		this.blackScreen.width = "1500";
		this.blackScreen.height = "1000";
		var gf = this.blackScreen.getContext("2d");
		gf.fillStyle = "black";
		gf.fillRect(0, 0, 1500, 1000);
		this.blackLevel = 0;
		this.setBlack();
	}
	
	setBlack() {
		var pix = this.blackScreen.getContext("2d").getImageData(0,0,1500,1000);
		for(var i = 0; i < pix.data.length; i+=4) {
			pix.data[i+3] = this.blackLevel;
		}
		this.blackScreen.getContext("2d").putImageData(pix,0,0);
		
	}
	
	paintAnimation(g) {
		
	    if(this.loadLock) return;
		g.drawImage(this.blackScreen, 0, 0);
		if(this.tic < 16) {
			this.blackLevel += 16;
			if(this.blackLevel >= 256) this.blackLevel = 255;
			this.setBlack();
		}
		if(this.tic >= 40 && this.tic < 50) {
			this.frame = this.tic - 40;
			g.drawImage(this.gfx, (this.frame%this.aniRowNumber)*this.aniWidth, Math.floor(this.frame/this.aniRowNumber)*this.aniHeight, this.aniWidth, this.aniHeight, 
			                this.data[0]+50, this.data[1]-50, this.data[2], this.data[3]);
		}
		if(this.tic >= 50) {
			this.blackLevel -= 64;
			if(this.blackLevel < 0) this.blackLevel = 0;
			this.setBlack();
		}
		this.tic++;
		this.frame = this.tic;
		if(this.tic == this.maxTics) this.setFinished(true);
	}

}
