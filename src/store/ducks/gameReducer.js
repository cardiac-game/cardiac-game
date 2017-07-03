// INITIAL STATE
////////////////
const initialState = {
      context: null,
      level: 1,
      levels: [],
      heartHealth: 0,
      currentScore: 0,
}
  

  // CONSTANTS
////////////


const SET_CONTEXT = "SET_CONTEXT"
const UPDATE_SCORE = "UPDATE_SCORE"
const MOVE_TO_NEXT_LEVEL = "MOVE_TO_NEXT_LEVEL"

const CONFIGURE_LEVELS = "CONFIGURE_LEVELS"




// REDUCER
//////////

export default function gameReducer( state=initialState, action ) {

  switch(action.type) {

    case UPDATE_SCORE:
        return Object.assign({},{
            ...state,
            currentScore: action.payload
        })
    
    case SET_CONTEXT:
        return Object.assign({},{
            ...state,
            context: action.payload
        })

    case CONFIGURE_LEVELS:
        return Object.assign({},{
            ...state,
            context: action.payload
        })

    default: return state
  }
}



// ACTION CREATORS
//////////////////
export function updateKeys(score) {
  return {
    type: UPDATE_SCORE,
    payload: score
  }
}

export function setContext(context) {
  return {
    type: SET_CONTEXT,
    payload: context
  }
}

export function configureLevels(levels) {
  return {
    type: CONFIGURE_LEVELS,
    payload: levels
  }
}

