function Faller(gameboard) {
	this.$gameboard = gameboard;
	this.x = this.$gameboard.width() / 2;
	this.y = this.$gameboard.height() / 2;
	this.height = 40;
	this.width = 40;
	this.movement = 4;
	this.dir = "none";
	this.initDisplay();
}

Faller.prototype = {

	updateDisplay: function(){
		this.$player.css('top', this.y - this.height/2);
		this.$player.css('left', this.x - this.width/2);
	},

	initDisplay: function(){
		this.$player = $("<div class='faller'></div>")
		$('#gameboard').append(this.$player);

		this.updateDisplay()
	},

	move: function(){
		oldX = this.x
		oldY = this.y

		switch(this.dir) {
			case 'right':
				this.x += this.movement;
				break;
			case 'left':
				this.x -= this.movement;
				break;
			case 'up':
				this.y -= this.movement;
				break;
			case 'down':
				this.y += this.movement;
				break;
		}
		if (!this.inbounds()) {
			this.x = oldX;
			this.y = oldY;
		}
		this.updateDisplay()
	},

	inbounds: function(){ 
		return this.x > this.width/2 && this.x < this.$gameboard.width() - this.width/2 && this.y > this.height/2 && this.y < this.$gameboard.height() - this.height/2
	}

}
