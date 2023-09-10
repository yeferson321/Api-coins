<script setup lang="ts">
import { ref } from '@vue/reactivity';
import { Ref, onMounted, watch, watchEffect } from 'vue';

import { Chart, ChartConfiguration } from 'chart.js/auto';
import { getCoinsCurrencies } from '../../services/CoinService';
import { Coin, Stats } from '../../interfaces/Data';
import { ChartDataset } from '../../interfaces/ChartDataset';

import Jumbotron from '../jumbotron/Jumbotron.vue';
import Pagination from '../pagination/Pagination.vue';

// import noResults from "../noResults/noResults.vue";
// import pagination from "../pagination/pagination.vue";
// import footer from "../footer/footer.vue";

// These lines of code are defining reactive variables using the `ref`.
const coins: Ref<Coin[]> = ref([]);
const stats: Ref<Stats> = ref({} as Stats);
const isLoading: Ref<boolean> = ref(true);
const noFound: Ref<boolean> = ref(true);
const offset: Ref<number> = ref(0);
const error: Ref<string> = ref("");
const isIconActive: Ref<boolean> = ref(true);
const charts: Ref<Chart[]> = ref([]);

const createGradient = (ctx: CanvasRenderingContext2D, change: string,) => {
    const gradient = ctx.createLinearGradient(0, 0, 0, 25);
    gradient.addColorStop(0, change?.includes("-") ? "#DC2626b3" : "#4EDE80C4");
    gradient.addColorStop(1, "transparent");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 96, 37);

    return gradient;
}

const createData = (sparkline: number[], change: string, gradient: CanvasGradient) => {
    const sparklineData = sparkline ?? ["0", "0"];
    const minValue = Math.min(...sparklineData.filter((val) => val != null));
    return {
        labels: sparklineData.map((_, i) => i + 1),
        datasets: [
            {
                label: "Price",
                data: sparklineData.map((val) => val != null ? Number(val) : minValue),
                borderWidth: 1,
                pointRadius: 0,
                pointHoverBorderWidth: 1,
                fill: true,
                borderColor: change
                    ? change.includes("-")
                        ? "#DC2626"
                        : "#4ADE80"
                    : "#5F80B2",
                backgroundColor: gradient,
            },
        ],
    };
};

const createChartConfig = (data: ChartDataset): ChartConfiguration => {
    return {
        type: "line",
        data,
        options: {
            animation: {
                duration: 0,
            },
            scales: {
                y: {
                    display: false,
                },
                x: {
                    display: false,
                },
            },
            plugins: {
                legend: {
                    display: false,
                },
                title: {
                    display: false,
                },
                tooltip: {
                    enabled: false,
                    usePointStyle: false,
                },
            },
        },
    };
};

/* The `renderChart` function receives (coins), (index) as an argument */
const renderChart = (coins: Coin, index: number): void => {
    // Extracts the sparkline and change properties of the coins object.
    const { sparkline, change } = coins;

    /* Finds the canvas element corresponding to the graphic in the DOM using getElementById and the index provided as a parameter. If it doesn't 
    find the element, the function returns without doing anything. */
    const canvas = document.getElementById(`Chart-${index}`) as HTMLCanvasElement;
    if (!canvas) return;

    /* It then gets the 2D context of the canvas and uses it to create a linear gradient using the `createGradient` function, passing the context and 
    the change property of the Coin. */
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const gradient = createGradient(ctx, change)

    /* It then uses the `createData` function to get the data needed to create the chart from the Coin's sparkline property, the change property, 
    and the gradient created earlier. */
    const data = createData(sparkline, change, gradient)

    // With the `createChartConfig` function, the necessary configuration is obtained to create the chart from the previously obtained data.
    const chartConfig = createChartConfig(data)

    //If a chart already exists at position index in the charts array, the function destroys it with the destroy method before creating the new chart.
    if (charts[index]) {
        charts[index].destroy();
    }

    // Finally, it creates the chart using the Chart.js library and saves it at the index position of the charts array.
    const chart = new Chart(canvas, chartConfig);
    charts[index] = chart;
};


/* The `loadData` function receives (offset) as an argument that is used to get the list of coins for a given position. This function is responsible 
for loading data into the application. */
const loadData = async (offset: number): Promise<void> => {
    /* The try-catch function is being used to load data into the application. First, the `getCoinsCurrencies` function is called to get data about 
    coins and statistics. */
    try {
        /* If the data load is successful, the values of the coins and stats are assigned to the reactive variables coins and stats, respectively, and
        the isLoading variable is set to false. */
        const data = await getCoinsCurrencies(offset);
        coins.value = data.coins;
        stats.value = data.stats;
        isLoading.value = false;
    } catch (err: unknown) {
        // If any error occurs during data loading, an error message is assigned to the error reactive variable.
        error.value = (err as Error).message;
    }
};

watchEffect(async () => {
    coins.value = []
    await loadData(offset.value);
    coins.value.forEach(renderChart);
    console.log("hola")
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

    <section class="mx-auto max-w-7xl px-2.5 sm:px-6 lg:px-8">


        <div class="relative">

            <!-- <div class="flex items-center justify-between pb-4 bg-white dark:bg-gray-900">
                <div>
                    <button id="dropdownActionButton" data-dropdown-toggle="dropdownAction"
                        class="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                        type="button">
                        <span class="sr-only">Action button</span>
                        Action
                        <svg class="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 10 6">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="m1 1 4 4 4-4" />
                        </svg>
                    </button>
                
                    <div id="dropdownAction"
                        class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                        <ul class="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownActionButton">
                            <li>
                                <a href="#"
                                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Reward</a>
                            </li>
                            <li>
                                <a href="#"
                                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Promote</a>
                            </li>
                            <li>
                                <a href="#"
                                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Activate
                                    account</a>
                            </li>
                        </ul>
                        <div class="py-1">
                            <a href="#"
                                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete
                                User</a>
                        </div>
                    </div>
                </div>
                <label for="table-search" class="sr-only">Search</label>
                <div class="relative">
                    <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <input type="text" id="table-search-users"
                        class="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Search for users">
                </div>
            </div> -->

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

                    <tr v-if="isLoading">
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
                                <span>
                                    <canvas :id="`Chart-${index}`" class="w-[50px] sm:w-[100px]" style="height: 20px;">
                                        Your browser does not support the canvas element.
                                    </canvas>
                                </span>
                            </div>
                        </td>

                    </tr>


                </tbody>
            </table>



        </div>

    </section>

    <Pagination :stats="stats" @offsef="offset = $event"></Pagination>
</template>
