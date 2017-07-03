import React, { Component } from 'react'
import { bindActionCreators } from 'redux'

// connect component to store WITHOUT REACT REDUX
// very important to maintain game performance
// otherwise react will slow down the game
import store from '../../store/store'
import { setContext } from '../../store/ducks/gameReducer'

// game logic files. if possible should move all actions to gameObject.js
import Game from './GameLogic/gameObj'
import Player from './GameLogic/player'
import BulletPool from './GameLogic/bulletPool'
import Bullet from './GameLogic/bullet'
import EnemyPool from './GameLogic/enemyPool'
import Virus from './GameLogic/virus'
import Bacteria from './GameLogic/bacteria'
import Heart from './GameLogic/heart'
import { images } from './GameLogic/mediaRepos'
import spriteAnimation from './GameLogic/spriteAnimation'
import CollisionDetector from './GameLogic/collisionDetection'
import keyListeners from './GameLogic/keyInput'

// code for moving cells in background
import Bloody from '../HomePage/bloody'

import {Modal} from './LeaderBoard/leaderBoard'

import './GamePage.css'

//========================== React Component ================================


class GamePage extends Component {

  // game loop will be run here
  componentDidMount() {
    // Game State is stored in redux store and passed into game component
    // Game State is then passed into each module when game objects are created
    // Each game object then subscribes to state and contains state dispatch functions
    //    so they can update and stay updated themselves


    // Target canvases and set context
    const canvas = this.refs.canvas
    const bulletCanvas = this.refs.bulletCanvas
    const ctx = canvas.getContext('2d')

    // set canvas context for game in state
    store.dispatch(setContext(ctx))

    // set background and canvas dimensions
    bulletCanvas.style.background = `url(${images.bg.src})`
    canvas.width = bulletCanvas.width = images.bg.width
    canvas.height = bulletCanvas.height = images.bg.height


    // moving cells in background (canvas context, max particle size, total particles, canvas width, canvas height)
    Bloody(this.refs.bloody, 5, 200, canvas.width, canvas.height);


    // invoke keyboard event listeners for player controlls
    keyListeners()

    // create player object. pass in gameState to initialize player with proper params
    const player = new Player(ctx)
    // create player bullets array
    const bulletPool = new BulletPool(ctx)
    // create viruses array. initialize with total stored in reserve and max shown
    // on screen at a time. this will change with level and health-input modifiers
    const virusPool = new EnemyPool(ctx, 100, 3)
    // create bacteria array.
    const bacteriaPool = new EnemyPool(ctx, 100, 5)
    // create heart object
    const heart = new Heart(ctx)
    // object with collision detection functions
    const collision = new CollisionDetector()

    // initialize the enemy pools
    virusPool.init(spriteAnimation, images.virus)
    bacteriaPool.init(Bacteria, images.bacteria)


    // animation loop
    function gameLoop() {

      // clear game canvas before redraw
      //////////////////////////////////
      ctx.clearRect(0,0,canvas.width,canvas.height)

      // draw objects
      ///////////////
      player.draw()
      bulletPool.draw()
      virusPool.draw()
      heart.draw()
      bacteriaPool.draw()


      // update objects
      /////////////////
      player.update()
      bulletPool.update()
      virusPool.update()
      heart.update()
      bacteriaPool.update()



      // check collisions
      ///////////////////
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
