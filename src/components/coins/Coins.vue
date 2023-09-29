<script setup lang="ts">
import { ref } from '@vue/reactivity';
import { Ref, watchEffect } from 'vue';
import { changeColorIcon, convertToDollar, formatCurrencyWithSuffix } from '../../utils/helpers';
import { getAllCoins } from '../../services/CoinService';
import { DataInterface, CoinInterface } from '../../interfaces/DataInterface';
import { useStatsStore } from '../../stores/statsStore'
import { useCoinStorageStore } from '../../stores/coinStorage'
import SearchCoins from '../searchCoins/SearchCoins.vue';
import IsLoading from '../isLoading/IsLoading.vue';
import NoFound from '../noFound/NoFound.vue';
import Error from '../error/Error.vue';
import Canvas from '../canvas/Canvas.vue';
import Pagination from '../pagination/Pagination.vue';

const { addState } = useStatsStore();
const coinStorage = useCoinStorageStore();
const coins: Ref<CoinInterface[]> = ref([]);
const isLoading: Ref<boolean> = ref(true);
const noFound: Ref<boolean> = ref(false);
const error: Ref<boolean> = ref(false);
const isIconActive: Ref<boolean> = ref(false);
const localCoinStorage: Ref<string[]> = ref(JSON.parse(localStorage.getItem('favorites') || '[]'));

const searchCoinsCurrencies = async () => {
    isLoading.value = true;
    try {
        const data: DataInterface = await getAllCoins();
        coins.value = data.coins;
        addState(data.stats);
    } catch (err: unknown) {
        //console.error(err)
        error.value = true;
    } finally {
        isLoading.value = false;
    };
};

watchEffect(() => {
    searchCoinsCurrencies();
});
</script>

<template>
    <SearchCoins :localCoinStorage="localCoinStorage" @emitsCoins="coins = $event" @emitsIsLoading="isLoading = $event"
        @emitsNoFound="noFound = $event" @emitsError="error = $event"></SearchCoins>

    <section class="mx-auto max-w-7xl px-2.5 sm:px-6 lg:px-8">

        <table class="table-auto w-full text-[12px] sm:text-sm text-left text-white">

            <thead class="text-sm uppercase text-gray-400">
                <tr>
                    <th scope="col" class="px-1 py-3">
                        All Coins
                    </th>
                    <th scope="col" class="hidden md:table-cell px-1 py-3">
                        Symbol
                    </th>
                    <th scope="col" class="px-1 py-3">
                        Price
                    </th>
                    <th scope="col" class="hidden sm:table-cell px-1 py-3">
                        Market cap
                    </th>
                    <th scope="col" class="text-end px-1 py-3">
                        Sparkline
                    </th>
                </tr>
            </thead>

            <tbody>

                <IsLoading v-if="isLoading"></IsLoading>

                <tr v-else class="border-b border-gray-700" v-for="(cryptos, index) in coins" :key="index">

                    <th scope="row" class="px-1 py-2">

                        <div class="flex items-center space-x-3 sm:space-x-4">

                            <span>
                                <button class="focus:outline-none" type="button"
                                    @click="coinStorage.addCoinStorage(cryptos.uuid, cryptos.name)">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                        :class="['w-4 h-4 inline-block align-text-bottom', changeColorIcon(cryptos.uuid, cryptos.name, coinStorage.coinStorage), isIconActive ?? 'fill-blue-500']">
                                        <path
                                            d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                                    </svg>
                                </button>
                            </span>

                            <span>
                                {{ cryptos.rank ? cryptos.rank : "--" }}
                            </span>

                            <span
                                class="bg-white rounded-full border-2 overflow-hidden flex items-center justify-center w-7 sm:w-10 h-7 sm:h-10">
                                <img class="w-5 sm:w-8 h-5 sm:h-8 object-cover" :src="cryptos.iconUrl" alt="coin icon">
                            </span>

                            <div class="flex flex-col">
                                <a :href="cryptos.coinrankingUrl" target="_blank" rel="noopener" class="sm:text-base">
                                    {{ cryptos.name ? cryptos.name : "--" }}</a>
                                <span class="text-gray-400">{{ cryptos.symbol ? cryptos.symbol : "--" }}</span>
                            </div>

                        </div>

                    </th>

                    <td class="hidden md:table-cell px-1 py-2">
                        {{ cryptos.symbol ? cryptos.symbol : "--" }}
                    </td>

                    <td class="px-1 py-2">
                        <div class="flex flex-col">
                            <span class="whitespace-nowrap">{{ convertToDollar(parseInt(cryptos.price)) }}</span>
                            <span class="block sm:hidden text-gray-400 whitespace-nowrap">{{
                                formatCurrencyWithSuffix(parseInt(cryptos.marketCap)) }}</span>
                        </div>
                    </td>

                    <td class="hidden sm:table-cell whitespace-nowrap px-1 py-2">
                        {{ formatCurrencyWithSuffix(parseInt(cryptos.marketCap)) }}
                    </td>

                    <td class="px-1 py-2">
                        <div class="flex flex-col items-end">
                            <span
                                :class="[cryptos.change ? cryptos.change.includes('-') ? 'text-red-600' : 'text-green-400' : 'text-blue-500/50']">
                                {{ cryptos.change ? cryptos.change.includes('-') ? cryptos.change : '+' + cryptos.change : "--%" }}
                            </span>
                            <Canvas :sparkline="cryptos.sparkline" :change="cryptos.change" :index="index"></Canvas>
                        </div>
                    </td>

                </tr>

            </tbody>
        </table>

        <NoFound v-if="noFound"></NoFound>

        <Error v-if="error"></Error>

    </section>

    <Pagination></Pagination>

</template>