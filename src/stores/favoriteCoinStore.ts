import { defineStore } from 'pinia';

interface favoriteCoinInterface {
  favoriteCoin: string[];
};

// Definition and creation of the store
export const useFavoriteCoinStore = defineStore('favoriteCoinStore', {
  state: (): favoriteCoinInterface => ({
    // Initialization of the state from the data stored in localStorage
    favoriteCoin: JSON.parse(localStorage.getItem('favorites') || '[]')
  }),

  actions: {
    // Method to toggle between adding and removing a coin from the favorites list
    toggleFavoriteCoin(uuid: string, name: string) {
      const coinIdentifier: string = `&uuids[]=${uuid}&name=${name.toLowerCase()}`;
      const index = this.favoriteCoin.indexOf(coinIdentifier);

       // Si la moneda ya está en favoritos, la eliminamos, de lo contrario la agregamos
      if (index !== -1) {
        this.favoriteCoin.splice(index, 1);
      } else {
        this.favoriteCoin.push(coinIdentifier);
      };

      // Update localStorage with the updated favorites list
      localStorage.setItem('favorites', JSON.stringify(this.favoriteCoin));
    },

    // Method to get the icon color depending on whether the currency is in favorites or not
    getIconColor(uuid: string, name: string) {
      const coinIdentifier: string = `&uuids[]=${uuid}&name=${name.toLowerCase()}`;
      // Returns a color based on whether the currency is in the favorites list or not
      return this.favoriteCoin.includes(coinIdentifier) ? 'fill-red-600' : 'fill-blue-500/50';
    }
  }
});