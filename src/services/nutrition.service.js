// API call to nutrition API
import axios from 'axios';
import { getList } from './ducks/nutritionService';
import store from '../store/store';


export function dispatchGetList() {
  const promise = axios.get( 'https://api.nal.usda.gov/ndb/search/?format=json&q=${search}&sort=n&max=1000&offset=0&api_key=apiKey' )
  .then( response => response.data );
  store.dispatch( getList(promise) );
}
