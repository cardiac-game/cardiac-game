//User leaderboard call
const initialState = {
  loading: false,
  userList: []
}

const GET_LIST = "GET_LIST";

export default function userListReducer( state = initialState, action ) {

  switch( action.type ) {
    case GET_LIST + "_PENDING":
      return {
        loading: true,
        userList: []
      }
    case GET_LIST + "_FULFILLED":
      return {
        loading: false,
        userList: action.payload
      }
    default: return state;
  }
}

export function getList( promise ) {
  return {
    type: GET_LIST,
    payload: promise
  }
}
