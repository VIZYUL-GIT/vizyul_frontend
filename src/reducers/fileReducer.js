import types from '../actions/types';

const initialState = {
  file: null
};

const fileReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FILE.UPLOAD_REQUEST_SUCCESS:
    return {
        ...state,
        upload_file: true
      };
    case types.FILE.UPLOAD_REQUEST_FAILURE:
    return {
        ...state,
        upload_file: false
    };
    default:
      return state;
  }
}

export default fileReducer;
