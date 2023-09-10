import axios, { AxiosInstance } from 'axios';

const token = import.meta.env.VITE_TOKEN_ENV

/* This code is creating an instance of the Axios library with a base URL of
'https://api.coinranking.com' and headers that include a content type of 'application/json' 
and an access token. This allows for making HTTP requests to the Coinranking API with the
specified headers and base URL. */
const cryptocurrencies: AxiosInstance = axios.create({
    baseURL: 'https://api.coinranking.com',
    headers: {
        'Content-Type': 'application/json',
        'x-access-token': `${token}`
    }
})

export default cryptocurrencies;