
function Game() {
	this.$gameboard = $('#gameboard');
	this.faller = new Faller(this.$gameboard);
	this.enemy = new badGuy(this.$gameboard);
}

Game.prototype.loop = function(){
	this.faller.move()
	this.enemy.track(this.faller)
	this.enemy.move()
}

$(document).ready(function() {
	game = new Game();
	setInterval(function() { game.loop(); }, 20);


	['left', 'right', 'up', 'down'].forEach(function(direction) {
		Mousetrap.bind(direction, function(){
			game.faller.dir = direction
		});
	});
	
});

