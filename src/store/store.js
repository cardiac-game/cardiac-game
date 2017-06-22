import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';

const initialState = {
    testy: 'test'
}

function reducerTest(state = initialState) {
    return state
}

export default createStore(reducerTest, applyMiddleware(promiseMiddleware()) )
