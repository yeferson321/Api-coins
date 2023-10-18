import { defineStore } from 'pinia';
import { Ref, ref } from 'vue';

export const useFavoriteCoinStore = defineStore('favoriteCoinstore', () => {
  const favoriteCoin: Ref<string[]> = ref(JSON.parse(localStorage.getItem('favorites') || '[]'));

  function resetFavoriteCoin( ) {
    const favoriteCoin: Ref<string[]> = ref(JSON.parse(localStorage.getItem('favorites') || '[]'));
  }

  function updateFavoriteCoinStore(uuid: string, name: string) {
    const coinIdentifier: string = `&uuids[]=${uuid}&name=${name.toLowerCase()}`;

    if (favoriteCoin.value.includes(coinIdentifier)) {
      favoriteCoin.value = favoriteCoin.value.filter(item => item !== coinIdentifier);
    } else {
      favoriteCoin.value.push(coinIdentifier);
    };

    localStorage.setItem('favorites', JSON.stringify(favoriteCoin.value));
  };

  function removeFavoriteCoinStore(uuid: string, name: string) {
    const coinIdentifier: string = `&uuids[]=${uuid}&name=${name.toLowerCase()}`;

    if (favoriteCoin.value.includes(coinIdentifier)) {
      favoriteCoin.value = favoriteCoin.value.filter(item => item !== coinIdentifier);
    };

    localStorage.setItem('favorites', JSON.stringify(favoriteCoin.value));
  };

  function getIconColor(uuid: string, name: string) {
    const coinIdentifier: string = `&uuids[]=${uuid}&name=${name.toLowerCase()}`;

    return favoriteCoin.value.includes(coinIdentifier) ? 'fill-red-600' : 'fill-blue-500/50';
  };

  return { favoriteCoin, updateFavoriteCoinStore, removeFavoriteCoinStore, getIconColor };
});