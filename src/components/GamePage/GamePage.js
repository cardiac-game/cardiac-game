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


import images from './GameLogic/mediaRepos'


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
    const enemy = new Enemy(ctx)
    const bulletPool = new BulletPool(ctx)

    bulletPool.init()

    player.draw()

    // animation loop
    function animation() {

      ctx.clearRect(0,0,canvas.width,canvas.height)
      player.draw()
      enemy.draw()
      bulletPool.draw()

      player.update()
      enemy.update()
      bulletPool.update()

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

function mapStateToProps(state) {
  return {
    gameState: Object.assign({},state.gameReducer,state.playerReducer,state.enemiesReducer)
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({setContext: setContext}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(GamePage)
