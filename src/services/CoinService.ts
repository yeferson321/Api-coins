import axios from './Axios';
import { DataInterface } from '../interfaces/indexInterface';
import { AxiosResponse } from 'axios';

interface ResponseInterface {
  status: string;
  data: DataInterface;
};

// Makes an asynchronous HTTP request to process coin-related data.
const processCoinsRequest = async (url: string) => {
  // Make an asynchronous HTTP request using Axios to retrieve data from the URL passed as a parameter.
  const response: AxiosResponse<ResponseInterface> = await axios.get(url);
  return response.data.data;
};

// Fetches search coins based on the given offset and search criteria.
export const getSearchCoins = async (offset: number, coinSearch: string) => {
  const url: string = `/v2/coins?offset=${offset}&search=${coinSearch}`;
  return processCoinsRequest(url);
};

// Fetches favorite search coins based on search criteria, offset, and limit.
export const getSearchFavoritesCoins = async (favoriteCoinSearch: string[], offset: number = 0, limit: number = 50) => {
  // Cleans and formats the array containing favorite coin search criteria.
  const cleanArray: string[] = favoriteCoinSearch.map((item) => item.replace(/&name=.*/, ''));
  const joinedCoins: string = cleanArray.join('');

  const url: string = `/v2/coins?limit=${limit}&offset=${offset}${joinedCoins}`;
  return processCoinsRequest(url);
};