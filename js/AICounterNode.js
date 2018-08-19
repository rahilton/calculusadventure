class AICounterNode {
	

	constructor(maxCounter, attack, next, reset) {
	    this.maxCounter = maxCounter;
	    this.attack = attack;
	    this.next = next;
	    this.reset = reset;
	    this.count = 0;
	}
	
	getAttack() {
		this.count++;
		if(this.count == this.maxCounter) {
			if(this.reset) this.count = 0;
			return this.attack.getAttack();
			
		}
		return this.next.getAttack();
	}
}
