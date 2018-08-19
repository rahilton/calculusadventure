class Message {

	constructor(s, d1, d2, d3) {
	    this.type = s;
	    this.data = [];
	    if(d1 instanceof Question) {
	        this.qdata = d1;
	    }
	    else {
	        if(typeof d1 == "number") this.data.push(d1); else this.data.push(-1);
	        if(typeof d2 == "number") this.data.push(d2); else this.data.push(-1);
	        if(typeof d3 == "number") this.data.push(d3); else this.data.push(-1);
	    }
	}

	
	getType() {
		return this.type;
	}
	
	getData(n) {
		if(typeof n === "undefined") {
			n = 0;
		}
		return this.data[n];
	}
	
	getQData() {
		return this.qdata;
	}
	
}
