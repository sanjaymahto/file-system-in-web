import { getFiles } from './apis';
import { ROOT } from './constants'

export function formatChildren(parent,data = []){
    const children = data.map(datum => {
        return {
            name : datum.file,
            type : datum.type,
            isFolder : !datum.type,
            size: datum.size || 0,
            date: datum.date || new Date(),
            children: [],
            path:`${parent.path}/${datum.file}`,
            parent:parent
        }
    });
    return children
}

function setChildren(parent,children){
    parent['children'] = children;

    return  parent;
}

export function getNodeInfo(parent,path){
    return getFiles(`${parent.path}${path}`)
            .then((res)=>res.json())
            .then((res)=> {
                console.log(res);
                let node =  setChildren(parent,formatChildren(parent,res.files));
               
               return node;
            })
}

export function getRootFileInfo(){
    return {
        name : '/',
        type : '',
        isFolder : true,
        size: 0,
        date: new Date(),
        children: [],
        path:`/${ROOT}`,
        parent:null
    }
}

export function updateFileSystem(fileSystem, currentNode) {
    if(!fileSystem) {
        return currentNode;
    } else {
        //TODO search the file nodes and update it's children
    }
}