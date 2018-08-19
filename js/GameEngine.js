// var NPCBoss = require("NPCBoss.js");
// var NPCCrystal = require("NPCCrystal.js");
// var Message = require("Message.js");
// var Monster = require("Monster.js");
// var Animation = require("Animation.js");
// var GameWindow = require("GameWindow.js");
// var WindowMessage = require("WindowMessage.js");
// var Skill = require("Skill.js");
// var Spell = require("Spell.js");
// var Equation = require("Equation.js");
// var Battle = require("Battle.js");

//This panel is 19x11

class GameEngine {

	constructor(s, p, par) {
	
		this.player = p;
		this.parent = par;
		this.fileName = s;
		var mapData = MapData[this.fileName.substring(0,this.fileName.length - 4)]
		this.height = parseInt(mapData[0],10);
		this.map = mapData.slice(2+(this.height*5),2+(this.height*6));
		this.secondLayerMap = mapData.slice(2+(this.height*6),2+(this.height*7));
		this.thirdLayerMap = mapData.slice(2+(this.height*7),2+(this.height*8));
		this.mobilityMap = mapData.slice(1+(this.height*3),1+(this.height*4));
		this.zoneMap = mapData.slice(1+(this.height*4),1+(this.height*5));
    	this.visibleMap = [];
    	this.visibleSecondLayerMap = [];
    	this.visibleThirdLayerMap = [];

    	this.ani = [];
    	this.npcs = [];
    	this.menus = [];
    	this.zones = [];

    	this.isLoaded = false;
		this.gfx = document.createElement('img');
		this.gfx.setAttribute("src", "AreaData/" + mapData[1 + (this.height)*5].substring(0,mapData[1 + (this.height)*5].length-4)+".png");
		this.gfx.onload = function() {
        	// this.parent.finishedLoadingImage();
        	this.isLoaded = true;
        	this.createImage();
        }.bind(this);

        // Notes for Later
        // this.gfx.onload = function () {
        // var c=document.getElementById('mapViewCanvas');
        // var ctx=c.getContext('2d');
        // ctx.drawImage(this.gfx,0,0);}
	
		this.width = this.mobilityMap[0].length;
		this.moveX = 0;
		this.moveY = 0;
		this.sight = 8;
		this.talkingTo = 0;
		this.direction = 0;
		this.blackOut = false;
		this.openingDoor = false;
		this.menuOpen = false;
		this.activeWindow = 0;
		
		this.movingUp = false;
		this.movingDown = false;
		this.movingLeft = false;
		this.movingRight = false;
		
		this.whiteScreen = document.createElement("canvas");
		this.whiteScreen.width = "1500";
		this.whiteScreen.height = "1000";
		var idata = this.whiteScreen.getContext("2d").getImageData(0,0,1500,1000);
		for (var i=0;i<idata.data.length;i+=4) {
            idata.data[i+0]=255;
            idata.data[i+1]=255;
            idata.data[i+2]=255;
            idata.data[i+3]=255;
        }
        this.whiteScreen.getContext("2d").putImageData(idata,0,0);
        
		
		this.battleFuzz = false;
		this.battleFuzzCount = 0;
		this.whiteLevel = 0;
		this.setWhite();
		this.selecting = false;
		this.selected = 0;
		
    	this.VISIBILITY = 17;
    	this.CENTERX = 7;
    	this.CENTERY = 5;
    	this.MAX_IMAGE_Y = 1000;
    	this.PANEL_WIDTH = 1200;
    	this.PANEL_HEIGHT = 705;

    	this.initFadeIn();

		//Unhandled in the constructor
		//this.addMouseListener(new MListener());
		
		/*
		Equation[] eqs = new Equation[] {new Equation("x^2"),new Equation("x")};
		graph = new Graph(10,10,800,500,eqs,new int[] {-10,0},new int[] {0,10});
		graph.animateGraph(20);*/
	}
	
	destroyImage() {
		this.mapView = null;
		for(var i = 0; i < this.npcs.length; i++) {
			this.npcs[i].resetPosition();
			if(this.npcs[i] instanceof NPCBoss) {
				this.npcs[i].setFighting(false);
			}
		}
	}
	
	getMobilityMap() {
		return this.mobilityMap;
	}
	
	getZoneMap() {
		return this.zoneMap;
	}
	
