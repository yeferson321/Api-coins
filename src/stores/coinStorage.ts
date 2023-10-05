import { defineStore } from 'pinia';

export const useCoinStorageStore = defineStore('coinStorage', {
  state: () => ({
    coinStorage: JSON.parse(localStorage.getItem('favorites') || '[]') as string[]
  }),

  actions: {
    addCoinStorage(uuid: string, name: string) {
      const coinIdentifier: string = `&uuids[]=${uuid}&name=${name.toLowerCase()}`;
      
      if (this.coinStorage.includes(coinIdentifier)) {
        this.coinStorage = this.coinStorage.filter(item => item !== coinIdentifier);
      } else {
        this.coinStorage.push(coinIdentifier);
      };

      localStorage.setItem('favorites', JSON.stringify(this.coinStorage));
    },

    removeCoinFavoriteStorage(uuid: string, name: string) {
      const coinIdentifier: string = `&uuids[]=${uuid}&name=${name.toLowerCase()}`;

      if (this.coinStorage.includes(coinIdentifier)) {
        this.coinStorage = this.coinStorage.filter(item => item !== coinIdentifier);
      };

      localStorage.setItem('favorites', JSON.stringify(this.coinStorage));
    }
  }
});