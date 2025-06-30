import React, { useEffect, useRef } from 'react';
import ApexCharts from 'apexcharts';

export interface AreaChartDataPoint {
  x: string | number | Date;
  y: number;
}

export interface AreaChartSeries {
  name: string;
  data: AreaChartDataPoint[];
  color?: string;
}

export interface AreaChartProps {
  series: AreaChartSeries[];
  height?: number;
  width?: string | number;
  className?: string;
  
  // Chart styling
  gradientColors?: [string, string];
  strokeWidth?: number;
  strokeDashArray?: number | number[];
  strokeCurve?: 'smooth' | 'straight' | 'stepline';
  fillType?: 'solid' | 'gradient';
  fillOpacity?: number | number[];
  
  // Markers
  showMarkers?: boolean;
  markerSize?: number;
  markerColors?: string[];
  
  // Axes
  xAxisType?: 'category' | 'datetime' | 'numeric';
  xAxisFormat?: string;
  yAxisFormatter?: (value: number) => string;
  showGrid?: boolean;
  gridColor?: string;
  
  // Interactivity
  showTooltip?: boolean;
  customTooltip?: (params: any) => string;
  onDataPointClick?: (event: any, chartContext: any, config: any) => void;
  
  // Legend and labels
  showLegend?: boolean;
  legendPosition?: 'top' | 'bottom' | 'left' | 'right';
  showDataLabels?: boolean;
  
  // Animations
  animationEnabled?: boolean;
  animationSpeed?: number;
  animationEasing?: string;
  
  // Zoom and pan
  zoomEnabled?: boolean;
  panEnabled?: boolean;
  
  // Responsive
  responsive?: Array<{
    breakpoint: number;
    options: any;
  }>;
}

