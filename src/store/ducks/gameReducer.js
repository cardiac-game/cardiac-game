// INITIAL STATE
////////////////
const initialState = {
      context: null,
      level: 1,
      levels: [
        {
          level: 1,
          
        }
        ],
      maxHeartHealth: 100,
      heartHealth: 0,
      currentScore: 0
}
  

  // CONSTANTS
////////////


const SET_CONTEXT = "SET_CONTEXT"
const UPDATE_SCORE = "UPDATE_SCORE"
const UPDATE_HEART_HEALTH = "UPDATE_HEART_HEALTH"
const MOVE_TO_NEXT_LEVEL = "MOVE_TO_NEXT_LEVEL"

const CONFIGURE_LEVELS = "CONFIGURE_LEVELS"




// REDUCER
//////////

export default function gameReducer( state=initialState, action ) {

  switch(action.type) {

    case UPDATE_SCORE:
        return Object.assign({},{
            ...state,
            currentScore: action.payload + state.currentScore
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

    case UPDATE_HEART_HEALTH:
        return Object.assign({},{
            ...state,
            heartHealth: action.payload
        })

    default: return state
  }
}



// ACTION CREATORS
//////////////////
export function updateScore(score) {
  return {
    type: UPDATE_SCORE,
    payload: score
  }
}

export function updateHeartHealth(health) {
  return {
    type: UPDATE_HEART_HEALTH,
    payload: health
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

