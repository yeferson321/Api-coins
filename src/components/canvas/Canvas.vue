<script setup lang="ts">
import { watchEffect } from 'vue';
import { useCanvas } from './useCanvas.ts'

// Define props received by the component
const props = defineProps({
    sparkline: {
        type: Array as () => string[],
        default: []
    },
    change: {
        type: String,
        default: ""
    },
    index: {
        type: Number,
        required: true,
    }
});

// The line is using the `useCanvas` function to initializes and retrieves the `canvasRef` variable and the `renderChart` function.
const { canvasRef, renderChart } = useCanvas(props);

// The `watch` function is used to watch for changes in the `props` variable.
watchEffect(renderChart);
</script>

<template>
    <div class="relative h-[25px] w-[80%] sm:w-[60%] lg:w-[50%]">
        <canvas ref="canvasRef">
            Your browser does not support the canvas element.
        </canvas>
    </div>
</template>