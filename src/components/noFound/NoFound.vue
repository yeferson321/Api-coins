<script setup lang="ts">
import { usePaginationCoinStore } from '../../stores/paginationCoinStore';

// Access the pagination store.
const paginationStore = usePaginationCoinStore();
</script>

<template>
    <div class="py-20">
        <div class="text-center h-[50vh]">
            <h1 class="text-3xl text-blue-500/50 sm:text-5xl">Coin not found</h1>
            <p class="mt-6 text-sm sm:text-base leading-7 text-gray-400">Sorry, we couldn't find the coin you're looking for.</p>
            <button @click="paginationStore.resetOffset()" type="button" class="mt-6 text-sm sm:text-base px-4 py-1.5 rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition duration-450 ease-in-out focus:outline-none">
                Show all coins
            </button>
        </div>
    </div>
</template>