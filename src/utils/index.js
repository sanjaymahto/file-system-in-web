import { getFiles } from './apis';
import { ROOT } from './constants'

export function formatChildren(parent,data = []){
    const children = data.map(datum => {
        return {
            value : datum.file,
            type : datum.type,
            isFolder : !datum.type,
            size: datum.size || 0,
            date: datum.date || new Date(),
            nodes: [],
            path:`${parent.path}/${datum.file}`
        }
    });
    return children
}

function setChildren(parent,children){
    parent['nodes'] = children;

    return  parent;
}

export function getNodeInfo(parent,path){
    return getFiles(`${parent.path}${path}`)
            .then((res)=>res.json())
            .then((res)=>setChildren(parent,formatChildren(parent,res.files)))
}

export function getRootFileInfo(){
    return {
        value : '/',
        type : '',
        isFolder : true,
        size: 0,
        date: new Date(),
        nodes: [],
        path:`/${ROOT}`
    }
}

export function updateFileSystem(fileSystem, currentNode) {
    if(!fileSystem) {
        return currentNode;
    } else {
        //TODO search the file nodes and update it's children
    }
}