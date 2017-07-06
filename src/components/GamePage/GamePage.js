import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
// connect component to store WITHOUT REACT REDUX
// very important to maintain game performance
// otherwise react will slow down the game
import store from '../../store/store'
import { setContext } from '../../store/ducks/gameReducer'
// game logic files. if possible should move all actions to gameObject.js
import Game from './GameLogic/gameObj'
import { images } from './GameLogic/mediaRepos'
import { startListening, stopListening } from './GameLogic/keyInput'
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
    bulletCanvas.style.background = `url(${images.cancerousbg.src})`
    canvas.width = bulletCanvas.width = images.cancerousbg.width
    canvas.height = bulletCanvas.height = images.cancerousbg.height

    // makes images sharper
    ctx.imageSmoothingEnabled = false
    ctx.imageSmoothingQuality = "high"

    // moving cells in background (canvas context, max particle size, total particles, canvas width, canvas height)
    Bloody(this.refs.bloody, 5, 200, canvas.width, canvas.height);



    // create game object
    const game = new Game()

    // variable to reference animation frame. allows for pause and resume of game loop
    let req
    
    function gameLoop() {
      ctx.clearRect(0,0,canvas.width,canvas.height)
      game.draw()
      game.update()
      game.checkCollisions()
      req = requestAnimationFrame(gameLoop)
    }

    // kickoff game loop
    gameLoop()
  }

  componentWillUnmount() {
    stopListening()
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
