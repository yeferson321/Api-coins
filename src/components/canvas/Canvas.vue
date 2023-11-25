<script setup lang="ts">
import { watchEffect } from 'vue';
import { useCanvas } from './useCanvas.ts'

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

// Destructures 'canvasRef' and 'renderChart' from the 'useCanvas' composable.
const { canvasRef, renderChart } = useCanvas(props);

watchEffect(renderChart);
</script>

<template>
    <div class="relative h-[25px] w-[80%] sm:w-[60%] lg:w-[50%]">
        <canvas ref="canvasRef">
            Your browser does not support the canvas element.
        </canvas>
    </div>
</template>