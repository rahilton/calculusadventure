class AnimationMonsterFlash extends Animation {
	
	constructor(m) {
		super("Monster Flash");
		this.monster = m;
		this.maxTics = 6;
	}
	
	paintAnimation(g) {
		this.tic++;
		if(this.tic >= this.maxTics) this.setFinished(true);
		this.monster.flash();
	}

}
