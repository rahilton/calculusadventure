class Questions {}

Questions.getTrigIdentityEquations = function(num) {
	var resp = [];
	var quest = [];
	//Uses windows 1-3 as response windows and window 4 as question window.
	//Window 1 (5,400)-(333,500)
	//Window 2 (333,400)-(666,500)
	//Window 3 (666,400)-(1000,500)
	//Window 4 (5,100)-(1000,300)
	var response1 = "", response2 = "", response3 = "", question1 = "", question2 = "", question3 = "";
	var process1 = true, process2 = true, process3 = true;	
	
	if(num == 0) {response1 = "(cot(x))^2"; response2 = "1"; response3 = "(csc(x))^2"; question1 = "(tan(x))^2"; question2 = "+________="; question3 = "(sec(x))^2";process2 = false;}
	if(num == 1) {response1 = "(cos(x))^2"; response2 = "(tan(x))^2"; response3 = "1"; question1 = "(sin(x))^2"; question2 = "+________="; question3 = "1";process2 = false;}
	if(num == 2) {response1 = "(cot(x))^2"; response2 = "(sin(x))^2"; response3 = "(cos(x))^2"; question1 = "________+"; question2 = "1="; question3 = "(csc(x))^2";process1 = false;process2=false;}
	if(num == 3) {response1 = "(sec(x))^2"; response2 = "(cot(x))^2"; response3 = "(cos(x))^2"; question1 = "1"; question2 = "-________="; question3 = "(sin(x))^2";process2 = false;}
	if(num == 4) {response1 = "(sin(x))^2"; response2 = "2sin(x)cos(x)"; response3 = "(sin(x)cos(x))/(2)"; question1 = "sin(2x)"; question2 = "=________"; question3 = "";process2 = false;}
	if(num == 5) {response1 = "2sin(x)cos(x)"; response2 = "1"; response3 = "(cos(x))^2"; question1 = "cos(2x)"; question2 = "=________-"; question3 = "(sin(x))^2";process2 = false;}
	if(num == 6) {response1 = "(cos(x))^2"; response2 = "(sin(x))^2"; response3 = "cos((x)/(2))"; question1 = ""; question2 = "________= "; question3 = "(1+cos(2x))/(2)";process2 = false;}
	if(num == 7) {response1 = "(cos(x))^2"; response2 = "(sin(x))^2"; response3 = "sin((x)/(2))"; question1 = ""; question2 = "________= "; question3 = "(1-cos(2x))/(2)";process2 = false;}
	if(num == 8) {response1 = "(sin(x))^2"; response2 = "(sec(x))^2"; response3 = "(csc(x))^2"; question1 = "1"; question2 = "=________-"; question3 = "(cot(x))^2";process2 = false;}
	if(num == 9) {response1 = "(cos(x))^2"; response2 = "(sec(x))^2"; response3 = "(csc(x))^2"; question1 = "1"; question2 = "=________-"; question3 = "(tan(x))^2";process2 = false;}
	if(num == 10) {response1 = "(sin(x))^2"; response2 = "(tan(x))^2"; response3 = "(sec(x))^2"; question1 = "1"; question2 = "-________="; question3 = "(cos(x))^2";process2 = false;}
	if(num == 11) {response1 = "cot(x)"; response2 = "-tan(x)"; response3 = "tan(x)"; question1 = "tan(-x)"; question2 = "=________"; question3 = "";process2 = false;}
	if(num == 12) {response1 = "csc(x)"; response2 = "-sin(x)"; response3 = "sin(x)"; question1 = "sin(-x)"; question2 = "=________"; question3 = "";process2 = false;}
	if(num == 13) {response1 = "sec(x)"; response2 = "-cos(x)"; response3 = "cos(x)"; question1 = "cos(-x)"; question2 = "=________"; question3 = "";process2 = false;}
	if(num == 14) {response1 = "(1)/(2)"; response2 = "(sin(2x))/(2)"; response3 = "1"; question1 = "(sin(x))^2"; question2 = "=________ - "; question3 = "(cos(2x))/(2)";process2 = false;}
	if(num == 15) {response1 = "(1)/(2)"; response2 = "(sin(2x))/(2)"; response3 = "1"; question1 = "(sin(x))^2"; question2 = "=________ + "; question3 = "(cos(2x))/(2)";process2 = false;}
	if(num == 16) {response1 = "(sin(x))^2"; response2 = "cos(2x)"; response3 = "sin(2x)"; question1 = "________= "; question2 = "2(cos(x))^2"; question3 = "-1";process1 = false;}
	if(num == 17) {response1 = "2(cos(x))^2"; response2 = "1"; response3 = "(cos(x))^2"; question1 = "cos(2x)"; question2 = "=________-"; question3 = "2(sin(x))^2";process2 = false;}
	if(num == 18) {response1 = "(cot(x))^2"; response2 = "(tan(x))^2"; response3 = "(cos(x))^2"; question1 = "1"; question2 = "+________="; question3 = "(sec(x))^2";process2 = false;}
	if(num == 19) {response1 = "(cot(x))^2"; response2 = "(tan(x))^2"; response3 = "(sin(x))^2"; question1 = "1"; question2 = "+________="; question3 = "(csc(x))^2";process2 = false;}
	

	resp[0] = new Equation(response1,32);
	//eqs[0] = new Equation(response1,w.get(1).getMiddleX() - eqs[0].getLength()/2, w.get(1).getMiddleY()+w.get(1).getHeight()/10, 32);
	resp[1] = new Equation(response2,32);
	//eqs[1] = new Equation(response2,w.get(2).getMiddleX() - eqs[1].getLength()/2, w.get(2).getMiddleY()+w.get(2).getHeight()/10, 32);
	resp[2] = new Equation(response3,32);
	//eqs[2] = new Equation(response3,w.get(3).getMiddleX() - eqs[2].getLength()/2, w.get(3).getMiddleY()+w.get(3).getHeight()/10, 32);

	quest[0] = new Equation(question1,64,process1);
	quest[1] = new Equation(question2,64,process2);
	quest[2] = new Equation(question3,64,process3);
	//int totalLength = eqs[3].getLength() + eqs[4].getLength() + eqs[5].getLength();
	
	//eqs[3] = new Equation(question1,w.get(4).getMiddleX()-totalLength/2,w.get(4).getMiddleY()+w.get(4).getHeight()/10,64,process1);
	//eqs[4] = new Equation(question2,w.get(4).getMiddleX()-totalLength/2+eqs[3].getLength(),w.get(4).getMiddleY()+w.get(4).getHeight()/10,64,process2);
	//eqs[5] = new Equation(question3,w.get(4).getMiddleX()-totalLength/2+eqs[3].getLength() + eqs[4].getLength(),w.get(4).getMiddleY()+w.get(4).getHeight()/10,64,process3);

	var question = new Question();
	question.addResponse(resp);
	question.addQuestions(quest);
	Questions.addTrigIdentitySolution(num, question);
	question.shuffle();
	return question;
};
	
Questions.addTrigIdentitySolution = function(qNum, q) {
	if(qNum == 0) q.addSolution(1);
	if(qNum == 1) q.addSolution(0);
	if(qNum == 2) q.addSolution(0);
	if(qNum == 3) q.addSolution(2);
	if(qNum == 4) q.addSolution(1);
	if(qNum == 5) q.addSolution(2);
	if(qNum == 6) q.addSolution(0);
	if(qNum == 7) q.addSolution(1);
	if(qNum == 8) q.addSolution(2);
	if(qNum == 9) q.addSolution(1);
	if(qNum == 10) q.addSolution(0);
	if(qNum == 11) q.addSolution(1);
	if(qNum == 12) q.addSolution(1);
	if(qNum == 13) q.addSolution(2);
	if(qNum == 14) q.addSolution(0);
	if(qNum == 15) q.addSolution(0);
	if(qNum == 16) q.addSolution(1);
	if(qNum == 17) q.addSolution(1);
	if(qNum == 18) q.addSolution(1);
	if(qNum == 19) q.addSolution(0);
};
	
Questions.getTrigValueEquations = function(num) {
	var resp = [];
	//Uses windows 6-11 as response windows
	//Window 6 (100,5)-(400,105);
	//Window 7 (450,5)-(750,105);
	//Window 8 (100,105)-(400,205);
	//Window 9 (450,105)-(750,205);
	//Window 10 (100,205)-(400,305);
	//Window 11(450,205)-(750,305);
	
	var response1 = "", response2 = "", response3 = "", response4 = "", response5 = "", response6 = "";

	if(num == 0) {response1 = "sin(π/2)"; response2 = "cos(π/2)"; response3 = "sin(π/6)"; response4 = "1"; response5 = "1/2"; response6 = "0";}
	if(num == 1) {response1 = "sin(3π/2)"; response2 = "cos(0)"; response3 = "sin(π/3)"; response4 = "1"; response5 = "(√(3))/2"; response6 = "-1";}
	if(num == 2) {response1 = "cos(-π/2)"; response2 = "cos(π/3)"; response3 = "sin(π/3)"; response4 = "0"; response5 = "1/2"; response6 = "(√(3))/2";}
	if(num == 3) {response1 = "sin(-π/2)"; response2 = "cos(π/6)"; response3 = "sin(π)"; response4 = "-1"; response5 = "(√(3))/2"; response6 = "0";}
	if(num == 4) {response1 = "sin(π/2)"; response2 = "cos(π)"; response3 = "sin(π/3)"; response4 = "1"; response5 = "-1"; response6 = "(√(3))/2";}
	if(num == 5) {response1 = "sin(3π/2)"; response2 = "cos(3π/2)"; response3 = "cos(π/6)"; response4 = "-1"; response5 = "(√(3))/2"; response6 = "0";}
	if(num == 6) {response1 = "cos(2π/3)"; response2 = "sin(-π/3)"; response3 = "sin(π)"; response4 = "(-√(3))/2"; response5 = "-1/2"; response6 = "0";}
	if(num == 7) {response1 = "tan(π/3)"; response2 = "cos(π/2)"; response3 = "sin(2π/3)"; response4 = "√(3)"; response5 = "0"; response6 = "(√(3))/2";}
	if(num == 8) {response1 = "cos(-π/6)"; response2 = "tan(π)"; response3 = "sin(7π/6)"; response4 = "0"; response5 = "(√(3))/2"; response6 = "-1/2";}
	if(num == 9) {response1 = "sin(3π/2)"; response2 = "cos(-5π/6)"; response3 = "tan(0)"; response4 = "-1"; response5 = "(-√(3))/2"; response6 = "0";}
	if(num == 10) {response1 = "sin(5π/6)"; response2 = "tan(π/6)"; response3 = "sin(11π/6)"; response4 = "(√(3))/3"; response5 = "-1/2"; response6 = "1/2";}
	if(num == 11) {response1 = "tan(π/6)"; response2 = "cos(-5π/2)"; response3 = "sin(-π/6)"; response4 = "-1/2"; response5 = "(√(3))/3"; response6 = "0";}
	if(num == 12) {response1 = "csc(π/2)"; response2 = "cos(π/2)"; response3 = "sin(π/6)"; response4 = "1"; response5 = "1/2"; response6 = "0";}
	if(num == 13) {response1 = "sin(-π/3)"; response2 = "cos(π/6)"; response3 = "sec(π/6)"; response4 = "(2√(3))/3"; response5 = "1/2"; response6 = "(-√(3))/2";}
	if(num == 14) {response1 = "sin(5π/6)"; response2 = "tan(π/2)"; response3 = "csc(π/6)"; response4 = "Und."; response5 = "1/2"; response6 = "2";}
	if(num == 15) {response1 = "cot(π/2)"; response2 = "cos(π/6)"; response3 = "sin(-π/6)"; response4 = "-1/2"; response5 = "(√(3))/2"; response6 = "0";}
	if(num == 16) {response1 = "sin(2π)"; response2 = "csc(2π/3)"; response3 = "cos(π/3)"; response4 = "1/2"; response5 = "(2√(3))/3"; response6 = "0";}
	if(num == 17) {response1 = "sec(π/2)"; response2 = "cos(-3π)"; response3 = "sin(-11π/6)"; response4 = "Und."; response5 = "-1"; response6 = "1/2";}
	if(num == 18) {response1 = "cot(π/2)"; response2 = "tan(π/6)"; response3 = "cos(-π/6)"; response4 = "(√(3))/2"; response5 = "0"; response6 = "(√(3))/3";}
	if(num == 19) {response1 = "sec(2π/3)"; response2 = "csc(3π/2)"; response3 = "cot(π/3)"; response4 = "-2"; response5 = "-1"; response6 = "(√(3))/3";}
	

	resp[0] = new Equation(response1,32);
	//eqs[0] = new Equation(response1,w.get(6).getMiddleX() - eqs[0].getLength()/2, w.get(6).getMiddleY()+w.get(6).getHeight()/10, 32);
	resp[1] = new Equation(response2,32);
	//eqs[1] = new Equation(response2,w.get(7).getMiddleX() - eqs[1].getLength()/2, w.get(7).getMiddleY()+w.get(7).getHeight()/10, 32);
	resp[2] = new Equation(response3,32);
	//eqs[2] = new Equation(response3,w.get(8).getMiddleX() - eqs[2].getLength()/2, w.get(8).getMiddleY()+w.get(8).getHeight()/10, 32);
	resp[3] = new Equation(response4,32);
	//eqs[3] = new Equation(response4,w.get(9).getMiddleX() - eqs[3].getLength()/2, w.get(9).getMiddleY()+w.get(9).getHeight()/10, 32);
	resp[4] = new Equation(response5,32);
	//eqs[4] = new Equation(response5,w.get(10).getMiddleX() - eqs[4].getLength()/2, w.get(10).getMiddleY()+w.get(10).getHeight()/10, 32);
	resp[5] = new Equation(response6,32);
	//eqs[5] = new Equation(response6,w.get(11).getMiddleX() - eqs[5].getLength()/2, w.get(11).getMiddleY()+w.get(11).getHeight()/10, 32);
	
	var question = new Question();
	question.addResponse(resp);
	Questions.addTrigValuesSolution(num, question);
	question.shuffle();
	return question;
	
};
	
