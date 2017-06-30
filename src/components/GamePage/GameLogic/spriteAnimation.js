export default class spriteAnimation {
    constructor(context, sprite) {

    this.context = context
    this.sprite = sprite
    this.currentFrame = 0
    this.frameWidth = this.sprite.width / this.sprite.frames
    this.frameSpeed = 5
    this.frameCount = 0
    this.x = Math.random() * context.canvas.width
    this.y = Math.random() * context.canvas.height
    this.dx = Math.random() * 3 + 1
    this.dy = Math.random() *3 + 1
    this.width = this.frameWidth
    this.height = this.sprite.height
    this.imgCenterX = this.frameWidth / 2
    this.imgCenterY = this.sprite.height / 2
    this.rotationSpeed = 2

    this.update = this.update.bind(this)
    this.draw = this.draw.bind(this)
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
    }

    draw() {
        this.context.save()
        this.context.translate(this.x + this.imgCenterX, this.y + this.imgCenterY)
        this.context.rotate((this.rotationSpeed*this.currentFrame) * Math.PI / 180)
        this.context.drawImage(this.sprite,(this.frameWidth*this.currentFrame),0,this.frameWidth,this.sprite.height,-this.imgCenterX,-this.imgCenterY,this.frameWidth,this.sprite.height)
        this.context.restore()
    }

} 



