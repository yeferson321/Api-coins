// CanvasLogic.ts
import { Ref, ref } from 'vue';
import { Chart, ChartConfiguration } from 'chart.js/auto';
import { ChartInterface, PropsInterface } from '../../interfaces/indexInterface';

export const useCanvas = (props: PropsInterface) => {
    /* The code is defining two reactive references using the `ref`. */
    const charts: Ref<Chart[]> = ref([]);
    const canvasRef: Ref<null | HTMLCanvasElement> = ref(null);

    /* The `createGradient` function creates a linear gradient for a canvas element. */
    const createGradient = (ctx: CanvasRenderingContext2D, change: string) => {
        /* The line is creating a linear gradient for a canvas element. */
        const gradient: CanvasGradient = ctx.createLinearGradient(0, 0, 0, 24);

        /* The line is adding a color stop to the gradient. */
        gradient.addColorStop(0, change ? change?.includes("-") ? "#DC2626b3" : "#4EDE80C4" : "#3B82F680");
        /* The line is adding a color stop to the gradient. In this case, it is adding a transparent color stop at the end of the gradient.
        This means that the color of the gradient will gradually fade to transparent at the end. */
        gradient.addColorStop(1, "transparent");

        /* The line is setting the fill style of the canvas context to the specified gradient. */
        ctx.fillStyle = gradient;
        /* The line is drawing a filled rectangle on the canvas. The rectangle starts at the coordinates (0, 0) and has a width of 100
        pixels and a height of 20 pixels. */
        ctx.fillRect(0, 0, 100, 20);

        return gradient;
    }

    /* The `createData` function takes in a sparkline array, change value, and gradient, and returns an object with data formatted for a chart. */
    const createData = (sparkline: string[], change: string, gradient: CanvasGradient) => {
        /* The line is filtering out any null values from the `sparkline` array. */
        const filteredData: string[] = sparkline.filter(value => value !== null) ?? [];

        /* The line is converting the `filteredData` array, which contains string values, into an array of numbers. */
        const sparklineData: number[] = filteredData.map(value => parseFloat(value));

        /* The code is returning an object that represents the data for a chart. */
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

    /* The function `createChartConfig` creates a chart configuration object for a line chart with provided data and specific options. */
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

    /* The `renderChart` function creates and renders a chart on a canvas element based on the provided data and configuration. */
    const renderChart = () => {
        /* The code is retrieving the value of the `canvasRef` reference, which is a reference to a canvas element. */
        const canvas: HTMLCanvasElement | null = canvasRef.value;
        if (!canvas) return;

        /* The code is retrieving the 2D rendering context of the canvas element using the `getContext` method. */
        const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");
        if (!ctx) return;

        /* The code is creating a gradient for the chart based on the "change" value passed as a prop. It calls the `createGradient` function and passes
        the canvas rendering context (`ctx`) and the "change" value (`props.change`) as arguments. */
        const gradient: CanvasGradient = createGradient(ctx, props.change);
        if (!gradient) return;

        /* The code is creating the data and configuration for rendering a chart. */
        const data: ChartInterface = createData(props.sparkline, props.change, gradient);
        const chartConfig = createChartConfig(data);

        /* The code block is checking if a chart already exists at the specified index in the `charts` array. If a chart exists, it calls the `destroy()` 
        method on the chart object to remove it from the DOM and clean up any associated resources. */
        if (charts.value[props.index]) {
            charts.value[props.index].destroy();
        };

        /* The code is creating a new instance of the `Chart` class and assigning it to the `chart` variable. It then assigns this chart instance to the
        `charts` array at the specified index (`props.index`). */
        const chart = new Chart(canvas, chartConfig);
        charts.value[props.index] = chart;
    };

    return { canvasRef, renderChart };
};
