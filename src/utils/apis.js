import { 
    SERVER_URL, 
    FETCH_FOLDER_CONTENTS, 
    CREATE_FILE, 
    CREATE_FOLDER,
    DELETE_FILE, 
    DELETE_FOLDER} from './constants';


    /**
     * function to generate the body for post request
     * 
     * @param  {String} params - body params
     */
    function bodyGenerator(params){
        return {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: params
        }
    }



/**
 * function to fetch files from the server
 * 
 * @param  {String} path - path of the directory
 * @return {Promise} Promise
 */
export function getFiles(path) {
    let params = JSON.stringify({'path' : path});
    return fetch(`${SERVER_URL}${FETCH_FOLDER_CONTENTS}`, bodyGenerator(params));
}

/**
 * function to create files from the server
 * 
 * @param  {String} path - path of the directory
 * @return {Promise} Promise
 */
export function createFile(fileObj) {
    let params = JSON.stringify({'path' : fileObj.path, 'fileName': fileObj.fileName});
    return fetch(`${SERVER_URL}${CREATE_FILE}`, bodyGenerator(params));
}

/**
 * function to create folder from the server
 * 
 * @param  {String} path - path of the directory
 * @return {Promise} Promise
 */
export function createFolder(folderObj) {
    let params = JSON.stringify({'path' : folderObj.path, 'fileName': folderObj.fileName});
    return fetch(`${SERVER_URL}${CREATE_FOLDER}`, bodyGenerator(params));
}

/**
 * function to delete files from the server
 * 
 * @param  {String} path - path of the directory
 * @return {Promise} Promise
 */
export function deleteFile(fileObj) {
    let params = JSON.stringify({'path' : fileObj.path, 'fileName': fileObj.fileName});
    return fetch(`${SERVER_URL}${DELETE_FILE}`, bodyGenerator(params));
}

/**
 * function to delete folder from the server
 * 
 * @param  {String} path - path of the directory
 * @return {Promise} Promise
 */
export function deleteFolder(folderObj) {
    let params = JSON.stringify({'path' : folderObj.path, 'fileName': folderObj.fileName});   
    return fetch(`${SERVER_URL}${DELETE_FOLDER}`, bodyGenerator(params));
}