Questions.addTrigValuesSolution = function(num, q) {
	if(num == 0) {
		q.addSolution(0, 3);
		q.addSolution(3, 0);
		q.addSolution(1, 5);
		q.addSolution(5, 1);
		q.addSolution(2, 4);
		q.addSolution(4, 2);
	}
	if(num == 1) {
		q.addSolution(0, 5);
		q.addSolution(5, 0);
		q.addSolution(1, 3);
		q.addSolution(3, 1);
		q.addSolution(2, 4);
		q.addSolution(4, 2);
	}
	if(num == 2) {
		q.addSolution(0, 3);
		q.addSolution(3, 0);
		q.addSolution(1, 5);
		q.addSolution(5, 1);
		q.addSolution(2, 4);
		q.addSolution(4, 2);
	}
	if(num == 3) {
		q.addSolution(0, 3);
		q.addSolution(3, 0);
		q.addSolution(1, 4);
		q.addSolution(4, 1);
		q.addSolution(2, 5);
		q.addSolution(5, 2);
	}
	if(num == 4) {
		q.addSolution(0, 3);
		q.addSolution(3, 0);
		q.addSolution(1, 4);
		q.addSolution(4, 1);
		q.addSolution(2, 5);
		q.addSolution(5, 2);
	}
	if(num == 5) {
		q.addSolution(0, 3);
		q.addSolution(3, 0);
		q.addSolution(1, 5);
		q.addSolution(5, 1);
		q.addSolution(2, 4);
		q.addSolution(4, 2);
	}
	if(num == 6) {
		q.addSolution(0, 3);
		q.addSolution(3, 0);
		q.addSolution(1, 4);
		q.addSolution(4, 1);
		q.addSolution(2, 5);
		q.addSolution(5, 2);
	}
	if(num == 7) {
		q.addSolution(0, 3);
		q.addSolution(3, 0);
		q.addSolution(1, 4);
		q.addSolution(4, 1);
		q.addSolution(2, 5);
		q.addSolution(5, 2);
	}
	if(num == 8) {
		q.addSolution(0, 4);
		q.addSolution(4, 0);
		q.addSolution(1, 3);
		q.addSolution(3, 1);
		q.addSolution(2, 5);
		q.addSolution(5, 2);
	}
	if(num == 9) {
		q.addSolution(0, 3);
		q.addSolution(3, 0);
		q.addSolution(1, 4);
		q.addSolution(4, 1);
		q.addSolution(2, 5);
		q.addSolution(5, 2);
	}
	if(num == 10) {
		q.addSolution(0, 5);
		q.addSolution(5, 0);
		q.addSolution(1, 3);
		q.addSolution(3, 1);
		q.addSolution(2, 4);
		q.addSolution(4, 2);
	}
	if(num == 11) {
		q.addSolution(0, 4);
		q.addSolution(4, 0);
		q.addSolution(1, 5);
		q.addSolution(5, 1);
		q.addSolution(2, 3);
		q.addSolution(3, 2);
	}
	if(num == 12) {
		q.addSolution(0, 3);
		q.addSolution(3, 0);
		q.addSolution(1, 5);
		q.addSolution(5, 1);
		q.addSolution(2, 4);
		q.addSolution(4, 2);
	}
	if(num == 13) {
		q.addSolution(0, 5);
		q.addSolution(5, 0);
		q.addSolution(1, 4);
		q.addSolution(4, 1);
		q.addSolution(2, 3);
		q.addSolution(3, 2);
	}
	if(num == 14) {
		q.addSolution(0, 4);
		q.addSolution(4, 0);
		q.addSolution(1, 3);
		q.addSolution(3, 1);
		q.addSolution(2, 5);
		q.addSolution(5, 2);
	}
	if(num == 15) {
		q.addSolution(0, 5);
		q.addSolution(5, 0);
		q.addSolution(1, 4);
		q.addSolution(4, 1);
		q.addSolution(2, 3);
		q.addSolution(3, 2);
	}
	if(num == 16) {
		q.addSolution(0, 5);
		q.addSolution(5, 0);
		q.addSolution(1, 4);
		q.addSolution(4, 1);
		q.addSolution(2, 3);
		q.addSolution(3, 2);
	}
	if(num == 17) {
		q.addSolution(0, 3);
		q.addSolution(3, 0);
		q.addSolution(1, 4);
		q.addSolution(4, 1);
		q.addSolution(2, 5);
		q.addSolution(5, 2);
	}
	if(num == 18) {
		q.addSolution(0, 4);
		q.addSolution(4, 0);
		q.addSolution(1, 5);
		q.addSolution(5, 1);
		q.addSolution(2, 3);
		q.addSolution(3, 2);
	}
	if(num == 19) {
		q.addSolution(0, 3);
		q.addSolution(3, 0);
		q.addSolution(1, 4);
		q.addSolution(4, 1);
		q.addSolution(2, 5);
		q.addSolution(5, 2);
	}
};
	
Questions.getSOHCAHTOAEquations = function(num) {
	//Window 4 is the Main questions window
	//(100,100)-(900,500);
	//Window 5-7 is the response windows
	//(50,500)-(350,600);
	//(350,500)-(650,600);
	//(650,500)-(950,600);
	
	var response1 = "", response2 = "", response3 = "", question1 = "", question2 = "", question3 = "", question4 = "";
			
	var resp = [];
	var quest = [];
	if(num == 0 || num == 1 || num == 2) {response1 = "3/4"; response2 = "3/5"; response3 = "4/5"; question1 = "3"; question2 = "4"; question3 = "5";question4 = "x";}
	if(num == 3 || num == 4 || num == 5) {response1 = "5/(12)"; response2 = "5/(13)"; response3 = "(12)/(13)"; question1 = "5"; question2 = "12"; question3 = "13";question4 = "x";}
	if(num == 6 || num == 7 || num == 8) {response1 = "(2)/(√(13))"; response2 = "(3)/(√(13))"; response3 = "2/3"; question1 = "4"; question2 = "6"; question3 = "2√(13)";question4 = "x";}
	if(num == 9 || num == 10 || num == 11) {response1 = "8/(15)"; response2 = "8/(17)"; response3 = "(15)/(17)"; question1 = "8"; question2 = "15"; question3 = "17";question4 = "x";}
	if(num == 12 || num == 13 || num == 14) {response1 = "(15)/8"; response2 = "(17)/8"; response3 = "(17)/(15)"; question1 = "8"; question2 = "15"; question3 = "17";question4 = "x";}
	if(num == 15 || num == 16 || num == 17) {response1 = "(9)/(5√(10))"; response2 = "(13)/(5√(10))"; response3 = "9/(13)"; question1 = "9"; question2 = "13"; question3 = "5√(10)";question4 = "x";}
	if(num == 18 || num == 19 || num == 20) {response1 = "(5√(10))/(9)"; response2 = "(5√(10))/(13)"; response3 = "(13)/9"; question1 = "9"; question2 = "13"; question3 = "5√(10)";question4 = "x";}
	
	//eqs[0] = new Equation(question1,w.get(4).getX1() + w.get(4).getWidth()*710/800,	w.get(4).getMiddleY() + w.get(4).getHeight()*20/400,32);
	//eqs[1] = new Equation(question2,w.get(4).getMiddleX(),							w.get(4).getMiddleY() + w.get(4).getHeight()*125/400,32);
	//eqs[2] = new Equation(question3,w.get(4).getMiddleX()-w.get(4).getWidth()*40/800,	w.get(4).getMiddleY() - w.get(4).getHeight()*20/400,32);
	//eqs[3] = new Equation(question4,w.get(4).getX1() + w.get(4).getWidth()/4,			w.get(4).getMiddleY() + w.get(4).getHeight()*90/400,32);
	
	quest[0] = new Equation(question1,32);
	quest[1] = new Equation(question2,32);
	quest[2] = new Equation(question3,32);
	quest[3] = new Equation(question4,32);
	
	//x 50-350, 350-650, 650-950; y 500-600
	resp[0] = new Equation(response1,32);
	//eqs[4] = new Equation(response1,w.get(5).getMiddleX()-eqs[3].getLength()/2,w.get(5).getMiddleY()+w.get(5).getHeight()/10,32);
	resp[1] = new Equation(response2,32);
	//eqs[5] = new Equation(response2,w.get(6).getMiddleX()-eqs[4].getLength()/2,w.get(6).getMiddleY()+w.get(6).getHeight()/10,32);
	resp[2] = new Equation(response3,32);
	//eqs[6] = new Equation(response3,w.get(7).getMiddleX()-eqs[5].getLength()/2,w.get(7).getMiddleY()+w.get(7).getHeight()/10,32);
	
	var question = new Question();
	question.addResponse(resp);
	question.addQuestions(quest);
	Questions.addSOHCAHTOAQuestion(num, question);
	Questions.addSOHCAHTOASolution(num, question);
	question.shuffle();
	return question;
};
	
Questions.addSOHCAHTOAQuestion = function(num, q) {
	if(num == 0 || num == 3 || num == 6 || num == 9 || num == 15) q.addQuestion("      What is the sin(x)?");
	if(num == 1 || num == 4 || num == 7 || num == 10 || num == 16) q.addQuestion("      What is the cos(x)?");
	if(num == 2 || num == 5 || num == 8 || num == 11 || num == 17) q.addQuestion("      What is the tan(x)?");
	if(num == 12 || num == 18) q.addQuestion("      What is the csc(x)?");
	if(num == 13 || num == 19) q.addQuestion("      What is the sec(x)?");
	if(num == 14 || num == 20) q.addQuestion("      What is the cot(x)?");
};
	
Questions.getSOHCAHTOATriangle = function(win) {
	//Window Dimension (100,100)-(900,500)
	
	var triangle = document.createElement("canvas");
	triangle.width = "800";
	triangle.height = "400";
	//Triangle image (0,0)-(800,400)
	
	var g = triangle.getContext("2d");
	g.lineWidth =  3;
	
	g.strokeStyle = "black";
	g.beginPath();
	g.moveTo(Math.floor(win.getWidth()/8) + 2, Math.floor((win.getHeight()*3)/4) + 2);
	g.lineTo(Math.floor((win.getWidth()*7)/8) + 2, Math.floor(win.getHeight()/4) + 2);
	g.lineTo(Math.floor((win.getWidth()*7)/8) + 2, Math.floor((win.getHeight()*3)/4) + 2);
	g.lineTo(Math.floor(win.getWidth()/8) + 2, Math.floor((win.getHeight()*3)/4) + 2);
	g.stroke();
	g.strokeRect(Math.floor((triangle.width*7)/8)-20+2, Math.floor((triangle.height*3)/4)-20+2, 20, 20);
	
	g.strokeStyle = "white";
	g.beginPath();
	g.moveTo(Math.floor(win.getWidth()/8), Math.floor((win.getHeight()*3)/4));
	g.lineTo(Math.floor((win.getWidth()*7)/8), Math.floor(win.getHeight()/4));
	g.lineTo(Math.floor((win.getWidth()*7)/8), Math.floor((win.getHeight()*3)/4));
	g.lineTo(Math.floor(win.getWidth()/8), Math.floor((win.getHeight()*3)/4));
	g.stroke();
	g.strokeRect(Math.floor((triangle.width*7)/8)-20, Math.floor((triangle.height*3)/4)-20, 20, 20);
	return triangle;
};
	
Questions.addSOHCAHTOASolution = function(num, q) {
	if(num == 0) q.addSolution(1);
	if(num == 1) q.addSolution(2);
	if(num == 2) q.addSolution(0);
	if(num == 3) q.addSolution(1);
	if(num == 4) q.addSolution(2);
	if(num == 5) q.addSolution(0);
	if(num == 6) q.addSolution(0);
	if(num == 7) q.addSolution(1);
	if(num == 8) q.addSolution(2);
	if(num == 9) q.addSolution(1);
	if(num == 10) q.addSolution(2);
	if(num == 11) q.addSolution(0);
	if(num == 12) q.addSolution(1);
	if(num == 13) q.addSolution(2);
	if(num == 14) q.addSolution(0);
	if(num == 15) q.addSolution(0);
	if(num == 16) q.addSolution(1);
	if(num == 17) q.addSolution(2);
	if(num == 18) q.addSolution(0);
	if(num == 19) q.addSolution(1);
	if(num == 20) q.addSolution(2);
};
	
