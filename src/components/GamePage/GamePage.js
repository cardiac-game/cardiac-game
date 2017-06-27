import React, { Component } from 'react'
import MainLoop from 'mainloop.js'

import Game from './GameLogic/gameObj'
import Player from './GameLogic/player'
import EnemyPool from './GameLogic/enemyPool'
import Enemy from './GameLogic/enemy'
import Virus from './GameLogic/virus'


import images from './GameLogic/mediaRepos'

import spriteAnimation from './GameLogic/spriteAnimation'
import CollisionDetector from './GameLogic/collisionDetection'

import './GamePage.css'

//========================== React Component ================================


export default class GamePage extends Component {

  componentDidMount() {

    const canvas = this.refs.canvas
    const bulletCanvas = this.refs.bulletCanvas
    const ctx = canvas.getContext('2d')

    bulletCanvas.style.background = `url(${images.bg.src})`
    canvas.width = bulletCanvas.width = images.bg.width
    canvas.height = bulletCanvas.height = images.bg.height

    const player = new Player(100,ctx)
    const virus = new Virus(ctx)
    const enemyPool = new EnemyPool(20, Enemy, images.enemy, ctx)
    const virusAnimation = new spriteAnimation(images.virus, ctx)
    const collisions = new CollisionDetector()

    player.init()
    enemyPool.init(5)

    function animation() {
      ctx.clearRect(0,0,canvas.width,canvas.height)
      player.draw()
      player.shoot()
      enemyPool.spawnEnemy()
      enemyPool.draw()
      virusAnimation.draw()



      collisions.checkArrayToArray(player.bulletPool.getActive(),enemyPool.getActive(),function(bool, obj1, obj2) {
        if (bool) {
          obj1.isAlive = false,
          obj2.isAlive = false
        }
      }, ctx)

      player.update()
      enemyPool.update()
      virusAnimation.update()
      requestAnimationFrame(animation)
    }
    animation()

    // let game = new Game(ctx) // context
 
    // game.init()
    // MainLoop.setUpdate(player.update).setDraw(player.draw).start()
  
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
