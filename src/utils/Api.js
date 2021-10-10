import axios from 'axios';

export const Api =
    axios.create({
        baseURL: 'http://localhost:9050/api/v1/'
    });