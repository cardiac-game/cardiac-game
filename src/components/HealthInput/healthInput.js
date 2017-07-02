import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './healthInput.css'

import { postGameInput } from '../../store/ducks/nutritionReducer';

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
            chosenFoodsNutrition: {},
            
            error: false,

            redirect: false,

            map: undefined,

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
                    allFoodsArray: allFoodsArray,
                    error: false
                })
            }).catch(err => {
                this.setState({error: true})
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
        console.log(this.state.chosenFoodsNutrition)
        return reducedObject
    }

    sendToGameInput(){
        let inputsObj = {
            playerInitialSpeed: 1,
            playerOverallSpeed: 1,
            playerFireRate: 1,
            playerMaxShield: 1,

            bulletBonusDamage: 1,

            sugarAmount: 1,
            sugarSpeed: 1,
            bacteriaVirusSpeed: 1
        }
        
        // based on 2500 cal diet : 
        // 375g Carbs -> 60% of cals (max) (Punishment over this range - Under this range scales to 45%)
            // Sugars should be at 0% of Carbs but can go to most unhealthy at 100% of Carbs
        // 80g Fat -> 30% of cals (max) (Punishment over this range - Under this range scales to 20%)
        // 70g Protein -> 10% of cals (min) (Punishment under this range - Over this range scales to 35%)
        // Cholesterol - over 300mg is bad - scales from 300mg to 600mg (nothing happens under this range)
        // Sodium is flat rate over 2400mg is bad - scales from 2400mg to 4800mg (nothing happens under this range)
        // Fiber is flat rate 30g is normal (scales from 30g to 60g)
        
        
        

        // postGameInput(inputsObj)
        this.setState({
            redirect: true
        })
    }

    handleMapChange(map){
        this.setState({ map })
    }


    render() {
        if (this.state.redirect) {
            return <Redirect to='/game' />
        }

        // display the list of all foods return by the user search
        const listOfFoods = this.state.allFoodsArray.map((item => {
            return (
                <div className="list-border" key={item.ndbno} onClick={() => this.addToUserList(item.ndbno)}>{item.name}</div>
            )
        }))

        // display the list of all the foods the user has clicked on/ collected
        const listOfUserFoods = this.state.chosenFoodsArray.map((item, i) => {
            return (
                <div className="list-border" key={i}>
                <div>{item.name}</div>
                <span> Servings: </span>
                <input  className="input-size" placeholder={this.state.chosenFoodsArray[i].qty} onChange={e => this.updateServings(i, e.target.value)}/>
                <span> (Serving Size: {item.nutrients[0].measures[0].qty} {item.nutrients[0].measures[0].label})</span>
                
                <button className="remove-button" onClick={() => this.removeUserFood(i)}>X</button>
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

        const errorBox = function() {
            return (
                <div className="errorBox"><div>No search results.</div></div>
            )
        }

        return (
        <div className="input-input">
            <div className="input-intro">
                <div className="input-curtain"></div>
            </div>
            
            <div className="input-boxy-0">
            
                <div className="input-boxy-1">
                    <div className="input-boxy-11">
                        <form onSubmit={() => this.getFoodsArray(this.state.userInput)}>
                            <input className="input-bar" value={this.state.userInput} onChange={e => this.setState({userInput: e.target.value})}></input>
                            <button type="submit" className="input-button-1" disabled={this.state.userInput ? false : true}>SEARCH</button>
                        </form>                        
                    </div>
                    {
                        (listOfFoods.length == 0 || this.state.error === false)
                        ?
                    <div className="input-list">
                    <div className="food-list">{this.state.error ? errorBox() : listOfFoods} </div>
                    </div>
                    :
                  
                    <div className="first-search">
                    <div className="input-curtain-first">{this.state.error ? errorBox() : ""}</div>
                    </div>
           
                    }
                </div>
              {
                    listOfUserFoods.length
                    ?
                <div className="input-boxy-2">
            
                    <div className="input-boxy-21">
                        <div className="game-map-title">QUANTITY</div>
                        <div className="selected-info">{ listOfUserFoods }</div>
                    </div>

                    <div className="input-boxy-22">
                        <div className="game-map-title">NUTRITION DATA</div>
                        <div className="nutrition-info">{ nutritionInfo }</div>
                           </div>
                           <div className="input-boxy-maps">
                               <div className="game-map-title">GAME MAP</div>
                            <form>
                               <input className="input-radio" type="radio" name="map" onClick={() => this.handleMapChange(0)}/> CANCEROUS<br/>
                               <input className="input-radio" type="radio" name="map" onClick={() => this.handleMapChange(1)}/> CARNIVORE<br/>
                               <input className="input-radio" type="radio" name="map" onClick={() => this.handleMapChange(2)}/> GALACTIC<br/>
                               <input className="input-radio" type="radio" name="map" onClick={() => this.handleMapChange(3)}/> HEART ATTACK<br/>
                               <input className="input-radio" type="radio" name="map" onClick={() => this.handleMapChange(4)}/> INFECTION<br/>
                               <input className="input-radio" type="radio" name="map" onClick={() => this.handleMapChange(5)}/> MICROSCOPIC<br/>
                               <input className="input-radio" type="radio" name="map" onClick={() => this.handleMapChange(6)}/> PARASITICAL<br/>
                            </form>
                           </div>
                    </div>
                    :
                    <div className="first-box">
                        <div className="input-curtain-first">
                            <div className="first-title">NDC (NUTRITION DATA CALCULATOR)</div>
                            <div className="first-text">The NDC can take in almost any food products from around the globe, extract the nutritional data from these products and calculate the data in a simple and presentable manner.
                                <br/><br/>
                                Inside the game you will experience a simulation, one that takes in the infomation that you have submited from the NDC and factor it into the gameplay. With this, you are altering your gaming experience in a unique way that raises awareness of what we should be eating and gives a fresh perspective on what nutrition our bodies need, as well as what we may need to be avoiding.
                                <br/><br/>
                                <span className="first-color">STEP ONE:</span> Search for a food item in the search bar to the left.
                                <br/><br/>
                                <span className="first-color">STEP TWO:</span> Select the foods you wish to test, or perhaps even the foods you have recently eaten.
                                <br/><br/>
                                <span className="first-color">STEP THREE:</span> A window for inputting quantities will appear, use this window to select how many servings you wish to submit. The default serving is 1.
                                <br/><br/>
                                <span className="first-color">STEP FOUR:</span> Don't forget to select the map you wish to play before submitting your NDC data to the game.
                                <br/><br/>
                                <span className="first-color">STEP FIVE:</span> Submit your data by pressing the submit button below.
                            </div>
                        </div>
                    </div>
                }        

            </div>

                    <div className="input-submit">
                    <button className="input-button-2" disabled={(this.state.chosenFoodsArray.length === 0 && this.state.map !== undefined) ? true : false} onClick={() => this.sendToGameInput()}>SUBMIT</button>
                    </div>
                  
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

//fix break when invalid input.