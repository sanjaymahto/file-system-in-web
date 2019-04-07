import * as CONSTANTS from '../../reducers/constants';
import { getNodeInfo ,updateFileSystem, searchNode} from '../../utils'

/**
 * function to set files to the reducer
 * 
 * @param  {Object} fileSystem - root Directory
 * @param  {Object} res - current Node
 */
export function setFileSystem(fileSystem,res) {
    const payload = updateFileSystem(fileSystem,res)
    return {
        type: CONSTANTS.SET_FILE_SYSTEM,
        payload: payload,
    };
}

/**
 * function to set the current Node (i.e current directory)
 * 
 * @param  {Object} payload - payload Object
 */
export function setCurrentNode(payload) {
    return {
        type: CONSTANTS.SET_CURRENT_NODE,
        payload: payload
    }
}


/**
 * function to set the fetch file complete flag
 * 
 */
export function fileFetchCompleted(){
    return {
        type:CONSTANTS.FILE_FETCH_SUCCESS
    }
}

/**
 * 
 * function to set file fetch flag
 */
export function fileFetchFailed(){
    return {
        type:CONSTANTS.FILE_FETCH_FAILED
    }
}

/**
 * function to update the search file or folder directory
 * 
 * @param  {Object} fileSystem - root directory
 * @param  {Object} currentNode - current directory or node
 */
export const updateSearchFileSystem = (fileSystem, currentNode) => dispatch =>{
    dispatch(setCurrentNode(currentNode));   
    dispatch(fileFetchCompleted());
        return {
            type:CONSTANTS.FILE_FETCH_INITIATED
        }
}

/**
 * function to update the directory when entering new directory
 * 
 * @param  {Object} fileSystem - root directory
 * @param  {Object} currentNode - current Node
 */
export const updateDirectory = (fileSystem, currentNode) => dispatch =>{
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

/**
 * function to update the directory while traversing back and updating if nodes are not present
 * 
 * @param  {Object} fileSystem - root directory
 * @param  {Object} currentNode - current Node or Directory
 */
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