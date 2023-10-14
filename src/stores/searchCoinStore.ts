import { defineStore } from 'pinia';
import { CoinInterface, StatsInterface, StoreInterface, initialStatsInterface  } from '../interfaces/indexInterface';

export const useSearchCoinStore = defineStore('searchCoinStore', {
  state: (): StoreInterface => ({
    coins: [],
    stats: initialStatsInterface,
    isLoading: true,
    valueInput: '',
    noFound: false,
    error: false,
    offset: 0,
  }),

  actions: {
    responseSearch(coins: CoinInterface[], stats: StatsInterface) {
      this.isLoading = false;
      this.coins = coins;
      this.stats = stats;
      this.noFound = coins.length === 0
    },

    responseSearchError() {
      this.isLoading = false;
      this.error = true;
    },

    updateSearchParameters(newValueInput: string){
      this.valueInput = newValueInput;
      this.isLoading = true;
      this.offset = 0;
    },

    updateOffset(newOffset: number) {
      //this.offset = Object.is(this.offset, newOffset) ? -newOffset : newOffset;
      this.isLoading = true;
      this.offset = newOffset;
    }

  }
});

