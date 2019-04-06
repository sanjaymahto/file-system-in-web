import { fromJS } from 'immutable';
import * as CONSTANTS from './constants';

const initialState = fromJS({
    // directory contents (i.e files and folders)
    fileSystem: null
});

function setFileSystem(state, payload) {
    return state.set('fileSytem', fromJS(payload));
}


/**
 * This function mutates the supplied state based on
 * the type of the action.
 *
 * @param {Object} [state=initialState] The immutable state.
 * @param {Object} action The action object.
 * @param {String} action.type the string describing the action.
 * @param {any} action.payload The body of the action.
 * @returns {Object} The mutated state.
 */
function contentReducer(state = initialState, action) {
    const { type, payload } = action;
        switch (type) {
        case CONSTANTS.SET_FILE_SYSTEM:
            return setFileSystem(state, payload)
        default:
            return state;
    }
}

export default contentReducer;