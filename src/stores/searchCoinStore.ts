import { defineStore } from 'pinia';
import { CoinInterface, StatsInterface, StoreInterface, initialStatsInterface } from '../interfaces/indexInterface';

export const useSearchCoinStore = defineStore('searchCoinStore', {
  state: (): StoreInterface => ({
    coins: [],
    stats: initialStatsInterface,
    isLoading: false,
    searchInput: '',
    searchFavoritesCoin: [],
    noFound: false,
    noFavorites: false,
    error: false,
    offset: 0,
  }),

  actions: {

    /// All Components

    updateIsLoading() {
      this.isLoading = true;
    },

    responseSearchCoinsError() {
      this.isLoading = false;
      this.error = true;
    },

    updateOffset(newOffset: number) {
      this.offset = newOffset;
    },

    /// Coins Component

    responseSearchCoins(coins: CoinInterface[], stats: StatsInterface) {
      this.isLoading = false;
      this.coins = coins;
      this.stats = stats;
      this.noFound = coins.length === 0
    },

    updateSearchParameters(newValueInput: string) {
      this.searchInput = newValueInput;
      this.offset = 0;
    },

    //// Favorite Component

    responseSearchFavoriteCoins(coins: CoinInterface[], stats: StatsInterface) {
      this.isLoading = false;
      this.coins = coins;
      this.stats = stats;
    },

    updateNoFavorites() {
      this.noFavorites = true;
    },

    updateNoFound() {
      this.noFound = true;
      this.noFavorites = false;
      this.coins = []
    },



    updateCoins(uuid: string) {
      this.coins = this.coins.filter(crypto => crypto.uuid !== uuid);
      this.noFavorites = this.coins.length === 0
    },

    updateSearchFavoritesCoin(newFavoritesCoin: string[]) {
      this.searchFavoritesCoin = newFavoritesCoin;
      this.noFound = false;
      this.noFavorites = this.coins.length === 0;
    },



  }
});

