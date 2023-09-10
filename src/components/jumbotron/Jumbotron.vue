<script setup lang="ts">
import { ref } from '@vue/reactivity';
import { Ref } from 'vue';
import { Stats } from '../../interfaces/Data';

const popoverMarket: Ref<boolean> = ref(false);
const popoverTrading: Ref<boolean> = ref(false);

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
        <div class="mx-auto max-w-7xl px-2.5 py-7 sm:py-10 sm:px-6 lg:px-8">
            <h1 class="mb-6 leading-[60px] sm:leading-none text-5xl md:text-6xl lg:text-7xl text-center font-semibold font-display tracking-tight text-white">
                <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-500">Crypto</span> Ranked
                by Market
            </h1>
            <p class="mb-8 text-base md:text-lg font-normal text-center sm:px-40 lg:px-80 text-gray-400">
                All coins listed, you get circulating supplies, social links, logos, blocks. explorers, sparklines and more.
                We have it all.
            </p>
            <ul class="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-10">
                <li class="relative flex flex-col items-center">
                    <div v-if="popoverMarket" role="tooltip" class="absolute bottom-[100%] w-full min-[400px]:w-max left-1/2 transform -translate-x-1/2 z-10 text-sm transition-opacity duration-300 border rounded-lg text-gray-700 bg-white">
                        <div class="px-3 py-2 text-center">
                            <p>The market cap of All coins combined.</p>
                        </div>
                    </div>
                    <span class="inline-flex text-base leading-9 whitespace-nowrap text-white">
                        {{ props.stats.totalMarketCap ? formatMonetaryAmount(parseInt(props.stats.totalMarketCap) ) : 'Loading...' }}
                        <button class="focus:outline-none" type="button">
                            <svg class="w-5 h-5 ml-2 text-blue-500 hover:text-blue-600" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"
                                @mouseenter="(popoverMarket = true)" @mouseleave="(popoverMarket = false)">
                                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path>
                            </svg>
                            <span class="sr-only">Show information</span>
                        </button>
                    </span>
                    <span class="text-base leading-7 whitespace-nowrap text-gray-400">Market Cap</span>
                </li>
                <li class="relative flex flex-col items-center">
                    <div v-if="popoverTrading" role="tooltip" class="absolute bottom-[100%] w-full min-[400px]:w-max left-1/2 transform -translate-x-1/2 z-10 text-sm transition-opacity duration-300 border rounded-lg text-gray-700 bg-white">
                        <div class="px-3 py-2 text-center">
                            <p>The 24-hour trading volume of All coins combined.</p>
                        </div>
                    </div>
                    <span class="inline-flex text-base leading-9 whitespace-nowrap text-white">
                        {{ props.stats.total24hVolume ?  formatMonetaryAmount(parseInt(props.stats.total24hVolume)) : 'Loading...' }}
                        <button class="focus:outline-none" type="button">
                            <svg class="w-5 h-5 ml-2 text-blue-500 hover:text-blue-600" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"
                                @mouseenter="(popoverTrading = true)" @mouseleave="(popoverTrading = false)">
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