Questions.getCompositeEquations = function(num) {
	//Windows 8-13 are the response windows
	//x 100-400, 550-850
	//y 105-205, 205-305, 305-405
	
	//Window 14 is the question window
	//(100,5)-(850,105);
	//Window 15 is the instructions window
	//(5,480)-(1000,600)
	var response1 = "", response2 = "", response3 = "", response4 = "", response5 = "", response6 = "",question1 = "", question2 = "";
	
	var quest = [];
	var resp = [];
	if(num == 0) {response1 = "x^2+6"; response2 ="x^3"; response3 = "x^2"; response4 = "(x+6)^3"; response5 = "x"; response6 = "(x^2+6)^3"; question1 ="If (f∘g)(x)=";question2 = "(x^2+6)^3";}
	if(num == 1) {response1 = "sin(x)"; response2 ="sin(x^2+3)"; response3 = "x^2"; response4 = "x^2+3"; response5 = "x"; response6 = "sin(x+3)"; question1 ="If (f∘g)(x)=";question2 = "sin(x^2+3)";}
	if(num == 2) {response1 = "x+7"; response2 ="(sin(x))^2+7"; response3 = "(sin(x))^2"; response4 = "x"; response5 = "sin(x)"; response6 = "x^2+7"; question1 ="If (f∘g)(x)=";question2 = "(sin(x))^2+7";}
	if(num == 3) {response1 = "(1)/(x)"; response2 ="(1)/(x^2)"; response3 = "x"; response4 = "(x+1)^2"; response5 = "x+1"; response6 = "(1)/((x+1)^2)"; question1 ="If (f∘g)(x)=";question2 = "(1)/((x+1)^2)";}
	if(num == 4) {response1 = "x+1"; response2 ="(x+1)^2"; response3 = "x+√(x)"; response4 = "x"; response5 = "(x+1)^2+(x+1)"; response6 = "x^2+x"; question1 ="If (f∘g)(x)=";question2 = "(x+1)^2+(x+1)";}
	if(num == 5) {response1 = "sin(x)"; response2 ="x"; response3 = "1/(x-1)"; response4 = "(1)/(sin(x)-1)"; response5 = "(1)/(x)"; response6 = "sin(x)-1"; question1 ="If (f∘g)(x)=";question2 = "(1)/(sin(x)-1)";}
	if(num == 6) {response1 = "x"; response2 ="√(x^3-3)"; response3 = "x^3"; response4 = "√(x-3)"; response5 = "√(x)"; response6 = "x^3-3"; question1 ="If (f∘g)(x)=";question2 = "√(x^3-3)";}
	if(num == 7) {response1 = "ln(x)"; response2 ="√(x)"; response3 = "√(x)+3"; response4 = "ln((√(x)+3))"; response5 = "x"; response6 = "ln((x+3))"; question1 ="If (f∘g)(x)=";question2 = "ln((√(x)+3))";}
	if(num == 8) {response1 = "x"; response2 ="sin(x)"; response3 = "cos(x^2)"; response4 = "sin(cos(x))"; response5 = "x^2"; response6 = "sin(cos(x^2))"; question1 ="If (f∘g)(x)=";question2 = "sin(cos(x^2))";}
	if(num == 9) {response1 = "x"; response2 ="x^2cot(x^2-2)"; response3 = "(x+2)cot(x)"; response4 = "x^2"; response5 = "x^2-2"; response6 = "xcot(x-2)"; question1 ="If (f∘g)(x)=";question2 = "x^2cot(x^2-2)";}
	if(num == 10) {response1 = "ln((x^2+1))"; response2 ="(1)/(ln(x))"; response3 = "x^2+1"; response4 = "x"; response5 = "(1)/(x)"; response6 = "(1)/(ln((x^2+1)))"; question1 ="If (f∘g)(x)=";question2 = "(1)/(ln((x^2+1)))";}
	if(num == 11) {response1 = "x^4+x^2+1"; response2 ="x^2"; response3 = "x^3"; response4 = "(x^4+x^2+1)^3"; response5 = "x"; response6 = "(x^2+x+1)^3"; question1 ="If (f∘g)(x)=";question2 = "(x^4+x^2+1)^3";}
	if(num == 12) {response1 = "(3)/(x^3)"; response2 ="x^4+x^2"; response3 = "x"; response4 = "x^2"; response5 = "(3)/((x^4+x^2)^3)"; response6 = "(3)/((x^2+x)^3)"; question1 ="If (f∘g)(x)=";question2 = "(3)/((x^4+x^2)^3)";}
	if(num == 13) {response1 = "sin(x^3)"; response2 ="sin(x)"; response3 = "x"; response4 = "x^3"; response5 = "x^6"; response6 = "sin(√(x))"; question1 ="If (f∘g)(x)=";question2 = "sin(x^3)";}
	if(num == 14) {response1 = "x^2"; response2 ="x^3+1"; response3 = "(cos(x))^2"; response4 = "cos(x^3+1)"; response5 = "x"; response6 = "(cos(x^3+1))^2"; question1 ="If (f∘g)(x)=";question2 = "(cos(x^3+1))^2";}
	if(num == 15) {response1 = "((x+1)^2+1)^3"; response2 ="x^3"; response3 = "(x+1)^2+1"; response4 = "(x+1)^2"; response5 = "x"; response6 = "(x+1)^3"; question1 ="If (f∘g)(x)=";question2 = "((x+1)^2+1)^3";}
	if(num == 16) {response1 = "(1)/(x)"; response2 ="(1)/(√(x^2+9))"; response3 = "x"; response4 = "√(x^2+9)"; response5 = "x^2"; response6 = "(1)/√(x+9)"; question1 ="If (f∘g)(x)=";question2 = "(1)/(√(x^2+9))";}
	if(num == 17) {response1 = "ln(x^2)"; response2 ="x"; response3 = "x^4"; response4 = "(ln(x^2))^4"; response5 = "(ln(x))^4"; response6 = "x^2"; question1 ="If (f∘g)(x)=";question2 = "(ln(x^2))^4";}
	if(num == 18) {response1 = "tan(√(x)+1)"; response2 ="tan(x)"; response3 = "x"; response4 = "tan(x+1)"; response5 = "√(x)+1"; response6 = "√(x)"; question1 ="If (f∘g)(x)=";question2 = "tan(√(x)+1)";}
	if(num == 19) {response1 = "x^2+1"; response2 ="x^2"; response3 = "x"; response4 = "(x+2)^2+1"; response5 = "(x^2+2)^2+1"; response6 = "x^2+2"; question1 ="If (f∘g)(x)=";question2 = "(x^2+2)^2+1";}
	resp[0] = new Equation(response1,32);
	//eqs[0] = new Equation(response1,w.get(8).getMiddleX()-eqs[0].getLength()/2, w.get(8).getMiddleY() + w.get(8).getHeight()/10 ,32);
	resp[1] = new Equation(response2,32);
	//eqs[1] = new Equation(response2,w.get(9).getMiddleX()-eqs[1].getLength()/2, w.get(9).getMiddleY() + w.get(9).getHeight()/10,32);
	resp[2] = new Equation(response3,32);
	//eqs[2] = new Equation(response3,w.get(10).getMiddleX()-eqs[2].getLength()/2,w.get(10).getMiddleY() + w.get(10).getHeight()/10,32);
	resp[3] = new Equation(response4,32);
	//eqs[3] = new Equation(response4,w.get(11).getMiddleX()-eqs[3].getLength()/2,w.get(11).getMiddleY() + w.get(11).getHeight()/10,32);
	resp[4] = new Equation(response5,32);
	//eqs[4] = new Equation(response5,w.get(12).getMiddleX()-eqs[4].getLength()/2,w.get(12).getMiddleY() + w.get(12).getHeight()/10,32);
	resp[5] = new Equation(response6,32);
	//eqs[5] = new Equation(response6,w.get(13).getMiddleX()-eqs[5].getLength()/2,w.get(13).getMiddleY() + w.get(13).getHeight()/10,32);
	
	//width 750 
	quest[0] = new Equation(question1,32,false);
	quest[1] = new Equation(question2,32);
	//int totalLength = eqs[6].getLength() + eqs[7].getLength();
	//eqs[6] = new Equation(question1, w.get(14).getMiddleX()-totalLength/2,w.get(14).getMiddleY() + w.get(14).getHeight()/10,32,false);
	//eqs[7] = new Equation(question2, w.get(14).getMiddleX()-totalLength/2 + eqs[6].getLength(),w.get(14).getMiddleY() + w.get(14).getHeight()/10,32);
	var question = new Question();
	question.addResponse(resp);
	question.addQuestions(quest);
	Questions.addCompositeQuestion(num, question);
	Questions.addCompositeSolution(num, question);
	question.shuffle();
	return question;
};
	
Questions.addCompositeQuestion = function(num, q) {
	var quest = [];
	quest[0] = "  Pick a possible equation for f(x).";
	quest[1] = "  Pick a possible equation for g(x).";
	q.addQuestion(quest);
};
	
Questions.addCompositeSolution = function(num, q) {
	if(num == 0) {
		q.addSolution(1, 0);
		q.addSolution(3, 2);
		q.addSolution(4, 5);
		q.addSolution(5, 4);
	}
	if(num == 1) {
		q.addSolution(0, 3);
		q.addSolution(5, 2);
		q.addSolution(4, 1);
		q.addSolution(1, 4);
	}
	if(num == 2) {
		q.addSolution(0, 2);
		q.addSolution(5, 4);
		q.addSolution(1, 3);
		q.addSolution(3, 1);
	}
	if(num == 3) {
		q.addSolution(0, 3);
		q.addSolution(1, 4);
		q.addSolution(2, 5);
		q.addSolution(5, 2);
	}
	if(num == 4) {
		q.addSolution(2, 1);
		q.addSolution(5, 0);
		q.addSolution(4, 3);
		q.addSolution(3, 4);
	}
	if(num == 5) {
		q.addSolution(2, 0);
		q.addSolution(4, 5);
		q.addSolution(3, 1);
		q.addSolution(1, 3);
	}
	if(num == 6) {
		q.addSolution(3, 2);
		q.addSolution(4, 5);
		q.addSolution(0, 1);
		q.addSolution(1, 0);
	}
	if(num == 7) {
		q.addSolution(5, 1);
		q.addSolution(0, 2);
		q.addSolution(4, 3);
		q.addSolution(3, 4);
	}
	if(num == 8) {
		q.addSolution(1, 2);
		q.addSolution(3, 4);
		q.addSolution(0, 5);
		q.addSolution(5, 0);
	}
	if(num == 9) {
		q.addSolution(2, 4);
		q.addSolution(5, 3);
		q.addSolution(0, 1);
		q.addSolution(1, 0);
	}
	if(num == 10) {
		q.addSolution(4, 0);
		q.addSolution(1, 2);
		q.addSolution(3, 5);
		q.addSolution(5, 3);
	}
	if(num == 11) {
		q.addSolution(2, 0);
		q.addSolution(5, 1);
		q.addSolution(3, 4);
		q.addSolution(4, 3);
	}
	if(num == 12) {
		q.addSolution(0, 1);
		q.addSolution(5, 3);
		q.addSolution(4, 2);
		q.addSolution(2, 4);
	}
	if(num == 13) {
		q.addSolution(1, 3);
		q.addSolution(5, 4);
		q.addSolution(0, 2);
		q.addSolution(2, 0);
	}
	if(num == 14) {
		q.addSolution(0, 3);
		q.addSolution(2, 1);
		q.addSolution(4, 5);
		q.addSolution(5, 4);
	}
	if(num == 15) {
		q.addSolution(5, 3);
		q.addSolution(1, 2);
		q.addSolution(4, 0);
		q.addSolution(0, 4);
	}
	if(num == 16) {
		q.addSolution(5, 4);
		q.addSolution(0, 3);
		q.addSolution(1, 2);
		q.addSolution(2, 1);
	}
	if(num == 17) {
		q.addSolution(4, 5);
		q.addSolution(2, 0);
		q.addSolution(1, 3);
		q.addSolution(3, 1);
	}
	if(num == 18) {
		q.addSolution(1, 4);
		q.addSolution(3, 5);
		q.addSolution(0, 2);
		q.addSolution(2, 0);
	}
	if(num == 19) {
		q.addSolution(3, 1);
		q.addSolution(0, 5);
		q.addSolution(4, 2);
		q.addSolution(2, 4);
	}
};
	
