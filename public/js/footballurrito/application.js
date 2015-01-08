$(document).ready(function() {

	gameloop = function(game){

		var footballurritoloop = setInterval(function(){
			if (!game.player.down){
				game.loop();
			} else {

				clearInterval(footballurritoloop)

				$.ajax({
								  type: 'POST',
								  url: '/players/footballurrito/update',
								  data: {
								  	score: game.score,
								  	burritos: game.burritosEaten,
										opponents: game.opponentsTackled,
								  }
								})

				$resetButton = $("<div id='start'></div>")
				$('#scoreboard').append($resetButton);

				$resetButton.on('click', function(){
					$resetButton.remove()
					$('#field').remove() // removed the gameboard (and thus all HTML elements)
					$('body').prepend("<div id='field'></div>") // prepended an empty gameboard to body
					game = new FootballGame(); // create a new Game object
					gameloop(game); // recursive call to run gameloop again
				})

			}
		}, 20);

		['left', 'right', 'up', 'down'].forEach(function(direction) {
			Mousetrap.bind(direction, function(){
				game.player.dir = direction
				game.player.movement = 4
			}, 'keydown');

			Mousetrap.bind(direction, function(){
				game.player.dir = 'none'
				game.player.movement = 0
				game.player.$player.css('background-image', "url('/imgs/footballurrito/standingplayer.png')")
			}, 'keyup');
		})

	}

	$('#start').on('click', function(e){
		e.preventDefault();
		$('#start').remove();
		game = new FootballGame();
		gameloop(game);
	})

});
