$(document).ready(function() {

	gameloop = function(game){

		var fallspaceloop = setInterval(function() {

			// checks if player is dead
			if (!game.faller.dead){
				game.loop();
			} else {
				clearInterval(fallspaceloop) // if player is dead, the loop is stopped

				// ajax call to update player score/high scores in the database.
				$.ajax({
				  type: 'POST',
				  url: '/players/fallspace/update',
				  data: {
				  	score: game.score,
				  	asteroids: game.asteroidKills,
						walls: game.wallKills,
						kills: game.enemyKills
				  }
				})

				// create a reset button and make it appear on screen
				$resetButton = $("<div id='start'></div>")
				$('#scoreboard').append($resetButton);

				// when the reset button is clicked...
				$resetButton.on('click', function(){
					$resetButton.remove()
					$('#gameboard').remove() // removed the gameboard (and thus all HTML elements)
					$('body').prepend("<div id='gameboard'></div>") // prepended an empty gameboard to body
					game = new Game(); // create a new Game object
					gameloop(game); // recursive call to run gameloop again
				})
			}
		}, 20);

		// Keybinding to move player on keydown until keyup
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

		// Keybinds user firing to space bar
		Mousetrap.bind('space', function(){
			game.userFire();
		})
	}

	// When the start button is click, a new game is initiated
	$('#start').on('click', function(e){
		e.preventDefault();
		$('#start').remove();
		game = new Game();
		gameloop(game);

	})

});

