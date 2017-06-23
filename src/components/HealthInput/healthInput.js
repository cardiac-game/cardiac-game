import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom'; // to link to the game
import { getSearchFood, getSpecific } from '../../services/nutrition.service'



class HealthInput extends Component {
    constructor(){
        super()

        this.state = {
            userInput: ''
        }
    }

    render() {

        const listOfFoods = this.props.foodList.map((item => {
            return (
                <div key={item.ndbno} onClick={() => getSpecific(item.ndbno)}>{item.name}</div>
            )
        }))

        return (
        <div>
            <h1>HI THIS IS THE HEALTH INPUT PAGE</h1>
            {/*NEED SUBMIT BUTTON*/}
            <input value={this.state.userInput} onChange={e => this.setState({userInput: e.target.value})}></input>
            <button disabled={this.state.userInput ? false : true} onClick={() => getSearchFood(this.state.userInput)}>PUSH</button>
            { listOfFoods }
        </div>
        )
    }
}

//hook up to store
function mapStateToProps(state){
    console.log(state.nutritionReducer)
    return state.nutritionReducer;
}

export default connect(mapStateToProps)(HealthInput);
