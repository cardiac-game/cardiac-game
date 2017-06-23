import images from './mediaRepos'
import BulletPool from './bulletPool'


// object to relate keycodes to keyname
const KeyCodes = {
    32: 'space',
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down',
    65: 'strafeLeft',
    68: 'strafeRight'
}

// generate object to store status of each key
// initialize status of all pressed keys to false
const KeyStatus = {}

for (let code in KeyCodes) {
    KeyStatus[KeyCodes[code]] = false
}

// listener to change key status to true when key is pressed
document.onkeydown = (e) => {
    let currCode = (e.keyCode) ? e.keyCode : e.charCode
    if (KeyCodes[currCode]) {
        KeyStatus[KeyCodes[currCode]] = true
    }
}

// listener to change key status to false when key is release
document.onkeyup = (e) => {
    e.preventDefault()
    let currCode = (e.keyCode) ? e.keyCode : e.charCode
    if (KeyCodes[currCode]) {
        KeyStatus[KeyCodes[currCode]] = false
    }
}

// player object
export default function Player(ctx,cW,cH,maxBullets) {

  let player = {
    x: cW/2,
    y: cH/2,
    img: images.ship,
    width: images.ship.width,
    height: images.ship.height,
    centerX: images.ship.width/2,
    centerY: images.ship.height/2,
    dx: 0,
    dy: 0,
    speed: 6,
    orientation: 0,
    turnSpeed:  3,
    bulletPool: new BulletPool(maxBullets,ctx),
    lastShot: 0,
    fireRate: 333,
    init: function(speed,turnSpeed) {
      this.bulletPool.init()
      this.orientation = 0
      this.speed = speed
      this.turnSpeed = turnSpeed
    },
    move: function() {
      // rotate character
      if (KeyStatus.right) {
         this.orientation += this.turnSpeed
      } else if (KeyStatus.left) {
         this.orientation -= this.turnSpeed
      }

      // move forwards/backwards
      if (KeyStatus.up) {
          this.x += (this.speed * Math.cos(this.orientation * Math.PI / 180))
          this.y += (this.speed * Math.sin(this.orientation * Math.PI / 180))
       } else if (KeyStatus.down) {
          this.x -= this.speed/2 * Math.cos(this.orientation * Math.PI / 180)
          this.y -= this.speed/2 * Math.sin(this.orientation * Math.PI / 180)
       }

       // strafe left/right
       if (KeyStatus.strafeRight) {
         this.x += (this.speed * Math.cos((this.orientation + 90) * Math.PI / 180))/2
         this.y += (this.speed * Math.sin((this.orientation + 90) * Math.PI / 180))/2
       } else if (KeyStatus.strafeLeft) {
         this.x -= (this.speed * Math.cos((this.orientation + 90) * Math.PI / 180))/2
         this.y -= (this.speed * Math.sin((this.orientation + 90) * Math.PI / 180))/2
       }

       // bounds checking
       if (this.x >= cW - this.width) {
           this.x = cW - this.width
       } else if (this.x <= 0) {
           this.x = 0
       }
       if (this.y > cH - this.height) {
           this.y = cH - this.height
       } else if (this.y <= 0) {
           this.y = 0
       }
    },
    shoot: function() {
      if (KeyStatus.space && Date.now() - this.lastShot > this.fireRate) {
        this.lastShot = Date.now()
        this.bulletPool.fire(this.x + this.centerX, this.y + this.centerY, this.orientation, images.bullet, this.speed*2)
      }
      this.bulletPool.draw()
    },
    draw: function() {
      let xView = this.x + this.width / 2
      let yView = this.y + this.height / 2

      ctx.save()
      ctx.clearRect(0,0,cW, cH)

      this.move()
      /// make sure pivot is moved to center
      ctx.translate(xView, yView)

      /// rotate, you should make new sprite where direction
      /// points to the right. I'm add 90 here to compensate
      ctx.rotate((this.orientation + 90) * Math.PI / 180)
      /// translate back before drawing the sprite
      ctx.drawImage(this.img, -this.centerX, -this.centerY, this.width, this.height)
      ctx.restore()
      this.shoot()
    }
  }

  return player
}