	createImage() {
		//this.mapView = document.getElementById("mapViewCanvas");
		this.mapView = document.createElement("canvas");
		this.mapView.width = this.width*64;
		this.mapView.height = this.height*64;
		this.mapView.style.display = "none";
		var ctx = this.mapView.getContext("2d");
		
		for(var i = 0; i < this.height; i++) {
			var mapTokens = this.map[i].split(" ");
			var secondMapTokens = this.secondLayerMap[i].split(" ");
			var thirdMapTokens = this.thirdLayerMap[i].split(" ");
			for(var j = 0; j < this.width; j++) {
				if(mapTokens[j].indexOf('*') != -1) {
					var aTile = mapTokens[j].split("*");
					for(var k = 0; k < 4; k++) {
						// this.mapView.getContext("2d").drawImage(this.gfx,
						// 		(parseInt(aTile[k],10))*32,	(parseInt(aTile[k],10))*0, 16, 16,
						// 		j*64+32*(k%2), i*64+32*Math.floor(k/2), 32, 32);
						this.mapView.getContext("2d").drawImage(this.gfx,		
								(parseInt(aTile[k],10))*32,	(parseInt(aTile[k],10))*0, 16, 16,
								j*32+16*(k%2), i*32+16*Math.floor(k/2), 16, 16);      
					}
				}
				else {
					// this.mapView.getContext("2d").drawImage(this.gfx, (parseInt(mapTokens[j],10))*32, (parseInt(mapTokens[j],10))*0, 32, 32,
					// 												  j*64,i*64,64,64);
				    this.mapView.getContext("2d").drawImage(this.gfx, (parseInt(mapTokens[j],10))*32, (parseInt(mapTokens[j],10))*0, 32, 32,
																	  j*32,i*32,32,32);      
				}
				if(secondMapTokens[j].indexOf('*') != -1) {
					var aTile = secondMapTokens[j].split("*");
					for(var k = 0; k < 4; k++) {
						if(parseInt(aTile[k],10) == 0) continue;
						// this.mapView.getContext("2d").drawImage(this.gfx, (parseInt(aTile[k],10))*32, (parseInt(aTile[k],10))*0, 16, 16,
						// 												  j*64+32*(k%2),i*64+32*Math.floor(k/2),32,32); 
						this.mapView.getContext("2d").drawImage(this.gfx, (parseInt(aTile[k],10))*32, (parseInt(aTile[k],10))*0, 16, 16,
																		  j*32+16*(k%2),i*32+16*Math.floor(k/2),16,16); 
					}
				}
				else if(parseInt(secondMapTokens[j],10) != 0) {             
					// this.mapView.getContext("2d").drawImage(this.gfx, (parseInt(secondMapTokens[j],10))*32, (parseInt(secondMapTokens[j],10))*0, 32, 32, 
					// 												  j*64,i*64,64,64);
					this.mapView.getContext("2d").drawImage(this.gfx, (parseInt(secondMapTokens[j],10))*32, (parseInt(secondMapTokens[j],10))*0, 32, 32, 
																	  j*32,i*32,32,32);
				}
				if(thirdMapTokens[j].indexOf('*') != -1) {
					var aTile = thirdMapTokens[j].split("*");
					for(var k = 0; k < 4; k++) {
						// if(parseInt(aTile[k],10) == 0) continue;
						// this.mapView.getContext("2d").drawImage(this.gfx, (parseInt(aTile[k],10))*32, (parseInt(aTile[k],10))*0, 16, 16,
						// 												  j*64+32*(k%2),i*64+32*Math.floor(k/2),32,32);
						this.mapView.getContext("2d").drawImage(this.gfx, (parseInt(aTile[k],10))*32, (parseInt(aTile[k],10))*0, 16, 16,
																		  j*32+16*(k%2),i*32+16*Math.floor(k/2),16,16);
					}
				}
				else if(parseInt(thirdMapTokens[j],10) != 0) {
					// this.mapView.getContext("2d").drawImage(this.gfx, (parseInt(thirdMapTokens[j],10))*32, (parseInt(thirdMapTokens[j],10))*0,32,32,
					// 												  j*64,i*64,64,64);
					this.mapView.getContext("2d").drawImage(this.gfx, (parseInt(thirdMapTokens[j],10))*32, (parseInt(thirdMapTokens[j],10))*0,32,32,
																	  j*32,i*32,32,32);
				}
			}
		}
		this.mapViewTemp = document.createElement("canvas");
		this.mapViewTemp.width = this.width*64;
		this.mapViewTemp.height = this.height*64;
		this.mapViewTemp.getContext("2d").drawImage(this.mapView, 0,0,this.mapView.width/2,this.mapView.height/2,0,0,this.mapView.width,this.mapView.height);
		this.mapView = this.mapViewTemp;
		
	}
	
