class WindowMessage {
	
	constructor(m, t, i, ap) {
	    if(typeof t == "undefined") {
	        t = "Display";
	        i = "";
	        ap = true;
	    }
	    else if(typeof t == "boolean") {
	        ap = t;
	        t = "Display";
	        i = "";
	    }
	    else if(typeof i == "boolean") {
	        ap = i;
	        i = "";
	    }
	    if(typeof ap == "undefined") {
	        ap = true;
	    }
	    this.message = m;
		this.type = t;
		this.id = i;
		this.optionOffset = 0;
		this.appearing = ap;
	    this.options = [];
    	this.valid = [];
    	this.special = [];
		
	}
	
	getMessage() {
		return this.message;
	}
	
	setMessage(mes) {
		return this.message = mes;
	}
	
	setType(s) {
		this.type = s;
	}
	
	setBust(bustFile) {
		this.bust = bustFile;
	}
	
	isBust() {
		if (this.bust == null || this.bust == undefined) {
			return false;
		}
		return true;
	}
	
	getBust() {
		return this.bust;
	}
	
	getType() {
		return this.type;
	}
	
	maxOptionLength() {
		if(this.options.length > 0) {
			var max = this.options[0].length;
			for(var i = 0; i < this.options.length;i++) {
				max = Math.max(max, this.options[i].length);
			}
			return max;
		}
		return 0;
	}
	
	addOption(o) {
		this.options.push(o);
		this.valid.push(true);
		this.special.push(false);
	}
	
	getOptionSize() {
		return this.options.length;
	}
	
	getOption(i) {
		if(this.options.length > i)
			return this.options[i];
		return "";
	}
	
	setValid(val, i) {
		this.valid.splice(i, 1, val);
	}
	
	getValid(i) {
		return this.valid[i];
	}
	
	setSpecial(val, i) {
		this.special.splice(i, 1, val);
	}
	
	getSpecial(i) {
		return this.special[i];
	}
	
	
	getOptionOffset() {
		return this.optionOffset;
	}
	
	setOptionOffset(o) {
		this.optionOffset = o;
	}
	
	getAppearing() {
		return this.appearing;
	}
	
	setAppearing(a) {
		this.appearing = a;
	}

}
