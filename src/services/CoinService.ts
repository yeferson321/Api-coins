import axios from './Axios';
import { DataInterface } from '../interfaces/DataInterface';


export const getCoinsCurrencies = async (offset: number = 0): Promise<DataInterface> => {

    const response = await axios.get("/v2/coins?offset=" + offset);
    return response.data.data;
};

export const getSearchCoinsCurrencies = async (coin?: string): Promise<DataInterface> => {

    const response = await axios.get("/v2/coins?search=" + coin);
    return response.data.data;
};

export const getFavoritesCoinsCurrencies = async (): Promise<DataInterface> => {

    const localCoinStorage = JSON.parse(localStorage.getItem('favorites') || "");

    const joinedCoins = localCoinStorage.join('');


    console.log(localCoinStorage)
    
    const response = await axios.get(`/v2/coins?${joinedCoins}`);
    return response.data.data;
};