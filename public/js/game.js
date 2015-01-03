
function Game() {
	this.$gameboard = $('#gameboard');
	this.faller = new Faller(this.$gameboard);
	this.enemies = [new badGuy(this.$gameboard)];
	this.shots = [];
	this.badShots = [];
	this.asteroids = [];
	this.walls = [];
	this.start = Date.now();
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

	// declaring variables needed when calling inside another loop
	scrolldir = this.scrollDir
	this.faller.move();
	player = this.faller
	gameshots = this.shots
	badshots = this.badShots
	asteroidKills = this.asteroidKills
	wallKills = this.wallKills
	enemyKills = this.enemyKills

	// Switch scroll direction every 10 seconds
	if (Date.now() > this.nextScrollSwitch){
		this.switchScroll()
		this.nextScrollSwitch += 10000
	}

	// Spawn a new bad guy every 5 seconds
	if (Date.now() > this.nextBadGuySpawn) {
		this.enemies.push(new badGuy(this.$gameboard))
		this.nextBadGuySpawn += 5000
	}

	// Spawn a new asteroid every 3 seconds
	if (Date.now() > this.nextAsteroidSpawn){
		this.asteroids.push(new Asteroid(this.$gameboard))
		this.nextAsteroidSpawn += 3000
	}

	// Make enemies fire every 3 seconds
	if (Date.now() > this.enemyFireTime) {
		this.enemies.forEach(function(enemy){
			badshots.push(enemy.fire())
		})
		this.enemyFireTime += 3000
	}

	// Spawn 10 walls every second
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

	// Iterate through enemy shots to check if player is hit
	badshots.forEach(function(shot){
		if (player.hit(shot)){
			player.explode();
			setTimeout(function(){ 
				player.destroy();
			}, 250) 
			player.dead = true
		}
	})

	// Iterate through enemy collection to see if any enemies have been hit. If not, enemy will move towards the player
	this.enemies.forEach(function(enemy){
		
		gameshots.forEach(function(shot){
			if (enemy.hit(shot)){
				enemy.dead = true;
			};
		})

		if (enemy.dead) {
			enemyKills += 1; // Adds to player's score total upon strike
			enemy.explode();
			setTimeout(function(){ 
				enemy.destroy();
			}, 250)
		} else {
			enemy.track(player);
			enemy.move();
		};
	});

	// underscore.js method will remove the enemy object from my enemies array if the enemy.dead attribute is true
	this.enemies = _(this.enemies).reject(function(enemy){
		return enemy.dead;
	});

	// shots move through the board
	this.shots.forEach(function(shot){
		shot.move();
	});

	// bad guy shots move through the board
	this.badShots.forEach(function(shot){
		shot.move();
	});

	// Iterate through walls 
	this.walls.forEach(function(wall){
		// if a shot hits a wall, the wall.strike will be true
		gameshots.forEach(function(shot){
			if (wall.hit(shot)){
				wall.strike = true;
			};
		})

		// checks if wall.strike is true
		if (wall.strike) {
			wallKills += 1; // Adds to player's score total upon strike
			wall.explode(); // explosion animation
			setTimeout(function(){ 
				wall.destroy(); // waits .25 seconds to allow explosion to render on screen, then removes element
			}, 250)
		} else {
			wall.move(scrolldir) // if not dead, wall will move in the games scroll direction
		}

		if (wall.offScreen) {
			wall.destroy() // wall will be destroyed if off screen.
		}

		// Logic on how to prevent player from flying through walls
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
	
	// underscore.js method, will remove walls that have been struck by a shot
	this.walls = _(this.walls).reject(function(wall){
		return wall.strike
	});

	// underscore.js method, will remove walls that have moved off screen
	this.walls = _(this.walls).reject(function(wall){
		return wall.offScreen
	});

	// Iterates through asteroids
	this.asteroids.forEach(function(asteroid){
		gameshots.forEach(function(shot){
			if (asteroid.hit(shot)){
				asteroid.strike = true;
			};
		})

		if (asteroid.strike) {
			asteroidKills += 1; // Adds to player's score total upon strike
			asteroid.explode();
			setTimeout(function(){ 
				asteroid.destroy(); // waits .25 seconds to allow explosion to render on screen, then removes element
			}, 250)
		} else {
			asteroid.move();
		};

		// checks if the asteroid hits the player, if so, player will explode
		if (player.asteroidStrike(asteroid)) {
			player.explode()
			setTimeout(function(){ 
				player.destroy();
			}, 250)
			player.dead = true
		}

	});

	// removes all hit asteroids from asteroids collection
	this.asteroids = _(this.asteroids).reject(function(asteroid){
		return asteroid.strike
	});

	// removes all user shots out of bounds
	this.shots = _(this.shots).reject(function(shot){
		return shot.outOfBounds
	});

	// removes all enemy shots out of bounds
	this.badShots = _(this.badShots).reject(function(shot){
		return shot.outOfBounds
	});

	// removes all asteroids out of bounds
	this.asteroids = _(this.asteroids).reject(function(asteroid){
		return asteroid.outOfBounds
	});

	// registers all scores from the move and records them to the game score
	this.asteroidKills = asteroidKills
	this.wallKills = wallKills
	this.enemyKills = enemyKills

	this.updateScore();
	
}

// creates a new user shot element and creates it on the game board
Game.prototype.userFire = function(){
	this.shots.push(new UserOrb(this.$gameboard, this.faller))
}

// updates the player's score on screen
Game.prototype.updateScore = function(){
	this.score = Date.now() - this.start
	$('#timer').html(this.score)
	$('#enemyKills').html(this.enemyKills)
	$('#asteroidKills').html(this.asteroidKills)
	$('#wallKills').html(this.wallKills)
}

// Currently unused method to clear the board
Game.prototype.resetGame = function(){
	this.faller = new Faller(this.$gameboard);
	this.enemies = [new badGuy(this.$gameboard)];
	this.shots = []; 
	this.badShots = [];
	this.asteroids = [];
	this.walls = [];
	this.start = Date.now()
}

// Switch scroll direction of the game. Changes where walls will spawn from and the direction they move
Game.prototype.switchScroll = function(){
	var scrollArray = ['left', 'right', 'up', 'down']
	this.scrollDir = scrollArray[Math.floor(Math.random() * 4)]
}