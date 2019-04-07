import { getFiles, createFile, createFolder } from './apis';

/**
 * function to restructure the schema for the fileSystem
 * 
 * @param  {Object} node
 * @param  {Array} data=[] - file System Array
 * @return {Array} children
 */
export function formatChildren(node,data = []){
    const children = data.map(datum => {
        return {
            value : datum.file,
            type : datum.type,
            isFolder : !datum.type,
            size: datum.size || 0,
            date: datum.date || new Date(),
            nodes: [],
            path:`${node.parentPath}/${node.value}/${datum.file}`,
            parentPath:`${node.parentPath}/${node.value}`
        }
    });
    return children
}

/**
 * function to set the child nodes into the parent node
 * 
 * @param  {Object} node - Parent Node
 * @param  {Array} children - child Array
 */
function setChildren(node,children){
    node['nodes'] = children;
    return  node;
}

/**
 * function to get Node info (i.e Current node)
 * 
 * @param  {Object} node - Current Node
 */
export function getNodeInfo(node){
    return getFiles(`${node.parentPath}/${node.value}`)
            .then((res)=>res.json())
            .then((res)=>setChildren(node,formatChildren(node,res.files)))
}

/**
 * function to create file in server directory
 * 
 * @param  {Object} node - Current Node
 */
export function fileCreator(node, fileName){
    return createFile({path: `${node.path}`,
            fileName: fileName})
            .then((res)=>res.json())
            .then((data) => data);
}

/**
 * function to create folder in server directory
 * 
 * @param  {Object} node - Current Node
 */
export function folderCreator(node, folderName){
    return createFolder({path: `${node.path}`,
                    folderName: folderName})
            .then((res)=>res.json())
            .then((data) => data);
}


/**
 * function to search the node and populate it with the child nodes
 * 
 * @param  {Object} fileSystem - fileSystem (tree structure)
 * @param  {Object} currentNode - Current active node
 * @return {Object} fileSystem - Updated file System
 */
export function searchNodeAndPopulate(fileSystem, currentNode){
    if(fileSystem.path === currentNode.path){
        fileSystem.nodes = currentNode.nodes;
            return fileSystem;
    }else if (fileSystem.path !== currentNode.path){
            for(let i=0; i < fileSystem.nodes.length; i++){
                searchNodeAndPopulate(fileSystem.nodes[i], currentNode);
        }
            return fileSystem;
    }
    return null;
}

/**
 * function to search the node and populate it with the child nodes
 * 
 * @param  {Object} fileSystem - fileSystem (tree structure)
 * @param  {Object} currentNode - Current active node
 * @return {Object} fileSystem - Updated file System
 */
export function searchNode(fileSystem, parentPath) {
    if(fileSystem.path === parentPath) {
        return fileSystem;
    }
    if(fileSystem.nodes && fileSystem.nodes.length > 0) {
        for(let i=0; i < fileSystem.nodes.length; i++) {
            let node = searchNode(fileSystem.nodes[i], parentPath);
            if(node != null) {
                return node;
            }
        }
    }
    return null;
}


/**
 * function to update file system 
 * 
 * @param  {Object} fileSystem - fileSystem (tree structure)
 * @param  {Object} currentNode - Current active node
 * @return {Object} fileSystem - Updated file System
 */
export function updateFileSystem(fileSystem, currentNode) {    
        return searchNodeAndPopulate(fileSystem, currentNode);
}
