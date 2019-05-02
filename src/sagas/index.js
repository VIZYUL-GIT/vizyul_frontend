import { all, spawn } from 'redux-saga/effects';
import fileSagas from './fileSagas';
import xpathSagas from './xpathSagas';

export default function* rootSaga () {
  yield all([
    spawn(fileSagas),
    spawn(xpathSagas)
  ]);
}
