// CanvasLogic.ts
import { Ref, ref } from 'vue';
import { Chart, ChartConfiguration } from 'chart.js/auto';
import { ChartInterface } from '../../interfaces/indexInterface';

interface PropsInterface {
    change: string;
    sparkline: string[];
    index: number;
};

export const useCanvas = (props: PropsInterface) => {
    const charts: Ref<Chart[]> = ref([]);
    const canvasRef: Ref<HTMLCanvasElement | null> = ref(null);

    // Creates a gradient for the chart based on the change value.
    const createChartGradient = (ctx: CanvasRenderingContext2D, change: string) => {
        const gradient: CanvasGradient = ctx.createLinearGradient(0, 0, 0, 24);

        gradient.addColorStop(0, change ? change?.includes("-") ? "#DC2626b3" : "#4EDE80C4" : "#3B82F680");
        gradient.addColorStop(1, "transparent");

        // Fills the rectangle with the created gradient.
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 100, 20);

        return gradient;
    };

    // Creates data for the chart based on the sparkline.
    const createChartData = (sparkline: string[], change: string, gradient: CanvasGradient) => {
        // Filters null data from the sparkline and converts it to numbers.
        const filteredData: string[] = sparkline.filter(value => value !== null) ?? [];
        const sparklineData: number[] = filteredData.map(value => parseFloat(value));

        // Returns the data structure for the chart.
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
                    borderColor: change ? change.includes("-") ? "#DC2626" : "#4ADE80" : "#3B82F680", // Define border color based on the change value.
                    backgroundColor: gradient,
                }
            ]
        };
    };

    // Creates chart configuration.
    const createChartConfig = (data: ChartInterface): ChartConfiguration => {
        return {
            type: "line", // Chart type as a line chart.
            data, // Provided data for the chart.
            options: {
                responsive: true, // Chart responsiveness.
                maintainAspectRatio: false, // Aspect ratio of the chart.
                animation: {
                    duration: 0, // Disabling animations.
                },
                scales: {
                    y: {
                        display: false, // Display Y-axis.
                    },
                    x: {
                        display: false, // Display X-axis.
                    },
                },
                plugins: {
                    legend: {
                        display: false, // Hide chart legend.
                    },
                    title: {
                        display: false, // Hide chart title.
                    },
                    tooltip: {
                        enabled: false, // Disable chart tooltips.
                        usePointStyle: false, // Disable point-style tooltips.
                    }
                }
            }
        };
    };

    // Renders the chart on the canvas element.
    const renderChart = () => {
        // Retrieves the canvas element and context.
        const canvas: HTMLCanvasElement | null = canvasRef.value;
        if (!canvas) return;

        const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");
        if (!ctx) return;

        const gradient: CanvasGradient = createChartGradient(ctx, props.change);
        if (!gradient) return;

        const data: ChartInterface = createChartData(props.sparkline, props.change, gradient);
        const chartConfig = createChartConfig(data);

        // Destroys an existing chart and creates a new one on the canvas.
        if (charts.value[props.index]) {
            charts.value[props.index].destroy();
        };

        const chart = new Chart(canvas, chartConfig);
        charts.value[props.index] = chart;
    };

    return { canvasRef, renderChart };
};
