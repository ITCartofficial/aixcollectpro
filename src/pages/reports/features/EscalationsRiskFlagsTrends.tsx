import React, { useMemo } from 'react';
import AreaChart from '../../../components/ui/Chart/AreaChart';
import type { AreaChartSeries } from '../../../components/ui/Chart/AreaChart';

export interface EscalationTrendData {
  date: string;
  escalationRate: number;
  riskFlags: number;
  totalCases: number;
}

export interface EscalationsRiskFlagsTrendsProps {
  data?: EscalationTrendData[];
  className?: string;
  height?: number;
  showRiskFlags?: boolean;
}

const EscalationsRiskFlagsTrends: React.FC<EscalationsRiskFlagsTrendsProps> = ({
  data,
  className = "",
  height = 250,
}) => {
  const sampleData: EscalationTrendData[] = [
    { date: "June 2", escalationRate: 35, riskFlags: 12, totalCases: 145 },
    { date: "June 3", escalationRate: 48, riskFlags: 18, totalCases: 152 },
    { date: "June 4", escalationRate: 52, riskFlags: 22, totalCases: 148 },
    { date: "June 5", escalationRate: 45, riskFlags: 15, totalCases: 160 },
    { date: "June 6", escalationRate: 49, riskFlags: 19, totalCases: 155 },
    { date: "June 7", escalationRate: 46, riskFlags: 16, totalCases: 163 },
    { date: "June 8", escalationRate: 51, riskFlags: 21, totalCases: 158 },
  ];

  const chartData = data && data.length > 0 ? data : sampleData;

  // Format data for the AreaChart component - following CollectionPerformanceGraph pattern
  const chartSeries: AreaChartSeries[] = useMemo(() => [
    {
      name: 'Escalation Rate',
      data: chartData.map(item => ({
        x: item.date,
        y: item.escalationRate
      })),
      color: '#3B82F6'
    }
  ], [chartData]);

  // Custom Y-axis formatter for Escalation Performance
  const yAxisFormatter = (value: number): string => {
    return `${Math.round(value)}%`;
  };

  // Data point click handler - following CollectionPerformanceGraph pattern
  const handleDataPointClick = (_event: any, _chartContext: any, config: any) => {
    const dataPointIndex = config.dataPointIndex;
    if (dataPointIndex >= 0 && dataPointIndex < chartData.length) {
      const clickedData = chartData[dataPointIndex];
      console.log('Clicked escalation data point:', clickedData);
    }
  };

  return (
    <div className={`bg-white rounded-lg p-4 shadow-sm ${className}`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-base font-semibold text-neutral-900">
          Escalations & Risk Flags Trends
        </h2>

        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-primary-500"></div>
          <span className="text-sm text-primary-600 font-medium">Escalation Rate over Time</span>
        </div>
      </div>

      <AreaChart
        series={chartSeries}
        height={height}
        xAxisType="category"
        yAxisFormatter={yAxisFormatter}
        onDataPointClick={handleDataPointClick}
        gradientColors={['#3B82F6', '#DBEAFE']}
        strokeWidth={2}
        strokeDashArray={[5, 5]}
        strokeCurve="smooth"
        markerSize={8}
        markerColors={['#3B82F6']}
        showGrid={true}
        gridColor="#F8FAFC"
        animationSpeed={800}
        className="pt-2"
      />
    </div>
  );
};

export default EscalationsRiskFlagsTrends;