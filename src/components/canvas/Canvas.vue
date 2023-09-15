<script setup lang="ts">
import { ref } from '@vue/reactivity';
import { PropType, Ref, onMounted } from 'vue';
import { Chart, ChartConfiguration } from 'chart.js/auto';
import { ChartDataset } from '../../interfaces/ChartDataset';

const props = defineProps({
    sparkline: {
        type: Array as PropType<string[]>,
        required: false,
    },
    change: {
        type: String,
        required: false,
    },
    index: {
        type: Number,
        required: true,
    }
});

const charts: Ref<Chart[]> = ref([]);

const createGradient = (ctx: CanvasRenderingContext2D, change: string) => {
    const gradient = ctx.createLinearGradient(0, 0, 0, 25);
    gradient.addColorStop(0,  change !== "0" ? change?.includes("-") ? "#DC2626b3" : "#4EDE80C4" : "#3B82F680");
    gradient.addColorStop(1, "transparent");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 96, 37);

    return gradient;
}

const createData = (sparkline: string[], change: string, gradient: CanvasGradient) => {
    const sparklineData = sparkline.map((val) => parseFloat(val) || 0); // Convierte cadenas a números
    const minValue = Math.min(...sparklineData.filter((val) => val !== null));
    return {
        labels: sparklineData.map((_, i) => i + 1),
        datasets: [
            {
                label: "Price",
                data: sparklineData.map((val) => val != null ? Number(val) : minValue),
                borderWidth: 1,
                pointRadius: 0,
                pointHoverBorderWidth: 1,
                fill: true,
                borderColor: change !== '0' ? change.includes("-") ? "#DC2626" : "#4ADE80" : "#3B82F680",
                backgroundColor: gradient,
            },
        ],
    };
};

const createChartConfig = (data: ChartDataset): ChartConfiguration => {
    return {
        type: "line",
        data,
        options: {
            animation: {
                duration: 0,
            },
            scales: {
                y: {
                    display: false,
                },
                x: {
                    display: false,
                },
            },
            plugins: {
                legend: {
                    display: false,
                },
                title: {
                    display: false,
                },
                tooltip: {
                    enabled: false,
                    usePointStyle: false,
                },
            },
        },
    };
};

const renderChart = async (sparkline: string[], change: string, index: number) => {
    const canvas = document.getElementById(`Chart-${index}`) as HTMLCanvasElement;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const gradient = createGradient(ctx, change);
    if (!gradient) return;

    const data = createData(sparkline, change, gradient);
    const chartConfig = createChartConfig(data);

    const chart = new Chart(canvas, chartConfig);
    charts.value[index] = chart;
};

onMounted(() => {
    renderChart(props.sparkline || ['0', '0'], props.change || '0', props.index);
});
</script>

<template>
    <span>
        <canvas :id="`Chart-${props.index}`" class="w-[50px] sm:w-[100px] my-1" style="height: 20px;">
            Your browser does not support the canvas element.
        </canvas>
    </span>
</template>