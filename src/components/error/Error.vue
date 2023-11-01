<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();
const reloadPage = () => router.go(0);
</script>

<template>
    <div class="py-20">
        <div class="text-center h-[50vh]">
            <h1 class="text-3xl text-blue-500/50 sm:text-5xl">Error loading coins</h1>
            <p class="mt-6 text-sm sm:text-base leading-7 text-gray-400">Sorry, we are working to send you the data.</p>
            <button @click="reloadPage()" type="button" class="mt-6 text-sm sm:text-base px-4 py-1.5 rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition duration-450 ease-in-out focus:outline-none">
                Try again now
            </button>
        </div>
    </div>
</template>