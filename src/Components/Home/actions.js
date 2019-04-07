import * as CONSTANTS from '../../reducers/constants';
import { getNodeInfo ,updateFileSystem, searchNode} from '../../utils'

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
    let searchRes = searchNode(fileSystem, currentNode.path);
    if(searchRes.nodes.length > 0){
        dispatch(setCurrentNode(searchRes));
        dispatch(setFileSystem(fileSystem,searchRes));
        dispatch(fileFetchCompleted());
        return {
            type:CONSTANTS.FILE_FETCH_INITIATED
        }
    }
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