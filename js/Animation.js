// var WindowMessage = require("WindowMessage.js");

class Animation {
	

	constructor(t, a, b, c, d) {
	    this.type = t;
		this.started = this.finished = this.ready = false;
		this.msg = [];
		this.next = null;
		this.winData = [];
		this.data = [];
		this.tic = 0;
		this.maxTics = 0;
		if(a instanceof WindowMessage) {
		    this.winData.push(a);
		} 
		else {
		    if(typeof a !== "undefined") this.data.push(a);
		    if(typeof b !== "undefined") this.data.push(b);
		    if(typeof c !== "undefined") this.data.push(c);
		    if(typeof d !== "undefined") this.data.push(d);
		}
	}
	
	paintAnimation(g) {
		this.tic++;
		if(this.type==="BlackOut") return;
		if(this.tic >= this.maxTics) this.setFinished(true);
	}
	
	setMaxTic(t) {
		this.maxTics = t;
	}
	
	getType() {
		return this.type;
	}
	
	getReady() {
		return this.ready;
	}
	
	setReady(newReady) {
		this.ready = newReady;
	}
	
	getStarted() {
		return this.started;
	}
	
	getFinished() {
		return this.finished;
	}
	
	setStarted(s) {
		this.started = s;
	}
	
	hasMessage() {
		if(this.msg.length == 0)
			return false;
		else
			return true;
	}
	
	addMessage(m) {
		this.msg.push(m);
	}
	
	getMessage() {
		return this.msg.shift();
	}
	
	setFinished(f) {
		this.finished = f;
	}
	
	hasNext() {
		if(this.next == null)
			return false;
		else
			return true;
	}
	
	setNext(a) {
		this.next = a;
	}
	
	getNext() {
		return this.next;
	}
	
	addData(d) {
		this.data.push(d);
	}
	
	getData(i) {
		return this.data[i];
	}
	
	getWinData(i) {
		return this.winData[i];
	}

}
// module.exports = Animation;
