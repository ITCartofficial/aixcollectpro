import React from "react";
import HorizontalBarChart from "../../../components/ui/Chart/HorizontalBarChart";

// Helper to get a "nice" axis max (like 100, 500, 1000, etc)
function niceMax(max: number): number {
    if (max <= 10) return 10;
    const pow = Math.pow(10, Math.floor(Math.log10(max)));
    // If max is already a round number, return it, else next step up
    return max % pow === 0 ? max : Math.ceil(max / pow) * pow;
}

// Sample data
const chartData = [
    { label: "Total PTP", value: 1000 },
    { label: "Follow-Up Done", value: 700 },
    { label: "Paid Cases", value: 430 },
];

const AiPoweredOperationalTrendsChart: React.FC = () => {
    const maxValue = Math.max(...chartData.map((d) => d.value));
    const niceMaxValue = niceMax(maxValue);

    return (
        <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm w-full ">
            <div className="flex items-center mb-2">
                <h2 className="text-regular font-semibold text-neutral-700 flex-1">
                    AI-Powered Operational Trends
                </h2>
            </div>
            <HorizontalBarChart
                data={chartData}
                height={225}
                className="w-full"
                max={niceMaxValue}
                valueGap={24}
                barHeightPercent="38%"
                tickAmount={5}/>
        </div>
    );
};

export default AiPoweredOperationalTrendsChart;