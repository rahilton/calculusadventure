class AnimationDamage extends Animation {
	
	//a = x-coordinate of damage
	//b = y-coordinate of damage
	//c = the actual damage. Negative for damage, positive for heal
	
	constructor(s, a, b, c, reaTic) {
		super(s,a,b,c);
		this.type = s;
		this.maxTics = 36;
		this.readyTics = this.maxTics*2/3;
		this.digits = [];
		this.readyTics = reaTic;
		var damage = Math.abs(c);
		while(damage>0) {
			this.digits.push(damage % 10);
			damage /= 10;
			damage = Math.floor(damage);
		}
		if (this.digits.length == 0) this.digits.push(0);
		if (c <= 0) 
			this.damageType = "Subtract";
		else
			this.damageType = "Add";
	}
	
	paintAnimation(g) {
		this.tic++;
		if(this.tic >= this.maxTics) this.setFinished(true);
		if(this.tic == this.readyTics) this.setReady(true);
		g.font = "bold " + this.fontSize + "px Courier New";
		for(var i = 0; i < this.digits.length;i++) {
			if(this.tic > i*2) {
				var adj = Math.floor(100.0*Math.abs(Math.pow(Math.E, -(this.tic-i*2)/2.0)*Math.cos((this.tic-i*2)/2.0)));
				g.fillStyle = "black"
				g.fillText((this.digits[i]).toString(), this.data[0] - (this.digits.length*Equation.getXSize(32))/2+ 2 +(this.digits.length - i -1) * Equation.getXSize(32), this.data[1] - adj + 2);
				if(this.damageType === "Subtract")
					g.fillStyle = "white";
				else
					g.fillStyle = "#00FF00";
				if(this.type === "SP Heal") g.fillStyle = "red";
				if(this.type === "MP Heal") g.fillStyle = "blue";
				if(this.type === "SP Damage") g.fillStyle = "yellow";
				if(this.type === "MP Damage") g.fillStyle = "#770077"; 
				g.fillText((this.digits[i]).toString(), this.data[0] - (this.digits.length*Equation.getXSize(32))/2+ (this.digits.length - i - 1) * Equation.getXSize(32), this.data[1] - adj);
			}
		}
	}
}

AnimationDamage.fontSize = 32;
