import store from '../../../store/store'

// get inputs from inputsObj on nutritionReducer from store
let { enemySpeed } = store.getState().nutritionReducer.inputsObj;


// get initial state from store
let state = store.getState()
let gameState = state.gameReducer

// subscribe to changes in redux state
store.subscribe(function() {
    gameState = store.getState().gameReducer
})

function Circle(rSmall, rLarge, boundX, boundY) {
  this.x = Math.random() * boundX - boundX/2
  this.y = Math.random() * boundY - boundY/2
  this.radius = Math.random() * (rLarge - rSmall) + rSmall
}

function populateCircles(obj) {
  let arr = []
  for (let i = 0; i < obj.numOfCircles; i++) {
    let circle = new Circle(obj.rSmall, obj.rLarge, obj.width, obj.height)
    arr.push(circle)
  }
  return arr
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
        this.height = 10
        this.imgCenterX = this.width / 2
        this.imgCenterY = this.height / 2
        this.rSmall = 5
        this.rLarge = 15
        this.dxAll = 5
        this.dyAll = 5
        this.dx = 0.25 * enemySpeed
        this.dy = 0.25 * enemySpeed
        this.rotation = Math.random()
        this.rotationSpeed = Math.random() * 0.5 + 0.25
        this.numOfCircles = 24
        this.circles = populateCircles(this)

        this.isOnHeart = false
        this.isAlive = false

        this.speed = 0.5
        this.orientation = Math.random() * Math.PI
        this.turnSpeed = 0.25
        this.counter = 0

        // used to determine where enemy should move to
        this.targetX = this.context.canvas.width / 2,
        this.targetY = this.context.canvas.height / 2,
        // increase numbers to scale randomness of path to heart (lower numbers make enemy more difficult)
        this.targetWidth = 40 * 10
        this.targetHeight = 40 * 10
       
        this.moveToHeart = this.moveToHeart.bind(this)
        this.update = this.update.bind(this)
        this.draw = this.draw.bind(this)
    }


  moveToHeart() {
    this.rotation += this.rotationSpeed

      // homing behavior
      this.counter++ 
      if ( this.counter > 30) {
        this.turnSpeed = Math.random() + 0.5
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

  update() {
    if (!this.isOnHeart) {
      this.moveToHeart()
    } 

    // inner circles movement & inner circles bounds checking
    for (let i =0; i < this.circles.length; i++) {      
      this.circles[i].x += this.dx
      this.circles[i].y += this.dy

      if (this.circles[i].x > this.imgCenterX || this.circles[i].x < -this.imgCenterX) {
        this.dx = -this.dx
        if (this.circles[i].x > this.imgCenterX) {
          this.circles[i].x = this.imgCenterX
        } else if (this.circles[i].x < -this.imgCenterX) {
          this.circles[i].x = -this.imgCenterX
        }
      }

      if (this.circles[i].y > this.imgCenterY || this.circles[i].y < -this.imgCenterY) {
        this.dy = -this.dy
        if (this.circles[i].y > this.imgCenterY) {
          this.circles[i].y = this.imgCenterY
        } else if (this.circles[i].y < -this.imgCenterY) {
          this.circles[i].y = -this.imgCenterY
        }
      }
    }

  }
  
  draw() {
    this.context.save()
    this.context.translate(this.x + this.imgCenterX,this.y + this.imgCenterY)
    this.context.rotate(this.rotation*Math.PI / 180)
    for (let i = 0; i < this.circles.length; i++) {     
      this.context.beginPath()
      this.context.fillStyle = '#e8d8ab '
      this.context.arc(this.circles[i].x, this.circles[i].y, this.circles[i].radius, 0, Math.PI * 2, false)
      this.context.fill()
    }

    // this.context.beginPath()
    // this.context.strokeStyle = 'black'
    // this.context.rect(0,0,this.width,this.height)
    // this.context.stroke()
    
    this.context.restore()
  }


}

