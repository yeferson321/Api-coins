// coinsLogic.ts
import { toRefs } from 'vue';
import { toggleFavoriteCoin } from '../../helpers/favoriteCoinsUtils';
import { DataInterface } from '../../interfaces/indexInterface';
import { getSearchCoins } from '../../services/CoinService';
import { useSearchCoinStore } from '../../stores/searchCoinStore';
import { usePaginationCoinStore } from '../../stores/paginationCoinStore';

export const useCoins = () => {
    const searchCoinStore = useSearchCoinStore();
    const { stats, searchInput, noFound, error } = toRefs(searchCoinStore);
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
        stats, searchInput, noFound, error, offset, 
        fetchSearchResults, toggleFavoriteCoin
    };
};