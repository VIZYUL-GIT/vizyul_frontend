import {
  combineReducers
} from 'redux';
import fileReducer from './fileReducer';
import xpathReducer from './xpathReducer';

export default combineReducers({
  fileReducer,
  xpathReducer
})