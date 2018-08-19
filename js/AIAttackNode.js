class AIAttackNode {
	
	constructor(attack, monster, multiplier) {
	    if(typeof multiplier === "undefined") {
	        this.multiplier = 1;
	    }
	    else{
	        this.multiplier = multiplier;
	    }
	    this.monster = monster;
	    this.attack = attack;
	    
	}
	
	getAttack() {
		return this.monster.getAttackAnimation(this.attack,this.monster,this.multiplier);
	}

}