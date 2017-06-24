import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom'; // to link to the game
// import { getSearchFood, getSpecific} from '../../services/nutrition.service'
import './healthInput.css'

// import {removeFood} from '../../store/ducks/nutritionReducer';

import axios from 'axios';


class HealthInput extends Component {
    constructor(){
        super()

        this.state = {
            userInput: '',
            allFoodsArray: [],
            chosenFoodsArray: [],
            chosenFoodsNutrition: {}
        }

    }

    getFoodsArray(item) {
        axios.get('http://localhost:8000/api/foods?item='+item)
            .then(response => {
                this.setState({
                    allFoodsArray: response.data.list.item
                })
                console.log(this.state.allFoodsArray)
            });
    }

    addToUserList(ndbno) {
        axios.get('http://localhost:8000/api/nutrition?ndbno='+ndbno)
            .then(response => {
                response.data.report.food.qty=1;
                this.setState({
                    chosenFoodsArray: [...this.state.chosenFoodsArray, response.data.report.food]
                })
                console.log(this.state.chosenFoodsArray)
            });
    }

    removeUserFood(index) {
        this.setState({
            chosenFoodsArray: [...this.state.chosenFoodsArray.slice(0, index),...this.state.chosenFoodsArray.slice(index+1)]
        })
    }

    updateServings(index, servings){
        const updatedServing = Object.assign({}, this.state.chosenFoodsArray[index], {qty: servings})
        this.setState({
             chosenFoodsArray: [...this.state.chosenFoodsArray.slice(0, index), updatedServing,...this.state.chosenFoodsArray.slice(index+1)]
        })
    }

    arrayOfObjectsReducer(arr){
        let reducedObject = {}


        return reducedObject
    }

    render() {
        let listOfFoods = 'Please search foods'
        let listOfUserFoods = 'Please add food'
        

        if (this.state.allFoodsArray !== []){
            listOfFoods = this.state.allFoodsArray.map((item => {
                return (
                    <div key={item.ndbno} onClick={() => this.addToUserList(item.ndbno)}>{item.name}</div>
                )
            }))
        }

        if (this.state.chosenFoodsArray !== []){
            listOfUserFoods = this.state.chosenFoodsArray.map(((item, i) => {
                return (
                    <div key={i}>
                    <div>{item.name}</div>
                    <span>Serving Size: {item.nutrients[0].measures[0].qty} {item.nutrients[0].measures[0].label}</span>
                    <span>Servings:</span>
                    <input placeholder={this.state.chosenFoodsArray[i].qty} onChange={e => this.updateServings(i, e.target.value)}/>
                    <button onClick={() => this.removeUserFood(i)}>X</button>
                    </div>
                )
            }))
        }

        return (
        <div>
            <h1>HI THIS IS THE HEALTH INPUT PAGE</h1>
            {/*NEED SUBMIT BUTTON*/}
            <div className="HI-nutrition-info">{ listOfUserFoods }</div>
            <input value={this.state.userInput} onChange={e => this.setState({userInput: e.target.value})}></input>
            <button disabled={this.state.userInput ? false : true} onClick={() => this.getFoodsArray(this.state.userInput)}>PUSH</button>
            <button disabled={this.state.chosenFoodsArray.length === 0 ? true : false}>Submit</button>
            
            <div className="HI-food-list">{ listOfFoods }</div>
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
