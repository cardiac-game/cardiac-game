import $ from './reusable'

export default function Enemy(context, image) {
  let cW = context.canvas.width
  let cH = context.canvas.height


  let enemy = {
    x: $.randBtwn(0,cW),
    y: $.randBtwn(0,cH),
    img: image,
    width: image.width,
    height: image.height,
    centerX: image.width/2,
    centerY: image.height/2,
    dx: 0,
    dy: 0,
    speed: $.randBtwn(1,3),
    turnSpeed: $.randBtwn(3,6),
    orientation: $.randBtwn(0,$.fullCircle),
    lastShot: 0,
    fireRate: $.randBtwn(500,2000),
    init: function(orientation) {
      this.orientation = orientation
      this.x = $.randBtwn(0,cW)
      this.y = $.randBtwn(0,cH)
    },
    move: function() {
      let angle = Math.atan2(cH/2 - this.y, cW/2 - this.x)
      let delta = angle - this.orientation
      if (delta > $.pi) {
          delta = delta - $.pi
      }
      if (delta !== 0) {
          let direction = delta / delta
          this.orientation += (direction* Math.min(this.turnSpeed, delta))
      }
      this.orientation %= $.pi
      this.x += Math.cos(this.orientation) * this.speed
      this.y += Math.sin(this.orientation) * this.speed
    },
    draw: function() {
      let xView = this.x + this.centerX
      let yView = this.y + this.centerY
      context.save()
      context.translate(xView, yView)
      context.rotate($.toRad(this.orientation + 90))
      context.drawImage(this.img, -this.centerX, -this.centerY, this.width, this.height)
      context.restore()
      this.move()
    }
  }

  return enemy
}
