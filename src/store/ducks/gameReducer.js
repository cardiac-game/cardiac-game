import images from '../../components/GamePage/GameLogic/mediaRepos'


// INITIAL STATE
////////////////
const initialState = {
    game: {
      screen: {
        width: window.innerWidth,
        height: window.innerHeight,
        ratio: window.devicePixelRatio || 1,
      },
      context: null,
      keys : {
        left  : false,
        right : false,
        up    : false,
        down  : false,
        strafeLeft : false,
        strafeRight : false,
        space : false,
      },
      level: 1,
      levels: [],
      heartHealth: 0,
      playerHealth: 0,
      currentScore: 0,
      player: {
        context: null,
        x: 400,
        y: 100,
        img: images.ship,
        width: images.ship.width,
        height: images.ship.height,
        centerX: images.ship.width / 2,
        centerY:images.ship.height / 2,
        dx: 0,
        dy: 0,
        speed: 6,
        orientation: 0,
        turnSpeed: 3,
        lastShot: 0,
        fireRate: 333,
    },

      playerBulletPool: [],
      particles: [],
      bacteriaPool: [],
      virusPool: [],
      cholesterolPool: [],
    }
  }




// CONSTANTS
////////////

const UPDATE_KEYS = "UPDATE_KEYS"

const SET_SCREEN = "SET_SCREEN"
const SET_CONTEXT = "SET_CONTEXT"
const SET_PLAYER = "SET_PLAYER"

const MOVE_TO_NEXT_LEVEL = "MOVE_TO_NEXT_LEVEL"


const UPDATE_SCORE = "UPDATE_SCORE"
const UPDATE_PLAYER = "UPDATE_PLAYER"
const UPDATE_PLAYER_BULLETS = "UPDATE_PLAYER_BULLETS"
const UPDATE_ENEMIES = "UPDATE_ENEMIES"




// REDUCER
//////////

export default function gameReducer( state=initialState, action ) {

  switch(action.type) {
    case UPDATE_KEYS:
        return Object.assign({},{
          ...state,
          game: {
            ...state.game,
            keys: action.payload
          }
        })
    
    case SET_CONTEXT: 
        return Object.assign({},{
          ...state,
          game: {
            ...state.game,
            context: action.payload
          }
        })

    case SET_SCREEN:
        return Object.assign({},state,{
          game: {
            screen: action.payload
            }
          })
    case SET_PLAYER:
        return Object.assign({},{
          ...state,
          game: {
            ...state.game,
            player: action.payload
          }
        })
      

    default: return state
  }

}



// ACTION CREATORS
//////////////////
export function updateKeys(KeyStatus) {
  return {
    type: UPDATE_KEYS,
    payload: KeyStatus
  }
}


export function setContext(context) {
  return {
    type: SET_CONTEXT,
    payload: context
  }
}

export function setScreen(screenInfo) {
  return {
    type: SET_SCREEN,
    payload: screenInfo
  }
}

export function setPlayer(player) {
  return {
    type: SET_PLAYER,
    payload: player
  }
}

export function updatePlayer(player) {
  return {
    type: UPDATE_PLAYER,
    payload: player
  }
}