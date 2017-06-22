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
    player.dy *= friction
}


// keeps object in canvas
function keepOnScreen(obj) {
  let belowTop = obj.y >= 0 ? true : false
  let aboveBottom = obj.y <= window.innerHeight - obj.height ? true : false
  let inLeft = obj.x >= 0 ? true : false
  let inRight = obj.x <= window.innerWidth - obj.width ? true : false;

  if (!belowTop || !aboveBottom) {
    obj.dy = -obj.dy
  } else if (!inLeft || !inRight) {
    obj.dx = -obj.dx
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
  maxDx: 2,
  maxDy: 2,
  orientation: 0,
  turnSpeed:  6,
  move: function(ctx) {
    movePlayer(this)
  },
  draw: function(ctx) {
    ctx.beginPath()
    ctx.clearRect(this.x-2, this.y-2, this.width*2, this.height*2)
    this.move(ctx, window.innerWidth, window.innerHeight)
    ctx.drawImage(this.img,this.x, this.y)
    ctx.fill()
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
