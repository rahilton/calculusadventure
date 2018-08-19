class Battle {
	
	constructor(p, m, bgNum, a) {
		this.player = p;
		this.monster = m;
		this.background = this.getBackground(bgNum);
		this.main = new GameWindow(Battle.MAIN_WINDOW_X1, Battle.MAIN_WINDOW_Y1, Battle.MAIN_WINDOW_X2, Battle.MAIN_WINDOW_Y2);
		this.main.setOptionBackground( this.background);
		this.playWindow = new GameWindow(Battle.PLAYER_WINDOW_X1,Battle.PLAYER_WINDOW_Y1,Battle.PLAYER_WINDOW_X2,Battle.PLAYER_WINDOW_Y2);
		this.optionWindow = new GameWindow(100,410,400,700);
		this.secondOptionWindow = new GameWindow(600,410,900,700,false);
		this.messageWindow = new GameWindow(50,0,950,100);
		this.messageWindow.addText(new WindowMessage(m.getName(),false), true);
		this.costWindow = new GameWindow(700,310,950,410,false);
		this.numberSelect1 = new GameWindow(850,410,1000,510,false);
		this.numberSelect2 = new GameWindow(850,510,1000,610,false);
		
		var mes = new WindowMessage("","Option");
		for(var i = 0; i < 5; i++) {
			if( this.monster.getRunnable() || i !=4)
			mes.addOption(p.getBattleOption(i));
		}
		this.optionWindow.addText(mes);
		this.active = false;
		this.yourTurn = true;
		this.ani = a;
		this.skillsPrinted = false;
		
		this.activeWindow =  this.optionWindow;
	}
	
	printBattle(g) {
		this.main.printWindow(g);
		if(! this.main.isOpening() && ! this.main.isClosing() && ! this.main.isClosed())  this.monster.printMonster(g);
		this.playWindow.printWindow(g);
		if(! this.main.isOpening() && ! this.main.isClosing() && ! this.main.isClosed())  this.player.printPlayer(g);
		this.optionWindow.printWindow(g);
		this.messageWindow.printWindow(g);
		this.secondOptionWindow.printWindow(g);
		this.costWindow.printWindow(g);
		this.numberSelect1.printWindow(g);
		this.numberSelect2.printWindow(g);
		
		if(! this.main.isOpening() && ! this.main.isClosing() && ! this.main.isClosed()) {
			 this.player.printPassiveSkills(g,this.monster);
		}
		
		for(var i = 0; i < this.ani.length; i++) {
			this.processAnimation(this.ani[i],g);
			//if( this.ani.get(i).getFinished()) {
				//if( this.ani.get(i).hasNext())  this.ani.push( this.ani.get(i).getNext());
				// this.ani.remove(i);
				//i--;
			//}
		}

	}
	
	getActive() {
		return  this.active;
	}
	
	setActive(a) {
		 this.active = a;
	}
	
	process(code) {
		//Code 37 is left. Code 38 is up. Code 39 is right. Code 40 is down.
		if(code == 37) {
			if( this.activeWindow == this.numberSelect1 ||  this.activeWindow == this.numberSelect2) {
				this.numberSelect1.closeWindow();
				this.numberSelect2.closeWindow();
				this.costWindow.clearText();
				this.activeWindow = this.optionWindow;
				this.checkAction();
			}
			else {
				this.secondOptionWindow.clearText();
				this.secondOptionWindow.closeWindow();
				this.costWindow.clearText();
				this.costWindow.closeWindow();
				this.activeWindow = this.optionWindow;
			}
		}
		if(code == 38) {
			if(this.activeWindow != null) {
				this.activeWindow.moveOptionUp();
				this.costWindow.setPosition(this.activeWindow.getOption());
			}
		}
		if(code == 39) {
		}
		if(code == 40) {
			if(this.activeWindow != null) {
				this.activeWindow.moveOptionDown();
				this.costWindow.setPosition(this.activeWindow.getOption());
			}
		}
		if(code == 32) {
			this.checkAction();
		}/*
		if(code == 68) { //d
			// this.ani.push(new AnimationPlusC(monster, this.monster.getX(), this.monster.getY(), this.monster.getWidth(), this.monster.getHeight()));
			 this.ani.push(new AnimationSample("Sample",64,64,500,500));
			// this.monster.integrate(3,5);
		}
		if(code == 69) { //e
			 this.monster.addDegree(-2, 3);
			// this.ani.push(new AnimationEvaluateAnimate(monster));
			// this.monster.plugIn(2);
		}*/
	}
	
	checkAction() {
		if(this.activeWindow == this.messageWindow) {
			this.activeWindow.nextText();
			if(this.activeWindow.getPosition() >= this.activeWindow.getTextSize()) {
				if(this.monster.isDead()) {
					this.player.addExperience(this.monster.getXp());
					var temp1 = new Animation("Shutdown");
					var temp2 = new Animation("Pause",8);
					var temp3 = new Animation("Defeat Monster");
					var temp4 = new Animation("Battle Done");
					if(this.monster.getName() ==="Lord Calculus") {
						var temp5 = new Animation("BlackOut");
						var msg = new Message("Change Area",21);
						temp5.addMessage(msg); temp4.setNext(temp5);
					}
					temp1.setNext(temp2); temp2.setNext(temp3); temp3.setNext(temp4);
					this.ani.push(temp1);
					if( this.monster.getName() ==="Earth Elemental")  this.player.setFlag(0, true);
					if( this.monster.getName() ==="Mystic Dragon")  this.player.setFlag(1, true);
					if( this.monster.getName() ==="Sea Serpent")  this.player.setFlag(2, true);
					if( this.monster.getName() ==="Demon King")  this.player.setFlag(3, true);
					this.activeWindow = null;
				}
				if(this.player.isDead()) {
					//System.out.println("The player is Dead");
					var temp1 = new Animation("Shutdown");
					var temp2 = new Animation("BlackOut");
					var temp3 = new Animation("Pause",8);
					var temp4 = new Animation("Battle Done");
					var msg1;
					if( this.player.getLastTown()==14) msg1 = new Message("Change Shop",2,1);
					else if( this.player.getLastTown()==13) msg1 = new Message("Change Shop",2,2);
					else if( this.player.getLastTown()==16) msg1 = new Message("Change Shop",2,3);
					else if( this.player.getLastTown()==18) msg1 = new Message("Change Shop",2,4);
					else msg1 = new Message("Change Shop",2,0);
					//Message msg1 = new Message("Change Shop",2, this.player.getLastTown());
					var msg2 = new Message("Revive");
					var msg3 = new Message("Change Area",2);
					var temp5 = new Animation("Fade In");
					temp1.setNext(temp2); temp2.setNext(temp3); temp3.setNext(temp4); temp4.setNext(temp5); temp4.addMessage(msg1); temp4.addMessage(msg2); temp4.addMessage(msg3);
					this.ani.push(temp1);
					this.activeWindow = null;
				}
			}
			return;
		}
		if(!this.yourTurn || this.activeWindow == null) return;
		
		var action = this.activeWindow.getOptionText(this.activeWindow.getOption());
		if(action ==="Subtract") {
			this.player.setLastAttack("Subtract");
			var temp = new Animation("Close Message");
			var temp1 = new Animation("Clear Message");
			var temp2 = new Animation("Close Options");
			var temp3 = new Animation("Pause",8);
			var temp4 = new Animation("Open Message");
			var temp5 = new Animation("Add Message",new WindowMessage("Subtract",false));
			var temp6 = new Animation("Pause",16);
			var temp7 = new Animation("Check Shield:Subtract");
			var temp8 = new AnimationStandard("Slash.png", this.monster.getX(), this.monster.getY(), this.monster.getWidth(), this.monster.getHeight(),18,10);
			var damage = this.monster.defenseAmount() - this.player.attackAmount();
			if (damage > -1) damage = -1;
			var temp9 = new AnimationDamage("Damage", this.monster.getX()+ this.monster.getWidth()/2, this.monster.getY()+( this.monster.getHeight()*7)/8,damage);
			var temp10 = new Animation("Subtract Equation",damage);
			var temp11 = new Animation("Clear Message");
			var temp12 = new Animation("Check Death");
			var temp13 = new Animation("Monster Turn");
			temp.setNext(temp1); temp1.setNext(temp2);temp2.setNext(temp3);temp3.setNext(temp4);temp4.setNext(temp5);temp5.setNext(temp6);temp6.setNext(temp7);temp7.setNext(temp8);temp8.setNext(temp9);temp9.setNext(temp10);temp10.setNext(temp11);temp11.setNext(temp12);temp12.setNext(temp13);
			this.ani.push(temp);
			this.yourTurn = false;
		}
		else if(action ==="Skills") {
			var mes = new WindowMessage("","Option");
			for(var i = 0; i < this.player.getSkillOptionCount(); i++) {
				var theSkills = this.player.getSkillOptions();
				var curSkill = this.player.getSkill(theSkills[i]);
				mes.addOption(theSkills[i]);
				if(curSkill.getName() !=="Nothing")
					this.costWindow.addText(new WindowMessage("SP:" + (curSkill.getUseCost()).toString(),false));
				else
					this.costWindow.addText(new WindowMessage("SP:##",false));
				
			}
			this.costWindow.setPosition(0);
			this.costWindow.openWindow();
			this.secondOptionWindow.resetOptions();
			this.secondOptionWindow.addText(mes);
			this.secondOptionWindow.openWindow();
			this.activeWindow = this.secondOptionWindow;
		}
		else if(action ==="Magic") {
			var mes = new WindowMessage("","Option");
			for(var i = 0; i <  this.player.getMagicOptionCount(); i++) {
				var theSpells =  this.player.getMagicOptions();
				var curSpell =  this.player.getMagic(theSpells[i]);
				mes.addOption(theSpells[i]);
				if(curSpell.getName() !=="Nothing")
					this.costWindow.addText(new WindowMessage("MP:" + curSpell.getUseCost().toString(),false));
				else
					this.costWindow.addText(new WindowMessage("MP:##",false));
				/*if( this.player.getMagic(i).isLearned()) {
					mes.addOption( this.player.getMagic(i).getName());
					this.costWindow.addText(new WindowMessage("MP:" + String.valueOf( this.player.getMagic(i).getUseCost()),false));
				}*/
			}
			this.costWindow.setPosition(0);
			this.costWindow.openWindow();
			this.secondOptionWindow.resetOptions();
			this.secondOptionWindow.addText(mes);
			this.secondOptionWindow.openWindow();
			this.activeWindow = this.secondOptionWindow;
		}
		else if(action ==="Items") {
			var mes = new WindowMessage("","Option");
			for(var i = 0; i <  this.player.getItemCount(); i++) {
				mes.addOption( this.player.getItemAndQuantity(i));
			}
			this.secondOptionWindow.resetOptions();
			this.secondOptionWindow.addText(mes);
			this.secondOptionWindow.openWindow();
			this.activeWindow = this.secondOptionWindow;
		}
		else if(action ==="Run") {
			
			this.ani.push( this.monster.attackRun());
						
			//temp.setNext(temp1); temp1.setNext(temp2);temp2.setNext(temp3);temp3.setNext(temp4);
			// this.ani.push(temp);
		}
		else if(this.activeWindow == this.secondOptionWindow) {
			var temp = new Animation("Nothing");
			if(this.optionWindow.getOption() == 1) {
				if(this.player.getSkillOptions()[ this.activeWindow.getOption()].indexOf('#') == -1)
					temp = this.player.checkSkills(this.player.getSkill(this.player.getSkillOptions()[this.activeWindow.getOption()]), this.monster);
				else {
					var type =  this.player.getSkillOptions()[this.secondOptionWindow.getOption()].substring(0, this.player.getSkillOptions()[this.secondOptionWindow.getOption()].indexOf(' ', 5));
					var theNums =  this.player.getSkillValues( this.player.getSkillOptions()[ this.activeWindow.getOption()]);
					this.numberSelect1.clearText();
					this.activeWindow = this.numberSelect1;
					this.numberSelect1.openWindow();
					var mes = new WindowMessage("","Option");
					this.costWindow.clearText();
					for(var i = 0; i < theNums.length; i++) {
						mes.addOption(theNums[i]);
						this.costWindow.addText(new WindowMessage("SP:"+ this.player.getSkill(type + " " + theNums[i]).getUseCost(),false));
					}
					this.numberSelect1.addText(mes);
					this.numberSelect1.resetOptions();
					
				}
			}
			if(this.optionWindow.getOption() == 2)
				if(this.player.getMagicOptions()[this.activeWindow.getOption()].indexOf('#') == -1)
					temp = this.player.checkSkills(this.player.getMagic(this.player.getMagicOptions()[this.activeWindow.getOption()]), this.monster);
				else {
					//String type =  this.player.getMagicOptions()[this.secondOptionWindow.getOption()].substring(0, this.player.getMagicOptions()[this.secondOptionWindow.getOption()].indexOf(' ', 5));
					var theNums =  this.player.getLowerLimits();
					this.numberSelect1.clearText();
					this.activeWindow = this.numberSelect1;
					this.numberSelect1.openWindow();
					var mes = new WindowMessage("","Option");
					this.costWindow.clearText();
					for(var i = 0; i < theNums.length; i++) {
						mes.addOption(theNums[i]);
						this.costWindow.addText(new WindowMessage("MP:"+ this.player.getMagic("Low. Lim. " + theNums[i]).getUseCost(),false));
					}
					this.numberSelect1.addText(mes);
					this.numberSelect1.resetOptions();
					
				}
				//temp =  this.player.checkSkills( this.player.getMagic( this.activeWindow.getOption()), monster);
			if(this.optionWindow.getOption() == 3)
				temp = this.player.checkSkills(this.player.getItems()[this.activeWindow.getOption()], this.monster);
			if(temp.getType() !=="Nothing") {
				this.ani.push(temp);
				this.yourTurn = false;
			}
		}
		else if(this.activeWindow == this.numberSelect1) {
			if(this.optionWindow.getOption() == 1) {
				var temp = new Animation("Nothing");
				var type = this.player.getSkillOptions()[this.secondOptionWindow.getOption()].substring(0, this.player.getSkillOptions()[this.secondOptionWindow.getOption()].indexOf(' ', 5));
				temp =  this.player.checkSkills( this.player.getSkill(type + " " + this.numberSelect1.getOptionText(this.numberSelect1.getOption())), this.monster);
				if(temp.getType() !=="Nothing") {
					this.ani.push(temp);
					this.yourTurn = false;
				}
			}
			if(this.optionWindow.getOption() == 2) {
				var theNums =  this.player.getUpperLimits();
				this.numberSelect2.clearText();
				this.activeWindow = this.numberSelect2;
				this.numberSelect2.openWindow();
				var mes = new WindowMessage("","Option");
				var llCost = parseInt(this.costWindow.getText(this.numberSelect1.getOption()).substring(3));
				this.costWindow.clearText();
				for(var i = 0; i < theNums.length; i++) {
					mes.addOption(theNums[i]);
					this.costWindow.addText(new WindowMessage("MP:"+llCost+"+"+ this.player.getMagic("Upp. Lim. " + theNums[i]).getUseCost(),false));
				}
				this.numberSelect2.addText(mes);
				this.numberSelect2.resetOptions();
			}
		} else if (this.activeWindow == this.numberSelect2) {
			var temp = new Animation("Nothing");
			//System.out.println(this.costWindow.getText(this.numberSelect2.getOption()).substring(3).sp);
			var spellCosts = this.costWindow.getText(this.numberSelect2.getOption()).substring(3).split("+");
			var spellCost = parseInt(spellCosts[0]) + parseInt(spellCosts[1]);  
			var intSpell = new Spell("Integrate "+ this.numberSelect1.getOptionText(this.numberSelect1.getOption()) + " " + this.numberSelect2.getOptionText(this.numberSelect2.getOption()),"",spellCost,0,0, [0]); 
			temp = this.player.checkSkills(intSpell , this.monster);
			if(temp.getType() !=="Nothing") {
				this.ani.push(temp);
				this.yourTurn = false;
			}
		
		}
	}
	
	processTime() {
		
		
	}
	
	processAnimation(a, g) {
		if(a.getType() ==="Pause" && !a.getStarted()) {
			a.setMaxTic(a.getData(0));
		}
		if(a.getType() ==="Clear Message") {
			this.messageWindow.clearText();
			this.messageWindow.closeWindow();
		}
		if(a.getType() ==="Active Message") {
			 this.activeWindow = this.messageWindow;			
		}
		if(a.getType() ==="Open Message") {
			this.messageWindow.openWindow();
		}
		if(a.getType() ==="Close Message") {
			this.messageWindow.closeWindow();
		}
		if(a.getType() ==="Add Message") {
			this.messageWindow.addText(a.getWinData(0),true);
		}
		if(a.getType() ==="Open Options") {
			this.yourTurn = true;
			if( this.player.getSkill("Iron Will").getName() ==="Iron Will" &&  this.player.getSkill("Iron Will").isLearned())  this.player.changeSp(1);
			this.optionWindow.openWindow();
			this.activeWindow = this.optionWindow;
			this.player.updateBoost();
			this.player.updateBuffer();
		}
		if(a.getType() ==="Close Options") {
			this.yourTurn = false;
			this.optionWindow.closeWindow();
		}
		if(a.getType() ==="Close Second Window") {
			this.secondOptionWindow.clearText();
			this.secondOptionWindow.closeWindow();
			this.costWindow.clearText();
			this.costWindow.closeWindow();
			this.numberSelect1.clearText();
			this.numberSelect1.closeWindow();
			this.numberSelect2.clearText();
			this.numberSelect2.closeWindow();
		}
		if(a.getType() ==="Damage Player") {
			if(a.getNext() instanceof AnimationDamage &&  this.player.hasShield()) {
				var temp = new Animation("Damage Player",a.getData(0));
				var temp1 = a.getNext().getNext();
				a.getNext().setNext(temp);temp.setNext(temp1);
			}
			else {
				this.player.changeHp(a.getData(0));
				if(this.player.hasShield() && this.player.isShieldBroken()) {
					this.player.breakShield(a);
				}
			}
			
		}
		if(a.getType() ==="Change SP") {
			this.player.changeSp(a.getData(0));
		}
		if(a.getType() ==="Change MP") {
			this.player.changeMp(a.getData(0));
		}
		if(a.getType() ==="Subtract Equation") {
			this.monster.changeHp(a.getData(0));
		}
		if(a.getType() ==="Monster Plug In") {
			this.monster.plugIn(a.getData(0));
		}
		if(a.getType() ==="Player Plug In") {
			this.player.plugIn(a.getData(0));
		}
		if(a.getType().length>11 && a.getType().substring(0,12) ==="Check Shield") {
			this.monster.processShield(a);
		}
		if(a.getType() ==="Check Death") {
			if(this.monster.isDead() && ! this.monster.hasPlusC()) {
				var temp1 = new AnimationMonsterDeath(this.monster);
				var temp2 = new Animation("Open Message");
				var temp3 = new Animation("Active Message");
				this.messageWindow.clearText();
				this.messageWindow.addText(new WindowMessage("You win!",false),true);
				this.messageWindow.addText(new WindowMessage("You gained "+ this.monster.getXp()+" XP!",false),true);
				if( this.monster.getName() ==="Melmond") {
					this.messageWindow.addText(new WindowMessage("Melmond says to you:"),true);
					this.messageWindow.addText(new WindowMessage("Lord Calculus's top HP"),true);
					this.messageWindow.addText(new WindowMessage("must be 1000."),true);
				}
				if( this.monster.getName() ==="Erasmus") {
					this.messageWindow.addText(new WindowMessage("Erasmus says to you:"),true);
					this.messageWindow.addText(new WindowMessage("Lord Calculus's middle HP"),true);
					this.messageWindow.addText(new WindowMessage("must be 0."),true);
				}
				if( this.monster.getName() ==="Mystero") {
					this.messageWindow.addText(new WindowMessage("Mystero says to you:"),true);
					this.messageWindow.addText(new WindowMessage("Lord Calculus's bottom HP"),true);
					this.messageWindow.addText(new WindowMessage("must be -1000."),true);
				}
				temp1.setNext(temp2); temp2.setNext(temp3);
				a.setNext(temp1);
			}
			if( this.monster.isDead() &&  this.monster.hasPlusC()) {
				var temp1 = new Animation("Clear Message");
				var temp2 = new Animation("Add Message", new WindowMessage("+C"));
				var temp3 = new Animation("Open Message");
				var temp4 = new AnimationPlusC(this.monster,  this.monster.getX(), this.monster.getY(), this.monster.getWidth(), this.monster.getHeight());
				var temp5 = new AnimationDamage("Damage", this.monster.getX()+ this.monster.getWidth()/2, this.monster.getY()+( this.monster.getHeight()*7)/8, this.monster.getPlusCAmount());
				var temp6 = new Animation("Monster Resurrect");
				var temp7 = new Animation("Clear Message");
				var temp8 = a.getNext();
				a.setNext(temp1);temp1.setNext(temp2);temp2.setNext(temp3);temp3.setNext(temp4);temp4.setNext(temp5);temp5.setNext(temp6);temp6.setNext(temp7);temp7.setNext(temp8);
			}
			if( this.player.isDead()) {
				var temp1 = new AnimationPlayerDeath(this.player);
				var temp2 = new Animation("Open Message");
				var temp3 = new Animation("Active Message");
				this.messageWindow.clearText();
				this.messageWindow.addText(new WindowMessage("Defeated...",false),true);
				temp1.setNext(temp2); temp2.setNext(temp3);
				a.setNext(temp1);
			}
		}
		if(a.getType() ==="Shutdown") {
			this.main.closeWindow();
			this.playWindow.closeWindow();
			this.optionWindow.closeWindow();
			this.secondOptionWindow.closeWindow();
			this.costWindow.closeWindow();
			this.messageWindow.closeWindow();
			this.player.removeShield();
			while( this.player.hasBuffer())  this.player.updateBuffer();
			while( this.player.hasBoost())  this.player.updateBoost();
		}
		if(a.getType() ==="Monster Turn") {
			this.yourTurn = false;
			this.monsterTurn();
		}
		if(a.getType() ==="Battle Done") {
			this.player.setLastAttack("");
			this.active = false;
		}
		if(a.getType() ==="Monster Resurrect") {
			this.monster.resurrect();
		}
		//Animation Specific to MonsterLordCalculus
		if(a.getType() ==="Active Change") {
			var active =  this.monster.getCycle();
			if(active == 0 || active == 1 || active == 2) {
				this.monster.changeActive(active);
				this.monster.changeSecondActive(-1);
				this.monster.changeThirdActive(-1);
			}
			if(active == 3) {
				this.monster.changeActive(0);
				this.monster.changeSecondActive(1);
				this.monster.changeThirdActive(-1);
			}
			if(active == 4) {
				this.monster.changeActive(0);
				this.monster.changeSecondActive(2);
				this.monster.changeThirdActive(-1);
			}
			if(active == 5) {
				this.monster.changeActive(1);
				this.monster.changeSecondActive(2);
				this.monster.changeThirdActive(-1);
			}
			if(active == 6) {
				this.monster.changeActive(0);
				this.monster.changeSecondActive(1);
				this.monster.changeThirdActive(2);
			}
		}
		
		if(!a.getStarted()) a.setStarted(true);
		
		
		a.paintAnimation(g);
	}
	
	monsterTurn() {
		this.ani.push( this.monster.attack());
	}
	
	getBackground(num) {
		if(num == 0) return "outside.jpg";
		if(num == 1) return "desert.png";
		if(num == 2) return "Cliff.png";
		if(num == 3) return "cave.png";
		if(num == 4) return "forest.png";
		if(num == 5) return "Tower.png";
		if(num == 6) return "snow.jpg";
		if(num == 7) return "IceCave.png";
		if(num == 8) return "Volcano.png";
		if(num == 9) return "wasteland.png";
		if(num == 10) return "Evillair.jpg";
		return "outside.jpg";
	}
}

Battle.MAIN_WINDOW_X1 = 200;
Battle.MAIN_WINDOW_Y1 = 100;
Battle.MAIN_WINDOW_X2 = 800;
Battle.MAIN_WINDOW_Y2 = 400;
	
Battle.PLAYER_WINDOW_X1 = 450;
Battle.PLAYER_WINDOW_Y1 = 470;
Battle.PLAYER_WINDOW_X2 = 550;
Battle.PLAYER_WINDOW_Y2 = 570;
