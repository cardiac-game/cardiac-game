export default function spriteAnimation(sprite, context) {


    let currentFrame = 0
    let frameWidth = sprite.width / sprite.frames
    let frameSpeed = 5
    let count = 0
    let x = 100
    let y = 100
    let dx = 1
    let dy = 1
    let rotationSpeed = 2

    this.update = function() {
        
        count++
        x+=dx
        y+=dy

        if (x > context.canvas.width -37.5 || x < 0 + 37.5) dx *= -1
        if (y > context.canvas.height -37.5 || y < 0 + 37.5) dy *= -1
        
        if (count >= frameSpeed) {
            currentFrame++
            if (currentFrame >= sprite.frames) {
                currentFrame = 0
            }
            count = 0
        }
    }

    this.draw = function() {
        let sp = sprite
        context.save()
        context.translate(x, y)
        context.rotate((rotationSpeed*currentFrame) * Math.PI / 180)
        context.drawImage(sp,frameWidth*currentFrame,0,frameWidth,sp.height,-37.5,-37.5,frameWidth,sp.height)
        context.restore()
    }

} 



