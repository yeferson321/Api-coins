<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();
</script>

<template>
    <div class="py-20">
        <div class="text-center h-[50vh]">
            <h1 class="text-3xl text-blue-500/50 sm:text-5xl">No favorites</h1>
            <p class="mt-6 text-sm sm:text-base leading-7 text-gray-400">Add coins to your favorites by clicking their heart icons.</p>
            <button class="mt-6 text-sm sm:text-base px-4 py-1.5 rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition duration-450 ease-in-out focus:outline-none"
                type="button" @click="router.push('/')">
                See all coins
            </button>
        </div>
    </div>
</template>