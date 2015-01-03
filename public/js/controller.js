$(document).ready(function() {

	gameloop = function(){

		var fallspaceloop = setInterval(function() { 
			if (!game.faller.dead){
				game.loop(); 
			} else {
				clearInterval(fallspaceloop)
				$resetButton = $("<div id='start'>Reset</div>")
				$('#scoreboard').append($resetButton);
				$resetButton.on('click', function(){
					$resetButton.remove()
					$('#gameboard').remove()
					$('body').prepend("<div id='gameboard'></div>")
					game = new Game();
					gameloop();
				})
			}
		}, 20);
	}

	$('#start').on('click', function(){
		$('#start').remove()
		game = new Game();
		gameloop();


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

	})

});

