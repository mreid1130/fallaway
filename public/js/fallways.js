function Faller(gameboard) {
	this.$gameboard = gameboard;
	this.x = this.$gameboard.width() / 2;
	this.y = this.$gameboard.height() / 2;
	this.height = 40;
	this.width = 40;
	this.movement = 4;
	this.dir = "none";
	this.initDisplay();
}

Faller.prototype = {

	updateDisplay: function(){
		this.$faller.css('top', this.y - this.height/2);
		this.$faller.css('left', this.x - this.width/2);
	},

	initDisplay: function(){
		this.$faller = $("<div class='faller'></div>")
		$('#gameboard').append(this.$faller);

		this.updateDisplay()
	},

	move: function(){
		oldX = this.x 
		oldY = this.y
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
		if (!this.inbounds()) {
			this.x = oldX;
			this.y = oldY;
		}
		this.updateDisplay()
	},

	inbounds: function(){ 
		return this.x > this.width/2 && this.x < this.$gameboard.width() - this.width/2 && this.y > this.height/2 && this.y < this.$gameboard.height() - this.height/2
	}

}

function Game() {
	this.$gameboard = $('#gameboard');
	this.faller = new Faller(this.$gameboard);
}

Game.prototype.loop = function(){
	this.faller.move()
}

$(document).ready(function() {
	game = new Game();
	setInterval(function() { game.loop(); }, 20);

	Mousetrap.bind('left', function(){
		game.faller.dir = 'left'
	})
	Mousetrap.bind('right', function(){
		game.faller.dir = 'right'
	})
	Mousetrap.bind('up', function(){
		game.faller.dir = 'up'
	})
	Mousetrap.bind('down', function(){
		game.faller.dir = 'down'
	})
	
});