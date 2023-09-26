<script setup lang="ts">
import { ref } from "@vue/reactivity";
import { Ref, watch, watchEffect } from "vue";

const offset: Ref<number> = ref(0);
const items: Ref<number> = ref(50);
const pagesToShow: Ref<number[]> = ref([]);
const nextLink: Ref<boolean> = ref(false)
const previousLink: Ref<boolean> = ref(false)

// Define component props using defineProps
const props = defineProps({
    totalCoins: {
        type: Number,
        required: true,
        default: 0,
    }
});

// Define custom emits for the component
const emits = defineEmits<{
    (event: "offset", value: number): void;
}>();

// Define a function to calculate and update the pages to be displayed
const calculatePageNumbers = () => {
    // Calculate the totalCoins number of pages
    const totalCoinsPages: number = Math.ceil(props.totalCoins / items.value);
  
    // Calculate the current page based on offset and items per page
    const currentPage: number = (offset.value / items.value) + 1;

    // Calculate the start and end pages to be displayed
    let startPage: number = currentPage - 1;
    let endPage: number = currentPage + 1;

    if (totalCoinsPages <= 4) {
        startPage = 1;
        endPage = totalCoinsPages;
    } else {
      // Adjust startPage and endPage based on specific conditions
        if (startPage < 3) {
            startPage = 1;
            endPage = 4;
            nextLink.value = true
            previousLink.value = false
        } else if (endPage > totalCoinsPages - 2) {
            endPage = totalCoinsPages;
            startPage = Math.max(1, totalCoinsPages - 3);
            nextLink.value = false
            previousLink.value = true
        } else {
            nextLink.value = true
            previousLink.value = true
        }
    }

    // Generate an array of page numbers to be displayed
    pagesToShow.value = Array.from({ length: endPage - startPage + 1 }, (_, i) => i + startPage);
}

watchEffect(() => {
    calculatePageNumbers();
});

// Watch the offset for changes and emit an event when it changes
watch(offset, () => {
    emits('offset', offset.value);
    calculatePageNumbers();
});
</script>

<template>
    <!-- HTML template for page navigation -->
    <nav aria-label="Page navigation">
        <div class="flex justify-center my-10">
            <!-- Previous page button -->
            <div class="mr-3 sm:mr-5">
                <a href="#" :class="[offset > 0 ? 'bg-blue-600 hover:bg-blue-700' : 'border-blue-600 border cursor-default', 'inline-flex items-center px-3 sm:px-4 h-9 text-sm text-white rounded-full']"
                    @click="offset > 0 && (offset -= items)">
                    <svg class="w-3 sm:w-3.5 h-3 sm:h-3.5 sm:mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5H1m0 0 4 4M1 5l4-4" />
                    </svg>
                    <span class="hidden sm:block">Prev</span>
                </a>
            </div>
            <!-- Page number links -->
            <ul class="inline-flex items-center space-x-1 sm:space-x-1.5">
                <!-- Display page 1 link if offset is greater than 100 -->
                <li v-if="previousLink">
                    <a href="#" class="flex items-center px-3 sm:px-3.5 h-9 text-sm text-white rounded-lg hover:bg-blue-600/30"
                        @click="offset = 0">
                        1
                    </a>
                </li>
                <!-- Display a separator line if offset is greater than 100 -->
                <span v-if="previousLink" class="h-4 w-px bg-gray-400" aria-hidden="true"></span>
                <!-- Loop through pagesToShow to display page number links -->
                <li v-for="page in pagesToShow" :key="page">
                    <a href="#" :class="[page * items === offset + items ? 'bg-white hover:bg-white/90' : 'text-white hover:bg-blue-600/30', 'flex items-center px-3 sm:px-3.5 h-9 text-sm rounded-lg']"
                        @click="offset = items * (page - 1)">
                        {{ page }}
                    </a>
                </li>
                <!-- Display a separator line if offset is less than (totalCoinsCoins - 150) -->
                <span v-if="nextLink" class="h-4 w-px bg-gray-400" aria-hidden="true"></span>
                <!-- Display the last page link if offset is less than (totalCoinsCoins - 150) -->
                <li v-if="nextLink">
                    <a href="#" class="flex items-center px-3 sm:px-3.5 h-9 text-sm text-white rounded-lg hover:bg-blue-600/30"
                        @click="offset = Math.max(0, (Math.ceil(props.totalCoins / items) - 1) * items)">
                        {{ Math.ceil(props.totalCoins / items) }}
                    </a>
                </li>
            </ul>
            <!-- Next page button -->
            <div class="ml-3 sm:ml-5">
                <a href="#" :class="[offset < props.totalCoins - items ? 'bg-blue-600 hover:bg-blue-700' : 'border-blue-600 border cursor-default', 'inline-flex items-center px-3 sm:px-4 h-9 text-sm text-white rounded-full']"
                    @click="offset < props.totalCoins - items && (offset += items)">
                    <span class="hidden sm:block">Next</span>
                    <svg class="w-3 sm:w-3.5 h-3 sm:h-3.5 sm:ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                    </svg>
                </a>
            </div>
        </div>
    </nav>
</template>