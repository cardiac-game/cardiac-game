import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import store from '../../store/store'
import { setContext } from '../../store/ducks/gameReducer'
import {Modal} from './LeaderBoard/leaderBoard'

import Game from './GameLogic/gameObj'
import Player from './GameLogic/player'
import BulletPool from './GameLogic/bulletPool'
import Bullet from './GameLogic/bullet'
import EnemyPool from './GameLogic/enemyPool'
import Enemy from './GameLogic/enemy'
import Virus from './GameLogic/virus'


import { images } from './GameLogic/mediaRepos'


import spriteAnimation from './GameLogic/spriteAnimation'
import CollisionDetector from './GameLogic/collisionDetection'
import keyListeners from './GameLogic/keyInput'


import './GamePage.css'

//========================== React Component ================================


class GamePage extends Component {

  componentWillMount() {
    document.querySelector('body').style.overflow = 'hidden'
  }

  componentDidMount() {
    // Game State is stored in redux store and passed into game component
    // Game State is then passed into each module when game objects are created
    // Each game object then subscribes to state and contains state dispatch functions
    //    so they can update and stay updated themselves


    // Target canvases and set context
    const canvas = this.refs.canvas
    const bulletCanvas = this.refs.bulletCanvas
    const ctx = canvas.getContext('2d')

    store.dispatch(setContext(ctx))

    // set background and canvas dimensions
    bulletCanvas.style.background = `url(${images.bg.src})`
    canvas.width = bulletCanvas.width = images.bg.width
    canvas.height = bulletCanvas.height = images.bg.height

    // invoke keyboard event listeners
    keyListeners()

    // create player object. pass in gameState to initialize player with proper params
    const player = new Player(ctx)
    const bulletPool = new BulletPool(ctx)
    const enemyPool = new EnemyPool(ctx, 100)
    const virusPool = new EnemyPool(ctx, 100)
    const collision = new CollisionDetector()

    enemyPool.init(Enemy, images.enemy) 
    virusPool.init(spriteAnimation, images.virus)

    player.draw()


    // animation loop
    function animation() {

      ctx.clearRect(0,0,canvas.width,canvas.height)
      player.draw()
      enemyPool.draw()
      virusPool.draw()

      bulletPool.draw()

      player.update()
      enemyPool.update()
      virusPool.update()
      bulletPool.update()

      collision.checkObjToArray(player, enemyPool.active, function(bulletPool,enemy) {
        enemy.isAlive = false
      })
      collision.checkArrayToArray(bulletPool.active, enemyPool.active, function(bullet,enemy) {
        enemy.isAlive = false
        bullet.isAlive = false
      })

      collision.checkArrayToArray(virusPool.active,bulletPool.active, function(virus,bullet) {
        virus.isAlive = false
        bullet.isAlive = false
      })

      requestAnimationFrame(animation)
    }
    animation()
  }

  componentWillUnmout() {
    document.querySelector('body').style.overflow = 'scroll'
  }

  render() {
    return (
      <div>
      <section className='game-page'>
        <div className="game-canvas-container">
          <canvas className='game-canvas' ref='bulletCanvas'></canvas>
          <canvas className='game-canvas' ref="canvas"></canvas>
        </div>
      </section>
      <Modal />
      </div>
    )
  }
}

export default GamePage
