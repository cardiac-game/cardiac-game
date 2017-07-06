
// need an onload function for each resource.
// return number of loaded to total number

export const images = new function() {

  // static images
  this.ship = new Image()
  this.bg = new Image()
  this.cancerousbg = new Image()
  this.bullet = new Image()
  this.enemy = new Image()


  this.ship.src = require('../images/ship.png')
  this.bg.src = require('../images/bg.png')
  this.cancerousbg.src = require('../images/cancerous.png')
  this.bullet.src = require('../images/bullet.png')
  this.enemy.src = require('../images/enemy.png')


  // sprites
  this.virus = new Image()
  this.bacteria = new Image()
  this.heart = new Image()


  this.virus.src = require('../images/virus.png')
  this.bacteria.src = require('../images/bacteria.png')
  this.heart.src = require('../images/heart2.png')

  // set number of frames for each sprite
  this.virus.frames = 20
  this.bacteria.frames = 20
  this.heart.frames = 10
}


export const audio = new function() {

}
