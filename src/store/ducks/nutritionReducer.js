const initialState = {
  inputsObj: {
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
}

const POST_GAME_INPUT = "POST_GAME_INPUT";


export default function nutritionReducer( state = initialState, action ) {
  switch( action.type ) {
    case POST_GAME_INPUT:
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
