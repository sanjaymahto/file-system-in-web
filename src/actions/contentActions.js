import * as CONSTANTS from './constant';

/**
 * This function creates an action that pins sample charts.
 *
 * @returns {Object} The action object.
 */
export const getDirectoryContents = (payload = '') => dispatch => {

    // Setting Params to send to Server
    const params = {
        directory: payload === ''? CONSTANTS.ROOT: `${CONSTANTS.ROOT}/${payload}`
    }

    const settings = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(params)
    };

    fetch('http://localhost:5000/api/getFiles', settings)
    .then(resp => resp.json())
    .then((data) => {
        dispatch({ type: CONSTANTS.GET_ROOT_FILES, payload: data });
    })
    .catch((err) => {
        dispatch({ type: CONSTANTS.ERROR, payload: err });
    })
};