export default function Player() {
  this.init = function(x,y,dx,dy) {
    console.log('player init');
    this.x = x,
    this.y = y,
    this.dx = dx,
    this.dy = dy,
    this.maxSpeed = 5,
    this.width = 25,
    this.height = 25
  }

  this.draw = function() {
    console.log('player draw');
    ctx.rect(this.x,this.y,this.width,this.height)
    this.move()
  }

  this.move = function() {

    console.log('player.move');

    if (KeyStatus .left || KeyStatus .right ||
				KeyStatus .down || KeyStatus .up) {
			// The ship moved, so erase it's current image so it can
			// be redrawn in it's new location
			this.context.clearRect(this.x, this.y, this.width, this.height);

			// Update x and y according to the direction to move and
			// redraw the ship. Change the else if's to if statements
			// to have diagonal movement.
			if (KeyStatus .left) {
				this.x -= this.speed
				if (this.x <= 0) // Keep player within the screen
					this.x = 0;
			} if (KeyStatus .right) {
				this.x += this.speed
				if (this.x >= this.canvasWidth - this.width)
					this.x = this.canvasWidth - this.width;
			} if (KeyStatus .up) {
				this.y -= this.speed
				if (this.y <= this.canvasHeight/4*3)
					this.y = this.canvasHeight/4*3;
			} if (KeyStatus .down) {
				this.y += this.speed
				if (this.y >= this.canvasHeight - this.height)
					this.y = this.canvasHeight - this.height;
			}
		}

  }
}





// move function with acceleration/deceleration smoothing
function movePlayer (player) {

  if (KeyStatus.up) {
       if (player.dy > -player.maxDy) {
           player.dy--;
       }
   }

   if (KeyStatus.down) {
       if (player.dy < player.maxDy) {
           player.dy++;
       }
   }
   if (KeyStatus.right) {
       if (player.dx < player.maxDx) {
           player.dx++;
       }
   }
   if (KeyStatus.left) {
       if (player.dx > -player.maxDx) {
           player.dx--;
       }
   }

   // apply some friction to y velocity.
   player.dy *= friction;
   player.y += player.dy;

   // apply some friction to x velocity.
   player.dx *= friction;
   player.x += player.dx;

   // bounds checking
   if (player.x >= window.innerwidth + player.width) {
       player.x = window.innerwidth;
   } else if (player.x <= 0) {
       player.x = 0
   }

   if (player.y > window.innerHeight + player.height) {
       player.y = window.innerHeight;
   } else if (player.y <= 0) {
       player.y = 0
   }

    player.dx *= friction



}
