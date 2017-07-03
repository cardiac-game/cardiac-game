const initialState = {
  inputsObj: {}
}

const POST_GAME_INPUT = "POST_GAME_INPUT";


export default function nutritionReducer( state = initialState, action ) {
  switch( action.type ) {
    case POST_GAME_INPUT:
      console.log(action.payload)
      return Object.assign({}, state, {inputsObj: action.payload})
    default: return state;
  }
}

export function postGameInput( inputsObj ) {
  return {
    type: POST_GAME_INPUT,
    payload: inputsObj
  }
}
