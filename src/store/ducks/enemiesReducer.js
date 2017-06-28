// INITIAL STATE
////////////////

const initialState = {
  
      bacteriaPool: [],
      virusPool: [],
      cholesterolPool: [],
      sugarPool: [],

      virus: {},
      bacteria: {},
      sugar: {},
      cholesterol: {}
    }




  // CONSTANTS
////////////

const UPDATE_BACTERIA = "UPDATE_BACTERIA"
const UPDATE_VIRUS = "UPDATE_VIRUS"
const UPDATE_CHOLESTEROL = "UPDATE_CHOLESTEROL"
const UPDATE_SUGAR = "UPDATE_SUGAR"


// REDUCER
//////////

export default function enemiesReducer( state=initialState, action ) {

  switch(action.type) {

    case UPDATE_BACTERIA:
        return Object.assign({},{
          ...state,
          bacteriaPool: action.payload
        })

    case UPDATE_VIRUS:
        return Object.assign({},{
          ...state,
          virusPool: action.payload
        })

    case UPDATE_CHOLESTEROL:
        return Object.assign({},{
          ...state,
          cholesterolPool: action.payload
        })

    case UPDATE_SUGAR:
        return Object.assign({},{
          ...state,
          sugarPool: action.payload
        })

    default: return state
  }
}




// ACTION CREATORS
//////////////////
export function updateBacteria(bacteriaPool) {
  return {
    type: UPDATE_BACTERIA,
    payload: bacteriaPool
  }
}

export function updateVirus(virusPool) {
  return {
    type: UPDATE_VIRUS,
    payload: virusPool
  }
}

export function updateCholesterol(cholesterolPool) {
  return {
    type: UPDATE_CHOLESTEROL,
    payload: cholesterolPool
  }
}

export function updateSugar(sugarPool) {
  return {
    type: UPDATE_SUGAR,
    payload: sugarPool
  }
}

