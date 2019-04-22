import { call, put, takeLatest } from "redux-saga/effects";
import types from "../actions/types";
import Api from "../util/Api";
import endpoints from "../constants/endpoints.json";

export function* uploadFile(file) {
  const endpoint = endpoints.POST_UPLOAD_FILE;
  const { result, error } = yield call(Api.upload, {
    url: `/${endpoint.version}${endpoint.url}`,
    data: {
      data: {
        file
      }
    }
  });
  try {
    if (result) {
      
    }
    throw error;
  } catch (error) {

  }
}

export default function* fileSagas() {
  yield takeLatest(types.FILE.UPLOAD_REQUEST, uploadFile);
}
