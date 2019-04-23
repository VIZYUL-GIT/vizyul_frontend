import types from './types';

export const uploadFile = file => {
    return {
        type: types.FILE.UPLOAD,
        file
    }
};