	paintComponent(g1) {
		var can = document.getElementById("mainDisplay");
	    if(!g1) g1 = can.getContext("2d");
		//super.paintComponent(g1);
		var disp = document.getElementById("workingDisplay");
		var g = disp.getContext("2d");
		//Calculate the xy coordinates of the top-right and bottom-left of the visible portion of the map (in pixels)
		var mapViewX1 = (this.x-Math.floor(this.VISIBILITY/2))*64-this.moveX; var x1Offset = 0;
		var mapViewY1 = (this.y-Math.floor(this.VISIBILITY/2))*64-this.moveY; var y1Offset = 0;
		var mapViewX2 = (this.x+Math.floor(this.VISIBILITY/2)+1)*64-this.moveX; var x2Offset = 0;
		var mapViewY2 = (this.y+Math.floor(this.VISIBILITY/2)+1)*64-this.moveY; var y2Offset = 0;
		
		//Adjust the xy coordinates in the event that the player is standing somewhere where wrap-around is needed
		if((this.x-Math.floor(this.VISIBILITY/2))*64-this.moveX<0) {mapViewX1 = 0; x1Offset = 0 - ((this.x-Math.floor(this.VISIBILITY/2))*64-this.moveX);}
		if((this.y-Math.floor(this.VISIBILITY/2))*64-this.moveY<0) {mapViewY1 = 0; y1Offset = 0 - ((this.y-Math.floor(this.VISIBILITY/2))*64-this.moveY);}
		if((this.x+Math.floor(this.VISIBILITY/2)+1)*64-this.moveX >= this.width * 64) {mapViewX2 = this.width*64-1; x2Offset = (this.x+Math.floor(this.VISIBILITY/2)+1)*64-this.moveX-this.width*64;}
		if((this.y+Math.floor(this.VISIBILITY/2)+1)*64-this.moveY >= this.height * 64) {mapViewY2 = this.height*64-1; y2Offset = (this.y+Math.floor(this.VISIBILITY/2)+1)*64-this.moveY-this.height*64;}
		
		//Draw the areas of the map where wrap-around is required.
		if((this.x-Math.floor(this.VISIBILITY/2))*64-this.moveX<0) 
				g.drawImage(this.mapView, this.width*64-1-x1Offset, mapViewY1, this.width*64-1 - (this.width*64-1-x1Offset), mapViewY2 - mapViewY1,
										  (this.CENTERX-Math.floor(this.VISIBILITY/2))*64, 
										  (this.CENTERY-Math.floor(this.VISIBILITY/2))*64+y1Offset, 
										  (this.CENTERX-Math.floor(this.VISIBILITY/2))*64+x1Offset    - ((this.CENTERX-Math.floor(this.VISIBILITY/2))*64), 
										  (this.CENTERY+Math.floor(this.VISIBILITY/2)+1)*64- y2Offset - ((this.CENTERY-Math.floor(this.VISIBILITY/2))*64+y1Offset));
		if((this.y-Math.floor(this.VISIBILITY/2))*64-this.moveY<0) 
				g.drawImage(this.mapView, mapViewX1, this.height*64-1-y1Offset, mapViewX2 - mapViewX1, this.height*64-1 - (this.height*64-1-y1Offset),
										  (this.CENTERX-Math.floor(this.VISIBILITY/2))*64+x1Offset, (this.CENTERY-Math.floor(this.VISIBILITY/2))*64, (this.CENTERX+Math.floor(this.VISIBILITY/2)+1)*64-x2Offset - ((this.CENTERX-Math.floor(this.VISIBILITY/2))*64+x1Offset), (this.CENTERY-Math.floor(this.VISIBILITY/2))*64+ y1Offset) - ((this.CENTERY-Math.floor(this.VISIBILITY/2))*64);
		if((this.x+Math.floor(this.VISIBILITY/2)+1)*64-this.moveX >= this.width*64) 
				g.drawImage(this.mapView, 0, mapViewY1,	x2Offset, mapViewY2 - mapViewY1,
										  (this.CENTERX+Math.floor(this.VISIBILITY/2)+1)*64-x2Offset, (this.CENTERY-Math.floor(this.VISIBILITY/2))*64+y1Offset, (this.CENTERX+Math.floor(this.VISIBILITY/2)+1)*64 - ((this.CENTERX+Math.floor(this.VISIBILITY/2)+1)*64-x2Offset), (this.CENTERY+Math.floor(this.VISIBILITY/2)+1)*64- y2Offset - ((this.CENTERY-Math.floor(this.VISIBILITY/2))*64+y1Offset));
		if((this.y+Math.floor(this.VISIBILITY/2)+1)*64-this.moveY >= this.height*64) 
				g.drawImage(this.mapView, mapViewX1, 0, mapViewX2 - mapViewX1, y2Offset,
										  (this.CENTERX-this.VISIBILITY/2)*64+x1Offset, (this.CENTERY+this.VISIBILITY/2+1)*64-y2Offset, (this.CENTERX+this.VISIBILITY/2+1)*64-x2Offset - ((this.CENTERX-this.VISIBILITY/2)*64+x1Offset), (this.CENTERY+this.VISIBILITY/2+1)*64 - ((this.CENTERY+this.VISIBILITY/2+1)*64-y2Offset));
		
		if((this.x-Math.floor(this.VISIBILITY/2))*64-this.moveX<0&&(this.y-Math.floor(this.VISIBILITY/2))*64-this.moveY<0) 
				g.drawImage(this.mapView, this.width*64-1-x1Offset, this.height*64-1-y1Offset, this.width*64-1 - (this.width*64-1-x1Offset), this.height*64-1 - (this.height*64-1-y1Offset), 
										  (this.CENTERX-Math.floor(this.VISIBILITY/2))*64, (this.CENTERY-Math.floor(this.VISIBILITY/2))*64, x1Offset, y1Offset);
		if((this.x-Math.floor(this.VISIBILITY/2))*64-this.moveX<0&&(this.y+Math.floor(this.VISIBILITY/2)+1)*64-this.moveY >= this.height*64) 
				g.drawImage(this.mapView, this.width*64-1-x1Offset,	0, x1Offset, y2Offset,
										  (this.CENTERX-Math.floor(this.VISIBILITY/2))*64, (this.CENTERY+Math.floor(this.VISIBILITY/2)+1)*64-y2Offset, (this.CENTERX-Math.floor(this.VISIBILITY/2))*64+x1Offset - ((this.CENTERX-Math.floor(this.VISIBILITY/2))*64), (this.CENTERY+Math.floor(this.VISIBILITY/2)+1)*64 - ((this.CENTERY+Math.floor(this.VISIBILITY/2)+1)*64-y2Offset));
		if((this.x+Math.floor(this.VISIBILITY/2)+1)*64-this.moveX >= this.width*64&&(this.y-Math.floor(this.VISIBILITY/2))*64-this.moveY<0) 
				g.drawImage(this.mapView, 0, this.height*64-1-y1Offset,	x2Offset, y1Offset,
										  (this.CENTERX+Math.floor(this.VISIBILITY/2)+1)*64-x2Offset, (this.CENTERY-Math.floor(this.VISIBILITY/2))*64, (this.CENTERX+Math.floor(this.VISIBILITY/2)+1)*64 - ((this.CENTERX+Math.floor(this.VISIBILITY/2)+1)*64-x2Offset), (this.CENTERY-Math.floor(this.VISIBILITY/2))*64+ y1Offset - ((this.CENTERY-Math.floor(this.VISIBILITY/2))*64));
		if((this.x+Math.floor(this.VISIBILITY/2)+1)*64-this.moveX >= this.width*64&&(this.y+Math.floor(this.VISIBILITY/2)+1)*64-this.moveY >= this.height*64) 
				g.drawImage(this.mapView, 0, 0,	x2Offset, y2Offset, 
										  (this.CENTERX+Math.floor(this.VISIBILITY/2)+1)*64-x2Offset, (this.CENTERY+Math.floor(this.VISIBILITY/2)+1)*64-y2Offset, x2Offset, y2Offset);
		
		//Draw the center portion of the map.
		g.drawImage(this.mapView, mapViewX1, mapViewY1, mapViewX2 - mapViewX1, mapViewY2 - mapViewY1,
								  (this.CENTERX-Math.floor(this.VISIBILITY/2))*64+x1Offset, (this.CENTERY-Math.floor(this.VISIBILITY/2))*64+y1Offset, (this.CENTERX+Math.floor(this.VISIBILITY/2)+1)*64-x2Offset - ((this.CENTERX-Math.floor(this.VISIBILITY/2))*64+x1Offset), (this.CENTERY+Math.floor(this.VISIBILITY/2)+1)*64- y2Offset - ((this.CENTERY-this.VISIBILITY/2)*64+y1Offset));
		
		//If display the white overlay if a battle is about to occur.
		if(this.battleFuzz) {
			this.whiteLevel -= 64;
			if(this.whiteLevel <= 0) {this.battleFuzzCount--; this.whiteLevel = 255;}
			if(this.battleFuzzCount == 0) {
				this.battleFuzz = false; this.whiteLevel = 0;
				for(var i = 0; i < this.ani.length; i++) {
					var temp = this.ani[i];
					if(temp.getType() === "Battle Fuzz") {
						temp.setFinished(true);
					}
				}
			}
			this.setWhite();
			g.drawImage(this.whiteScreen, 0, 0);
		}
		
		//Draw the main character
		g.drawImage(GameEngine.charGfx, Math.floor(Math.abs(this.moveX + this.moveY)/22)*32, this.direction * 32, 32,	32,
										this.CENTERX * 64,this.CENTERY * 64, 64, 64);
		
		//If there is a battle going on, draw the battle. Otherwise, draw the npcs. 
		if(this.battle != null && this.battle.getActive()) {
			this.battle.printBattle(g);
		}
		else {
			for(var i = 0; i<this.npcs.length;i++) {
				this.npcs[i].printNPC(g, this.x, this.y, this.moveX, this.moveY);
			}
			for(var i = 0; i<this.npcs.length;i++) {
				this.npcs[i].printWindow(g);
			}
		}
		//If a blackout or fade in is going on, do those.
		if(this.blackOut) this.blackOutFunction(g);
		if(this.fadeIn) this.fadeInFunction(g);
		
		//If the menu is open, print the menu.
		for(var i = 0; i < this.menus.length; i++) {
			this.menus[i].printWindow(g);
		}
		
		if(this.parent.getStatus() != null) this.parent.getStatus().paintPanel(g);
		
		g1.drawImage(disp,0,0,GameEngine.PANEL_WIDTH,GameEngine.PANEL_HEIGHT, 0, 0, document.getElementById("mainDisplay").width, document.getElementById("mainDisplay").height);		
	}
	
