<script setup lang="ts">
import { ref } from '@vue/reactivity';
import { Ref, onMounted, watch } from 'vue';
import { getFavoritesCoinsCurrencies } from '../../services/CoinService';
import { DataInterface, CoinInterface, StatsInterface } from '../../interfaces/DataInterface';
import Jumbotron from '../jumbotron/Jumbotron.vue';
import SearchCoins from '../searchCoins/SearchCoins.vue';
import IsLoading from '../isLoading/IsLoading.vue';
import NoFound from '../noFound/NoFound.vue';
import Error from '../error/Error.vue';
import Canvas from '../canvas/Canvas.vue';
import Pagination from '../pagination/Pagination.vue';

const coins: Ref<CoinInterface[]> = ref([]);
const stats: Ref<StatsInterface> = ref({} as StatsInterface);
const isLoading: Ref<boolean> = ref(true);
const noFound: Ref<boolean> = ref(false);
const error: Ref<boolean> = ref(false);
const offset: Ref<number> = ref(0);
const isIconActive: Ref<boolean> = ref(false);
const localCoinStorage: Ref<string[]> = ref(JSON.parse(localStorage.getItem('favorites') || '[]'));

const searchCoinsCurrencies = async (): Promise<void> => {
    try {
        const data: DataInterface = await getFavoritesCoinsCurrencies();
        coins.value = data.coins;
        stats.value = data.stats;
    } catch (err: unknown) {
        //console.error(err)
        error.value = true;
    } finally {
        isLoading.value = false;
    };
};

/**
 * Add or remove a cryptocurrency from favorites based on its UUID.
 * @param uuid The UUID of the cryptocurrency to add or remove from favorites.
 */
const addCoinFavorites = (uuid: string): void => {
    isIconActive.value = !isIconActive.value;

    if (localCoinStorage.value.includes(`&uuids[]=${uuid}`)) {
        // Si el UUID ya está en favoritos, quítalo
        localCoinStorage.value = localCoinStorage.value.filter(item => item !== `&uuids[]=${uuid}`);
    } else {
        // Si el UUID no está en favoritos, agrégalo
        localCoinStorage.value.push(`&uuids[]=${uuid}`);
    };

    // Guarda la lista actualizada de favoritos en localStorage
    localStorage.setItem('favorites', JSON.stringify(localCoinStorage.value));
};

/**
 * Change the color class for an icon based on whether a cryptocurrency with the given UUID is in favorites.
 * @param uuid The UUID of the cryptocurrency to check.
 * @returns The CSS class for the icon color.
 */
const changeColorIcon = (uuid: string) => {
    if (localCoinStorage.value.includes(uuid)) {
        // If the cryptocurrency's UUID is in favorites, return a class for red color
        return 'fill-red-600'; // Red color class
    } else {
        // If the cryptocurrency's UUID is not in favorites, return a class for blue color with reduced opacity
        return 'fill-blue-500/50'; // Blue color class with reduced opacity
    };
};

/**
 * Converts a numerical amount into a formatted string as US Dollars (USD).
 * @param {number} amount - The numerical amount to be converted.
 * @returns {string} - A string representing the amount in US Dollars currency format.
 */
const convertToDollar = (amount: number): string => {
    // Define formatting options for the number.
    const options = {
        style: 'currency', // Set the style to "currency" for currency formatting.
        currency: 'USD',   // Set the currency to United States Dollars (USD).
        minimumFractionDigits: 2, // Set the minimum number of fractional digits to 2.
        maximumFractionDigits: 3, // Set the maximum number of fractional digits to 3.
    };

    // Format the price as currency in USD and manually add the "$" symbol and space.
    // Use the toLocaleString method to format the amount based on the provided options.
    // Then, replace the "$" symbol with "$ " to add a space after the dollar symbol.
    return amount.toLocaleString('en-US', options).replace('$', '$ ');
};

/**
 * Format a given monetary amount with suffixes (K, Million, Billion, Trillion) and a currency symbol.
 * @param amount The monetary amount to format.
 * @returns A formatted text string that includes the currency symbol, rounded value, and the corresponding suffix.
 */
const formatCurrencyWithSuffix = (amount: number): string => {
    // Array of suffixes for large numbers (K, Million, Billion, Trillion, etc.)
    const suffixes: string[] = ["", "K", "Million", "Billion", "Trillion"];

    // Number of decimal places to round the amount to
    const precision: number = 2;

    // Currency symbol to be prepended to the formatted amount
    const symbol: string = "$";

    // Initialize an index to track the appropriate suffix
    let index: number = 0;

    // Check if the amount is greater than or equal to 1000 and not exceeding the available suffixes
    while (amount >= 1000 && index < suffixes.length - 1) {
        // Divide the amount by 1000 (e.g., 10000 becomes 10)
        amount /= 1000;
        // Move to the next suffix in the array
        index++;
    };

    // Format the amount with the currency symbol, rounded to the specified precision, and the determined suffix
    return `${symbol} ${amount.toFixed(precision)} ${suffixes[index]}`;
};

onMounted(() => {
    searchCoinsCurrencies();
});

watch(offset, () => {
    isLoading.value = true;
    searchCoinsCurrencies();
});
</script>

<template>

    <Jumbotron :stats="stats"></Jumbotron>

    <SearchCoins :localCoinStorage="localCoinStorage" @emitsCoins="coins = $event" @emitsIsLoading="isLoading = $event" @emitsNoFound="noFound = $event" @emitsError="error = $event"  @emitsOffset="offset = $event"></SearchCoins>

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
                                    <button class="focus:outline-none" type="button" @click="addCoinFavorites(cryptos.uuid)">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                            :class="['w-4 h-4 inline-block align-text-bottom', changeColorIcon(cryptos.uuid), isIconActive ?? 'fill-blue-500']">
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
                                <span :class="[ cryptos.change ? cryptos.change.includes('-') ? 'text-red-600' : 'text-green-400' : 'text-blue-500/50' ]">
                                    {{ cryptos.change ? cryptos.change.includes('-') ? cryptos.change : '+' + cryptos.change : "--%" }}
                                </span>                               
                                <Canvas :sparkline="cryptos.sparkline" :change="cryptos.change" :index="index"></Canvas>
                            </div>
                        </td>

                    </tr>

                </tbody>
            </table>

            <NoFound v-if="noFound" @emitsOffset="offset = $event"></NoFound>

            <Error v-if="error" @emitsOffset="offset = $event"></Error>

    </section>

    <Pagination :totalCoins="stats.totalCoins" @offset="offset = $event"></Pagination>

</template>