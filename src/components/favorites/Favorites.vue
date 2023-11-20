<script setup lang="ts">
import { onMounted, toRefs, watch } from 'vue';
import { DataInterface } from '../../interfaces/DataInterface';
import { formatAmountToDollar, formatAmountWithSuffixe } from '../../helpers/amountFormatting';
import { getSearchFavoritesCoins } from '../../services/CoinService';
import { useSearchCoinStore } from '../../stores/searchCoinStore';
import { useFavoriteCoinStore } from '../../stores/favoriteCoinStore';
import SearchFavoriteCoins from '../searchFavoriteCoins/SearchFavoriteCoins.vue';
import IsLoading from '../isLoading/IsLoading.vue';
import LoadMore from '../loadMore/LoadMore.vue';
import Canvas from '../canvas/Canvas.vue';
import NoFound from '../noFound/NoFound.vue';
import NoFavorites from '../noFavorites/NoFavorites.vue';
import Error from '../error/Error.vue';

// Get instances of the stores and references to their reactive attributes.
const searchCoinStore = useSearchCoinStore();
const { coins, stats, searchFavorite, isLoading, noFound, noFavorites, error } = toRefs(useSearchCoinStore());
const favoriteCoinStore = useFavoriteCoinStore();
const { favoriteCoin } = toRefs(favoriteCoinStore);

// The `fetchSearchResults` function is an asynchronous function that is responsible for fetching search results based on the provided search criteria.
const fetchSearchResults = async (searchFavoriteCoin: string[], favoriteCoin: string[]) => {
    if (!favoriteCoin.length) return searchCoinStore.setNoFavorites();

    // The line assigns the value of `searchFavoriteCoin` to the variable `valueSearch` if `searchFavoriteCoin` has a length greater than 0. Otherwise, 
    // it assigns the value of `favoriteCoin` to `valueSearch`.
    let valueSearch = searchFavoriteCoin.length ? searchFavoriteCoin : favoriteCoin;

    searchCoinStore.setIsLoading();
    try {
        // The line is destructuring the response object returned by the `getSearchCoins` function.
        const { coins, stats }: DataInterface = await getSearchFavoritesCoins(valueSearch);
        // The line is updating the reactive attributes `coins`, `stats`, and `noFound` in the `searchCoinStore` store with the provided values.
        searchCoinStore.setSearchCoins(coins, stats, false);
    } catch (err: unknown) {
        //console.error(err);
        // The line indicates that an error occurred during the search process.
        searchCoinStore.setSearchError();
    };
};

// The `removeCoinFavorite` function is responsible for removing a coin from the favorite list.
const removeCoinFavorite = (uuid: string, name: string) => {
    // This line removes a coin from the `searchCoinStore` store. Takes the parameter "uuid", which is the unique identifier of the currency to be removed.
    searchCoinStore.removeCoin(uuid);
    // This line removing the coin from the store and also from the localstore.
    favoriteCoinStore.toggleFavoriteCoin(uuid, name);

    // This code block is checking if there are any coins in the `coins` array.
    if (coins.value.length) return;
    // This line checks if there are favorite coins in the `favoriteCoin` array. If there are, call the `fetchSearchResults` function with the values `searchFavorite` 
    // and `favoriteCoin`. If there are no favorite coins, call the `searchCoinStore.setNoFavorites()` function to set the `noFavorites` flag in the `searchCoinStore` store.
    favoriteCoin.value.length ? fetchSearchResults(searchFavorite.value, favoriteCoin.value) : searchCoinStore.setNoFavorites();
};

// The `onMounted` function is a lifecycle hook provided by Vue. It is used to perform an action when the component is mounted and ready to be rendered.
onMounted(() => { fetchSearchResults(searchFavorite.value, favoriteCoin.value)});

// The `watch` function is used to watch for changes in the `searchFavorite` variable.
watch(() => searchFavorite.value, () => {
    fetchSearchResults(searchFavorite.value, favoriteCoin.value);
});
</script>

