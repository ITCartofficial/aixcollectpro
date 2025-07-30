import React, { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";

export interface StackedBarChartSeries {
  name: string;
  data: number[];
  color?: string;
}

interface StackedBarChartProps {
  series: StackedBarChartSeries[];
  categories: string[];
  height?: number;
  width?: string | number;
  showLegend?: boolean;
  className?: string;
}

const StackedBarChart: React.FC<StackedBarChartProps> = ({
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
        type: "bar",
        height,
        width,
        stacked: true,
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
            colors: "#616161",
            fontSize: "14px"
          }
        }
      },
      yaxis: {
        labels: {
          style: {
            colors: "#616161",
            fontSize: "12px"
          }
        },
        min: 0
      },
      legend: {
        show: showLegend,
        position: "bottom",
        fontSize: "14px",
        markers: { width: 18, height: 10, radius: 2 }
      },
      grid: {
        borderColor: "#e0e0e0"
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          borderRadius: 5,
        }
      },
      dataLabels: {
        enabled: false
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

export default StackedBarChart;