	blackOutFunction(g) {
		this.blackOutTic -= 20;
		g.fillStyle = "black";
		g.fillRect(0, 0, 2000, this.CENTERY*64-this.blackOutTic);
		g.fillRect(0, (this.CENTERY+1)*64+this.blackOutTic, 2000, 2000);
		g.fillRect(0, 0, this.CENTERX*64-this.blackOutTic, 2000);
		g.fillRect((this.CENTERX+1)*64+this.blackOutTic, 0, 2000, 2000);
		if(this.blackOutTic <=-50) {
			for(var i = 0; i < this.ani.length; i++) {
				var temp = this.ani[i];
				if(temp.getType() === "BlackOut") {
					temp.setFinished(true);
				}
			}
		}
	}
	
	fadeInFunction(g) {
		this.blackOutTic += 20;
		g.fillStyle = "black";
		g.fillRect(0, 0, 2000, this.CENTERY*64-this.blackOutTic);
		g.fillRect(0, (this.CENTERY+1)*64+this.blackOutTic, 2000, 2000);
		g.fillRect(0, 0, this.CENTERX*64-this.blackOutTic, 2000);
		g.fillRect((this.CENTERX+1)*64+this.blackOutTic, 0, 2000, 2000);
		if(this.blackOutTic >= 600) {
			this.fadeIn = false;
			for(var i = 0; i < this.ani.length; i++) {
				var temp = this.ani[i];
				if(temp.getType() === "Fade In") {
					temp.setFinished(true);
				}
			}
		}
	}
	
	initBlackOut() {
		this.fadeIn = false;
		this.blackOut = true;
		this.blackOutTic = 500;
	}
	
	initFadeIn() {
		this.blackOut = false;
		this.fadeIn = true;
		this.blackOutTic = -50;
	}
		
	setWhite() {
		var data = this.whiteScreen.getContext("2d").getImageData(0,0,1500,1000);
		for (var i=0;i<data.data.length;i+=4) {
            data.data[i+0]=255;
            data.data[i+1]=255;
            data.data[i+2]=255;
            if(this.whiteLevel == 0) {
            	data.data[i+3]=1;
            }
            else {
            	data.data[i+3]=this.whiteLevel;	
            }
            
        }
        this.whiteScreen.getContext("2d").putImageData(data, 0,0);
	}
	
	process(code) {
		if(this.menuOpen) {
			this.processMenu(code);
			return;
		}
		if(this.battle != null && this.battle.getActive()) {
			this.battle.process(code);
			return;
		}
		if(this.talking) {
			this.npcs[this.talkingTo].interact(code);
			return;
		}
		if(this.movingUp || this.movingDown || this.movingLeft || this.movingRight || this.blackOut || this.fadeIn || this.battleFuzz) 
			return;
		if(code == 61 || code == 107) {
			parent.processMessage(new Message("Speed Up"));
		}
		if(code == 45 || code == 109) {
			parent.processMessage(new Message("Slow Down"));
		}
		if(code == 32) {
			var xmod = 0, ymod = 0;
			if(this.direction == 0) ymod = 1;
			if(this.direction == 1) xmod = -1;
			if(this.direction == 2) xmod = 1;
			if(this.direction == 3) ymod = -1;
			for(var i = 0; i < this.npcs.length;i++) {
				if(this.npcs[i].collided(this.x+xmod, this.y+ymod)) {
					this.talking = true;
					this.talkingTo = i;
					this.npcs[this.talkingTo].setDirection(3-this.direction);
					this.npcs[this.talkingTo].interact(code);
				}
			}
			
		}
		//Code 37 is left. Code 38 is up. Code 39 is right. Code 40 is down.
		if(code == 37) {
			this.x--;
			this.x = (this.x + this.width)%this.width;
			this.direction = 1;
			if(this.mobilityMap[this.y].substring(this.x,this.x+1) === "X" || this.checkCollided()) {
				this.cancelMove();
			}
			else {
				this.movingLeft = true;
				this.moveX = -64;
			}
		}
		if(code == 38) {
			this.y--;
			this.y = (this.y + this.height)%this.height;
			this.direction = 3;
			if(this.mobilityMap[this.y].substring(this.x,this.x+1) === "X" || this.checkCollided()) {
				this.cancelMove();
			}
			else {
				this.movingUp = true;
				this.moveY = -64;
			}
		}
		if(code == 39) {
			this.x++;
			this.x = (this.x + this.width)%this.width;
			this.direction = 2;
			if(this.mobilityMap[this.y].substring(this.x,this.x+1) === "X" || this.checkCollided()) {
				this.cancelMove();
			}
			else {
				this.movingRight = true;
				this.moveX = 64;
			}
		}
		if(code == 40) {
			this.y++;
			this.y = (this.y + this.height)%this.height;
			this.direction = 0;
			if(this.mobilityMap[this.y].substring(this.x,this.x+1) === "X" || this.checkCollided()) {
				this.cancelMove();
			}
			else {
				this.movingDown = true;
				this.moveY = 64;
			}
		}
		if(code == 77) {
			this.giveMessage(new Message("Open Menu"));
		}
		if(!this.menuOpen && (this.battle == null || !this.battle.getActive())&&(code == 37 || code == 38 || code == 39 || code == 40)) 
			this.checkEvent();
		this.paintComponent();
	}
	
