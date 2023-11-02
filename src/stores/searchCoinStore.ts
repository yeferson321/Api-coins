import { defineStore } from 'pinia';
import { CoinInterface, StatsInterface, StoreInterface, initialStatsInterface } from '../interfaces/indexInterface';

export const useSearchCoinStore = defineStore('searchCoinStore', {
  state: (): StoreInterface => ({
    coins: [],
    stats: initialStatsInterface,
    isLoading: false,
    searchInput: '',
    searchInputFavorites: [],
    noFound: false,
    noFavorites: false,
    error: false,
  }),

  actions: {
    // All Components
    updateIsLoading() {
      this.isLoading = true;
    },

    responseSearchCoinsError() {
      this.isLoading = false;
      this.error = true;
    },

    // Coins Component
    responseSearchCoins(coins: CoinInterface[], stats: StatsInterface) {
      this.isLoading = false;
      this.coins = coins;
      this.stats = stats;
      this.noFound = coins.length === 0
    },

    updateSearchParameters(newValueInput: string) {
      this.searchInput = newValueInput;
    },

    // Favorite Component
    responseSearchFavoriteCoins(coins: CoinInterface[], stats: StatsInterface) {
      this.isLoading = false;
      this.coins = coins;
      this.stats = stats;
    },

    responseSearchNoFavoriteCoins(newStats: StatsInterface) {
      this.isLoading = false;
      this.noFavorites = true;
      //this.noFound = false;
      this.stats = newStats;
    },


    updateCoins(uuid: string) {
      const index = this.coins.findIndex(crypto => crypto.uuid === uuid);

      if (index !== -1) {
        this.coins.splice(index, 1);
      }
    },
    
    updateSearchFavoritesParameters(newValueInput: string[]) {
      this.searchInputFavorites = newValueInput;
    },

    updateNoFavorites() {
      this.noFavorites = true;
      this.noFound = false;
    },

    updateNoFound() {
      this.noFound = true;
      this.noFavorites = false;
    },


    // LoadMore Component
    updateMergedCoins(newCoins: CoinInterface[]){
      const mergedCoins = [...this.coins, ...newCoins];
      this.coins = mergedCoins;
    }
  }
});

