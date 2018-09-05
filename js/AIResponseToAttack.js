class AIResponseToAttack {
	
	constructor(player, node) {
	    this.player = player;
	    this.next = node;
	    this.nodes = [];
	    this.attacks = [];
	    this.repeat = [];
	}
	
    addNode(attack, newNode, repeat) {
		this.nodes.push(newNode);
		this.attacks.push(attack);
		if(typeof repeat === "undefined") {
		    this.repeat.push(true);
        }
        else {
            this.repeat.push(repeat);
        }
	}
	
	getAttack() {
		for(var i = 0; i < this.attacks.length; i++) {
			var pAttack = this.player.getLastAttack();
			if(pAttack.length >= this.attacks[i].length && pAttack.substring(0, this.attacks[i].length) === this.attacks[i]) {
				var sentBack = this.nodes[i].getAttack(); 
				if(!this.repeat[i]) {
					this.nodes.splice(i);
					this.attacks.splice(i);
					this.repeat.splice(i);
				}
				return sentBack;
			}
		}
		return this.next.getAttack();
	}
}