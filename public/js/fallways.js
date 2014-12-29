function Faller() {
	this.x = 300;
	this.y = 300;
	this.height = 40;
	this.width = 40;
	this.movement = 3;
	this.dir = "none";
	this.initDisplay();
}

Faller.prototype = {

	updateDisplay: function(){
		this.$faller.css('top', this.y);
		this.$faller.css('left', this.x);
	},

	initDisplay: function(){
		this.$faller = $("<div class='faller'></div>")
		$('#gameboard').append(this.$faller);
		this.$faller.css('position', 'relative');
		this.$faller.css('height', 40);
		this.$faller.css('width', 40);
		this.$faller.css('background-image', 'url("http://1.bp.blogspot.com/-MQE-zK1mVSE/UdSVGV3GP3I/AAAAAAAAAu8/EOsv__HnS-M/s512/spacestation.png")');
		this.$faller.css('background-size', '40px 40px');
		this.$faller.css('background-repeat', 'no-repeat');

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
		this.updateDisplay()
	}

}

function Game() {
	this.gameboard = $('#gameboard');
	this.faller = new Faller();
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