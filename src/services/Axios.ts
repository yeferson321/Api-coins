import axios, { AxiosInstance } from 'axios';

// Authentication token obtained from the environment
const token = import.meta.env.VITE_TOKEN_ENV;

// Create an Axios instance for cryptocurrency API requests
const cryptocurrencies: AxiosInstance = axios.create({
    baseURL: 'https://api.coinranking.com',
    headers: {
        'Content-Type': 'application/json',
        'x-access-token': `${token}` // Including the authentication token in the headers
    }
});

export default cryptocurrencies;