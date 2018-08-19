class AnimationEvaluateAnimate extends Animation {
	
	constructor(tar) {
		super("Evaluate Animate");
        if(tar instanceof Monster) {
            this.monster = tar;
        }
        else {
            this.player = tar;
        }
        this.maxTics = 16;
	}
	
	paintAnimation(g) {
		this.tic++;
		if(typeof this.player == "undefined") {
			if(this.tic >= this.maxTics) {
				this.setFinished(true);
				this.monster.setHpBackColor(192, 192, 192);
				if(!this.monster.isHpConstant()) {
					var temp = new AnimationEvaluateAnimate(this.monster);
					temp.setNext(this.getNext());
					this.setNext(temp);
				}
			}
			if(this.tic <= AnimationEvaluateAnimate.MAXTICS)
				this.monster.evaluateAnimate();
			
			if(this.tic >= AnimationEvaluateAnimate.MAXTICS && this.tic < this.maxTics) {
				this.monster.setHpBackColor( 255- (this.tic - AnimationEvaluateAnimate.MAXTICS)*Math.floor(64/(this.maxTics-AnimationEvaluateAnimate.MAXTICS)) , 255- (this.tic - AnimationEvaluateAnimate.MAXTICS)*Math.floor(64/(this.maxTics-AnimationEvaluateAnimate.MAXTICS)), 255- (this.tic - AnimationEvaluateAnimate.MAXTICS)*Math.floor(64/(this.maxTics-AnimationEvaluateAnimate.MAXTICS)));
			}
		}
		else {
			if(!this.player.hasShield()) this.tic = this.maxTics;
			if(this.tic >= this.maxTics) {
				this.setFinished(true);
				this.player.setShieldBackColor(0, 255, 255);
				if(this.player.hasShield() && !this.player.isShieldConstant()) {
					var temp = new AnimationEvaluateAnimate(this.player);
					temp.setNext(this.getNext());
					this.setNext(temp);
				}
			}
			if(this.tic <= AnimationEvaluateAnimate.MAXTICS)
				this.player.evaluateAnimate();
			
			if(this.tic >= AnimationEvaluateAnimate.MAXTICS && this.tic < this.maxTics) {
				this.player.setShieldBackColor( 255- (this.tic - AnimationEvaluateAnimate.MAXTICS)*Math.floor(256/(this.maxTics-AnimationEvaluateAnimate.MAXTICS)) , 255,255);
			}
		}
	}

}

AnimationEvaluateAnimate.MAXTICS = 8; //the number of tics until the numbers combine