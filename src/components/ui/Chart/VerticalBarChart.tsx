import React, { useEffect, useRef } from 'react';
import ApexCharts from 'apexcharts';

export interface VerticalBarChartSeries {
  name: string;
  data: number[];
  color?: string;
}

export interface VerticalBarChartProps {
  series: VerticalBarChartSeries[];
  categories: string[];
  height?: number;
  width?: string | number;
  className?: string;
  barColor?: string;
  yAxisFormatter?: (value: number) => string;
  showLegend?: boolean;
  legendPosition?: 'top' | 'bottom' | 'left' | 'right';
  showDataLabels?: boolean;
}

const VerticalBarChart: React.FC<VerticalBarChartProps> = ({
  series,
  categories,
  height = 300,
  width = '100%',
  className = '',
  barColor = '#1473E6',
  yAxisFormatter,
  showLegend = false,
  legendPosition = 'bottom',
  showDataLabels = false,
}) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<ApexCharts | null>(null);

  useEffect(() => {
    if (!chartRef.current || !series || series.length === 0) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const options = {
      chart: {
        type: 'bar' as const,
        height,
        width,
        toolbar: { show: false },
        fontFamily: 'inherit',
      },
      series: series.map((s) => ({
        name: s.name,
        data: s.data,
        color: s.color || barColor,
      })),
      xaxis: {
        categories,
        axisBorder: { show: false },
        axisTicks: { show: false },
        labels: {
          style: {
            colors: '#6B7280',
            fontSize: '14px',
          },
        },
      },
      yaxis: {
        labels: {
          formatter: yAxisFormatter
            ? yAxisFormatter
            : (val: number) => val.toLocaleString('en-IN', { maximumFractionDigits: 0 }),
          style: {
            colors: '#6B7280',
            fontSize: '14px',
          },
        },
        axisBorder: { show: false },
        axisTicks: { show: false },
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          columnWidth: '40%',
          distributed: true,
        },
      },
      colors: [barColor],
      tooltip: {
        y: {
          formatter: yAxisFormatter
            ? yAxisFormatter
            : (val: number) => `₹${val.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`,
        },
      },
      dataLabels: {
        enabled: showDataLabels,
      },
      legend: {
        show: showLegend,
        position: legendPosition,
      },
      grid: {
        borderColor: '#E5E7EB',
        strokeDashArray: 4,
      },
    };

    chartInstance.current = new ApexCharts(chartRef.current, options);
    chartInstance.current.render();

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [
    JSON.stringify(series),
    JSON.stringify(categories),
    height,
    width,
    barColor,
    yAxisFormatter,
    showLegend,
    legendPosition,
    showDataLabels,
  ]);

  if (!series || series.length === 0) {
    return (
      <div
        className={`flex items-center justify-center bg-gray-50 rounded-lg ${className}`}
        style={{ height }}
      >
        <div className="text-gray-500 text-sm">No data available</div>
      </div>
    );
  }

  return (
    <div className={className}>
      <div ref={chartRef} />
    </div>
  );
};

export default VerticalBarChart;