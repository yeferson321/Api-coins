// coinsLogic.ts
import { toRefs } from 'vue';
import { DataInterface } from '../../interfaces/indexInterface';
import { getSearchCoins } from '../../services/CoinService';
import { useSearchCoinStore } from '../../stores/searchCoinStore';
import { useFavoriteCoinStore } from '../../stores/favoriteCoinStore';
import { usePaginationCoinStore } from '../../stores/paginationCoinStore';

export const useCoins = () => {
    const searchCoinStore = useSearchCoinStore();
    const { coins, stats, searchInput, isLoading, noFound, error } = toRefs(searchCoinStore);
    const favoriteCoinStore = useFavoriteCoinStore();
    const { offset } = toRefs(usePaginationCoinStore());

    // Asynchronous function to retrieve coins on page load and potentially search results based on provided offset and search input.
    const fetchSearchResults = async (offset: number, searchInput: string) => {
        searchCoinStore.setIsLoading(); // Setting loading state.
        try {
            const { coins, stats }: DataInterface = await getSearchCoins(offset, searchInput);
            searchCoinStore.setSearchCoins(coins, stats); // Updating the store with fetched data.
        } catch (err: unknown) {
            //console.error(err);
            searchCoinStore.setSearchError();
        };
    };

    return {
        coins, stats, searchInput, isLoading, noFound, error, offset,
        favoriteCoinStore, fetchSearchResults, getIconColor
    };
};