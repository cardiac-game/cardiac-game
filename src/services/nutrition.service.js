import axios from 'axios';
import { getList } from '../store/ducks/nutritionReducer';
import store from '../store/store';
// import apiURL from '../'

export function getFood(item){
  const promise = axios.get('/api/nutrition?item='+item).then(response => response.data);
  store.dispatch(getList(promise))
}
