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
    const localCoinStorage: string[] = JSON.parse(localStorage.getItem('favorites') || '[]');
    const joinedCoins: string = localCoinStorage.join('');

    const response: AxiosResponse<ApiResponse> = await axios.get(`/v2/coins?offset=${offset}${joinedCoins}`);
    return response.data.data;
};