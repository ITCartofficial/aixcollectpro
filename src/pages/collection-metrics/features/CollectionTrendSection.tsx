import React, { useState } from "react";
import Dropdown from "../../../components/common/Dropdown";
import VerticalBarChart from "../../../components/ui/Chart/VerticalBarChart";
import { FiTrendingUp } from "react-icons/fi";


const chartData = {
    series: [
        {
            name: "Collection",
            data: [150000, 50000, 200000, 80000, 85000, 120000, 120000],
            color: "#1473E6",
        },
    ],
    categories: [
        "June 4",
        "June 5",
        "June 6",
        "June 7",
        "June 8",
        "June 9",
        "June 9",
    ],
};

const dropdownOptions = [
    { label: "Last 7 Days", value: "7d" },
    { label: "Last 14 Days", value: "14d" },
    { label: "Last 30 Days", value: "30d" },
];

const CollectionTrendSection: React.FC = () => {
    // Use useState<string> for single selection
    const [selectedPeriod, setSelectedPeriod] = useState<string>(dropdownOptions[0].value);

    return (
        <div className="bg-white rounded-lg shadow-[0px_1px_3px_0px_rgba(59,59,59,0.10)] p-5">
            <div className="flex justify-between items-center mb-2">
                <div className="text-base font-semibold text-neutral-700">Collection Trend</div>
                <Dropdown
                    options={dropdownOptions}
                    value={selectedPeriod}
                    onChange={(val) => {
                        if (typeof val === "string") setSelectedPeriod(val);
                    }}
                    className="w-36"
                />
            </div>
            <div className="flex gap-6 mb-1">
                <h3 className="text-3xl font-bold text-gray-900">₹5,82,000</h3>
                <div className="flex items-center gap-2">
                    <FiTrendingUp className="w-4 h-4 text-green-500" />
                    <span className="text-green-500 font-medium">+11.8%</span>
                </div>
            </div>
            <div>
                <VerticalBarChart
                    series={chartData.series}
                    categories={chartData.categories}
                    height={270}
                    barColor="#1473E6"
                    yAxisFormatter={(val) =>
                        `₹${val.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`
                    }
                />
            </div>
        </div>
    );
};

export default CollectionTrendSection;