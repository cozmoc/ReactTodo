import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import todoActions from './todoActions';

export default combineReducers({
  routing: routerReducer,
  todoActions
});