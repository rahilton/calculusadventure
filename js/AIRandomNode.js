class AIRandomNode {
	
	constructor() {
	    this.nodes = [];
	    this.prob = [];
	}
	
	
	addNode(newNode, p) {
		this.nodes.push(newNode);
		this.prob.push(p);
	}
	
	
	getAttack() {
		var totalPercent = 0;
		for(var i = 0; i < this.prob.length; i++) {
			totalPercent += this.prob[i];
		}
		var rnd = parseInt(Math.random()*totalPercent, 10);
		for(var i = 0; i < this.prob.length; i++) {
			totalPercent -= this.prob[i];
			if(rnd > totalPercent) {
				return this.nodes[i].getAttack();
			}
		}
		return this.nodes[this.nodes.length-1].getAttack();
	}

}