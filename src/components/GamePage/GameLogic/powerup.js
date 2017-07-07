import store from '../../../store/store'

let state = store.getState()
let gameState = state.gameReducer

// get inputs from inputsObj on nutritionReducer from store
let { enemySpeed } = state.nutritionReducer.inputsObj;

store.subscribe(function() {
    gameState = store.getState().gameReducer
})

export default class Powerup {
    constructor(type) {
        this.type = type // type of powerup

        switch (this.type){
            case "MS":
            this.color = 'rgba(255,255,0,0.7)'
            break;
            case "FR":
            this.color = 'rgba(255,128,0,0.7)'
            break;
            case "FP":
            this.color = 'rgba(255,0,0,0.7)'
            break;
            case "HP":
            this.color = 'rgba(0,128,255,0.7)'
            break;       
            case "CB":
            this.color = 'rgba(0,0,204,0.7)'
            break;         
        }

        this.context = gameState.context
        this.isAlive = false
        this.direction = (Math.random() < 0.5) ? -1 : 1 // define the direction at which it floats across the screen 1 for left to right | -1 for right to left
        this.x = (this.direction > 0) ? 11 : (this.context.canvas.width - 11) // if 1 start at 0 to float L to R | if -1 start at width and go R to L
        this.y = Math.random() * this.context.canvas.height
        this.dx = (this.direction * 2 ) * enemySpeed
        this.dy = 0 //(this.direction) * enemySpeed for a diagonal float
        this.width = 20
        this.height = this.width
        this.imgCenterX = this.width / 2
        this.imgCenterY = this.width / 2

        this.draw = this.draw.bind(this)
        this.update = this.update.bind(this) 

    }

    checkInBounds() {
        let top = this.y <= 0 - this.height
        let bottom = this.y >= this.context.canvas.height
        let left = this.x <= 0 - this.height
        let right = this.x >= this.context.canvas.width
        return (top || bottom || left || right) ? true : false
    }

    update() {
        this.x += this.dx
        this.y += this.dy

        this.checkInBounds() ? this.isAlive = false : null
    }

    draw() {
        this.context.save()
        this.context.translate(this.x + this.imgCenterX, this.y + this.imgCenterY)

        this.context.fillStyle = this.color //'rgba(220,220,220,0.5)' // change the color?

        this.context.beginPath()
        this.context.arc(this.imgCenterX,this.imgCenterY, this.height/2,0,Math.PI*2,false)
        this.context.fill()

        this.context.restore()
    }




}