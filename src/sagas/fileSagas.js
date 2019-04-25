import { call, put, takeLatest } from "redux-saga/effects";
import types from "../actions/types";
import Api from "../util/Api";
import endpoints from "../constants/endpoints.json";

export function* uploadFile(action) {
  const file = action.files[0];
  const file_name = file.name;
  let data = new FormData();
  data.append('file', file);
  data.append('file_name', file_name);

  const endpoint = endpoints.POST_UPLOAD_FILE;
  const { result, error } = yield call(Api.upload, {
    url: `/${endpoint.version}${endpoint.url}`,
    data: data
  });
  try {
    if (result) {
      
    }
    throw error;
  } catch (error) {

  }
}

export default function* fileSagas() {
  yield takeLatest(types.FILE.UPLOAD, uploadFile);
}