const AreaChart: React.FC<AreaChartProps> = ({
  series,
  height = 400,
  width = '100%',
  className = '',
  
  // Styling defaults
  gradientColors = ['#3B82F6', '#93C5FD'],
  strokeWidth = 2,
  strokeDashArray = 0,
  strokeCurve = 'smooth',
  fillType = 'gradient',
  fillOpacity = [0.8, 0.1],
  
  // Markers defaults
  showMarkers = true,
  markerSize = 4,
  markerColors,
  
  // Axes defaults
  xAxisType = 'category',
  xAxisFormat,
  yAxisFormatter,
  showGrid = true,
  gridColor = '#E5E7EB',
  
  // Interactivity defaults
  showTooltip = true,
  customTooltip,
  onDataPointClick,
  
  // Legend defaults
  showLegend = false,
  legendPosition = 'bottom',
  showDataLabels = false,
  
  // Animation defaults
  animationEnabled = true,
  animationSpeed = 800,
  animationEasing = 'easeinout',
  
  // Zoom defaults
  zoomEnabled = false,
  panEnabled = false,
  
  // Responsive
  responsive
}) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<ApexCharts | null>(null);

  useEffect(() => {
    if (!chartRef.current || !series || series.length === 0) return;

    // Destroy existing chart
    if (chartInstance.current) {
      chartInstance.current.destroy();
      chartInstance.current = null;
    }

    // Prepare series data
    const chartSeries = series.map((s, index) => ({
      name: s.name,
      data: s.data.map(point => ({
        x: point.x,
        y: point.y
      })),
      color: s.color || (index === 0 ? gradientColors[0] : `hsl(${index * 60}, 70%, 50%)`)
    }));

    const options: ApexCharts.ApexOptions = {
      chart: {
        type: 'area',
        height: height,
        width: width,
        toolbar: {
          show: false
        },
        zoom: {
          enabled: zoomEnabled
        },
        // Removed pan property as it doesn't exist in ApexCharts chart config
        animations: {
          enabled: animationEnabled,
          speed: animationSpeed,
          // Removed 'easing' property as it doesn't exist in ApexCharts animations config
          animateGradually: {
            enabled: true,
            delay: 150
          },
          dynamicAnimation: {
            enabled: true,
            speed: animationSpeed
          }
        },
        events: onDataPointClick ? {
          dataPointSelection: onDataPointClick
        } : undefined
      },
      series: chartSeries,
      xaxis: {
        type: xAxisType,
        labels: {
          style: {
            colors: '#9CA3AF',
            fontSize: '12px',
            fontWeight: '400'
          },
          format: xAxisFormat
        },
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        }
      },
      yaxis: {
        labels: {
          style: {
            colors: '#9CA3AF',
            fontSize: '12px',
            fontWeight: '400'
          },
          formatter: yAxisFormatter
        },
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        }
      },
      grid: {
        show: showGrid,
        borderColor: gridColor,
        strokeDashArray: 0,
        position: 'back',
        xaxis: {
          lines: {
            show: showGrid
          }
        },
        yaxis: {
          lines: {
            show: showGrid
          }
        }
      },
      stroke: {
        curve: strokeCurve,
        width: Array.isArray(strokeWidth) ? strokeWidth : [strokeWidth],
        dashArray: Array.isArray(strokeDashArray) ? strokeDashArray : [strokeDashArray]
      },
      fill: {
        type: fillType,
        opacity: Array.isArray(fillOpacity) ? fillOpacity : [fillOpacity],
        gradient: fillType === 'gradient' ? {
          shade: 'light',
          type: 'vertical',
          shadeIntensity: 0.5,
          gradientToColors: [gradientColors[1]],
          inverseColors: false,
          opacityFrom: Array.isArray(fillOpacity) ? fillOpacity[0] : fillOpacity,
          opacityTo: Array.isArray(fillOpacity) ? fillOpacity[1] : fillOpacity * 0.1,
          stops: [0, 100]
        } : undefined
      },
      markers: {
        size: showMarkers ? markerSize : 0,
        colors: markerColors || chartSeries.map(s => s.color),
        strokeColors: '#ffffff',
        strokeWidth: 2,
        // Removed 'width' property as it doesn't exist in markers config
        hover: {
          size: showMarkers ? markerSize + 2 : 0
        }
      },
      tooltip: {
        enabled: showTooltip,
        theme: 'light',
        style: {
          fontSize: '12px'
        },
        custom: customTooltip
      },
      dataLabels: {
        enabled: showDataLabels
      },
      legend: {
        show: showLegend,
        position: legendPosition,
        horizontalAlign: 'center',
        fontSize: '14px',
        fontWeight: '400',
        markers: {
          strokeWidth: 0
        }
      },
      responsive: responsive || [
        {
          breakpoint: 768,
          options: {
            chart: {
              height: Math.min(height, 300)
            },
            legend: {
              position: 'bottom'
            }
          }
        }
      ]
    };

    try {
      chartInstance.current = new ApexCharts(chartRef.current, options);
      chartInstance.current.render();
    } catch (error) {
      console.error('Error rendering AreaChart:', error);
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
        chartInstance.current = null;
      }
    };
  }, [
    series, 
    height, 
    width,
    JSON.stringify(gradientColors),
    strokeWidth,
    strokeDashArray,
    strokeCurve,
    fillType,
    JSON.stringify(fillOpacity),
    showMarkers,
    markerSize,
    JSON.stringify(markerColors),
    xAxisType,
    xAxisFormat,
    yAxisFormatter,
    showGrid,
    gridColor,
    showTooltip,
    customTooltip,
    onDataPointClick,
    showLegend,
    legendPosition,
    showDataLabels,
    animationEnabled,
    animationSpeed,
    animationEasing,
    zoomEnabled,
    panEnabled,
    JSON.stringify(responsive)
  ]);

  if (!series || series.length === 0) {
    return (
      <div className={`flex items-center justify-center bg-gray-50 rounded-lg ${className}`} style={{ height }}>
        <div className="text-gray-500 text-sm">No data available</div>
      </div>
    );
  }

  return (
    <div className={className}>
      <div ref={chartRef} className="area-chart-container" />
    </div>
  );
};

export default AreaChart;