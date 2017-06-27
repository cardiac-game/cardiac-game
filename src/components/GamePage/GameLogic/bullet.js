export default function Bullet(context) {

  this.context = context
  this.isAlive = false

  this.spawn = function(x,y,orientation,img, speed) {
    this.isAlive = true
    this.x = x,
    this.y = y,
    this.speed = 12,
    this.orientation = orientation,
    this.dx = this.speed * Math.cos((this.orientation) * Math.PI / 180),
    this.dy = this.speed * Math.sin((this.orientation) * Math.PI / 180),
    this.img = img,
    this.width = img.width,
    this.height = img.height,
    this.centerX = this.width/2,
    this.centerY = this.height/2
  }

  this.checkInBounds = function() {
  let top = this.y <= 0 - this.img.height
  let bottom = this.y >= this.context.canvas.height
  let left = this.x <= 0 - this.img.width
  let right = this.x >= this.context.canvas.width
  return (top || bottom || left || right) ? true : false
  }


  this.update = function() {
    this.x += this.dx
    this.y += this.dy
  }

  this.draw = function() {
    let xView = this.x + this.centerX
    let yView = this.y + this.centerY

    this.context.save()
    this.context.translate(xView, yView)
    this.context.rotate((this.orientation + 90) * Math.PI / 180)
    this.context.drawImage(this.img, -this.centerX, -this.centerY)
    this.context.restore()
  }
}
