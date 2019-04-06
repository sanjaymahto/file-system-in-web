import * as CONSTANTS from './constants';

export function setFileSystem(payload) {
    return {
    type: CONSTANTS.SET_FILE_SYSTEM,
    payload: payload,
    };
}