	processMenu(code) {
		//Code 37 is left. Code 38 is up. Code 39 is right. Code 40 is down.
		if(code == 32) {
			if(this.activeWindow == 0 && this.menus[0].getOption()==7) {
				this.menus[0].closeWindow();
				return;
			}
			else if(this.activeWindow == 0) {
				this.populateDescriptionWindow();
				this.activeWindow = 1;
				this.menus[1].openWindow();
				this.menus[2].openWindow();
				this.menus[1].setPosition(this.menus[0].getOption());
				if(this.menus[0].getOption() == 3) {this.updateSkills(); this.menus[3].openWindow();}
				if(this.menus[0].getOption() == 4) {this.updateMagic();this.menus[3].openWindow();}
				this.menus[2].setPosition(0);
				this.menus[3].setPosition(0);
			}
			else if(this.menus[0].getOption()==0) {
				this.player.useItem(this.menus[1].getOption());
				this.populateItemWindow();
				this.populateDescriptionWindow();
			}
			else if(this.menus[0].getOption()==1) {
				this.player.equipWeapon(this.menus[1].getOption());
				this.populateItemWindow();
				this.populateDescriptionWindow();
				this.menus[1].setPosition(this.menus[0].getOption());
				this.menus[2].setPosition(0);
			}
			else if(this.menus[0].getOption()==2) {
				this.player.equipArmor(this.menus[1].getOption());
				this.populateItemWindow();
				this.populateDescriptionWindow();
				this.menus[1].setPosition(this.menus[0].getOption());
				this.menus[2].setPosition(0);
			}
			else if(this.menus[0].getOption()==3 && this.menus[1].getOption() < this.player.getActiveSkillCount()) {
				if(this.selecting) {
					this.player.swapSkill(this.selected, this.menus[1].getOption());
					this.selecting = false;
				}
				else {
					this.selecting = true;
					this.selected = this.menus[1].getOption();
				}
				this.populateItemWindow();
				this.populateDescriptionWindow();
				this.menus[1].setPosition(this.menus[0].getOption());
				this.menus[2].setPosition(this.menus[1].getOption());
			}
			else if(this.menus[0].getOption()==4) {
				if(this.selecting) {
					this.player.swapSpell(this.selected, this.menus[1].getOption());
					this.selecting = false;
				}
				else {
					this.selecting = true;
					this.selected = this.menus[1].getOption();
				}
				this.populateItemWindow();
				this.populateDescriptionWindow();
				this.menus[1].setPosition(this.menus[0].getOption());
				this.menus[2].setPosition(this.menus[1].getOption());
			}
		}
		if(code == 37) {
			if(this.activeWindow == 1) {
				this.menus[1].closeWindow();
				this.menus[1].clearImage();
				this.menus[1].resetOptions();
				this.menus[2].closeWindow();
				this.menus[3].closeWindow();
				this.activeWindow = 0;
				this.selecting = false;
			}
		}
		if(code == 38) {
			this.menus[this.activeWindow].moveOptionUp();
			this.menus[2].setPosition(this.menus[this.activeWindow].getOption());
			if(this.activeWindow == 1 && this.menus[0].getOption()==3) this.updateSkills();
			if(this.activeWindow == 1 && this.menus[0].getOption()==4) this.updateMagic();
			this.menus[3].setPosition(this.menus[this.activeWindow].getOption());
		}
		if(code == 40) {
			this.menus[this.activeWindow].moveOptionDown();
			this.menus[2].setPosition(this.menus[this.activeWindow].getOption());
			if(this.activeWindow == 1 && this.menus[0].getOption()==3) this.updateSkills();
			if(this.activeWindow == 1 && this.menus[0].getOption()==4) this.updateMagic();
			this.menus[3].setPosition(this.menus[this.activeWindow].getOption());
		}
		
		
	}
	
	checkCollided() {
		for(var i = 0; i < this.npcs.length;i++) {
			if(this.npcs[i].collided(this.x, this.y))
				return true;	
		}
		return false;
	}
	
	cancelMove() {
		if(this.direction == 0) this.y--;
		if(this.direction == 1) this.x++;
		if(this.direction == 2) this.x--;
		if(this.direction == 3) this.y++;
		this.y = (this.y + this.height)%this.height;
		this.x = (this.x + this.width)%this.width;
		this.movingUp = this.movingDown = this.movingLeft = this.movingRight = false;
		this.moveX = this.moveY = 0;
	}
	
	processTime() {
		if(this.battle != null && this.battle.getActive()) {
			this.battle.processTime();
			this.processAnimations();
			return;
		}
		if(this.menuOpen) {
			if(this.menus[0].isClosed()){
				this.menuOpen = false;
			}
		}
		if(this.talking) {
			if(this.talkingTo >= this.npcs.length || !this.npcs[this.talkingTo].isWindowOpen())
				this.talking = false;
		}
		if(this.movingLeft) {
			this.moveX += 8;
			if(this.moveX == 0) {
				this.movingLeft = false;
				this.checkZone();
			}
		}
		if(this.movingUp) {
			this.moveY += 8;
			if(this.moveY == 0) {
				this.movingUp = false;
				this.checkZone();
			}
		}
		if(this.movingRight) {
			this.moveX -= 8;
			if(this.moveX == 0) {
				this.movingRight = false;
				this.checkZone();
			}
		}
		if(this.movingDown) {
			this.moveY -= 8;
			if(this.moveY == 0) {
				this.movingDown = false;
				this.checkZone();
			}
		}
		for(var i = 0; i < this.npcs.length;i++) {
			this.npcs[i].processTime(this.mobilityMap, this.x, this.y, this.npcs);
		}
		this.processAnimations();
	}
	
