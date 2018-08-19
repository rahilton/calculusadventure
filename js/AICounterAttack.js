class AICounterAttack {
	
	constructor(next, attack, newProb) {
	    if(typeof newProb === "undefined") {
	        this.prob = 100;
	    }
	    else {
	        this.prob = newProb;
	    }
	    this.next = next;
	    this.att = attack;
	}
	
	setProb(newProb) {
		this.prob = newProb;
	}
	
	getAttack() {
		if(Math.random() * 100 < this.prob) {
			var temp1 = this.att.getAttack();
			var holder = temp1.getNext().getNext();
			var text = temp1.getNext().getWinData(0).getMessage();
			temp1.setNext(new Animation("Add Message",new WindowMessage("Counter:"+text,false)));
			temp1.getNext().setNext(holder);
			var temp2 = this.next.getAttack();
			var first = temp1;
			while(temp1.getNext().hasNext()) temp1 = temp1.getNext();
			temp1.setNext(temp2);
			return first;
		}
		else
			return this.next.getAttack();
	}

}