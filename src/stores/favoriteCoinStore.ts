import { defineStore } from 'pinia';

interface favoriteCoinInterface {
  favoriteCoin: string[];
};

export const useFavoriteCoinStore = defineStore('favoriteCoinStore', {
  state: (): favoriteCoinInterface => ({
    favoriteCoin: JSON.parse(localStorage.getItem('favorites') || '[]')
  }),

  actions: {
    updateCoinFavorites(index: number, coinIdentifier: string) {
      if (index !== -1) {
        this.favoriteCoin.splice(index, 1);
      } else {
        this.favoriteCoin.push(coinIdentifier);
      };
    }
  }
});