import * as CONSTANTS from '../../reducers/constants';
import { fileCreator, folderCreator  } from '../../utils';


/**
 * function to create a file into fileSystem
 * 
 * @param  {Object} fileSystem - file system or root directory
 * @param  {String} fileName - file Name
 */
export const createFile = (fileSystem, fileName) => dispatch => {
    fileCreator(fileSystem, fileName)
    .then(res => {     
        dispatch({
            type: CONSTANTS.CREATE_A_FILE,
            payload: res,
        });
    })
}

/**
 * function to create a folder into file System
 * 
 * @param  {Object} fileSystem - file System or root directory
 * @param  {String} folderName - string Name
 */
export const createFolder = (fileSystem, folderName) => dispatch => {
    folderCreator(fileSystem, folderName)
        .then(res => {
            dispatch({
                type: CONSTANTS.CREATE_A_FOLDER,
                payload: res,
            })
        })
}


/**
 * function to reset the create flag in redux store
 * 
 */
export function resetCreateFlag() {
    console.log('resetFlag called: ');
    return {
        type: CONSTANTS.RESET_CREATE_FLAG,
        payload: false
    }
} 