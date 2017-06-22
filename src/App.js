import React, { Component } from 'react';
import { connect } from 'react-redux';

import HomePage from './components/HomePage/HomePage'
import GamePage from './components/GamePage/GamePage'

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <GamePage />
       <HomePage></HomePage>
      </div>
    );
  }
}

function mapStateToProps(state){
  return state
}

export default connect(mapStateToProps)(App);
