<script setup lang="ts">
import { useOffsetStore } from '../../stores/offsetStore';

const { updateOffset } = useOffsetStore();
</script>

<template>
    <div class="py-20">
        <div class="text-center h-[50vh]">
            <h1 class="text-3xl font-bold text-blue-500/50 sm:text-5xl">Error loading coins</h1>
            <p class="mt-6 text-sm sm:text-base leading-7 text-gray-400">Sorry, we are working to send you the data.</p>
            <button class="mt-6 text-sm sm:text-base px-4 py-1.5 rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition duration-450 ease-in-out focus:outline-none"
                type="button" @click="updateOffset(0)">
                Try again now
            </button>
        </div>
    </div>
</template>