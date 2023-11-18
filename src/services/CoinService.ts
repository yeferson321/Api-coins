import axios from './Axios'; // Importing the custom Axios instance
import { DataInterface } from '../interfaces/indexInterface';
import { AxiosResponse } from 'axios';

export interface ResponseInterface {
  status: string;
  data: DataInterface;
};

// Function to handle the API request for coins
const processCoinsRequest = async (url: string) => {
  // Making a GET request to the provided URL using Axios
  const response: AxiosResponse<ResponseInterface> = await axios.get(url);
  return response.data.data;
};

// Function to fetch search coins based on offset and coin name
export const getSearchCoins = async (offset: number, coin: string) => {
  const url: string = `/v2/coins?offset=${offset}&search=${coin}`;
  return processCoinsRequest(url);
};

// Function to fetch search coins based on searchCoinStorage and offset
export const getSearchFavoritesCoins = async (searchCoinStorage: string[], offset: number = 0) => {
  // Cleaning the array and formatting it for the API request
  const cleanArray: string[] = searchCoinStorage.map((item) => item.replace(/&name=.*/, ''));
  const joinedCoins: string = cleanArray.join('');

  // Creating the URL for the API request with the provided offset and formatted coins
  const url: string = `/v2/coins?offset=${offset}${joinedCoins}`;
  return processCoinsRequest(url);
};