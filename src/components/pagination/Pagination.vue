<script setup lang="ts">
import { ref, Ref, toRefs, watchEffect } from 'vue';
import { useSearchCoinStore } from '../../stores/searchCoinStore';

const searchCoinStore = useSearchCoinStore();
const { stats, offset } = toRefs( searchCoinStore );

const items: Ref<number> = ref(50);
const pagesToShow: Ref<number[]> = ref([]);
const previousLink: Ref<boolean> = ref(false);
const nextLink: Ref<boolean> = ref(false);

const previousClick = () =>  offset.value > 0;
const nextClick = () => offset.value < stats.value.total - items.value;

const calculatePageRange = (totalPages: number, currentPage: number) => {
  if (totalPages <= 4) {
    return { startPage: 1, endPage: totalPages, nextLink: false, previousLink: false  };
  };

  if (currentPage <= 3) {
    return { startPage: 1, endPage: 4, nextLink: true, previousLink: false };
  };

  if (currentPage >= totalPages - 2) {
    return { startPage: Math.max(1, totalPages - (4 - 1)), endPage: totalPages, nextLink: false, previousLink: true };
  };

  return { startPage: currentPage - 1, endPage: currentPage + 1, nextLink: true, previousLink: true };
};

const calculatePageNumbers = () => {
    const totalCoinsPages: number = Math.ceil((stats.value.total || 1) / items.value);
    const currentPage: number = (offset.value / items.value) + 1;

    const { startPage, endPage, nextLink: next, previousLink: previous } = calculatePageRange(totalCoinsPages, currentPage);

    nextLink.value = next;
    previousLink.value = previous;

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
                <a href="#" :class="[previousClick() ? 'bg-blue-600 hover:bg-blue-700' : 'border-blue-600 border cursor-default', 'inline-flex items-center p-2.5 sm:px-4 sm:h-9 text-white rounded-full']"
                    @click="previousClick() && searchCoinStore.updateOffset(offset - items)">
                    <svg class="w-3 sm:w-3.5 h-3 sm:h-3.5 sm:mr-2" aria-hidden="true" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5H1m0 0 4 4M1 5l4-4" />
                    </svg>
                    <span class="hidden sm:block">Prev</span>
                </a>
            </div>

            <ul class="inline-flex items-center gap-1 sm:gap-2 text-sm">   

                <li v-if="previousLink">
                    <a href="#" class="flex items-center px-2 h-8 fold:px-3.5 fold:h-9 text-white rounded-lg hover:bg-blue-600/30"
                        @click="searchCoinStore.updateOffset(0)">
                        1
                    </a>
                </li>
                
                <span v-if="previousLink" class="h-4 w-px bg-gray-400" aria-hidden="true"></span>

                <li v-for="page in pagesToShow" :key="page">
                    <a href="#" :class="[page * items === offset + items ? 'bg-white hover:bg-white/90' : 'text-white hover:bg-blue-600/30', 'flex items-center px-2 h-8 fold:px-3.5 fold:h-9 rounded-lg']"
                        @click="searchCoinStore.updateOffset(items * (page - 1))">
                        {{ page }}
                    </a>
                </li>

                <span v-if="nextLink" class="h-4 w-px bg-gray-400" aria-hidden="true"></span>

                <li v-if="nextLink">
                    <a href="#" class="flex items-center px-2 h-8 fold:px-3.5 fold:h-9 text-white rounded-lg hover:bg-blue-600/30"
                        @click="searchCoinStore.updateOffset(Math.max(0, (Math.ceil(stats.total / items) - 1) * items))">
                        {{ Math.ceil(stats.total / items) }}
                    </a>
                </li>              
            </ul>
    
            <div class="ml-3 sm:ml-5">
                <a href="#" :class="[nextClick() ? 'bg-blue-600 hover:bg-blue-700' : 'border-blue-600 border cursor-default', 'inline-flex items-center p-2.5 sm:px-4 sm:h-9 text-white rounded-full']"
                    @click="nextClick() && searchCoinStore.updateOffset(offset + items)">
                    <span class="hidden sm:block">Next</span>
                    <svg class="w-3 sm:w-3.5 h-3 sm:h-3.5 sm:ml-2" aria-hidden="true" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                    </svg>
                </a>
            </div>
        </div>
    </nav>
</template>