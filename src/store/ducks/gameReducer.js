const initialState = {
      screen: {
        width: window.innerWidth,
        height: window.innerHeight,
        ratio: window.devicePixelRatio || 1,
      },
      context: null,
      keys : {
        left  : 0,
        right : 0,
        up    : 0,
        down  : 0,
        a     : 0,
        d     : 0,
        space : 0,
      },
      level: 1,
      levels: [],
      heartHealth: 0,
      playerHealth: 0,
      currentScore: 0,
    }
    this.ship = []
    this.bullets = []
    this.particles = []
    this.enemies = []
  }


  const UPDATE_KEYS = "UPDATE_KEYS"
  const SET_SCREEN = "SET_SCREEN"
  const MOVE_TO_NEXT_LEVEL = "MOVE_TO_NEXT_LEVEL"
  const UPDATE_SCORE = "UPDATE_SCORE"
  const UPDATE_PLAYER = "UPDATE_PLAYER"
  const UPDATE_PLAYER_BULLETS = "UPDATE_PLAYER_BULLETS"
  const UPDATE_ENEMIES = "UPDATE_ENEMIES"



  export default function gameReducer( state=initialState, action ) {

    switch(action.type) {

        default: return state
    }

  }