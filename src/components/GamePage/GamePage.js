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
import Virus from './GameLogic/virus'
import Bacteria from './GameLogic/bacteria'
import Heart from './GameLogic/heart'

import Bloody from '../HomePage/bloody'

import { images } from './GameLogic/mediaRepos'


import spriteAnimation from './GameLogic/spriteAnimation'
import CollisionDetector from './GameLogic/collisionDetection'
import keyListeners from './GameLogic/keyInput'


import './GamePage.css'

//========================== React Component ================================


class GamePage extends Component {


  componentDidMount() {
    // Game State is stored in redux store and passed into game component
    // Game State is then passed into each module when game objects are created
    // Each game object then subscribes to state and contains state dispatch functions
    //    so they can update and stay updated themselves
    Bloody(this.refs.bloody, 5, 500);
  

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
    const virusPool = new EnemyPool(ctx, 100, 3)
    const bacteriaPool = new EnemyPool(ctx, 100, 5)
    const heart = new Heart(ctx)

    const collision = new CollisionDetector()

    
    virusPool.init(spriteAnimation, images.virus)
    bacteriaPool.init(Bacteria, images.bacteria)

    player.draw()


    // animation loop
    function gameLoop() {

      ctx.clearRect(0,0,canvas.width,canvas.height)

      // draw objects
      player.draw()
      bulletPool.draw()
      virusPool.draw()
      heart.draw()
      bacteriaPool.draw()


      // update objects
      player.update()
      bulletPool.update()
      virusPool.update()
      heart.update()
      bacteriaPool.update()
   


      // check collisions
      collision.checkObjToArray(player, bacteriaPool.active, function(bulletPool,enemy) {
        enemy.isAlive = false
      })

      collision.checkObjToArray(player, virusPool.active, function(bulletPool,enemy) {
      })
      
      collision.checkArrayToArray(virusPool.active,bulletPool.active, function(virus,bullet) {
        virus.healthDown()
        bullet.isAlive = false
      })

      collision.checkArrayToArray(bacteriaPool.active,bulletPool.active, function(bacteria,bullet) {
        bacteria.healthDown()
        bullet.isAlive = false
      })

      collision.checkObjToArray(heart,bacteriaPool.active, function(heart,bacteria) {
        heart.healthDown()
        bacteria.healthDown()
        bacteria.healthDown()
        bacteria.healthDown()
      })


      // request gameLoop frame
      requestAnimationFrame(gameLoop)
    }

    // kickoff game loop
    gameLoop()
  }


  render() {
    return (
      <div>
      <section className='game-page'>
        <div className="game-canvas-container">
          <canvas className='game-canvas' ref='bulletCanvas'></canvas>
          <canvas className='game-canvas' ref="bloody"></canvas>
          <canvas className='game-canvas' ref="canvas"></canvas>
        </div>
      </section>
      <Modal />
      </div>
    )
  }
}

export default GamePage
