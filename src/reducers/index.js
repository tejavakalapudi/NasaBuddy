import { combineReducers } from 'redux';
import ApodReducer from './ApodReducer';
import NeoReducer from './NeoReducer';
import MarsReducer from './MarsRoverReducer';

export default combineReducers({
  apodInfo: ApodReducer,
  neoInfo: NeoReducer,
  marsInfo: MarsReducer
});