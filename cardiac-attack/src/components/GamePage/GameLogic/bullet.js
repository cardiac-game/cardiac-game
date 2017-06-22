export default function Bullet(obj) {

  this.spawn = function(x,y,dx,dy, img) {
    this.x = x,
    this.y = y,
    this.dx = dx,
    this.dy = dy,
    this.img = img
  }

function checkInBounds() {
  let top = this.y <= 0 - this.img.height
  let bottom = this.y >= this.canvasHeight
  let left = this.x <= 0 - this.img.width
  let right = this.x >= this.canvasWidth
  return (top || bottom || left || right) ? false : true
  }

  checkInBounds.bind(this)



  this.move = function() {
    this.x += this.dx
    this.y += this.dy

    if (this.isColliding || checkInBounds()) {
      return true
    }
  }

  this.draw = function() {
    this.context.clearRect(this.x-1,this.y-1,this.img.width+2,this.img.height+2)
    this.context.drawImage(this.img, this.x,this.y)
  }

}
