function Burrito (gameboard){
	this.$gameboard = gameboard
	this.height = 46
	this.width = 60
	this.x = Math.floor(Math.random() * this.$gameboard.width())
	this.y = Math.floor(Math.random() * this.$gameboard.height())
	this.initDisplay();
}

Burrito.prototype = {

	updateDisplay: function(){
		this.$burrito.css('top', this.y - this.height/2);
		this.$burrito.css('left', this.x - this.width/2);
	},

	initDisplay: function(){
		this.$burrito = $("<div class='burrito'</div>")
		$('#field').append(this.$burrito)

		this.updateDisplay();
	},

	destroy: function(){
		this.$burrito.remove();
		this.eaten = true
	}

}

