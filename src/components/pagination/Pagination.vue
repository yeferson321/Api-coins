<script setup lang="ts">
import { ref } from "@vue/reactivity";
import { Ref, watch, watchEffect } from "vue";
import { Stats } from "../../interfaces/Data";

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

watchEffect(() => {
    
})


watch(offset, () => {
    emits('offsef', offset.value);

    console.log(props.stats.total - items.value)
});


</script>

<template>
    <nav>
        <div class="flex justify-center my-10">

            <ul class="inline-flex items-center space-x-3 text-base">

                <li @click="offset > 0 ? offset -= items : null">

                    <a href="#"
                        class="flex items-center justify-center px-4 h-9 text-sm font-medium text-white rounded-full bg-blue-600 hover:bg-blue-700">
                        <svg class="w-3.5 h-3.5 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 14 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M13 5H1m0 0 4 4M1 5l4-4" />
                        </svg> Prev
                    </a>

                </li>

                <li @click="offset = 0">
                    <a href="#" class="flex items-center justify-center px-3.5 h-9 text-sm font-medium text-black rounded-lg bg-white hover:bg-white/50">
                        1
                    </a>
                </li>

                <span class="h-4 w-px bg-gray-200" aria-hidden="true"></span>

                <li @click="offset = 0">
                    <a href="#" class="flex items-center justify-center px-3.5 h-9 text-sm font-medium text-black rounded-lg bg-white hover:bg-white/50">
                        1
                    </a>
                </li>

                <span class="h-4 w-px bg-gray-200" aria-hidden="true"></span>

                <li @click="offset = props.stats.total - items">
                    <a href="#" class="flex items-center justify-center px-3.5 h-9 text-sm font-medium text-black rounded-lg bg-white hover:bg-white/50">
                        {{ Math.ceil(props.stats.total / items) }}
                    </a>
                </li>

                <li @click="offset < props.stats.total - items ? offset += items : null">

                    <a href="#" class="flex items-center justify-center px-4 h-9 text-sm font-medium text-white rounded-full bg-blue-600 hover:bg-blue-700">
                        Next
                        <svg class="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 14 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M1 5h12m0 0L9 1m4 4L9 9" />
                        </svg>
                    </a>

                </li>
            </ul>
    </div>
</nav></template>