Questions.getInverseEquations = function(num) {
	//Windows 8-13 are the response windows
	//x 100-400, 550-850
	//y 105-205, 205-305, 305-405
	
	//Window 14 is the question window
	//(100,5)-(850,105);
	//Window 15 is the instructions window
	//(5,480)-(1000,600)
	var response1 = "", response2 = "", response3 = "", response4 = "", response5 = "", response6 = "",question1 = "", question2 = "", question3 = "";
	
	var resp = [];
	var quest = [];
	if(num == 0) {response1 = "π/6"; response2 ="π/3"; response3 = "π/2"; response4 = "(2π)/3"; response5 = "(5π)/6"; response6 = "π"; question1 ="sin(x)";question2 = "=";question3 = "1/2";}
	if(num == 1) {response1 = "π/6"; response2 ="π/3"; response3 = "π/2"; response4 = "(2π)/3"; response5 = "(5π)/3"; response6 = "π"; question1 ="cos(x)";question2 = "=";question3 = "1/2";}
	if(num == 2) {response1 = "π/6"; response2 ="π/3"; response3 = "π/4"; response4 = "(2π)/3"; response5 = "(5π)/4"; response6 = "(3π)/2"; question1 ="tan(x)";question2 = "=";question3 = "1";}
	if(num == 3) {response1 = "π/6"; response2 ="π/3"; response3 = "π/2"; response4 = "(2π)/3"; response5 = "(5π)/6"; response6 = "π"; question1 ="sin(x)";question2 = "=";question3 = "(√(3))/2";}
	if(num == 4) {response1 = "π/6"; response2 ="π/3"; response3 = "(11π)/6"; response4 = "(2π)/3"; response5 = "(5π)/6"; response6 = "π"; question1 ="cos(x)";question2 = "=";question3 = "(√(3))/2";}
	if(num == 5) {response1 = "π/6"; response2 ="π/3"; response3 = "π/2"; response4 = "(4π)/3"; response5 = "(7π)/6"; response6 = "π"; question1 ="tan(x)";question2 = "=";question3 = "√(3)";}
	if(num == 6) {response1 = "π/6"; response2 ="π/3"; response3 = "0"; response4 = "(2π)/3"; response5 = "(5π)/6"; response6 = "π"; question1 ="sin(x)";question2 = "=";question3 = "0";}
	if(num == 7) {response1 = "π/6"; response2 ="π/3"; response3 = "π/2"; response4 = "(2π)/3"; response5 = "(5π)/6"; response6 = "(3π)/2"; question1 ="cos(x)";question2 = "=";question3 = "0";}
	if(num == 8) {response1 = "π/6"; response2 ="π/3"; response3 = "0"; response4 = "(2π)/3"; response5 = "(5π)/6"; response6 = "π"; question1 ="tan(x)";question2 = "=";question3 = "0";}
	if(num == 9) {response1 = ".722"; response2 =".644"; response3 = ".848"; response4 = "5.435"; response5 = "2.293"; response6 = "3.790"; question1 ="sin(x)";question2 = "=";question3 = ".75";}
	if(num == 10) {response1 = ".722"; response2 =".644"; response3 = ".848"; response4 = "5.435"; response5 = "2.293"; response6 = "3.790"; question1 ="cos(x)";question2 = "=";question3 = ".75";}
	if(num == 11) {response1 = ".722"; response2 =".644"; response3 = ".848"; response4 = "5.435"; response5 = "2.293"; response6 = "3.790"; question1 ="tan(x)";question2 = "=";question3 = ".75";}
	if(num == 12) {response1 = "π/6"; response2 ="π/3"; response3 = "π/2"; response4 = "(2π)/3"; response5 = "(5π)/6"; response6 = "π"; question1 ="csc(x)";question2 = "=";question3 = "2";}
	if(num == 13) {response1 = "π/6"; response2 ="π/3"; response3 = "π/2"; response4 = "(2π)/3"; response5 = "(5π)/3"; response6 = "π"; question1 ="sec(x)";question2 = "=";question3 = "2";}
	if(num == 14) {response1 = "π/6"; response2 ="π/3"; response3 = "π/4"; response4 = "(2π)/3"; response5 = "(5π)/4"; response6 = "π"; question1 ="cot(x)";question2 = "=";question3 = "1";}
	if(num == 15) {response1 = "3.730"; response2 ="5.442"; response3 = ".841"; response4 = ".588"; response5 = "2.412"; response6 = ".729"; question1 ="sin(x)";question2 = "=";question3 = "2/3";}
	if(num == 16) {response1 = "3.730"; response2 ="5.442"; response3 = ".841"; response4 = ".588"; response5 = "2.412"; response6 = ".729"; question1 ="cos(x)";question2 = "=";question3 = "2/3";}
	if(num == 17) {response1 = "3.730"; response2 ="5.442"; response3 = ".841"; response4 = ".588"; response5 = "2.412"; response6 = ".729"; question1 ="tan(x)";question2 = "=";question3 = "2/3";}
	if(num == 18) {response1 = "3.730"; response2 ="5.442"; response3 = ".841"; response4 = ".588"; response5 = "2.412"; response6 = ".729"; question1 ="csc(x)";question2 = "=";question3 = "3/2";}
	if(num == 19) {response1 = "3.730"; response2 ="5.442"; response3 = ".841"; response4 = ".588"; response5 = "2.412"; response6 = ".729"; question1 ="sec(x)";question2 = "=";question3 = "3/2";}
	if(num == 20) {response1 = "3.730"; response2 ="5.442"; response3 = ".841"; response4 = ".588"; response5 = "2.412"; response6 = ".729"; question1 ="tan(x)";question2 = "=";question3 = "3/2";}
	resp[0] = new Equation(response1,32);
	//eqs[0] = new Equation(response1,w.get(8).getMiddleX()-eqs[0].getLength()/2, w.get(8).getMiddleY() + w.get(8).getHeight()/10 ,32);
	resp[1] = new Equation(response2,32);
	//eqs[1] = new Equation(response2,w.get(9).getMiddleX()-eqs[1].getLength()/2, w.get(9).getMiddleY() + w.get(9).getHeight()/10,32);
	resp[2] = new Equation(response3,32);
	//eqs[2] = new Equation(response3,w.get(10).getMiddleX()-eqs[2].getLength()/2,w.get(10).getMiddleY() + w.get(10).getHeight()/10,32);
	resp[3] = new Equation(response4,32);
	//eqs[3] = new Equation(response4,w.get(11).getMiddleX()-eqs[3].getLength()/2,w.get(11).getMiddleY() + w.get(11).getHeight()/10,32);
	resp[4] = new Equation(response5,32);
	//eqs[4] = new Equation(response5,w.get(12).getMiddleX()-eqs[4].getLength()/2,w.get(12).getMiddleY() + w.get(12).getHeight()/10,32);
	resp[5] = new Equation(response6,32);
	//eqs[5] = new Equation(response6,w.get(13).getMiddleX()-eqs[5].getLength()/2,w.get(13).getMiddleY() + w.get(13).getHeight()/10,32);
	
	//width 750 
	quest[0] = new Equation(question1,32);
	quest[1] = new Equation(question2,32);
	quest[2] = new Equation(question3,32);
	//int totalLength = eqs[6].getLength() + eqs[7].getLength() + eqs[8].getLength();
	//eqs[6] = new Equation(question1, w.get(14).getMiddleX()-totalLength/2,w.get(14).getMiddleY() + w.get(14).getHeight()/10,32);
	//eqs[7] = new Equation(question2, w.get(14).getMiddleX()-totalLength/2 + eqs[6].getLength(),w.get(14).getMiddleY() + w.get(14).getHeight()/10,32);
	//eqs[8] = new Equation(question3, w.get(14).getMiddleX()-totalLength/2 + eqs[6].getLength() + + eqs[7].getLength(),w.get(14).getMiddleY() + w.get(14).getHeight()/10,32);
	var question = new Question();
	question.addResponse(resp);
	question.addQuestions(quest);
	Questions.addInverseQuestion(num, question);
	Questions.addInverseSolution(num, question);
	question.shuffle();
	return question;
};
	
Questions.addInverseQuestion = function(num, q) {
	var quest = "";
	quest = "Which are possible solutions for x if   0 ≤ x < 2π?";
	q.addQuestion(quest);
};
	
Questions.addInverseSolution = function(num, q) {
	if(num == 0) {
		q.addSolution(4,0);
		q.addSolution(0,4);
	}
	if(num == 1) {
		q.addSolution(4,1);
		q.addSolution(1,4);
	}
	if(num == 2) {
		q.addSolution(4,2);
		q.addSolution(2,4);
	}
	if(num == 3) {
		q.addSolution(1,3);
		q.addSolution(3,1);
	}
	if(num == 4) {
		q.addSolution(2,0);
		q.addSolution(0,2);
	}
	if(num == 5) {
		q.addSolution(1,3);
		q.addSolution(3,1);
	}
	if(num == 6) {
		q.addSolution(2,5);
		q.addSolution(5,2);
	}
	if(num == 7) {
		q.addSolution(2,5);
		q.addSolution(5,2);
	}
	if(num == 8) {
		q.addSolution(2,5);
		q.addSolution(5,2);
	}
	if(num == 9) {
		q.addSolution(4,2);
		q.addSolution(2,4);
	}
	if(num == 10) {
		q.addSolution(3,0);
		q.addSolution(0,3);
	}
	if(num == 11) {
		q.addSolution(1,5);
		q.addSolution(5,1);
	}
	if(num == 12) {
		q.addSolution(4,0);
		q.addSolution(0,4);
	}
	if(num == 13) {
		q.addSolution(4,1);
		q.addSolution(1,4);
	}
	if(num == 14) {
		q.addSolution(4,2);
		q.addSolution(2,4);
	}
	if(num == 15) {
		q.addSolution(4,5);
		q.addSolution(5,4);
	}
	if(num == 16) {
		q.addSolution(1,2);
		q.addSolution(2,1);
	}
	if(num == 17) {
		q.addSolution(3,0);
		q.addSolution(0,3);
	}
	if(num == 18) {
		q.addSolution(4,5);
		q.addSolution(5,4);
	}
	if(num == 19) {
		q.addSolution(1,2);
		q.addSolution(2,1);
	}
	if(num == 20) {
		q.addSolution(3,0);
		q.addSolution(0,3);
	}
};
	
Questions.getFactoringEquations = function(num) {
	//Windows 8-13 are the response windows
	//x 100-400, 550-850
	//y 105-205, 205-305, 305-405
	
	//Window 14 is the question window
	//(100,5)-(850,105);
	//Window 15 is the instructions window
	//(5,480)-(1000,600)
	var response1 = "", response2 = "", response3 = "", response4 = "", response5 = "", response6 = "",question1 = "", question2 = "";
	var resp = [];
	var quest = [];
	if(num == 0) {response1 = "x+3"; response2 ="x-3"; response3 = "x+2"; response4 = "x-2"; response5 = "x+1"; response6 = "x-1"; question1 ="If y=";question2 = "x^2-4";}
	if(num == 1) {response1 = "x+3"; response2 ="x-3"; response3 = "x+2"; response4 = "x-2"; response5 = "x+1"; response6 = "x-1"; question1 ="If y=";question2 = "x^2-9";}
	if(num == 2) {response1 = "x+3"; response2 ="x-3"; response3 = "x+2"; response4 = "x-2"; response5 = "x+1"; response6 = "x-1"; question1 ="If y=";question2 = "x^2+4x+3";}
	if(num == 3) {response1 = "x+5"; response2 ="x-5"; response3 = "x+2"; response4 = "x-2"; response5 = "x+1"; response6 = "x-1"; question1 ="If y=";question2 = "x^2-4x-5";}
	if(num == 4) {response1 = "x+3"; response2 ="x-3"; response3 = "x+2"; response4 = "x-2"; response5 = "x+1"; response6 = "x-1"; question1 ="If y=";question2 = "x^2+3x+2";}
	if(num == 5) {response1 = "x+5"; response2 ="x-5"; response3 = "x+2"; response4 = "x-2"; response5 = "x-4"; response6 = "x-10"; question1 ="If y=";question2 = "x^2-9x+20";}
	if(num == 6) {response1 = "x+6"; response2 ="x-8"; response3 = "x+12"; response4 = "x-4"; response5 = "x+48"; response6 = "x-1"; question1 ="If y=";question2 = "x^2+8x-48";}
	if(num == 7) {response1 = "x+11"; response2 ="x-11"; response3 = "x+5"; response4 = "x-6"; response5 = "x+1"; response6 = "x-1"; question1 ="If y=";question2 = "x^2-10x-11";}
	if(num == 8) {response1 = "x+3"; response2 ="x-3"; response3 = "x+2"; response4 = "x-2"; response5 = "x+1"; response6 = "x-6"; question1 ="If y=";question2 = "x^2-5x+6";}
	if(num == 9) {response1 = "x+3"; response2 ="x-3"; response3 = "x+2"; response4 = "x-2"; response5 = "x+1"; response6 = "x-6"; question1 ="If y=";question2 = "x^2-5x-6";}
	if(num == 10) {response1 = "2x+2"; response2 ="2x-2"; response3 = "x+2"; response4 = "x-2"; response5 = "x+1"; response6 = "2x-1"; question1 ="If y=";question2 = "2x^2-6x+4";}
	if(num == 11) {response1 = "3x+1"; response2 ="3x-1"; response3 = "x+7"; response4 = "x-7"; response5 = "3x+7"; response6 = "x+1"; question1 ="If y=";question2 = "3x^2+10x+7";}
	if(num == 12) {response1 = "4x-1"; response2 ="4x-2"; response3 = "2x+1"; response4 = "2x-2"; response5 = "x+2"; response6 = "x+1"; question1 ="If y=";question2 = "4x^2+7x-2";}
	if(num == 13) {response1 = "5x+6"; response2 ="x-3"; response3 = "5x+4"; response4 = "x-2"; response5 = "5x+1"; response6 = "x-12"; question1 ="If y=";question2 = "5x^2-4x-12";}
	if(num == 14) {response1 = "x^2-2"; response2 ="x+2"; response3 = "x-2"; response4 = "x^2+2x+4"; response5 = "x^2-2x+4"; response6 = "x^2+2x+2"; question1 ="If y=";question2 = "x^3-8";}
	if(num == 15) {response1 = "x^2-2"; response2 ="x+2"; response3 = "x-2"; response4 = "x^2+2x+4"; response5 = "x^2-2x+4"; response6 = "x^2+2x+2"; question1 ="If y=";question2 = "x^3+8";}
	if(num == 16) {response1 = "x+3"; response2 ="x-3"; response3 = "x^2+3x+9"; response4 = "x^2-3x+9"; response5 = "x^2+3x-9"; response6 = "x^2-3x-9"; question1 ="If y=";question2 = "x^3-27";}
	if(num == 17) {response1 = "x+3"; response2 ="x-3"; response3 = "x^2+3x+9"; response4 = "x^2-3x+9"; response5 = "x^2+3x-9"; response6 = "x^2-3x-9"; question1 ="If y=";question2 = "x^3+27";}
	if(num == 18) {response1 = "x^2+4x+16"; response2 ="x^2-4x+16"; response3 = "x^2+4x-16"; response4 = "x^2-4x-16"; response5 = "x+4"; response6 = "x-4"; question1 ="If y=";question2 = "x^3-64";}
	if(num == 19) {response1 = "x^2+4x+16"; response2 ="x^2-4x+16"; response3 = "x^2+4x-16"; response4 = "x^2-4x-16"; response5 = "x+4"; response6 = "x-4"; question1 ="If y=";question2 = "x^3+64";}
	
	resp[0] = new Equation(response1,32);
	//eqs[0] = new Equation(response1,w.get(8).getMiddleX()-eqs[0].getLength()/2, w.get(8).getMiddleY() + w.get(8).getHeight()/10 ,32);
	resp[1] = new Equation(response2,32);
	//eqs[1] = new Equation(response2,w.get(9).getMiddleX()-eqs[1].getLength()/2, w.get(9).getMiddleY() + w.get(9).getHeight()/10,32);
	resp[2] = new Equation(response3,32);
	//eqs[2] = new Equation(response3,w.get(10).getMiddleX()-eqs[2].getLength()/2,w.get(10).getMiddleY() + w.get(10).getHeight()/10,32);
	resp[3] = new Equation(response4,32);
	//eqs[3] = new Equation(response4,w.get(11).getMiddleX()-eqs[3].getLength()/2,w.get(11).getMiddleY() + w.get(11).getHeight()/10,32);
	resp[4] = new Equation(response5,32);
	//eqs[4] = new Equation(response5,w.get(12).getMiddleX()-eqs[4].getLength()/2,w.get(12).getMiddleY() + w.get(12).getHeight()/10,32);
	resp[5] = new Equation(response6,32);
	//eqs[5] = new Equation(response6,w.get(13).getMiddleX()-eqs[5].getLength()/2,w.get(13).getMiddleY() + w.get(13).getHeight()/10,32);
	
	//width 750 
	quest[0] = new Equation(question1,32,false);
	quest[1] = new Equation(question2,32);
	//int totalLength = eqs[6].getLength() + eqs[7].getLength();
	//eqs[6] = new Equation(question1, w.get(14).getMiddleX()-totalLength/2,w.get(14).getMiddleY() + w.get(14).getHeight()/10,32,false);
	//eqs[7] = new Equation(question2, w.get(14).getMiddleX()-totalLength/2 + eqs[6].getLength(),w.get(14).getMiddleY() + w.get(14).getHeight()/10,32);
	var question = new Question();
	question.addResponse(resp);
	question.addQuestions(quest);
	Questions.addFactoringQuestion(num, question);
	Questions.addFactoringSolution(num, question);
	question.shuffle();
	return question;
};
	
