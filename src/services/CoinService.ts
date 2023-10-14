import axios from './Axios';
import { ApiResponse } from '../interfaces/DataInterface';
import { AxiosResponse } from 'axios';

const processCoinsRequest = async (url: string) => {
  const response: AxiosResponse<ApiResponse> = await axios.get(url);
  return response.data.data;
};

export const getAllCoins = async (offset: number) => {
  const url: string = `/v2/coins?offset=${offset}`;
  return processCoinsRequest(url);
};

export const getSearchCoins = async (offset: number, coin: string) => {
  //console.log(offset)
  const url: string = `/v2/coins?offset=${offset}&search=${coin}`;
  return processCoinsRequest(url);
};

export const getFavoritesCoins = async (offset: number) => {
  const localCoinStorage: string[] = JSON.parse(localStorage.getItem('favorites') || '[]');
  const cleanArray: string[] = localCoinStorage.map((item) => item.replace(/&name=.*/, ''));
  const joinedCoins: string = cleanArray.join('');

  const url: string = `/v2/coins?offset=${offset}${joinedCoins}`;
  return processCoinsRequest(url);
};

export const getSearchFavoritesCoins = async (offset: number, searchCoinStorage: string[]) => {
  const cleanArray: string[] = searchCoinStorage.map((item) => item.replace(/&name=.*/, ''));
  const joinedCoins: string = cleanArray.join('');

  const url: string = `/v2/coins?offset=${offset}${joinedCoins}`;
  return processCoinsRequest(url);
};
