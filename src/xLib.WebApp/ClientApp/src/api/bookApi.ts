import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000/api/',
});

export const getBooks = () => api.get('book').then((response) => response.data);
