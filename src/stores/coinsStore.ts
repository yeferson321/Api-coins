import { defineStore } from 'pinia';
import { Ref, ref } from 'vue';
import { CoinInterface, StatsInterface } from '../interfaces/DataInterface';

interface Coins {
  coins: CoinInterface[],
  stats: StatsInterface,
  isLoading: boolean,
  noFound: boolean,
  error: boolean
}

export const useCoinsStore = defineStore('coinsStore', {

  state: (): Coins => ({
    coins: [],
    stats: {
      total: 0,
      totalCoins: 0,
      totalMarkets: 0,
      totalExchanges: 0,
      totalMarketCap: '',
      total24hVolume: ''
    },
    isLoading: true,
    noFound: false,
    error: false
  }),
  
  actions: {
    responseCoins(coins: CoinInterface[], stats: StatsInterface) {
      this.coins = coins;
      this.stats = stats;
      this.isLoading = false;
    },

    responseError() {
      this.isLoading = false;
      this.error = true;
    },

    responseSearch(coins: CoinInterface[], stats: StatsInterface) {
      this.coins = coins;
      this.stats = stats;
      this.isLoading = false;
      this.noFound = coins.length === 0
    },

    responseSearchError() {
      this.coins = [];
      this.isLoading = false;
      this.error = true
      this.stats = {
        total: 0,
        totalCoins: 0,
        totalMarkets: 0,
        totalExchanges: 0,
        totalMarketCap: '',
        total24hVolume: ''
      }
    },

    responseClear() {
      this.coins = []
      this.error = false
      this.noFound = false
      this.isLoading = true
    },
    
    updateIsLoading(){
      this.isLoading = true
    }

  }

});

