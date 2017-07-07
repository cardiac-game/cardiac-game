import store from '../../../store/store'
import { images } from './mediaRepos'

// get initial state from store
let state = store.getState()
let gameState = state.gameReducer
let enemiesState = state.enemiesReducer
let bacteriaInitialState = enemiesState.bacteria

// subscribe to changes in redux state
store.subscribe(function() {
    state = store.getState()
     gameState = state.gameReducer
     enemiesState = state.enemiesReducer
   bacteriaInitialState = enemiesState.bacteria
  })

// function to return random boolean
function thisOrThat() {
  return Math.round(Math.random()) !== 0
}

// picks a random spawn point offscreen around the edge of the canvas
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
  // initialize enemy 
  // randmized variables should be generated here
  // pre-determined values should come from state
  constructor() {
    // generate random spawn coordinates
    let spawnCoords = randomSpawn(gameState.context.canvas)
    // used to keep track of enemy status in enemy pool
    this.isAlive = false
    // drawing canvas context
    this.context = gameState.context
    // set spawn coordinates
    this.x = spawnCoords.x
    this.y = spawnCoords.y
    // set enemy image/sprite
    this.sprite = images.bacteria

    this.speed = 1
    this.orientation = Math.random() * Math.PI
    this.turnSpeed = 1
    this.counter = 0

   	this.maxHealth = 3
    this.health = this.maxHealth
    this.contrast = 100


    // used to determine where enemy should move to
    this.targetX = this.context.canvas.width / 2,
    this.targetY = this.context.canvas.height / 2,
    // increase numbers to scale randomness of path to heart (lower numbers make enemy more difficult)
    this.targetWidth = 40 * 5
    this.targetHeight = 40 * 5

    // sprite animation variables
    this.currentFrame = 0
    this.frameWidth = this.sprite.width / this.sprite.frames
	  this.width = this.frameWidth
    this.height = this.sprite.height
    this.frameSpeed = 5
    this.frameCount = 0
    this.imgCenterX = this.frameWidth / 2
    this.imgCenterY = this.sprite.height / 2


    // bind function context to enemy object
  	this.healthDown = this.healthDown.bind(this)
    this.update = this.update.bind(this)
    this.draw = this.draw.bind(this)
  }

  // decrease health by one
  healthDown() {
	  this.health--
    // kills enemy so it can be removed from the active enemy pool
	  if (this.health < 1) {
		  this.isAlive = false
		  this.health = this.maxHealth
	    }
    // set contrast based on health
    this.contrast = 100 - ~~(100 * (this.maxHealth - this.health) / this.maxHealth)
    }


  // update enemy on each frame
  update() {
	this.frameCount++

	// regulates sprite animation speed
  ///////////////////////////////////
	if (this.frameCount >= this.frameSpeed) {
		this.currentFrame++
		if (this.currentFrame >= this.sprite.frames) {
			this.currentFrame = 0
		}
		this.frameCount = 0
	}	

    // orients and moves enemy 
    //////////////////////////
    this.counter++ 
    // every 30 frames, enemy will pick a new target to move to
    // target is chosen at random but is always center on the heart to ensure
    // each enemy will eventually get to the heart
    // this helps make the enemy movement feel more natural and lifelike
    if ( this.counter > 30) {
      this.turnSpeed = Math.random() + 0.5
      this.targetX = this.context.canvas.width / 2 + (Math.random() * this.targetWidth - this.targetWidth/2)
      this.targetY = this.context.canvas.height / 2 + (Math.random() * this.targetHeight - this.targetHeight/2)
      this.counter = 0
    }    

    let x1 = this.x + this.imgCenterX
    let y1 = this.y + this.imgCenterY  
     // determine the angle between enemy orientation and direction to target
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
      // saves canvas position
      this.context.save()
      // changes contrast based on enemy health
	    this.context.filter = "contrast(" + this.contrast + "%)"
      // canvas is translated and rotated to object position before image is drawn
      this.context.translate(this.x + this.imgCenterX, this.y + this.imgCenterY)
      this.context.rotate(this.orientation)
      // draws image
      this.context.drawImage(this.sprite,(this.frameWidth*this.currentFrame),0,this.frameWidth,this.sprite.height,-this.imgCenterX,-this.imgCenterY,this.frameWidth,this.sprite.height)
      // resets canvas position to last save point
      this.context.restore()
  }
}
