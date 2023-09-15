<script setup lang="ts">
import { ref } from "@vue/reactivity";
import { Ref, onMounted, watch, watchEffect } from "vue";
import { Stats } from "../../interfaces/Data";

const pagesToShow = ref<number[]>([]);
const offset: Ref<number> = ref(0);
const items: Ref<number> = ref(50);

const props = defineProps({
    stats: {
        type: Object as () => Stats,
        required: true,
    }
});

const emits = defineEmits<{
    (event: "offsef", value: number): void;
}>();

onMounted(() => {
    console.log("watchEffect")
    const totalPages = Math.ceil(props.stats.total / items.value) - 1; // Subtract 1 here
    const currentPage = Math.floor(offset.value / items.value) + 1;

    let startPage: number, endPage;

    if (totalPages <= 2) {
        // If total pages are 2 or less, show all pages.
        startPage = 2;
        endPage = totalPages + 2;
    } else if (currentPage <= 2) {
        // If near the beginning, show the first three pages.
        startPage = 2;
        endPage = 4;
    } else if (currentPage >= totalPages - 1) {
        // If near the end, show the last three pages.
        startPage = totalPages - 2;
        endPage = totalPages;
    } else {
        startPage = currentPage - 1;
        endPage = currentPage + 1;
    }

    pagesToShow.value = Array.from({ length: endPage - startPage + 1 }, (_, i) => i + startPage);
});

watch(offset, () => {
    emits('offsef', offset.value);
    console.log("watch")
});
</script>

<template>
    <nav aria-label="Page navigation">
        <div class="flex justify-center my-10">
            <!-- Previous Button -->
            <div class="mr-3 sm:mr-5">
                <a href="#" @click="offset > 0 ? offset -= items : null"
                     class="inline-flex items-center px-3 sm:px-4 h-9 text-sm text-white rounded-full"
                    :class="offset > 0 ? 'bg-blue-600 hover:bg-blue-700' : 'border-blue-600 border cursor-default'">
                    <svg class="w-3 sm:w-3.5 h-3 sm:h-3.5 sm:mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                        fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M13 5H1m0 0 4 4M1 5l4-4" />
                    </svg>
                    <span class="hidden sm:block">Prev</span>
                </a>
            </div>
            <!-- Page Buttons -->
            <ul class="inline-flex items-center space-x-1 sm:space-x-1.5 text-base">
                <li @click="offset = 0">
                    <a href="#"
                        class="flex items-center px-3 sm:px-3.5 h-9 text-sm rounded-lg"
                        :class="offset === 0 ? 'bg-white hover:bg-white/90' : 'text-white hover:bg-blue-600/30'">
                        1
                    </a>
                </li>
                <span v-if="offset > 150" class="h-4 w-px bg-gray-200" aria-hidden="true"></span>
                <li v-for="page in pagesToShow" :key="page">
                    <a href="#"
                        class="flex items-center px-3 sm:px-3.5 h-9 text-sm rounded-lg"
                        :class="page * items === offset + items ? 'bg-white hover:bg-white/90' : 'text-white hover:bg-blue-600/30'"
                        @click="offset = items * (page - 1)">
                        {{ page }}
                    </a>
                </li>
                <span v-if="offset < props.stats.total - items - 100" class="h-4 w-px bg-gray-200"
                    aria-hidden="true"></span>
                <li @click="offset = props.stats.total - items">
                    <a href="#"
                        class="flex items-center px-3 sm:px-3.5 h-9 text-sm rounded-lg"
                        :class="offset === props.stats.total - 50 ? 'bg-white hover:bg-white/90' : 'text-white hover:bg-blue-600/30'">
                        {{ Math.ceil(props.stats.total / items) }}
                    </a>
                </li>
            </ul>
            <!-- Next Button -->
            <div class="ml-3 sm:ml-5">
                <a href="#" @click="offset < props.stats.total - items ? offset += items : null"
                    class="inline-flex items-center px-3 sm:px-4 h-9 text-sm text-white rounded-full"
                    :class="offset < props.stats.total - items ? 'bg-blue-600 hover:bg-blue-700' : 'border-blue-600 border'">
                    <span class="hidden sm:block">Next</span>
                    <svg class="w-3 sm:w-3.5 h-3 sm:h-3.5 sm:ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                        fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M1 5h12m0 0L9 1m4 4L9 9" />
                    </svg>
                </a>
            </div>
        </div>
    </nav>
</template>