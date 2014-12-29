function Asteroid(gameboard) {
	this.$gameboard = gameboard;
	this.x = Math.floor(Math.random() * this.$gameboard.width() + 1);
	this.y = Math.floor(Math.random() * this.$gameboard.height() + 1);
	this.height = 25;
	this.width = 25;
	this.initDisplay();
};

Asteroid.prototype = {

	updateDisplay: function(){
		this.$meteor.css('top', this.y - this.height/2);
		this.$meteor.css('left', this.x - this.width/2);
	},

	initDisplay: function(){
		this.$meteor = $("<div class='asteroid'></div>")
		$('#gameboard').append(this.$meteor);
		this.updateDisplay()
	},

	move: function(){

		xmove = Math.floor((Math.random() * 10) + 1);
		ymove = Math.floor((Math.random() * 10) + 1);
		if (this.x < this.$gameboard.width()/2){
			this.x += xmove
		} else {
			this.x -= xmove
		};
		if (this.y < this.$gameboard.height()/2){
			this.y -= ymove
		} else {
			this.y += ymove
		}

		if (!this.inbounds()) {
			this.$meteor.css('display', 'none')
			this.$meteor.remove()
			this.outOfBounds = true
		}

		this.updateDisplay();
	},

	inbounds: function(){ 
		return this.x > this.width && 
		this.x < this.$gameboard.width() + this.width/2 && 
		this.y > this.height && 
		this.y < this.$gameboard.height()+ this.height/2
	}
}