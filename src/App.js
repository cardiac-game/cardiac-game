// 
// 
//  CURRENTLY NOT IN USE
// 
// 


import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomePage from './components/HomePage/homePage'

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
       <HomePage></HomePage>
      </div>
    );
  }
}

function mapStateToProps(state){
  return state
}

export default connect(mapStateToProps)(App);
