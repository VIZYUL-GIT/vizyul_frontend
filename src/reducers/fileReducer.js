import types from '../actions/types';

const initialState = {
  file: null
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
    case types.FILE.UPLOAD_PROGRESS:
    console.log('action', action)
    return {
        ...state,
        progress: action.paylolad
    };
    default:
      return state;
  }
}

export default fileReducer;
