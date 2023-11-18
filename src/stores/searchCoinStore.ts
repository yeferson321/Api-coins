import { defineStore } from 'pinia';
import { CoinInterface, StatsInterface, CoinStoreInterface, initialStatsInterface } from '../interfaces/indexInterface';

export const useSearchCoinStore = defineStore('searchCoinStore', {
  state: (): CoinStoreInterface => ({
    coins: [],
    stats: initialStatsInterface,
    isLoading: false,
    searchInput: '',
    searchFavorite: JSON.parse(localStorage.getItem('favorites') || '[]'),
    noFound: false,
    noFavorites: false,
    error: false
  }),

  actions: {
    // All Components
    setIsLoading() {
      this.isLoading = true;
    },

    setSearchError() {
      this.isLoading = false;
      this.error = true;
    },

    setSearchCoins(coins: CoinInterface[], stats: StatsInterface, newNoFound: boolean) {
      this.isLoading = false;
      this.noFound = newNoFound;
      this.coins = coins;
      this.stats = stats;
    },

    // Coins Component
    setSearchInput(newValueInput: string) {
      this.searchInput = newValueInput;
    },

    // Favorite Component
    setSearchFavorites(newValueInput: string[]) {
      this.searchFavorite = newValueInput;
    },

    setNoFavorites() {
      this.noFavorites = true;
    },

    updateView(state: boolean) {
      this.noFound = state;
      this.noFavorites = !state;
      this.coins = [];
    },

    removeCoin(uuid: string) {
      const index = this.coins.findIndex(crypto => crypto.uuid === uuid);
      if (index !== -1) {
        this.coins.splice(index, 1);
      }
    },
    
    // LoadMore Component
    mergeCoins(newCoins: CoinInterface[]){
      const mergedCoins = [...this.coins, ...newCoins];
      this.coins = mergedCoins;
    }
  }
});

