import { CoinInterface, StatsInterface } from '../interfaces/DataInterface';

export interface StoreInterface {
    coins:      CoinInterface[];
    stats:      StatsInterface;
    isLoading:  boolean;
    noFound:    boolean;
    error:      boolean;
};