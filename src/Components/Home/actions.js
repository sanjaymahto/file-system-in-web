import * as CONSTANTS from './constants';
import { getNodeInfo ,updateFileSystem} from '../../utils'

export function setFileSystem(fileSystem,res) {
    const payload = updateFileSystem(fileSystem,res)
    return {
        type: CONSTANTS.SET_FILE_SYSTEM,
        payload: payload,
    };
}

export function setCurrentNode(payload) {
    return {
        type: CONSTANTS.SET_CURRENT_NODE,
        payload: payload
    }
}

export function fileFetchCompleted(){
    return {
        type:CONSTANTS.FILE_FETCH_SUCCESS
    }
}

export function fileFetchFailed(){
    return {
        type:CONSTANTS.FILE_FETCH_FAILED
    }
}

export const fetchInfoAndUpDateFileSytem = (fileSystem,currentNode) => dispatch =>{
    getNodeInfo(currentNode)
        .then(res=>{
    
            dispatch(setCurrentNode(res));
            dispatch(setFileSystem(fileSystem,res));
            dispatch(fileFetchCompleted());
        })
        .catch(e=>{
            dispatch(fileFetchFailed());
        });
    return {
        type:CONSTANTS.FILE_FETCH_INITIATED
    }
}