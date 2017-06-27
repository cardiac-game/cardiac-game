import { createStore, applyMiddleware, combineReducers } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';

import nutritionReducer from './ducks/nutritionReducer';
import userReducer from './ducks/userReducer';
import gameReducer from './ducks/gameReducer';

const combinedReducer = combineReducers({ nutritionReducer, userReducer, gameReducer });

export default createStore(combinedReducer, applyMiddleware(promiseMiddleware()) );
