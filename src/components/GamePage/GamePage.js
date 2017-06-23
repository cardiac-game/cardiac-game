import React, { Component } from 'react'
import Player from './GameLogic/player'
import Enemy from './GameLogic/enemy'
import images from './GameLogic/mediaRepos'

import './GamePage.css'

//========================== React Component ================================

export default class GamePage extends Component {

  componentDidMount() {

    const canvas = this.refs.canvas
    const bulletCanvas = this.refs.bulletCanvas

    bulletCanvas.style.background = `url(${images.bg.src})`
    canvas.width = bulletCanvas.width = images.bg.width
    canvas.height = bulletCanvas.height = images.bg.height

    let ctx = canvas.getContext('2d')

    let player = Player(ctx,canvas.width,canvas.height,100)
    let enemy = Enemy(ctx,images.enemy)
    player.bulletPool.init()
    player.draw()
    enemy.draw()


    function animate() {
      player.draw()
      enemy.draw()
      requestAnimationFrame(animate)
    }
    animate()

  }

  render() {

    return (
      <section className='game-page'>
        <div className="game-canvas-container">
          <canvas className='game-canvas' ref='bulletCanvas'></canvas>
          <canvas className='game-canvas' ref="canvas"></canvas>
        </div>
      </section>
    )
  }
}
