import { getFiles } from './apis';
import { ROOT } from './constants'

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

function setChildren(node,children){
    node['nodes'] = children;
    return  node;
}

export function getNodeInfo(node){
    return getFiles(`${node.parentPath}/${node.value}`)
            .then((res)=>res.json())
            .then((res)=>setChildren(node,formatChildren(node,res.files)))
}

export function updateFileSystem(fileSystem, currentNode) {
   return currentNode;
}