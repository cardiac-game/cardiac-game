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

  componentDidMount() {
    console.log(this.refs)
  }

  submitButton() {
    this.showScores()
    this.hideNickname()
    this.pushNickname()
    this.getScores()
  }

  showScores() {
    this.refs.modalHeight.style.visibility = 'visible'
  }

  hideNickname() {
    this.refs.nicknameHeight.style.visibility = 'hidden'
  }

  pushNickname() {
    this.state.pushRank(this.state.user, this.state.score)
  }

  getScores() {
    this.state.getTopScores()
    console.log(this.state)
  }

  render() {
    return (
      <div>
        <button onClick={ () => this.openModal() }>Leaderboard</button>
        <Leaderboard isOpen={this.state.isModalOpen} onClose={() => this.closeModal()}>
          <div className='nickname-height' ref='nicknameHeight'>
            <h1>ENTER NICKNAME</h1>
            <input placeholder='Nickname'></input>
            <button onClick={(e) => this.submitButton()} >Submit</button>
          </div>
          <div className='modal-height' ref='modalHeight'>
            <h1>Leaderboard</h1>
            <p>top ten scores</p>
          </div>
          <p><button classname='modal-height' onClick={ () => this.closeModal() }>Close</button></p>
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
        <div className='modalStyle'>{this.props.children}</div>
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
