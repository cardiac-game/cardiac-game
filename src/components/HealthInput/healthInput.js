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
        axios.get('/api/foods?item='+item)
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
        axios.get('/api/nutrition?ndbno='+ndbno)
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

    sendToGameInput(){
        // initialize the multipliers
        let inputsObj = {
            playerInitialSpeed: 1,
            playerOverallSpeed: 1,
            playerFireRate: 1,
            playerMaxShield: 1,

            bulletBonusDamage: 1,

            // THESE ARE ADDITIONAL SPAWNED ENEMIES - can never be lower than 0 (range from 0 to 1)
            sugarAmount: 1,
            cholesterolAmount: 1,

            enemySpeed: 1,
            maxOnScreenEnemies: 1,

            powerupHeartHealth: 0, // 0 for powerups is the bare minimum (0 powerups of this type should spawn)
            powerupFirePower: 0,
            powerupFireRate: 0,
            powerupCholesterolBomb: 0,
            powerupPlayerMaxShield: 0,
        }
        
        const arrayOfNutrients = Object.keys(this.state.chosenFoodsNutrition)

        // based on 2500 cal diet : 
        // 375g Carbs -> 60% of cals (max) (Punishment over this range - Under this range scales to 45%)
            // Sugars should be at 0% of Carbs but can go to most unhealthy at 100% of Carbs
        // 80g Fat -> 30% of cals (max) (Punishment over this range - Under this range scales to 20%)
        // 70g Protein -> 10% of cals (min) (Punishment under this range - Over this range scales to 35%)
        // Cholesterol - over 300mg is bad - scales from 300mg to 600mg (nothing happens under this range)
        // Sodium is flat rate over 2400mg is bad - scales from 2400mg to 4800mg (nothing happens under this range)
        // Fiber is flat rate 30g is normal (scales from 30g to 60g)

        const totalCals = this.state.chosenFoodsNutrition.Energy.value
        
        arrayOfNutrients.forEach(nutrient => {
            switch (nutrient){
                case "Total lipid (fat)": // decrease speed and fire rate
                    const percentFat = (this.state.chosenFoodsNutrition[nutrient].value * 9) / totalCals
                    if (percentFat > .3) {
                        inputsObj.playerOverallSpeed -= 1*(percentFat-.3);
                        inputsObj.playerFireRate -= 1*(percentFat-.3);  
                    }                  
                    break;
                case "Protein": // increase speed and bullet dmg
                    const percentProtein = (this.state.chosenFoodsNutrition[nutrient].value * 4) / totalCals
                    if (percentProtein > .1){
                        inputsObj.playerOverallSpeed += 1*(percentProtein-.1);
                        inputsObj.bulletBonusDamage += 1*(percentProtein-.1); 
                    } else {
                        inputsObj.playerOverallSpeed -= 1*(percentProtein);
                        inputsObj.bulletBonusDamage -= 1*(percentProtein);
                    }
                    break;
                case "Carbohydrate, by difference": // decrease overall speed and increase shield
                    const percentCarbs = (this.state.chosenFoodsNutrition[nutrient].value * 4) / totalCals
                    if (percentCarbs > .6){
                        inputsObj.playerOverallSpeed -= 1*(percentCarbs-.6);
                        inputsObj.playerMaxShield += 1*(percentCarbs-.6);
                    }                    
                    break;
                case "Sodium, Na": // increase enemy speed (2400mg DV)
                    if (this.state.chosenFoodsNutrition[nutrient].value > 2400){
                        inputsObj.enemySpeed += 1*(this.state.chosenFoodsNutrition[nutrient].value/2400);
                    }
                    break;
                case "Cholesterol": // increase Cholesterol amount and increase max-onscreen enemies (300mg DV)
                    const percentCholesterol = this.state.chosenFoodsNutrition[nutrient].value / totalCals // should be under 300/2500 = .12
                    if (percentCholesterol > 0.12) {
                        inputsObj.cholesterolAmount += 1*(percentCholesterol-0.12);
                        inputsObj.maxOnScreenEnemies += 1*(percentCholesterol-0.12);
                    }
                    break;
                case "Fiber, total dietary": // decrease cholesterol amount and decrease sugar amount (30g DV)
                    if (this.state.chosenFoodsNutrition[nutrient].value > 30){
                        const fiberIntakeOverDV = this.state.chosenFoodsNutrition[nutrient].value / 30
                        inputsObj.cholesterolAmount -= .5*(fiberIntakeOverDV - 1);
                        inputsObj.sugarAmount -= .5*(fiberIntakeOverDV - 1);
                    }
                    break;
                case "Sugars, total": //increase sugar amount and initial player speed
                    if (this.state.chosenFoodsNutrition[nutrient].value > 0){
                        const percentSugar = this.state.chosenFoodsNutrition["Sugars, total"].value / this.state.chosenFoodsNutrition["Carbohydrate, by difference"].value
                        inputsObj.sugarAmount += 1*percentSugar;
                        inputsObj.playerInitialSpeed += 1*percentSugar;
                    }
                    break;
                // VITAMINS ----------------------------------
                case "Calcium, Ca": // Heart Health (1000mg DV)
                    inputsObj.powerupHeartHealth += .05*(this.state.chosenFoodsNutrition[nutrient].value/1000);
                    break;
                case "Thiamin": // HH (1.5mg DV)
                    inputsObj.powerupHeartHealth += .05*(this.state.chosenFoodsNutrition[nutrient].value/1.5);
                    break;
                case "Folate, DFE": // HH (400mcg DV)
                    inputsObj.powerupHeartHealth += .05*(this.state.chosenFoodsNutrition[nutrient].value/400);
                    break;
                case "Zinc, Zn":  //HH (15mg DV)
                    inputsObj.powerupHeartHealth += .05*(this.state.chosenFoodsNutrition[nutrient].value/15);
                    break;
                case "Vitamin K (phylloquinone)":  //HH (78 mcg DV)
                    inputsObj.powerupHeartHealth += .05*(this.state.chosenFoodsNutrition[nutrient].value/78);
                    break;
                case "Riboflavin": // Fire Rate (1.5mg DV)
                    inputsObj.powerupFireRate += .05*(this.state.chosenFoodsNutrition[nutrient].value/1.5);
                    break;
                case "Vitamin B-6": // FR (2mg DV)
                    inputsObj.powerupFireRate += .05*(this.state.chosenFoodsNutrition[nutrient].value/2);                    
                    break;
                case "Vitamin B-12": // FR (6mg DV)
                    inputsObj.powerupFireRate += .05*(this.state.chosenFoodsNutrition[nutrient].value/6);                    
                    break;
                case "Niacin": // Cholesterol Bomb (9mg DV)
                    inputsObj.powerupCholesterolBomb += .05*(this.state.chosenFoodsNutrition[nutrient].value/9);
                    break;
                case "Vitamin E (alpha-tocopherol)": // Max Shield increase (30IU DV)
                    inputsObj.powerupPlayerMaxShield += .05*(this.state.chosenFoodsNutrition[nutrient].value/30);
                    break;
                case "Iron, Fe": // Fire Power (18mg DV)
                    inputsObj.powerupFirePower += .05*(this.state.chosenFoodsNutrition[nutrient].value/18);
                    break;
                case "Magnesium, Mg":    //HH FR (400mg DV)
                    inputsObj.powerupHeartHealth += .05*(this.state.chosenFoodsNutrition[nutrient].value/400);
                    inputsObj.powerupFireRate += .05*(this.state.chosenFoodsNutrition[nutrient].value/400);                    
                    break;
                case "Vitamin C, total ascorbic acid": // FP MS (60mg DV)
                    inputsObj.powerupFirePower += .05*(this.state.chosenFoodsNutrition[nutrient].value/60);
                    inputsObj.powerupPlayerMaxShield += .05*(this.state.chosenFoodsNutrition[nutrient].value/60);
                    break;
                case "Vitamin D": // FP MS (400IU DV)
                    inputsObj.powerupFirePower += .05*(this.state.chosenFoodsNutrition[nutrient].value/400);
                    inputsObj.powerupPlayerMaxShield += .05*(this.state.chosenFoodsNutrition[nutrient].value/400);                    
                    break;
                case "Vitamin A, IU": // FP MS (5000IU DV)
                    inputsObj.powerupFirePower += .05*(this.state.chosenFoodsNutrition[nutrient].value/5000);
                    inputsObj.powerupPlayerMaxShield += .05*(this.state.chosenFoodsNutrition[nutrient].value/5000);                    
                    break;
                case "Potassium, P": // FR FP MS (5000mg DV)
                    inputsObj.powerupFireRate += .05*(this.state.chosenFoodsNutrition[nutrient].value/5000);                    
                    inputsObj.powerupFirePower += .05*(this.state.chosenFoodsNutrition[nutrient].value/5000);                  
                    inputsObj.powerupPlayerMaxShield += .05*(this.state.chosenFoodsNutrition[nutrient].value/5000);
                    break;         
            }
        })
        
        console.log(inputsObj)

        postGameInput(inputsObj)
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

                <div className="input-gameplay"><span className="rules-title">
                HOW TO PLAY</span>
                <hr/>
                <span className="input-info-instruct">As an agent for your body and an ally to your immune system your mission is to pilot your ship and defend the heart from a myriad of enemies for ten increasingly difficult waves.
                <br/><br/>
                Each wave represents one day of eating nothing but the diet entered below. The macronutrients and vitamins consumed play a vital role in your body’s ability to fight against the various enemies encountered through everyday life.
                <br/><br/>
                Consume a healthy diet and the game will reflect the strength of your body against those threats, but consume a diet rife with junk food and the game will become nearly impossible.
                <br/><br/>
                In the body, use your skills and any advantages gained from your diet to counterattack the microbes and organic molecules encircling the heart.
                <br/><br/>
                A diet high in protein makes you strong and fast while a diet high in fat slows you down. Besides macronutrients, micronutrients like vitamins play a crucial role in the health of your body. Vitamins essential to cell growth and division provide opportunities to pick up powerups which heal the heart.
                <br/><br/>
                The key to victory in this game lies in properly proportioned macronutrients and a diverse assortment of all the necessary vitamins and minerals.
                
                {/*<br/><br/>
                Use the arrow keys to turn the ship. Forward arrow accelerates and back arrow reverses.
                <br/><br/>
                'A' strafes left and 'D' strafes right.
                <br/><br/>
                Press 'SPACEBAR' to shoot, and 'B' to release a Cholesto-Bomb.*/}
                
                </span>
                </div>
                <div className="input-enemies"><span className="rules-title">
                ENEMIES</span>
                <hr/>
                <span className="little-title">SUGAR</span>
                <br/><br/>
                <span className="input-info-title">Description: </span><span className="input-info-text">
                A white, transperent, crystalline substance which tears artery walls on impact.
                </span>
                <br/><br/>
                <span className="input-info-title">Attack Method: </span><span className="input-info-text">
                It ricochets around the vains and arteries, it is just a matter of time before your heart gets in the way.
                </span>
                <hr/>
                <span className="little-title">CHOLESTEROL</span>
                <br/><br/>
                <span className="input-info-title">Description: </span><span className="input-info-text">
                A whitish or sometimes yellowish blob-like goo, with a habbit of getting stuck in the worst places.
                </span>
                <br/><br/>
                <span className="input-info-title">Attack Method: </span><span className="input-info-text">
                It carelessly floats around the body finding little crevasses and openings to clog.
                </span>
                 <hr/>
                <span className="little-title">BACTERIA</span>
                <br/><br/>
                <span className="input-info-title">Description: </span><span className="input-info-text">
                An odd, mustard colored creature that multiplies and speads wherever it can.
                </span>
                <br/><br/>
                <span className="input-info-title">Attack Method: </span><span className="input-info-text">
                Relentlessly honing in on the heart, bacteria amasses into a swarm, prime for attack.
                </span>
                <hr/>
                <span className="little-title">VIRUS</span>
                <br/><br/>
                <span className="input-info-title">Description: </span><span className="input-info-text">
                Nasty and green with the shape of a spikey sea urchin, this microbe should not be taken lightly.
                </span>
                <br/><br/>
                <span className="input-info-title">Attack Method: </span><span className="input-info-text">
                A virus spreads by shooting its DNA into other cells, corrupting them into another virus.
                </span>
                </div>
                
                <div className="input-powerups"><span className="rules-title">
                POWER-UPS</span>
                <hr/>
                <span className="little-title">HEALTH PACK </span>
                <span className="input-info-text">
                - (Blue Orb)
                </span>
                <br/><br/>
                <span className="input-info-title">Benefits: </span><span className="input-info-text">
                Heals the heart by 50 points.
                </span>
                <br/><br/>
                <span className="input-info-title">Requirements: </span><span className="input-info-text">
                Calcium, Folate, Magnesium, Thiamin, Vitamin K, Zinc
                </span>
                <hr/>
                <span className="little-title">MAX SHIELD </span>
                <span className="input-info-text">
                - (Yellow Orb)
                </span>
                <br/><br/>
                <span className="input-info-title">Benefits: </span><span className="input-info-text">
                Increases the ships max shield by 10%. (Game starts with a max shield of 10%.)
                </span>
                <br/><br/>
                <span className="input-info-title">Requirements: </span><span className="input-info-text">
                Potassium, Vitamin-A, Vitamin C, Vitamin D, Vitamin E
                </span>
                <hr/>
                <span className="little-title">FIRE POWER </span>
                <span className="input-info-text">
                - (Red Orb)
                </span>
                <br/><br/>
                <span className="input-info-title">Benefits: </span><span className="input-info-text">
                Increases weapon damage by 1 point.
                </span>
                 <br/><br/>
                <span className="input-info-title">Requirements: </span><span className="input-info-text">
                Iron, Potassium, Vitamin A, Vitamin C, Vitamin D
                </span>
                <hr/>
                <span className="little-title">FIRE RATE</span>
                <span className="input-info-text">
                - (Orange Orb)
                </span>
                <br/><br/>
                <span className="input-info-title">Benefits: </span><span className="input-info-text">
                Increase weapon fire rate by 100%.
                </span>
                <br/><br/>
                <span className="input-info-title">Requirements: </span><span className="input-info-text">
                Magnesium, Potassium, Riboflavin, Vitamin B-6, Vitamin B-12
                </span>
                <hr/>
                <span className="little-title">CHOLESTO-BOMB</span>
                <span className="input-info-text">
                - (Green Orb)
                </span>
                <br/><br/>
                <span className="input-info-title">Benefits: </span><span className="input-info-text">
                Destroys all cholesterol currently on screen.
                </span>
                <br/><br/>
                <span className="input-info-title">Requirements: </span><span className="input-info-text">
                Niacin
                </span>
                </div>

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