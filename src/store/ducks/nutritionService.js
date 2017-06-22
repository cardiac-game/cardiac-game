const initialState = {
  loading: false,
  foodList: []
}

const GET_LIST = "GET_LIST";

export default function listReducer( state = initialState, action ) {
  switch( action.type ) {
    case GET_LIST + "_PENDING":
    return {
      loading: true,
      foodList: []
    }

    case GET_LIST + "_FULFILLED":
    return {
      loading: false,
      customerList: action.payload
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
