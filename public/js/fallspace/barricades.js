function Wall(gameboard, dir){
	this.$gameboard = gameboard;
	this.height = 32;
	this.width = 32;
	this.movement = 5;
	this.dir = dir;

	// Change spawn point depending on which direction scroll is
	if (this.dir == 'left'){
		this.x = this.$gameboard.width() - this.width/2;
		this.y = Math.floor(Math.random() * this.$gameboard.height());
	} else if (this.dir == 'right') {
		this.x = this.width/2;
		this.y = Math.floor(Math.random() * this.$gameboard.height());
	} else if (this.dir == 'up') {
		this.x = Math.floor(Math.random() * this.$gameboard.width());
		this.y = this.$gameboard.height() - this.height/2;
	} else if (this.dir == 'down'){
		this.x = Math.floor(Math.random() * this.$gameboard.width());
		this.y = this.height/2;
	}

	this.initDisplay();
}

Wall.prototype = {

	updateDisplay: function(){
		this.$barricade.css('top', this.y - this.height/2);
		this.$barricade.css('left', this.x - this.width/2);
	},

	initDisplay: function(){
		this.$barricade = $("<div class='wall'></div>")
		$('#gameboard').append(this.$barricade);
		this.updateDisplay()
	},

	move: function(dir){

		switch(dir) {
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
		if (!this.inbounds()) {
			this.offScreen = true
		} else {
			this.offScreen = false
		}

		this.updateDisplay()
	},

	inbounds: function(){
		return this.x > this.width/2 && this.x < this.$gameboard.width() && this.y > this.height/2 && this.y < this.$gameboard.height()
	},

	hit: function(object){
		return (this.x < object.x + object.width/2 + this.width/2 &&
		   this.x + this.width/2 + object.width/2 > object.x &&
		   this.y < object.y + object.height/2 + this.height/2 &&
		   this.height/2 + this.y + object.height/2 > object.y);
	},

	explode: function(){
		barricade = this.$barricade
		this.$barricade.css('background-image', "url('/imgs/fallspace/explosion.png')")
		this.strike = true
		setTimeout(function(){
			barricade.remove();
		}, 250)
	},

	destroy: function(){
		this.$barricade.remove()
	}

}
