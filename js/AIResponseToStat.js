
class AIResponseToStat {
	
	constructor(stat, compare, target, threshold, attack, next, monster, player) {
	    this.stat = stat;
	    this.compare = compare;
	    this.target = target;
	    this.threshold = threshold;
	    this.attack = attack;
	    this.next = next;
	    this.monster = monster;
	    this.player = player;
	}
	
	getAttack() {
		if(this.target === "Monster") {
			if(this.stat === "HP") {
				if(this.compare === ">") {
					if(this.monster.isHpConstant() && this.monster.getHP() > this.threshold) {
						return this.attack.getAttack();
					}
				}
				else if(this.compare === "<") {
					if(this.monster.isHpConstant() && this.monster.getHP() < this.threshold) {
						return this.attack.getAttack();
					}
				}
				else if (this.compare === "=") {
					if(this.monster.isHpConstant() && this.monster.getHP() == this.threshold) {
						return this.attack.getAttack();
					}
				}
			}
			else if(this.stat === "Constant") {
				if(this.monster.isHpConstant())
					return this.attack.getAttack();
			}
			else if(this.stat === "Equation") {
				if(!this.monster.isHpConstant())
					return this.attack.getAttack();
			}
			else if(this.stat.length > 6 && this.stat.substring(0,6) === "Shield") {
				if(this.monster.isShielded(this.stat.substring(7)))
					return this.attack.getAttack();
			}
			else if(this.stat === "Integral Defense") {
				for(var low = 0; low < 5; low++) {
					for(var high = 5; high < 10; high++) {
						if(parseInt(this.monster.getHpEquation().integrate(low, high),10) < 1) {
							return this.attack.getAttack();
						}
					}
				}
			}
		}
		else if (this.target === "Player"){
			if(this.stat === "HP") {
				if(this.compare === ">") {
					if(this.player.getHp() > this.threshold)
						return this.attack.getAttack();
				}
				else if(this.compare ==="<") {
					if(this.player.getHp() < this.threshold)
						return this.attack.getAttack();
				}
				else if (this.compare === "=") {
					if(this.player.getHp() == this.threshold)
						return this.attack.getAttack();
				}
			}
			else if(this.stat ==="SP") {
				if(this.compare ===">") {
					if(this.player.getSp() > this.threshold)
						return this.attack.getAttack();
				}
				else if(this.compare ==="<") {
					if(this.player.getSp() < this.threshold)
						return this.attack.getAttack();
				}
				else if (this.compare === "=") {
					if(this.player.getSp() == this.threshold)
						return this.attack.getAttack();
				}
			}
			else if(this.stat === "MP") {
				if(this.compare === ">") {
					if(this.player.getMp() > this.threshold)
						return this.attack.getAttack();
				}
				else if(this.compare === "<") {
					if(this.player.getMp() < this.threshold)
						return this.attack.getAttack();
				}
				else if (this.compare === "=") {
					if(this.player.getMp() == this.threshold)
						return this.attack.getAttack();
				}
			}
			else if(this.stat === "Shield") {
				if(this.player.hasShield()) {
					return this.attack.getAttack();
				}
			}
			else if(this.stat === "Shield Constant") {
				if(this.player.isShieldConstant())
					return this.attack.getAttack();
			}
		}
		return this.next.getAttack();
	}

}
