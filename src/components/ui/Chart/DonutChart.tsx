import React, { useEffect, useRef } from 'react';
import ApexCharts from 'apexcharts';


export interface DonutChartData {
  label: string;
  value: number;
  color: string;
  percentage?: number;
}

// Donut Chart Props
interface DonutChartProps {
  data: DonutChartData[];
  size?: number;
  donutSize?: string;
  centerLabel?: string;
  centerValue?: string | number;
  showTooltip?: boolean;
  strokeWidth?: number;
  className?: string;
  centerLabelStyle?: {
    fontSize?: string;
    fontWeight?: string;
    color?: string;
  };
  centerValueStyle?: {
    fontSize?: string;
    fontWeight?: string;
    color?: string;
  };
}


const DonutChart: React.FC<DonutChartProps> = ({
  data,
  size = 200,
  donutSize = '65%',
  centerLabel,
  centerValue,
  showTooltip = true,
  strokeWidth = 0,
  className = '',
  centerLabelStyle = {
    fontSize: '12px',
    fontWeight: '400',
    color: '#9ca3af'
  },
  centerValueStyle = {
    fontSize: '24px',
    fontWeight: '600',
    color: '#374151'
  }
}) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<ApexCharts | null>(null);

  const calculatedCenterValue = centerValue || data.reduce((sum, item) => sum + item.value, 0);

  useEffect(() => {
    if (!chartRef.current || data.length === 0) return;

    // Destroy existing chart
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const options = {
      chart: {
        type: 'donut' as const,
        width: size,
        height: size,
        toolbar: {
          show: false
        },
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 800
        }
      },
      series: data.map(item => item.value),
      labels: data.map(item => item.label),
      colors: data.map(item => item.color),
      plotOptions: {
        pie: {
          donut: {
            size: donutSize,
            labels: {
              show: centerLabel || centerValue ? true : false,
              name: {
                show: centerLabel ? true : false,
                fontSize: centerLabelStyle.fontSize,
                fontWeight: centerLabelStyle.fontWeight,
                color: centerLabelStyle.color
              },
              value: {
                show: centerValue ? true : false,
                fontSize: centerValueStyle.fontSize,
                fontWeight: centerValueStyle.fontWeight,
                color: centerValueStyle.color,
                formatter: function () {
                  return calculatedCenterValue.toString();
                }
              },
              total: {
                show: true,
                showAlways: true,
                label: centerLabel || '',
                fontSize: centerLabelStyle.fontSize,
                fontWeight: centerLabelStyle.fontWeight,
                color: centerLabelStyle.color,
                formatter: function () {
                  return calculatedCenterValue.toString();
                }
              }
            }
          }
        }
      },
      dataLabels: {
        enabled: false
      },
      legend: {
        show: false
      },
      stroke: {
        width: strokeWidth
      },
      tooltip: {
        enabled: showTooltip,
        y: {
          formatter: function(value: number, { seriesIndex }: { seriesIndex: number }) {
            const percentage = data[seriesIndex].percentage || 
              Math.round((value / data.reduce((sum, item) => sum + item.value, 0)) * 100);
            return `${value} (${percentage}%)`;
          }
        }
      }
    };

    chartInstance.current = new ApexCharts(chartRef.current, options);
    chartInstance.current.render();

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data, size, donutSize, centerLabel, calculatedCenterValue, showTooltip, strokeWidth]);

  return (
    <div className={`flex justify-center ${className}`}>
      <div ref={chartRef}></div>
    </div>
  );
};

export default DonutChart;










