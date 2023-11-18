<script setup lang="ts">
import { Ref, ref, toRefs, watchEffect } from 'vue';
import { useSearchCoinStore } from '../../stores/searchCoinStore';
import { usePaginationCoinStore } from '../../stores/paginationCoinStore';

const { stats } = toRefs(useSearchCoinStore());
const paginationStore = usePaginationCoinStore();
const { offset, items } = toRefs(paginationStore);
const MIN_PAGES_TO_SHOW: Ref<number> = ref(3), MAX_PAGES_TO_SHOW: Ref<number> = ref(4);
const isPreviousLinkEnabled: Ref<boolean> = ref(false), isNextLinkEnabled: Ref<boolean> = ref(false);
const pagesToShow: Ref<number[]> = ref([]);

const isPreviousClickEnabled = () => offset.value > 0;
const isNextClickEnabled = () => offset.value < parseInt(stats.value.total) - items.value;

const calculatePageRange = (totalPages: number, currentPage: number) => {
    if (totalPages <= MAX_PAGES_TO_SHOW.value) { 
        return { startPage: 1, endPage: totalPages }; 
    };

    if (currentPage <= MIN_PAGES_TO_SHOW.value) { 
        return { startPage: 1, endPage: MAX_PAGES_TO_SHOW.value }; 
    };

    if (currentPage > totalPages - MIN_PAGES_TO_SHOW.value) { 
        return { startPage: totalPages - MIN_PAGES_TO_SHOW.value, endPage: totalPages };
    };

    return { startPage: currentPage - 1, endPage: currentPage + 1 };
};

const calculatePageNumbers = () => {
    const totalPages: number = Math.ceil((parseInt(stats.value.total) || 1) / items.value);
    const currentPage: number = (offset.value / items.value) + 1;

    isNextLinkEnabled.value = currentPage <= totalPages - MIN_PAGES_TO_SHOW.value;
    isPreviousLinkEnabled.value = currentPage > MIN_PAGES_TO_SHOW.value;

    const { startPage, endPage } = calculatePageRange(totalPages, currentPage);

    pagesToShow.value = Array.from({ length: endPage - startPage + 1 }, (_, i) => i + startPage);
};

watchEffect(() => {
    calculatePageNumbers();
});
</script>

<template>
    <nav aria-label="Page navigation">
        <div class="flex justify-center my-10">

            <div class="mr-3 sm:mr-5">
                <a href="#" :class="[isPreviousClickEnabled() ? 'bg-blue-600 hover:bg-blue-700' : 'border-blue-600 border cursor-default', 'inline-flex items-center px-2.5 h-8 sm:px-4 sm:h-9 text-white rounded-full']"
                    @click="isPreviousClickEnabled() && paginationStore.setOffset(offset - items)">
                    <svg class="w-3 sm:w-3.5 h-3 sm:h-3.5 sm:mr-2" aria-hidden="true" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5H1m0 0 4 4M1 5l4-4" />
                    </svg>
                    <span class="hidden sm:block">Prev</span>
                </a>
            </div>

            <ul class="inline-flex items-center space-x-px sm:space-x-2 text-sm">   

                <li v-if="isPreviousLinkEnabled">
                    <a href="#" class="flex items-center px-2 h-8 fold:px-3.5 fold:h-9 text-white rounded-lg hover:bg-blue-600/30"
                        @click="paginationStore.resetOffset()">
                        1
                    </a>
                </li>
                
                <span v-if="isPreviousLinkEnabled" class="h-4 w-px bg-gray-400" aria-hidden="true"></span>

                <li v-for="page in pagesToShow" :key="page">
                    <a href="#" :class="[page * items === offset + items ? 'bg-white hover:bg-white/90' : 'text-white hover:bg-blue-600/30', 'flex items-center px-2 h-8 fold:px-3.5 fold:h-9 rounded-lg']"
                        @click="paginationStore.setOffset(items * (page - 1))">
                        {{ page }}
                    </a>
                </li>

                <span v-if="isNextLinkEnabled" class="h-4 w-px bg-gray-400" aria-hidden="true"></span>

                <li v-if="isNextLinkEnabled">
                    <a href="#" class="flex items-center px-2 h-8 fold:px-3.5 fold:h-9 text-white rounded-lg hover:bg-blue-600/30"
                        @click="paginationStore.setOffset(Math.max(0, (Math.ceil(parseInt(stats.total) / items) - 1) * items))">
                        {{ Math.ceil(parseInt(stats.total)  / items) }}
                    </a>
                </li> 
                             
            </ul>
    
            <div class="ml-3 sm:ml-5">
                <a href="#" :class="[isNextClickEnabled() ? 'bg-blue-600 hover:bg-blue-700' : 'border-blue-600 border cursor-default', 'inline-flex items-center px-2.5 h-8 sm:px-4 sm:h-9 text-white rounded-full']"
                    @click="isNextClickEnabled() && paginationStore.setOffset(offset + items)">
                    <span class="hidden sm:block">Next</span>
                    <svg class="w-3 sm:w-3.5 h-3 sm:h-3.5 sm:ml-2" aria-hidden="true" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                    </svg>
                </a>
            </div>
        </div>
    </nav>
</template>