Questions.addFactoringQuestion = function(num, q) {
	var quest = "";
	quest = "What are the factors of y?";
	q.addQuestion(quest);
};
	
Questions.addFactoringSolution = function(num, q) {
	if(num == 0) {
		q.addSolution(3, 2);
		q.addSolution(2, 3);
	}
	if(num == 1) {
		q.addSolution(0, 1);
		q.addSolution(1, 0);
	}
	if(num == 2) {
		q.addSolution(0, 4);
		q.addSolution(4, 0);
	}
	if(num == 3) {
		q.addSolution(1, 4);
		q.addSolution(4, 1);
	}
	if(num == 4) {
		q.addSolution(2, 4);
		q.addSolution(4, 2);
	}
	if(num == 5) {
		q.addSolution(1, 4);
		q.addSolution(4, 1);
	}
	if(num == 6) {
		q.addSolution(3, 2);
		q.addSolution(2, 3);
	}
	if(num == 7) {
		q.addSolution(1, 4);
		q.addSolution(4, 1);
	}
	if(num == 8) {
		q.addSolution(3, 1);
		q.addSolution(1, 3);
	}
	if(num == 9) {
		q.addSolution(5, 4);
		q.addSolution(4, 5);
	}
	if(num == 10) {
		q.addSolution(3, 1);
		q.addSolution(1, 3);
	}
	if(num == 11) {
		q.addSolution(5, 4);
		q.addSolution(4, 5);
	}
	if(num == 12) {
		q.addSolution(0, 4);
		q.addSolution(4, 0);
	}
	if(num == 13) {
		q.addSolution(0, 3);
		q.addSolution(3, 0);
	}
	if(num == 14) {
		q.addSolution(3, 2);
		q.addSolution(2, 3);
	}
	if(num == 15) {
		q.addSolution(1, 4);
		q.addSolution(4, 1);
	}
	if(num == 16) {
		q.addSolution(1, 2);
		q.addSolution(2, 1);
	}
	if(num == 17) {
		q.addSolution(0, 3);
		q.addSolution(3, 0);
	}
	if(num == 18) {
		q.addSolution(0, 5);
		q.addSolution(5, 0);
	}
	if(num == 19) {
		q.addSolution(1, 4);
		q.addSolution(4, 1);
	}
};
	
Questions.getQuadraticEquation = function(num) {
	//Window 14 is the question window
	//(100,5)-(850,105);
	//Window 18 is the instruction window
	//(100,100)-(500,500);
	var quest = [];
	var question1 = "", question2 = "";

	if(num == 0) {question1 = "If 0="; question2 = "x^2-4x+2";}
	if(num == 1) {question1 = "If 0="; question2 = "x^2-x-3";}
	if(num == 2) {question1 = "If 0="; question2 = "x^2-5x+5";}
	if(num == 3) {question1 = "If 0="; question2 = "x^2-3x-16";}
	if(num == 4) {question1 = "If 0="; question2 = "x^2-10x+4";}
	if(num == 5) {question1 = "If 0="; question2 = "x^2-9x+3";}
	if(num == 6) {question1 = "If 0="; question2 = "x^2-7x-2";}
	if(num == 7) {question1 = "If 0="; question2 = "3x^2-4x-10";}
	if(num == 8) {question1 = "If 0="; question2 = "2x^2-5x-13";}
	if(num == 9) {question1 = "If 0="; question2 = "5x^2-7x+1";}
	if(num == 10) {question1 = "If 0="; question2 = "7x^2-6x-12";}
	if(num == 11) {question1 = "If 0="; question2 = "9x^2-5x-8";}
	if(num == 12) {question1 = "If 0="; question2 = "3x^2-7x-8";}
	if(num == 13) {question1 = "If 0="; question2 = "4x^2-6x+1";}
	if(num == 14) {question1 = "If 0="; question2 = "-x^2+2x+7";}
	if(num == 15) {question1 = "If 0="; question2 = "-x^2+3x+2";}
	if(num == 16) {question1 = "If 0="; question2 = "-2x^2+7x+12";}
	if(num == 17) {question1 = "If 0="; question2 = "-2x^2+4x+9";}
	if(num == 18) {question1 = "If 0="; question2 = "-3x^2+5x+7";}
	if(num == 19) {question1 = "If 0="; question2 = "-5x^2+4x+13";}
			 
	quest[0] = new Equation(question1,32,false);
	quest[1] = new Equation(question2,32);
	//int totalLength = eqs[0].getLength()+eqs[1].getLength();
	//eqs[0] = new Equation(question1, w.get(14).getMiddleX()-totalLength/2,w.get(14).getMiddleY() + w.get(14).getHeight()/10,32);
	//eqs[1] = new Equation(question2, w.get(14).getMiddleX()-totalLength/2 + eqs[0].getLength(),w.get(14).getMiddleY() + w.get(14).getHeight()/10,32);
	//eqs[2] = new Equation("(AÂ±√(B))/(C)",w.get(18).getX1()+w.get(18).getWidth()*150/400,w.get(18).getY1()+w.get(18).getHeight()*3/4,48);
	quest[2] = new Equation("(A±√(B))/(C)",48);

	var question = new Question();
	question.addQuestions(quest);
	Questions.addQuadraticQuestion(num, question);
	Questions.addQuadraticSolution(num, question);
	return question;
}
	
Questions.addQuadraticQuestion = function(num, q) {
	var quest = [];
	quest[0] = "Solve for X. Supply the value for A.";
	quest[1] = "Solve for X. Supply the value for B.";
	quest[2] = "Solve for X. Supply the value for C.";
	quest[3] = "A,B,C are positive. Final solution must be reduced.";
	q.addQuestion(quest);
};
	
Questions.addQuadraticSolution = function(num, q) {
	if(num == 0) q.addSolution(2, 2, 1);
	if(num == 1) q.addSolution(1, 13, 2);
	if(num == 2) q.addSolution(5, 5, 2);
	if(num == 3) q.addSolution(3, 73, 2);
	if(num == 4) q.addSolution(5, 21, 1);
	if(num == 5) q.addSolution(9, 62, 2);
	if(num == 6) q.addSolution(7, 57, 2);
	if(num == 7) q.addSolution(2, 34, 3);
	if(num == 8) q.addSolution(5, 129, 4);
	if(num == 9) q.addSolution(7, 29, 10);
	if(num == 10) q.addSolution(3, 93, 7);
	if(num == 11) q.addSolution(5, 313, 18);
	if(num == 12) q.addSolution(7, 145, 6);
	if(num == 13) q.addSolution(3, 5, 4);
	if(num == 14) q.addSolution(1, 8, 1);
	if(num == 15) q.addSolution(3, 17, 2);
	if(num == 16) q.addSolution(7, 145, 4);
	if(num == 17) q.addSolution(2, 13, 2);
	if(num == 18) q.addSolution(5, 109, 6);
	if(num == 19) q.addSolution(2, 69, 5);
};
	
Questions.getExponentEquations = function(num) {
	//Window 4 is the Main questions window
	//(100,100)-(900,500);
	//Window 5-7 is the response windows
	//(50,500)-(350,600);
	//(350,500)-(650,600);
	//(650,500)-(950,600);
	var response1 = "", response2 = "", response3 = "",question1 = "";
	var resp = [];
	var quest = [];
	
	if(num == 0) {response1 = "x^5"; response2 = "x^6"; response3 = "x^8"; question1 = "x^2x^3";}
	if(num == 1) {response1 = "x^12"; response2 = "x^7"; response3 = "x"; question1 = "x^3x^4";}
	if(num == 2) {response1 = "x^6"; response2 = "x^5"; response3 = "x^4"; question1 = "xx^5";}
	if(num == 3) {response1 = "x^10"; response2 = "x^21"; response3 = "x^4"; question1 = "x^7x^3";}
	if(num == 4) {response1 = "x^2"; response2 = "x^6"; response3 = "x^8"; question1 = "x^2x^4";}
	if(num == 5) {response1 = "x^3"; response2 = "x^6"; response3 = "x^4"; question1 = "(x^8)/(x^2)";}
	if(num == 6) {response1 = "x^3"; response2 = "x^6"; response3 = "x^12"; question1 = "(x^9)/(x^3)";}
	if(num == 7) {response1 = "x^5"; response2 = "x^8"; response3 = "x^12"; question1 = "(x^10)/(x^2)";}
	if(num == 8) {response1 = "x^2"; response2 = "x^8"; response3 = "x^(5/3)"; question1 = "(x^5)/(x^3)";}
	if(num == 9) {response1 = "x^2"; response2 = "x^30"; response3 = "x^10"; question1 = "(x^20)/(x^10)";}
	if(num == 10) {response1 = "x^5"; response2 = "x^(-1)"; response3 = "x"; question1 = "x^2x^(-3)";}
	if(num == 11) {response1 = "x^8"; response2 = "x^(-6)"; response3 = "x^(-2)"; question1 = "x^(-2)x^(-4)";}
	if(num == 12) {response1 = "x^5"; response2 = "x^6"; response3 = "x^8"; question1 = "(x^2)^3";}
	if(num == 13) {response1 = "x^6"; response2 = "x^8"; response3 = "x^16"; question1 = "(x^4)^2";}
	if(num == 14) {response1 = "x^625"; response2 = "x^25"; response3 = "x^10"; question1 = "(x^5)^5";}
	if(num == 15) {response1 = "x^6"; response2 = "x^8"; response3 = "x^12"; question1 = "(x^2x^7)/(x^(-3))";}
	if(num == 16) {response1 = "x^2"; response2 = "x^4"; response3 = "x^(-2)"; question1 = "(x^3x^(-4))/(x^(-5))";}
	if(num == 17) {response1 = "x^12"; response2 = "x^9"; response3 = "x^15"; question1 = "(x^10x^2)/(x^(-3))";}
	if(num == 18) {response1 = "x^(2/3)"; response2 = "x^(7/3)"; response3 = "x^(-2/3)"; question1 = "x^(3/2)x^(5/6)";}
	if(num == 19) {response1 = "x^(11/9)"; response2 = "x^(-1/9)"; response3 = "x^(1/9)"; question1 = "x^(2/3)x^(5/9)";}
	quest[0] = new Equation(question1,64);
	//eqs[0] = new Equation(question1,w.get(4).getMiddleX()-eqs[0].getLength()/2,w.get(4).getMiddleY() + w.get(4).getHeight()/10,64);
	resp[0] = new Equation(response1,32);
	//eqs[1] = new Equation(response1,w.get(5).getMiddleX()-eqs[1].getLength()/2,w.get(5).getMiddleY() + w.get(5).getHeight()/10,32);
	resp[1] = new Equation(response2,32);
	//eqs[2] = new Equation(response2,w.get(6).getMiddleX()-eqs[2].getLength()/2,w.get(6).getMiddleY() + w.get(6).getHeight()/10,32);
	resp[2] = new Equation(response3,32);
	//eqs[3] = new Equation(response3,w.get(7).getMiddleX()-eqs[3].getLength()/2,w.get(7).getMiddleY() + w.get(7).getHeight()/10,32);
	
	var question = new Question();
	question.addQuestions(quest);
	question.addResponse(resp);
	Questions.addExponentQuestion(num, question);
	Questions.addExponentSolution(num, question);
	question.shuffle();
	return question;
};
	
Questions.addExponentQuestion = function(num, q) {
	var quest = "";
	quest = "How does the following reduce?";
	q.addQuestion(quest);
};
	
