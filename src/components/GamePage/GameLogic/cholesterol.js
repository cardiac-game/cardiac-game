import store from '../../../store/store'


// get initial state from store
let enemiesState = store.getState().enemiesReducer
let bacteriaInitialState = enemiesState.bacteria

// subscribe to changes in redux state
store.subscribe(function() {
    enemiesState = store.getState().enemiesReducer
})

function Circle(rSmall, rLarge, boundX, boundY) {
  this.x = Math.random() * boundX
  this.y = Math.random() * boundY
  this.radius = Math.random() * (rLarge - rSmall) + rSmall
}


export default class Cholesterol() {
    constructor(context) {
        this.context = context
        this.x = Math.random() * context.addColorStopcanvas.width
        this.y = Math.random() * context.addColorStopcanvas.height
        this.width = 200
        this.height = 60
        this.imgCenterX = this.width / 2
        this.imgCenterY = this.height / 2
        this.rSmall = 30
        this.rLarge = 45
        this.numOfCircles = 5
        this.dxAll = 5
        this.dyAll = 5
        this.dx = 1
        this.dy = 1
        this.shakeSpeed = 1
        this.circles = []
        this.rotation = 0
    }

  
  this.init = function(numOfCircles) {
    this.numOfCircles = numOfCircles
    for (let i = 0; i < this.numOfCircles; i++) {
      let circle = new Circle(this.rSmall, this.rLarge, this.width, this.height)
      this.circles.push(circle)
    }
  }
  
  this.update = function() {
    
    this.rotation++
    
    this.x += this.dxAll
    this.y += this.dyAll
    
    if (this.x < 0 || this.x > canvas.width - this.width) {
      this.dxAll *= -1
    }
    //  if (this.y < 0 || this.y > canvas.height - this.height) {
    //   this.dyAll *= -1
    // }
    
    for (let i =0; i < this.circles.length; i++) {
      this.dx = Math.random() * 4
      this.dy = Math.random() * 4
      
      
      this.circles[i].x += Math.random() * this.dx - this.dx / 2
      this.circles[i].y += Math.random() * this.dy - this.dy / 2
      if (this.circles[i].x > 100 || this.circles[i].x < 0) {
        this.dx *= -1
      }
      if (this.circles[i].y > 40 || this.circles[i].y < 0) {
        this.dy *= -1
      }
    }
  }
  
  this.draw = function() {
    ctx.save()
    ctx.clearRect(0,0,1200,1200)
    for (let i = 0; i < this.circles.length; i++) {
      let circleCenterX = this.x +  this.circles[i].x
      let circleCenterY = this.x  + this.circles[i].y
      let radius = this.circles[i].radius   
      
      let gradient = ctx.createRadialGradient(circleCenterX, circleCenterY, radius/2, circleCenterX, circleCenterY, radius);
      gradient.addColorStop(0, 'rgb(186, 218, 85');
      gradient.addColorStop(1, 'rgb(86, 118, 85');
      
      
      ctx.beginPath()
      ctx.fillStyle = gradient
      ctx.arc(circleCenterX, circleCenterY, radius, 0, Math.PI * 2, false)
      ctx.fill()
    }
  }
    
}

let chol = new Cholesterol()

chol.init(15)

function animate() {
  ctx.clearRect(0,0,1200,1200)
  // ctx.filter = ' contrast(150%)'
          ctx.translate(this.x + this.width/2, this.y + this.height/2)
    ctx.rotate(this.rotation * Math.PI / 180)
  chol.draw()
  chol.update()
  requestAnimationFrame(animate)
}