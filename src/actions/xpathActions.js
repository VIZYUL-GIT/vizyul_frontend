import types from './types';

export const requestList = () => {
    return {
        type: types.XPATH.LIST_REQUEST,
    }
};

export const requestListSuccess = result => {
    return {
        type: types.XPATH.LIST_REQUEST_SUCCESS,
        result
    };
};

export const queryXpath = (file, xpath) => {
    return {
        type: types.XPATH.QUERY,
        file: file,
        xpath: xpath
    }
};

export const queryXpathSuccess = result => {
    return {
        type: types.XPATH.QUERY_SUCCESS,
        result
    }
};