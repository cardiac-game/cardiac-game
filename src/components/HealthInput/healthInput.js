import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom'; // to link to the game
import { getFood } from '../../services/nutrition.service'



class HealthInput extends Component {
    render() {
        return (
        <div>
            <h1>HI THIS IS THE HEALTH INPUT PAGE</h1>
            <button onClick={this.props.getFood('nuggets')}>PUSH</button>
        </div>
        )
    }
}

//hook up to store
function mapStateToProps(state){
  return state;
}

export default connect(mapStateToProps, {getFood})(HealthInput);
