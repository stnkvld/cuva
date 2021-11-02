import axios from 'axios';

export function getHotelsInfo() {
    return axios.get('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.data);
}
