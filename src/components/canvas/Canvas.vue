<script setup lang="ts">
import { ref } from '@vue/reactivity';
import { Ref, onMounted } from 'vue';
import { Chart, ChartConfiguration } from 'chart.js/auto';
import { ChartInterface } from '../../interfaces/ChartInterface';

const charts: Ref<Chart[]> = ref([]);

const props = defineProps({
    sparkline: {
        type: Array as () => string[],
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

const createGradient = (ctx: CanvasRenderingContext2D, change: string | undefined) => { 
    const gradient: CanvasGradient = ctx.createLinearGradient(0, 0, 0, 24);
    gradient.addColorStop(0, change ? change?.includes("-") ? "#DC2626b3" : "#4EDE80C4" : "#3B82F680");
    gradient.addColorStop(1, "transparent");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 100, 20);

    return gradient;
}

const createData = (sparkline: string[] | undefined, change: string | undefined, gradient: CanvasGradient) => {
    const sparklineData: number[] = (sparkline ?? []).map(val => parseFloat(val) || 0);
    const minValue: number = Math.min(...sparklineData);
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
}

const renderChart = async (sparkline: string[] | undefined, change: string | undefined, index: number) => {
    const canvas: HTMLCanvasElement = document.getElementById(`Chart-${index}`) as HTMLCanvasElement;
    if (!canvas) return;

    const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");
    if (!ctx) return;

    const gradient: CanvasGradient = createGradient(ctx, change);
    if (!gradient) return;

    const data: ChartInterface = createData(sparkline, change, gradient);
    const chartConfig = createChartConfig(data);

    if (charts.value[index]) {
        charts.value[index].destroy();
    }

    const chart = new Chart(canvas, chartConfig);
    charts.value[index] = chart;

}

const removeChart = (uuid: string) => {
    // Emitir el evento chart-removed con el uuid hacia el componente padre
    console.log("este es el mensaje", uuid)
}

defineExpose({ removeChart });


onMounted(() => {
    renderChart(props.sparkline, props.change, props.index);
   
});

</script>

<template>
    <span>
        <canvas :id="`Chart-${props.index}`" class="w-[50px] sm:w-[100px] my-1" style="height: 20px;">
            Your browser does not support the canvas element.
        </canvas>
    </span>
</template>
