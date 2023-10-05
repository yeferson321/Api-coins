<script setup lang="ts">
import { formatCurrencyWithSuffix } from '../../utils/helpers';
import { useStatsStore } from '../../stores/statsStore';

const { stats } = useStatsStore();
</script>

<template>
    <section>
        <div class="mx-auto max-w-7xl text-center px-2.5 sm:px-6 lg:px-8 py-8 sm:py-14">
            <h1 class="mb-8 leading-[80px] text-7xl lg:text-8xl font-bold font-display text-white tracking-normal">
                <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-500">Crypto</span> Ranked Price
            </h1>
            <p class="mb-6 text-base md:text-lg lg:text-xl xl:text-2xl fold:px-5 sm:px-16 md:px-32 lg:px-48 text-gray-400">
                All coins listed, you get circulating supplies, social links, logos, blocks. explorers, sparklines and more. We have it all.
            </p>
            <ul class="flex flex-row fold:justify-center scrollbar whitespace-nowrap overflow-x-auto touch-pan-x space-x-2 sm:space-x-5 lg:space-x-9">   
                <!-- Market Cap -->
                <li class="flex flex-col items-center">
                    <span class="inline-flex text-sm sm:text-base leading-9 whitespace-nowrap text-white">
                        {{ stats.totalMarketCap ? formatCurrencyWithSuffix(parseInt(stats.totalMarketCap)) : 'Loading...' }}
                        <button class="focus:outline-none" type="button" v-tooltip="'The market cap of All coins combined.'">
                            <svg class="w-5 h-5 ml-2 text-blue-500 hover:text-blue-600" aria-hidden="true" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
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
                            <svg class="w-5 h-5 ml-2 text-blue-500 hover:text-blue-600" aria-hidden="true" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path>
                            </svg>
                            <span class="sr-only">Show information</span>
                        </button>
                    </span>
                    <span class="text-sm sm:text-base leading-7 whitespace-nowrap text-gray-400">Trading Volume</span>
                </li>
                <!-- Total Coins -->
                <li class="flex flex-col items-center">
                    <span class="text-sm sm:text-base leading-9 text-white">{{ stats.totalCoins ? stats.totalCoins : 'Loading...' }}</span>
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