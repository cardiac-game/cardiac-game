
// need an onload function for each resource.
// return number of loaded to total number

export const images = new function() {
  this.ship = new Image()
  this.bg = new Image()
  this.bullet = new Image()
  this.enemy = new Image()

  // sprites
  this.virus = new Image()
  this.bacteria = new Image()
  this.heart = new Image()

  this.heartgif = new Image()

  // need to require images in React
  this.ship.src = require('../images/ship.png')
  this.bg.src = require('../images/bg.png')
  this.bullet.src = require('../images/bullet.png')
  this.enemy.src = require('../images/enemy.png')

  // sprites
  this.virus.src = require('../images/virus.png')
  this.bacteria.src = require('../images/bacteria.png')
  this.heart.src = require('../images/heart2.png')

  this.heartgif.src = require('../images/hearty.gif')

  // set number of frames for each sprite
  this.virus.frames = 20
  this.bacteria.frames = 20
  this.heart.frames = 10
}


export const audio = new function() {

}
