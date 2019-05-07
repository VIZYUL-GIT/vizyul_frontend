import types from '../actions/types';

const initialState = {
};

const xpathReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.XPATH.LIST_REQUEST_SUCCESS:
    console.log('files', action.result['data'])
    return {
        ...state,
        files: action.result['data']
    };
    case types.XPATH.QUERY_SUCCESS:
    console.log('xpaths', action.result['data'])
    return {
        ...state,
        xpaths: action.result['data']
    };
    default:
      return state;
  }
}

export default xpathReducer;
