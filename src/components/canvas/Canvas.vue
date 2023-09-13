<script setup lang="ts">
import { ref } from '@vue/reactivity';
import { PropType, Ref, onMounted, watch } from 'vue';
import { Chart, ChartConfiguration } from 'chart.js/auto';
import { ChartDataset } from '../../interfaces/ChartDataset';

const props = defineProps({
    sparkline: {
        type: Array as PropType<number[]>,
        required: true,
    },
    change: {
        type: String,
        required: true,
    },
    index: {
        type: Number,
        required: true,
    }
});

const charts: Ref<Chart[]> = ref([]);

const createGradient = (ctx: CanvasRenderingContext2D, change: string) => {
    const gradient = ctx.createLinearGradient(0, 0, 0, 25);
    gradient.addColorStop(0, change?.includes("-") ? "#DC2626b3" : "#4EDE80C4");
    gradient.addColorStop(1, "transparent");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 96, 37);

    return gradient;
}

const createData = (sparkline: number[], change: string, gradient: CanvasGradient) => {
    const sparklineData = sparkline ?? ["0", "0"];
    const minValue = Math.min(...sparklineData.filter((val) => val != null));
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
                borderColor: change
                    ? change.includes("-")
                        ? "#DC2626"
                        : "#4ADE80"
                    : "#5F80B2",
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

const renderChart = (sparkline: number[], change: string, index: number): void => {

    const canvas = document.getElementById(`Chart-${index}`) as HTMLCanvasElement;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const gradient = createGradient(ctx, change);
    const data = createData(sparkline, change, gradient);
    const chartConfig = createChartConfig(data);

    if (charts.value[index]) {
        charts.value[index].destroy();
        console.log(`Destroyed chart with ID 'Chart-${index}'`);
    }

    const chart = new Chart(canvas, chartConfig);
    charts.value[index] = chart;

};

onMounted(() => {
    renderChart(props.sparkline, props.change, props.index);
});

watch(props.sparkline, () => {
    try {
        renderChart(props.sparkline, props.change, props.index);
    } catch (error) {
        console.error('Error during chart rendering:', error);
    }
});

</script>

<template>
    <span>
        <canvas :id="`Chart-${props.index}`" class="w-[50px] sm:w-[100px]" style="height: 20px;">
            Your browser does not support the canvas element.
        </canvas>
    </span>
</template>