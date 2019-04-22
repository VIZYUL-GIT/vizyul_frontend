import { all, spawn } from 'redux-saga/effects';
import fileSagas from './fileSagas';


export default function* rootSaga () {
  yield all([
    spawn(fileSagas)
  ]);
}
