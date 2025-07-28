import React, { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";

// Props interface for reusability
export interface HorizontalBarChartProps {
    data: { label: string; value: number }[];
    height?: number;
    barColor?: string;
    className?: string;
    max?: number; // Optional, for custom max X axis
    valueGap?: number; // px gap between bar and value label
    barHeightPercent?: string; // e.g. "40%", "38%"
    tickAmount?: number; // Number of ticks on x-axis
}

const HorizontalBarChart: React.FC<HorizontalBarChartProps> = ({
    data,
    height = 180,
    barColor = "#0163E1",
    className = "",
    max,
    valueGap = 24,
    barHeightPercent = "45%",
    tickAmount = 4,
}) => {
    const chartRef = useRef<HTMLDivElement>(null);
    const chartInstance = useRef<ApexCharts | null>(null);

    useEffect(() => {
        if (!chartRef.current || !data || data.length === 0) return;

        // Destroy previous chart instance
        if (chartInstance.current) {
            chartInstance.current.destroy();
            chartInstance.current = null;
        }

        const series = [
            {
                data: data.map((d) => d.value),
            },
        ];

        const chartOptions: ApexCharts.ApexOptions = {
            chart: {
                type: "bar",
                height,
                fontFamily: "inherit",
                toolbar: { show: false },
            },
            plotOptions: {
                bar: {
                    horizontal: true,
                    barHeight: barHeightPercent, // Controls gap between bars
                    dataLabels: {
                        position: "right",
                    },
                },
            },
            dataLabels: {
                enabled: true,
                offsetX: valueGap,
                style: {
                    fontSize: "13px",
                    colors: ["#6B7280"], // Tailwind gray-400
                },
                formatter: (val: number) => val.toLocaleString(),
                textAnchor: "start",
            },
            xaxis: {
                categories: data.map((d) => d.label),
                min: 0,
                max: max,
                tickAmount: tickAmount,
                axisTicks: { show: false },
                axisBorder: { show: false },
                labels: {
                    style: {
                        colors: "#9ca3af", // Tailwind gray-400
                        fontSize: "15px",
                    },
                    formatter: (val: string | number) =>
                        Number(val).toLocaleString(), // Comma formatting
                },
            },
            yaxis: {
                labels: {
                    style: {
                        colors: "#6B7280", // Tailwind gray-400
                        fontSize: "15px",
                    },
                },
            },
            grid: {
                borderColor: "#f3f4f6", // Tailwind gray-100
                strokeDashArray: 0,
            },
            tooltip: { enabled: false },
            legend: { show: false },
            colors: [barColor],
            states: {
                hover: { filter: { type: "none" } },
                active: { filter: { type: "none" } },
            },
        };

        chartInstance.current = new ApexCharts(chartRef.current, {
            ...chartOptions,
            series,
        });
        chartInstance.current.render();

        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
                chartInstance.current = null;
            }
        };
    }, [
        JSON.stringify(data),
        height,
        barColor,
        max,
        valueGap,
        barHeightPercent,
        tickAmount,
    ]);

    if (!data || data.length === 0) {
        return (
            <div
                className={`flex items-center justify-center bg-gray-50 rounded-lg ${className}`}
                style={{ height }}
            >
                <div className="text-gray-500 text-sm">No data available</div>
            </div>
        );
    }

    return <div ref={chartRef} className={className} />;
};

export default HorizontalBarChart;