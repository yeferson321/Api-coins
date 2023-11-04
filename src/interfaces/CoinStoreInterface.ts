import { CoinInterface, StatsInterface } from './DataInterface';

export interface CoinStoreInterface {
    coins:              CoinInterface[];
    stats:              StatsInterface;
    isLoading:          boolean;
    searchInput:        string;
    searchFavoriteCoin: string[];
    loadMore:           boolean;
    noFound:            boolean;
    noFavorites:        boolean;
    error:              boolean;
};