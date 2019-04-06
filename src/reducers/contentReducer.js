import { fromJS } from 'immutable';
import * as CONSTANTS from '../actions/constant';

const initialState = fromJS({
    // directory contents (i.e files and folders)
    contents: [],
    // file content Information
    contentInfo: {},
    // metadata of the file or folder selected
    metaData: {},
    // Searched file in a directory
    searchedFile: '',
    // Path of the current Directory
    path: CONSTANTS.ROOT,
    // dummy folder for file System
    root: CONSTANTS.ROOT,
    // Error while fetching contents
    error: ''
});

/**
 * function to log error while fetching contents from API 
 * 
 * @param  {Object} state - state Object
 * @param  {Object} payload - Payload Object
 */
function logError(state, payload) {
    return state.set('error', payload)
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
        case CONSTANTS.GET_ROOT_FILES:
            return state.set('contents', fromJS(payload.files))
                        .set('path', payload.path)
        case CONSTANTS.ERROR:
            return logError(state, payload);
        default:
            return state;
    }
}

export default contentReducer;