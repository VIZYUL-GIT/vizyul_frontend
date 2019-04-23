import types from '../actions/types';

const initialState = {
  file: null
};

const fileReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FILE.UPLOAD_REQUEST_SUCCESS:
    return {
        ...state,
        upload: true
      };
    case types.FILE.UPLOAD_REQUEST_FAILURE:
    return {
        ...state,
        upload: false
    };
    default:
      return state;
  }
}

export default fileReducer;
