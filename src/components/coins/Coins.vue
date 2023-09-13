<script setup lang="ts">
import { ref } from '@vue/reactivity';
import { Ref, onMounted, watch } from 'vue';
import { getCoinsCurrencies } from '../../services/CoinService';
import { Coin, Stats } from '../../interfaces/Data';
import Jumbotron from '../jumbotron/Jumbotron.vue';
import SearchCoins from '../searchCoins/SearchCoins.vue';
import Canvas from '../canvas/Canvas.vue';
import Pagination from '../pagination/Pagination.vue';

const coins: Ref<Coin[]> = ref([]);
const stats: Ref<Stats> = ref({} as Stats);
const isLoading: Ref<boolean> = ref(false);
// const noFound: Ref<aboolean> = ref(true);
const offset: Ref<number> = ref(0);
const error: Ref<string> = ref("");
const isIconActive: Ref<boolean> = ref(true);

const loadData = async (offset: number): Promise<void> => {
    try {
        const data = await getCoinsCurrencies(offset);
        coins.value = data.coins;
        stats.value = data.stats;
        isLoading.value = true;
    } catch (err: unknown) {
        error.value = (err as Error).message;
    }
};

const renderTable = async (): Promise<void> => {
    isLoading.value = false
    await loadData(offset.value);
}

onMounted(renderTable);

watch(offset, () => {
  renderTable()
});

/**
 * Add or remove a cryptocurrency from favorites based on its UUID.
 * @param uuid The UUID of the cryptocurrency to add or remove from favorites.
 */
const addFavorite = (uuid: string): void => {
    // Toggle the favorite icon state
    isIconActive.value = !isIconActive.value;

    // Get the current favorites from localStorage or initialize as an empty array
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

    // Find the index of the cryptocurrency in the favorites array
    const index = favorites.indexOf(uuid);

    if (index !== -1) {
        // If the cryptocurrency is already in favorites, remove it
        favorites.splice(index, 1);
    } else {
        // If the cryptocurrency is not in favorites, add it
        favorites.push(uuid);
    }

    // Save the updated favorites array back to localStorage
    localStorage.setItem('favorites', JSON.stringify(favorites));
};

/**
 * Change the color class for an icon based on whether a cryptocurrency with the given UUID is in favorites.
 * @param uuid The UUID of the cryptocurrency to check.
 * @returns The CSS class for the icon color.
 */
const changeColorIcon = (uuid: string) => {
    // Get the list of UUIDs from localStorage or initialize as an empty array
    const localUuids = JSON.parse(localStorage.getItem('favorites') || '[]');

    if (localUuids.includes(uuid)) {
        // If the cryptocurrency's UUID is in favorites, return a class for red color
        return 'fill-red-600'; // Red color class
    } else {
        // If the cryptocurrency's UUID is not in favorites, return a class for blue color with reduced opacity
        return 'fill-blue-500/50'; // Blue color class with reduced opacity
    }
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
const formatMonetaryAmount = (amount: number) => {
    const suffixes = ["", "K", "Million", "Billion", "Trillion"]; // Suffixes for monetary amounts
    const precision = 2; // Precision for rounding the value
    const symbol = "$"; // Currency symbol

    let index = 0; // Index to determine the appropriate suffix

    while (amount >= 1000 && index < suffixes.length - 1) {
        amount /= 1000; // Divide the amount by 1000
        index++;
    }

    // Return the amount formatted with the currency symbol, rounded value, and the corresponding suffix.
    return `${symbol} ${amount.toFixed(precision)} ${suffixes[index]}`;
};
</script>

<template>

    <Jumbotron :stats="stats"></Jumbotron>

    <SearchCoins @onChangeCoins="coins = $event" @offsef="offset = $event"></SearchCoins>

    <section class="mx-auto max-w-7xl px-2.5 sm:px-6 lg:px-8">

    
            <table class="w-full text-[12px] sm:text-sm text-left text-white">

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

                    <tr v-if="!isLoading">
                        <td colspan="5" class="px-1 py-20">
                            <div role="status" class="flex justify-center h-[3080px] w-full">
                                <svg aria-hidden="true"
                                    class="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                                    viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                        fill="currentColor" />
                                    <path
                                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                        fill="currentFill" />
                                </svg>
                                <span class="sr-only">Loading...</span>
                            </div>
                        </td>
                    </tr>

                    <tr v-else class="border-b border-gray-700" v-for="(cryptos, index) in coins" :key="index">

                        <th scope="row" class="px-1 py-2">

                            <div class="flex items-center space-x-3 sm:space-x-4">

                                <span>
                                    <button class="focus:outline-none" type="button" @click="addFavorite(cryptos.uuid)">
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
                                    <a :href="cryptos.coinrankingUrl" target="_blank" rel="noopener" class="sm:text-base">{{
                                        cryptos.name ? cryptos.name : "--" }}</a>
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
                                    formatMonetaryAmount(parseInt(cryptos.marketCap)) }}</span>
                            </div>
                        </td>

                        <td class="hidden sm:table-cell whitespace-nowrap px-1 py-2">
                            {{ formatMonetaryAmount(parseInt(cryptos.marketCap)) }}
                        </td>

                        <td class="px-1 py-2">
                            <div class="flex flex-col items-end">
                                <span
                                    :class="{ 'text-red-600': cryptos.change && cryptos.change.includes('-'), 'text-green-400': cryptos.change && !cryptos.change.includes('-') }">
                                    {{ cryptos.change ? cryptos.change.includes('-') ? cryptos.change : '+' + cryptos.change
                                        : "--%" }}
                                </span>                               
                                <Canvas :sparkline="cryptos.sparkline" :change="cryptos.change" :index="index"></Canvas>
                            </div>
                        </td>

                    </tr>

                </tbody>
            </table>

    </section>

    <Pagination :stats="stats" @offsef="offset = $event"></Pagination>

</template>
