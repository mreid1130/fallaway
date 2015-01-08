function Player (gameboard) {
	this.$gameboard = gameboard
	this.x = this.$gameboard.width() / 2;
	this.y = this.$gameboard.height() / 2;
	this.height = 20
	this.width = 20
	this.speed = 4;
	this.dir = "none";
	this.initDisplay();
}

Player.prototype = {

	updateDisplay: function(){
		this.$player.css('top', this.y - this.height/2)
		this.$player.css('left', this.x - this.width/2)
		this.$player.css('height', this.height)
		this.$player.css('width', this.width)
		this.$player.css('background-size', this.height+'px '+ this.width+'px')
	},

	initDisplay: function(){
		this.$player = $("<div class='player'></div>")
		$('#field').append(this.$player);

		this.updateDisplay();
	},

	move: function(){
		oldX = this.x
		oldY = this.y

		switch(this.dir) {
			case 'right':
				this.x += this.speed;
				this.$player.css('background-image', "url('/imgs/footballurrito/playerright.gif')")
				break;
			case 'left':
				this.x -= this.speed;
				this.$player.css('background-image', "url('/imgs/footballurrito/playerleft.gif')")
				break;
			case 'up':
				this.y -= this.speed;
				this.$player.css('background-image', "url('/imgs/footballurrito/playerup.gif')")
				break;
			case 'down':
				this.y += this.speed;
				this.$player.css('background-image', "url('/imgs/footballurrito/playerdown.gif')")
				break;
		}

		if (!this.inbounds()) {
			if (this.x > this.width/2 || this.x < this.$gameboard.width() - this.width/2){
				this.x = oldX
			}
			if (this.y > this.height/2 || this.y < this.$gameboard.height() - this.height/2){
				this.y = oldY
			}
		}

		this.updateDisplay();
	},

	inbounds: function(){
		return this.x > this.width/2 && this.x < this.$gameboard.width() - this.width/2 && this.y > this.height/2 && this.y < this.$gameboard.height() - this.height/2
	},

	hit: function(opponent){

		return (this.x < opponent.x + opponent.width/2 + this.width/2 &&
		   this.x + this.width/2 + opponent.width/2 > opponent.x &&
		   this.y < opponent.y + opponent.height/2 + this.height/2 &&
		   this.height/2 + this.y + opponent.height/2> opponent.y);
	},

	tackled: function(){
		this.$player.css('background-image', "url('/imgs/footballurrito/tackledplayer.png')")
		this.down = true
	},

	grow: function(){
		this.height += 1
		this.width += 1
	},

	destroy: function(){
		this.$player.remove();
	}

}
