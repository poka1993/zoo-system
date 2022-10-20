import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.API_URL || 'http://localhost:3001/',
    validateStatus: false, //dzieki temu mozna obslugiwac bledy 401, 404, itd.
});

export default instance;