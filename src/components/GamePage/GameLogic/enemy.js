import $ from './reusable'

import store from '../../../store/store'


let enemiesState = store.getState().enemiesReducer

// update state anytime it is changed
store.subscribe(function() {
    enemiesState = store.getState().enemiesReducer
})

function thisOrThat() {
  return Math.round(Math.random()) !== 0
}


function randomSpawn(obj) {
  let split1 = thisOrThat()
  let split2 = thisOrThat()
  
  if (split1 && split2) {
    return {
      x: Math.random() * obj.width,
      y: -100
    }
  } else if (split1 && !split2) {
    return {
      x: Math.random() * obj.width,
      y: obj.width + 100
    }
  } else if (!split1 && split2) {
    return {
      x: -100,
      y: Math.random() * obj.height
    }
  } else if (!split1 && !split2) {
    return {
      x: obj.height + 100,
      y: Math.random() * obj.height
    }
  } 
}


export default class Enemy {
  constructor(context, img) {
    let spawnCoords = randomSpawn(context.canvas)
    this.isAlive = true
    this.context = context
    this.x = spawnCoords.x,
    this.y = spawnCoords.y,
    this.img = img,
    this.width = img.width,
    this.height = img.height,
    this.imgCenterX = img.width / 2,
    this.imgCenterY = img.height / 2,
    this.dx = 1,
    this.dy = 1,
    this.speed = 2,
    this.orientation = Math.random() * Math.PI,
    this.turnSpeed = 1,
    this.lastShot = Date.now(),
    this.fireRate = 0,
    this.isFiring = 0,
    this.counter = 0,
    this.targetX = context.canvas.width / 2,
    this.targetY = context.canvas.height / 2,
    this.targetWidth = 40 * 60 // scale to difficulty
    this.targetHeight = 40 * 60 // scale to difficulty

    this.update = this.update.bind(this)
    this.draw = this.draw.bind(this)
  }

  update() {
    this.counter++ 
    this.turnSpeed = Math.random() * 5 + 1
    if ( this.counter > 30) {
      this.targetX = this.context.canvas.width / 2 + (Math.random() * this.targetWidth - this.targetWidth/2)
      this.targetY = this.context.canvas.height / 2 + (Math.random() * this.targetHeight - this.targetHeight/2)
      this.counter = 0
    }    
    var x1 = this.x + this.imgCenterX
    var y1 = this.y + this.imgCenterY  
    var angle = Math.atan2(this.targetY - y1, this.targetX - x1)  
    var theta = 0
     
      if (this.orientation !== angle) {        
        var turnSpeed  = this.turnSpeed * Math.PI / 180
        var delta = angle - this.orientation       
        if (delta >  Math.PI) delta -= Math.PI * 2
        if (delta < -Math.PI) delta += Math.PI * 2       
        theta = delta > 0 ? turnSpeed : -turnSpeed        
        this.orientation += theta
        if (Math.abs(delta) < turnSpeed) {
          this.orientation = angle
        }
      }
      this.x += Math.cos(this.orientation) * this.speed
      this.y += Math.sin(this.orientation) * this.speed
    }

    draw() {
      this.context.save()
      this.context.translate(this.x + this.imgCenterX, this.y + this.imgCenterY)
      this.context.rotate(this.orientation + Math.PI/2)
      this.context.drawImage(this.img, -this.imgCenterX, -this.imgCenterY, this.width, this.height)
      this.context.restore()
  }
}
