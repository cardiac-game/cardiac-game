import { createStore, applyMiddleware, combineReducers } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';

import nutritionReducer from './ducks/nutritionReducer';
import userReducer from './ducks/userReducer';
import gameReducer from './ducks/gameReducer';
import playerReducer from './ducks/playerReducer';
import enemiesReducer from './ducks/enemiesReducer';

const combinedReducer = combineReducers({ 
    nutritionReducer, 
    userReducer, 
    gameReducer, 
    playerReducer, 
    enemiesReducer 
});

export default createStore(combinedReducer, applyMiddleware(promiseMiddleware()) );
