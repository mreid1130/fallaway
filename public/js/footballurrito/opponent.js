function Opponent (gameboard) {
	this.$gameboard = gameboard
	this.spawnOptions = ['top', 'bottom', 'left', 'right']
	this.spawnLocation = this.spawnOptions[Math.floor(Math.random() * 4)]
	this.height = Math.floor(Math.random() * 150 + 20)
	this.width = this.height

	if (this.spawnLocation == 'right'){
		this.x = this.$gameboard.width() - this.width/2 - 1;
		this.y = Math.floor(Math.random() * this.$gameboard.height());
		this.dir = 'left'
	} else if (this.spawnLocation == 'left') {
		this.x = this.width/2 + 1;
		this.y = Math.floor(Math.random() * this.$gameboard.height());
		this.dir = 'right'
	} else if (this.spawnLocation == 'bottom') {
		this.x = Math.floor(Math.random() * this.$gameboard.width());
		this.y = this.$gameboard.height() - this.height/2 -1;
		this.dir = 'up'
	} else if (this.spawnLocation == 'top'){
		this.x = Math.floor(Math.random() * this.$gameboard.width());
		this.y = this.height/2 + 1;
		this.dir = 'down'
	}
	this.speed = Math.floor(Math.random() * 3 + 1);

	this.initDisplay();
}

Opponent.prototype = {

	updateDisplay: function(){
		this.$opponent.css('top', this.y - this.height/2)
		this.$opponent.css('left', this.x - this.width/2)
		this.$opponent.css('height', this.height)
		this.$opponent.css('width', this.width)
		this.$opponent.css('background-size', this.height+'px '+ this.width+'px')
	},

	initDisplay: function(){
		this.$opponent = $("<div class='opponent'></div>")
		$('#field').append(this.$opponent);

		this.updateDisplay();
	},

	move: function(){

		switch(this.dir) {
			case 'right':
				this.x += this.speed;
				this.$opponent.css('background-image', "url('/imgs/footballurrito/playerright.gif')")
				break;
			case 'left':
				this.x -= this.speed;
				this.$opponent.css('background-image', "url('/imgs/footballurrito/playerleft.gif')")
				break;
			case 'up':
				this.y -= this.speed;
				this.$opponent.css('background-image', "url('/imgs/footballurrito/playerup.gif')")
				break;
			case 'down':
				this.y += this.speed;
				this.$opponent.css('background-image', "url('/imgs/footballurrito/playerdown.gif')")
				break;
		}

		if (!this.inbounds()) {
			this.destroy()
			this.outOfBounds = true
		}

		this.updateDisplay();
	},

	inbounds: function(){
		return this.x > this.width/2 && this.x < this.$gameboard.width() - this.width/2 && this.y > this.height/2 && this.y < this.$gameboard.height() - this.height/2
	},

	tackled: function(){
		opponent = this.$opponent
		this.$opponent.css('background-image', "url('/imgs/footballurrito/tackledplayer.png')")
		this.down = true
	},

	destroy: function(){
		this.$opponent.remove();
	}

}
