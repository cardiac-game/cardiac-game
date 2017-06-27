import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import './leaderboard.css';

export class Modal extends React.Component {
  constructor(props) {
    super(props)
    this.state =
    { isModalOpen: false }
  }

  render() {
    return (
      <div>
        <button className='modal-button' onClick={ () => this.openModal() }>Leaderboard</button>
        <Leaderboard isOpen={this.state.isModalOpen} onClose={() => this.closeModal()}>
          <div>
          <h1 class='leaderboard'>Leaderboard</h1>
          <p>top ten scores</p>
          </div>
          <div>

          </div>
          <p><button onClick={() => this.closeModal()}>Close</button></p>
        </Leaderboard>
      </div>
    )
  }
  openModal() {
    this.setState({ isModalOpen: true })
  }

  closeModal() {
    this.setState({ isModalOpen: false })
  }
}

class Leaderboard extends React.Component {
  render() {
    if (this.props.isOpen === false)
      return null

    let modalStyle = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      width: '50%',
      height: '50vh',
      transform: 'translate(-50%, -50%)',
      zIndex: '9999',
      background: 'white'
    }

    let backdropStyle = {
      position: 'absolute',
      width: '100%',
      height: '100vh',
      top: '0px',
      left: '0px',
      zIndex: '9998',
      background: '-webkit-linear-gradient(right, rgba(107, 0, 0, .6), rgba(0, 0, 0, 0.6))'
    }

    return (
      <div>
        <div style={modalStyle}>{this.props.children}</div>
        <div style={backdropStyle} onClick={e => this.close(e)}/>}
      </div>
    )
  }

  close(e) {
    e.preventDefault()

    if (this.props.onClose) {
      this.props.onClose()
    }
  }
}
