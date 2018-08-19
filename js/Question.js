class Question {
	
	constructor() {
	    this.questionMul = [];
    	this.questions = [];
    	this.responses = [];
    	this.firstSolution = [];
    	this.secondSolution = [];
    	this.thirdSolution = [];
	}
	
	addQuestion(q) {
		if(typeof q == "object") {
			this.questionMul = q;	
		}
		else {
			this.question = q;
		}
	}
	
	addQuestions(e) {
		this.questions = e;
	}
	
	addResponse(e) {
		this.responses = e;
	}
	
	getQuestion() {
		return this.question;
	}
	
	getQuestionMul() {
		return this.questionMul;
	}
	
	getQuestions() {
		return this.questions;
	}
	
	getResponse() {
		return this.responses;
	}
		
	addSolution(fir) {
		this.firstSolution.push(fir);
	}
	
	addSolution(fir, sec) {
		this.firstSolution.push(fir);
		this.secondSolution.push(sec);
	}
	
	addSolution(fir, sec, thi) {
		this.firstSolution.push(fir);
		this.secondSolution.push(sec);
		this.thirdSolution.push(thi);
	}
	
	shuffle(limits) {
	    if(limits) {
	        this.shuffleWithLimits(limits);
	        return;
	    }
		for(var times = 0; times < 100; times++) {
			var first = Math.floor(Math.random() * this.responses.length);
			var second = Math.floor(Math.random() * this.responses.length);
			var temp = this.responses[first];
			this.responses[first] = this.responses[second];
			this.responses[second] = temp;
			for(var i = 0; i < this.firstSolution.length; i++) {
				if(this.firstSolution[i] == first) this.firstSolution.splice(i, 1,second);
				else if(this.firstSolution[i] == second) this.firstSolution.splice(i, 1, first);
			}
			for(var i = 0; i < this.secondSolution.length; i++) {
				if(this.secondSolution[i] == first) this.secondSolution.splice(i, 1, second);
				else if(this.secondSolution[i] == second) this.secondSolution.splice(i, 1, first);
			}
			for(var i = 0; i < this.thirdSolution.length; i++) {
				if(this.thirdSolution[i] == first) this.thirdSolution.splice(i, 1, second);
				else if(this.thirdSolution[i] == second) this.thirdSolution.splice(i, 1, first);
			}
		}
	}
	
	shuffleWithLimits(limits) {
		for(var times = 0; times < 100; times++) {
			var first = limits[Math.floor(Math.random() * limits.length)];
			var second = limits[Math.floor(Math.random() * limits.length)];
			var temp = this.responses[first];
			this.responses[first] = this.responses[second];
			this.responses[second] = temp;
			for(var i = 0; i < this.firstSolution.length; i++) {
				if(this.firstSolution[i] == first) this.firstSolution.splice(i, 1, second);
				else if(this.firstSolution[i] == second) this.firstSolution.splice(i, 1, first);
			}
			for(var i = 0; i < this.secondSolution.length; i++) {
				if(this.secondSolution[i] == first) this.secondSolution.splice(i, 1, second);
				else if(this.secondSolution[i] == second) this.secondSolution.splice(i, 1, first);
			}
			for(var i = 0; i < this.thirdSolution.length; i++) {
				if(this.thirdSolution[i] == first) this.thirdSolution.splice(i, 1, second);
				else if(this.thirdSolution[i] == second) this.thirdSolution.splice(i, 1, first);
			}
		}
	}
	
	isCorrect(fir, sec, thi) {
		for(var i = 0; i < this.firstSolution.length; i++) {
			if(fir == this.firstSolution[i] && (!sec || sec == this.secondSolution[i]) && (!thi || thi == this.thirdSolution[i])) return true;
		}
		return false;
	}

}
