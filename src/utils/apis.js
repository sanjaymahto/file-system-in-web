import { SERVER_URL , FETCH_FOLDER_CONTENTS } from './constants'

/**
 * function to fetch files from the server
 * 
 * @param  {String} path - path of the directory
 * @return {Promise} Promise
 */
export function getFiles(path) {
    return fetch(`${SERVER_URL}${FETCH_FOLDER_CONTENTS}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({'path' : path})
    });


}