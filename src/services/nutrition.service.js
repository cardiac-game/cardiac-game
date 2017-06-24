// import axios from 'axios';
// import { getList, getSpecificFood } from '../store/ducks/nutritionReducer';
// import store from '../store/store';

// export function getSearchFood(item){
//   const promise = axios.get('http://localhost:8000/api/foods?item='+item).then(response => response.data);
//   store.dispatch( getList(promise) )
// }

// export function getSpecific(ndbno){
//   const promise = axios.get('http://localhost:8000/api/nutrition?ndbno='+ndbno).then(response => response.data);
//   store.dispatch( getSpecificFood(promise) )
// }