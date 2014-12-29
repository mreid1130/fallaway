function badGuy(gameboard) {
	this.$gameboard = gameboard;
	this.x = this.$gameboard.width();
	this.y = this.$gameboard.height() / 2;
	this.height = 40;
	this.width = 40;
	this.movement = 2;
	this.dir = "none";
	this.initDisplay();
}

badGuy.prototype = {

	updateDisplay: function(){
		this.$enemy.css('top', this.y - this.height/2);
		this.$enemy.css('left', this.x - this.width/2);
	},

	initDisplay: function(){
		this.$enemy = $("<div class='badguy'></div>")
		$('#gameboard').append(this.$enemy);

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
			this.$enemy.css('display', 'none')
		} else {
			this.$enemy.css('display', 'inline')
		}

		this.updateDisplay();
	},

	track: function(faller){

		xdiff = faller.x - this.x
		ydiff = faller.y - this.y

		if (Math.abs(xdiff) > Math.abs(ydiff)){
			if (xdiff > 0){
				this.dir = 'right'
			} else {
				this.dir = 'left'
			};
		} else {
			if (ydiff > 0){
				this.dir = 'down'
			} else {
				this.dir = 'up'
			};
		};
	},

	inbounds: function(){ 
		return this.x > this.width/2 && this.x < this.$gameboard.width() && this.y > this.height/2 && this.y < this.$gameboard.height()
	},

	hit: function(shot){

		return (this.x < shot.x + shot.width &&
		   this.x + this.width > shot.x &&
		   this.y < shot.y + shot.height &&
		   this.height + this.y > shot.y);

		// xdiff = this.x - shot.x 
		// ydiff = this.y - shot.y 

		// if (Math.abs(xdiff) <= this.width/2 && Math.abs(ydiff) <= this.height/2){
		// 	return true
		// } else {
		// 	return false
		// }
	},

	explode: function(){
		enemy = this.$enemy
		this.$enemy.css('background-image', 'url("http://th01.deviantart.net/fs71/200H/f/2012/146/7/b/fire_ball_2_png_by_dbszabo1-d515uz4.png")')
		setTimeout(function(){ 
			enemy.remove();
			this.dead = true 
		}, 250)
	}

};