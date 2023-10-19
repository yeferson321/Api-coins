import axios from './Axios';
import { ApiResponse } from '../interfaces/DataInterface';
import { AxiosResponse } from 'axios';

const processCoinsRequest = async (url: string) => {
  const response: AxiosResponse<ApiResponse> = await axios.get(url);
  return response.data.data;
};

export const getSearchCoins = async (offset: number, coin: string) => {
  const url: string = `/v2/coins?offset=${offset}&search=${coin}`;
  return processCoinsRequest(url);
};

export const getSearchFavoritesCoins = async (searchCoinStorage: string[], offset: number = 0) => {
  const cleanArray: string[] = searchCoinStorage.map((item) => item.replace(/&name=.*/, ''));
  const joinedCoins: string = cleanArray.join('');

  const url: string = `/v2/coins?offset=${offset}${joinedCoins}`;
  return processCoinsRequest(url);
};