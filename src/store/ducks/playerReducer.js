import { images } from '../../components/GamePage/GameLogic/mediaRepos'


// INITIAL STATE
////////////////
const initialState = {
    keys : {
        left  : false,
        right : false,
        up    : false,
        down  : false,
        strafeLeft : false,
        strafeRight : false,
        space : false,
      },
    player: {
        context: null,
        x: 400,
        y: 100,
        img: images.ship,
        width: images.ship.width, 
        height: images.ship.height,
        imgCenterX: images.ship.width / 2,
        imgCenterY: images.ship.height / 2,
        dx: 0,
        dy: 0,
        speed: 6,
        orientation: 0,
        turnSpeed: 3,
        lastShot: 0,
        fireRate: 333,
        isFiring: false
    },
    bulletParams: {
        img: images.bullet,
        width: images.bullet.width,
        height: images.bullet.height,
        imgCenterX: images.bullet.width / 2,     
            imgCenterY: images.bullet.height / 2,
        bulletSpeed: 17,
        bulletCapacity: 100
    },
      playerHealth: 0,
      playerBulletPool: {}
    }




// CONSTANTS
////////////


const SET_KEYS = "SET_KEYS"
const SET_PLAYER = "SET_PLAYER"
const SET_PLAYER_BULLETS = "SET_PLAYER_BULLETS"
const UPDATE_PLAYER_HEALTH = "UPDATE_PLAYER_HEALTH"




// REDUCER
//////////

export default function playerReducer( state=initialState, action ) {

  switch(action.type) {

    case SET_KEYS:
        return Object.assign({},{
          ...state,
          keys: action.payload
        })

    case SET_PLAYER:
        return Object.assign({},{
          ...state,
          player: action.payload
        })

    case SET_PLAYER_BULLETS:
        return Object.assign({},{
          ...state,
          playerBulletPool: action.payload
        })

    case UPDATE_PLAYER_HEALTH:
        return Object.assign({},{
          ...state,
          playerHealth: action.payload
        })

    default: return state
  }
}





// ACTION CREATORS
//////////////////
export function setKeys(KeyStatus) {
  return {
    type: SET_KEYS,
    payload: KeyStatus
  }
}

export function setPlayer(player) {
  return {
    type: SET_PLAYER,
    payload: player
  }
}

export function setPlayerBulletPool(bullets) {
  return {
    type: SET_PLAYER_BULLETS,
    payload: bullets
  }
}

export function updatePlayerHealth(health) {
  return {
    type: UPDATE_PLAYER_HEALTH,
    payload: health
  }
}