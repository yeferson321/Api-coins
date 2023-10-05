<script setup lang="ts">
import { ref } from "@vue/reactivity";
import { Ref, toRefs, watchEffect } from "vue";
import { useOffsetStore } from '../../stores/offsetStore';
import { useStatsStore } from '../../stores/statsStore';

const { offset, updateOffset } = toRefs(useOffsetStore());
const { stats } = useStatsStore();

const items: Ref<number> = ref(50);
const pagesToShow: Ref<number[]> = ref([]);
const nextLink: Ref<boolean> = ref(false);
const previousLink: Ref<boolean> = ref(false);

const calculatePageRange = (totalPages: number, currentPage: number) => {
    let startPage: number, endPage: number;

    if (totalPages <= 4) {
        startPage = 1;
        endPage = totalPages;
    } else if (currentPage <= 4 - 1) {
        startPage = 1;
        endPage = 4;
        nextLink.value = true;
        previousLink.value = false;
    } else if (currentPage >= totalPages - 2) {
        endPage = totalPages;
        startPage = Math.max(1, totalPages - (4 - 1));
        nextLink.value = false;
        previousLink.value = true;
    } else {
        startPage = currentPage - 1;
        endPage = currentPage + 1;
        nextLink.value = true;
        previousLink.value = true;
    }

    return { startPage, endPage };
};

const calculatePageNumbers = () => {
    if (isNaN(stats.total)) { return }

    const totalCoinsPages: number = Math.ceil(stats.total / items.value);
    const currentPage: number = (offset.value / items.value) + 1;

    const { startPage, endPage } = calculatePageRange(totalCoinsPages, currentPage);

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
                <a href="#" :class="[offset > 0 ? 'bg-blue-600 hover:bg-blue-700' : 'border-blue-600 border cursor-default', 'inline-flex items-center px-3 sm:px-4 h-9 text-white rounded-full']"
                    @click="offset > 0 && updateOffset(offset -= items)">
                    <svg class="w-3 sm:w-3.5 h-3 sm:h-3.5 sm:mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5H1m0 0 4 4M1 5l4-4" />
                    </svg>
                    <span class="hidden sm:block">Prev</span>
                </a>
            </div>
            <ul v-if="stats.totalCoins" class="inline-flex items-center gap-1 sm:gap-1.5 text-sm">              
                <li v-if="previousLink">
                    <a href="#" class="flex items-center px-3 sm:px-3.5 h-9 text-white rounded-lg hover:bg-blue-600/30"
                        @click="updateOffset(0)">
                        1
                    </a>
                </li>
                <span v-if="previousLink" class="h-4 w-px bg-gray-400" aria-hidden="true"></span>
                <li v-for="page in pagesToShow" :key="page">
                    <a href="#" :class="[page * items === offset + items ? 'bg-white hover:bg-white/90' : 'text-white hover:bg-blue-600/30', 'flex items-center px-3 sm:px-3.5 h-9 rounded-lg']"
                        @click="updateOffset(items * (page - 1))">
                        {{ page }}
                    </a>
                </li>
                <span v-if="nextLink" class="h-4 w-px bg-gray-400" aria-hidden="true"></span>
                <li v-if="nextLink">
                    <a href="#" class="flex items-center px-3 sm:px-3.5 h-9 text-white rounded-lg hover:bg-blue-600/30"
                        @click="updateOffset(Math.max(0, (Math.ceil(stats.total / items) - 1) * items))">
                        {{ Math.ceil(stats.total / items) }}
                    </a>
                </li>              
            </ul>
            <div v-else role="status" class="inline-flex items-center">
                <svg aria-hidden="true" class="inline w-8 h-8 animate-spin text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
                <span class="sr-only">Loading...</span>
            </div>
            <div class="ml-3 sm:ml-5">
                <a href="#" :class="[offset < stats.total - items ? 'bg-blue-600 hover:bg-blue-700' : 'border-blue-600 border cursor-default', 'inline-flex items-center px-3 sm:px-4 h-9 text-white rounded-full']"
                    @click="offset < stats.total - items && updateOffset(offset + items)">
                    <span class="hidden sm:block">Next</span>
                    <svg class="w-3 sm:w-3.5 h-3 sm:h-3.5 sm:ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                    </svg>
                </a>
            </div>
        </div>
    </nav>
</template>