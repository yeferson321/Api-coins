import axios from './Axios';
import { Data } from '../interfaces/Data';

// These functions use axios to make API calls to retrieve data on coins and currencies.

// This function retrieves a list of coins.
export const getCoinsCurrencies = async (offset: number = 0): Promise<Data> => {
    /* The offset parameter is used to specify the starting point of the data
    to be retrieved from the API. It determines the number of items to skip before starting
    to return results. In this case, it is used to paginate through the list of coins 
    returned by the API. */
    const response = await axios.get("/v2/coins?offset=" + offset);
    return response.data.data;
};

// This function retrieves data on coins based on a search query.
export const getSearchCoinsCurrencies = async (coin?: string): Promise<Data> => {
    /* The `coin` parameter is an optional string that represents the name or symbol of 
    a cryptocurrency. It is used to search for specific coins in the API endpoint `/v2/coins`.
    If no `coin` parameter is provided, the API will return data for all available coins. */
    const response = await axios.get("/v2/coins?search=" + coin);
    return response.data.data;
};

// This function retrieves favorite coins data.
export const getFavoritesCoinsCurrencies = async (): Promise<Data> => {
    /* It is used to search for specific coins with a UUID query parameter stored in 
    the browser's local storage, which contains the user's favorite coins. */
    const favorites = localStorage.getItem('uuid');
    const response = await axios.get(`/v2/coins?${favorites}`);
    return response.data.data;
};