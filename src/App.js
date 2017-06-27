import React, { Component } from 'react';
import { connect } from 'react-redux';

import HomePage from './components/HomePage/homePage'
import GamePage from './components/GamePage/GamePage'

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <GamePage />
      </div>
    );
  }
}

function mapStateToProps(state){
  return state
}

export default connect(mapStateToProps)(App);
