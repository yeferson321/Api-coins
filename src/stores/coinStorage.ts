import { defineStore } from 'pinia';

export const useCoinStorageStore = defineStore('coinStorage', {

  state: () => ({
    coinStorage: JSON.parse(localStorage.getItem('favorites') || '[]') as string[]
  }),

  actions: {
    addCoinStorage(uuid: string, name: string): void {
      if (this.coinStorage.includes(`&uuids[]=${uuid}&name=${name.toLowerCase()}`)) {
        this.coinStorage = this.coinStorage.filter(item => item !== `&uuids[]=${uuid}&name=${name.toLowerCase()}`);
      } else {
        this.coinStorage.push(`&uuids[]=${uuid}&name=${name.toLowerCase()}`);
      }

      // Guarda la lista actualizada de favoritos en localStorage
      localStorage.setItem('favorites', JSON.stringify(this.coinStorage));
    }
  }
});