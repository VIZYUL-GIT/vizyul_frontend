import types from './types';

export const uploadFile = file => {
    return {
        type: types.FILE.UPLOAD_REQUEST,
        file
    }
};
