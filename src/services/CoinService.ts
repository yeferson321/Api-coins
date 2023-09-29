import axios from './Axios';
import { ApiResponse } from '../interfaces/DataInterface';
import { AxiosResponse } from 'axios';

export const getAllCoins = async (offset: number = 0) => {
    const response: AxiosResponse<ApiResponse> = await axios.get(`/v2/coins?offset=${offset}`);
    return response.data.data;
};

export const getSearchCoins = async (coin?: string) => {
    const response: AxiosResponse<ApiResponse> = await axios.get(`/v2/coins?search=${coin}`);
    return response.data.data;
};

export const getFavoritesCoins = async (offset: number = 0) => {
    console.time()
    const localCoinStorage: string[] = JSON.parse(localStorage.getItem('favorites') || '[]');
    const cleanArray = localCoinStorage.map(item => item.replace(/&name=.*/, ''));
    const joinedCoins = cleanArray.join('');

    console.timeEnd()
    const response: AxiosResponse<ApiResponse> = await axios.get(`/v2/coins?offset=${offset}${joinedCoins}`);
    return response.data.data;
};


export const getSearchFavoritesCoins = async (offset: number = 0, searchCoinStorage: string[]) => {
    console.time()

    const cleanArray = searchCoinStorage.map(item => item.replace(/&name=.*/, ''));
    const joinedCoins = cleanArray.join('');

    console.timeEnd()
    const response: AxiosResponse<ApiResponse> = await axios.get(`/v2/coins?offset=${offset}${joinedCoins}`);
    return response.data.data;
};