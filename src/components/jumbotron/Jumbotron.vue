<script setup lang="ts">
import { toRefs } from 'vue';
import { useCoinsStore } from '../../stores/coinsStore';
import { formatAmountStats, formatAmountToLocaleString } from '../../helpers/amountFormatting';

const { stats, error } = toRefs(useCoinsStore());
</script>

<template>
    <section>
        <div class="mx-auto max-w-7xl text-center px-2.5 sm:px-6 lg:px-8 py-8 sm:py-14">
            <h1 class="mb-8 leading-[80px] text-7xl lg:text-8xl font-bold font-display text-white tracking-normal">
                <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500">Crypto</span> Ranked Price
            </h1>
            <p class="mb-6 text-base md:text-lg lg:text-xl font-sans fold:px-5 sm:px-16 md:px-32 lg:px-48 text-gray-400">
                All coins listed, you get circulating supplies, social links, logos, blocks. explorers, sparklines and more. We have it all.
            </p>
            <ul class="flex flex-row fold:justify-center scrollbar whitespace-nowrap overflow-x-auto touch-pan-x space-x-3 sm:space-x-5 lg:space-x-9">   
                <!-- Market Cap -->
                <li class="flex flex-col items-center">
                    <span class="inline-flex text-sm sm:text-base leading-9 whitespace-nowrap text-white">
                        {{ formatAmountStats(parseInt(stats.totalMarketCap), error)}}
                        <button class="focus:outline-none" type="button" v-tooltip="'The market cap of All coins combined.'">
                            <svg class="w-5 h-5 ml-2 stroke-blue-500 hover:stroke-blue-600" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                            </svg>
                            <span class="sr-only">Show information</span>
                        </button>
                    </span>
                    <span class="text-sm sm:text-base leading-7 whitespace-nowrap text-gray-400">Market Cap</span>
                </li>
                <!-- Trading Volume -->
                <li class="flex flex-col items-center">
                    <span class="inline-flex text-sm sm:text-base leading-9 whitespace-nowrap text-white">
                        {{ formatAmountStats(parseInt(stats.total24hVolume), error) }}
                        <button class="focus:outline-none" type="button" v-tooltip="'The 24-hour trading volume of All coins combined.'">
                            <svg class="w-5 h-5 ml-2 stroke-blue-500 hover:stroke-blue-600" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                            </svg>
                            <span class="sr-only">Show information</span>
                        </button>
                    </span>
                    <span class="text-sm sm:text-base leading-7 whitespace-nowrap text-gray-400">Trading Volume</span>
                </li>
                <!-- Total Coins -->
                <li class="flex flex-col items-center">
                    <span class="text-sm sm:text-base leading-9 text-white">{{ formatAmountToLocaleString(stats.totalCoins, error) }}</span>
                    <span class="text-sm sm:text-base leading-7 whitespace-nowrap text-gray-400">All Coins</span>
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
    background: #ffffff!important;;
    color: #2b2b2b!important;;
    font-size: 14px!important;;
    font-family: Quicksand, sans-serif!important;;
    text-align: center!important;;
    margin-left: 10px!important;;
    margin-right: 10px!important;;
}

.v-popper--theme-tooltip .v-popper__arrow-inner {
    visibility: visible!important;;
    border-color: #fff!important;;
}

.v-popper--theme-tooltip .v-popper__arrow-outer {
    border-color: #0a0000!important;;
}
</style>