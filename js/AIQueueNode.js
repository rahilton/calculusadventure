
class AIQueueNode {

	constructor(attack, next) {
	    if(typeof next === "undefined") {
	        this.next = null;
	    }
	    else {
	        this.next = next;
	    }
	    this.att = attack;
	    this.done = false;
	}
	
	getAttack() {
		if(this.allAreDone()) this.resetQueue();
		if(!this.done) {
			this.done = true;
			return this.att.getAttack();
		}
		else
			return this.next.getAttack();
	}
	
	isDone() {
		return this.done;
	}
	
	setDone(d) {
		this.done = d;
	}
	
	getNext() {
		return this.next;
	}
	
	allAreDone() {
		if(!this.done) return false;
		var ne = this.next;
		while(ne != null) {
			if(!ne.isDone()) return false;
			ne = ne.getNext();
		}
		return true;
	}
	
	resetQueue() {
		this.done = false;
		var ne = this.next;
		while(ne != null) {
			ne.setDone(false);
			ne = ne.getNext();
		}
	}
}