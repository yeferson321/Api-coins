import axios, { AxiosInstance } from 'axios';

// Importing the authentication token from environment variables.
const token = import.meta.env.VITE_TOKEN_ENV;

// Axios instance for making HTTP requests to the Coinranking API.
const cryptocurrencies: AxiosInstance = axios.create({
    baseURL: 'https://api.coinranking.com',
    headers: {
        'Content-Type': 'application/json',
        'x-access-token': `${token}` // Including the authentication token in the headers.
    }
});

export default cryptocurrencies;