import { CoinInterface, StatsInterface } from '../interfaces/DataInterface';

export interface StoreInterface {
    coins:                CoinInterface[];
    stats:                StatsInterface;
    isLoading:            boolean;
    searchInput:          string,
    searchInputFavorites: string[],
    noFound:              boolean;
    noFavorites:          boolean;
    error:                boolean;
};