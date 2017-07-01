import store from '../../../store/store'


let enemiesState = store.getState().enemiesReducer
let bacteriaInitialState = enemiesState.bacteria

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
    };
  } else if (!split1 && !split2) {
    return {
      x: obj.height + 100,
      y: Math.random() * obj.height
    }
  } 
}


export default class Bacteria {
  constructor(context, sprite) {
    let spawnCoords = randomSpawn(context.canvas)
    this.isAlive = false
    this.context = context
    this.x = spawnCoords.x
    this.y = spawnCoords.y
    this.sprite = sprite
    this.speed = 1
    this.orientation = Math.random() * Math.PI
    this.turnSpeed = 1
    this.lastShot = Date.now()
    this.fireRate = 0
    this.isFiring = 0
    this.counter = 0

   	this.maxHealth = 3
    this.health = this.maxHealth
    this.contrast = 100



    this.targetX = context.canvas.width / 2,
    this.targetY = context.canvas.height / 2,
    this.targetWidth = 40 * 20 // scale to difficulty
    this.targetHeight = 40 * 20 // scale to difficulty

    this.currentFrame = 0
    this.frameWidth = this.sprite.width / this.sprite.frames
	this.width = this.frameWidth
    this.height = this.sprite.height
    this.frameSpeed = 5
    this.frameCount = 0
    this.imgCenterX = this.frameWidth / 2
    this.imgCenterY = this.sprite.height / 2

	this.healthDown = this.healthDown.bind(this)
    this.update = this.update.bind(this)
    this.draw = this.draw.bind(this)
  }


  healthDown() {
	  this.health--
	  if (this.health < 1) {
		  this.isAlive = false
		  this.health = this.maxHealth
	  }
	this.contrast = 100 - (100 * (this.maxHealth - this.health) / this.maxHealth)
  }

  update() {
	this.frameCount++

	// regulates frame speed
	if (this.frameCount >= this.frameSpeed) {
		this.currentFrame++
		if (this.currentFrame >= this.sprite.frames) {
			this.currentFrame = 0
		}
		this.frameCount = 0
	}	

    this.counter++ 
    this.turnSpeed = Math.random() + 0.5
    if ( this.counter > 30) {
      this.targetX = this.context.canvas.width / 2 + (Math.random() * this.targetWidth - this.targetWidth/2)
      this.targetY = this.context.canvas.height / 2 + (Math.random() * this.targetHeight - this.targetHeight/2)
      this.counter = 0
    }    
    let x1 = this.x + this.imgCenterX
    let y1 = this.y + this.imgCenterY  
    let angle = Math.atan2(this.targetY - y1, this.targetX - x1)  
    let theta = 0
     
      if (this.orientation !== angle) {        
        let turnSpeed  = this.turnSpeed * Math.PI / 180
        let delta = angle - this.orientation       
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
	  this.context.filter = "contrast(" + this.contrast + "%)"
      this.context.translate(this.x + this.imgCenterX, this.y + this.imgCenterY)
      this.context.rotate(this.orientation)
      this.context.drawImage(this.sprite,(this.frameWidth*this.currentFrame),0,this.frameWidth,this.sprite.height,-this.imgCenterX,-this.imgCenterY,this.frameWidth,this.sprite.height)
      this.context.restore()
  }
}
