import { SERVER_URL , FETCH_FOLDER_CONTENTS } from './constants'

export function getFiles(path) {
    return fetch(`${SERVER_URL}${FETCH_FOLDER_CONTENTS}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({'path' : path})
    });


}