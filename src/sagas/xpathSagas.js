import { call, put, takeLatest } from "redux-saga/effects";
import types from "../actions/types";
import Api from "../util/Api";
import endpoints from "../constants/endpoints.json";
import * as xpathActions from '../actions/xpathActions';

export function* requestList() {

  const endpoint = endpoints.GET_LIST_REQUST;
  const { result, error } = yield call(Api.get, {
    url: `/${endpoint.version}${endpoint.url}`
  });

  try {
    if (result) {
      yield put(xpathActions.requestListSuccess(result['data']));
    }else{
      yield put({
        type: types.XPATH.LIST_REQUEST_FAILURE,
      });    
    }
  } catch (error) {
    yield put({
      type: types.XPATH.LIST_REQUEST_FAILURE,
      error
    });
  }
}

export function* query(data) {
    const { file, xpath } = data
    const endpoint = endpoints.GET_QUERY;
    const { result, error } = yield call(Api.get, {
      url: `/${endpoint.version}${endpoint.url}`,
      data: {
        params:{
            file: file,
            xpath: xpath
        }
      }
    });
  
    try {
      if (result) {
        yield put(xpathActions.queryXpathSuccess(result['data']));
      }else{
        yield put({
          type: types.XPATH.LIST_REQUEST_FAILURE,
        });    
      }
    } catch (error) {
      yield put({
        type: types.XPATH.LIST_REQUEST_FAILURE,
        error
      });
    }
}

export default function* xpathSagas() {
  yield takeLatest(types.XPATH.LIST_REQUEST, requestList),
  yield takeLatest(types.XPATH.QUERY, query)
}
