import * as CONSTANTS from '../../reducers/constants';
import { fileDelete, folderDelete  } from '../../utils'

/**
 * function to delete file from the file system
 * 
 * @param  {Object} fileSystem - root directory
 * @param  {String} fileName - file Name
 */
export const deleteFile = (fileSystem, fileName) => dispatch => {
    fileDelete(fileSystem, fileName)
        .then(res => {
            dispatch({
                type: CONSTANTS.DELETE_A_FILE,
                payload: res,
            })
        })
}

/**
 * function to delete folder from the file system
 * 
 * @param  {Object} fileSystem - root directory
 * @param  {String} folderName - folder Name
 */
export const deleteFolder = (fileSystem, folderName) => dispatch => {
    folderDelete(fileSystem, folderName)
        .then(res => {
            dispatch({
                type: CONSTANTS.DELETE_A_FOLDER,
                payload: res,
            })
        })
}

/**
 * function to reset the delete flag in redux store
 * 
 */
export function resetDeleteFlag() {
    return {
        type: CONSTANTS.RESET_DELETE_FLAG,
        payload: false
    }
} 