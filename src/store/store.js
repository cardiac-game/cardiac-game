import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import nutritionReducer from './ducks/nutritionReducer';

export default createStore(nutritionReducer, applyMiddleware(promiseMiddleware()) )
