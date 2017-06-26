import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
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
            // all foods called in by api
            allFoodsArray: [],
            // a user's chosen foods
            chosenFoodsArray: [],
            // chosenFoodsNutrition is the reduced object of the sum of all a user's nutrients from chosenFoodsArray
            chosenFoodsNutrition: {}
        }

    }

    getFoodsArray(item) {
        axios.get('http://localhost:8000/api/foods?item='+item)
            .then(response => {
                // this block of code strips the , UPC: 1234567 from the name
                let allFoodsArray = response.data.list.item
                allFoodsArray.map(obj => {
                    let result = obj.name;
                    if (result.includes(', UPC')) {
                    const regexp = /.*?(?=, UPC)/
                    const matches_array = result.match(regexp);

                    result = matches_array[0]
                    }
                    obj.name = result.toUpperCase();
                })

                // this block of code eliminates all duplicates from then end to the beginning of the array
                for(let i = allFoodsArray.length-1; i > 0; i--){
                   for(let j = i-1; j >= 0; j--){
                        if (allFoodsArray[i].name === allFoodsArray[j].name){
                            allFoodsArray.splice(j,1)
                        }
                    } 
                }

                this.setState({
                    allFoodsArray: allFoodsArray
                })
            });
    }

    // add the clicked item to the user's list of collected items
    addToUserList(ndbno) {
        axios.get('http://localhost:8000/api/nutrition?ndbno='+ndbno)
            .then(response => {

                let singularUserFood = response.data.report.food
                
                let result = singularUserFood.name;
                if (result.includes(', UPC')) {
                    const regexp = /.*?(?=, UPC)/
                    const matches_array = result.match(regexp);

                    result = matches_array[0]
                }
                singularUserFood.name = result.toUpperCase();
        

                singularUserFood.qty=1;
                this.setState({
                    chosenFoodsArray: [...this.state.chosenFoodsArray, singularUserFood],
                    chosenFoodsNutrition: Object.assign({}, this.arrayOfObjectsReducer([...this.state.chosenFoodsArray, singularUserFood]))
                })
            });
    }

    // remove the clicked item from user's list
    removeUserFood(index) {
        this.setState({
            chosenFoodsArray: [...this.state.chosenFoodsArray.slice(0, index),...this.state.chosenFoodsArray.slice(index+1)],
            chosenFoodsNutrition: Object.assign({}, this.arrayOfObjectsReducer([...this.state.chosenFoodsArray.slice(0, index),...this.state.chosenFoodsArray.slice(index+1)]))
        })
    }

    //update the servings of each user item
    updateServings(index, servings){
        const updatedServing = Object.assign({}, this.state.chosenFoodsArray[index], {qty: servings})
        const newChosenFoodsArray = [...this.state.chosenFoodsArray.slice(0, index), updatedServing,...this.state.chosenFoodsArray.slice(index+1)]
        this.setState({
             chosenFoodsArray: newChosenFoodsArray,
             chosenFoodsNutrition: Object.assign({}, this.arrayOfObjectsReducer(newChosenFoodsArray))             
        })
        
    }

    //reduce the array of objects and their nutrition down to a single object which is the sum of all nutrients
    arrayOfObjectsReducer(arr){
        let reducedObject = {}
        arr.forEach(foodObj => {
            foodObj.nutrients.forEach(nutrientObj =>{
                if (!reducedObject.hasOwnProperty(nutrientObj.name)){
                    reducedObject[nutrientObj.name] = {
                        unit: nutrientObj.unit,
                        value: parseInt(nutrientObj.value, 10)*foodObj.qty
                    }
                } else {
                    reducedObject[nutrientObj.name] = Object.assign({}, reducedObject[nutrientObj.name], {
                        value: reducedObject[nutrientObj.name].value + (parseInt(nutrientObj.value, 10)*foodObj.qty)
                    })
                }
            })
        })

        return reducedObject
    }

    render() {

        // display the list of all foods return by the user search
        const listOfFoods = this.state.allFoodsArray.map((item => {
            return (
                <div key={item.ndbno} onClick={() => this.addToUserList(item.ndbno)}>{item.name}</div>
            )
        }))

        // display the list of all the foods the user has clicked on/ collected
        const listOfUserFoods = this.state.chosenFoodsArray.map((item, i) => {
            return (
                <div key={i}>
                <div>{item.name}</div>
                <span>Serving Size: {item.nutrients[0].measures[0].qty} {item.nutrients[0].measures[0].label}</span>
                <span>Servings:</span>
                <input placeholder={this.state.chosenFoodsArray[i].qty} onChange={e => this.updateServings(i, e.target.value)}/>
                <button onClick={() => this.removeUserFood(i)}>X</button>
                </div>
            )
        })

        // display the reduced nutrient object to the user with all of its properties and values
        const arrayOfNutrients = Object.keys(this.state.chosenFoodsNutrition)
        const nutritionInfo = arrayOfNutrients.map((nutrient, i) => {
            return (
                <div key={i}>
                    <span>{nutrient} : {this.state.chosenFoodsNutrition[nutrient].value} {this.state.chosenFoodsNutrition[nutrient].unit}</span>
                </div>
            )
        })

        return (
        <div className="input-input">
            <div className="nutrition-info">{ nutritionInfo }</div>       
            <div className="selected-info">{ listOfUserFoods }</div>
            <input className="input-box" value={this.state.userInput} onChange={e => this.setState({userInput: e.target.value})}></input>
            <button className="input-button-1" disabled={this.state.userInput ? false : true} onClick={() => this.getFoodsArray(this.state.userInput)}>Search</button>
            <button className="input-button-2" disabled={this.state.chosenFoodsArray.length === 0 ? true : false}>Submit</button>
            <div className="food-list">{ listOfFoods }</div>
        </div>
        )

        
    }
}

//hook up to store
function mapStateToProps(state){
    // console.log(state.nutritionReducer)
    return state.nutritionReducer;
}

export default connect(mapStateToProps)(HealthInput);

/// get rid of upc
// filter out duplicates