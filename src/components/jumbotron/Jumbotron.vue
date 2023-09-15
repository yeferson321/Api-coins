<script setup lang="ts">
import { Stats } from '../../interfaces/Data';

/**
 * Define the required properties for the component.
 * In this case, the component expects a 'stats' property that should be an object of type 'Stats'.
 */
const props = defineProps({
    stats: {
        type: Object as () => Stats, // Expected type is an object of type 'Stats'.
        required: true, // The 'stats' property is required.
    }
});

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
    <section>
        <div class="mx-auto max-w-7xl px-2.5 pt-8 pb-12 sm:pt-10 sm:pb-14 sm:px-6 lg:px-8">
            <h1 class="mb-6 leading-[60px] sm:leading-none text-5xl md:text-6xl lg:text-7xl text-center font-semibold font-display tracking-tight text-white">
                <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-500">Crypto</span> Ranked by Market
            </h1>
            <p class="mb-6 text-base md:text-lg font-normal text-center sm:px-20 md:px-32 lg:px-60 xl:px-80 text-gray-400">
                All coins listed, you get circulating supplies, social links, logos, blocks. explorers, sparklines and more.
                We have it all.
            </p>
            <ul class="flex flex-col min-[400px]:flex-row justify-center space-y-3 min-[400px]:space-y-0 min-[400px]:space-x-4 sm:space-x-5 lg:space-x-10">   
                <li class="flex flex-col items-center">
                    <span class="inline-flex text-base leading-9 whitespace-nowrap text-white">
                        {{ props.stats.totalMarketCap ? formatMonetaryAmount(parseInt(props.stats.totalMarketCap)) : 'Loading...' }}
                        <button class="focus:outline-none" type="button" v-tooltip="'The market cap of All coins combined.'">
                            <svg class="w-5 h-5 ml-2 text-blue-500 hover:text-blue-600" aria-hidden="true"
                                fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path>
                            </svg>
                            <span class="sr-only">Show information</span>
                        </button>
                    </span>
                    <span class="text-base leading-7 whitespace-nowrap text-gray-400">Market Cap</span>
                </li>
                <li class="flex flex-col items-center">
                    <span class="inline-flex text-base leading-9 whitespace-nowrap text-white">
                        {{ props.stats.total24hVolume ? formatMonetaryAmount(parseInt(props.stats.total24hVolume)) : 'Loading...' }}
                        <button class="focus:outline-none" type="button" v-tooltip="'The 24-hour trading volume of All coins combined.'">
                            <svg class="w-5 h-5 ml-2 text-blue-500 hover:text-blue-600" aria-hidden="true"
                                fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path>
                            </svg>
                            <span class="sr-only">Show information</span>
                        </button>
                    </span>
                    <span class="text-base leading-7 whitespace-nowrap text-gray-400">Trading Volume</span>
                </li>
                <li class="flex flex-col items-center">
                    <span class="text-base leading-9 text-white">{{ props.stats.total ? props.stats.total : 'Loading...' }}</span>
                    <span class="text-base leading-7 whitespace-nowrap text-gray-400">All Coins</span>
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
</style>