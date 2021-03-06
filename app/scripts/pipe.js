window.Pipe = (function() {
	'use strict';

  // All these constants are in em's, multiply by 10 pixels
  // for 1024x576px canvas.
	// Pipe hight is 35 and gap between is 15
  var SPEED = 30; // * 10 pixels per second
  var WIDTH = 12.2;
  var HEIGHT = 100.6;

  var Pipe = function(el, game) {
  	this.el = el;
  	this.game = game;
  	this.pos = {x: 0, y: 0};
  }

  Pipe.prototype.reset = function() {
		this.game.score++;
  	this.pos.x = 102.4;
  	this.pos.y = -(Math.floor(Math.random() * (15) + 15));

		// calculates the coordinates of the random gap from the y coordinates
		this.gap_begin = 43 + this.pos.y;
		this.gap_end = 36 + this.pos.y + 15;
  };

  Pipe.prototype.onFrame = function(delta) {
		this.pos.x -= delta * SPEED;
		var goneTrough = false;

		//when pipe goes off screen a new one is made
		if(this.pos.x <= -WIDTH)
		{
			this.reset();
		}

		this.checkPlayerCrash();

  	this.el.css('transform', 'translateZ(0) translate(' + this.pos.x + 'em, ' + this.pos.y + 'em)');
  };

	// checks if the player crashed into the pipes
	Pipe.prototype.checkPlayerCrash = function() {
		if(this.game.player.pos.y <= this.gap_begin
		|| this.game.player.pos.y >= this.gap_end) {
				if(this.pos.x <= this.game.player.pos.x + 6.1
				&& this.pos.x >= this.game.player.pos.x - 6.1) {
					return this.game.gameover();
				}
			}
	}

  return Pipe;

})();
