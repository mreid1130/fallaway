function Faller() {
	this.x = 300;
	this.y = 300;
	this.initDisplay();
}

Faller.prototype = {
	updateDisplay: function(xcoord, ycoord){
		console.log(this.x);
		console.log(this.y);
	},

	initDisplay: function(){
		this.$faller = $("<div class='faller'></div>")
		$('#gameboard').append(this.$faller);
		this.$faller.css('position', 'relative');
		this.$faller.css('top', this.y);
		this.$faller.css('left', this.x);
		this.$faller.css('height', 40);
		this.$faller.css('width', 40);
		this.$faller.css('background-image', 'url("http://1.bp.blogspot.com/-MQE-zK1mVSE/UdSVGV3GP3I/AAAAAAAAAu8/EOsv__HnS-M/s512/spacestation.png")');
		this.$faller.css('background-size', '40px 40px');
		this.$faller.css('background-repeat', 'no-repeat');
	}

}

Game = {
	loop: function() {
		console.log("Game Starting")
	}
}

$(document).ready(function() {
	f = new Faller();
});