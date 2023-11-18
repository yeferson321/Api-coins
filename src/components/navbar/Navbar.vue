<script setup lang="ts">
const navigation = [
  { name: 'Rapidapi', href: 'https://rapidapi.com/Coinranking/api/coinranking1', button: false },
  { name: 'Coinranking', href: 'https://developers.coinranking.com/api', button: false },
  { name: 'Chartjs', href: 'https://www.chartjs.org/docs/latest', button: false },
  { name: 'GitHub', href: 'https://github.com/yeferson321/Api-coins', button: true},
];
</script>

<template>
    <nav class="bg-neutral-950">
        <div class='mx-auto max-w-7xl px-2.5 sm:px-6 lg:px-8'>
            <div class="flex items-center justify-between h-16">
                <a href="/" class="flex items-center">
                    <svg class="w-8 h-8 mr-4 stroke-blue-600" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke-width="2" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19,3,12.74,9.68a1,1,0,0,1-1.48,0L5,3"></path>
                        <path data-name="primary" d="M19,21l-6.26-6.68a1,1,0,0,0-1.48,0L5,21"></path>
                    </svg>
                    <span class="self-center text-2xl font-cursive whitespace-nowrap text-white">Coinsver</span>
                </a>
                <div class="flex ml-4 sm:hidden">
                    <a :href="navigation[3].href" target="_blank" rel="noopener" class="text-white hover:text-black border border-white rounded-lg hover:bg-white px-5 py-2 text-sm transition duration-450 ease-in-out">{{ navigation[3].name }}</a>
                </div>
                <div class="hidden sm:flex">
                    <div class="flex items-baseline space-x-4">
                        <a v-for="item in navigation" :key="item.name" :href="item.href" target="_blank" rel="noopener" :class="[item.button ? 'text-white hover:text-black border border-white rounded-lg px-5 hover:bg-white transition duration-450 ease-in-out' : 'text-gray-400 hover:text-white', 'p-1 text-base']" aria-current="page">{{ item.name }}</a>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>