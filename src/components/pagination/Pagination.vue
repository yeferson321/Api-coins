<script setup lang="ts">
import { watchEffect } from 'vue';
import { usePagination } from './usePagination';

const { items, pagesToShow, totalPages, currentPage, leftSeparator, rightSeparator, leftButton, rightButton,
    paginationStore, calculatePageNumbers } = usePagination();

watchEffect(() => {
    calculatePageNumbers();
});
</script>

<template>
    <nav aria-label="Page navigation">
        <div class="flex justify-center my-10">
            <div class="mr-3 sm:mr-5">
                <a href="#" :class="[leftButton ? 'bg-blue-600 hover:bg-blue-700' : 'border-blue-600 border cursor-default', 'inline-flex items-center px-2.5 h-8 sm:px-4 sm:h-9 text-white rounded-full']"
                    @click="leftButton && paginationStore.setDecOffset()">
                    <svg class="w-3 sm:w-3.5 h-3 sm:h-3.5 sm:mr-2" aria-hidden="true" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5H1m0 0 4 4M1 5l4-4" />
                    </svg>
                    <span class="hidden sm:block">Prev</span>
                </a>
            </div>
            <ul class="inline-flex items-center space-x-px sm:space-x-2 text-sm">   
                <li v-if="leftSeparator">
                    <a href="#" class="flex items-center px-2 h-8 fold:px-3.5 fold:h-9 text-white rounded-lg hover:bg-blue-600/30"
                        @click="paginationStore.resetOffset()">
                        1
                    </a>
                </li>
                <span v-if="leftSeparator" class="h-4 w-px bg-gray-400" aria-hidden="true"></span>
                <li v-for="page in pagesToShow" :key="page">
                    <a href="#" :class="[page === currentPage ? 'bg-white hover:bg-white/90' : 'text-white hover:bg-blue-600/30', 'flex items-center px-2 h-8 fold:px-3.5 fold:h-9 rounded-lg']"
                        @click="paginationStore.setOffset(items * (page - 1))">
                        {{ page }}
                    </a>
                </li>
                <span v-if="rightSeparator" class="h-4 w-px bg-gray-400" aria-hidden="true"></span>
                <li v-if="rightSeparator">
                    <a href="#" class="flex items-center px-2 h-8 fold:px-3.5 fold:h-9 text-white rounded-lg hover:bg-blue-600/30"
                        @click="paginationStore.setOffset((totalPages - 1) * items)">
                        {{ totalPages }}
                    </a>
                </li> 
            </ul>
            <div class="ml-3 sm:ml-5">
                <a href="#" :class="[rightButton ? 'bg-blue-600 hover:bg-blue-700' : 'border-blue-600 border cursor-default', 'inline-flex items-center px-2.5 h-8 sm:px-4 sm:h-9 text-white rounded-full']"
                    @click="rightButton && paginationStore.setIncOffset()">
                    <span class="hidden sm:block">Next</span>
                    <svg class="w-3 sm:w-3.5 h-3 sm:h-3.5 sm:ml-2" aria-hidden="true" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                    </svg>
                </a>
            </div>
        </div>
    </nav>
</template>