import store from '../../../store/store'
import images from './mediaRepos'

let updatedState
let playerState
let bulletParams

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
    this.centerX = bulletParams.width / 2
    this.centerY = bulletParams.height / 2
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
    this.dx = playerState.bulletSpeed * Math.cos((playerState.orientation) * Math.PI / 180)
    this.dy = playerState.bulletSpeed * Math.sin((playerState.orientation) * Math.PI / 180)
  }

  checkInBounds() {
  let top = this.y <= 0 - this.img.height
  let bottom = this.y >= this.context.canvas.height
  let left = this.x <= 0 - this.img.width
  let right = this.x >= this.context.canvas.width
  return (top || bottom || left || right) ? true : false
  }


  update() {
    this.x += this.dx
    this.y += this.dy
    this.checkInBounds() ? this.isAlive = false : null
  }

  draw() {
    let xView = this.x + this.centerX
    let yView = this.y + this.centerY

    this.context.save()
    this.context.translate(xView, yView)
    this.context.rotate((this.orientation + 90) * Math.PI / 180)
    this.context.drawImage(this.img, -this.centerX, -this.centerY)
    this.context.restore()
  }
}
