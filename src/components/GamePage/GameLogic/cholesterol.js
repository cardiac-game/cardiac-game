import store from '../../../store/store'

// get inputs from inputsObj on nutritionReducer from store
let enemySpeed = store.getState().nutritionReducer.enemySpeed;


// get initial state from store
let state = store.getState()
let gameState = state.gameReducer

// subscribe to changes in redux state
store.subscribe(function() {
    gameState = store.getState().gameReducer
})

function Circle(rSmall, rLarge, boundX, boundY) {
  this.x = Math.random() * boundX
  this.y = Math.random() * boundY
  this.radius = Math.random() * (rLarge - rSmall) + rSmall
}


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


export default class Cholesterol {
    constructor() {

        let spawnCoords = randomSpawn(gameState.context.canvas)


        this.context = gameState.context
        this.x = spawnCoords.x
        this.y = spawnCoords.y
        this.width = 30
        this.height = 5
        this.imgCenterX = this.width / 2
        this.imgCenterY = this.height / 2
        this.rSmall = 10
        this.rLarge = 20
        this.numOfCircles = 5
        this.dxAll = 5
        this.dyAll = 5
        this.dx = 0.25 * enemySpeed
        this.dy = 0.25 * enemySpeed
        this.shakeSpeed = 1
        this.circles = []

        this.speed = 1
        this.orientation = Math.random() * Math.PI
        this.turnSpeed = 1
        this.counter = 0

        // used to determine where enemy should move to
        this.targetX = this.context.canvas.width / 2,
        this.targetY = this.context.canvas.height / 2,
        // increase numbers to scale randomness of path to heart (lower numbers make enemy more difficult)
        this.targetWidth = 40 * 20
        this.targetHeight = 40 * 20
    }

  
  init(numOfCircles) {
    this.numOfCircles = numOfCircles
    for (let i = 0; i < this.numOfCircles; i++) {
      let circle = new Circle(this.rSmall, this.rLarge, this.width, this.height)
      this.circles.push(circle)
    }
  }
  
  update = function() {
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

   

    // inner circles movement & bounds checking
    for (let i =0; i < this.circles.length; i++) {      
      this.circles[i].x += Math.random() * this.dx
      this.circles[i].y += Math.random() * this.dy
      if (this.circles[i].x > 100 || this.circles[i].x < 0) {
        this.dx *= -1
      }
      if (this.circles[i].y > 40 || this.circles[i].y < 0) {
        this.dy *= -1
      }
    }
  }
  
  draw() {
    this.context.save()
    this.context.translate(this.x + this.imgCenterX,this.y + this.imgCenterY)
    this.context.rotate(this.orientation)
    this.context.beginPath()
    this.context.fillStyle = 'rgb(186,218,85)'
    this.context.arc(this.imgCenterX,this.imgCenterY, this.height/2,0,Math.PI*2,false)
    this.context.fill()
    for (let i = 0; i < this.circles.length; i++) {
      let circleCenterX = this.circles[i].x
      let circleCenterY = this.circles[i].y 
      let radius = this.circles[i].radius   
      
      let gradient = this.context.createLinearGradient(circleCenterX, circleCenterY, circleCenterX + radius, circleCenterY + radius);
      gradient.addColorStop(0, 'rgb(186, 218, 85)')
      gradient.addColorStop(1, 'rgb(86, 78, 85)')
      
      this.context.beginPath()
      this.context.fillStyle = 'rgb(186, 218, 85)'
      this.context.strokeStyle = 'rgb()'
      this.context.arc(circleCenterX, circleCenterY, radius, 0, Math.PI * 2, false)
      this.context.fill()
    }
    this.context.restore()
  }
    
}

