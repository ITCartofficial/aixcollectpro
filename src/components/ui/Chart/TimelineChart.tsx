import React, { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";

export interface TimelineChartProps {
    data: { date: string; value: number }[];
    height?: number;
    className?: string;
    width?: number | string;
}

const TimelineChart: React.FC<TimelineChartProps> = ({
    data,
    height = 320,
    className = "",
}) => {
    const chartRef = useRef<HTMLDivElement>(null);
    const chartInstance = useRef<ApexCharts | null>(null);

    useEffect(() => {
        if (!chartRef.current || !data || data.length === 0) return;

        // Destroy existing chart instance before creating a new one
        if (chartInstance.current) {
            chartInstance.current.destroy();
            chartInstance.current = null;
        }

        const options: ApexCharts.ApexOptions = {
            chart: {
                type: "area",
                height,
                toolbar: { show: false },
                fontFamily: "inherit",
            },
            series: [
                {
                    name: "High-Risk Tasks",
                    data: data.map((item) => ({
                        x: item.date,
                        y: item.value,
                    })),
                },
            ],
            xaxis: {
                type: "category",
                categories: data.map((item) => item.date),
                labels: {
                    style: {
                        colors: "#6B7280",
                        fontSize: "14px",
                    },
                },
                axisBorder: { show: false },
                axisTicks: { show: false },
            },
            yaxis: {
                min: 0,
                max: Math.max(...data.map((d) => d.value), 25) + 2,
                tickAmount: 5,
                labels: {
                    style: {
                        colors: "#6B7280",
                        fontSize: "14px",
                    },
                },
                axisBorder: { show: false },
                axisTicks: { show: false },
            },
            grid: {
                borderColor: "#f3f4f6",
                strokeDashArray: 0,
            },
            stroke: {
                curve: "straight",
                width: 2,
                colors: ["#2563eb"],
                dashArray: 0, // solid line
            },
            fill: {
                type: "gradient",
                gradient: {
                    shade: "light",
                    type: "vertical",
                    shadeIntensity: 0.5,
                    gradientToColors: ["#93c5fd"],
                    inverseColors: false,
                    opacityFrom: 0.4,
                    opacityTo: 0.1,
                    stops: [0, 100],
                },
            },
            markers: {
                size: 6,
                colors: ["#2563eb"],
                strokeColors: "#fff",
                strokeWidth: 2,
                hover: { size: 8 },
            },
            tooltip: {
                enabled: true,
                theme: "light",
                style: { fontSize: "12px" },
                x: { show: true },
            },
            legend: {
                show: true,
                position: "top",
                horizontalAlign: "right",
                fontSize: "14px",
                fontWeight: 400,
                markers: { size: 16 }, // <-- Only 'size' allowed here!
                itemMargin: { horizontal: 12, vertical: 0 },
            },
            dataLabels: { enabled: false },
            responsive: [
                {
                    breakpoint: 768,
                    options: {
                        chart: { height: 200 },
                        legend: { position: "bottom" },
                    },
                },
            ],
        };

        chartInstance.current = new ApexCharts(chartRef.current, options);
        chartInstance.current.render();

        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
                chartInstance.current = null;
            }
        };
    }, [JSON.stringify(data), height]);

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

export default TimelineChart;