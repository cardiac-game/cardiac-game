import store from '../../../store/store'

// get inputs from inputsObj on nutritionReducer from store
let { enemySpeed } = store.getState().nutritionReducer.inputsObj;


export default class Virus {

    constructor(context, sprite) {
        this.context = context
        this.sprite = sprite
        this.currentFrame = 0
        this.frameWidth = this.sprite.width / this.sprite.frames
        this.frameSpeed = 5
        this.frameCount = 0
        this.x = Math.random() * this.context.canvas.width
        this.y = Math.random() * this.context.canvas.height
        this.dx = (Math.random() * 2 + 0.5) * enemySpeed
        this.dy = (Math.random() * 2 + 0.5) * enemySpeed
        this.width = this.frameWidth
        this.height = this.sprite.height
        this.imgCenterX = this.frameWidth / 2
        this.imgCenterY = this.sprite.height / 2
        this.rotationSpeed = Math.random() * 360

        this.maxHealth = 30
        this.health = this.maxHealth
        this.contrast = 0

        this.update = this.update.bind(this)
        this.draw = this.draw.bind(this)
        this.healthDown = this.healthDown.bind(this)
    }

    healthDown(bulletDamage) {
        this.health -= bulletDamage
        if (this.health < 0) {
            this.isAlive = false
            this.health = this.maxHealth
        }
        this.contrast = (100 * (this.maxHealth - this.health) / this.maxHealth)
    }

    update() {
        this.frameCount++

        this.x += this.dx
        this.y += this.dy

        // keep in bounds
        if (this.x > this.context.canvas.width - this.width || this.x < 0) this.dx *= -1
        if (this.y > this.context.canvas.height - this.width || this.y < 0) this.dy *= -1
        
        // regulates frame speed
        if (this.frameCount >= this.frameSpeed) {
            this.currentFrame++
            if (this.currentFrame >= this.sprite.frames) {
                this.currentFrame = 0
            }
            this.frameCount = 0
        }
        this.rotationSpeed++
    }

    draw() {
        this.context.save()
        this.context.filter = "invert(" + this.contrast + "%)"
        this.context.translate(this.x + this.imgCenterX, this.y + this.imgCenterY)
        this.context.rotate((this.rotationSpeed) * Math.PI / 180)
        this.context.drawImage(this.sprite,(this.frameWidth*this.currentFrame),0,this.frameWidth,this.sprite.height,-this.imgCenterX,-this.imgCenterY,this.frameWidth,this.sprite.height)
        this.context.restore()
    }

} 



