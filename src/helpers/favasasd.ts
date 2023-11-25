import { toRefs } from "vue";
import { useFavoriteCoinStore } from "../stores/favoriteCoinStore";

const { favoriteCoin } = toRefs(useFavoriteCoinStore());

const getIconColor = (uuid: string, name: string) => {
    const coinIdentifier: string = `&uuids[]=${uuid}&name=${name.toLowerCase()}`;
    // Returns a color based on whether the currency is in the favorites list or not.
    return favoriteCoin.value.includes(coinIdentifier) ? 'fill-red-600' : 'fill-blue-500/50';
}