import { CoinInterface, StatsInterface } from './DataInterface';

// Defining an interface.
export interface CoinStoreInterface {
    coins: CoinInterface[];
    stats: StatsInterface;
    isLoading: boolean;
    searchInput: string;
    searchFavorite: string[];
    noFound: boolean;
    noFavorites: boolean;
    error: boolean;
};