Questions.addExponentSolution = function(num, q) {
	if(num == 0) q.addSolution(0);
	if(num == 1) q.addSolution(1);
	if(num == 2) q.addSolution(0);
	if(num == 3) q.addSolution(0);
	if(num == 4) q.addSolution(1);
	if(num == 5) q.addSolution(1);
	if(num == 6) q.addSolution(1);
	if(num == 7) q.addSolution(1);
	if(num == 8) q.addSolution(0);
	if(num == 9) q.addSolution(2);
	if(num == 10) q.addSolution(1);
	if(num == 11) q.addSolution(1);
	if(num == 12) q.addSolution(1);
	if(num == 13) q.addSolution(1);
	if(num == 14) q.addSolution(1);
	if(num == 15) q.addSolution(2);
	if(num == 16) q.addSolution(1);
	if(num == 17) q.addSolution(2);
	if(num == 18) q.addSolution(1);
	if(num == 19) q.addSolution(0);
};
	
Questions.getLogarithmEquations = function(num) {
	//Windows 5 - 7 are the response windows
	//(5,400)-(333,500) (333,400)-(666,500) (666,400)-(1000,500)
	//Window 8
	//(5,100)-(1000,300)
	var response1 = "", response2 = "", response3 = "",question1 = "";
	var resp = [];
	var quest = [];
	if(num == 0) {response1 = "ln(3x)"; response2 = "3ln(x)"; response3 = "ln(x^3)"; question1 = "ln(3)+ln(x)";}
	if(num == 1) {response1 = "4ln(x)"; response2 = "ln(4x)"; response3 = "ln(x^4)"; question1 = "ln(x)+ln(4)";}
	if(num == 2) {response1 = "ln(12)"; response2 = "ln(48)"; response3 = "ln(32)"; question1 = "ln(4)+ln(8)";}
	if(num == 3) {response1 = "ln(8x)"; response2 = "ln(42x)"; response3 = "6ln(x)"; question1 = "ln(4)+ln(2)+ln(x)";}
	if(num == 4) {response1 = "ln((x+y+7))"; response2 = "ln((7xy))"; response3 = "7ln((xy))"; question1 = "ln(x)+ln(y)+ln(7)";}
	if(num == 5) {response1 = "ln((x)/(2))"; response2 = "ln(2x)"; response3 = "2ln(x)"; question1 = "ln(x)-ln(2)";}
	if(num == 6) {response1 = "ln(2)"; response2 = "2ln(x)"; response3 = "2ln(2)"; question1 = "ln(4)-ln(2)";}
	if(num == 7) {response1 = "ln(100)"; response2 = "ln(15)"; response3 = "ln(4)"; question1 = "ln(20)-ln(5)";}
	if(num == 8) {response1 = "ln((2x)/(7))"; response2 = "ln((x)/(14))"; response3 = "ln((x-9))"; question1 = "ln(x)-ln(2)-ln(7)";}
	if(num == 9) {response1 = "ln(6x)"; response2 = "ln(10x)"; response3 = "ln((6)/(x))"; question1 = "ln(12)-ln(x)-ln(2)";}
	if(num == 10) {response1 = "3ln(x)"; response2 = "ln(x)+ln(3x)"; response3 = "ln(x)-3ln(x)"; question1 = "ln(x^3)";}
	if(num == 11) {response1 = "ln(49)"; response2 = "ln(14)"; response3 = "ln(9)"; question1 = "2ln(7)";}
	if(num == 12) {response1 = "ln(2^x)"; response2 = "ln(x^2)"; response3 = "ln(2x)"; question1 = "xln(2)";}
	if(num == 13) {response1 = "ln((3)/(2))"; response2 = "ln(32)"; response3 = "ln(2)"; question1 = "3ln(2)-ln(4)";}
	if(num == 14) {response1 = "ln(x)+ln(2)"; response2 = "2ln(x)"; response3 = "ln((2+x))"; question1 = "ln((2x))";}
	if(num == 15) {response1 = "ln(2)+ln(4)"; response2 = "2ln(2)"; response3 = "ln(4)-ln(2)"; question1 = "ln(4)";}
	if(num == 16) {response1 = "ln(3x)-ln(8)"; response2 = "3ln((x-2))"; response3 = "3ln(x)-3ln(2)"; question1 = "ln(x^3)-ln(8)";}
	if(num == 17) {response1 = "ln(16)"; response2 = "ln(8)"; response3 = "2ln(2)"; question1 = "3ln(4)-2ln(2)";}
	if(num == 18) {response1 = "ln((2xy))"; response2 = "ln((2x)/(y))"; response3 = "ln((x)/(2y))"; question1 = "ln(x)+ln(2)-ln(y)";}
	if(num == 19) {response1 = "ln((27)/(2x))"; response2 = "ln((27)/(x^2))"; response3 = "ln((27(x^2-x^4)))"; question1 = "2ln(x)+3ln(3)-4ln(x)";}

	resp[0] = new Equation(response1,32);
	//eqs[0] = new Equation(response1,w.get(5).getMiddleX()-eqs[0].getLength()/2,w.get(5).getMiddleY() + w.get(5).getHeight()/10,32);
	resp[1] = new Equation(response2,32);
	//eqs[1] = new Equation(response2,w.get(6).getMiddleX()-eqs[1].getLength()/2,w.get(6).getMiddleY() + w.get(6).getHeight()/10,32);
	resp[2] = new Equation(response3,32);
	//eqs[2] = new Equation(response3,w.get(7).getMiddleX()-eqs[2].getLength()/2,w.get(7).getMiddleY() + w.get(7).getHeight()/10,32);
	quest[0] = new Equation(question1,64);
	//eqs[3] = new Equation(question1,w.get(8).getMiddleX()-eqs[3].getLength()/2,w.get(8).getMiddleY() + w.get(8).getHeight()*60/200,64);
	var question = new Question();
	question.addQuestions(quest);
	question.addResponse(resp);
	Questions.addLogarithmQuestion(num, question);
	Questions.addLogarithmSolution(num, question);
	question.shuffle();
	return question;
};
	
Questions.addLogarithmQuestion = function(num, q) {
	var quest = "";
	quest = "Which expression is equivalent to the one below?";
	q.addQuestion(quest);
};
	
Questions.addLogarithmSolution = function(num, q) {
	if(num == 0) q.addSolution(0);
	if(num == 1) q.addSolution(1);
	if(num == 2) q.addSolution(2);
	if(num == 3) q.addSolution(0);
	if(num == 4) q.addSolution(1);
	if(num == 5) q.addSolution(0);
	if(num == 6) q.addSolution(0);
	if(num == 7) q.addSolution(2);
	if(num == 8) q.addSolution(1);
	if(num == 9) q.addSolution(2);
	if(num == 10) q.addSolution(0);
	if(num == 11) q.addSolution(0);
	if(num == 12) q.addSolution(0);
	if(num == 13) q.addSolution(2);
	if(num == 14) q.addSolution(0);
	if(num == 15) q.addSolution(1);
	if(num == 16) q.addSolution(2);
	if(num == 17) q.addSolution(0);
	if(num == 18) q.addSolution(1);
	if(num == 19) q.addSolution(1);
};
	
Questions.getPieceWiseEquations = function(num) {
	//Window 5 is the question Window
	//(100,100)-(900,500);
	//Window 6-8 are the response windows
	//(50,500)-(350,600);
	//(350,500)-(650,600);
	//(650,500)-(950,600);
	var response1 = "", response2 = "", response3 = "", question1 = "", question2 = "", question3 = "", question4 = "", question5 = "", question6 = "";
	var resp = [];
	var quest = [];
	if(num == 0) {response1 = "-4"; response2 ="-1"; response3 = "7"; question1 = "f(x)="; question2 = "{"; question3 = "x^2-4x"; question4 ="-2x+3";question5 = "x>3";question6 = "x<3";}
	if(num == 1) {response1 = "-5"; response2 ="0"; response3 = "11"; question1 = "f(x)="; question2 = "{"; question3 = "x^2-4x"; question4 ="-2x+3";question5 = "x>3";question6 = "x<3";}
	if(num == 2) {response1 = "2"; response2 ="6"; response3 = "-2"; question1 = "f(x)="; question2 = "{"; question3 = "3x^2-7x"; question4 ="4x-2";question5 = "x>1";question6 = "x<1";}
	if(num == 3) {response1 = "-2"; response2 ="0"; response3 = "-7"; question1 = "f(x)="; question2 = "{"; question3 = "3x^2-7x"; question4 ="4x-2";question5 = "x>1";question6 = "x<1";}
	if(num == 4) {response1 = "2"; response2 ="0"; response3 = "-7"; question1 = "f(x)="; question2 = "{"; question3 = "-7x+2"; question4 ="x^3";question5 = "x>-1";question6 = "x<-1";}
	if(num == 5) {response1 = "23"; response2 ="-27"; response3 = "27"; question1 = "f(x)="; question2 = "{"; question3 = "-7x+2"; question4 ="x^3";question5 = "x>-1";question6 = "x<-1";}
	if(num == 6) {response1 = "10"; response2 ="70"; response3 = "3"; question1 = "f(x)="; question2 = "{"; question3 = "7/x+2"; question4 ="10x";question5 = "x>2";question6 = "x<2";}
	if(num == 7) {response1 = "20"; response2 ="-5"; response3 = "-10"; question1 = "f(x)="; question2 = "{"; question3 = "7/x+2"; question4 ="10x";question5 = "x>2";question6 = "x<2";}
	if(num == 8) {response1 = "5"; response2 ="4"; response3 = "12"; question1 = "f(x)="; question2 = "{"; question3 = "(16)/(x^2)+x"; question4 ="x^2-3x";question5 = "x>3";question6 = "x<3";}
	if(num == 9) {response1 = "-2"; response2 ="17"; response3 = "4"; question1 = "f(x)="; question2 = "{"; question3 = "(16)/(x^2)+x"; question4 ="x^2-3x";question5 = "x>3";question6 = "x<3";}
	if(num == 10) {response1 = "1"; response2 ="2"; response3 = "-1"; question1 = "f(x)="; question2 = "{"; question3 = "x(x+1)"; question4 ="-x(x^2-2)";question5 = "x>-2";question6 = "x<-2";}
	if(num == 11) {response1 = "12"; response2 ="56"; response3 = "-56"; question1 = "f(x)="; question2 = "{"; question3 = "x(x+1)"; question4 ="-x(x^2-2)";question5 = "x>-2";question6 = "x<-2";}
	if(num == 12) {response1 = "3sin(2)+2"; response2 ="1/2"; response3 = "4/3"; question1 = "f(x)="; question2 = "{"; question3 = "(x^2)/(x+1)"; question4 ="3sin(x)+2";question5 = "x>1";question6 = "x<1";}
	if(num == 13) {response1 = "2"; response2 ="0"; response3 = "5"; question1 = "f(x)="; question2 = "{"; question3 = "(x^2)/(x+1)"; question4 ="3sin(x)+2";question5 = "x>1";question6 = "x<1";}
	if(num == 14) {response1 = "620"; response2 ="424"; response3 = "-668"; question1 = "f(x)="; question2 = "{"; question3 = "x^3+2x^2-3x+4"; question4 ="-x^3-2x^2-3x-4";question5 = "x>7";question6 = "x<7";}
	if(num == 15) {response1 = "4"; response2 ="14"; response3 = "-40"; question1 = "f(x)="; question2 = "{"; question3 = "x^3+2x^2-3x+4"; question4 ="-x^3-2x^2-3x-4";question5 = "x>7";question6 = "x<7";}
	if(num == 16) {response1 = "13"; response2 ="1"; response3 = "-12"; question1 = "f(x)="; question2 = "{"; question3 = "x^4-x^2+1"; question4 ="-x^3-x-2";question5 = "x>0";question6 = "x<0";}
	if(num == 17) {response1 = "73"; response2 ="28"; response3 = "-26"; question1 = "f(x)="; question2 = "{"; question3 = "x^4-x^2+1"; question4 ="-x^3-x-2";question5 = "x>0";question6 = "x<0";}
	if(num == 18) {response1 = "5"; response2 ="(16)/(17)"; response3 = "(12)/(13)"; question1 = "f(x)="; question2 = "{"; question3 = "(8(x-2))/(x^2+1)"; question4 ="5";question5 = "x>4";question6 = "x<4";}
	if(num == 19) {response1 = "4"; response2 ="-4"; response3 = "5"; question1 = "f(x)="; question2 = "{"; question3 = "(8(x-2))/(x^2+1)"; question4 ="5";question5 = "x>4";question6 = "x<4";}
	
	resp[0] = new Equation(response1,32);
	//eqs[0] = new Equation(response1,w.get(6).getMiddleX()-eqs[0].getLength()/2,w.get(6).getMiddleY()+w.get(6).getHeight()/10,32);
	resp[1] = new Equation(response2,32);
	//eqs[1] = new Equation(response2,w.get(7).getMiddleX()-eqs[1].getLength()/2,w.get(7).getMiddleY()+w.get(7).getHeight()/10,32);
	resp[2] = new Equation(response3,32);
	//eqs[2] = new Equation(response3,w.get(8).getMiddleX()-eqs[2].getLength()/2,w.get(8).getMiddleY()+w.get(8).getHeight()/10,32);
	
	
	//Question window, x:100-900, y:100-500
	quest[0] = new Equation(question1,50,false);
	quest[1] = new Equation(question2,256,false);
	quest[2] = new Equation(question3,50);
	quest[3] = new Equation(question4,50);
	quest[4] = new Equation(question5,50,false);
	quest[5] = new Equation(question6,50,false);
	//int totalLength = eqs[3].getLength() + eqs[4].getLength() + Math.max(eqs[5].getLength()+ eqs[7].getLength() + Equation.getXSize(64), eqs[6].getLength()+ eqs[8].getLength()+ Equation.getXSize(64));
	//eqs[3] = new Equation(question1,w.get(5).getMiddleX()-totalLength/2,w.get(5).getMiddleY()+w.get(5).getHeight()*60/400,50,false);
	//eqs[4] = new Equation(question2,w.get(5).getMiddleX()-totalLength/2+eqs[3].getLength(),w.get(5).getMiddleY()+w.get(5).getHeight()/4,256,false);
	//eqs[5] = new Equation(question3,w.get(5).getMiddleX()-totalLength/2+eqs[3].getLength()+eqs[4].getLength(),w.get(5).getMiddleY(),50);
	//eqs[6] = new Equation(question4,w.get(5).getMiddleX()-totalLength/2+eqs[3].getLength()+eqs[4].getLength(),w.get(5).getMiddleY()+w.get(5).getHeight()/4,50);
	//eqs[7] = new Equation(question5,w.get(5).getMiddleX()-totalLength/2+eqs[3].getLength()+eqs[4].getLength()+Math.max(eqs[5].getLength(), eqs[6].getLength()) + Equation.getXSize(64),w.get(5).getMiddleY(),50,false);
	//eqs[8] = new Equation(question6,w.get(5).getMiddleX()-totalLength/2+eqs[3].getLength()+eqs[4].getLength()+Math.max(eqs[5].getLength(), eqs[6].getLength()) + Equation.getXSize(64),w.get(5).getMiddleY()+w.get(5).getHeight()/4,50,false);
	
	var question = new Question();
	question.addQuestions(quest);
	question.addResponse(resp);
	Questions.addPieceWiseQuestion(num, question);
	Questions.addPieceWiseSolution(num, question);
	question.shuffle();
	return question;
};
	