<template>
    <SearchFavoriteCoins></SearchFavoriteCoins>
    <section class="mx-auto max-w-7xl px-1 fold:px-2.5 sm:px-6 lg:px-8">
        <table class="w-full min-w-[260px] table-fixed text-xs sm:text-sm text-left text-white">
            <thead class="text-xs sm:text-sm uppercase text-gray-400">
                <tr>
                    <th scope="col" class="px-1 sm:px-2 py-2 whitespace-nowrap w-[55%] sm:w-[40%]">                     
                        All Coins {{ parseInt(stats.total) !== 0 ? stats.total : '0' }}
                    </th>
                    <th scope="col" class="px-1 sm:px-2 py-2 whitespace-nowrap w-[22%] sm:w-[20%]">
                        Price
                    </th>
                    <th scope="col" class="hidden sm:table-cell px-2 py-2 whitespace-nowrap w-[20%]">
                        Market cap
                    </th>
                    <th scope="col" class="px-1 sm:px-2 py-2 text-end whitespace-nowrap w-[23%] sm:w-[20%]">
                        24h
                    </th>
                </tr>
            </thead>
            <tbody>
                <IsLoading v-if="isLoading"></IsLoading>               
                <tr v-else class="border-b border-gray-700" v-for="(cryptos, index) in coins" :key="index">
                    <th scope="row" class="px-1 sm:px-2 py-2">
                        <div class="flex items-center space-x-2 fold:space-x-3 sm:space-x-5">
                            <button @click="removeCoinFavorite(cryptos.uuid, cryptos.name)" type="button" class="focus:outline-none">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                    :class="['w-4 h-4', favoriteCoinStore.getIconColor(cryptos.uuid, cryptos.name), 'fill-blue-500']">
                                    <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                                </svg>
                            </button>
                            <div>{{ cryptos.rank }}</div>
                            <div class="w-7 sm:w-10 h-7 sm:h-10 rounded-full border-2 overflow-hidden flex items-center justify-center flex-none bg-white">
                                <img class="w-5 sm:w-8 h-5 sm:h-8" :src="cryptos.iconUrl" alt="coin image">
                            </div>
                            <div class="text-ellipsis overflow-hidden">
                                <a :href="cryptos.coinrankingUrl" target="_blank" rel="noopener">{{ cryptos.name }}</a>
                                <div class="text-gray-400 text-ellipsis overflow-hidden">{{ cryptos.symbol }}</div>
                            </div>
                        </div>
                    </th>
                    <td class="px-1 sm:px-2 py-2">
                        <div class="whitespace-nowrap text-ellipsis overflow-hidden">{{ formatAmountToDollar(parseFloat(cryptos.price)) }}</div>
                        <div class="sm:hidden text-gray-400 whitespace-nowrap text-ellipsis overflow-hidden">{{ formatAmountWithSuffixe(parseFloat(cryptos.marketCap)) }}</div>
                    </td>
                    <td class="hidden sm:table-cell px-1 sm:px-2 py-2">
                        {{ formatAmountWithSuffixe(parseFloat(cryptos.marketCap)) }}
                    </td>
                    <td class="px-1 sm:px-2 py-2">
                        <div class="flex flex-col items-end">
                            <div :class="[cryptos .change ? cryptos.change.includes('-') ? 'text-red-600' : 'text-green-400' : 'text-blue-500/50']">
                                {{ cryptos.change ? cryptos.change.includes('-') ? cryptos.change : '+' + cryptos.change : "--%" }}
                            </div>
                            <Canvas :sparkline="cryptos.sparkline" :change="cryptos.change" :index="index"></Canvas>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
        <LoadMore v-if="!error && !noFound && !noFavorites"></LoadMore>
        <NoFound v-if="noFound"></NoFound>
        <NoFavorites v-if="noFavorites"></NoFavorites>
        <Error v-if="error"></Error>
    </section>
</template>