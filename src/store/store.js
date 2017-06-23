import { createStore, applyMiddleware, combineReducers } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';

import nutritionReducer from './ducks/nutritionReducer';
import userReducer from './ducks/userReducer';

const combinedReducer = combineReducers({ nutritionReducer, userReducer });

export default createStore(combinedReducer, applyMiddleware(promiseMiddleware()) );
