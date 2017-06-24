const initialState = {
  loading: false,
  foodList: [],
  foodNutritionArray: []
}

const GET_LIST = "GET_LIST";
const GET_SPECIFIC_FOOD = "GET_SPECIFIC_FOOD";
const REMOVE_FOOD = "REMOVE_FOOD"

export default function nutritionReducer( state = initialState, action ) {
  switch( action.type ) {
    // // REMOVED FROM STORE AND PLACED LOCAL TO THE COMPONENT (HEALTHINPUT)
    // case GET_LIST + "_PENDING":
    //   return Object.assign({}, state, {loading: true});

    // case GET_LIST + "_FULFILLED":
    //   return Object.assign({}, state, {
    //     loading: false,        
    //     foodList: action.payload.list.item});

    // case GET_SPECIFIC_FOOD + "_PENDING":
    //   return Object.assign({}, state, {loading: true});

    // case GET_SPECIFIC_FOOD + "_FULFILLED":
    //   return Object.assign({}, state, {
    //     loading: false,        
    //     foodNutritionArray: [...state.foodNutritionArray, action.payload.report.food]});
    // case REMOVE_FOOD:
    //   return Object.assign({}, state, {foodNutritionArray: [...state.foodNutritionArray.slice(0, action.payload),...state.foodNutritionArray.slice(action.payload+1)]})
    default: return state;
  }
}

export function getList( promise ) {
  return {
    type: GET_LIST,
    payload: promise
  }
}

export function getSpecificFood( promise ) {
  return {
    type: GET_SPECIFIC_FOOD,
    payload: promise
  }
}

export function removeFood( index ) {
  return {
    type: REMOVE_FOOD,
    payload: index
  }
}
