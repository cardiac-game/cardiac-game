import images from './mediaRepos'
import BulletPool from './bulletPool'
import Bullet from './bullet'




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
export default function Player(maxBullets, context) {

    let player = {
        context: context,
        x: 200,
        y: 200,
        img: images.ship,
        width: images.ship.width,
        height: images.ship.height,
        centerX: images.ship.width / 2,
        centerY: images.ship.height / 2,
        dx: 0,
        dy: 0,
        speed: 6,
        orientation: 0,
        turnSpeed: 3,
        bulletPool: new BulletPool(maxBullets, Bullet, context), // maxBullets, context
        lastShot: 0,
        fireRate: 333,

        init: function (speed, turnSpeed) {
            this.bulletPool.init()
            this.orientation = 0
            if (speed) this.speed = speed
            if (turnSpeed) this.turnSpeed = turnSpeed
        },

        update: function () {
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
                this.x -= this.speed / 2 * Math.cos(this.orientation * Math.PI / 180)
                this.y -= this.speed / 2 * Math.sin(this.orientation * Math.PI / 180)
            }

            // strafe left/right
            if (KeyStatus.strafeRight) {
                this.x += (this.speed * Math.cos((this.orientation + 90) * Math.PI / 180)) / 2
                this.y += (this.speed * Math.sin((this.orientation + 90) * Math.PI / 180)) / 2
            } else if (KeyStatus.strafeLeft) {
                this.x -= (this.speed * Math.cos((this.orientation + 90) * Math.PI / 180)) / 2
                this.y -= (this.speed * Math.sin((this.orientation + 90) * Math.PI / 180)) / 2
            }

            // bounds checking
            if (this.x >= this.cW - this.width) {
                this.x = this.cW - this.width
            } else if (this.x <= 0) {
                this.x = 0
            }
            if (this.y > this.cH - this.height) {
                this.y = this.cH - this.height
            } else if (this.y <= 0) {
                this.y = 0
            }

            this.bulletPool.update()
        },

        shoot: function () {
            if (KeyStatus.space && Date.now() - this.lastShot > this.fireRate) {
                this.lastShot = Date.now()
                this.bulletPool.fire(this.x + this.centerX, this.y + this.centerY, this.orientation, images.bullet, this.speed * 2)
            }
        },

        draw: function () {
            this.context.save()
            this.context.translate(this.x + this.centerX, this.y + this.centerY)
            this.context.rotate((this.orientation + 90) * Math.PI / 180)
            this.context.drawImage(this.img, -this.centerX, -this.centerY, this.width, this.height)
            this.context.restore()
            this.bulletPool.draw()
        }
    }

    return player
}