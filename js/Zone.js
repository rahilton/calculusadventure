class Zone {
	
	constructor(n, mc, sC, bgNum) {
		this.name = n;
		this.maxCounter = mc;
		this.startingCounter = sC;
		this.monsterNums = [];
		this.prob = [];
		this.counter = Math.floor(Math.random() * sC);
		this.backgroundNum = bgNum;
	}
	
	addMonster(mnum, pr) {
		this.monsterNums.push(mnum);
		this.prob.push(pr);
	}
	
	addCounter() {
		//System.out.println("Counter="+counter+" maxCounter="+maxCounter);
		this.counter++;
		if(this.counter == this.maxCounter) {
			this.counter = Math.floor(Math.random() * this.startingCounter);
			var totalPercent = 0;
			for(var i = 0; i < this.prob.length; i++) {
				totalPercent += this.prob[i];
			}
			var rnd = Math.floor(Math.random()*totalPercent);
			for(var i = 0; i < this.prob.length; i++) {
				totalPercent -= this.prob[i];
				if(rnd > totalPercent) {
					return this.monsterNums[i];
				}
			}
			return this.monsterNums[this.monsterNums.length-1];
		}
		return -1;
	}
	
	getName() {
		return this.name;
	}
	
	getBackground() {
		return this.backgroundNum;
	}
}
