
// need an onload function for each resource.
// return number of loaded to total number

const images = new function() {
  this.ship = new Image()
  this.bg = new Image()
  this.bullet = new Image()
  this.enemy = new Image()
  this.virus = new Image()

// need to require images in React
  this.ship.src = require('../images/ship.png')
  this.bg.src = require('../images/bg.png')
  this.bullet.src = require('../images/bullet.png')
  this.enemy.src = require('../images/enemy.png')
  this.virus.src = require('../images/virus.png')

  this.virus.frames = 20
}


let audio = new function() {

}


export default images
