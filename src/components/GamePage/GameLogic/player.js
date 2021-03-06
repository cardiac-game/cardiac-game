import store from '../../../store/store'
import { setPlayer } from '../../../store/ducks/playerReducer'

import { images } from './mediaRepos'

import BulletPool from './bulletPool'
import Bullet from './bullet'

// get inputs from inputsObj on nutritionReducer from store
let { playerInitialSpeed, playerOverallSpeed, playerFireRate, playerMaxShield} = store.getState().nutritionReducer.inputsObj;

let playerState = store.getState().playerReducer

// update state anytime it is changed
store.subscribe(function() {
    playerState = store.getState().playerReducer
})


// player object
export default class Player {
    constructor(context) {
        this.context = context
        this.x = playerState.player.x
        this.y = playerState.player.y
        this.img = playerState.player.img
        this.width = playerState.player.width
        this.height = playerState.player.height
        this.imgCenterX = playerState.player.imgCenterX
        this.imgCenterY = playerState.player.imgCenterY
        this.dx = playerState.player.dx
        this.dy = playerState.player.dy 
        this.speed = playerState.player.speed * playerOverallSpeed
        this.orientation = playerState.player.orientation
        this.turnSpeed = playerState.player.turnSpeed

        this.lastShot = Date.now()
        this.fireRate = playerState.player.fireRate * playerFireRate
        this.isFiring = playerState.player.isFiring

        this.maxShield = 5 * playerMaxShield
        this.shield = this.maxShield
        this.hue = 0
        this.isAlive = true
        this.spawnCounter = 0

        this.update = this.update.bind(this)
        this.draw = this.draw.bind(this)
    }
   
    // decrease health by one
    shieldDown(damage = 1) {
	  this.shield -= damage
    // ship is destroyed and respawn timer starts
	  if (this.shield < 0) {
		  this.isAlive = false
		  this.shield = this.maxShield
          this.deadX = this.x
          this.deadY = this.y
	    }
        // set hue based on health
        this.hue = ~~(100 * (this.maxShield - this.shield) / this.maxShield)
    }

    poweredUp(typeOfPowerup){
        if (typeOfPowerup === "MS") {
            this.maxShield+= 25 * playerMaxShield
            if (this.maxShield > 250 * playerMaxShield) {
                this.maxShield = 250
            }
        } else if (typeOfPowerup === "FR"){
            this.fireRate -= 10
            if (this.fireRate < 40) {
                this.fireRate = 40
            }
        }
    }

    update() {

        // respawn when dead
        if (!this.isAlive) {
            this.x = -500
            this.y = -500
            this.hue = 100
            if (this.spawnCounter < 150) {
                this.spawnCounter++
            } else {
                this.isAlive = true
                this.x = this.deadX
                this.y = this.deadY
                this.spawnCounter = 0
                this.hue = 0
            }
            return
        } 

        // rotate character
        if (playerState.keys.right) {
            this.orientation += this.turnSpeed
        } else if (playerState.keys.left) {
            this.orientation -= this.turnSpeed
        }

        // move forwards/backwards
        if (playerState.keys.up) {
            this.x += (this.speed * Math.cos(this.orientation * Math.PI / 180))
            this.y += (this.speed * Math.sin(this.orientation * Math.PI / 180))
        } else if (playerState.keys.down) {
            this.x -= this.speed / 2 * Math.cos(this.orientation * Math.PI / 180)
            this.y -= this.speed / 2 * Math.sin(this.orientation * Math.PI / 180)
        }

        // strafe left/right
        if (playerState.keys.strafeRight) {
            this.x += (this.speed * Math.cos((this.orientation + 90) * Math.PI / 180)) 
            this.y += (this.speed * Math.sin((this.orientation + 90) * Math.PI / 180)) 
        } else if (playerState.keys.strafeLeft) {
            this.x -= (this.speed * Math.cos((this.orientation + 90) * Math.PI / 180)) 
            this.y -= (this.speed * Math.sin((this.orientation + 90) * Math.PI / 180)) 
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

        // preven player from flying through heart
        // if (this.x <= (this.context.canvas.width /2 - ) && villageMain.x <= (herohitboxX) && herohitboxY <= (villageMain.y + 200) && villageMain.y <= (herohitboxY) ) { console.log('inside bldg') }

        // shoot
        if (playerState.keys.space && Date.now() - this.lastShot > this.fireRate) {
            this.lastShot = Date.now()
            this.isFiring = true
        } else {
            this.isFiring = false
        }
       
       store.dispatch(setPlayer(this))
    }
    
    draw() {
        this.context.save()
        this.context.translate(this.x + this.imgCenterX, this.y + this.imgCenterY)
        this.context.rotate((this.orientation + 90) * Math.PI / 180)
        this.context.filter = 'hue-rotate(' + this.hue + 'deg)'
        this.context.drawImage(this.img, -this.imgCenterX, -this.imgCenterY, this.width, this.height)
        this.context.restore()
    }
    
}