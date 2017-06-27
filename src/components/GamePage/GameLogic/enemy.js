import $ from './reusable'

export default function Enemy(context, image) {

  let enemy = {
    context: context,
    isAlive: false,
    x: $.randBtwn(0,1200),
    y: $.randBtwn(0,900),
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
    init: function() {
      this.x = $.randBtwn(0,this.context.canvas.width)
      this.y = $.randBtwn(0,this.context.canvas.height)
    },

    update: function() {
      let angle = Math.atan2(this.context.canvas.height/2 - this.y, this.context.canvas.width/2 - this.x)
      let delta = angle - this.orientation
      if (delta > $.pi) {
          delta = delta - $.pi
      }
      if (delta !== 0) {
          let direction = delta / delta
          this.orientation += (direction* Math.min(this.turnSpeed, delta))
      }
      this.orientation %= $.pi
      this.x += Math.cos(this.orientation) * this.speed + $.randBtwn(-3,3)
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
   }
  }

  return enemy
}
