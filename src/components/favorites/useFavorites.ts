// favoritesLogic.ts
import { toRefs } from 'vue';
import { DataInterface } from '../../interfaces/DataInterface';
import { getSearchFavoritesCoins } from '../../services/CoinService';
import { useSearchCoinStore } from '../../stores/searchCoinStore';
import { useFavoriteCoinStore } from '../../stores/favoriteCoinStore';
import { usePaginationCoinStore } from '../../stores/paginationCoinStore';

export const useFavorites = () => {
    // The code is importing and using various stores and their reactive attributes.
    const searchCoinStore = useSearchCoinStore();
    const { coins, searchFavorite, isLoading, noFound, noFavorites, error } = toRefs(useSearchCoinStore());
    const favoriteCoinStore = useFavoriteCoinStore();
    const { favoriteCoin } = toRefs(favoriteCoinStore);
    const { halfItem } = toRefs(usePaginationCoinStore());

    const showMoreHidden = () => coins.value.length === halfItem.value && favoriteCoin.value.length > halfItem.value;
    const showMoreScroll = () => !error.value && !noFound.value && !noFavorites.value;

    // The `fetchSearchResults` function is an asynchronous function that is responsible for fetching search results based on the `searchFavoriteCoin`
    // and `favoriteCoin` values.
    const fetchSearchResults = async (searchFavoriteCoin: string[]) => {
        searchCoinStore.setIsLoading();
        try {
            // The line is destructuring the response object returned by the `getSearchCoins` function.
            const { coins, stats }: DataInterface = await getSearchFavoritesCoins(searchFavoriteCoin);
            // The line is updating the reactive attributes `coins`, `stats`, and `noFound` in the `searchCoinStore` store.
            searchCoinStore.setSearchCoins(coins, stats);
        } catch (err: unknown) {
            //console.error(err);
            // The line is updating the reactive attribute `error` in the `searchCoinStore` store.
            searchCoinStore.setSearchError();
        };
    };

    // The `removeCoinFavorite` function is responsible for removing a coin from the favorite list.
    const removeCoinFavorite = (uuid: string, name: string) => {
        // The line is removing a coin from the array. Takes the parameter "uuid", which is the unique identifier of the currency to be removed.
        searchCoinStore.removeCoin(uuid);
        // The line is removing the currency from the localstore. Two parameters are needed: `uuid`, which is the unique identifier of the currency, and `name`, which is 
        // the name of the currency.
        favoriteCoinStore.toggleFavoriteCoin(uuid, name);

        if (!coins.value.length) return;
        fetchSearchResults(favoriteCoin.value);
    };

    return { 
        coins, searchFavorite, isLoading, noFound, noFavorites, error, favoriteCoin,
        showMoreHidden, showMoreScroll, searchCoinStore, favoriteCoinStore, fetchSearchResults, removeCoinFavorite 
    };
};