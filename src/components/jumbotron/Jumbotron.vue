<script setup lang="ts">
import { useStatsStore } from '../../stores/statsStore'

const { stats } = useStatsStore()

/**
 * This function takes a number and formats it as a currency amount with an
 * appropriate suffix such as "K" (thousand), "Million" (million), "Billion" (billion),
 * "Trillion" (trillion).
 * @param {number} amount - The numeric amount to be formatted.
 * @returns {string} The formatted amount in currency format with suffix.
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


</script>

<template>
    <section>
        <div class="mx-auto max-w-7xl px-2.5 pt-8 pb-12 sm:pt-10 sm:pb-14 sm:px-6 lg:px-8">
            <!-- Page heading -->
            <h1 class="mb-6 leading-[60px] sm:leading-none text-5xl md:text-6xl lg:text-7xl text-center font-semibold sm:font-display tracking-tight text-white">
                <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-500">Crypto</span> Ranked by Market
            </h1>
            <!-- Page description -->
            <p class="mb-6 text-base md:text-lg text-center sm:px-20 md:px-32 lg:px-60 xl:px-80 text-gray-400">
                All coins listed, you get circulating supplies, social links, logos, blocks. explorers, sparklines and more.
                We have it all.
            </p>
            <!-- Statistics summary -->
            <ul class="flex flex-col min-[400px]:flex-row justify-center space-y-3 min-[400px]:space-y-0 min-[400px]:space-x-4 sm:space-x-5 lg:space-x-10">   
                <!-- Market Cap -->
                <li class="flex flex-col items-center">
                    <span class="inline-flex text-sm sm:text-base leading-9 whitespace-nowrap text-white">
                        {{ stats.totalMarketCap ? formatCurrencyWithSuffix(parseInt(stats.totalMarketCap)) : 'Loading...' }}
                        <button class="focus:outline-none" type="button" v-tooltip="'The market cap of All coins combined.'">
                            <svg class="w-5 h-5 ml-2 text-blue-500 hover:text-blue-600" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path>
                            </svg>
                            <span class="sr-only">Show information</span>
                        </button>
                    </span>
                    <span class="text-sm sm:text-base leading-7 whitespace-nowrap text-gray-400">Market Cap</span>
                </li>
                <!-- Trading Volume -->
                <li class="flex flex-col items-center">
                    <span class="inline-flex text-sm sm:text-base leading-9 whitespace-nowrap text-white">
                        {{ stats.total24hVolume ? formatCurrencyWithSuffix(parseInt(stats.total24hVolume)) : 'Loading...' }}
                        <button class="focus:outline-none" type="button" v-tooltip="'The 24-hour trading volume of All coins combined.'">
                            <svg class="w-5 h-5 ml-2 text-blue-500 hover:text-blue-600" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path>
                            </svg>
                            <span class="sr-only">Show information</span>
                        </button>
                    </span>
                    <span class="text-sm sm:text-base leading-7 whitespace-nowrap text-gray-400">Trading Volume</span>
                </li>
                <!-- Total Coins -->
                <li class="flex flex-col items-center">
                    <span class="text-sm sm:text-base leading-9 text-white">{{ stats.total ? stats.total : 'Loading...' }}</span>
                    <span class="text-sm sm:text-base leading-7 whitespace-nowrap text-gray-400">All Coins</span>
                </li>
            </ul>
        </div>
    </section>
</template>

<style>
.v-popper--theme-tooltip .v-popper__inner{
    background: #fff;
    color: #2b2b2b;
    font-size: 14px;
    font-family: Quicksand, sans-serif;
    text-align: center;
    margin-left: 10px;
    margin-right: 10px;
}

.v-popper--theme-tooltip .v-popper__arrow-inner {
    visibility: visible;
    border-color: #fff;
}

.v-popper--theme-tooltip .v-popper__arrow-outer {
    border-color: #fff;
}
</style>../../stores/statsStore