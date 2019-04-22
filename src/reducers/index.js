import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import fileReducer from './fileReducer';

export default (history) => combineReducers({
  router: connectRouter(history),
  fileReducer,
})
