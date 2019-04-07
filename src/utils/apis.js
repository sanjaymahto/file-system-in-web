import { SERVER_URL , FETCH_FOLDER_CONTENTS, CREATE_FILE, CREATE_FOLDER } from './constants'

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

/**
 * function to create files from the server
 * 
 * @param  {String} path - path of the directory
 * @return {Promise} Promise
 */
export function createFile(fileObj) {
    return fetch(`${SERVER_URL}${CREATE_FILE}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({'path' : fileObj.path, 'fileName': fileObj.fileName})
    });
}

/**
 * function to create folder from the server
 * 
 * @param  {String} path - path of the directory
 * @return {Promise} Promise
 */
export function createFolder(folderObj) {
    return fetch(`${SERVER_URL}${CREATE_FOLDER}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({'path' : folderObj.path, 'folderName': folderObj.folderName})
    });
}