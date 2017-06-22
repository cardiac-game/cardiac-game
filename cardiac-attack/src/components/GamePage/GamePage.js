import React, { Component } from 'react'

let friction = 0.98

// object to relate keycodes to keyname
const KeyCodes = {
    32: 'space',
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down',
}

// generate object to store status of each key
// initialize status of all pressed keys to false
const KeyStatus = {}

for (let code in KeyCodes) {
    KeyStatus[KeyCodes[code]] = false
}

// listener to change key status to true when key is pressed
document.onkeydown = (e) => {
    let currCode = (e.keyCode) ? e.keyCode : e.charCode
    if (KeyCodes[currCode]) {
        KeyStatus[KeyCodes[currCode]] = true;
    }
}

// listener to change key status to false when key is release
document.onkeyup = (e) => {
    e.preventDefault()
    let currCode = (e.keyCode) ? e.keyCode : e.charCode
    if (KeyCodes[currCode]) {
        KeyStatus[KeyCodes[currCode]] = false;
    }
}



// image repo
const images = new function() {
  this.ship = new Image()

// need to require images in React
  this.ship.src = require('./images/ship.png')
}







// convert keyboard input to player movement
function movePlayer (player) {

  if (KeyStatus.up) {
      player.x += player.speed * Math.cos(player.orientation * Math.PI / 180)
      player.y += player.speed * Math.sin(player.orientation * Math.PI / 180)
   } else if (KeyStatus.down) {
      player.x -= player.speed/2 * Math.cos(player.orientation * Math.PI / 180)
      player.y -= player.speed/2 * Math.sin(player.orientation * Math.PI / 180)
   }
   if (KeyStatus.right) {
      player.orientation += player.turnSpeed;
   } else if (KeyStatus.left) {
      player.orientation -= player.turnSpeed;
   }




   // bounds checking
   if (player.x >= window.innerWidth - player.width) {
       player.x = window.innerWidth - player.width;
   } else if (player.x <= 0) {
       player.x = 0
   }

   if (player.y > window.innerHeight - player.height) {
       player.y = window.innerHeight - player.height;
   } else if (player.y <= 0) {
       player.y = 0
   }
}


// player object
let player = {
  x: window.innerWidth/2,
  y: window.innerHeight/2,
  img: images.ship,
  width: images.ship.width,
  height: images.ship.height,
  dx: 0,
  dy: 0,
  speed: 6,
  orientation: 0,
  turnSpeed:  6,
  move: function(ctx) {
    movePlayer(this)
  },
  draw: function(ctx) {

    let xView = this.x + this.width / 2;
    let yView = this.y + this.height / 2;

    ctx.save();
    ctx.fillStyle = 'white'
    ctx.fillRect(this.x-10,this.y-10,this.width+10,this.height+10)

    this.move(ctx, window.innerWidth, window.innerHeight)
    /// make sure pivot is moved to center
    ctx.translate(xView, yView);

    /// rotate, you should make new sprite where direction
    /// points to the right. I'm add 90 here to compensate
    ctx.rotate((this.orientation + 90) * Math.PI / 180);
    /// translate back before drawing the sprite
    ctx.translate(-xView, -yView);
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    ctx.restore();


  }
}




//========================== React Component ================================

export default class GamePage extends Component {

  componentDidMount() {

    let canvas = this.refs.canvas

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    canvas.style.background = 'black'

    let ctx = canvas.getContext('2d')

    player.draw(ctx)

    function animate() {
      player.draw(ctx)
      requestAnimationFrame(animate)
    }
    animate()
  }



  render() {

    return (
      <section className='GamePage'>
        <canvas ref="canvas" />
      </section>
    )
  }
}
