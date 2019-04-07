import * as CONSTANTS from '../../reducers/constants';
import { fileDelete, folderDelete  } from '../../utils'

export const deleteFile = (fileSystem, fileName) => dispatch => {
    fileDelete(fileSystem, fileName)
        .then(res => {
            dispatch({
                type: CONSTANTS.DELETE_A_FILE,
                payload: res,
            })
        })
}

export const deleteFolder = (fileSystem, folderName) => dispatch => {
    folderDelete(fileSystem, folderName)
        .then(res => {
            dispatch({
                type: CONSTANTS.DELETE_A_FOLDER,
                payload: res,
            })
        })
}

export function resetDeleteFlag() {
    return {
        type: CONSTANTS.RESET_DELETE_FLAG,
        payload: false
    }
} 