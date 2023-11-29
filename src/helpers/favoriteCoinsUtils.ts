import { toRefs } from "vue";
import { useFavoriteCoinStore } from "../stores/favoriteCoinStore";

const favoriteCoinStore = useFavoriteCoinStore();
const { favoriteCoin } = toRefs(favoriteCoinStore);

export const getIconColor = (uuid: string, name: string) => {
  const coinIdentifier: string = `&uuids[]=${uuid}&name=${name.toLowerCase()}`;
  // Returns a color based on whether the currency is in the favorites list or not.
  return favoriteCoin.value.includes(coinIdentifier) ? 'fill-red-600' : 'fill-blue-500/50';
};

export const toggleFavoriteCoin = (uuid: string, name: string) => {
  const coinIdentifier: string = `&uuids[]=${uuid}&name=${name.toLowerCase()}`;
  const index = favoriteCoin.value.indexOf(coinIdentifier);

  // If the coin is already in favorites, remove it; otherwise, add it.
  favoriteCoinStore.updateCoinFavorites(index, coinIdentifier);

  // Update localStorage with the updated favorites list.
  localStorage.setItem('favorites', JSON.stringify(favoriteCoin.value));
};