import React, { useState } from "react";
import Dropdown from "../../../components/common/Dropdown";
import HorizontalBarChart from "../../../components/ui/Chart/HorizontalBarChart";

// Helper to get a "nice" axis max (like 100, 500, 1000, etc)
function niceMax(max: number): number {
    if (max <= 10) return 10;
    const pow = Math.pow(10, Math.floor(Math.log10(max)));
    // If max is already a round number, return it, else next step up
    return max % pow === 0 ? max : Math.ceil(max / pow) * pow;
}

// Sample data for different filters
const chartDataSets: Record<string, { label: string; value: number }[]> = {
    last7: [
        { label: "Total PTP", value: 1000 },
        { label: "Follow-Up Done", value: 700 },
        { label: "Paid Cases", value: 430 },
    ],
    last30: [
        { label: "Total PTP", value: 3200 },
        { label: "Follow-Up Done", value: 2300 },
        { label: "Paid Cases", value: 1450 },
    ],
    last90: [
        { label: "Total PTP", value: 12000 },
        { label: "Follow-Up Done", value: 8300 },
        { label: "Paid Cases", value: 5100 },
    ],
};

const dropdownOptions = [
    { label: "Last 7 Days", value: "last7" },
    { label: "Last 30 Days", value: "last30" },
    { label: "Last 90 Days", value: "last90" },
];

const PTPToPaidConversionSection: React.FC = () => {
    const [selectedRange, setSelectedRange] = useState<string>("last7");

    // Only use the max of the current dataset, not global max
    const currentData = chartDataSets[selectedRange];
    const maxValue = Math.max(...currentData.map((d) => d.value));
    const niceMaxValue = niceMax(maxValue);

    return (
        <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm w-full">
            <div className="flex items-center mb-2">
                <h2 className="text-base md:text-lg font-semibold flex-1">
                    PTP to Paid Conversion Rate
                </h2>
                <Dropdown
                    options={dropdownOptions}
                    value={selectedRange}
                    onChange={(val) =>
                        setSelectedRange(
                            typeof val === "string"
                                ? val
                                : Array.isArray(val)
                                    ? val[0]
                                    : "last7"
                        )
                    }
                    className="w-40"
                />
            </div>
            <HorizontalBarChart
                data={currentData}
                height={225}
                className="w-full"
                max={niceMaxValue}
                valueGap={24}
                barHeightPercent="38%"
                tickAmount={5} />
        </div>
    );
};

export default PTPToPaidConversionSection;