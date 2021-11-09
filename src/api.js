import axios from 'axios';

export function getHotels() {
    return axios.get('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.data);
}

export function getHotel(id) {
    return axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
        .then(response => response.data);
}
