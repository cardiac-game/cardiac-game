const initialState = {
  loading: false,
  foodList: [],
  foodNutrition: []
}

const GET_LIST = "GET_LIST";
const GET_SPECIFIC_FOOD = "GET_SPECIFIC_FOOD";

export default function nutritionReducer( state = initialState, action ) {
  switch( action.type ) {
    case GET_LIST + "_PENDING":
      return Object.assign({}, state, {loading: true});

    case GET_LIST + "_FULFILLED":
      return Object.assign({}, state, {
        loading: false,        
        foodList: action.payload.list.item});

    case GET_SPECIFIC_FOOD + "_PENDING":
      return Object.assign({}, state, {loading: true});

    case GET_SPECIFIC_FOOD + "_FULFILLED":
      return Object.assign({}, state, {
        loading: false,        
        foodNutrition: action.payload});

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
