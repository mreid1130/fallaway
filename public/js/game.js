
function Game() {
	this.$gameboard = $('#gameboard');
	// this.fallers = [new Faller(this.$gameboard)];
	this.faller = new Faller(this.$gameboard);
	this.enemies = [new badGuy(this.$gameboard)];
	this.shots = []; 
	this.badShots = [];
	this.asteroids = [];
	this.walls = [];
	this.start = Date.now()
	this.nextBadGuySpawn = this.start + 5000
	this.nextAsteroidSpawn = this.start + 3000
	this.enemyFireTime = this.start + 3000
	this.nextWallSpawn = this.start + 1000
	this.nextScrollSwitch = this.start + 10000
	this.asteroidKills = 0
	this.wallKills = 0
	this.enemyKills = 0
	this.scrollDir = 'left'
}

Game.prototype.loop = function(){

	scrolldir = this.scrollDir
	this.faller.move();
	player = this.faller
	gameshots = this.shots
	badshots = this.badShots
	asteroidKills = this.asteroidKills
	wallKills = this.wallKills
	enemyKills = this.enemyKills

	if (Date.now() > this.nextScrollSwitch){
		this.switchScroll()
		this.nextScrollSwitch += 10000
	}

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

	if (Date.now() > this.nextWallSpawn){
		this.walls.push(new Wall(this.$gameboard, scrolldir))
		this.walls.push(new Wall(this.$gameboard, scrolldir))
		this.walls.push(new Wall(this.$gameboard, scrolldir))
		this.walls.push(new Wall(this.$gameboard, scrolldir))
		this.walls.push(new Wall(this.$gameboard, scrolldir))
		this.walls.push(new Wall(this.$gameboard, scrolldir))
		this.walls.push(new Wall(this.$gameboard, scrolldir))
		this.walls.push(new Wall(this.$gameboard, scrolldir))
		this.walls.push(new Wall(this.$gameboard, scrolldir))
		this.walls.push(new Wall(this.$gameboard, scrolldir))
		this.walls.push(new Wall(this.$gameboard, scrolldir))
		this.walls.push(new Wall(this.$gameboard, scrolldir))
		this.nextWallSpawn += 1000
	}


	badshots.forEach(function(shot){
		if (player.hit(shot)){
			player.explode();
			setTimeout(function(){ 
				player.destroy();
			}, 250) 
			player.dead = true
		}
	})

	this.enemies.forEach(function(enemy){
		
		gameshots.forEach(function(shot){
			if (enemy.hit(shot)){
				enemy.dead = true;
			};
		})

		if (enemy.dead) {
			enemyKills += 1;
			// console.log(enemyKills)
			enemy.explode();
			setTimeout(function(){ 
				enemy.destroy();
			}, 250)
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

	this.walls.forEach(function(wall){
		gameshots.forEach(function(shot){
			if (wall.hit(shot)){
				wall.strike = true;
			};
		})

		if (wall.strike) {
			wallKills += 1;
			// console.log(wallKills)
			wall.explode();
			setTimeout(function(){ 
				wall.destroy();
			}, 250)
		} else {
			wall.move(scrolldir)
		}

		if (wall.offScreen) {
			wall.destroy()
		}

		if (wall.hit(player)){
			// If player hits left side of wall, will be pushed left:
			if (wall.x > player.x && (wall.y + wall.height < player.y + player.height ||  wall.y + wall.height > player.y + player.height)){
				player.x -= wall.movement
			// If player hits right side of wall, will be pushed right:
			} else if (wall.x < player.x && (wall.y + wall.height < player.y + player.height ||  wall.y + wall.height > player.y + player.height)) {
				player.x += wall.movement
			}
			// If player hits bottom of wall, will be pushed down:
			if (wall.y > player.y && (wall.x + wall.width < player.x + player.width ||  wall.x + wall.width > player.x + player.width)){
				player.y -= wall.movement
			// If player hits top of wall, will be pushed up:
			} else if (wall.y < player.y && (wall.x + wall.width < player.x + player.width ||  wall.x + wall.width > player.x + player.width)) {
				player.y += wall.movement
			}
		};

	});

	this.walls = _(this.walls).reject(function(wall){
		return wall.strike
	});

	this.walls = _(this.walls).reject(function(wall){
		return wall.offScreen
	});

	this.asteroids.forEach(function(asteroid){
		gameshots.forEach(function(shot){
			if (asteroid.hit(shot)){
				asteroid.strike = true;
			};
		})

		if (asteroid.strike) {
			asteroidKills += 1;
			// console.log(asteroidKills)
			asteroid.explode();
		} else {
			asteroid.move();
		};

		if (player.asteroidStrike(asteroid)) {
			player.explode()
			setTimeout(function(){ 
				player.destroy();
			}, 250)
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

	this.asteroidKills = asteroidKills
	this.wallKills = wallKills
	this.enemyKills = enemyKills

	this.updateScore();
	
}

Game.prototype.userFire = function(){
	this.shots.push(new UserOrb(this.$gameboard, this.faller))
}

Game.prototype.updateScore = function(){
	$('#timer').html(Date.now() - this.start)
	$('#enemykills').html(this.enemyKills)
	$('#asteroidkills').html(this.asteroidKills)
	$('#wallkills').html(this.wallKills)
}

Game.prototype.resetGame = function(){
	this.faller = new Faller(this.$gameboard);
	this.enemies = [new badGuy(this.$gameboard)];
	this.shots = []; 
	this.badShots = [];
	this.asteroids = [];
	this.walls = [];
	this.start = Date.now()
}

Game.prototype.switchScroll = function(){
	var scrollArray = ['left', 'right', 'up', 'down']
	this.scrollDir = scrollArray[Math.floor(Math.random() * 4)]
}

$(document).ready(function() {
	game = new Game();

	var gameloop = setInterval(function() { 
		if (!game.faller.dead){
			game.loop(); 
		} else {
			clearInterval(gameloop)
		}
	}, 20);


	['left', 'right', 'up', 'down'].forEach(function(direction) {
		Mousetrap.bind(direction, function(){
			game.faller.dir = direction
			game.faller.movement = 5
		}, 'keydown');
		Mousetrap.bind(direction, function(){
			game.faller.dir = direction
			game.faller.movement = 0
		}, 'keyup');
	});

	Mousetrap.bind('space', function(){
		game.userFire();
	})
});

