
function Game() {
	this.$gameboard = $('#gameboard');
	this.faller = new Faller(this.$gameboard);
	this.enemies = [new badGuy(this.$gameboard)];
	this.shots = [];
	this.asteroids = [];
}

Game.prototype.loop = function(){
	this.faller.move();
	player = this.faller
	this.enemies.forEach(function(enemy){
		enemy.track(player);
		enemy.move();
	});
	this.shots.forEach(function(shot){
		shot.move();
	});
	this.asteroids.forEach(function(asteroid){
		asteroid.move();
	});
	this.shots = _(this.shots).reject(function(shot){
		return shot.outOfBounds
	});
	this.asteroids = _(this.asteroids).reject(function(asteroid){
		return asteroid.outOfBounds
	});
}

Game.prototype.fire = function(){
	this.shots.push(new Orb(this.$gameboard, this.faller))
}

$(document).ready(function() {
	game = new Game();
	setInterval(function() { game.loop(); }, 20);


	['left', 'right', 'up', 'down'].forEach(function(direction) {
		Mousetrap.bind(direction, function(){
			game.faller.dir = direction
		});
	});

	Mousetrap.bind('space', function(){
		game.fire();
	})
	
});

