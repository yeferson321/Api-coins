<script setup lang="ts">
import { ref } from "@vue/reactivity";
import { Ref } from "vue";

const popoverMarket: Ref<boolean> = ref(false);
const popoverTrading: Ref<boolean> = ref(false);
</script>

<template>
    <section>
        <div class="mx-auto max-w-7xl py-8 px-4 lg:py-12">
            <h1
                class="mb-6 text-5xl md:text-6xl lg:text-7xl text-center font-semibold font-display tracking-tight leading-none text-white">
                <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-500">Crypto</span> Ranked
                by Market
            </h1>
            <p class="mb-8 text-base font-normal text-center md:text-lg lg:text-xl sm:px-40 lg:px-80 text-gray-400">
                All coins listed, you get circulating supplies, social links, logos, blocks. explorers, sparklines and more.
                We have it all.
            </p>
            <ul class="flex flex-col sm:flex-row sm:justify-center space-y-4 sm:space-y-0 sm:space-x-10">
                <li class="relative flex flex-col items-center">
                    <div v-if="popoverMarket" role="tooltip"
                        class="absolute bottom-[100%] w-full min-[400px]:w-max left-1/2 transform -translate-x-1/2 z-10 text-sm transition-opacity duration-300 border rounded-lg text-gray-400 border-gray-600 bg-gray-800">
                        <div class="px-3 py-2 text-center">
                            <p>The market cap of All coins combined.</p>
                        </div>
                    </div>
                    <span class="inline-flex text-base leading-9 whitespace-nowrap text-white">
                        $ 1.06 Trillion
                        <button class="focus:outline-none" type="button">
                            <svg class="w-5 h-5 ml-2 text-blue-500 hover:text-blue-600" aria-hidden="true"
                                fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"
                                @mouseenter="(popoverMarket = true)" @mouseleave="(popoverMarket = false)">
                                <path fill-rule="evenodd"
                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                                    clip-rule="evenodd"></path>
                            </svg>
                            <span class="sr-only">Show information</span>
                        </button>
                    </span>
                    <span class="text-base leading-7 whitespace-nowrap text-gray-300">Market Cap</span>
                </li>
                <li class="relative flex flex-col items-center">
                    <div v-if="popoverTrading" role="tooltip"
                        class="absolute bottom-[100%] w-full min-[400px]:w-max left-1/2 transform -translate-x-1/2 z-10 text-sm transition-opacity duration-300 border rounded-lg text-gray-400 border-gray-600 bg-gray-800">
                        <div class="px-3 py-2 text-center">
                            <p>The 24-hour trading volume of All coins combined.</p>
                        </div>
                    </div>
                    <span class="inline-flex text-base leading-9 whitespace-nowrap text-white">
                        $ 43.09 Billion
                        <button class="focus:outline-none" type="button">
                            <svg class="w-5 h-5 ml-2 text-blue-500 hover:text-blue-600" aria-hidden="true"
                                fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"
                                @mouseenter="(popoverTrading = true)" @mouseleave="(popoverTrading = false)">
                                <path fill-rule="evenodd"
                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                                    clip-rule="evenodd"></path>
                            </svg>
                            <span class="sr-only">Show information</span>
                        </button>
                    </span>
                    <span class="text-base leading-7 whitespace-nowrap text-gray-300">Trading Volume</span>
                </li>
                <li class="flex flex-col items-center">
                    <span class="text-base leading-9 text-white">29307</span>
                    <span class="text-base leading-7 whitespace-nowrap text-gray-300">All Coins</span>
                </li>
            </ul>
        </div>
    </section>
</template>