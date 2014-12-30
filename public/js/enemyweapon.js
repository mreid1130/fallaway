function EnemyOrb(gameboard, enemy) {
	this.$gameboard = gameboard;
	this.x = enemy.x;
	this.y = enemy.y;
	this.height = 10;
	this.width = 10;
	this.movement = 6;
	this.dir = enemy.dir;
	this.initDisplay();
}

EnemyOrb.prototype = {

	updateDisplay: function(){
		this.$shot.css('top', this.y - this.height/2);
		this.$shot.css('left', this.x - this.width/2);
	},

	initDisplay: function(){
		this.$shot = $("<div class='enemyorb'></div>")
		$('#gameboard').append(this.$shot);

		this.updateDisplay()
	},

	move: function(){

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
			case 'none':
				this.x += this.movement;
				break;
		}

		if (!this.inbounds()) {
			this.$shot.css('display', 'none')
			this.$shot.remove()
			this.outOfBounds = true
		}

		this.updateDisplay();
	},

	inbounds: function(){ 
		return this.x > this.width && 
		this.x < this.$gameboard.width() + this.width/2&& 
		this.y > this.height && 
		this.y < this.$gameboard.height()+ this.height/2
	},

	destroy: function(){
		this.$shot.remove()
	}

};