	checkZone() { 
		var zoneId = this.zoneMap[this.y].substring(this.x,this.x+1); 
		for(var i = 0; i < this.zones.length; i++) {
			if(this.zones[i].getName() === zoneId) {
				var monsterNum = this.zones[i].addCounter();
				if((this.player.getRepel() > 0 && monsterNum != -1 && Monster.getMonster(monsterNum, this.player).getLevel() <= this.player.getLevel() - 2) || this.player.getAlwaysRepel()) {
					monsterNum = -1;
				}
				if(monsterNum != -1) {
					var temp1 = new Animation("Battle Fuzz");
					var temp2 = new Animation("Start Battle",monsterNum,this.zones[i].getBackground());
					temp1.setNext(temp2);
					this.ani.push(temp1);
				}
				if(this.player.getRepel() > 0) {
					this.player.useRepel();
				}
			}
		}/**/
	}
	
	giveMessage(m) {
		if(m.getType() === "Move Player") {
			this.x = m.getData(0);
			this.y = m.getData(1);
		}
		if(m.getType() === "Change Map") {
			var tiles1,tiles2;
			if(m.getData(0)==4) {
				tiles1 = this.secondLayerMap[29].split(" ");
				tiles2 = this.secondLayerMap[30].split(" ");
				this.secondLayerMap[29] = "";
				this.secondLayerMap[30] = "";
				tiles1[25] = "35";
				tiles2[25] = "35";
				this.mobilityMap[29] = this.mobilityMap[29].substring(0, 25) + " " + this.mobilityMap[29].substring(26);
				this.mobilityMap[30] = this.mobilityMap[30].substring(0, 25) + " " + this.mobilityMap[30].substring(26);
				//System.out.println("Width: " +width);
				for(var i = 0; i < this.width; i++) {
					this.secondLayerMap[29] += tiles1[i] + " ";
					this.secondLayerMap[30] += tiles2[i] + " ";	
				}
				
			}
			if(m.getData(0)==5) {
				tiles1 = this.secondLayerMap[21].split(" ");
				this.secondLayerMap[21] = "";
				tiles1[55] = "91";
				tiles1[56] = "91";
				this.mobilityMap[21] = this.mobilityMap[21].substring(0, 55) + "  " + this.mobilityMap[21].substring(57);
				for(var i = 0; i < this.width; i++) {
					this.secondLayerMap[21] += tiles1[i] + " ";	
				}
				
			}
			if(m.getData(0)==6) {
				tiles1 = this.secondLayerMap[30].split(" ");
				tiles2 = this.secondLayerMap[31].split(" ");
				this.secondLayerMap[30] = "";
				this.secondLayerMap[31] = "";
				tiles1[69] = "35";
				tiles2[69] = "35";
				this.mobilityMap[30] = this.mobilityMap[30].substring(0, 69) + " " + this.mobilityMap[30].substring(70);
				this.mobilityMap[31] = this.mobilityMap[31].substring(0, 69) + " " + this.mobilityMap[31].substring(70);
				for(var i = 0; i < this.width; i++) {
					this.secondLayerMap[30] += tiles1[i] + " ";
					this.secondLayerMap[31] += tiles2[i] + " ";	
				}
			}
			if(m.getData(0)==7) {
				tiles1 = this.secondLayerMap[54].split(" ");
				this.secondLayerMap[54] = "";
				tiles1[52] = "91";
				this.mobilityMap[54] = this.mobilityMap[54].substring(0, 52) + "  " + this.mobilityMap[54].substring(53);
				for(var i = 0; i < this.width; i++) {
					this.secondLayerMap[54] += tiles1[i] + " ";	
				}
			}
			
			
		}
		if(m.getType() === "Open Menu") {
			if(this.menuOpen && m.getData() != -1) {
				this.processMenu(37);
				this.activeWindow = 0;
				this.menus[0].setOption(0, m.getData(0));
				this.processMenu(32);
			}
			else {
				this.menus = [];
				this.menuOpen = true;
				this.menus.push(new GameWindow(5,250,350,700));
				this.menus.push(new GameWindow(350,250,1000,700,false));
				
				this.menus.push(new GameWindow(5,5,1000,150,false));
				this.menus.push(new GameWindow(700,150,1000,250,false));
				this.populateMainMenu();
				this.populateItemWindow();
				if(m.getData() != -1) {
					this.menus[0].setOption(0, m.getData(0));
					this.processMenu(32);
				}

			}
		}
				
	}
	
	populateMainMenu() {
		var temp = new WindowMessage("");
		temp.setType("Option");
		temp.addOption("Items");
		temp.addOption("Weapons");
		temp.addOption("Armor");
		temp.addOption("Skills");
		temp.addOption("Magic");
		temp.addOption("Trade Items");
		temp.addOption("Key Items");
		temp.addOption("Exit");
		this.menus[0].addText(temp);
	}
	
	populateItemWindow() {
		//Populate the items window
		
		this.menus[1].clearText();
		for(var m = 0; m < 7; m++) {
			var temp = new WindowMessage("",false);
			temp.setType("Option");
			var wares = [];
			var length = 0;
			if(m == 0) {length = this.player.getItemCount();}
			if(m == 1) {wares = this.player.getWeapons();length = this.player.getWeaponCount();}
			if(m == 2) {wares = this.player.getArmors();length = this.player.getArmorCount();}
			if(m == 3) {wares = this.player.getSkills();length = this.player.getSkillCount();}
			if(m == 4) {wares = this.player.getMagics();length = this.player.getMagicCount();}
			if(m == 5) {wares = this.player.getTradeItems();length = this.player.getTradeItemCount();}
			if(m == 6) {wares = this.player.getKeyItems();length = this.player.getKeyItemCount();}
			for(var i = 0; i < length; i++) {
				if(m==0) {
					temp.addOption(this.player.getItemAndQuantity(i));
				}
				else {
					temp.addOption(wares[i].getName());
				}
				if((m == 1 && wares[i].isEquipped()) || (m==2 && wares[i].isEquipped()))
					temp.setSpecial(true, i);
				else if((m == 3 || m == 4) && this.selecting && i == this.selected) 
					temp.setSpecial(true, i);
				else
					temp.setSpecial(false, i);
			
			}
			this.menus[1].addText(temp);
		}
	}
	
