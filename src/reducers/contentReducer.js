import { fromJS } from 'immutable';
import * as CONSTANTS from './constants';

const initialState = fromJS({
    // directory contents (i.e files and folders)
    fileSystem: {
        value : `${CONSTANTS.ROOT}`,
        type : '',
        isFolder :false,
        size: 0,
        date: null,
        nodes: [],
        path:`/${CONSTANTS.ROOT}`,
        parentPath:''
    },
    //current node for explorer
    currentNode: null,
    //fetch status
    fetchFiles : true,
});


/**
 * function to set file System into reducer
 * 
 * @param  {Object} state - state Object
 * @param  {Object} payload - payload Object
 */
function setFileSystem(state, payload) {
    return state.set('fileSystem', (payload));
}


/**
 * function to set current node into the reducer
 * 
 * @param  {Object} state - state Object
 * @param  {Object} payload - Payload Object
 */
function setCurrentNode(state, payload) {
    return state.set('currentNode', (payload));
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
            return setFileSystem(state, payload);
        case CONSTANTS.SET_CURRENT_NODE:
            return setCurrentNode(state, payload);
        case CONSTANTS.FILE_FETCH_FAILED:
        case CONSTANTS.FILE_FETCH_SUCCESS:
            return state.set('fetchFiles', false);
        case CONSTANTS.FILE_FETCH_INITIATED:
            return state.set('fetchFiles', true);
        default:
            return state;
    }
}

export default contentReducer;