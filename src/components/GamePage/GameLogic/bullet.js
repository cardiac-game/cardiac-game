import store from '../../../store/store'
import images from './mediaRepos'

let updatedState = store.getState().playerReducer
let playerState = updatedState.player
let bulletParams = updatedState.bulletParams

store.subscribe(function() {
  updatedState = store.getState().playerReducer
  playerState = updatedState.player
  bulletParams = updatedState.bulletParams
})

export default class Bullet {
  constructor(context) {
    this.context = context
    this.isAlive = false
    this.img = bulletParams.img
    this.width = bulletParams.width
    this.height = bulletParams.height
    this.imgCenterX = bulletParams.imgCenterX
    this.imgCenterY = bulletParams.imgCenterY
    this.speed = bulletParams.bulletSpeed

    this.spawn = this.spawn.bind(this)
    this.checkInBounds = this.checkInBounds.bind(this)
    this.update = this.update.bind(this)
    this.draw = this.draw.bind(this)
  }

  spawn() {
    this.isAlive = true
    this.x = playerState.x
    this.y = playerState.y
    this.orientation = playerState.orientation
    this.dx = bulletParams.bulletSpeed * Math.cos((playerState.orientation) * Math.PI / 180)
    this.dy = bulletParams.bulletSpeed * Math.sin((playerState.orientation) * Math.PI / 180)
  }

  checkInBounds() {
  let top = this.y <= 0 - this.height
  let bottom = this.y >= this.context.canvas.height
  let left = this.x <= 0 - this.height
  let right = this.x >= this.context.canvas.width
  return (top || bottom || left || right) ? true : false
  }


  update() {
    this.x += this.dx
    this.y += this.dy
    this.checkInBounds() ? this.isAlive = false : null
  }

  draw() {
    this.context.save()
    this.context.translate(this.x + playerState.imgCenterX, this.y + playerState.imgCenterY)
    this.context.rotate((this.orientation + 90) * Math.PI / 180)
    this.context.drawImage(this.img, -this.imgCenterX, -this.imgCenterY, this.width, this.height)
    this.context.restore()
  }
}
