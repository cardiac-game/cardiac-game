import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import './leaderBoard.css';
import { pushRank,  getCurrentRank, getTopScores } from './../../../services/user.service';

export class Modal extends Component {
  constructor(props) {
    super(props)
    this.state =
    { isModalOpen: false,
      topTenScores: [''] }
  }

  submitButton() {
    this.showScores()
    this.hideNickname()
    // pushRank()
    getTopScores().then( response => this.setState({topTenScores : response}))
    // getCurrentRank()
  }

  showScores() {
    this.refs.modalHeight.style.visibility = 'visible'
  }

  hideNickname() {
    this.refs.nicknameHeight.style.visibility = 'hidden'
  }

  // componentDidMount: function() {
  //   this.serverRequest = axios.get( 'http://localhost:8000/api/rank/top' )
  // }

  // pushNickname() {
  //   this.pushRank(this.user, this.score)
  // }
  //
  // getScores() {
  //   this.getTopScores()
  //   console.log(this.state)
  // }

  render () {
    const topScores = this.state.topTenScores.map((c,i) => {
      return (
        <div>
       <li key={i} className = 'score'>{c.nickname}<a>{c.score}</a></li>

       </div>
      )
    })
    return (
      <div>
        <button className='leaderboardOpen' onClick={ () => this.openModal() }>Leaderboard</button>
        <Leaderboard isOpen={this.state.isModalOpen} onClose={() => this.closeModal()}>
          <div className='nickname-height' ref='nicknameHeight'>
            <h1>ENTER NICKNAME</h1>
            <input placeholder='Nickname'></input>
            <button onClick={(e) => this.submitButton()} >Submit</button>
          </div>
          <div className='modal-height' ref='modalHeight'>
            <h1>Leaderboard</h1>
            <p>top ten scores</p>
            {topScores}
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
