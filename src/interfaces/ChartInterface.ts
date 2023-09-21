export interface ChartInterface {
  labels: number[];
  datasets: {
    label: string;
    data: number[];
    borderWidth: number;
    pointRadius: number;
    pointHoverBorderWidth: number;
    fill: boolean;
    borderColor: string;
    backgroundColor: CanvasGradient;
  }[];
}