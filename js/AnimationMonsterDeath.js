class AnimationMonsterDeath extends Animation {
	
	constructor(m) {
		super("Monster Death");
		this.maxTics = 36 + 8;
		this.monster = m;
	}
	
	paintAnimation(g) {
		this.tic++;
		if(this.tic >= this.maxTics) this.setFinished(true);
		
		var monImage = this.monster.getImage();
		this.pixels = monImage.getContext("2d").getImageData(0,0,parseInt(monImage.width),parseInt(monImage.height))
		var groupWidth = Math.floor(this.monster.getImageWidth()/18);
		var groupHeight = Math.floor(this.monster.getImageHeight()/18);
		if (groupWidth < 1) groupWidth = 1;
		if (groupHeight < 1) groupHeight = 1;
		
		for(var i = 0; i < this.tic; i++) {
			for(var j = 0; j < this.tic-i;j++) {
				this.dimBox(i * groupWidth, j * groupHeight, groupWidth, groupHeight);
				//if(tic == 18) System.out.println(i * groupWidth + " " + j * groupHeight + " " + groupWidth + " " + groupHeight);
			}
		}
		
		//System.out.println("Monster Width: " + monster.getImageWidth());
			
		/*
		for(int i = 0; i < pixels.length;i +=4) {
			//System.out.println(i*4+3);
			pixels[i] = 13;
			pixels[i+1] = 13;
			pixels[i+2] = 13;
			pixels[i+3] = 0;
		}*/
	
		monImage.getContext("2d").putImageData(this.pixels, 0, 0);
	}
	
	dimBox(x, y, width, height) {
		//if(tic == 18) System.out.println("x=" + x + " y=" + y + " width=" + width+ " height=" +height);
		for(var i = 0; i < height; i++) {
			for(var j = 0; j < width; j++) {
				this.dimPixel(x+j,y+i);
			}
		}
	}
	
	dimPixel(x, y) {
		//if(tic == 36) System.out.println("x=" + x + " y= " + y);
		if(x < this.monster.getImageWidth() && y < this.monster.getImageHeight()) {
			this.pixels.data[((y*this.monster.getImageWidth() + x) * 4)+3] -= 64;
			if(this.pixels.data[((y*this.monster.getImageWidth() + x) * 4)+3] < 0) this.pixels.data[((y*this.monster.getImageWidth() + x) * 4)+3] = 0;
		}
	}

}
