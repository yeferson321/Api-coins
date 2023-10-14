<script setup lang="ts">
import { toRefs, watchEffect } from 'vue';
import { getSearchCoins } from '../../services/CoinService';
import { DataInterface } from '../../interfaces/indexInterface';
import { useSearchCoinStore } from '../../stores/searchCoinStore';
import { useFavoriteCoinStore } from '../../stores/favoriteCoinStore';
import IsLoading from '../isLoading/IsLoading.vue';
import NoFound from '../noFound/NoFound.vue';
import Error from '../error/Error.vue';
import Canvas from '../canvas/Canvas.vue';
import { formatAmountToDollar, formatAmountWithSuffixe } from '../../helpers/amountFormatting';

const searchCoinStore = useSearchCoinStore();
const { coins, stats, offset, valueInput, isLoading, noFound, error } = toRefs(searchCoinStore);
const favoriteCoinStore = useFavoriteCoinStore();

const fetchSearchResults = async (offset: number, valueInput: string) => {
    try {
        const { coins, stats }: DataInterface = await getSearchCoins(offset, valueInput);
        searchCoinStore.responseSearch(coins, stats);
        console.log(coins)
    } catch (err: unknown) {
        //console.error(err);
        searchCoinStore.responseSearchError();
    }
};

watchEffect(() => {
    fetchSearchResults(offset.value, valueInput.value);
})
</script>

<template>
    <section class="mx-auto max-w-7xl px-2.5 sm:px-6 lg:px-8">
        <table class="w-full min-w-[270px] table-fixed text-xs sm:text-sm text-left text-white">
            <thead class="text-xs sm:text-sm uppercase text-gray-400">
                <tr>
                    <th scope="col" class="px-1 sm:px-2 py-2 whitespace-nowrap w-[55%] sm:w-[40%]">
                        All Coins {{ stats.total !== 0 ? stats.total : '' }}
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
                            <button class="focus:outline-none" type="button" @click="favoriteCoinStore.updateFavoriteCoinStore(cryptos.uuid, cryptos.name)">
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
                            <span :class="[cryptos.change ? cryptos.change.includes('-') ? 'text-red-600' : 'text-green-400' : 'text-blue-500/50']">
                                {{ cryptos.change ? cryptos.change.includes('-') ? cryptos.change : '+' + cryptos.change : "--%" }}
                            </span>
                            <Canvas :sparkline="cryptos.sparkline" :change="cryptos.change" :index="index"></Canvas>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
        <NoFound v-show="noFound"></NoFound>
        <Error v-show="error"></Error>
    </section>
</template>