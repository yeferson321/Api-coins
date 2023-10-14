import { CoinInterface, StatsInterface } from '../interfaces/DataInterface';

export interface StoreInterface {
    coins:      CoinInterface[];
    stats:      StatsInterface;
    isLoading:  boolean;
    valueInput: string,
    noFound:    boolean;
    error:      boolean;
    offset:     number,
};