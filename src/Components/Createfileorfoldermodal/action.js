import * as CONSTANTS from '../../reducers/constants';
import { fileCreator, folderCreator  } from '../../utils'

export function createFile(fileSystem, fileName) {
    const payload = fileCreator(fileSystem, fileName)
    return {
        type: CONSTANTS.CREATE_A_FILE,
        payload: payload,
    };
}

export function createFolder(fileSystem, folderName) {
    const payload = folderCreator(fileSystem, folderName)
    return {
        type: CONSTANTS.CREATE_A_FOLDER,
        payload: payload,
    };
}
