// ChartLogic.ts
import { Ref, ref } from 'vue';
import { Chart, ChartConfiguration } from 'chart.js/auto';
import { ChartInterface, PropsInterface } from '../../interfaces/indexInterface';

export const useCanvas = (props: PropsInterface) => {
    // Define reactive references
    const charts: Ref<Chart[]> = ref([]);
    const canvasRef: Ref<null | HTMLCanvasElement> = ref(null);
    
    // Function to create gradient for the chart
    const createGradient = (ctx: CanvasRenderingContext2D, change: string) => {
        // Create a linear gradient from top to bottom
        const gradient: CanvasGradient = ctx.createLinearGradient(0, 0, 0, 24);
        // Define gradient color stops based on the change value
        gradient.addColorStop(0, change ? change?.includes("-") ? "#DC2626b3" : "#4EDE80C4" : "#3B82F680");
        gradient.addColorStop(1, "transparent");
    
        // Fill the canvas with the created gradient
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 100, 20);
    
        return gradient;
    }
    
    // Function to create chart data
    const createData = (sparkline: string[], change: string, gradient: CanvasGradient) => {
        // Filter out null values from sparkline data
        const filteredData: string[] = sparkline.filter(value => value !== null) ?? [];
        // Convert sparkline data to an array of numbers
        const sparklineData: number[] = filteredData.map(value => parseFloat(value));
    
        // Generate data for the chart
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
                    // Define border color based on the change value
                    borderColor: change ? change.includes("-") ? "#DC2626" : "#4ADE80" : "#3B82F680",
                    backgroundColor: gradient,
                }
            ]
        };
    };
    
    // Function to configure chart options
    const createChartConfig = (data: ChartInterface): ChartConfiguration => {
        return {
            type: "line", // Chart type as a line chart
            data, // Provided data for the chart
            options: {
                responsive: true, // Chart responsiveness
                maintainAspectRatio: false, // Aspect ratio of the chart
                animation: {
                    duration: 0, // Disabling animations
                },
                scales: {
                    y: {
                        display: false, // Display Y-axis
                    },
                    x: {
                        display: false, // Display X-axis
                    },
                },
                plugins: {
                    legend: {
                        display: false, // Hide chart legend
                    },
                    title: {
                        display: false, // Hide chart title
                    },
                    tooltip: {
                        enabled: false, // Disable chart tooltips
                        usePointStyle: false, // Disable point-style tooltips
                    }
                }
            }
        };
    };
    
    // Function to render the chart
    const renderChart = () => {
        // Retrieve canvas element
        const canvas: HTMLCanvasElement | null = canvasRef.value;
        if (!canvas) return;
    
        // Retrieve canvas context
        const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");
        if (!ctx) return;
    
        // Create gradient for the chart
        const gradient: CanvasGradient = createGradient(ctx, props.change);
        if (!gradient) return;
    
        // Generate chart data
        const data: ChartInterface = createData(props.sparkline, props.change, gradient);
        const chartConfig = createChartConfig(data);
    
        // Check if chart already exists and destroy it
        if (charts.value[props.index]) {
            charts.value[props.index].destroy();
        };
    
        // Create and store new chart
        const chart = new Chart(canvas, chartConfig);
        charts.value[props.index] = chart;
    };

    return { canvasRef, renderChart };
};
