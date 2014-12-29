function Orb(gameboard, player) {
	this.$gameboard = gameboard;
	this.x = player.x;
	this.y = player.y;
	this.height = 10;
	this.width = 10;
	this.movement = 6;
	this.dir = player.dir;
	this.initDisplay();
};

Orb.prototype = {

	updateDisplay: function(){
		this.$shot.css('top', this.y - this.height/2);
		this.$shot.css('left', this.x - this.width/2);
	},

	initDisplay: function(){
		this.$shot = $("<div class='orb'></div>")
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
		}

		if (!this.inbounds()) {
			this.$shot.css('display', 'none')
		}

		this.updateDisplay();
	},

	// track: function(enemy){

	// 	xdiff = enemy.x - this.x
	// 	ydiff = enemy.y - this.y

	// 	if (Math.abs(xdiff) > Math.abs(ydiff)){
	// 		if (xdiff > 0){
	// 			this.dir = 'right'
	// 		} else {
	// 			this.dir = 'left'
	// 		};
	// 	} else {
	// 		if (ydiff > 0){
	// 			this.dir = 'down'
	// 		} else {
	// 			this.dir = 'up'
	// 		};
	// 	};
	// },

	inbounds: function(){ 
		return this.x > this.width && 
		this.x < this.$gameboard.width() + this.width/2&& 
		this.y > this.height && 
		this.y < this.$gameboard.height()+ this.height/2
	}

};