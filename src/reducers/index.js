import { combineReducers } from 'redux';
import ApodReducer from './ApodReducer';
import NeoReducer from './NeoReducer';

export default combineReducers({
  apodInfo: ApodReducer,
  neoInfo: NeoReducer
});