	updateSkills() {
		var skills = this.player.getSkills();
		this.menus[1].clearImage();
		this.menus[3].clearText();
		
		for(var i = 0; i < this.player.getSkillCount();i++) {
			if(i < this.menus[1].getMaxOptions()) {
				this.menus[1].addImage(Skill.getTrainingProgress(skills[i+this.menus[1].getTopList()],400,30 + i*Equation.getYSize(GameWindow.DEFAULT_WINDOW_FONT_SIZE)));
			}
			this.menus[3].addText(new WindowMessage("SP Cost:" + skills[i].getUseCost(),false));
		}
	}
	
	updateMagic() {
		var spells = this.player.getMagics();
		this.menus[1].clearImage();
		this.menus[3].clearText();
		
		for(var i = 0; i < this.player.getMagicCount();i++) {
			if(i < this.menus[1].getMaxOptions()) {
				this.menus[1].addImage(Spell.getTrainingProgress(spells[i+this.menus[1].getTopList()],400,30 + i*Equation.getYSize(GameWindow.DEFAULT_WINDOW_FONT_SIZE)));
			}
			this.menus[3].addText(new WindowMessage("MP Cost:" + spells[i].getUseCost(),false));
		}
	}
		
	populateDescriptionWindow() { 
		this.menus[2].clearText();
		var menuChoice = this.menus[0].getOption();
		var wares = [];
		var length = 0 ;
		if(menuChoice == 0) {wares = this.player.getItems();length = this.player.getItemCount();}
		if(menuChoice == 1) {wares = this.player.getWeapons();length = this.player.getWeaponCount();}
		if(menuChoice == 2) {wares = this.player.getArmors();length = this.player.getArmorCount();}
		if(menuChoice == 3) {wares = this.player.getSkills();length = this.player.getSkillCount();}
		if(menuChoice == 4) {wares = this.player.getMagics();length = this.player.getMagicCount();}
		if(menuChoice == 5) {wares = this.player.getTradeItems();length = this.player.getTradeItemCount();}
		if(menuChoice == 6) {wares = this.player.getKeyItems();length = this.player.getKeyItemCount();}
		for(var i = 0; i < length; i++) {
			this.menus[2].addText(wares[i].getDescription());
		}
		this.menus[2].finishAppearing();
		this.menus[1].setPosition(this.menus[0].getOption());
		if(this.menus[0].getOption() == 3) {this.updateSkills(); this.menus[3].openWindow();}
		if(this.menus[0].getOption() == 4) {this.updateMagic();this.menus[3].openWindow();}
	}	
	
	processAnimations() {
		for(var i = 0; i < this.ani.length;i++) {
			var a = this.ani[i];
			if(a.getType() === "BlackOut") {
				if(!a.getStarted()) {
					this.initBlackOut();
					a.setStarted(true);
					
				}
			}
			if(a.getType() === "Fade In") {
				if(!a.getStarted()) {
					this.initFadeIn();
					a.setStarted(true);
					
				}
			}
			if(a.getType() === "Battle Fuzz") {
				if(!a.getStarted()) {
					this.battleFuzz = true;
					this.battleFuzzCount = 2;
					this.whiteLevel = 255;
					a.setStarted(true);
				}
			}
			if(a.getType() === "Start Battle") {
				if(!a.getStarted()) {
					this.battle = new Battle(this.player, Monster.getMonster(a.getData(0), this.player), a.getData(1),this.ani);
					this.battle.setActive(true);
				}
			}
			if(a.getType() === "Defeat Monster") {
				for (var j = 0; j < this.npcs.length; j++) {
					if(this.npcs[j] instanceof NPCBoss) {
						if(this.npcs[j].getFighting()) {
							this.npcs.splice(j,1);
						}
					}
				}
			}
			if(a.getType() === "Remove Crystal") {
				for (var j = 0; j < this.npcs.length; j++) {
					if(this.npcs[j] instanceof NPCCrystal) {
						this.npcs.splice(j,1);
					}
				}
			}
			if(a.getType() === "Open Door") {
				if(!a.getStarted()) {
					a.setStarted(true);
					var tiles = this.secondLayerMap[a.getData(1)].split(" ");
					var tilesAbove = this.secondLayerMap[a.getData(1)-1].split(" ");
					a.addData(parseInt(tiles[a.getData(0)],10));
					a.addData(parseInt(tilesAbove[a.getData(0)],10));				
				}
				else {
					var temp = (a.getData(2) + (3 - Math.floor(Math.abs(this.moveX + this.moveY)/32))).toString();
					var tempAbove = (a.getData(3) + (3 - Math.floor(Math.abs(this.moveX + this.moveY)/32))).toString();
					var tiles = this.secondLayerMap[a.getData(1)].split(" ");
					var tilesAbove = this.secondLayerMap[a.getData(1)-1].split(" ");
					tiles[a.getData(0)] = temp;
					tilesAbove[a.getData(0)] = tempAbove;
					this.secondLayerMap[a.getData(1)]="";
					this.secondLayerMap[a.getData(1)-1]="";
					for(var j = 0; j < this.width; j++) {
						this.secondLayerMap[a.getData(1)] += tiles[j] + " ";
						this.secondLayerMap[a.getData(1)-1] += tilesAbove[j] + " ";
					}
					this.updateTile(a.getData(0),a.getData(1));
					this.updateTile(a.getData(0),a.getData(1)-1);
					
					if(this.moveX + this.moveY == 0) a.setFinished(true);
				}
			}
			if(a.getType() === "Close Door") {
				var tiles = this.secondLayerMap[a.getData(1)].split(" ");
				var tilesAbove = this.secondLayerMap[a.getData(1)-1].split(" ");
				var door1 = parseInt(tiles[a.getData(0)],10);
				var door2 = parseInt(tilesAbove[a.getData(0)],10);
				var temp1 = (door1 - 3).toString();
				var temp2 = (door2 - 3).toString();
				tiles[a.getData(0)] = temp1;
				tilesAbove[a.getData(0)] = temp2;
				this.secondLayerMap[a.getData(1)]="";
				this.secondLayerMap[a.getData(1)-1]="";
				for(var j = 0; j < this.width; j++) {
					this.secondLayerMap[a.getData(1)] += tiles[j] + " ";
					this.secondLayerMap[a.getData(1)-1] += tilesAbove[j] + " ";
				}
				this.updateTile(a.getData(0),a.getData(1));
				this.updateTile(a.getData(0),a.getData(1)-1);
				a.setFinished(true); a.setStarted(true);
				
			}
			if(a.getStarted() && a.getFinished()) {
				this.ani.splice(i,1);
				i--;
				while(a.hasMessage()) {
					this.parent.processMessage(a.getMessage());
				}
				if(a.hasNext())
					this.ani.push(a.getNext());	
			}
			else if(a.getStarted() && a.getReady()) {
				while(a.hasMessage()) {
					parent.processMessage(a.getMessage());
				}
				if(a.hasNext())
					this.ani.push(a.getNext());
				this.ani[i].setNext(null);
			}
		}	
	}
	
