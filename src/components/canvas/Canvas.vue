<script setup lang="ts">
import { ref, Ref, watchEffect } from 'vue';
import { Chart, ChartConfiguration } from 'chart.js/auto';
import { ChartInterface } from '../../interfaces/ChartInterface';

const charts: Ref<Chart[]> = ref([]);
const canvasRef: Ref<null | HTMLCanvasElement> = ref(null);

const props = defineProps({
    sparkline: {
        type: Array as () => string[],
        required: false,
        default: []
    },
    change: {
        type: String,
        required: false,
        default: ""
    },
    index: {
        type: Number,
        required: true,
    }
});

const createGradient = (ctx: CanvasRenderingContext2D, change: string) => { 
    const gradient: CanvasGradient = ctx.createLinearGradient(0, 0, 0, 24);
    gradient.addColorStop(0, change ? change?.includes("-") ? "#DC2626b3" : "#4EDE80C4" : "#3B82F680");
    gradient.addColorStop(1, "transparent");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 100, 20);

    return gradient;
}

const createData = (sparkline: string[], change: string, gradient: CanvasGradient) => {
    const filteredData: string[] = sparkline.filter(value => value !== null) ?? [];
    const sparklineData: number[] = (filteredData).map(val => parseFloat(val));
    
    return {
        labels: sparklineData.map((_, i) => i + 1),
        datasets: [
            {
                label: "Spark",
                data: sparklineData,
                borderWidth: 1,
                pointRadius: 0,
                pointHoverBorderWidth: 1,
                fill: true,
                borderColor: change ? change.includes("-") ? "#DC2626" : "#4ADE80" : "#3B82F680",
                backgroundColor: gradient,
            },
        ],
    };
};

const createChartConfig = (data: ChartInterface): ChartConfiguration => {
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

const renderChart = (sparkline: string[], change: string, index: number) => {
    const canvas: HTMLCanvasElement | null = canvasRef.value;
    if (!canvas) return;

    // Obtén el contexto del lienzo
    const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");
    if (!ctx) return;

    // Ajusta la resolución para pantallas Retina
    const ratio: number = window.devicePixelRatio || 1;
    canvas.width = canvas.clientWidth * ratio;
    canvas.height = canvas.clientHeight * ratio;
    ctx.scale(ratio, ratio);

    const gradient: CanvasGradient = createGradient(ctx, change);
    if (!gradient) return;

    const data: ChartInterface = createData(sparkline, change, gradient);
    const chartConfig = createChartConfig(data);

    if (charts.value[index]) {
        charts.value[index].destroy();
    };

    const chart = new Chart(canvas, chartConfig);
    charts.value[index] = chart;
};

watchEffect(() => {
    renderChart(props.sparkline, props.change, props.index);
});
</script>

<template>
    <span>
        <canvas ref="canvasRef" class="w-[50px] sm:w-[100px] my-1" style="height: 20px;">
            Your browser does not support the canvas element.
        </canvas>
    </span>
</template>