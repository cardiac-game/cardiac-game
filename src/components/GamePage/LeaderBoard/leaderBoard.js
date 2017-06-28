import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import './leaderBoard.css';

export class Modal extends React.Component {
  constructor(props) {
    super(props)
    this.state =
    { isModalOpen: false }
  }


  render () {
    return (
      <div>
        <button onClick={ () => this.openModal() }>Leaderboard</button>
        <Leaderboard isOpen={this.state.isModalOpen} onClose={() => this.closeModal()}>
          <div class='modal-height'>
            <h1>Leaderboard</h1>
            <p>top ten scores</p>
          </div>
          <div class='nickname-height'>
            <input placeholder='Nickname'></input>
            <button>Submit</button>
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

    return (
      <div>
        <div className='nickname nickname-height'></div>
        <div className='modalStyle modal-height'>{this.props.children}</div>
        <div className="backdropStyle" onClick={e => this.close(e)}/>}
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
