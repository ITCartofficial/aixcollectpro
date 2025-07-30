import React, { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";

export interface LineChartSeries {
  name: string;
  data: number[];
  color?: string;
}

interface LineChartProps {
  series: LineChartSeries[];
  categories: string[];
  height?: number;
  width?: string | number;
  showLegend?: boolean;
  className?: string;
}

const LineChart: React.FC<LineChartProps> = ({
  series,
  categories,
  height = 250,
  width = "100%",
  showLegend = true,
  className = "",
}) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<ApexCharts | null>(null);

  useEffect(() => {
    if (!chartRef.current || !Array.isArray(series) || series.length === 0) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const options = {
      chart: {
        type: "line",
        height,
        width,
        toolbar: { show: false },
        animations: { enabled: true, easing: "easeinout", speed: 700 }
      },
      series: series.map(s => ({
        name: s.name,
        data: s.data,
        color: s.color
      })),
      xaxis: {
        categories,
        labels: {
          style: {
            colors: "#333",
            fontSize: "14px"
          }
        }
      },
      yaxis: {
        labels: {
          style: {
            colors: "#333",
            fontSize: "12px"
          }
        }
      },
      stroke: {
        curve: "smooth",
        width: 3
      },
      legend: {
        show: showLegend,
        position: "bottom",
        fontSize: "14px",
        markers: { width: 15, height: 15, radius: 4, shape: "square" }
      },
      grid: {
        borderColor: "#e0e0e0"
      }
    };

    chartInstance.current = new ApexCharts(chartRef.current, options);
    chartInstance.current.render();

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [series, categories, height, width, showLegend]);

  return (
    <div className={className}>
      <div ref={chartRef} />
    </div>
  );
};

export default LineChart;







