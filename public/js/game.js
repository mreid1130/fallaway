
function Game() {
	this.$gameboard = $('#gameboard');
	// this.fallers = [new Faller(this.$gameboard)];
	this.faller = new Faller(this.$gameboard);
	this.enemies = [new badGuy(this.$gameboard)];
	this.shots = []; 
	this.badShots = [];
	this.asteroids = [];
	this.start = Date.now()
	this.nextBadGuySpawn = this.start + 5000
	this.nextAsteroidSpawn = this.start + 3000
	this.enemyFireTime = this.start + 3000
	this.scrollTollCollection = [];
}

Game.prototype.loop = function(){


	this.faller.move();
	this.updateScore();
	player = this.faller
	gameshots = this.shots
	badshots = this.badShots

	if (Date.now() > this.nextBadGuySpawn) {
		this.enemies.push(new badGuy(this.$gameboard))
		this.nextBadGuySpawn += 5000
	}

	if (Date.now() > this.nextAsteroidSpawn){
		this.asteroids.push(new Asteroid(this.$gameboard))
		this.nextAsteroidSpawn += 3000
	}

	if (Date.now() > this.enemyFireTime) {
		this.enemies.forEach(function(enemy){
			badshots.push(enemy.fire())
		})
		this.enemyFireTime += 3000
	}

	badshots.forEach(function(shot){
		if (player.hit(shot)){
			player.explode();
			player.dead = true
		}
	})

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

	this.badShots.forEach(function(shot){
		shot.move();
	});

	this.asteroids.forEach(function(asteroid){
		gameshots.forEach(function(shot){
			if (asteroid.hit(shot)){
				asteroid.strike = true
			};
		})

		if (asteroid.strike) {
			asteroid.explode()
		} else {
			asteroid.move()
		};

		if (player.asteroidStrike(asteroid)) {
			player.explode()
			player.dead = true
		}

	});

	this.asteroids = _(this.asteroids).reject(function(asteroid){
		return asteroid.strike
	});

	this.shots = _(this.shots).reject(function(shot){
		return shot.outOfBounds
	});
	this.badShots = _(this.badShots).reject(function(shot){
		return shot.outOfBounds
	});
	this.asteroids = _(this.asteroids).reject(function(asteroid){
		return asteroid.outOfBounds
	});
}

Game.prototype.userFire = function(){
	this.shots.push(new UserOrb(this.$gameboard, this.faller))
}

Game.prototype.updateScore = function(){
	$('#timer').html(Date.now() - this.start)
}

$(document).ready(function() {
	game = new Game();

	setInterval(function() { 
		if (!game.faller.dead){
			game.loop(); 
		} else {
			window.confirm("Game over, restarting...");
			// location.reload(true);
			window.location.href = window.location.href;
		}
	}, 20);


	['left', 'right', 'up', 'down'].forEach(function(direction) {
		Mousetrap.bind(direction, function(){
			game.faller.dir = direction
		});
	});

	Mousetrap.bind('space', function(){
		game.userFire();
	})
});

