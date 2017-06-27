import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { setContext } from '../../store/ducks/gameReducer'

import MainLoop from 'mainloop.js'

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


  componentDidMount() {
    // Game State is stored in redux store and passed into game component
    // Game State is then passed into each module when game objects are created
    // Each game object then subscribes to state and contains state dispatch functions
    //    so they can update and stay updated themselves
    let gameState = this.props.gameState


    // Target canvases and set context
    const canvas = this.refs.canvas
    const bulletCanvas = this.refs.bulletCanvas
    const ctx = canvas.getContext('2d')

    this.props.setContext(ctx)

    // set background and canvas dimensions
    bulletCanvas.style.background = `url(${images.bg.src})`
    canvas.width = bulletCanvas.width = images.bg.width
    canvas.height = bulletCanvas.height = images.bg.height

    // invoke keyboard event listeners
    keyListeners()

    // create player object. pass in gameState to initialize player with proper params
    const player = new Player(ctx)
    const virus = new Virus(ctx)
    const bulletPool = new BulletPool(ctx)

    bulletPool.init()

    player.draw()
    virus.draw()
    bulletPool.draw()

    // animation loop
    function animation() {

      ctx.clearRect(0,0,canvas.width,canvas.height)
      player.draw()
      virus.draw()
      bulletPool.draw()

      player.update()
      virus.update()
      bulletPool.update()

      requestAnimationFrame(animation)
    }
    animation()  
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

function mapStateToProps(state) {
  return {
    gameState: Object.assign({},state.gameReducer,state.playerReducer,state.enemiesReducer)
  }
} 

function mapDispatchToProps(dispatch) {
  return bindActionCreators({setContext: setContext}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(GamePage)