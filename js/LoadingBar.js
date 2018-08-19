class LoadingBar {

	constructor(tot) {
		this.total = tot;
		this.current = 0;
	}
	
	
	paintComponent(g1) {
		var can = document.getElementById("mainDisplay");
		if(!g1) g1 = can.getContext("2d");
		//super.paintComponent(g1);
		var disp = document.getElementById("workingDisplay");
		var g = disp.getContext("2d");
		g.fillStyle = "black"
		g.fillRect(0, 0, 2000, 2000);
		g.fillStyle = "white";
		g.strokeStyle = "white";
		g.font = "bold 64px Courier New";
		g.fillText("Loading",500,300);
		g.strokeRect(500,350,250,50);
		g.fillRect(500, 350, 250 * this.current / this.total, 50);
		g1.drawImage(disp,0,0,GameEngine.PANEL_WIDTH,GameEngine.PANEL_HEIGHT, 0, 0, can.width, can.height);
	}
	
	addProgress() {
		this.current++;
		this.paintComponent();
	}
	
	redraw() {
		this.paintComponent();
	}
	
	getProgress() {
		return this.current;
	}

	processTime() {}

}