	updateTile(xLoc,yLoc) {
		var mapTokens = this.map[yLoc].split(" ");
		var secondMapTokens = this.secondLayerMap[yLoc].split(" ");
		var thirdMapTokens = this.thirdLayerMap[yLoc].split(" ");
		if(mapTokens[xLoc].indexOf('*') != -1) {
			var aTile = mapTokens[xLoc].split("*");
			for(var k = 0; k < 4; k++) {
				this.mapView.getContext("2d").drawImage(this.gfx,(parseInt(aTile[k],10))*32, (parseInt(aTile[k],10))*0, 16, 16,
																 xLoc*64+32*(k%2), yLoc*64+32*Math.floor(k/2), 32, 32);   
			}
		}
		else {
			this.mapView.getContext("2d").drawImage(this.gfx, (parseInt(mapTokens[xLoc],10))*32, (parseInt(mapTokens[xLoc],10))*0, 32,32,
															  xLoc*64, yLoc*64, 64, 64);   
		}
		if(secondMapTokens[xLoc].indexOf('*') != -1) {
			var aTile = secondMapTokens[xLoc].split("*");
			for(var k = 0; k < 4; k++) {
				if(parseInt(aTile[k]) == 0) continue;
				this.mapView.getContext("2d").drawImage(this.gfx, (parseInt(aTile[k],10))*32, (parseInt(aTile[k],10))*0, 16, 16,
																  xLoc*64+32*(k%2), yLoc*64+32*Math.floor(k/2), 32, 32);
			}
		}
		else if(parseInt(secondMapTokens[xLoc],10) != 0) {
			this.mapView.getContext("2d").drawImage(this.gfx, (parseInt(secondMapTokens[xLoc],10))*32, (parseInt(secondMapTokens[xLoc],10))*0, 32, 32,
															  xLoc*64, yLoc*64, 64, 64);
		}
		if(thirdMapTokens[xLoc].indexOf('*') != -1) {
			var aTile = thirdMapTokens[xLoc].split("*");
			for(var k = 0; k < 4; k++) {
				if(parseInt(aTile[k],10) == 0) continue;
				this.mapView.getContext("2d").drawImage(this.gfx, (parseInt(aTile[k],10))*32, (parseInt(aTile[k],10))*0, 16, 16,
																  xLoc*64+32*(k%2), yLoc*64+32*Math.floor(k/2), 32, 32);
			}
		}
		else if(parseInt(thirdMapTokens[xLoc],10) != 0) {
			this.mapView.getContext("2d").drawImage(this.gfx, (parseInt(thirdMapTokens[xLoc],10))*32, (parseInt(thirdMapTokens[xLoc],10))*0, 32, 32,
															  xLoc*64, yLoc*64, 64, 64,);
		}
	}
	
	checkMovePlayer(sym, type, door, loc1, loc2, loc3) {
		if(this.mobilityMap[this.y].substring(this.x,this.x+1) === sym) {
			var first, next, last;
			if(door) {
				first = new Animation("Open Door",this.x,this.y);
				next = new Animation("BlackOut");
				last = new Animation("Close Door",this.x,this.y);
				first.setNext(next);
				next.setNext(last);
			}
			else {
				first = last = new Animation("BlackOut");
			}
			if(type === "Shop") {
				last.addMessage(new Message("Change Shop",loc3,loc1));
				last.addMessage(new Message("Change Area",loc3));
			}
			if(type === "Area") {
				last.addMessage(new Message("Move Player",loc1,loc2,loc3));
				last.addMessage(new Message("Change Area",loc3));
			}
			if(type === "Move") {
				last.addMessage(new Message("Move Player",loc1,loc2,loc3));
			}
			last.setNext(new Animation("Fade In"));
			this.ani.push(first);
			this.processAnimations();
		}
	}
	
	checkEvent() {} // to be overridden
		
	redraw() {
		this.paintComponent();
	}
	
	changeShopNumber(num) {}
	
	
	
	mouseClicked(e) {
			var xPos = e.getX;
			var yPos = e.getY;			
			this.parent.getStatus().clickedOnPanel(xPos, yPos);
	}

	
}

GameEngine.CENTERX = 7;
GameEngine.CENTERY = 5;
GameEngine.MAX_IMAGE_Y = 1000;
GameEngine.PANEL_WIDTH = 1200;
GameEngine.PANEL_HEIGHT = 705;

GameEngine.makeGraphics = function() {
    GameEngine.charGfx = document.createElement('img');
    GameEngine.charGfx.src = "chara.png";
}

    	
// module.exports = GameEngine;