import { defineStore } from 'pinia';

interface favoriteCoinInterface {
  favoriteCoin: string[];
};

export const useFavoriteCoinStore = defineStore('favoriteCoinStore', {
  state: (): favoriteCoinInterface => ({
    favoriteCoin: JSON.parse(localStorage.getItem('favorites') || '[]') 
  }),

  actions: {
    // Method to toggle between adding and removing a coin from the favorites list.
    toggleFavoriteCoin(uuid: string, name: string) {
      const coinIdentifier: string = `&uuids[]=${uuid}&name=${name.toLowerCase()}`;
      const index = this.favoriteCoin.indexOf(coinIdentifier);

      // If the coin is already in favorites, remove it; otherwise, add it.
      if (index !== -1) {
        this.favoriteCoin.splice(index, 1);
      } else {
        this.favoriteCoin.push(coinIdentifier);
      };

      // Update localStorage with the updated favorites list.
      localStorage.setItem('favorites', JSON.stringify(this.favoriteCoin));
    },
  }
});