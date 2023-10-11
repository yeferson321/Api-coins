import { defineStore } from 'pinia';
import { CoinInterface, StatsInterface, StoreInterface  } from '../interfaces/indexInterface';

const initialStats: StatsInterface = {
  total: 0,
  totalCoins: 0,
  totalMarkets: 0,
  totalExchanges: 0,
  totalMarketCap: '',
  total24hVolume: '',
};

export const useCoinsStore = defineStore('coinsStore', {
  state: (): StoreInterface => ({
    coins: [],
    stats: initialStats,
    isLoading: true,
    noFound: false,
    error: false
  }),

  actions: {
    responseCoins(coins: CoinInterface[], stats: StatsInterface) {
      this.isLoading = false;
      this.coins = coins;
      this.stats = stats;
    },

    responseError() {
      this.isLoading = false;
      this.coins = [];
      this.stats = initialStats;
      this.error = true;
    },

    responseSearch(coins: CoinInterface[], stats: StatsInterface) {
      this.isLoading = false;
      
      //stats.total = coins.length;
      
      this.coins = coins;
      this.stats = stats;
      this.noFound = coins.length === 0
      this.error = false;
    },

    responseClear() {
      this.error = false
      this.noFound = false
    },

    updateIsLoading() {
      this.isLoading = true
    },

  }

});

