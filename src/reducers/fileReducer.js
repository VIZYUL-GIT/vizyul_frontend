import types from '../actions/types';

const initialState = {
  file: null,
  upload: null
};

const fileReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FILE.UPLOAD_SUCCESS:
    return {
        ...state,
        upload: true
      };
    case types.FILE.UPLOAD_FAILURE:
    return {
        ...state,
        upload: false
    };
    default:
      return state;
  }
}

export default fileReducer;