Questions.addPieceWiseQuestion = function(num, q) {
	if(num == 0) q.addQuestion("          What is f(2)?");
	if(num == 1) q.addQuestion("          What is f(4)?");
	if(num == 2) q.addQuestion("          What is f(2)?");
	if(num == 3) q.addQuestion("          What is f(0)?");
	if(num == 4) q.addQuestion("          What is f(0)?");
	if(num == 5) q.addQuestion("          What is f(-3)?");
	if(num == 6) q.addQuestion("          What is f(7)?");
	if(num == 7) q.addQuestion("          What is f(-1)?");
	if(num == 8) q.addQuestion("          What is f(4)?");
	if(num == 9) q.addQuestion("          What is f(1)?");
	if(num == 10) q.addQuestion("          What is f(1)?");
	if(num == 11) q.addQuestion("          What is f(-4)?");
	if(num == 12) q.addQuestion("          What is f(2)?");
	if(num == 13) q.addQuestion("          What is f(0)?");
	if(num == 14) q.addQuestion("          What is f(8)?");
	if(num == 15) q.addQuestion("          What is f(-3)?");
	if(num == 16) q.addQuestion("          What is f(2)?");
	if(num == 17) q.addQuestion("          What is f(-3)?");
	if(num == 18) q.addQuestion("          What is f(5)?");
	if(num == 19) q.addQuestion("          What is f(1)?");
};
	
Questions.addPieceWiseSolution = function(num, q) {
	if(num == 0) q.addSolution(1);
	if(num == 1) q.addSolution(1);
	if(num == 2) q.addSolution(2);
	if(num == 3) q.addSolution(0);
	if(num == 4) q.addSolution(0);
	if(num == 5) q.addSolution(1);
	if(num == 6) q.addSolution(2);
	if(num == 7) q.addSolution(2);
	if(num == 8) q.addSolution(0);
	if(num == 9) q.addSolution(0);
	if(num == 10) q.addSolution(1);
	if(num == 11) q.addSolution(1);
	if(num == 12) q.addSolution(2);
	if(num == 13) q.addSolution(0);
	if(num == 14) q.addSolution(0);
	if(num == 15) q.addSolution(0);
	if(num == 16) q.addSolution(0);
	if(num == 17) q.addSolution(1);
	if(num == 18) q.addSolution(2);
	if(num == 19) q.addSolution(2);
};
	
Questions.getVolumeAreaEquations = function(num) {
	//Window 6-8 are the response windows
	//(5,400)-(333,500);
	//(333,400)-(666,500);
	//(666,400)-(1000,500);
	var response1 = "", response2 = "", response3 = "", response4 = "";
	var resp = [];
	if(num == 0) {response1 = "A="; response2 ="lw"; response3 = "l+w"; response4 = "2lw";}
	if(num == 1) {response1 = "A="; response2 ="√(s)"; response3 = "s^2"; response4 = "s^3";}
	if(num == 2) {response1 = "A="; response2 ="2bh"; response3 = "bh"; response4 = "1/2bh";}
	if(num == 3) {response1 = "A="; response2 ="bh"; response3 = "1/2bh"; response4 = "2bh";}
	if(num == 4) {response1 = "A="; response2 ="1/2πr^2"; response3 = "πr^2"; response4 = "2πr";}
	if(num == 5) {response1 = "A="; response2 ="2πr"; response3 = "πr^2"; response4 = "1/2πr^2";}
	if(num == 6) {response1 = "V="; response2 ="s^3"; response3 = "s^2+l^2"; response4 = "6s^2";}
	if(num == 7) {response1 = "V="; response2 ="2lwh"; response3 = "lwh"; response4 = "1/2lwh";}
	if(num == 8) {response1 = "V="; response2 ="2Bh"; response3 = "1/2Bh"; response4 = "Bh";}
	if(num == 9) {response1 = "V="; response2 ="(4)/(3)πr^3"; response3 = "4πr^3"; response4 = "πr^3";}
	if(num == 10) {response1 = "SA="; response2 ="4πr^3"; response3 = "4πr^2"; response4 = "πr^2";}
	if(num == 11) {response1 = "SA="; response2 ="4s^2+2l^2"; response3 = "s^3"; response4 = "6s^2";}
	if(num == 12) {response1 = "C="; response2 ="2πr"; response3 = "πr^2"; response4 = "2πr^2";}
	if(num == 13) {response1 = "A="; response2 ="bh"; response3 = "1/2(b₁+b₂)h"; response4 = "(b₁+b₂)h";}
	if(num == 14) {response1 = "V="; response2 ="1/2πr^2h"; response3 = "2πr^2h"; response4 = "πr^2h";}
	if(num == 15) {response1 = "V="; response2 ="1/3s^2h"; response3 = "1/2s^2h"; response4 = "s^2h";}
	if(num == 16) {response1 = "V="; response2 ="1/2πr^2h"; response3 = "1/3πr^2h"; response4 = "πr^2";}
	resp[3] = new Equation(response1,32,false);
	resp[0] = new Equation(response2,32);
	//int totalLength = eqs[0].getLength() + eqs[1].getLength();
	//eqs[0] = new Equation(response1,w.get(6).getMiddleX()-totalLength/2,w.get(6).getMiddleY()+w.get(6).getHeight()/10,32,false);
	//eqs[1] = new Equation(response2,w.get(6).getMiddleX()-totalLength/2 + eqs[0].getLength(),w.get(6).getMiddleY()+w.get(6).getHeight()/10,32);
	
	resp[4] = new Equation(response1,32,false);
	resp[1] = new Equation(response3,32);
	//totalLength = eqs[2].getLength() + eqs[3].getLength();
	//eqs[2] = new Equation(response1,w.get(7).getMiddleX()-totalLength/2,w.get(7).getMiddleY()+w.get(7).getHeight()/10,32,false);
	//eqs[3] = new Equation(response3,w.get(7).getMiddleX()-totalLength/2 + eqs[2].getLength(),w.get(7).getMiddleY()+w.get(7).getHeight()/10,32);
	
	//Question window, x:100-900, y:100-500
	resp[5] = new Equation(response1,32,false);
	resp[2] = new Equation(response4,32);
	//totalLength = eqs[0].getLength() + eqs[1].getLength();
	//eqs[4] = new Equation(response1,w.get(8).getMiddleX()-totalLength/2,w.get(8).getMiddleY()+w.get(8).getHeight()/10,32,false);
	//eqs[5] = new Equation(response4,w.get(8).getMiddleX()-totalLength/2 + eqs[4].getLength(),w.get(8).getMiddleY()+w.get(6).getHeight()/10,32);
		
	var question = new Question();
	question.addResponse(resp);
	Questions.addVolumeAreaQuestion(num, question);
	Questions.addVolumeAreaSolution(num, question);
	var limits = [0,1,2];
	question.shuffle(limits);
	return question;
};
	
Questions.addVolumeAreaQuestion = function(num, q) {
	if(num == 0) q.addQuestion("What formula is the Area of a Rectangle?");
	if(num == 1) q.addQuestion("What formula is the Area of a Square?");
	if(num == 2) q.addQuestion("What formula is the Area of a Triangle?");
	if(num == 3) q.addQuestion("What formula is the Area of a Parallelogram?");
	if(num == 4) q.addQuestion("What formula is the Area of a Circle?");
	if(num == 5) q.addQuestion("What formula is the Area of a Semicircle?");
	if(num == 6) q.addQuestion("What formula is the Volume of a Cube?");
	if(num == 7) q.addQuestion("What formula is the Volume of a Rectangular Prism?");
	if(num == 8) q.addQuestion("What formula is the Volume of a Triangular Prism?");
	if(num == 9) q.addQuestion("What formula is the Volume of a Sphere?");
	if(num == 10) q.addQuestion("What formula is the Surface Area of a Sphere?");
	if(num == 11) q.addQuestion("What formula is the Surface Area of a Cube?");
	if(num == 12) q.addQuestion("What formula is the Circumference of a Circle?");
	if(num == 13) q.addQuestion("What formula is the Area of a Trapezoid?");
	if(num == 14) q.addQuestion("What formula is the Volume of a Cylinder?");
	if(num == 15) q.addQuestion("What formula is the Volume of a Square Based Pyramid?");
	if(num == 16) q.addQuestion("What formula is the Volume of a Cone?");
};
	
Questions.addVolumeAreaSolution = function(num, q) {
	if(num == 0) q.addSolution(0);
	if(num == 1) q.addSolution(1);
	if(num == 2) q.addSolution(2);
	if(num == 3) q.addSolution(0);
	if(num == 4) q.addSolution(1);
	if(num == 5) q.addSolution(2);
	if(num == 6) q.addSolution(0);
	if(num == 7) q.addSolution(1);
	if(num == 8) q.addSolution(2);
	if(num == 9) q.addSolution(0);
	if(num == 10) q.addSolution(1);
	if(num == 11) q.addSolution(2);
	if(num == 12) q.addSolution(0);
	if(num == 13) q.addSolution(1);
	if(num == 14) q.addSolution(2);
	if(num == 15) q.addSolution(0);
	if(num == 16) q.addSolution(1);
};
	
Questions.getCompleteSquareEquations = function(num) {
	//Window 6-8 are the response windows
	//(5,400,333,500,false);
	//(333,400,666,500,false);
	//(666,400,1000,500,false);
	//Window 9 is the question window
	//(5,100,1000,300,false);
	var response1 = "", response2 = "", response3 = "",question1 = "",question2 = "";
	
	
	var resp = [];
	var quest = [];
	if(num == 0) {response1 = "1"; response2 = "2"; response3 = "4"; question1 = "x^2+4x"; question2 = "+__";}
	if(num == 1) {response1 = "1"; response2 = "2"; response3 = "4"; question1 = "x^2+2x"; question2 = "+__";}
	if(num == 2) {response1 = "9"; response2 = "6"; response3 = "3"; question1 = "x^2+6x"; question2 = "+__";}
	if(num == 3) {response1 = "1"; response2 = "2"; response3 = "1/4"; question1 = "x^2+x"; question2 = "+__";}
	if(num == 4) {response1 = "-4"; response2 = "-2"; response3 = "4"; question1 = "x^2-4x"; question2 = "+__";}
	if(num == 5) {response1 = "-1"; response2 = "2"; response3 = "1"; question1 = "x^2-2x"; question2 = "+__";}
	if(num == 6) {response1 = "3"; response2 = "9"; response3 = "-9"; question1 = "x^2-6x"; question2 = "+__";}
	if(num == 7) {response1 = "1"; response2 = "-1"; response3 = "1/4"; question1 = "x^2-x"; question2 = "+__";}
	if(num == 8) {response1 = "36"; response2 = "6"; response3 = "24"; question1 = "x^2-12x"; question2 = "+__";}
	if(num == 9) {response1 = "7"; response2 = "28"; response3 = "49"; question1 = "x^2+14x"; question2 = "+__";}
	if(num == 10) {response1 = "32"; response2 = "-32"; response3 = "64"; question1 = "x^2-16x"; question2 = "+__";}
	if(num == 11) {response1 = "36"; response2 = "81"; response3 = "-81"; question1 = "x^2+18x"; question2 = "+__";}
	if(num == 12) {response1 = "169/4"; response2 = "26"; response3 = "169/2"; question1 = "x^2-13x"; question2 = "+__";}
	if(num == 13) {response1 = "15/2"; response2 = "225/4"; response3 = "30"; question1 = "x^2+15x"; question2 = "+__";}
	if(num == 14) {response1 = "-289/2"; response2 = "289/4"; response3 = "34"; question1 = "x^2-17x"; question2 = "+__";}
	if(num == 15) {response1 = "38"; response2 = "19/2"; response3 = "361/4"; question1 = "x^2+19x"; question2 = "+__";}
	if(num == 16) {response1 = "2500"; response2 = "500"; response3 = "200"; question1 = "x^2-100x"; question2 = "+__";}
	if(num == 17) {response1 = "25/9"; response2 = "25/(36)"; response3 = "-5/6"; question1 = "x^2-5/3x"; question2 = "+__";}
	if(num == 18) {response1 = "49/(36)"; response2 = "14/6"; response3 = "49/(144)"; question1 = "x^2+7/6x"; question2 = "+__";}
	if(num == 19) {response1 = "11/(18)"; response2 = "121/(81)"; response3 = "121/(324)"; question1 = "x^2-11/9x"; question2 = "+__";}
	

	resp[0] = new Equation(response1,32);
	//eqs[0] = new Equation(response1,w.get(6).getMiddleX()-eqs[0].getLength()/2,w.get(6).getMiddleY()+w.get(6).getHeight()/10,32);
			
	resp[1] = new Equation(response2,32);
	//eqs[1] = new Equation(response2,w.get(7).getMiddleX()-eqs[1].getLength()/2,w.get(7).getMiddleY()+w.get(7).getHeight()/10,32);
				
	//Question window, x:100-900, y:100-500
	resp[2] = new Equation(response3,32);
	//eqs[2] = new Equation(response3,w.get(8).getMiddleX()-eqs[2].getLength()/2,w.get(8).getMiddleY()+w.get(8).getHeight()/10,32);
	
	quest[0] = new Equation(question1,50);
	quest[1] = new Equation(question2,50,false);
	//int totalLength = eqs[3].getLength() + eqs[4].getLength();
	//eqs[3] = new Equation(question1,w.get(9).getMiddleX()-totalLength/2,w.get(9).getMiddleY()+w.get(9).getHeight()*60/200,64);
	//eqs[4] = new Equation(question2,w.get(9).getMiddleX()-totalLength/2+eqs[3].getLength(),w.get(9).getMiddleY()+w.get(9).getHeight()*60/200,64,false);
					
	var question = new Question();
	question.addResponse(resp);
	question.addQuestions(quest);
	Questions.addCompleteSquareQuestion(num, question);
	Questions.addCompleteSquareSolution(num, question);
	question.shuffle();
	return question;
};
	
