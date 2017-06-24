// server call to user DB
<<<<<<< HEAD
import axios from 'axios';
import { getUsers } from './ducks/userService';
import store from '../store/store';

export function dispatchGetUsers() {
  const promise = axios.get( '' )
  .then( response => response.data );
  store.dispatch( getUsers(promise) );
}
=======

>>>>>>> master
