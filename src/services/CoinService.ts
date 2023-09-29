import axios from './Axios';
import { ApiResponse } from '../interfaces/DataInterface';
import { AxiosResponse } from 'axios';
import { useOffsetStore } from '../stores/offsetStore'

const offset = useOffsetStore();

export const getAllCoins = async () => {
    const response: AxiosResponse<ApiResponse> = await axios.get(`/v2/coins?offset=${offset.offset}`);
    return response.data.data;
};

export const getSearchCoins = async (coin?: string) => {
    const response: AxiosResponse<ApiResponse> = await axios.get(`/v2/coins?search=${coin}`);
    return response.data.data;
};

export const getFavoritesCoins = async () => {
    console.time()
    const localCoinStorage: string[] = JSON.parse(localStorage.getItem('favorites') || '[]');
    const cleanArray = localCoinStorage.map(item => item.replace(/&name=.*/, ''));
    const joinedCoins = cleanArray.join('');

    console.timeEnd()
    const response: AxiosResponse<ApiResponse> = await axios.get(`/v2/coins?offset=${offset.offset}${joinedCoins}`);
    return response.data.data;
};

export const getSearchFavoritesCoins = async (searchCoinStorage: string[]) => {
    console.time()

    const cleanArray = searchCoinStorage.map(item => item.replace(/&name=.*/, ''));
    const joinedCoins = cleanArray.join('');

    console.timeEnd()
    const response: AxiosResponse<ApiResponse> = await axios.get(`/v2/coins?offset=${offset.offset}${joinedCoins}`);
    return response.data.data;
};