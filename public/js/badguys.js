function badGuy(gameboard) {
	this.$gameboard = gameboard;
	this.x = this.$gameboard.width();
	this.y = this.$gameboard.height() / 2;
	this.height = 40;
	this.width = 40;
	this.movement = 2;
	this.dir = "none";
	this.initDisplay();
}

badGuy.prototype = {

	updateDisplay: function(){
		this.$enemy.css('top', this.y - this.height/2);
		this.$enemy.css('left', this.x - this.width/2);
	},

	initDisplay: function(){
		this.$enemy = $("<div class='badguy'></div>")
		$('#gameboard').append(this.$enemy);

		this.updateDisplay()
	},

	move: function(){

		switch(this.dir) {
			case 'right':
				this.x += this.movement;
				break;
			case 'left':
				this.x -= this.movement;
				break;
			case 'up':
				this.y -= this.movement;
				break;
			case 'down':
				this.y += this.movement;
				break;
		}

		this.updateDisplay();
	},

	track: function(faller){

		xdiff = faller.x - this.x
		ydiff = faller.y - this.y

		if (Math.abs(xdiff) > Math.abs(ydiff)){
			if (xdiff > 0){
				this.dir = 'right'
			} else {
				this.dir = 'left'
			};
		} else {
			if (ydiff > 0){
				this.dir = 'down'
			} else {
				this.dir = 'up'
			};
		};
	},

	inbounds: function(){ 
			return this.x > this.width && this.x < this.$gameboard.width() - this.width && this.y > this.height && this.y < this.$gameboard.height() - this.height
	}

};