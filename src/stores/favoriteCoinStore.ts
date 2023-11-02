import { defineStore } from 'pinia';

export const useFavoriteCoinStore = defineStore('favoriteCoinStore', {
  state: () => ({
    favoriteCoin: JSON.parse(localStorage.getItem('favorites') || '[]')
  }),

  actions: {
    toggleFavoriteCoin(uuid: string, name: string) {
      const coinIdentifier = `&uuids[]=${uuid}&name=${name.toLowerCase()}`;
      const index = this.favoriteCoin.indexOf(coinIdentifier);

      if (index !== -1) {
        this.favoriteCoin.splice(index, 1);
      } else {
        this.favoriteCoin.push(coinIdentifier);
      }

      localStorage.setItem('favorites', JSON.stringify(this.favoriteCoin));
    },

    getIconColor(uuid: string, name: string) {
      const coinIdentifier: string = `&uuids[]=${uuid}&name=${name.toLowerCase()}`;
      return this.favoriteCoin.includes(coinIdentifier) ? 'fill-red-600' : 'fill-blue-500/50';
    }
  }
});