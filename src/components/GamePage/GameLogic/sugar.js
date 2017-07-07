import store from '../../../store/store'

let state = store.getState()
let gameState = state.gameReducer

// get inputs from inputsObj on nutritionReducer from store
let { enemySpeed } = state.nutritionReducer.inputsObj;

store.subscribe(function() {
    gameState = store.getState().gameReducer
})

function generateVertices(num, radius) {
    let vertices = []
    let circle = Math.PI * 2
    let angle = Math.PI

    for (let i = 0; i < num; i++) {
        angle += Math.PI / (num / 2)
        vertices[i] = {
            x: Math.cos(angle) * (Math.random() * (radius * 0.2) + (radius - radius*0.2)),
            y: Math.sin(angle) * (Math.random() * (radius * 0.2) + (radius - radius*0.2))
        }
    } 
    return vertices
}

export default class Sugar {
    constructor() {
        this.context = gameState.context
        this.isAlive = false
        this.x = Math.random() * this.context.canvas.width
        this.y = Math.random() * this.context.canvas.height
        this.dx = (Math.random() * 2 - 1) * enemySpeed
        this.dy = (Math.random() * 2 - 1) * enemySpeed
        this.width = Math.random() * 10 + 20
        this.height = this.width
        this.imgCenterX = this.width / 2
        this.imgCenterY = this.width / 2
        this.rotation = 0
        this.rotationSpeed = Math.random() - 0.5
        this.score = (80 / this.radius)*5
        this.vertices = generateVertices(24, this.width)

        this.draw = this.draw.bind(this)
        this.update = this.update.bind(this) 


    //         let tau = Math.PI*2;
    //         let increment = tau / granularity;
    //         let radius;
    //         let x;
    //         let y;
    //         let points = [];
    //         let offset = maxRadius;
            
    //         for (let ang = 0; ang < tau; ang += increment) {
    //         radius = this.getRandom(minRadius, maxRadius);
    //         x = offset + Math.sin(ang) * radius;
    //         y = offset + Math.cos(ang) * radius;
            

    //   points.push({x, y});
    // }

    }

    update() {
        this.x += this.dx
        this.y += this.dy

        // keeps sugar on screen
        if (this.x > this.context.canvas.width + this.width && this.dx > 0) {
            this.x = 0 - this.width
        } else if (this.x < 0 - this.width && this.dx < 0) {
            this.x = this.context.canvas.width + this.width
        } else if (this.y > this.context.canvas.height + this.height && this.dy > 0) {
            this.y = 0 - this.height
        } else if (this.y < 0 - this.height && this.dy < 0) {
            this.y = this.context.canvas.height + this.height
        } 

        this.rotation += this.rotationSpeed
        if (this.rotation > 360) {
            this.rotation -= 360
        }
        if (this.rotation < 0) {
            this.rotation += 360
        }
    }

    draw() {
        this.context.save()
        this.context.translate(this.x + this.imgCenterX, this.y + this.imgCenterY)
        this.context.rotate(this.rotation * Math.PI / 180)
        this.context.strokeStyle = '#FFF'
        this.context.fillStyle = 'rgba(220,220,220,0.5)'
        this.context.lineWidth = 2
        this.context.moveTo(0, -this.radius)
        this.context.beginPath()

        for (let i = 1; i < this.vertices.length -1; i++) {
            this.context.lineTo(this.vertices[i].x, this.vertices[i].y)
        }

        this.context.closePath()
        this.context.stroke()
        this.context.fill()
        this.context.restore()
    }




}

//     delete() {
//         // Break into smaller asteroids
//         if(this.radius > 10){
//             for (let i = 0 i < 2 i++) {
//                 let sugar = new Sugar({

//                 radius: this.radius/2,
//                 position: {
//                     x: randomNumBetween(-10, 20)+this.position.x,
//                     y: randomNumBetween(-10, 20)+this.position.y
//                 },
//                 create: this.create.bind(this),
//                 addScore: this.addScore.bind(this)
//                 })
//                 this.create(asteroid, 'asteroids')
//             }
//         }
//     }

//     destroy(){

//         this.delete = true

//         // Explode
//         for (let i = 0 i < this.radius i++) {
//             const particle = new Particle({
//                 lifeSpan: randomNumBetween(60, 100),
//                 size: randomNumBetween(1, 3),
//                 position: {
//                 x: this.position.x + randomNumBetween(-this.radius/4, this.radius/4),
//                 y: this.position.y + randomNumBetween(-this.radius/4, this.radius/4)
//                 },
//                 velocity: {
//                 x: randomNumBetween(-1.5, 1.5),
//                 y: randomNumBetween(-1.5, 1.5)
//                 }
//             })
//         this.create(particle, 'particles')
//         }

//         // Break into smaller asteroids
//         if(this.radius > 10){
//             for (let i = 0 i < 2 i++) {
//                 let asteroid = new Asteroid({

//                 size: this.radius/2,
//                 position: {
//                     x: randomNumBetween(-10, 20)+this.position.x,
//                     y: randomNumBetween(-10, 20)+this.position.y
//                 },
//                 create: this.create.bind(this),
//                 addScore: this.addScore.bind(this)
//                 })
//                 this.create(asteroid, 'asteroids')
//             }
//         }
//     }

 