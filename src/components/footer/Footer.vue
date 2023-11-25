<script setup lang="ts">
// An array of objects is defined with information about different navigation links.
const navigation = [
    { name: 'Rapidapi', href: 'https://rapidapi.com/Coinranking/api/coinranking1' },
    { name: 'Coinranking', href: 'https://developers.coinranking.com/api' },
    { name: 'Chartjs', href: 'https://www.chartjs.org/docs/latest' },
    { name: 'GitHub', href: 'https://github.com/yeferson321/Api-coins' },
];
</script>

<template>
    <footer class="border-t border-neutral-800 bg-neutral-900/70">
        <div class="w-full mx-auto max-w-7xl px-2.5 sm:px-6 lg:px-8 py-5 sm:py-10">
            <div class="sm:flex sm:items-center sm:justify-between">
                <a href="/" class="flex items-center mb-4 sm:mb-0">
                    <svg class="flex-none mr-3 w-8 h-8 stroke-blue-600" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke-width="2" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19,3,12.74,9.68a1,1,0,0,1-1.48,0L5,3"></path>
                        <path data-name="primary" d="M19,21l-6.26-6.68a1,1,0,0,0-1.48,0L5,21"></path>
                    </svg>
                    <span class="self-center text-2xl font-display text-white">Coinsver</span>
                </a>
                <ul class="flex flex-wrap items-center mb-6 text-sm text-gray-400 sm:mb-0">
                    <li v-for="item in navigation" :key="item.name">
                        <a :href="item.href" target="_blank" rel="noopener" class="mr-4 hover:underline md:mr-6" aria-current="page">{{ item.name }}</a>
                    </li>
                </ul>
            </div>
            <hr class="my-6 border-neutral-800 sm:mx-auto lg:my-8" />
            <span class="block text-sm text-gray-400 sm:text-center">© {{ new Date().getFullYear() }}
                <a href="#" class="hover:underline">Coinsver™</a>. All Rights Reserved.
            </span>
        </div>
    </footer>
</template>