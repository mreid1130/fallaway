
function Game() {
	this.$gameboard = $('#gameboard');
	this.faller = new Faller(this.$gameboard);
	this.enemies = [new badGuy(this.$gameboard)];
	this.shots = [];
	this.asteroids = [];
	this.start = Date.now()
}

Game.prototype.loop = function(){
	this.faller.move();
	this.updateScore();
	player = this.faller
	gameshots = this.shots

	this.enemies.forEach(function(enemy){
		
		gameshots.forEach(function(shot){
			if (enemy.hit(shot)){
				enemy.dead = true
			};
		})

		if (enemy.dead) {
			enemy.explode()
		} else {
			enemy.track(player);
			enemy.move();
		};
	});

	this.enemies = _(this.enemies).reject(function(enemy){
		return enemy.dead;
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

	game = this

	setInterval(function() {game.spawnBadGuy()}, 5000);
}

Game.prototype.fire = function(){
	this.shots.push(new Orb(this.$gameboard, this.faller))
}

Game.prototype.spawnBadGuy = function(){
	newBaddie = new badGuy(this.$gameboard);
	newBaddie.x = this.$gameboard.width() + Math.floor(Math.random() * 50 + 50)
	newBaddie.y = Math.floor(Math.random() * this.$gameboard.height())
	this.enemies.push(newBaddie)
}

Game.prototype.updateScore = function(){
	$('#timer').html(Date.now() - this.start)
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

