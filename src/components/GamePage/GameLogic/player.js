import store from '../../../store/store'
import { setPlayer } from '../../../store/ducks/gameReducer'

import images from './mediaRepos'
import BulletPool from './bulletPool'
import Bullet from './bullet'

let gameState;

// update state anytime it is changed
store.subscribe(function() {
    gameState = store.getState().gameReducer.game
})




// player object
export default class Player {
    constructor(state, context) {
        this.context = context
        this.x = state.player.x
        this.y = state.player.y
        this.img = state.player.img
        this.width = state.player.width
        this.height = state.player.height
        this.centerX = state.player.centerX
        this.centerY = state.player.centerY
        this.dx = state.player.dx
        this.dy = state.player.dy
        this.speed = state.player.speed
        this.orientation = state.player.orientation
        this.turnSpeed = state.player.turnSpeed
        this.lastShot = state.player.lastShot
        this.fireRate = state.player.lastShot

        this.update = this.update.bind(this)
        this.shoot = this.shoot.bind(this)
        this.draw = this.draw.bind(this)
    }
   
    update() {
        // rotate character
        if (gameState.keys.right) {
            this.orientation += this.turnSpeed
        } else if (gameState.keys.left) {
            this.orientation -= this.turnSpeed
        }

        // move forwards/backwards
        if (gameState.keys.up) {
            this.x += (this.speed * Math.cos(this.orientation * Math.PI / 180))
            this.y += (this.speed * Math.sin(this.orientation * Math.PI / 180))
        } else if (gameState.keys.down) {
            this.x -= this.speed / 2 * Math.cos(this.orientation * Math.PI / 180)
            this.y -= this.speed / 2 * Math.sin(this.orientation * Math.PI / 180)
        }

        // strafe left/right
        if (gameState.keys.strafeRight) {
            this.x += (this.speed * Math.cos((this.orientation + 90) * Math.PI / 180)) / 2
            this.y += (this.speed * Math.sin((this.orientation + 90) * Math.PI / 180)) / 2
        } else if (gameState.keys.strafeLeft) {
            this.x -= (this.speed * Math.cos((this.orientation + 90) * Math.PI / 180)) / 2
            this.y -= (this.speed * Math.sin((this.orientation + 90) * Math.PI / 180)) / 2
        }

        // bounds checking
        if (this.x >= this.context.canvas.width - this.width) {
            this.x = this.context.canvas.width - this.width
        } else if (this.x <= 0) {
            this.x = 0
        }
        if (this.y > this.context.canvas.height - this.height) {
            this.y = this.context.canvas.height - this.height
        } else if (this.y <= 0) {
            this.y = 0
        }

        store.dispatch(setPlayer(this))
    }
    

    shoot() {
        if (gameState.keys.space && Date.now() - this.lastShot > this.fireRate) {
            this.lastShot = Date.now()
            // this.bulletPool.fire(this.x + this.centerX, this.y + this.centerY, this.orientation, images.bullet, this.speed * 2)
        }
    }

    draw() {
        this.context.save()
        this.context.translate(this.x + this.centerX, this.y + this.centerY)
        this.context.rotate((this.orientation + 90) * Math.PI / 180)
        this.context.drawImage(this.img, -this.centerX, -this.centerY, this.width, this.height)
        this.context.restore()
    }
    
}