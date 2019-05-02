import types from './types';

export const uploadFile = files => {
    return {
        type: types.FILE.UPLOAD,
        files
    }
};

