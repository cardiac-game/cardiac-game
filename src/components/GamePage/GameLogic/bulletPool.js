import store from '../../../store/store'
import { setPlayerBulletPool } from '../../../store/ducks/playerReducer'

import Bullet from './bullet'

let updatedState = store.getState().playerReducer
let playerState = updatedState.player
let bulletParams = updatedState.bulletParams

store.subscribe(function() {
  updatedState = store.getState().playerReducer
  playerState = updatedState.player
  bulletParams = updatedState.bulletParams
})

export default class BulletPool {
  constructor(context) {
    this.context = context
    this.active = []
    this.inactive = []
    this.maxSize = bulletParams.bulletCapacity

    this.getBullet = this.getBullet.bind(this)
    this.storeBullet = this.storeBullet.bind(this)
    this.init = this.init.bind(this)
    this.fire = this.fire.bind(this)
    this.getActive = this.getActive.bind(this)
    this.update = this.update.bind(this)
    this.draw = this.draw.bind(this)
  }

  getBullet() {
    let bullet
    if ( this.inactive.length > 1 ) {
      bullet = this.inactive.shift()
    }  else {
      bullet = new Bullet(this.context) 
    }
    return bullet
  }

  storeBullet(bullet) {
    this.inactive.push(bullet)
  }

	init() {
      for (let i = 0; i < this.maxSize; i++) {
        let b = new Bullet(this.context) 
        this.storeBullet(b)
      }
	}

	fire() {
      let bullet = this.getBullet()
      bullet.spawn()
      this.active.push(bullet)
	}

  getActive() {
    return this.active
  }

	update() {
    if (playerState.isFiring) {
      this.fire()
    }
    if (this.active.length < 1) return
    for (let i = 0; i < this.active.length; i ++) {
      this.active[i].update()
      !this.active[i].isAlive ? this.storeBullet(this.active.splice(i,1)[0]) : null
    }
	}

  draw() {
    for (let i = 0; i < this.active.length; i++) {
      this.active[i].draw()
    }
  }
}
