<script setup lang="ts">
import { Ref, ref, toRefs } from 'vue';
import { useSearchCoinStore } from '../../stores/searchCoinStore';
import { useFavoriteCoinStore } from '../../stores/favoriteCoinStore';

// Get instances of the stores and references to their reactive attributes
const { stats, error } = toRefs(useSearchCoinStore());
const { favoriteCoin } = toRefs(useFavoriteCoinStore());
const identifyRoute: Ref<boolean> = ref(window.location.pathname === "/favorites")

// This function formats a number with a suffix (K, Million, Billion, etc.)
const formatAmountWithSuffixe = (amount: number, error: boolean) => {
    // If there is an error, return a default value
    if (error) return "--";
    // If we are on a specific route and there are no favorite currencies, show a specific message
    if (identifyRoute.value && !favoriteCoin.value.length) return "$ --";
    // If the value is not a number, display a loading message
    if (isNaN(amount)) return "Loading...";

    // Suffixes for different numerical scales (K, Million, Billion, Trillion)
    const suffixes = ["", "K", "Million", "Billion", "Trillion"];
    let index = 0;

    // Iterates to find the appropriate suffix based on the scale of the number
    while (amount >= 1000 && index < suffixes.length - 1) {
        amount /= 1000;
        index++;
    };

    // Returns the number formatted with the corresponding suffix
    return `${amount.toFixed(2)} ${suffixes[index]}`;
};

// This function formats quantities with thousands separator
const formatAmountMileSeparator = (amount: number, error: boolean) => {
    // If there is an error, return a default value
    if (error) return "--";
    // If we are on a specific route and there are no favorite currencies, show a specific message
    if (identifyRoute.value && !favoriteCoin.value.length) return "No Coins";
    // If the value is not a number, display a loading message
    if (isNaN(amount)) return "Loading...";

    // Returns the value formatted with a mile separator and a maximum of 2 decimal places
    return amount.toLocaleString(undefined, { maximumFractionDigits: 2 });;
};
</script>

<template>
    <section>
        <div class="mx-auto max-w-7xl text-center px-2.5 sm:px-6 lg:px-8 py-8 sm:py-14">
            <h1 class="mb-8 text-6xl fold:text-7xl lg:text-8xl font-bold font-display text-white leading-tight">
                <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500">Crypto</span> Ranked Price
            </h1>
            <p class="mb-6 text-sm fold:text-base sm:text-lg leading-7 sm:px-16 md:px-36 lg:px-56 text-gray-400">
                All coins listed, you get circulating supplies, social links, logos, blocks. explorers, sparklines and more. We have it all.
            </p>
            <ul class="flex flex-row fold:justify-center scrollbar whitespace-nowrap overflow-x-auto touch-pan-x space-x-3 sm:space-x-5 lg:space-x-9">   
                <!-- Market Cap -->
                <li class="flex flex-col items-center">
                    <span class="inline-flex items-center text-sm sm:text-base whitespace-nowrap text-white">
                        {{ formatAmountWithSuffixe(parseInt(stats.totalMarketCap), error) }}
                        <svg class="w-5 h-5 ml-2 stroke-blue-500 hover:stroke-blue-600 focus:outline-none" focusable="false" v-tooltip="'The market cap of All coins combined.'"
                            aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                        </svg>
                        <span class="sr-only">Show information</span>
                    </span>
                    <span class="text-sm sm:text-base whitespace-nowrap text-gray-400">Market Cap</span>
                </li>
                <!-- Trading Volume -->
                <li class="flex flex-col items-center">
                    <span class="inline-flex items-center text-sm sm:text-base whitespace-nowrap text-white">
                        {{ formatAmountWithSuffixe(parseInt(stats.total24hVolume), error) }}
                        <svg class="w-5 h-5 ml-2 stroke-blue-500 hover:stroke-blue-600 focus:outline-none" focusable="false" v-tooltip="'The 24-hour trading volume of All coins combined.'"
                            aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                        </svg>
                        <span class="sr-only">Show information</span>
                    </span>
                    <span class="text-sm sm:text-base whitespace-nowrap text-gray-400">Trading Volume</span>
                </li>
                <!-- Total Coins -->
                <li class="flex flex-col items-center">
                    <span class="text-sm sm:text-base text-white">{{ formatAmountMileSeparator( identifyRoute ? favoriteCoin.length : parseInt(stats.total), error) }}</span>
                    <span class="text-sm sm:text-base whitespace-nowrap text-gray-400">{{ identifyRoute ? "Favorite coins" : "All Coins" }}</span>
                </li>
            </ul>
        </div>
    </section>
</template>

<style>
.scrollbar {
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.scrollbar::-webkit-scrollbar {
  display: none;
}

.v-popper--theme-tooltip .v-popper__inner{
    background: #ffffff!important;
    color: #2b2b2b!important;
    font-size: 14px!important;
    font-family: Quicksand, sans-serif!important;;
    text-align: center!important;
    margin-left: 10px!important;
    margin-right: 10px!important;
}

.v-popper--theme-tooltip .v-popper__arrow-inner {
    visibility: visible!important;
    border-color: #fff!important;
}

.v-popper--theme-tooltip .v-popper__arrow-outer {
    border-color: #0a0000!important;
}
</style>