Questions.addCompleteSquareQuestion = function(num, q) {
	q.addQuestion("What value will complete the square for the following?");
};
	
Questions.addCompleteSquareSolution = function(num, q) {
	if(num == 0) q.addSolution(2);
	if(num == 1) q.addSolution(0);
	if(num == 2) q.addSolution(0);
	if(num == 3) q.addSolution(2);
	if(num == 4) q.addSolution(2);
	if(num == 5) q.addSolution(2);
	if(num == 6) q.addSolution(1);
	if(num == 7) q.addSolution(2);
	if(num == 8) q.addSolution(0);
	if(num == 9) q.addSolution(2);
	if(num == 10) q.addSolution(2);
	if(num == 11) q.addSolution(1);
	if(num == 12) q.addSolution(0);
	if(num == 13) q.addSolution(1);
	if(num == 14) q.addSolution(1);
	if(num == 15) q.addSolution(2);
	if(num == 16) q.addSolution(0);
	if(num == 17) q.addSolution(1);
	if(num == 18) q.addSolution(2);
	if(num == 19) q.addSolution(2);
};
	
Questions.getAbsoluteValueEquations = function(num) {
	//Window 6-11 are the response windows
	//(100,105,400,205,false);
	//(550,105,850,205,false);
	//(100,205,400,305,false);
	//(550,205,850,305,false);
	//(100,305,400,405,false);
	//(550,305,850,405,false);
	//Window 12 is the question window
	//(100,5,850,105,false);
	var response1 = "", response2 = "", response3 = "", response4 = "", response5 = "", response6 = "", question1 = "";
		
	var resp = [];
	var quest = [];
	
	if(num == 0) {response1 = "-4"; response2 ="4"; response3 = "-5"; response4 = "5"; response5 = "9"; response6 = "-9"; question1 ="|x+2|=7";}
	if(num == 1) {response1 = "12"; response2 ="-2"; response3 = "2"; response4 = "-12"; response5 = "-10"; response6 = "10"; question1 ="|x-7|=5";}
	if(num == 2) {response1 = "-20"; response2 ="2"; response3 = "22"; response4 = "20"; response5 = "-22"; response6 = "-2"; question1 ="|x+10|=12";}
	if(num == 3) {response1 = "8"; response2 ="22"; response3 = "32"; response4 = "-32"; response5 = "-22"; response6 = "-8"; question1 ="|x-12|=20";}
	if(num == 4) {response1 = "-10"; response2 ="10"; response3 = "-5"; response4 = "5"; response5 = "-13"; response6 = "13"; question1 ="|x+4|=9";}
	if(num == 5) {response1 = "9"; response2 ="-2"; response3 = "2"; response4 = "7/2"; response5 = "9"; response6 = "-7/2"; question1 ="|2x-7|=11";}
	if(num == 6) {response1 = "-2"; response2 ="7"; response3 = "-3"; response4 = "2"; response5 = "3"; response6 = "-7"; question1 ="|3x-6|=15";}
	if(num == 7) {response1 = "-3/4"; response2 ="13/4"; response3 = "7/4"; response4 = "-13/4"; response5 = "-7/4"; response6 = "3/4"; question1 ="|4x-3|=10";}
	if(num == 8) {response1 = "-4"; response2 ="4"; response3 = "10"; response4 = "-2"; response5 = "-10"; response6 = "2"; question1 ="|2x-8|=12";}
	if(num == 9) {response1 = "4"; response2 ="11"; response3 = "-4"; response4 = "19"; response5 = "-19"; response6 = "-11"; question1 ="|5x-20|=75";}
	if(num == 10) {response1 = "9"; response2 ="-13"; response3 = "13"; response4 = "5"; response5 = "1 solution"; response6 = "-9"; question1 ="|x+7|=2x+20";}
	if(num == 11) {response1 = "1 solution"; response2 ="4"; response3 = "2"; response4 = "9"; response5 = "-9"; response6 = "-2"; question1 ="|x-5|=3x+13";}
	if(num == 12) {response1 = "-4"; response2 ="2"; response3 = "1 solution"; response4 = "14"; response5 = "-2"; response6 = "-14"; question1 ="|2x-10|=x+4";}
	if(num == 13) {response1 = "-9/2"; response2 ="12/5"; response3 = "-12/5"; response4 = "1 solution"; response5 = "8"; response6 = "-8"; question1 ="|4x-18|=x+6";}
	if(num == 14) {response1 = "-7/5"; response2 ="1 solution"; response3 = "-5/3"; response4 = "7/5"; response5 = "-6"; response6 = "6"; question1 ="|5x-7|=x+17";}
	if(num == 15) {response1 = "-4/3"; response2 ="4/3"; response3 = "10"; response4 = "-10"; response5 = "7"; response6 = "-7"; question1 ="|x+3|=|2x-7|";}
	if(num == 16) {response1 = "-5"; response2 ="1/2"; response3 = "-1/2"; response4 = "5"; response5 = "9"; response6 = "-9"; question1 ="|x+10|=|3x-8|";}
	if(num == 17) {response1 = "-3/4"; response2 ="-2/3"; response3 = "3/4"; response4 = "-5"; response5 = "5"; response6 = "2/3"; question1 ="|2x-7|=|4x+3|";}
	if(num == 18) {response1 = "-4"; response2 ="-4/5"; response3 = "4"; response4 = "4/5"; response5 = "12/7"; response6 = "-12/7"; question1 ="|3x-4|=|7x+12|";}
	if(num == 19) {response1 = "-5/4"; response2 ="-3/8"; response3 = "1/(20)"; response4 = "3/8"; response5 = "-1/(20)"; response6 = "5/4"; question1 ="|8x+-3|=|12x+2|";}
	
	resp[0] = new Equation(response1,32);
	//eqs[0] = new Equation(response1,w.get(6).getMiddleX()-(eqs[0].getLength())/2,w.get(6).getMiddleY()+w.get(6).getHeight()/10,32);
			
	resp[1] = new Equation(response2,32);
	//eqs[1] = new Equation(response2,w.get(7).getMiddleX()-(eqs[1].getLength())/2,w.get(7).getMiddleY()+w.get(7).getHeight()/10,32);
				
	resp[2] = new Equation(response3,32);
	//eqs[2] = new Equation(response3,w.get(8).getMiddleX()-(eqs[2].getLength())/2,w.get(8).getMiddleY()+w.get(8).getHeight()/10,32);
	
	resp[3] = new Equation(response4,32);
	//eqs[3] = new Equation(response4,w.get(9).getMiddleX()-(eqs[3].getLength())/2,w.get(9).getMiddleY()+w.get(9).getHeight()/10,32);
	
	resp[4] = new Equation(response5,32);
	//eqs[4] = new Equation(response5,w.get(10).getMiddleX()-(eqs[4].getLength())/2,w.get(10).getMiddleY()+w.get(10).getHeight()/10,32);
	
	resp[5] = new Equation(response6,32);
	//eqs[5] = new Equation(response6,w.get(11).getMiddleX()-(eqs[5].getLength())/2,w.get(11).getMiddleY()+w.get(11).getHeight()/10,32);
	
	quest[0] = new Equation(question1,32);
	//eqs[6] = new Equation(question1,w.get(12).getMiddleX()-(eqs[6].getLength())/2,w.get(12).getMiddleY()+w.get(12).getHeight()/10,32);
				
	var question = new Question();
	question.addResponse(resp);
	question.addQuestions(quest);
	Questions.addAbsoluteValueQuestion(num, question);
	Questions.addAbsoluteValueSolution(num, question);
	question.shuffle();
	return question;
};
	
Questions.addAbsoluteValueQuestion = function(num, q) {
	q.addQuestion("Which two values will solve the equation?");
};
	
Questions.addAbsoluteValueSolution = function(num, q) {
	if(num == 0) q.addSolution(3, 5); q.addSolution(5, 3);
	if(num == 1) q.addSolution(2, 0); q.addSolution(0, 2);
	if(num == 2) q.addSolution(1, 4); q.addSolution(4, 1);
	if(num == 3) q.addSolution(2, 5); q.addSolution(5, 2);
	if(num == 4) q.addSolution(3, 4); q.addSolution(4, 3);
	if(num == 5) q.addSolution(0, 1); q.addSolution(1, 0);
	if(num == 6) q.addSolution(1, 2); q.addSolution(2, 1);
	if(num == 7) q.addSolution(1, 4); q.addSolution(4, 1);
	if(num == 8) q.addSolution(3, 2); q.addSolution(2, 3);
	if(num == 9) q.addSolution(3, 5); q.addSolution(5, 3);
	if(num == 10) q.addSolution(0, 4); q.addSolution(4, 0);
	if(num == 11) q.addSolution(0, 5); q.addSolution(5, 0);
	if(num == 12) q.addSolution(3, 1); q.addSolution(1, 3);
	if(num == 13) q.addSolution(1, 4); q.addSolution(4, 1);
	if(num == 14) q.addSolution(2, 5); q.addSolution(5, 2);
	if(num == 15) q.addSolution(1, 2); q.addSolution(2, 1);
	if(num == 16) q.addSolution(2, 4); q.addSolution(4, 2);
	if(num == 17) q.addSolution(3, 5); q.addSolution(5, 3);
	if(num == 18) q.addSolution(0, 1); q.addSolution(1, 0);
	if(num == 19) q.addSolution(0, 2); q.addSolution(2, 0);
};
	
Questions.getIslandProblem = function(p, parent) {
	//13,47 Coordinate of CalcTown
	var needPlace = true;
	var zoneMap = parent.getFloors()[0].getZoneMap();
	var mobilityMap = parent.getFloors()[0].getMobilityMap();
	var newX = 0;
	var newY = 0;
	while(needPlace) {
		newX = Math.floor(Math.random() * zoneMap[0].length());
		newY = Math.floor(Math.random() * zoneMap.length);
		
		if(!mobilityMap[newY].substring(newX,newX+1) ==="O") continue;
		else if((zoneMap[newY].substring(newX,newX+1) ==="4" || zoneMap[newY].substring(newX,newX+1) === "5") && !p.getFlag(4)) continue;
		else if(zoneMap[newY].substring(newX,newX+1) ==="6" && !p.getFlag(5)) continue;
		else if((zoneMap[newY].substring(newX,newX+1) ==="7" || zoneMap[newY].substring(newX,newX+1) ==="8") && !p.getFlag(6)) continue;
		else if(!(zoneMap[newY].substring(newX,newX+1) ==="1" || zoneMap[newY].substring(newX,newX+1) ==="2" || zoneMap[newY].substring(newX,newX+1) ==="3")) continue;
		needPlace = false;
	}
	var dist = Math.sqrt( (newX - 13) * (newX - 13) + (newY - 47) * (newY - 47) );
	var angle = Math.atan((newY - 47.0)/(newX - 13.0));
	var direction = "";
	if(newX - 13.0 > 0 && angle > 0) direction = "North of East";
	if(newX - 13.0 > 0 && angle < 0) direction = "South of East";
	if(newX - 13.0 > 0 && angle == 0) direction = "East";
	if(newX - 13.0 < 0 && angle > 0) direction = "North of West";
	if(newX - 13.0 < 0 && angle < 0) direction = "South of West";
	if(newX - 13.0 < 0 && angle == 0) direction = "West";
	if(newX - 13 == 0 && angle > 0) direction = "North";
	if(newX - 13 == 0 && angle < 0) direction = "South";
	dist = (Math.floor(dist * 100))/100.0;
	angle = Math.abs(angle * 180 / Math.PI);
	angle = (Math.floor(angle * 100))/100.0;
	
	var eqs = [];
	eqs[0] = new Equation(dist + " steps ", 32);
	eqs[1] = new Equation(angle + "° " + direction, 32);
	var quest = new Question();
	quest.addQuestions(eqs);
	quest.addSolution(newX, newY);
	return quest;
};

