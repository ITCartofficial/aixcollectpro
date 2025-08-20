import React, { useState, useMemo } from 'react';
import AreaChart from '../../../components/ui/Chart/AreaChart';
import type { AreaChartSeries } from '../../../components/ui/Chart/AreaChart';


export interface CollectionData {
  date: string;
  amount: number;
}

export interface CollectionPerformanceGraphProps {
  data: CollectionData[];
  title?: string;
  currency?: string;
  className?: string;
  height?: number;
  onTimeFilterChange?: (filter: string) => void;
}

const CollectionPerformanceGraph: React.FC<CollectionPerformanceGraphProps> = ({
  data,
  title = "Collection Performance Graph",
  currency = "₹",
  className = "",
  height = 220,
  onTimeFilterChange
}) => {
  const [selectedTimeFilter, setSelectedTimeFilter] = useState("Last Week");

  const timeFilterOptions = [
    "Last Week",
    "Last Month", 
    "Last 3 Months",
    "Last 6 Months",
    "Last Year"
  ];


  // Format data for the AreaChart component
  const chartSeries: AreaChartSeries[] = useMemo(() => [
    {
      name: 'Collection Amount',
      data: data.map(item => ({
        x: item.date,
        y: item.amount
      })),
      color: '#2563EB'
    }
  ], [data]);

  // Custom Y-axis formatter for Collection Performance
  const yAxisFormatter = (value: number): string => {
    if (value >= 1000) {
      return `${(value / 1000).toFixed(0)}K`;
    }
    return `${Math.round(value)}L`;
  };

  // Custom tooltip for Collection Performance
  const customTooltip = ({ series, seriesIndex, dataPointIndex, w }: any): string => {
    const value = series[seriesIndex][dataPointIndex];
    const date = new Date(w.globals.seriesX[seriesIndex][dataPointIndex]);
    
    const formattedDate = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });

    const formattedValue = `${currency}${(value).toFixed(1)}L`;

    return `
      <div class="bg-primary-600 text-white px-3 py-2 rounded-lg shadow-lg">
        <div class="font-medium">${formattedDate}</div>
        <div class="text-lg font-bold">${formattedValue}</div>
      </div>
    `;
  };

  const handleTimeFilterChange = (filter: string) => {
    setSelectedTimeFilter(filter);
    onTimeFilterChange?.(filter);
  };

  // Fixed: Removed unused parameters to avoid TypeScript warnings
  const handleDataPointClick = (_event: any, _chartContext: any, config: any) => {
    const dataPointIndex = config.dataPointIndex;
    if (dataPointIndex >= 0 && dataPointIndex < data.length) {
      const clickedData = data[dataPointIndex];
      console.log('Clicked data point:', clickedData);
    }
  };

  return (
    <div className={`bg-white rounded-lg p-4 ${className}`}>
      {/* Header with title and time filter */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-neutral-700">{title}</h2>
        
        {/* Time Filter Dropdown */}
        <div className="relative">
          <select
            value={selectedTimeFilter}
            onChange={(e) => handleTimeFilterChange(e.target.value)}
            className="appearance-none bg-white border border-neutral-300 rounded-lg px-4 py-2 pr-8 text-sm font-medium text-neutral-600 hover:border-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 cursor-pointer"
          >
            {timeFilterOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <svg className="w-4 h-4 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Chart using the reusable AreaChart component */}
      <AreaChart
        series={chartSeries}
        height={height}
        xAxisType="datetime"
        yAxisFormatter={yAxisFormatter}
        customTooltip={customTooltip}
        onDataPointClick={handleDataPointClick}
        gradientColors={['#3B82F6', '#93C5FD']}
        strokeWidth={3}
        strokeDashArray={[5, 5]} // Dotted line effect
        strokeCurve="smooth"
        markerSize={6}
        markerColors={['#2563EB']}
        showGrid={true}
        gridColor="#E5E7EB"
        animationSpeed={800}
        className="pt-4"
      />
    </div>
  );
};

export default CollectionPerformanceGraph;